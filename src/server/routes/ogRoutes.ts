import { Router } from "express";
import * as fileStore from "../storage/fileStore";

const router = Router();

router.get("/share/:id", (req, res) => {
  const card = fileStore.get(req.params.id);
  const host = req.headers.host || "localhost:3000";
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const baseUrl =
    process.env.APP_URL || `${protocol}://${host}`;
  const cleanBase = baseUrl.replace(/\/$/, "");
  const ogImage = `${cleanBase}/api/share-image/${req.params.id}`;

  const title = card
    ? `${card.name.toUpperCase()} | HH GOA 2026 BUILDER ID`
    : "HH GOA 2026 — BUILDER IDENTITY";

  const description = card
    ? `${card.role} — ${card.title}. See you in Goa 🌴⚡ #FrameInGoa`
    : "Turn your photo into an official Hacker House Goa 2026 builder graphic.";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />

  <!-- Open Graph / Facebook / WhatsApp -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1080" />
  <meta property="og:image:height" content="1350" />

  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${ogImage}" />

  <script>
    window.location.href = "/?shareId=${req.params.id}";
  </script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #1A6B3C;
      color: #F5F0E1;
      font-family: 'Inter', system-ui, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }
    .container { max-width: 400px; padding: 2rem; }
    h1 {
      font-size: 2rem;
      color: #E8C840;
      margin-bottom: 0.5rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    p {
      font-size: 0.875rem;
      color: rgba(245, 240, 225, 0.6);
      margin-bottom: 1.5rem;
    }
    a {
      color: #FF2D78;
      text-decoration: underline;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .dot {
      width: 8px; height: 8px;
      background: #E8C840;
      border-radius: 50%;
      display: inline-block;
      margin-right: 6px;
      animation: pulse 1.5s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>HH GOA 2026</h1>
    <p><span class="dot"></span>Loading builder identity...</p>
    <a href="/?shareId=${req.params.id}">Click here if not redirected</a>
  </div>
</body>
</html>`;

  res.send(html);
});

export default router;
