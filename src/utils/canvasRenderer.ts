import { BuilderState, PhotoState } from '../types';

interface RenderPfpOptions {
  image: HTMLImageElement;
  photoState: PhotoState;
}

interface RenderBuilderCardOptions {
  image: HTMLImageElement | null;
  photoState: PhotoState;
  builderState: BuilderState;
}

export async function ensureCanvasFontsLoaded() {
  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await Promise.all([
        document.fonts.load('900 64px Imbue'),
        document.fonts.load('800 36px Imbue'),
        document.fonts.load('900 64px Anybody'),
        document.fonts.load('800 36px Anybody'),
        document.fonts.load('700 24px "Victor Mono"'),
        document.fonts.load('700 24px "JetBrains Mono"'),
        document.fonts.load('500 16px "JetBrains Mono"'),
        document.fonts.load('400 20px Inter')
      ]);
      await document.fonts.ready;
    } catch (e) {
      console.warn('Font loading for canvas fallback:', e);
    }
  }
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawCyberGoaBackdrop(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();

  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#0D3D22');
  bgGrad.addColorStop(0.5, '#1A6B3C');
  bgGrad.addColorStop(1, '#072414');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  const sunX = width / 2;
  const sunY = 220;

  const sunGrad = ctx.createRadialGradient(sunX, sunY, 20, sunX, sunY, 320);
  sunGrad.addColorStop(0, 'rgba(232, 200, 64, 0.45)');
  sunGrad.addColorStop(0.6, 'rgba(255, 45, 120, 0.25)');
  sunGrad.addColorStop(1, 'rgba(13, 61, 34, 0)');
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(sunX, sunY, 320, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(232, 200, 64, 0.25)' : 'rgba(255, 45, 120, 0.25)';
    ctx.beginPath();
    const startY = height - 350 + i * 40;
    ctx.moveTo(0, startY);
    for (let x = 0; x <= width; x += 40) {
      ctx.quadraticCurveTo(x + 20, startY - 20 * (i % 2 === 0 ? 1 : -1), x + 40, startY);
    }
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(232, 200, 64, 0.3)';
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(0, 100);
  ctx.quadraticCurveTo(140, 140, 240, 40);
  ctx.moveTo(0, 140);
  ctx.quadraticCurveTo(180, 200, 300, 120);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(width, 100);
  ctx.quadraticCurveTo(width - 140, 140, width - 240, 40);
  ctx.moveTo(width, 140);
  ctx.quadraticCurveTo(width - 180, 200, width - 300, 120);
  ctx.stroke();

  ctx.restore();
}

function drawHologramSeal(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
  ctx.save();
  ctx.translate(cx, cy);

  ctx.fillStyle = '#FF2D78';
  ctx.beginPath();
  ctx.arc(0, 0, radius + 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#072414';
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#E8C840';
  ctx.font = '800 11px "Victor Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('VERIFIED', 0, -5);
  ctx.fillText('HHGOA\'26', 0, 9);

  ctx.restore();
}

function drawMicrochip(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save();

  ctx.fillStyle = '#E8C840';
  drawRoundedRect(ctx, x, y, w, h, 6);
  ctx.fill();

  ctx.strokeStyle = '#0D3D22';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#0D3D22';
  ctx.font = '900 16px "Victor Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('[::]', x + w / 2, y + h / 2 + 5);

  ctx.restore();
}

function drawArchedUserPhoto(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  zoom: number,
  offsetX: number,
  offsetY: number,
  bwFilter: boolean
) {
  ctx.save();

  const radius = 32;

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.clip();

  ctx.fillStyle = '#072414';
  ctx.fillRect(x, y, w, h);

  if (bwFilter) {
    ctx.filter = 'grayscale(100%) contrast(125%) brightness(95%)';
  } else {
    ctx.filter = 'contrast(105%) brightness(100%)';
  }

  const imgAspect = image.naturalWidth / image.naturalHeight;
  const targetAspect = w / h;

  let renderW: number;
  let renderH: number;

  if (imgAspect > targetAspect) {
    renderH = h * zoom;
    renderW = renderH * imgAspect;
  } else {
    renderW = w * zoom;
    renderH = renderW / imgAspect;
  }

  const posX = x + (w - renderW) / 2 + offsetX * (w / 300);
  const posY = y + (h - renderH) / 2 + offsetY * (h / 300);

  ctx.drawImage(image, posX, posY, renderW, renderH);

  ctx.restore();
}

function drawAvatarSilhouetteOnCanvas(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  color: string
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;

  // Head
  ctx.beginPath();
  ctx.arc(0, -25, 26, 0, Math.PI * 2);
  ctx.fill();

  // Shoulders & Body Curve
  ctx.beginPath();
  ctx.moveTo(-52, 52);
  ctx.bezierCurveTo(-52, 10, -32, 2, 0, 2);
  ctx.bezierCurveTo(32, 2, 52, 10, 52, 52);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
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

  drawCyberGoaBackdrop(ctx, width, height);

  const margin = 80;
  const photoW = width - margin * 2;
  const photoH = height - margin * 2;

  if (image) {
    drawArchedUserPhoto(
      ctx,
      image,
      margin,
      margin,
      photoW,
      photoH,
      photoState.zoom,
      photoState.offsetX,
      photoState.offsetY,
      photoState.bwFilter
    );
  } else {
    ctx.fillStyle = '#072414';
    drawRoundedRect(ctx, margin, margin, photoW, photoH, 32);
    ctx.fill();

    drawAvatarSilhouetteOnCanvas(
      ctx,
      width / 2,
      height / 2 - 20,
      3.2,
      'rgba(232, 200, 64, 0.75)'
    );
  }

  ctx.strokeStyle = '#FF2D78';
  ctx.lineWidth = 14;
  drawRoundedRect(ctx, margin, margin, photoW, photoH, 32);
  ctx.stroke();

  ctx.strokeStyle = '#E8C840';
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, margin + 14, margin + 14, photoW - 28, photoH - 28, 22);
  ctx.stroke();

  drawHologramSeal(ctx, width - margin - 50, margin + 50, 42);
  drawMicrochip(ctx, margin + 40, margin + 40, 50, 36);

  const ribbonW = 340;
  const ribbonH = 80;
  const ribbonX = width / 2 - ribbonW / 2;
  const ribbonY = height - margin - ribbonH / 2;

  ctx.fillStyle = '#FF2D78';
  drawRoundedRect(ctx, ribbonX, ribbonY, ribbonW, ribbonH, 18);
  ctx.fill();

  ctx.strokeStyle = '#E8C840';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = '#E8C840';
  ctx.font = '900 56px Imbue, Anybody, serif';
  ctx.textAlign = 'center';
  ctx.fillText('GOA 2026', width / 2, ribbonY + 58);

  return canvas.toDataURL('image/png');
}

export async function renderBuilderCard({
  image,
  photoState,
  builderState,
}: RenderBuilderCardOptions): Promise<string> {
  await ensureCanvasFontsLoaded();

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1440;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get 2D context for canvas');

  const width = canvas.width;
  const height = canvas.height;

  drawCyberGoaBackdrop(ctx, width, height);

  const headerX = 60;
  const headerY = 60;
  const headerW = width - 120;
  const headerH = 100;

  ctx.fillStyle = 'rgba(13, 61, 34, 0.85)';
  drawRoundedRect(ctx, headerX, headerY, headerW, headerH, 24);
  ctx.fill();

  ctx.strokeStyle = '#E8C840';
  ctx.lineWidth = 3;
  ctx.stroke();

  drawHologramSeal(ctx, headerX + 50, headerY + 50, 36);

  ctx.fillStyle = '#E8C840';
  ctx.font = '900 48px Imbue, Anybody, serif';
  ctx.textAlign = 'center';
  ctx.fillText('HACKER HOUSE GOA 2026', width / 2 + 20, headerY + 52);

  ctx.fillStyle = '#FF2D78';
  ctx.font = '700 14px "Victor Mono", monospace';
  ctx.fillText('/// VIP BUILDER PASS · OCT 28–31', width / 2 + 20, headerY + 80);

  drawMicrochip(ctx, headerX + headerW - 80, headerY + 30, 52, 40);

  const photoX = 60;
  const photoY = 190;
  const photoW = width - 120;
  const photoH = 580;

  if (image) {
    drawArchedUserPhoto(
      ctx,
      image,
      photoX,
      photoY,
      photoW,
      photoH,
      photoState.zoom,
      photoState.offsetX,
      photoState.offsetY,
      photoState.bwFilter
    );
  } else {
    const photoGrad = ctx.createLinearGradient(photoX, photoY, photoX, photoY + photoH);
    photoGrad.addColorStop(0, '#0D3D22');
    photoGrad.addColorStop(1, '#072414');
    ctx.fillStyle = photoGrad;
    drawRoundedRect(ctx, photoX, photoY, photoW, photoH, 32);
    ctx.fill();

    drawAvatarSilhouetteOnCanvas(
      ctx,
      width / 2,
      photoY + photoH / 2 - 20,
      2.5,
      'rgba(232, 200, 64, 0.75)'
    );

    ctx.fillStyle = 'rgba(232, 200, 64, 0.6)';
    ctx.font = '700 18px "Victor Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('✦ UPLOAD YOUR PHOTO ABOVE ✦', width / 2, photoY + photoH - 60);
  }

  ctx.strokeStyle = '#FF2D78';
  ctx.lineWidth = 8;
  drawRoundedRect(ctx, photoX, photoY, photoW, photoH, 32);
  ctx.stroke();

  ctx.fillStyle = '#E8C840';
  ctx.fillRect(photoX + 16, photoY + 16, 24, 4);
  ctx.fillRect(photoX + 16, photoY + 16, 4, 24);

  ctx.fillRect(photoX + photoW - 40, photoY + 16, 24, 4);
  ctx.fillRect(photoX + photoW - 20, photoY + 16, 4, 24);

  ctx.fillStyle = '#FF2D78';
  drawRoundedRect(ctx, photoX + photoW - 220, photoY + photoH - 52, 200, 42, 12);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 15px "Victor Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('✓ VERIFIED BUILDER', photoX + photoW - 120, photoY + photoH - 25);

  const tags = builderState.tags && builderState.tags.length > 0 ? builderState.tags : ['RUST', 'ZK-SNARKS'];
  let tagX = photoX + 24;

  tags.forEach((tag) => {
    const tw = ctx.measureText(tag).width + 36;
    ctx.fillStyle = 'rgba(13, 61, 34, 0.9)';
    drawRoundedRect(ctx, tagX, photoY + 24, tw, 36, 10);
    ctx.fill();

    ctx.strokeStyle = '#E8C840';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#E8C840';
    ctx.font = '700 14px "Victor Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(tag, tagX + tw / 2, photoY + 47);

    tagX += tw + 12;
  });

  const stubY = 800;
  const stubH = 580;

  ctx.fillStyle = '#E8C840';
  drawRoundedRect(ctx, 60, stubY, width - 120, stubH, 28);
  ctx.fill();

  ctx.strokeStyle = '#0D3D22';
  ctx.lineWidth = 4;
  ctx.stroke();

  const notchY = stubY + 54;
  ctx.fillStyle = '#072414';

  ctx.beginPath();
  ctx.arc(60, notchY, 18, Math.PI * 1.5, Math.PI * 0.5);
  ctx.fill();
  ctx.strokeStyle = '#0D3D22';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(width - 60, notchY, 18, Math.PI * 0.5, Math.PI * 1.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = 'rgba(13, 61, 34, 0.8)';
  ctx.font = '700 13px "Victor Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('/// TICKET STUB SECURITY CREDENTIAL', 90, stubY + 36);

  ctx.textAlign = 'right';
  const builderId = builderState.builderId || '042-GOA';
  ctx.fillText(`ID: ${builderId}`, width - 90, stubY + 36);

  ctx.strokeStyle = 'rgba(13, 61, 34, 0.4)';
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(78, notchY);
  ctx.lineTo(width - 78, notchY);
  ctx.stroke();
  ctx.setLineDash([]);

  const nameY = stubY + 125;
  const hasName = Boolean(builderState.name && builderState.name.trim());
  const rawName = hasName ? builderState.name.trim().toUpperCase() : 'YOUR NAME HERE';

  ctx.fillStyle = hasName ? '#0D3D22' : 'rgba(13, 61, 34, 0.4)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Dynamic font sizing for Name to prevent overflow
  let nameFontSize = 52;
  const maxNameWidth = width - 200;
  ctx.font = `900 ${nameFontSize}px Anybody, "Victor Mono", sans-serif`;
  while (ctx.measureText(rawName).width > maxNameWidth && nameFontSize > 22) {
    nameFontSize -= 2;
    ctx.font = `900 ${nameFontSize}px Anybody, "Victor Mono", sans-serif`;
  }
  ctx.fillText(rawName, width / 2, nameY);

  // Role Pill
  const roleY = stubY + 165;
  const roleH = 54;
  const hasRole = Boolean(builderState.role && builderState.role.trim());
  const roleText = hasRole ? builderState.role.trim().toUpperCase() : 'FULL-STACK / AI BUILDER';

  ctx.fillStyle = '#FF2D78';
  drawRoundedRect(ctx, 110, roleY, width - 220, roleH, 18);
  ctx.fill();

  ctx.fillStyle = hasRole ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)';
  let roleFontSize = 22;
  const maxRoleWidth = width - 260;
  ctx.font = `900 ${roleFontSize}px Anybody, "Victor Mono", sans-serif`;
  while (ctx.measureText(roleText).width > maxRoleWidth && roleFontSize > 14) {
    roleFontSize -= 1;
    ctx.font = `900 ${roleFontSize}px Anybody, "Victor Mono", sans-serif`;
  }
  ctx.fillText(roleText, width / 2, roleY + roleH / 2);

  // Title Box
  const titleY = stubY + 242;
  const titleH = 54;
  const hasTitle = Boolean(builderState.title && builderState.title.trim());
  const titleText = hasTitle ? builderState.title.trim().toUpperCase() : 'THE SHIP-IT ENGINEER';

  ctx.fillStyle = '#0D3D22';
  drawRoundedRect(ctx, 90, titleY, width - 180, titleH, 18);
  ctx.fill();

  ctx.strokeStyle = '#E8C840';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = hasTitle ? '#E8C840' : 'rgba(232, 200, 64, 0.6)';
  let titleFontSize = 24;
  const maxTitleWidth = width - 240;
  const fullTitleStr = `[ ${titleText} ]`;
  ctx.font = `900 ${titleFontSize}px Anybody, "Victor Mono", sans-serif`;
  while (ctx.measureText(fullTitleStr).width > maxTitleWidth && titleFontSize > 14) {
    titleFontSize -= 1;
    ctx.font = `900 ${titleFontSize}px Anybody, "Victor Mono", sans-serif`;
  }
  ctx.fillText(fullTitleStr, width / 2, titleY + titleH / 2);

  ctx.textBaseline = 'alphabetic';

  ctx.strokeStyle = 'rgba(13, 61, 34, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(90, stubY + 322);
  ctx.lineTo(width - 90, stubY + 322);
  ctx.stroke();

  const gridY = stubY + 355;

  ctx.fillStyle = 'rgba(13, 61, 34, 0.65)';
  ctx.font = '700 12px "Victor Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('STATUS / FOCUS', 90, gridY);

  const hasBuilding = Boolean(builderState.building && builderState.building.trim());
  const buildingText = hasBuilding ? builderState.building.trim().toUpperCase() : 'SHIPPER OF QUESTIONABLE IDEAS';
  ctx.fillStyle = hasBuilding ? '#0D3D22' : 'rgba(13, 61, 34, 0.45)';
  ctx.font = '800 18px Anybody, sans-serif';
  ctx.fillText(buildingText.slice(0, 32), 90, gridY + 26);

  const col2X = width - 360;
  ctx.fillStyle = 'rgba(13, 61, 34, 0.65)';
  ctx.font = '700 12px "Victor Mono", monospace';
  ctx.fillText('LOCATION / VENUE', col2X, gridY);

  ctx.fillStyle = '#0D3D22';
  ctx.font = '800 18px Anybody, sans-serif';
  ctx.fillText('PALOLEM BEACH, GOA', col2X, gridY + 26);

  const barcodeY = stubY + 425;
  const barcodeW = width - 180;

  ctx.fillStyle = '#0D3D22';
  let bx = 90;
  const widths = [4, 2, 6, 2, 3, 7, 2, 4, 2, 6, 3, 2, 8, 3, 2, 5, 2, 4, 3, 6, 2, 4, 7, 2, 5, 2, 3];
  for (let i = 0; i < widths.length; i++) {
    const w = widths[i];
    if (i % 2 === 0) ctx.fillRect(bx, barcodeY, w, 38);
    bx += w + (i % 3) * 2;
    if (bx >= 90 + barcodeW) break;
  }

  const tagY = stubY + 490;
  ctx.fillStyle = '#0D3D22';
  drawRoundedRect(ctx, 90, tagY, width - 180, 48, 14);
  ctx.fill();

  ctx.fillStyle = '#E8C840';
  ctx.font = '700 16px "Victor Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('✦ BUILD · SHIP · REPEAT ✦ #FRAMEINGOA ✦', width / 2, tagY + 30);

  return canvas.toDataURL('image/png');
}
