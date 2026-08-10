export type CreationMode = 'pfp' | 'builder';

export type AppStep = 'LANDING' | 'STUDIO' | 'GENERATING' | 'RESULT';

export interface PhotoState {
  file: File | null;
  sourceUrl: string | null;
  zoom: number;
  offsetX: number;
  offsetY: number;
  bwFilter: boolean;
  aspectRatio: number; // width / height of uploaded image
}

export interface BuilderState {
  name: string;
  role: string;
  building: string;
  title: string;
  tags: string[];
  builderId: string;
}

export interface GeneratedResult {
  imageDataUrl: string;
  blob: Blob | null;
  mode: CreationMode;
  name: string;
  role: string;
  title: string;
  builderId?: string;
  shareUrl?: string;
  shareId?: string;
}
