export function maskAccountNumber(accountNumber: string): string {
  if (accountNumber.length <= 4) {
    return "****";
  }

  const lastFour = accountNumber.slice(-4);
  return `****${lastFour}`;
}