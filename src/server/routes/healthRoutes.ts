import { Router } from "express";
import * as fileStore from "../storage/fileStore";

const router = Router();
const startTime = Date.now();

const handleHealth = (_req: any, res: any) => {
  const stats = fileStore.getStats();

  res.json({
    status: "ok",
    uptime: Math.floor((Date.now() - startTime) / 1000),
    cardCount: stats.activeCards,
    version: "2026.1.0",
    timestamp: Date.now(),
  });
};

const handleStats = (_req: any, res: any) => {
  const stats = fileStore.getStats();

  res.json({
    totalCardsGenerated: stats.totalCardsGenerated,
    activeCards: stats.activeCards,
    oldestCardAge: stats.oldestCardAge,
    storagePath: stats.storagePath,
  });
};

router.get("/api/health", handleHealth);
router.get("/health", handleHealth);

router.get("/api/stats", handleStats);
router.get("/stats", handleStats);

export default router;
