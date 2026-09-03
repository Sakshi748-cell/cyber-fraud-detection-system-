export function LoadingSkeleton() {
  return (
    <div className="space-y-2" aria-busy="true" aria-label="Loading threats">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-16 animate-pulse rounded-md border border-border bg-panel-raised"
        />
      ))}
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex min-h-32 items-center justify-center rounded-md border border-dashed border-border px-4 py-8 text-center">
      <p className="text-sm text-muted">{message}</p>
    </div>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      className="rounded-md border border-critical/40 bg-critical/10 px-3 py-2 text-sm text-critical"
      role="alert"
    >
      {message}
    </div>
  );
}
