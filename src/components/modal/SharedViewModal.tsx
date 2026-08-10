import React, { useEffect, useState } from 'react';

interface SharedViewModalProps {
  shareId: string;
  onCloseAndCreateOwn: () => void;
}

interface SharedCardData {
  id: string;
  name: string;
  role: string;
  title: string;
  imageDataUrl: string;
  mode: 'builder' | 'pfp';
  createdAt: number;
}

export const SharedViewModal: React.FC<SharedViewModalProps> = ({
  shareId,
  onCloseAndCreateOwn,
}) => {
  const [data, setData] = useState<SharedCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedCard = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/share/${shareId}`);
        if (!response.ok) {
          throw new Error('Shared card not found or has expired.');
        }
        const resultData = await response.json();
        setData(resultData);
      } catch (err: any) {
        setError(err.message || 'Failed to load shared card.');
      } finally {
        setLoading(false);
      }
    };

    fetchSharedCard();
  }, [shareId]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-[#072414] border-2 border-goa-gold p-6 relative rounded-3xl shadow-[0_0_60px_rgba(232,200,64,0.2)] text-center my-auto animate-fade-up space-y-4">
        {/* Corner Accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-goa-gold" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-goa-gold" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-goa-gold" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-goa-gold" />

        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-goa-gold/20 pb-3">
          <div className="font-mono text-[10px] text-goa-gold font-bold uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 bg-goa-gold rounded-full animate-ping" />
            <span>/// HH GOA 2026 SHARED PASS</span>
          </div>
          <button
            type="button"
            onClick={onCloseAndCreateOwn}
            className="w-7 h-7 rounded-full bg-goa-gold/10 border border-goa-gold/40 text-goa-gold hover:bg-goa-pink hover:border-goa-pink hover:text-white transition-all flex items-center justify-center cursor-pointer"
            title="Close Preview"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {loading && (
          <div className="py-12 space-y-3">
            <span className="material-symbols-outlined text-4xl text-goa-gold animate-spin">
              sync
            </span>
            <div className="font-mono text-xs text-goa-gold uppercase tracking-wider font-bold">
              RETRIEVING BUILDER CREDENTIALS...
            </div>
          </div>
        )}

        {error && (
          <div className="py-6 space-y-4">
            <div className="bg-goa-pink/20 border border-goa-pink p-3.5 rounded-xl font-mono text-xs text-white">
              {error}
            </div>
            <button
              type="button"
              onClick={onCloseAndCreateOwn}
              className="btn-pink w-full py-3 px-4 rounded-xl uppercase tracking-wider font-mono font-bold text-xs shadow-lg"
            >
              CREATE YOUR OWN CARD →
            </button>
          </div>
        )}

        {data && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-goa-gold uppercase tracking-tight leading-none">
                {data.name && data.name.trim() ? data.name.trim() : 'ANONYMOUS BUILDER'}
              </h2>
              {data.role && (
                <div className="inline-block bg-goa-pink text-white font-display font-bold text-[11px] py-1 px-3 rounded-full uppercase tracking-wider shadow-sm">
                  {data.role}
                </div>
              )}
            </div>

            {/* Shared Pass Image */}
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl border-2 border-goa-gold/50 p-1 bg-goa-green-deep shadow-2xl">
              <img
                src={data.imageDataUrl}
                alt={`${data.name} HH Goa 2026 Pass`}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={onCloseAndCreateOwn}
                className="btn-pink w-full py-3.5 px-4 rounded-xl uppercase tracking-wider font-mono font-extrabold text-xs shadow-xl animate-pulse-glow flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>CREATE YOUR OWN HH GOA CARD</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>

              <button
                type="button"
                onClick={onCloseAndCreateOwn}
                className="w-full py-2.5 px-4 bg-goa-gold/10 hover:bg-goa-gold hover:text-goa-green-deep border border-goa-gold/40 text-goa-gold font-mono text-xs font-bold uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>CLOSE PREVIEW</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
