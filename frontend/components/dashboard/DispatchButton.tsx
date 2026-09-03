import type { Threat } from "@/lib/types";

export type DispatchUiStatus = "idle" | "loading" | "success" | "error";

export function DispatchButton({
  threat,
  status,
  error,
  onDispatch,
}: {
  threat: Threat | null;
  status: DispatchUiStatus;
  error: string | null;
  onDispatch: () => void;
}) {
  const disabled = !threat || status === "loading";

  return (
    <div className="sticky bottom-0 space-y-2 rounded-lg border border-critical/30 bg-panel p-3">
      <button
        type="button"
        onClick={onDispatch}
        disabled={disabled}
        className="w-full rounded-md bg-critical px-4 py-3 text-center font-mono text-xs font-semibold tracking-[0.18em] text-white shadow-[0_0_24px_rgb(255_77_90_/_0.25)] transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "loading"
          ? "DISPATCHING…"
          : "DISPATCH INTERCEPTION UNIT"}
      </button>
      {!threat ? (
        <p className="text-center text-xs text-muted">
          Select a threat to enable dispatch.
        </p>
      ) : null}
      {status === "success" ? (
        <p className="text-center text-xs text-accent">
          Interception unit queued for {threat?.atm_id}.
        </p>
      ) : null}
      {status === "error" && error ? (
        <p className="text-center text-xs text-critical" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
