export interface BuilderPassData {
  builderId: string; // e.g. "HHG26-0042"
  photo: string | null; // Data URL or sample asset path
  builderName: string; // e.g. "Shirish Raj Gupta"
  role: string; // e.g. "Full Stack Developer"
  currentBuild: string; // e.g. "AI Forest Fire Detection Platform"
  builderClass: string; // e.g. "THE SYSTEMS NOMAD" (optional)
  status: string; // Fixed: "VERIFIED BUILDER"
  coordinates: {
    latitude: string; // Fixed: "15.4909° N"
    longitude: string; // Fixed: "73.8278° E"
  };
  event: {
    name: string; // "HH GOA '26"
    location: string; // "GOA / INDIA"
    dates: string; // "28 — 31 OCT 2026"
    tagline: string; // "#FRAMEINGOA"
  };
  baseUrl?: string; // Configurable base URL for QR code
}

export interface PhotoState {
  sourceUrl: string | null;
  zoom: number;
  offsetX: number;
  offsetY: number;
  bwFilter: boolean;
}

export type PassStep = 1 | 2 | 3 | 4 | 5 | 6;

export const BUILDER_CLASS_SUGGESTIONS = [
  'THE SHIP-IT ENGINEER',
  'THE PIXEL ALCHEMIST',
  'THE SYSTEMS NOMAD',
  'THE API CARTOGRAPHER',
  'THE TERMINAL WIZARD',
  'THE DEPLOYMENT PIRATE',
] as const;
