import { describe, expect, it, vi } from "vitest";
import { buildHealthEndpoint, getBackendBaseUrl, getHealth } from "./health";

describe("getBackendBaseUrl", () => {
  it("falls back to the docker-compose service name when unset", () => {
    expect(getBackendBaseUrl()).toBe("http://backend:8000");
  });
});

describe("buildHealthEndpoint", () => {
  it("appends the health path to the base url", () => {
    expect(buildHealthEndpoint("http://backend:8000")).toBe(
      "http://backend:8000/api/health/"
    );
  });

  it("strips a trailing slash before appending", () => {
    expect(buildHealthEndpoint("http://backend:8000/")).toBe(
      "http://backend:8000/api/health/"
    );
  });
});

describe("getHealth", () => {
  it("returns ok with parsed data on a successful response", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: "ok", items: ["a", "b"] }),
    });

    const result = await getHealth(fetchImpl);

    expect(result.ok).toBe(true);
    expect(result.data.status).toBe("ok");
    expect(result.data.items).toEqual(["a", "b"]);
  });

  it("returns a descriptive error when the backend is unreachable", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error("fetch failed"));

    const result = await getHealth(fetchImpl);

    expect(result.ok).toBe(false);
    expect(result.error).toBe("fetch failed");
  });

  it("returns an error when the response status is not ok", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 502 });

    const result = await getHealth(fetchImpl);

    expect(result.ok).toBe(false);
    expect(result.error).toBe("HTTP 502");
  });
});
