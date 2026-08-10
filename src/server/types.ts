export interface SharedCardData {
  id: string;
  imageDataUrl: string;
  name: string;
  role: string;
  title: string;
  mode: "pfp" | "builder";
  createdAt: number;
}

export interface TitleRequest {
  name?: string;
  role?: string;
  description?: string;
}

export interface ShareRequest {
  imageDataUrl: string;
  name?: string;
  role?: string;
  title?: string;
  mode?: "pfp" | "builder";
}

export interface HealthResponse {
  status: "ok";
  uptime: number;
  cardCount: number;
  version: string;
  timestamp: number;
}

export interface StatsResponse {
  totalCardsGenerated: number;
  activeCards: number;
  oldestCardAge: number | null;
  storagePath: string;
}
