import fs from "fs";
import path from "path";
import type { SharedCardData } from "../types";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "shared-cards.json");
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

let cache: Map<string, SharedCardData> | null = null;
let totalGenerated = 0;

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function load(): Map<string, SharedCardData> {
  if (cache) return cache;

  ensureDataDir();

  if (!fs.existsSync(STORE_FILE)) {
    cache = new Map();
    return cache;
  }

  try {
    const raw = fs.readFileSync(STORE_FILE, "utf-8");
    const parsed = JSON.parse(raw);

    if (parsed && typeof parsed === "object" && parsed.cards) {
      const entries: [string, SharedCardData][] = Object.entries(parsed.cards);
      cache = new Map(entries);
      totalGenerated = parsed.totalGenerated || entries.length;
    } else {
      cache = new Map();
    }
  } catch {
    cache = new Map();
  }

  return cache;
}

function persist(): void {
  ensureDataDir();

  const store = load();
  const obj: Record<string, SharedCardData> = {};
  for (const [id, card] of store) {
    obj[id] = card;
  }

  const payload = JSON.stringify(
    { totalGenerated, cards: obj },
    null,
    2
  );

  const tmpFile = STORE_FILE + ".tmp";
  fs.writeFileSync(tmpFile, payload, "utf-8");
  fs.renameSync(tmpFile, STORE_FILE);
}

function pruneExpired(): void {
  const store = load();
  const now = Date.now();
  let pruned = false;

  for (const [id, card] of store) {
    if (now - card.createdAt > MAX_AGE_MS) {
      store.delete(id);
      pruned = true;
    }
  }

  if (pruned) {
    persist();
  }
}

export function save(card: SharedCardData): void {
  const store = load();
  store.set(card.id, card);
  totalGenerated++;
  persist();
}

export function get(id: string): SharedCardData | undefined {
  pruneExpired();
  const store = load();
  return store.get(id);
}

export function remove(id: string): boolean {
  const store = load();
  const existed = store.delete(id);
  if (existed) persist();
  return existed;
}

export function getAll(): SharedCardData[] {
  pruneExpired();
  const store = load();
  return Array.from(store.values());
}

export function getStats(): {
  totalCardsGenerated: number;
  activeCards: number;
  oldestCardAge: number | null;
  storagePath: string;
} {
  pruneExpired();
  const store = load();
  const now = Date.now();

  let oldestAge: number | null = null;
  for (const card of store.values()) {
    const age = now - card.createdAt;
    if (oldestAge === null || age > oldestAge) {
      oldestAge = age;
    }
  }

  return {
    totalCardsGenerated: totalGenerated,
    activeCards: store.size,
    oldestCardAge: oldestAge,
    storagePath: STORE_FILE,
  };
}
