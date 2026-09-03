export type AuditEvent = {
  userId: string;
  role: string;
  action: string;
  resource: string;
  timestamp: string;
};

export function createAuditEvent(
  userId: string,
  role: string,
  action: string,
  resource: string
): AuditEvent {
  return {
    userId,
    role,
    action,
    resource,
    timestamp: new Date().toISOString(),
  };
}