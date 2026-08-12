import { generateBarcodeDataURL } from './codeGenerators';
import { BuilderState, PhotoState } from '../types';

interface RenderPfpOptions {
  image: HTMLImageElement;
  photoState: PhotoState;
}

interface RenderBuilderCardOptions {
  image: HTMLImageElement | null;
  photoState: PhotoState;
  builderState: BuilderState;
  scaleFactor?: number;
}

let fontsLoaded = false;

export async function ensureCanvasFontsLoaded(): Promise<void> {
  if (fontsLoaded) return;

  try {
    const victorFont = new FontFace(
      'Victor Mono',
      'url(https://fonts.gstatic.com/s/victormono/v17/m8I1jfBmg50nKn0SM1BG77F67j8.woff2)'
    );
    const jetbrainsFont = new FontFace(
      'JetBrains Mono',
      'url(https://fonts.gstatic.com/s/jetbrainsmono/v18/tU3g_55y68p86K140Gs6xrtq.woff2)'
    );

    const loadedFonts = await Promise.all([
      victorFont.load().catch(() => null),
      jetbrainsFont.load().catch(() => null),
    ]);

    loadedFonts.forEach((font) => {
      if (font) {
        document.fonts.add(font);
      }
    });

    fontsLoaded = true;
  } catch (err) {
    fontsLoaded = true;
  }
}

let sampleImageCache: HTMLCanvasElement | HTMLImageElement | null = null;
let qrImageCache: HTMLImageElement | null = null;

async function getDefaultSampleImage(): Promise<HTMLCanvasElement | HTMLImageElement | null> {
  if (sampleImageCache) return sampleImageCache;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = img.naturalWidth;
      offscreen.height = img.naturalHeight;
      const ctx = offscreen.getContext('2d');
      if (!ctx) {
        sampleImageCache = img;
        resolve(img);
        return;
      }
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
      const data = imgData.data;

      const cx = 493;
      const cy = 500;
      const radius = 246;

      for (let y = 0; y < offscreen.height; y++) {
        for (let x = 0; x < offscreen.width; x++) {
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (dist <= radius) {
            const idx = (y * offscreen.width + x) * 4;
            data[idx + 3] = 0;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      sampleImageCache = offscreen;
      resolve(offscreen);
    };
    img.onerror = () => resolve(null);
    img.src = '/assets/image2.png';
  });
}

async function getStaticQrImage(): Promise<HTMLImageElement | null> {
  if (qrImageCache) return qrImageCache;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      qrImageCache = img;
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = '/assets/image3.jpg';
  });
}

function loadImageFromUrl(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

function fitTextOnLine(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  baseFontSize: number,
  fontFamily: string = '"Victor Mono", monospace'
) {
  let fontSize = baseFontSize;
  ctx.font = `700 ${fontSize}px ${fontFamily}`;

  while (ctx.measureText(text).width > maxWidth && fontSize > 12) {
    fontSize -= 1;
    ctx.font = `700 ${fontSize}px ${fontFamily}`;
  }

  ctx.fillText(text, x, y);
}

let pfpFrameImageCache: HTMLCanvasElement | HTMLImageElement | null = null;

async function getPfpFrameImage(): Promise<HTMLCanvasElement | HTMLImageElement | null> {
  if (pfpFrameImageCache) return pfpFrameImageCache;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = img.naturalWidth;
      offscreen.height = img.naturalHeight;
      const ctx = offscreen.getContext('2d');
      if (!ctx) {
        pfpFrameImageCache = img;
        resolve(img);
        return;
      }
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
      const data = imgData.data;

      const cx = 626;
      const cy = 602;
      const radius = 344;

      for (let y = 0; y < offscreen.height; y++) {
        for (let x = 0; x < offscreen.width; x++) {
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (dist <= radius) {
            const idx = (y * offscreen.width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const isSatLow = max - min < 20;
            const isBright = r > 180 && g > 180 && b > 180;

            if (isBright && isSatLow) {
              data[idx + 3] = 0;
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      pfpFrameImageCache = offscreen;
      resolve(offscreen);
    };
    img.onerror = () => resolve(null);
    img.src = '/assets/image4.png';
  });
}

let samplePhotoCache: HTMLImageElement | null = null;

async function getDefaultSamplePhoto(): Promise<HTMLImageElement | null> {
  if (samplePhotoCache) return samplePhotoCache;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      samplePhotoCache = img;
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = '/assets/image.png';
  });
}

export async function renderPfpFrame({ image, photoState }: RenderPfpOptions): Promise<string> {
  await ensureCanvasFontsLoaded();

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get 2D context for canvas');

  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const apertureRadius = 296;
  const apertureDiameter = apertureRadius * 2;
  const cx = 540;
  const cy = 519;

  if (image) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, apertureRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    if (photoState.bwFilter) {
      ctx.filter = 'grayscale(100%) contrast(125%) brightness(95%)';
    } else {
      ctx.filter = 'contrast(105%) brightness(100%)';
    }

    const imgAspect = image.naturalWidth / image.naturalHeight;
    let renderW = apertureDiameter * photoState.zoom;
    let renderH = renderW / imgAspect;
    if (imgAspect > 1) {
      renderH = apertureDiameter * photoState.zoom;
      renderW = renderH * imgAspect;
    }

    const frameX = cx - apertureRadius;
    const frameY = cy - apertureRadius;

    const posX = frameX + (apertureDiameter - renderW) / 2 + photoState.offsetX * (apertureDiameter / 300);
    const posY = frameY + (apertureDiameter - renderH) / 2 + photoState.offsetY * (apertureDiameter / 300);

    ctx.drawImage(image, posX, posY, renderW, renderH);
    ctx.restore();
  } else {
    ctx.save();
    ctx.fillStyle = '#0F2417';
    ctx.beginPath();
    ctx.arc(cx, cy, apertureRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const frameImg = await getPfpFrameImage();
  if (frameImg) {
    ctx.drawImage(frameImg, 0, 0, width, height);
  }

  return canvas.toDataURL('image/png');
}

export async function renderBuilderCard({
  image,
  photoState,
  builderState,
  scaleFactor = 1,
}: RenderBuilderCardOptions): Promise<string> {
  await ensureCanvasFontsLoaded();

  const baseWidth = 1024;
  const baseHeight = 1536;

  const canvas = document.createElement('canvas');
  canvas.width = baseWidth * scaleFactor;
  canvas.height = baseHeight * scaleFactor;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get 2D context for canvas');

  ctx.scale(scaleFactor, scaleFactor);

  const cx = 493;
  const cy = 500;
  const r = 250;

  if (image) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    if (photoState.bwFilter) {
      ctx.filter = 'grayscale(100%) contrast(125%) brightness(95%)';
    } else {
      ctx.filter = 'contrast(105%) brightness(100%)';
    }

    const imgAspect = image.naturalWidth / image.naturalHeight;
    const targetAspect = 1;

    const frameW = r * 2;
    const frameH = r * 2;
    const frameX = cx - r;
    const frameY = cy - r;

    let renderW: number;
    let renderH: number;

    if (imgAspect > targetAspect) {
      renderH = frameH * photoState.zoom;
      renderW = renderH * imgAspect;
    } else {
      renderW = frameW * photoState.zoom;
      renderH = renderW / imgAspect;
    }

    const posX = frameX + (frameW - renderW) / 2 + photoState.offsetX * (frameW / 300);
    const posY = frameY + (frameH - renderH) / 2 + photoState.offsetY * (frameH / 300);

    ctx.drawImage(image, posX, posY, renderW, renderH);
    ctx.restore();
  } else {
    ctx.save();
    ctx.fillStyle = '#0F2417';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const bgImage = await getDefaultSampleImage();
  if (bgImage) {
    ctx.drawImage(bgImage, 0, 0, baseWidth, baseHeight);
  }

  const INK = '#1A3020';
  const maxW = 295;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = INK;
  const hasName = Boolean(builderState.name && builderState.name.trim());
  const rawName = hasName ? builderState.name.trim().toUpperCase() : '';
  if (rawName) {
    fitTextOnLine(ctx, rawName, 72, 835, maxW, 24, '"Victor Mono", "JetBrains Mono", monospace');
  }

  ctx.fillStyle = INK;
  const hasRole = Boolean(builderState.role && builderState.role.trim());
  const roleText = hasRole ? builderState.role.trim().toUpperCase() : '';
  if (roleText) {
    fitTextOnLine(ctx, roleText, 72, 920, maxW, 22, '"Victor Mono", "JetBrains Mono", monospace');
  }

  ctx.fillStyle = INK;
  const hasBuilding = Boolean(builderState.building && builderState.building.trim());
  const buildingText = hasBuilding ? builderState.building.trim().toUpperCase() : '';
  if (buildingText) {
    fitTextOnLine(ctx, buildingText, 72, 1005, maxW, 20, '"Victor Mono", "JetBrains Mono", monospace');
  }

  const hasTitle = Boolean(builderState.title && builderState.title.trim());
  if (hasTitle) {
    ctx.fillStyle = '#7B2828';
    const titleText = builderState.title.trim().toUpperCase();
    ctx.textAlign = 'center';
    fitTextOnLine(ctx, titleText, 545, 935, 200, 16, '"Victor Mono", monospace');

    if (builderState.tags && builderState.tags.length > 0) {
      const tagsText = builderState.tags.slice(0, 3).join(' · ');
      fitTextOnLine(ctx, tagsText, 545, 965, 200, 12, '"Victor Mono", monospace');
    }
    ctx.textAlign = 'left';
  }

  ctx.fillStyle = INK;
  const rawId = builderState.builderId || 'HHG26-0042';
  const digitsOnly = rawId.replace(/[^0-9]/g, '').padStart(4, '0').slice(-4);
  ctx.font = `700 28px "Victor Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.fillText(digitsOnly, 282, 1132);
  ctx.textAlign = 'left';

  try {
    const qrImg = await getStaticQrImage();
    if (qrImg) {
      ctx.save();
      ctx.globalCompositeOperation = 'multiply';
      ctx.drawImage(qrImg, 654, 1254, 172, 172);
      ctx.restore();
    }
  } catch (err) {
  }

  return canvas.toDataURL('image/png');
}

export async function renderBuilderCardHighRes(options: RenderBuilderCardOptions): Promise<string> {
  return renderBuilderCard({ ...options, scaleFactor: 2 });
}
