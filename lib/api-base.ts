/**
 * Normalize API base URL: ensure it has a protocol so fetch() never gets an invalid URL.
 * e.g. "children-lk-admin.vercel.app" -> "https://children-lk-admin.vercel.app"
 */
function getApiBase(): string {
  const raw =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const trimmed = String(raw).trim();
  if (!trimmed) return "http://localhost:3001";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export const API_BASE = getApiBase();
