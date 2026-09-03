import type { Threat } from "@/lib/types";

type CsvRow = {
  _id: string;
  amount: string;
  upi_gps_lat: string;
  upi_gps_long: string;
  timestamp: string;
  target_atm_id: string;
  THREAT_LEVEL: string;
};

export async function loadCsvThreats(): Promise<Threat[]> {
  const response = await fetch("/flagged_transactions.csv");

  if (!response.ok) {
    throw new Error("Unable to load flagged transaction data.");
  }

  const csv = await response.text();
  const lines = csv.trim().split("\n");

  if (lines.length < 2) {
    return [];
  }

  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const row = Object.fromEntries(
      headers.map((header, index) => [header, values[index] ?? ""]),
    ) as unknown as CsvRow;

    return {
      id: row._id,
      atm_id: row.target_atm_id,
      latitude: Number(row.upi_gps_lat),
      longitude: Number(row.upi_gps_long),
      amount: Number(row.amount),
      risk:
        row.THREAT_LEVEL === "CRITICAL"
          ? "CRITICAL"
          : row.THREAT_LEVEL === "NORMAL"
            ? "LOW"
            : "MEDIUM",
      timestamp: row.timestamp,
    };
  });
}