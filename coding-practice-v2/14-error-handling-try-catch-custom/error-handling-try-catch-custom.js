/**
 * Judul: Topik 14 — Error handling (`try/catch`), custom errors
 *
 * Soal test:
 * - parseJsonSafe: JSON valid → objek; `"{"` → `ValidationError` dengan `cause` `SyntaxError`.
 * - assertHasKey: key ada tidak melempar; key hilang → `ValidationError`.
 * - wrapAsync: `AppError` dilewatkan; `Error` biasa dibungkus dengan `code` yang diberikan.
 * - tryCatchResult: sukses `{ ok: true, value }`; gagal `{ ok: false, error }`.
 * - errorToLogMessage: non-Error → string coerced.
 * - isRetryableError: `ValidationError` → false.
 *
 * Ringkasan soal:
 * - Hierarki error turunan `Error` dengan metadata (`code`, `cause`).
 * - Membungkus operasi yang melempar agar konsisten di API publik.
 * - JSON parse aman dengan pemetaan ke error aplikasi.
 *
 * Solusi: Kelas error memanggil `super` dengan pesan; menyetel `name` dan `Error.captureStackTrace`
 * jika ada (V8); membungkus penyebab asli di `cause` (ES2022).
 *
 * @see knowledge-base/05-coding-interview-v2/14-error-handling-try-catch-custom.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * Judul: Error aplikasi dasar
 *
 * Soal test:
 * - Dipakai `wrapAsync`: instance `AppError` dilempar ulang tanpa membungkus lagi.
 *
 * Ringkasan soal:
 * - Semua error domain mewarisi kelas ini agar `instanceof AppError` dapat dipakai di filter log.
 *
 * Kontrak:
 * - `message` string; `code` string non-kosong; `cause` opsional.
 *
 * Solusi: `extends Error`; set `this.name = this.constructor.name`.
 */
export class AppError extends Error {
  /**
   * @param {string} message
   * @param {string} code
   * @param {Error | undefined} [cause]
   */
  constructor(message, code, cause) {
    super(message, cause !== undefined ? { cause } : undefined);
    this.name = this.constructor.name;
    /** @type {string} */
    this.code = code;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Judul: Error validasi input
 *
 * Soal test:
 * - Dilempar oleh `parseJsonSafe` (JSON invalid) dan `assertHasKey`; `isRetryableError` mengembalikan false.
 *
 * Ringkasan soal:
 * - Khusus untuk skema / field tidak valid; kode tetap (`VALIDATION_ERROR`).
 *
 * Kontrak: `field` string; `detail` string.
 *
 * Solusi: Delegasi ke `AppError` dengan kode tetap.
 */
export class ValidationError extends AppError {
  /**
   * @param {string} field
   * @param {string} detail
   * @param {Error | undefined} [cause]
   */
  constructor(field, detail, cause) {
    super(`Validation failed for "${field}": ${detail}`, "VALIDATION_ERROR", cause);
    /** @type {string} */
    this.field = field;
  }
}

/**
 * Judul: Parse JSON aman — hasil atau lempar `ValidationError`
 *
 * Soal test:
 * - `parseJsonSafe('{"a":1}')` → `{ a: 1 }`; `parseJsonSafe("{")` → `ValidationError` dengan `cause instanceof SyntaxError`.
 *
 * Ringkasan soal:
 * - `JSON.parse` dibungkus `try/catch`; `SyntaxError` asli dilewatkan sebagai `cause`.
 *
 * Kontrak: `text` string.
 *
 * Solusi: `try/catch` → lempar `ValidationError` dengan field `json`.
 *
 * @param {string} text
 * @returns {unknown}
 */
export function parseJsonSafe(text) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    const cause = e instanceof Error ? e : new Error(String(e));
    throw new ValidationError("json", "invalid JSON", cause);
  }
}

/**
 * Judul: Assert objek punya key wajib
 *
 * Soal test:
 * - `assertHasKey({ x: 1 }, "x")` tidak melempar; `assertHasKey({}, "x")` → `ValidationError`.
 *
 * Ringkasan soal:
 * - Setelah `parseJsonSafe`, pastikan `key` ada (bukan `undefined`).
 *
 * Kontrak: `obj` object; `key` string.
 *
 * Solusi: `if (!(key in obj)) throw new ValidationError`.
 *
 * @param {object} obj
 * @param {string} key
 */
export function assertHasKey(obj, key) {
  if (obj == null || typeof obj !== "object") {
    throw new TypeError("obj must be an object");
  }
  if (typeof key !== "string" || key.length === 0) {
    throw new RangeError("key must be a non-empty string");
  }
  if (!(key in obj)) {
    throw new ValidationError(key, "missing required key");
  }
}

/**
 * Judul: Bungkus fungsi async — map error ke `AppError`
 *
 * Soal test:
 * - Rejection `AppError` sama instance; `Error("boom")` menjadi rejection dengan `code: "WRAP"`.
 *
 * Ringkasan soal:
 * - Pola boundary: tangkap semua rejection, bungkus non-AppError menjadi `AppError`.
 *
 * Kontrak: `fn` async tanpa argumen (demo).
 *
 * Solusi: `try/catch` dalam async IIFE atau `return (async () => { ... })()`.
 *
 * @param {() => Promise<unknown>} fn
 * @param {string} code
 */
export async function wrapAsync(fn, code) {
  if (typeof fn !== "function") {
    throw new TypeError("fn must be a function");
  }
  if (typeof code !== "string" || code.length === 0) {
    throw new RangeError("code must be a non-empty string");
  }
  try {
    return await fn();
  } catch (e) {
    if (e instanceof AppError) {
      throw e;
    }
    const cause = e instanceof Error ? e : new Error(String(e));
    throw new AppError(cause.message, code, cause);
  }
}

/**
 * Judul: Tangkap sync — kembalikan `{ ok, value }` atau `{ ok, error }`
 *
 * Soal test:
 * - `tryCatchResult(() => 42)` → `{ ok: true, value: 42 }`; lempar → `{ ok: false, error }` dengan pesan asli.
 *
 * Ringkasan soal:
 * - Pola Result tanpa melempar ke pemanggil (untuk API yang tidak boleh throw).
 *
 * Kontrak: `fn` callable sync.
 *
 * Solusi: `try/catch` return discriminated union.
 *
 * @template T
 * @param {() => T} fn
 * @returns {{ ok: true; value: T } | { ok: false; error: Error }}
 */
export function tryCatchResult(fn) {
  if (typeof fn !== "function") {
    throw new TypeError("fn must be a function");
  }
  try {
    return { ok: true, value: fn() };
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    return { ok: false, error };
  }
}

/**
 * Judul: Normalisasi error ke pesan string aman log
 *
 * Soal test:
 * - `errorToLogMessage(123)` → `"123"`.
 *
 * Ringkasan soal:
 * - Untuk `catch (e)` yang mungkin bukan `Error`.
 *
 * Kontrak: `unknown` sembarang.
 *
 * Solusi: `instanceof Error` → `message`; else `String(e)`.
 *
 * @param {unknown} e
 */
export function errorToLogMessage(e) {
  if (e instanceof Error) {
    return e.message;
  }
  return String(e);
}

/**
 * Judul: Apakah error dapat di-retry (latihan policy)
 *
 * Soal test:
 * - `isRetryableError(new ValidationError("f","x"))` → false.
 *
 * Ringkasan soal:
 * - Contoh: `ValidationError` tidak di-retry; `AppError` dengan kode `TRANSIENT` boleh.
 *
 * Kontrak: `e` unknown.
 *
 * Solusi: `instanceof` + cek `code`.
 *
 * @param {unknown} e
 */
export function isRetryableError(e) {
  if (e instanceof ValidationError) {
    return false;
  }
  if (e instanceof AppError) {
    return e.code === "TRANSIENT";
  }
  return true;
}
