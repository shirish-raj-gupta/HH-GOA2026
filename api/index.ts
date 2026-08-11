import express from "express";
import titleRoutes from "../src/server/routes/titleRoutes";
import shareRoutes from "../src/server/routes/shareRoutes";
import ogRoutes from "../src/server/routes/ogRoutes";
import healthRoutes from "../src/server/routes/healthRoutes";

const app = express();

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

// Error handling middleware to prevent serverless function crash (500 FUNCTION_INVOCATION_FAILED)
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Vercel Serverless Function Error:", err);
    res.status(500).json({ error: "Internal server error", message: err.message });
  }
);

export default app;
