export type UserRole =
  | "SYSTEM_ADMIN"
  | "POLICE_INVESTIGATOR"
  | "BANK_FI_ANALYST"
  | "I4C_ANALYST"
  | "AUDITOR";

export const ROLE_LABELS: Record<UserRole, string> = {
  SYSTEM_ADMIN: "System Administrator",
  POLICE_INVESTIGATOR: "Police Investigator",
  BANK_FI_ANALYST: "Bank / FI Analyst",
  I4C_ANALYST: "I4C / Central Analyst",
  AUDITOR: "Auditor",
};

export const ROLE_PERMISSIONS: Record<UserRole, readonly string[]> = {
  SYSTEM_ADMIN: [
    "users:manage",
    "settings:manage",
    "cases:view",
    "alerts:view",
    "audit:view",
  ],

  POLICE_INVESTIGATOR: [
    "cases:view",
    "alerts:view",
    "risk:view",
    "dispatch:create",
  ],

  BANK_FI_ANALYST: [
    "alerts:view",
    "transactions:view:authorized",
  ],

  I4C_ANALYST: [
    "intelligence:view",
    "alerts:view",
    "risk:view",
  ],

  AUDITOR: [
    "audit:view",
    "security:view",
  ],
};

export function hasPermission(
  role: UserRole,
  permission: string
): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}