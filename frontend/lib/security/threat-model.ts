export const THREAT_MODEL = [
  {
    threat: "Unauthorized access",
    control: "Authentication and RBAC",
  },
  {
    threat: "Sensitive data leakage",
    control: "Encryption and data masking",
  },
  {
    threat: "API abuse",
    control: "Rate limiting and input validation",
  },
  {
    threat: "Evidence tampering",
    control: "SHA-256 integrity checks and append-only audit logs",
  },
  {
    threat: "Privilege misuse",
    control: "Least privilege and role-based authorization",
  },
] as const;

export function getSecurityControl(threat: string): string | null {
  const item = THREAT_MODEL.find((entry) => entry.threat === threat);
  return item?.control ?? null;
}