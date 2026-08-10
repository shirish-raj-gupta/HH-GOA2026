export const CURATED_TITLES: Record<string, string[]> = {
  default: [
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
    "THE MAINNET SHIPPER",
    "THE PROOF CREATOR"
  ],
  ai: [
    "THE AI ALCHEMIST",
    "THE PROMPT ARCHITECT",
    "THE MODEL WHISPERER",
    "THE VECTOR MASTER",
    "THE INFERENCE SPEEDRUNNER"
  ],
  fullstack: [
    "THE SHIP-IT ENGINEER",
    "THE END-TO-END BUILDER",
    "THE DOMAIN ARCHITECT",
    "THE FULL-STACK WIZARD"
  ],
  crypto: [
    "THE PROTOCOL ENGINEER",
    "THE ZERO-KNOWLEDGE ARCHITECT",
    "THE RUST DWELLER",
    "THE ON-CHAIN SHIPPER"
  ]
};

export function getRandomTitle(roleStr?: string): string {
  let pool = CURATED_TITLES.default;
  if (roleStr) {
    const lower = roleStr.toLowerCase();
    if (lower.includes('ai') || lower.includes('ml') || lower.includes('llm') || lower.includes('gpt')) {
      pool = [...CURATED_TITLES.ai, ...CURATED_TITLES.default];
    } else if (lower.includes('full') || lower.includes('frontend') || lower.includes('backend') || lower.includes('stack')) {
      pool = [...CURATED_TITLES.fullstack, ...CURATED_TITLES.default];
    } else if (lower.includes('rust') || lower.includes('zk') || lower.includes('crypto') || lower.includes('web3') || lower.includes('solidity')) {
      pool = [...CURATED_TITLES.crypto, ...CURATED_TITLES.default];
    }
  }

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

export async function fetchSuggestedTitles(name: string, role: string, building: string): Promise<string[]> {
  try {
    const response = await fetch('/api/generate-title', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role, description: building }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.titles && Array.isArray(data.titles) && data.titles.length > 0) {
        return data.titles;
      }
    }
  } catch (err) {
    console.warn('API title generation fallback to client pool:', err);
  }

  // Fallback
  const shuffled = [...CURATED_TITLES.default].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}
