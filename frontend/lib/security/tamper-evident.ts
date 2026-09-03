export const TAMPER_EVIDENT_POLICY = {
  storeSensitiveDataOnPublicBlockchain: false,
  useHashAnchoring: true,
  preserveOriginalEvidence: true,
  useAppendOnlyAuditLogs: true,
} as const;

export function createEvidenceFingerprint(
  evidenceId: string,
  sha256Hash: string
) {
  return {
    evidenceId,
    sha256Hash,
    recordedAt: new Date().toISOString(),
  };
}