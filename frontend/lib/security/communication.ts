export const SECURE_COMMUNICATION_CONTROLS = [
  "HTTPS/TLS for data in transit",
  "OAuth 2.0 or service authentication",
  "Mutual TLS (mTLS) for trusted agency services",
  "Role-based access control",
  "Message integrity verification",
  "Audit logging of data exchanges",
  "Minimum necessary data sharing",
] as const;

export function isSecureAgencyExchange(
  authenticated: boolean,
  authorized: boolean,
  encrypted: boolean
): boolean {
  return authenticated && authorized && encrypted;
}