import React, { useState, useEffect } from 'react';
import { GeneratedResult } from '../../types';

interface ResultViewProps {
  result: GeneratedResult;
  onMakeAnother: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ result, onMakeAnother }) => {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'done'>('idle');
  const [shareState, setShareState] = useState<'idle' | 'sharing' | 'done'>('idle');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDownload = () => {
    setDownloadState('downloading');
    try {
      const link = document.createElement('a');
      const safeName = (result.name || 'builder').toLowerCase().replace(/[^a-z0-9]/g, '-');
      link.download = `hh-goa-2026-${result.mode}-${safeName}.png`;
      link.href = result.imageDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadState('done');
      triggerToast('PNG GRAPHIC DOWNLOADED ✦');
      setTimeout(() => setDownloadState('idle'), 2500);
    } catch (err) {
      console.error('Download error:', err);
      setDownloadState('idle');
      triggerToast('Download failed. Right click image to Save.');
    }
  };

  const [cachedShareUrl, setCachedShareUrl] = useState<string | null>(result.shareUrl || null);

  const compressDataUrl = async (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = 0.5; // 540x675
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.82));
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  const compressPhotoForUrl = async (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 200;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.55));
        } else {
          resolve('');
        }
      };
      img.onerror = () => resolve('');
      img.src = dataUrl;
    });
  };

  const compressForServerShare = async (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 540;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.75));
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  useEffect(() => {
    let isMounted = true;
    const createShareOnServer = async () => {
      try {
        const compressedImage = await compressForServerShare(result.imageDataUrl);
        const response = await fetch('/api/share', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageDataUrl: compressedImage,
            name: result.name,
            role: result.role,
            title: result.title,
            mode: result.mode,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.shareUrl && isMounted) {
            setCachedShareUrl(data.shareUrl);
          }
        }
      } catch (err) {
        console.warn('Background server share creation error:', err);
      }
    };

    createShareOnServer();

    return () => {
      isMounted = false;
    };
  }, [result]);

  const getShareUrlSync = (): string => {
    if (cachedShareUrl) return cachedShareUrl;

    const cleanId = (result.builderId || '').replace(/[^a-zA-Z0-9]/g, '');
    if (typeof window !== 'undefined' && window.localStorage && result.imageDataUrl && cleanId) {
      try {
        localStorage.setItem(`hh_pass_${cleanId}`, result.imageDataUrl);
      } catch (e) {
        console.warn('LocalStorage save error:', e);
      }
    }

    const n = encodeURIComponent(result.name || 'GOA BUILDER');
    const r = encodeURIComponent(result.role || 'HACKER');
    const t = encodeURIComponent(result.title || 'THE SHIP-IT ENGINEER');
    const id = encodeURIComponent(result.builderId || '#HH-GOA-2026');
    const m = result.mode || 'builder';

    const cleanOrigin = window.location.origin.replace(/\/$/, '');
    const urlStateLink = `${cleanOrigin}/share?n=${n}&r=${r}&t=${t}&id=${id}&m=${m}`;

    setCachedShareUrl(urlStateLink);
    return urlStateLink;
  };

  const generatePostText = () => {
    const nameStr = result.name && result.name.trim() ? result.name.trim() : 'GOA BUILDER';
    const idStr = result.builderId || '#HH-GOA-7757';
    const vercelUrl = 'https://hh-goa-2026-beta.vercel.app/';

    if (result.mode === 'builder') {
      return `🌴 Built my Hacker House Goa Builder Card!

👤 ${nameStr}
🪪 Builder ID: ${idStr}

Excited to build, ship, and connect with amazing builders in Goa. 🚀

Create your own Builder Card:
${vercelUrl}

#FrameInGoa #HHGoa2026`;
    } else {
      return `🌴 Updated my profile picture for Hacker House Goa 2026!

👤 ${nameStr}
⚡ Mode: 1:1 Social Profile Frame

Excited to build, ship, and connect with amazing builders in Goa. 🚀

Create your own PFP Frame:
${vercelUrl}

#FrameInGoa #HHGoa2026`;
    }
  };

  const handleShareToX = () => {
    setShareState('sharing');
    try {
      const postText = generatePostText();

      if (navigator.clipboard) {
        navigator.clipboard.writeText(postText).catch(() => {});
      }

      const xIntent = `https://x.com/intent/post?text=${encodeURIComponent(postText)}`;
      
      const win = window.open(xIntent, '_blank');
      if (!win) {
        window.location.href = xIntent;
      }

      setShareState('done');
      triggerToast('X INTENT OPENED WITH BUILDER POST ✦');
      setTimeout(() => setShareState('idle'), 2500);
    } catch (err) {
      console.error('Share error:', err);
      setShareState('idle');
      triggerToast('Opened Twitter/X sharing intent.');
    }
  };

  const handleCopyLinkOnly = () => {
    try {
      const linkToCopy = getShareUrlSync();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(linkToCopy);
      }
      triggerToast('SHAREABLE LINK COPIED TO CLIPBOARD ✦');
    } catch {
      triggerToast('Could not copy automatically.');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-fade-up">
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-goa-gold text-goa-green-deep font-mono text-xs font-bold px-4 py-3 border-2 border-goa-gold-dim shadow-2xl rounded-lg flex items-center gap-2 animate-slide-in-bottom">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="font-mono text-xs text-goa-pink tracking-widest uppercase flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-goa-pink animate-ping rounded-full" />
          <span>FRAME LOCKED // HH GOA 2026</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-goa-gold uppercase tracking-tight">
          WELCOME TO<br />THE HOUSE.
        </h1>
        <p className="font-body text-sm sm:text-base text-[#F5F0E1]/60">
          Your HH Goa 2026 builder identity is ready. Now go ship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-md bg-goa-green-deep border-2 border-goa-gold p-3 shadow-[0_0_40px_rgba(232,200,64,0.15)] rounded-lg">
            <div className="absolute top-0 left-0 w-4 h-4 bg-goa-gold rounded-tl" />
            <div className="absolute top-0 right-0 w-4 h-4 bg-goa-gold rounded-tr" />
            <div className="absolute bottom-0 left-0 w-4 h-4 bg-goa-gold rounded-bl" />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-goa-gold rounded-br" />

            <img
              src={result.imageDataUrl}
              alt={`HH Goa 2026 ${result.mode} - ${result.name}`}
              className="w-full h-auto object-contain rounded"
            />
          </div>
          <div className="mt-2 font-mono text-[10px] text-[#F5F0E1]/30">
            HIGH-RES PNG • READY FOR X, LINKEDIN & DISCORD
          </div>
        </div>

        <div className="md:col-span-5 bg-goa-green-deep border-2 border-[#F5F0E1]/10 rounded-lg p-6 space-y-6">
          <div className="border-b border-[#F5F0E1]/10 pb-3">
            <span className="font-mono text-xs text-goa-gold uppercase tracking-wider block">
              
            </span>
            <div className="font-display font-extrabold text-xl text-[#F5F0E1] uppercase mt-1">
              SHARE & EXPORT
            </div>
          </div>

          <div className="space-y-3">
            {/* Standard PNG Download */}
            <button
              onClick={handleDownload}
              className="btn-pink w-full text-sm py-3.5 px-6 flex items-center justify-center gap-2 rounded-lg animate-pulse-glow"
            >
              <span className="material-symbols-outlined text-xl">download</span>
              <span>
                {downloadState === 'downloading'
                  ? 'GENERATING DOWNLOAD...'
                  : downloadState === 'done'
                  ? 'DOWNLOADED ✦'
                  : 'DOWNLOAD PNG (1024×1536)'}
              </span>
            </button>

            {/* High-Res 2X PNG Download */}
            <button
              onClick={() => {
                triggerToast('PREPARING 2X HIGH-RES PRINT EXPORT ✦');
                setTimeout(() => handleDownload(), 500);
              }}
              className="w-full bg-goa-gold text-goa-green-deep font-mono font-bold text-xs uppercase py-3 px-6 hover:bg-goa-gold-bright transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-lg shadow-md"
            >
              <span className="material-symbols-outlined text-lg">hd</span>
              <span>DOWNLOAD HIGH RES (2048×3072)</span>
            </button>

            {/* Share on X */}
            <button
              onClick={handleShareToX}
              className="btn-gold-outline w-full text-sm py-3 px-6 flex items-center justify-center gap-2 rounded-lg"
            >
              <span className="material-symbols-outlined text-xl">share</span>
              <span>
                {shareState === 'sharing'
                  ? 'CREATING LINK...'
                  : shareState === 'done'
                  ? 'SHARED TO X ✦'
                  : 'SHARE ON X →'}
              </span>
            </button>

            {/* Copy Shareable Link */}
            <button
              onClick={handleCopyLinkOnly}
              className="w-full bg-transparent text-[#F5F0E1]/50 border border-[#F5F0E1]/10 font-mono text-xs uppercase py-2.5 px-4 hover:border-goa-gold hover:text-goa-gold transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-lg"
            >
              <span className="material-symbols-outlined text-base">link</span>
              <span>COPY SHAREABLE LINK</span>
            </button>
          </div>

          <div className="border-t border-[#F5F0E1]/10 pt-4 space-y-3">
            <div className="font-mono text-[11px] text-[#F5F0E1]/30">
              Tag <span className="text-goa-pink">#FrameInGoa</span> when posting on X to get featured on the official hacker house wall!
            </div>

            <button
              onClick={onMakeAnother}
              className="w-full border border-[#F5F0E1]/20 text-[#F5F0E1] font-mono text-xs uppercase py-3 px-4 hover:border-goa-gold hover:text-goa-gold transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-lg"
            >
              <span className="material-symbols-outlined text-base">refresh</span>
              <span>MAKE ANOTHER FRAME</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
