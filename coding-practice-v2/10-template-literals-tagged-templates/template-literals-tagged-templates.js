/**
 * Judul: Topik 10 — Template literals dan tagged templates
 *
 * Soal test:
 * - joinTagged: hasil sama dengan template literal biasa untuk interpolasi yang sama.
 * - parseTaggedStructure: `parts` dan `values` terpisah seperti contoh `hello ${1} world ${2}`.
 * - sql: string SQL dengan escape `'`; `true` di interpolasi → `TypeError`.
 *
 * Ringkasan soal:
 * - Interpolasi string.
 * - Fungsi tag menerima `strings` (TemplateStringsArray) dan values; raw string untuk escape.
 *
 * Solusi: Tag menggabungkan `strings.raw` / `strings` dengan values secara eksplisit — pola dasar DSL aman.
 *
 * @see knowledge-base/05-coding-interview-v2/10-template-literals-tagged-templates.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * Judul: Gabungkan template seperti String default
 *
 * Soal test:
 * - Untuk `n = 2`, `joinTagged\`a ${n} b\`` sama dengan `` `a ${n} b` ``.
 *
 * Ringkasan soal:
 * - Implementasi tag `html` yang menghasilkan string yang sama dengan interpolasi biasa (untuk tes).
 *
 * Kontrak: dipanggil sebagai tagged template; `values` boleh sembarang (di-`String()`).
 *
 * Solusi: `strings.reduce` + append `values[i]`.
 *
 * @param {TemplateStringsArray} strings
 * @param {unknown[]} values
 */
export function joinTagged(strings, ...values) {
  return strings.reduce((acc, s, i) => acc + s + (values[i] !== undefined ? String(values[i]) : ""), "");
}

/**
 * Judul: Log struktur tag — `strings` vs `values`
 *
 * Soal test:
 * - `parseTaggedStructure\`hello ${1} world ${2}\``: `parts` `["hello ", " world ", ""]`, `values` `[1, 2]`.
 *
 * Ringkasan soal:
 * - Kembalikan objek `{ parts, values }` untuk inspeksi (parsing DSL).
 *
 * Kontrak: sama seperti tagged template.
 *
 * Solusi: Spread `strings` ke array; simpan values.
 *
 * @param {TemplateStringsArray} strings
 * @param {unknown[]} values
 */
export function parseTaggedStructure(strings, ...values) {
  return {
    parts: [...strings],
    values: [...values],
  };
}

/**
 * Judul: Escape SQL literal sederhana (demo enterprise)
 *
 * Soal test:
 * - Contoh: `id = 1`, `name = 'O''Brien'`; interpolasi `boolean` → `TypeError`.
 *
 * Ringkasan soal:
 * - Bangun `'...'` dengan escape `'` → `''` untuk nilai string; angka tanpa quote.
 *
 * Kontrak:
 * - Hanya `string` atau `number` finite; selain itu → `TypeError`.
 *
 * Solusi: Tag `sql` menginterpolasi nilai ter-escape; placeholder statis tetap dari `strings`.
 *
 * @param {TemplateStringsArray} strings
 * @param {unknown[]} values
 */
export function sql(strings, ...values) {
  let out = "";
  for (let i = 0; i < strings.length; i++) {
    out += strings[i];
    if (i < values.length) {
      const v = values[i];
      if (typeof v === "number") {
        if (!Number.isFinite(v)) throw new TypeError("number must be finite");
        out += String(v);
      } else if (typeof v === "string") {
        out += `'${v.replace(/'/g, "''")}'`;
      } else {
        throw new TypeError("interpolated value must be string or finite number");
      }
    }
  }
  return out;
}
