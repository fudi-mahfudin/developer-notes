/**
 * Judul: Topik 13 — Modules (ESM vs CommonJS)
 *
 * Soal test:
 * - createConfig: objek beku, `moduleKind` ESM, `apiVersion` sama konstanta; env tidak didukung → `RangeError`.
 * - mergeConfig: shallow merge `{ a:1 }` + `{ b:2 }`.
 * - normalizePackageName: trim + lowercase.
 * - Interop CJS: `API_VERSION` sama; `buildGreeting("Ada")` → `"Hello, Ada"`; `kind` → `"cjs"`.
 * - barrel: `createConfig` tersedia sebagai fungsi.
 * - migrationHintEsMFirst: string panjang > 20.
 *
 * Ringkasan soal:
 * - Pola `import` / `export` ESM vs `require` / `module.exports` CJS.
 * - Re-export dan factory konfigurasi yang bisa dipakai dari bundler atau Node ESM.
 * - Perbandingan kontrak API dengan modul CJS kecil (`cjs-exports.cjs`) lewat `createRequire`.
 *
 * Solusi: File ini murni ESM; interoperabilitas CJS diuji dari file tes memakai `createRequire`;
 * tidak mengubah `package.json` root.
 *
 * @see knowledge-base/05-coding-interview-v2/13-modules-esm-commonjs.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

import {
  API_VERSION,
  MODULE_KIND_ESM,
  SUPPORTED_ENV,
} from "./constants.js";

export { API_VERSION, MODULE_KIND_ESM, SUPPORTED_ENV } from "./constants.js";

/**
 * Judul: Konfigurasi runtime — factory
 *
 * Soal test:
 * - `createConfig({ env: "test", label: "demo" })`: `moduleKind` dan `apiVersion` sesuai konstanta; `looksLikeFrozenConfig` true; `env: "staging"` → `RangeError`.
 *
 * Ringkasan soal:
 * - Bangun objek konfigurasi tak-mutable untuk layanan dengan `env` dan `version`.
 *
 * Kontrak:
 * - `env` harus salah satu `SUPPORTED_ENV`; jika tidak → `RangeError`.
 * - `label` string non-kosong.
 *
 * Solusi: `Object.freeze` pada objek hasil; validasi awal.
 *
 * @param {object} options
 * @param {string} options.env
 * @param {string} options.label
 */
export function createConfig(options) {
  if (options == null || typeof options !== "object") {
    throw new TypeError("options must be an object");
  }
  const { env, label } = options;
  if (typeof label !== "string" || label.length === 0) {
    throw new RangeError("label must be a non-empty string");
  }
  if (!SUPPORTED_ENV.includes(/** @type {string} */ (env))) {
    throw new RangeError(`env must be one of: ${SUPPORTED_ENV.join(", ")}`);
  }
  return Object.freeze({
    env,
    label,
    moduleKind: MODULE_KIND_ESM,
    apiVersion: API_VERSION,
  });
}

/**
 * Judul: Gabungkan default dengan override (polimorfisme konfig)
 *
 * Soal test:
 * - `mergeConfig({ a: 1 }, { b: 2 })` → `{ a: 1, b: 2 }`.
 *
 * Ringkasan soal:
 * - Shallow merge untuk objek dangkal; tidak mendalami nested (enterprise minimal).
 *
 * Kontrak: `base` dan `override` plain object.
 *
 * Solusi: Spread `{ ...base, ...override }`.
 *
 * @param {Record<string, unknown>} base
 * @param {Record<string, unknown>} override
 */
export function mergeConfig(base, override) {
  if (base == null || typeof base !== "object" || Array.isArray(base)) {
    throw new TypeError("base must be a plain object");
  }
  if (override == null || typeof override !== "object" || Array.isArray(override)) {
    throw new TypeError("override must be a plain object");
  }
  return { ...base, ...override };
}

/**
 * Judul: Resolver nama modul (latihan pola path)
 *
 * Soal test:
 * - `normalizePackageName("  MyPkg  ")` → `"mypkg"`.
 *
 * Ringkasan soal:
 * - Normalisasi nama paket untuk log: trim, lowercase.
 *
 * Kontrak: `name` string; boleh kosong setelah trim → `RangeError`.
 *
 * Solusi: `trim` + `toLowerCase`.
 *
 * @param {string} name
 */
export function normalizePackageName(name) {
  if (typeof name !== "string") {
    throw new TypeError("name must be a string");
  }
  const n = name.trim().toLowerCase();
  if (n.length === 0) {
    throw new RangeError("name must not be empty");
  }
  return n;
}

/**
 * Judul: Bandingkan versi API ESM dengan angka dari CJS
 *
 * Soal test:
 * - `isCompatibleWithCjsApiVersion(cjs.API_VERSION)` true bila sama dengan `API_VERSION` dari ESM.
 *
 * Ringkasan soal:
 * - Pastikan kontrak `API_VERSION` konsisten antara impor ESM dan modul CJS yang dimuat dinamis.
 *
 * Kontrak: `cjsApiVersion` finite number.
 *
 * Solusi: Strict equality dengan `API_VERSION` dari constants.
 *
 * @param {number} cjsApiVersion
 */
export function isCompatibleWithCjsApiVersion(cjsApiVersion) {
  if (typeof cjsApiVersion !== "number" || !Number.isFinite(cjsApiVersion)) {
    throw new TypeError("cjsApiVersion must be a finite number");
  }
  return cjsApiVersion === API_VERSION;
}

/**
 * Judul: Barrel — re-export helper tambahan
 *
 * Soal test:
 * - `typeof barrel.createConfig` → `"function"`.
 *
 * Ringkasan soal:
 * - Satu titik masuk untuk konsumen yang hanya perlu fungsi utilitas tanpa impor berkas banyak.
 *
 * Kontrak: tidak ada side effect saat impor.
 *
 * Solusi: Objek `barrel` mengumpulkan referensi fungsi.
 */
export const barrel = Object.freeze({
  createConfig,
  mergeConfig,
  normalizePackageName,
  isCompatibleWithCjsApiVersion,
});

/**
 * Judul: Ringkasan teks untuk dokumentasi migrasi CJS→ESM
 *
 * Soal test:
 * - `migrationHintEsMFirst().length` > 20.
 *
 * Ringkasan soal:
 * - Menghasilkan string bantuan untuk README internal (bukan output runtime kritis).
 *
 * Kontrak: tidak ada.
 *
 * Solusi: Template string statis.
 */
export function migrationHintEsMFirst() {
  return [
    "Prefer dynamic import() for conditional loading in ESM.",
    "Use createRequire(import.meta.url) only at boundaries for legacy CJS.",
    "Avoid mixing default export shapes between CJS and ESM without tests.",
  ].join("\n");
}

/**
 * Judul: Validasi bahwa nilai terlihat seperti hasil `createConfig`
 *
 * Soal test:
 * - Untuk hasil `createConfig` valid: `looksLikeFrozenConfig` mengembalikan true (cek `moduleKind` + `apiVersion`).
 *
 * Ringkasan soal:
 * - Type guard longgar untuk assert di tes integrasi.
 *
 * Kontrak: `value` sembarang.
 *
 * Solusi: Cek properti `moduleKind` dan `apiVersion`.
 *
 * @param {unknown} value
 */
export function looksLikeFrozenConfig(value) {
  if (value == null || typeof value !== "object") return false;
  return (
    /** @type {{ moduleKind?: string; apiVersion?: number }} */ (value).moduleKind ===
      MODULE_KIND_ESM &&
    /** @type {{ apiVersion?: number }} */ (value).apiVersion === API_VERSION
  );
}

/**
 * Judul: Hitung checksum sederhana string (bukan kripto)
 *
 * Soal test:
 * - Fungsi `djb2LikeHash` mengembalikan bilangan unsigned 32-bit deterministik untuk string input (bukan dipakai suite tes utama).
 *
 * Ringkasan soal:
 * - Hash dangkal untuk membandingkan dua string modul di tes tanpa mengimpor crypto.
 *
 * Kontrak: `s` string.
 *
 * Solusi: XOR / shift sederhana.
 *
 * @param {string} s
 */
export function djb2LikeHash(s) {
  if (typeof s !== "string") {
    throw new TypeError("s must be a string");
  }
  let hash = 5381;
  for (let i = 0; i < s.length; i++) {
    hash = (hash * 33) ^ s.charCodeAt(i);
  }
  return hash >>> 0;
}
