export const API_SECURITY_CONTROLS = [
  "Authentication required",
  "Role-based authorization",
  "Input validation",
  "Rate limiting",
  "Request size limits",
  "HTTPS/TLS encryption",
  "Secure error handling",
  "Security event logging",
] as const;

export function isSecureApiRequest(
  authenticated: boolean,
  authorized: boolean
): boolean {
  return authenticated && authorized;
}