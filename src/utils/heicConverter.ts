import heic2any from 'heic2any';

/**
 * Converts HEIC/HEIF file to JPEG Blob/File
 */
export async function convertHeicToJpeg(file: File): Promise<File> {
  const extension = file.name.split('.').pop()?.toLowerCase();
  const isHeic = extension === 'heic' || extension === 'heif' || file.type.includes('heic') || file.type.includes('heif');

  if (!isHeic) {
    return file;
  }

  try {
    const conversionResult = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.9,
    });

    const resultBlob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
    const newFileName = file.name.replace(/\.(heic|heif)$/i, '.jpg');

    return new File([resultBlob], newFileName, {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });
  } catch (err) {
    console.error('HEIC conversion failed:', err);
    throw new Error("Could not convert HEIC photo automatically. Please try a JPG or PNG photo.");
  }
}
