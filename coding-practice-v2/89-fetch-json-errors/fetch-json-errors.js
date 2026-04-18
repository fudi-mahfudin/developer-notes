/**
 * Judul: Topik 89 — Fetch JSON, status handling, error normalization
 *
 * Soal Test eksplisit:
 * - fetchJsonStrict: throw untuk !ok atau JSON invalid.
 * - fetchJsonSafe: return object {ok,data,error,status}.
 * - buildHttpError: normalisasi error HTTP.
 *
 * Kontrak (opsional):
 * - fetchFn kompatibel API fetch (injectable untuk test).
 *
 * Contoh output:
 * - status 404 => throw HttpError dengan status 404.
 *
 * Solusi detail:
 * - Pisahkan strict vs safe layer.
 * - Simpan status + message agar caller mudah menampilkan.
 */

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

/**
 * Judul: Builder error HTTP
 * Soal Test eksplisit: status + text.
 * Contoh output: new HttpError(500, "Server").
 * Solusi detail: class khusus.
 */
export function buildHttpError(status, message) {
  return new HttpError(status, message);
}

/**
 * Judul: Fetch JSON strict
 * Soal Test eksplisit:
 * - !ok throw HttpError.
 * - ok tapi body bukan JSON throw SyntaxError.
 * Contoh output: return parsed object.
 * Solusi detail: await fetchFn, cek ok, await response.json().
 */
export async function fetchJsonStrict(url, options = {}, fetchFn = fetch) {
  const response = await fetchFn(url, options);
  if (!response.ok) {
    const text = typeof response.text === "function" ? await response.text() : response.statusText;
    throw buildHttpError(response.status, text || `HTTP ${response.status}`);
  }
  return response.json();
}

/**
 * Judul: Fetch JSON safe wrapper
 * Soal Test eksplisit: selalu return object.
 * Contoh output: {ok:false,error:{...},status:500}.
 * Solusi detail: try/catch dari strict API.
 */
export async function fetchJsonSafe(url, options = {}, fetchFn = fetch) {
  try {
    const data = await fetchJsonStrict(url, options, fetchFn);
    return { ok: true, data, error: null, status: 200 };
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 0;
    return { ok: false, data: null, error: normalizeFetchError(error), status };
  }
}

/**
 * Judul: Normalisasi fetch error object
 * Soal Test eksplisit: HttpError dan generic Error.
 * Contoh output: {name,message,status?}.
 * Solusi detail: branching by instance.
 */
export function normalizeFetchError(error) {
  if (error instanceof HttpError) {
    return { name: error.name, message: error.message, status: error.status };
  }
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }
  return { name: "UnknownError", message: String(error) };
}

/**
 * Judul: Build query string sederhana
 * Soal Test eksplisit: {a:1,b:'x'} => ?a=1&b=x
 * Contoh output: empty object => ''.
 * Solusi detail: URLSearchParams.
 */
export function toQueryString(params) {
  const entries = Object.entries(params);
  if (entries.length === 0) return "";
  return `?${new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString()}`;
}

/**
 * Judul: Bangun URL dengan query params
 * Soal Test eksplisit: append query ke base url.
 * Contoh output: buildUrl('/api',{a:1}) => '/api?a=1'
 * Solusi detail: base + toQueryString.
 */
export function buildUrl(base, params = {}) {
  return `${base}${toQueryString(params)}`;
}

/**
 * Judul: Fetch text strict (varian soal sejenis)
 * Soal Test eksplisit: !ok throw HttpError.
 * Contoh output: ok => body text.
 * Solusi detail: mirip fetchJsonStrict tapi pakai response.text().
 */
export async function fetchTextStrict(url, options = {}, fetchFn = fetch) {
  const response = await fetchFn(url, options);
  if (!response.ok) throw buildHttpError(response.status, response.statusText || `HTTP ${response.status}`);
  return response.text();
}

