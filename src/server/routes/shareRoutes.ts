import { Router } from "express";
import { rateLimiter } from "../middleware/rateLimiter";
import { validateShareRequest } from "../middleware/validator";
import * as fileStore from "../storage/fileStore";
import type { SharedCardData } from "../types";

const router = Router();

const handleCreateShare = (req: any, res: any) => {
  try {
    const validation = validateShareRequest(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const { imageDataUrl, name, role, title, mode } = validation.data;

    const id = Math.random().toString(36).substring(2, 10);
    const sharedCard: SharedCardData = {
      id,
      imageDataUrl,
      name: name || "GOA BUILDER",
      role: role || "HACKER",
      title: title || "THE SHIP-IT ENGINEER",
      mode: mode || "builder",
      createdAt: Date.now(),
    };

    fileStore.save(sharedCard);

    const protocol = (req.headers["x-forwarded-proto"] as string) || "https";
    const host = (req.headers["x-forwarded-host"] as string) || req.headers.host || "localhost:3000";
    const baseUrl = process.env.APP_URL || `${protocol}://${host}`;
    const cleanBase = baseUrl.replace(/\/$/, "");
    const shareUrl = `${cleanBase}/share/${id}`;

    res.json({
      id,
      shareUrl,
      ogImageUrl: `${cleanBase}/api/share-image/${id}`,
    });
  } catch (err) {
    console.error("Error creating share card:", err);
    res.status(500).json({ error: "Failed to save share card" });
  }
};

const handleGetShareCard = (req: any, res: any) => {
  const card = fileStore.get(req.params.id);
  if (!card) {
    return res.status(404).json({ error: "Share card not found or expired" });
  }
  res.json(card);
};

const handleGetShareImage = (req: any, res: any) => {
  const card = fileStore.get(req.params.id);
  if (!card || !card.imageDataUrl) {
    return res.status(404).send("Image not found");
  }

  try {
    const base64Data = card.imageDataUrl.replace(
      /^data:image\/\w+;base64,/,
      ""
    );
    const imgBuffer = Buffer.from(base64Data, "base64");
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": imgBuffer.length,
      "Cache-Control": "public, max-age=86400",
    });
    res.end(imgBuffer);
  } catch (err) {
    console.error("Error serving share image:", err);
    res.status(500).send("Error serving image");
  }
};

const shareLimiter = rateLimiter("share-create", { windowMs: 60_000, maxRequests: 10 });

router.post("/api/share", shareLimiter, handleCreateShare);
router.post("/share", shareLimiter, handleCreateShare);

router.get("/api/share/:id", handleGetShareCard);
router.get("/share/:id", handleGetShareCard);

router.get("/api/share-image/:id", handleGetShareImage);
router.get("/share-image/:id", handleGetShareImage);

export default router;
