export type AuthUser = {
  id: string;
  name: string;
  role: string;
};

export function authenticateUser(
  username: string,
  password: string
): AuthUser | null {
  if (username === "demo.police" && password === "demo123") {
    return {
      id: "USR-001",
      name: "Demo Police Investigator",
      role: "POLICE_INVESTIGATOR",
    };
  }

  return null;
}