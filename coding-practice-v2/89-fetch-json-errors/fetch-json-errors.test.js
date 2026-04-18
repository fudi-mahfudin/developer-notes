import { describe, it, expect } from "vitest";
import {
  HttpError,
  fetchJsonStrict,
  fetchJsonSafe,
  normalizeFetchError,
  toQueryString,
} from "./fetch-json-errors.js";

describe("Topik 89 — fetch json errors", () => {
  it("strict success", async () => {
    const fakeFetch = async () => ({ ok: true, json: async () => ({ ok: 1 }) });
    await expect(fetchJsonStrict("x", {}, fakeFetch)).resolves.toEqual({ ok: 1 });
  });

  it("strict http error", async () => {
    const fakeFetch = async () => ({ ok: false, status: 404, statusText: "Not Found", text: async () => "Not Found" });
    await expect(fetchJsonStrict("x", {}, fakeFetch)).rejects.toBeInstanceOf(HttpError);
  });

  it("safe wrapper + normalize + query", async () => {
    const fakeFetch = async () => ({ ok: false, status: 500, statusText: "Server", text: async () => "Server" });
    const out = await fetchJsonSafe("x", {}, fakeFetch);
    expect(out.ok).toBe(false);
    expect(normalizeFetchError(new Error("x")).name).toBe("Error");
    expect(toQueryString({ a: 1, b: "x" })).toBe("?a=1&b=x");
  });
});

