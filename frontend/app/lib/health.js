export function getBackendBaseUrl() {
  return process.env.BACKEND_INTERNAL_URL || "http://backend:8000";
}

export function buildHealthEndpoint(baseUrl) {
  return `${baseUrl.replace(/\/$/, "")}/api/health/`;
}

export async function getHealth(fetchImpl = fetch) {
  const baseUrl = getBackendBaseUrl();

  try {
    const res = await fetchImpl(buildHealthEndpoint(baseUrl), { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return { ok: true, data: await res.json() };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}
