export const OUTREACH_COOKIE = "outreach_session";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

function getSecret(): string {
  const secret =
    process.env.OUTREACH_SESSION_SECRET ??
    process.env.OUTREACH_PASSWORD ??
    "";
  if (secret.trim()) return secret;
  return "dev-outreach-secret";
}

function toBase64Url(bytes: ArrayBuffer): string {
  const bin = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const bin = atob(padded);
  return Uint8Array.from(bin, (char) => char.charCodeAt(0));
}

async function signPayload(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );

  return toBase64Url(signature);
}

async function verifySignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  return crypto.subtle.verify(
    "HMAC",
    key,
    new Uint8Array(fromBase64Url(signature)),
    new TextEncoder().encode(payload)
  );
}

export async function createSessionToken(): Promise<string> {
  const payload = toBase64Url(
    new TextEncoder().encode(
      JSON.stringify({ exp: Date.now() + SESSION_MS })
    ).buffer
  );
  const signature = await signPayload(payload, getSecret());
  return `${payload}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const valid = await verifySignature(payload, signature, getSecret());
  if (!valid) return false;

  try {
    const decoded = new TextDecoder().decode(fromBase64Url(payload));
    const data = JSON.parse(decoded) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.OUTREACH_PASSWORD;
  if (!expected) return password === "twinlabs";
  return password === expected;
}
