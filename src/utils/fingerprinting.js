import FingerprintJS from "@fingerprintjs/fingerprintjs";

let fpInstance;

export async function loadFingerprinting() {
  fpInstance = await FingerprintJS.load();
  return fpInstance;
}

export async function getVisitorFingerprint() {
  if (!fpInstance) {
    await loadFingerprinting();
  }

  const fp = await fpInstance.get();
  return fp.visitorId;
}
