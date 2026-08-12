import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';

export const DEFAULT_BASE_URL = 'https://hhgoa-builder.app';

/**
 * Generates a real, scannable QR Code as a Data URL for the builder's profile URL.
 * Target URL format: https://hhgoa-builder.app/builder/{builderId}
 */
export async function generateQRCodeDataURL(
  builderId: string,
  baseUrl: string = DEFAULT_BASE_URL
): Promise<string> {
  const profileUrl = `${baseUrl.replace(/\/$/, '')}/builder/${builderId}`;
  try {
    return await QRCode.toDataURL(profileUrl, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 300,
      color: {
        dark: '#143021', // Match vintage green ink
        light: '#00000000', // Transparent background to show card paper texture
      },
    });
  } catch (err) {
    console.error('Failed to generate QR code:', err);
    return '';
  }
}

/**
 * Generates a real Code 128 Barcode as a Data URL for the builder ID.
 */
export function generateBarcodeDataURL(builderId: string): string {
  try {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, builderId, {
      format: 'CODE128',
      displayValue: false, // We render human readable text on the pass guidelines
      lineColor: '#143021',
      background: 'transparent',
      height: 70,
      margin: 0,
    });
    return canvas.toDataURL('image/png');
  } catch (err) {
    console.error('Failed to generate barcode:', err);
    return '';
  }
}
