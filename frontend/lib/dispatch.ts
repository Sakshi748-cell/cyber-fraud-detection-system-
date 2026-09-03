import type { Threat } from "./types";

export type DispatchResult =
  | { ok: true }
  | { ok: false; message: string };

export async function dispatchInterception(
  threat: Threat,
): Promise<DispatchResult> {
  await new Promise((resolve) => setTimeout(resolve, 850));

  if (!threat.id) {
    return { ok: false, message: "Cannot dispatch without a threat ID." };
  }

  return { ok: true };
}
