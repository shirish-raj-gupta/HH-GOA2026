import React, { useCallback, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { LandingHero } from './components/LandingHero';
import { FormatSelector } from './components/FormatSelector';
import { PhotoUploader } from './components/PhotoUploader';
import { PhotoAdjuster } from './components/PhotoAdjuster';
import { BuilderDetailsForm } from './components/BuilderDetailsForm';
import { PreviewCanvas } from './components/PreviewCanvas';
import { GeneratingLoader } from './components/GeneratingLoader';
import { ResultView } from './components/ResultView';
import { SharedViewModal } from './components/SharedViewModal';
import { MobileNav } from './components/MobileNav';
import { LoadingScreen } from './components/LoadingScreen';
import { AppStep, BuilderState, CreationMode, GeneratedResult, PhotoState } from './types';
import { getOrCreateUniqueBuilderId } from './utils/builderId';
import heroBgImg from '../assets/image.png';

async function compressAndUploadShareCard(
  dataUrl: string,
  name: string,
  role: string,
  title: string,
  mode: string
): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
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
        const compressedImage = canvas.toDataURL('image/jpeg', 0.75);

        try {
          const res = await fetch('/api/share', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageDataUrl: compressedImage,
              name,
              role,
              title,
              mode,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data.shareUrl) {
              resolve(data.shareUrl);
              return;
            }
          }
        } catch (err) {
          console.warn('Pre-upload share error:', err);
        }
      }
      resolve(null);
    };
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

function getRandomBuilderUid(): string {
  const randNum = Math.floor(1000 + Math.random() * 9000);
  return `#HH-GOA-${randNum}`;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState<AppStep>('LANDING');
  const [mode, setMode] = useState<CreationMode>('builder');

  const [photoState, setPhotoState] = useState<PhotoState>({
    file: null,
    sourceUrl: '/assets/image2.png',
    zoom: 1.1,
    offsetX: 0,
    offsetY: 0,
    bwFilter: false,
    aspectRatio: 1,
  });

  const [builderState, setBuilderState] = useState<BuilderState>({
    name: '',
    role: '',
    building: '',
    title: '',
    tags: ['RUST', 'ZK-SNARKS'],
    builderId: getOrCreateUniqueBuilderId(),
  });

  const [renderedDataUrl, setRenderedDataUrl] = useState<string | null>(null);
  const [generatedResult, setGeneratedResult] = useState<GeneratedResult | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [sharedCardFromUrl, setSharedCardFromUrl] = useState<{
    id?: string;
    name: string;
    role: string;
    title: string;
    builderId: string;
    mode: 'builder' | 'pfp';
    imageUrl?: string;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let n = params.get('n') || params.get('name');
    let r = params.get('r') || params.get('role');
    let t = params.get('t') || params.get('title');
    let id = params.get('id') || params.get('shareId');
    let m = (params.get('m') || params.get('mode') || 'builder') as 'builder' | 'pfp';
    let img = params.get('img') || params.get('image');

    const match = window.location.pathname.match(/^\/(?:share|s)\/([a-zA-Z0-9_-]+)/);
    let serverShareId: string | undefined = undefined;
    if (match) {
      serverShareId = match[1];
      if (!id) id = match[1];
    }

    if (n || r || t || id || img || serverShareId) {
      setSharedCardFromUrl({
        id: serverShareId,
        name: n ? decodeURIComponent(n) : 'GOA BUILDER',
        role: r ? decodeURIComponent(r) : 'HACKER',
        title: t ? decodeURIComponent(t) : 'THE SHIP-IT ENGINEER',
        builderId: id ? decodeURIComponent(id) : '#HH-GOA-2026',
        mode: m,
        imageUrl: img ? decodeURIComponent(img) : undefined,
      });
    }
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleStartFlow = (selectedMode: CreationMode) => {
    setMode(selectedMode);
    setStep('STUDIO');
  };

  const handleNavigate = (targetStep: AppStep, targetMode?: CreationMode) => {
    if (targetMode) setMode(targetMode);
    setStep(targetStep);
  };

  const handlePhotoSelected = (file: File, sourceUrl: string, aspectRatio: number) => {
    setPhotoState((prev) => ({
      ...prev,
      file,
      sourceUrl,
      aspectRatio,
      zoom: 1.1,
      offsetX: 0,
      offsetY: 0,
    }));
  };

  const handleUpdateBuilderState = (updated: Partial<BuilderState>) => {
    setBuilderState((prev) => ({ ...prev, ...updated }));
  };

  const [precreatedShareUrl, setPrecreatedShareUrl] = useState<string | null>(null);

  const handleTriggerGenerate = () => {
    if (!photoState.file && !photoState.sourceUrl) {
      setUploadError('Please select or upload your photo first to generate your Builder Card.');
      return;
    }
    setUploadError(null);
    setPrecreatedShareUrl(null);
    setStep('GENERATING');

    if (renderedDataUrl) {
      compressAndUploadShareCard(
        renderedDataUrl,
        builderState.name,
        builderState.role,
        builderState.title,
        mode
      ).then((url) => {
        if (url) setPrecreatedShareUrl(url);
      });
    }
  };

  const handleGenerationComplete = () => {
    if (renderedDataUrl) {
      setGeneratedResult({
        imageDataUrl: renderedDataUrl,
        photoUrl: photoState.sourceUrl,
        blob: null,
        mode,
        name: builderState.name,
        role: builderState.role,
        title: builderState.title,
        builderId: builderState.builderId,
        shareUrl: precreatedShareUrl || undefined,
      });
      setStep('RESULT');
    } else {
      setStep('STUDIO');
    }
  };

  const handleMakeAnother = () => {
    setGeneratedResult(null);
    setBuilderState((prev) => ({
      ...prev,
      builderId: getRandomBuilderUid(),
    }));
    setStep('STUDIO');
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-goa-green text-[#F5F0E1] font-body flex flex-col selection:bg-goa-pink selection:text-white relative pb-16 md:pb-0">
      {/* Persistent Tropical Goa Beach Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={heroBgImg}
          alt="Tropical Goa Beach Background"
          className="w-full h-full object-cover object-top opacity-30 filter contrast-110 saturate-125"
        />
        <div className="absolute inset-0 bg-linear-to-b from-goa-green-deep/80 via-goa-green-deep/70 to-goa-green-deep/90" />
        <div className="absolute inset-0 grid-bg-gold opacity-20" />
      </div>

      {/* Shared Card Modal Overlay if URL has share state */}
      {sharedCardFromUrl && (
        <SharedViewModal
          cardInfo={sharedCardFromUrl}
          onCloseAndCreateOwn={() => {
            setSharedCardFromUrl(null);
            if (typeof window !== 'undefined' && window.history) {
              window.history.replaceState({}, '', '/');
            }
          }}
        />
      )}

      {/* Persistent Navigation Header */}
      <Header
        currentStep={step}
        currentMode={mode}
        onNavigate={handleNavigate}
      />

      <main className="flex-1 w-full relative z-10">
        {/* STEP 1: LANDING */}
        {step === 'LANDING' && (
          <LandingHero onStart={handleStartFlow} />
        )}

        {/* STEP 2: STUDIO (Interactive Customization Environment) */}
        {step === 'STUDIO' && (
          <div className="w-full max-w-350 mx-auto px-4 sm:px-8 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-fade-up">
            {/* Left Column: Customization Controls */}
            <div className="lg:col-span-6 space-y-6">
              <FormatSelector
                currentMode={mode}
                onSelectMode={(newMode) => setMode(newMode)}
              />

              <PhotoUploader
                photoState={photoState}
                onPhotoSelected={handlePhotoSelected}
                onError={(err) => setUploadError(err)}
                errorMessage={uploadError}
              />

              {photoState.file && (
                <PhotoAdjuster
                  photoState={photoState}
                  onChangeZoom={(zoom) => setPhotoState((p) => ({ ...p, zoom }))}
                  onChangeOffset={(offsetX, offsetY) =>
                    setPhotoState((p) => ({ ...p, offsetX, offsetY }))
                  }
                  onToggleBwFilter={(bwFilter) =>
                    setPhotoState((p) => ({ ...p, bwFilter }))
                  }
                  onReset={() =>
                    setPhotoState((p) => ({ ...p, zoom: 1.1, offsetX: 0, offsetY: 0, bwFilter: false }))
                  }
                />
              )}

              {mode === 'builder' && (
                <BuilderDetailsForm
                  builderState={builderState}
                  onChange={handleUpdateBuilderState}
                />
              )}

              {/* Action Button */}
              <div className="pt-4 border-t border-[#F5F0E1]/10">
                <button
                  type="button"
                  onClick={handleTriggerGenerate}
                  className="btn-pink w-full text-base py-4 px-8 flex items-center justify-center gap-3 animate-pulse-glow rounded-lg"
                >
                  <span>
                    {mode === 'pfp' ? 'GENERATE PFP FRAME →' : 'GENERATE BUILDER ID CARD →'}
                  </span>
                </button>

                <div className="text-center font-mono text-[11px] text-[#F5F0E1]/40 mt-2">
                  Instant browser composition • No login needed
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Canvas Preview */}
            <div className="lg:col-span-6 lg:sticky lg:top-24 h-fit">
              <PreviewCanvas
                mode={mode}
                photoState={photoState}
                builderState={builderState}
                onSelectMode={(newMode) => setMode(newMode)}
                onRenderedDataUrlChange={(dataUrl) => setRenderedDataUrl(dataUrl)}
                onPhotoStateChange={setPhotoState}
              />
            </div>
          </div>
        )}

        {/* STEP 3: GENERATING LOG SEQUENCE */}
        {step === 'GENERATING' && (
          <GeneratingLoader onComplete={handleGenerationComplete} />
        )}

        {/* STEP 4: RESULT & SHARE / EXPORT */}
        {step === 'RESULT' && generatedResult && (
          <ResultView
            result={generatedResult}
            onMakeAnother={handleMakeAnother}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentStep={step}
        currentMode={mode}
        onNavigate={handleNavigate}
        onGenerateClick={handleTriggerGenerate}
        canGenerate={Boolean(photoState.file)}
      />

      {/* Footer Branding */}
      <footer className="w-full border-t border-[#F5F0E1]/10 bg-goa-green-deep py-6 px-4 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-xs text-[#F5F0E1]/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-goa-gold rounded-full" />
            <span>HH GOA 2026 // HACKER HOUSE GOA</span>
          </div>
          <div>GOA, INDIA • 28 — 31 OCT 2026</div>
          <div className="text-goa-gold/70">2:47 PM STUDIO</div>
        </div>
      </footer>
    </div>
  );
}
