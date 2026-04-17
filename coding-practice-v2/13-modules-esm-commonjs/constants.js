/**
 * Konstanta modul ESM (impor oleh `modules-esm-commonjs.js`).
 *
 * @type {readonly string[]}
 */
export const SUPPORTED_ENV = Object.freeze(["development", "production", "test"]);

/** @type {1} */
export const API_VERSION = 1;

/**
 * Judul: Label build ESM
 *
 * Soal test:
 * - `API_VERSION`, `SUPPORTED_ENV`, `MODULE_KIND_ESM` dipakai modul ESM utama dan diverifikasi lewat
 *   interop serta `createConfig` di suite modul yang sama.
 *
 * Ringkasan soal:
 * - Nilai string untuk membedakan modul ESM di log / tes.
 */
export const MODULE_KIND_ESM = "esm";
