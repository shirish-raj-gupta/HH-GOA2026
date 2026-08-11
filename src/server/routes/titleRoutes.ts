import { Router } from "express";
import { rateLimiter } from "../middleware/rateLimiter";
import { validateTitleRequest } from "../middleware/validator";

const router = Router();

const CURATED_TITLES = [
  "THE SHIP-IT ENGINEER",
  "THE NIGHT BUILDER",
  "THE API ALCHEMIST",
  "THE BUG HUNTER",
  "THE PRODUCT HACKER",
  "THE AI WIZARD",
  "THE SYSTEM ARCHITECT",
  "THE FULL-STACK WIZARD",
  "THE CODE POET",
  "THE DEBUGGING MACHINE",
  "THE PROTOCOL ENGINEER",
  "THE ZERO-KNOWLEDGE ARCHITECT",
  "THE RUST DWELLER",
  "THE LATENCY KILLER",
  "THE SYNTAX MAESTRO",
  "THE MEMORY LEAK SURGEON",
];

const handleTitleGeneration = async (req: any, res: any) => {
  try {
    const validation = validateTitleRequest(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const { name, role, description } = validation.data;
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        const { GoogleGenAI } = await import("@google/genai");
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Given a developer named "${name}" with role/stack "${role}" and building "${description}", generate 3 short, punchy, futuristic 2 to 4 word "Builder Titles" for a Hacker House Goa 2026 event pass. Examples: "THE SHIP-IT ENGINEER", "THE BUG HUNTER", "THE ZK ARCHITECT", "THE LATENCY KILLER". Return only a JSON array of 3 strings like ["THE CODE POET", "THE NIGHT BUILDER", "THE API ALCHEMIST"]. Do not include markdown code block ticks.`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

        const text = response.text ? response.text.trim() : "";
        const cleanedText = text.replace(/```json|```/g, "").trim();
        let parsed: string[] = [];
        try {
          parsed = JSON.parse(cleanedText);
        } catch {
          parsed = [];
        }

        if (Array.isArray(parsed) && parsed.length > 0) {
          return res.json({ titles: parsed });
        }
      } catch (geminiError) {
        console.error("Gemini API title generation error:", geminiError);
      }
    }

    const shuffled = [...CURATED_TITLES].sort(() => 0.5 - Math.random());
    res.json({ titles: shuffled.slice(0, 3) });
  } catch (err) {
    console.error("Title generation error:", err);
    res.status(500).json({ error: "Failed to generate title" });
  }
};

const limiter = rateLimiter("generate-title", { windowMs: 60_000, maxRequests: 20 });

router.post("/api/generate-title", limiter, handleTitleGeneration);
router.post("/generate-title", limiter, handleTitleGeneration);

export default router;
