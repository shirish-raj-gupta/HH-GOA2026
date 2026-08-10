import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

import titleRoutes from "./src/server/routes/titleRoutes";
import shareRoutes from "./src/server/routes/shareRoutes";
import ogRoutes from "./src/server/routes/ogRoutes";
import healthRoutes from "./src/server/routes/healthRoutes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "25mb" }));

  app.use((_req, res, next) => {
    res.set({
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    });
    next();
  });

  app.use(titleRoutes);
  app.use(shareRoutes);
  app.use(ogRoutes);
  app.use(healthRoutes);

  app.use(
    (
      err: Error,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      console.error("Unhandled server error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  );

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[HH GOA 2026] Server running on http://0.0.0.0:${PORT}`);
    console.log(`[HH GOA 2026] Health: http://localhost:${PORT}/api/health`);
  });
}

startServer();
