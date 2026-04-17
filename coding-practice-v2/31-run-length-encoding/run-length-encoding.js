/**
 * Judul: Topik 31 — Run-length encoding (RLE)
 *
 * Soal test:
 * - encodeRle: `"aaabbc"` → `"a3b2c1"` (format jumlah eksplisit per karakter).
 * - decodeRle: round-trip dengan encode untuk string uji ASCII.
 * - encodeRleCompact: varian tanpa `1` untuk tunggal (hanya jika dokumentasi — di sini tetap eksplisit untuk deterministik).
 *
 * Kontrak: input encode hanya huruf kecil ASCII untuk kesederhanaan tes; panjang hasil terkontrol.
 *
 * Solusi: Satu pass akumulasi run; decode baca digit + karakter.
 *
 * @see knowledge-base/05-coding-interview-v2/31-run-length-encoding.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/31-run-length-encoding/run-length-encoding.test.js`
 */

/**
 * Judul: RLE encode — setiap run `karakter + jumlah` (digit desimal)
 *
 * Soal test:
 * - `"aaabbc"` menghasilkan string yang di-decode kembali identik.
 *
 * Kontrak: `s` string huruf kecil `a-z` saja; kosong → `""`.
 *
 * Solusi: Loop; `count` run; append `ch + String(count)`.
 *
 * @param {string} s
 */
export function encodeRle(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  if (s.length === 0) return "";
  let out = "";
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (ch < "a" || ch > "z") throw new RangeError("only a-z allowed");
    let j = i + 1;
    while (j < s.length && s[j] === ch) j += 1;
    const count = j - i;
    out += ch + String(count);
    i = j;
  }
  return out;
}

/**
 * Judul: RLE decode — pasangan (huruf)(angka)+
 *
 * Soal test:
 * - Invers dari `encodeRle` pada output valid.
 *
 * Kontrak: format valid dari encoder ini; jika tidak valid → `RangeError`.
 *
 * Solusi: Pointer `i`; baca huruf; parse digit run.
 *
 * @param {string} encoded
 */
export function decodeRle(encoded) {
  if (typeof encoded !== "string") throw new TypeError("encoded must be a string");
  if (encoded.length === 0) return "";
  let out = "";
  let i = 0;
  while (i < encoded.length) {
    const ch = encoded[i];
    if (ch < "a" || ch > "z") throw new RangeError("invalid token");
    i += 1;
    let num = 0;
    let hasDigit = false;
    while (i < encoded.length && encoded[i] >= "0" && encoded[i] <= "9") {
      hasDigit = true;
      num = num * 10 + (encoded[i].charCodeAt(0) - 48);
      i += 1;
    }
    if (!hasDigit || num <= 0) throw new RangeError("expected positive count");
    out += ch.repeat(num);
  }
  return out;
}

/**
 * Judul: Kompresi panjang relatif — bandingkan panjang string
 *
 * Soal test:
 * - Untuk input berulang panjang, `encodeRle` lebih pendek dari raw.
 *
 * Kontrak: sama seperti encode.
 *
 * Solusi: Bandingkan `encodeRle(s).length` vs `s.length`.
 *
 * @param {string} s
 */
export function rleCompressionRatio(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  if (s.length === 0) return 1;
  const enc = encodeRle(s);
  return enc.length / s.length;
}

/**
 * Judul: Validasi input encoder — hanya `a-z`
 *
 * Soal test:
 * - `assertAsciiLowercase("ab")` tidak melempar; digit atau huruf besar → `RangeError`.
 *
 * Kontrak: dipanggil sebelum pipeline produksi internal.
 *
 * Solusi: Scan karakter.
 *
 * @param {string} s
 */
export function assertAsciiLowercase(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c < "a" || c > "z") throw new RangeError("only lowercase a-z allowed");
  }
}

/**
 * Judul: Statistik run — jumlah run dan panjang run maksimum
 *
 * Soal test:
 * - `"aaabbc"` → `{ runs: 3, maxRun: 3 }`.
 *
 * Kontrak: sama seperti `encodeRle` untuk domain karakter.
 *
 * Solusi: Satu pass mirip encode tanpa materialisasi string keluaran penuh.
 *
 * @param {string} s
 */
export function rleRunStats(s) {
  assertAsciiLowercase(s);
  if (s.length === 0) return { runs: 0, maxRun: 0 };
  let runs = 0;
  let maxRun = 0;
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    let j = i + 1;
    while (j < s.length && s[j] === ch) j += 1;
    const len = j - i;
    runs += 1;
    maxRun = Math.max(maxRun, len);
    i = j;
  }
  return { runs, maxRun };
}

/**
 * Judul: Cek apakah string encoded valid untuk `decodeRle`
 *
 * Soal test:
 * - `"a3b2"` valid; `"3a"` atau `"a"` tanpa digit → tidak valid.
 *
 * Kontrak: tidak melempar — mengembalikan boolean.
 *
 * Solusi: Simulasi parser longgar.
 *
 * @param {string} encoded
 */
export function isWellFormedRle(encoded) {
  if (typeof encoded !== "string") throw new TypeError("encoded must be a string");
  if (encoded.length === 0) return true;
  try {
    decodeRle(encoded);
    return true;
  } catch {
    return false;
  }
}
