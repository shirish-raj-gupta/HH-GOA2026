import type { Request, Response, NextFunction } from "express";

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface WindowEntry {
  timestamps: number[];
}

const stores = new Map<string, Map<string, WindowEntry>>();

function getStore(routeKey: string): Map<string, WindowEntry> {
  if (!stores.has(routeKey)) {
    stores.set(routeKey, new Map());
  }
  return stores.get(routeKey)!;
}

function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.ip || req.socket.remoteAddress || "unknown";
}

export function rateLimiter(routeKey: string, config: RateLimitConfig) {
  const { windowMs, maxRequests } = config;

  return (req: Request, res: Response, next: NextFunction): void => {
    const store = getStore(routeKey);
    const ip = getClientIp(req);
    const now = Date.now();
    const windowStart = now - windowMs;

    let entry = store.get(ip);
    if (!entry) {
      entry = { timestamps: [] };
      store.set(ip, entry);
    }

    entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

    if (entry.timestamps.length >= maxRequests) {
      const oldestInWindow = entry.timestamps[0];
      const retryAfterMs = oldestInWindow + windowMs - now;
      const retryAfterSec = Math.ceil(retryAfterMs / 1000);

      res.set("Retry-After", String(retryAfterSec));
      res.status(429).json({
        error: "Too many requests. Please slow down.",
        retryAfter: retryAfterSec,
      });
      return;
    }

    entry.timestamps.push(now);
    next();
  };
}

setInterval(() => {
  const now = Date.now();
  for (const [, store] of stores) {
    for (const [ip, entry] of store) {
      entry.timestamps = entry.timestamps.filter((t) => t > now - 120_000);
      if (entry.timestamps.length === 0) {
        store.delete(ip);
      }
    }
  }
}, 60_000);
