import React, { useState } from 'react';
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

  const getOrGenerateShareUrl = async (): Promise<string> => {
    if (cachedShareUrl) return cachedShareUrl;
    if (result.shareUrl) {
      setCachedShareUrl(result.shareUrl);
      return result.shareUrl;
    }

    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageDataUrl: result.imageDataUrl,
          name: result.name,
          role: result.role,
          title: result.title,
          mode: result.mode,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.shareUrl) {
          setCachedShareUrl(data.shareUrl);
          return data.shareUrl;
        }
      } else if (response.status === 429) {
        triggerToast('RATE LIMIT: PLEASE WAIT A MOMENT BEFORE SHARING AGAIN ✦');
      } else {
        const errData = await response.json().catch(() => ({}));
        if (errData.error) {
          triggerToast(errData.error.toUpperCase());
        }
      }
    } catch (err) {
      console.warn('Share API request failed:', err);
    }

    return window.location.href;
  };

  const generatePostText = (shareUrl: string) => {
    const nameStr = result.name && result.name.trim() ? result.name.trim() : 'GOA BUILDER';
    const idStr = result.builderId || '#HH-GOA-7757';
    if (result.mode === 'builder') {
      return `🌴 Built my Hacker Goa House Builder Card!

👤 ${nameStr}
🪪 Builder ID: ${idStr}

Excited to build, ship, and connect with amazing builders in Goa. 🚀

Create your own Builder Card:
${shareUrl}

#FrameInGoa #HHGoa2026`;
    } else {
      return `🌴 Updated my profile picture for Hacker House Goa 2026!

👤 ${nameStr}
⚡ Mode: 1:1 Social Profile Frame

Excited to build, ship, and connect with amazing builders in Goa. 🚀

Create your own PFP Frame:
${shareUrl}

#FrameInGoa #HHGoa2026`;
    }
  };

  const handleShareToX = async () => {
    setShareState('sharing');
    try {
      const finalShareUrl = await getOrGenerateShareUrl();
      const postText = generatePostText(finalShareUrl);

      try {
        await navigator.clipboard.writeText(postText);
      } catch (clipErr) {
        console.warn('Clipboard write warning:', clipErr);
      }

      const xIntent = `https://x.com/intent/post?text=${encodeURIComponent(postText)}`;
      window.open(xIntent, '_blank');

      setShareState('done');
      triggerToast('X INTENT OPENED WITH BUILDER POST ✦');
      setTimeout(() => setShareState('idle'), 2500);
    } catch (err) {
      console.error('Share error:', err);
      setShareState('idle');
      triggerToast('Opened Twitter/X sharing intent.');
    }
  };

  const handleCopyLinkOnly = async () => {
    try {
      const linkToCopy = await getOrGenerateShareUrl();
      await navigator.clipboard.writeText(linkToCopy);
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
            <button
              onClick={handleDownload}
              className="btn-pink w-full text-sm py-4 px-6 flex items-center justify-center gap-2 rounded-lg animate-pulse-glow"
            >
              <span className="material-symbols-outlined text-xl">download</span>
              <span>
                {downloadState === 'downloading'
                  ? 'GENERATING DOWNLOAD...'
                  : downloadState === 'done'
                  ? 'DOWNLOADED ✦'
                  : 'DOWNLOAD PNG ↓'}
              </span>
            </button>

            <button
              onClick={handleShareToX}
              className="btn-gold-outline w-full text-sm py-3.5 px-6 flex items-center justify-center gap-2 rounded-lg"
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
