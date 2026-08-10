import { Router } from "express";
import * as fileStore from "../storage/fileStore";

const router = Router();
const startTime = Date.now();

router.get("/api/health", (_req, res) => {
  const stats = fileStore.getStats();

  res.json({
    status: "ok",
    uptime: Math.floor((Date.now() - startTime) / 1000),
    cardCount: stats.activeCards,
    version: "2026.1.0",
    timestamp: Date.now(),
  });
});

router.get("/api/stats", (_req, res) => {
  const stats = fileStore.getStats();

  res.json({
    totalCardsGenerated: stats.totalCardsGenerated,
    activeCards: stats.activeCards,
    oldestCardAge: stats.oldestCardAge,
    storagePath: stats.storagePath,
  });
});

export default router;
