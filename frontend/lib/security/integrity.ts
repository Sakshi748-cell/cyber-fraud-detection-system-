export async function generateSHA256(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(data);

  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}