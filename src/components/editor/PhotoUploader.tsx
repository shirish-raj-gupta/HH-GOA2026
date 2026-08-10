import React, { useRef, useState } from 'react';
import { PhotoState } from '../../types';
import { convertHeicToJpeg } from '../../utils/heicConverter';
import { AvatarSilhouetteIcon } from '../icons/AvatarSilhouetteIcon';

interface PhotoUploaderProps {
  photoState: PhotoState;
  onPhotoSelected: (file: File, sourceUrl: string, aspectRatio: number) => void;
  onError: (errorMsg: string | null) => void;
  errorMessage: string | null;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photoState,
  onPhotoSelected,
  onError,
  errorMessage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const processSelectedFile = async (file: File) => {
    onError(null);
    setIsProcessing(true);

    try {
      if (file.size > 20 * 1024 * 1024) {
        throw new Error("That's a little too big. Try a photo smaller than 20MB.");
      }

      let finalFile = file;
      const lowerName = file.name.toLowerCase();
      if (
        lowerName.endsWith('.heic') ||
        lowerName.endsWith('.heif') ||
        file.type.includes('heic') ||
        file.type.includes('heif')
      ) {
        finalFile = await convertHeicToJpeg(file);
      } else if (!file.type.startsWith('image/')) {
        throw new Error('That file won\'t work here. Try a JPG, PNG, or HEIC photo.');
      }

      const objectUrl = URL.createObjectURL(finalFile);
      const img = new Image();

      img.onload = () => {
        const aspect = img.naturalWidth / img.naturalHeight;
        setIsProcessing(false);
        onPhotoSelected(finalFile, objectUrl, aspect);
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        setIsProcessing(false);
        onError('Could not decode photo. Please try a valid JPG, PNG, or HEIC file.');
      };

      img.src = objectUrl;
    } catch (err: any) {
      setIsProcessing(false);
      onError(err.message || 'Failed to process photo. Try another file.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="font-mono text-xs text-goa-gold uppercase tracking-wider flex items-center justify-between">
        <span>02 // UPLOAD PHOTO</span>
        <span className="text-goa-pink text-[10px] font-bold">
          {photoState.file ? 'PHOTO LOADED ✦' : '[REQUIRED]'}
        </span>
      </div>

      {errorMessage && (
        <div className="border-2 border-goa-pink bg-goa-green-deep rounded-lg p-4 text-[#F5F0E1] font-mono text-xs flex flex-col gap-2">
          <div className="flex items-center gap-2 text-goa-pink font-bold">
            <span className="material-symbols-outlined text-base">warning</span>
            <span>UPLOAD ERROR</span>
          </div>
          <p className="text-xs text-[#F5F0E1]/60">{errorMessage}</p>
          <button
            type="button"
            onClick={() => {
              onError(null);
              fileInputRef.current?.click();
            }}
            className="self-start mt-1 border border-goa-pink text-goa-pink px-3 py-1 text-[11px] font-bold uppercase hover:bg-goa-pink hover:text-white transition-colors cursor-pointer rounded"
          >
            TRY ANOTHER PHOTO
          </button>
        </div>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative w-full p-6 sm:p-8 border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer text-center group flex flex-col items-center justify-center overflow-hidden ${
          isDragging
            ? 'border-goa-gold bg-goa-gold/10'
            : photoState.file
            ? 'border-goa-gold bg-goa-green-deep'
            : 'border-[#F5F0E1]/20 bg-goa-surface hover:border-goa-gold hover:bg-goa-green-deep'
        }`}
      >
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-goa-gold/30 group-hover:border-goa-gold transition-colors rounded-tl" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-goa-gold/30 group-hover:border-goa-gold transition-colors rounded-tr" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-goa-gold/30 group-hover:border-goa-gold transition-colors rounded-bl" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-goa-gold/30 group-hover:border-goa-gold transition-colors rounded-br" />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          onChange={handleFileChange}
          className="hidden"
        />

        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-2">
            <span className="material-symbols-outlined text-3xl text-goa-gold animate-spin">
              sync
            </span>
            <span className="font-mono text-xs text-goa-gold uppercase tracking-widest">
              PARSING PHOTO & CONVERTING HEIC...
            </span>
          </div>
        ) : photoState.file ? (
          <div className="flex flex-col items-center justify-center space-y-2 py-2">
            <div className="w-12 h-12 border-2 border-goa-gold overflow-hidden bg-goa-green-deep rounded">
              <img
                src={photoState.sourceUrl!}
                alt="Selected preview thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="font-mono text-xs text-goa-gold font-bold uppercase truncate max-w-xs">
              {photoState.file.name}
            </div>
            <span className="font-mono text-[10px] text-[#F5F0E1]/40 underline uppercase">
              CLICK OR DROP TO REPLACE PHOTO
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 py-2">
            <div className="w-16 h-16 rounded-full border-2 border-goa-gold/30 bg-goa-green-deep flex items-center justify-center p-2 group-hover:border-goa-gold transition-colors shadow-inner">
              <AvatarSilhouetteIcon className="w-12 h-12 text-[#F5F0E1]/40 group-hover:text-goa-gold transition-colors" />
            </div>
            <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#F5F0E1] uppercase tracking-tight">
              DROP YOUR PHOTO HERE
            </h3>
            <p className="font-mono text-xs text-[#F5F0E1]/40">
              or choose from your device
            </p>
            <div className="pt-2 flex gap-2">
              <span className="border border-goa-gold/30 px-2 py-0.5 font-mono text-[10px] text-goa-gold/60 rounded">
                JPG
              </span>
              <span className="border border-goa-gold/30 px-2 py-0.5 font-mono text-[10px] text-goa-gold/60 rounded">
                PNG
              </span>
              <span className="border border-goa-gold/30 px-2 py-0.5 font-mono text-[10px] text-goa-gold/60 rounded">
                HEIC
              </span>
            </div>
            <p className="font-body text-[11px] text-[#F5F0E1]/30 pt-1">
              Any angle. Any crop. We'll handle the framing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
