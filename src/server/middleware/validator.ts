import type { ShareRequest, TitleRequest } from "../types";

export function sanitizeString(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[<>"'&]/g, "")
    .trim()
    .slice(0, maxLength);
}

export function isValidBase64DataUrl(input: unknown): boolean {
  if (typeof input !== "string") return false;
  if (!input.startsWith("data:image/")) return false;
  const commaIndex = input.indexOf(",");
  if (commaIndex === -1) return false;
  const header = input.slice(0, commaIndex);
  if (!header.includes(";base64")) return false;
  const base64Part = input.slice(commaIndex + 1);
  if (base64Part.length === 0) return false;
  const estimatedBytes = (base64Part.length * 3) / 4;
  if (estimatedBytes > 20 * 1024 * 1024) return false;
  return true;
}

type ValidationOk<T> = { valid: true; data: T; error?: undefined };
type ValidationFail = { valid: false; error: string; data?: undefined };
type ValidationResult<T> = ValidationOk<T> | ValidationFail;

export function validateShareRequest(
  body: unknown
): ValidationResult<ShareRequest> {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body is required" };
  }

  const raw = body as Record<string, unknown>;

  if (!raw.imageDataUrl || !isValidBase64DataUrl(raw.imageDataUrl)) {
    return {
      valid: false,
      error: "A valid base64 image data URL is required (max 20MB)",
    };
  }

  const mode = raw.mode === "pfp" ? "pfp" : "builder";

  return {
    valid: true,
    data: {
      imageDataUrl: raw.imageDataUrl as string,
      name: sanitizeString(raw.name, 64) || "GOA BUILDER",
      role: sanitizeString(raw.role, 64) || "HACKER",
      title: sanitizeString(raw.title, 64) || "THE SHIP-IT ENGINEER",
      mode,
    },
  };
}

export function validateTitleRequest(
  body: unknown
): ValidationResult<TitleRequest> {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body is required" };
  }

  const raw = body as Record<string, unknown>;

  return {
    valid: true,
    data: {
      name: sanitizeString(raw.name, 64) || "Builder",
      role: sanitizeString(raw.role, 64) || "Full-Stack",
      description: sanitizeString(raw.description, 128) || "Cool tech",
    },
  };
}
