/**
 * Judul: Topik 29 — Parsing string / tokenisasi
 *
 * Soal test:
 * - splitByDelimiter: delimiter tunggal; tidak menghasilkan token kosong di tengah kecuali eksplisit.
 * - tokenizeWhitespace: whitespace run di-collapse.
 * - parseCsvSimple: baris CSV tanpa escape internal (enterprise minimal).
 *
 * Ringkasan soal:
 * - Scanner linear; buffer token; flush pada delimiter; hati-hati string kosong.
 *
 * Solusi: Loop indeks atau `for..of`; hindari `split` berlebihan jika delimiter kompleks.
 *
 * @see knowledge-base/05-coding-interview-v2/29-string-parsing-tokenization.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/29-string-parsing-tokenization/string-parsing-tokenization.test.js`
 */

/**
 * Judul: Pecah string dengan delimiter satu karakter
 *
 * Soal test:
 * - `"a,b,,c"` dengan `,` → `["a","b","","c"]` (token kosong dipertahankan).
 *
 * Ringkasan soal:
 * - Mirip `split` tetapi kontrol eksplisit untuk latihan.
 *
 * Kontrak: `delimiter` satu karakter string panjang 1.
 *
 * Solusi: Akumulasikan buffer; flush saat delimiter.
 *
 * @param {string} s
 * @param {string} delimiter
 * @returns {string[]}
 */
export function splitByDelimiter(s, delimiter) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  if (typeof delimiter !== "string" || delimiter.length !== 1) {
    throw new RangeError("delimiter must be a single character");
  }
  /** @type {string[]} */
  const out = [];
  let buf = "";
  for (const ch of s) {
    if (ch === delimiter) {
      out.push(buf);
      buf = "";
    } else {
      buf += ch;
    }
  }
  out.push(buf);
  return out;
}

/**
 * Judul: Token whitespace — trim + collapse
 *
 * Soal test:
 * - `"  a   b  c "` → `["a","b","c"]`.
 *
 * Ringkasan soal:
 * - Whitespace = spasi/tabulasi saja (definisi sempit untuk deterministik).
 *
 * Kontrak: `s` string.
 *
 * Solusi: Skip run whitespace; buffer non-space.
 *
 * @param {string} s
 * @returns {string[]}
 */
export function tokenizeWhitespace(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  const isWs = (c) => c === " " || c === "\t" || c === "\n" || c === "\r";
  /** @type {string[]} */
  const out = [];
  let buf = "";
  for (const ch of s) {
    if (isWs(ch)) {
      if (buf) {
        out.push(buf);
        buf = "";
      }
    } else {
      buf += ch;
    }
  }
  if (buf) out.push(buf);
  return out;
}

/**
 * Judul: Path POSIX-like — segment non-kosong
 *
 * Soal test:
 * - `"/a/b//c/"` → `["a","b","c"]`.
 *
 * Ringkasan soal:
 * - Split `/` lalu filter string kosong.
 *
 * Kontrak: `path` string.
 *
 * Solusi: `splitByDelimiter` + filter.
 *
 * @param {string} path
 * @returns {string[]}
 */
export function parsePathSegments(path) {
  if (typeof path !== "string") throw new TypeError("path must be a string");
  return splitByDelimiter(path, "/").filter((x) => x.length > 0);
}

/**
 * Judul: CSV sederhana (tanpa quote escape)
 *
 * Soal test:
 * - `"name,age,city"` → tiga token.
 *
 * Ringkasan soal:
 * - Produksi nyata perlu state machine untuk quoted fields.
 *
 * Kontrak: tidak ada koma di dalam field.
 *
 * Solusi: `splitByDelimiter` dengan `,`.
 *
 * @param {string} line
 */
export function parseCsvSimple(line) {
  if (typeof line !== "string") throw new TypeError("line must be a string");
  return splitByDelimiter(line, ",");
}

/**
 * Judul: Key=value pairs dipisah `&`
 *
 * Soal test:
 * - `"a=1&b=2"` → `{a:"1", b:"2"}`.
 *
 * Ringkasan soal:
 * - Query string minimal.
 *
 * Kontrak: setiap segmen mengandung tepat satu `=`.
 *
 * Solusi: Split `&`, lalu split `=` per segmen.
 *
 * @param {string} query
 * @returns {Record<string, string>}
 */
export function parseQueryKeyValues(query) {
  if (typeof query !== "string") throw new TypeError("query must be a string");
  if (query.length === 0) return {};
  /** @type {Record<string, string>} */
  const out = {};
  const parts = splitByDelimiter(query, "&");
  for (const p of parts) {
    const eq = p.indexOf("=");
    if (eq <= 0) throw new RangeError(`invalid segment: ${p}`);
    const key = p.slice(0, eq);
    const val = p.slice(eq + 1);
    out[key] = val;
  }
  return out;
}
