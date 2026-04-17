/**
 * Judul: Topik 19 — Sorting (custom comparator, stability)
 *
 * Soal test:
 * - stableSortByKey: key sama mempertahankan urutan asli payload.
 * - sortStringsCaseInsensitive: `["B","a","C"]` → `["a","B","C"]`.
 * - sortByPriorityDescNameAsc: urutan nama sesuai contoh prioritas.
 * - sortNumbers: mode `"desc"` mengurutkan menurun.
 * - stableSortByNestedKey: urut `outer.inner`.
 * - partitionCopy: genap/ ganjil terpisah ke `pass` / `fail`.
 *
 * Ringkasan soal:
 * - `Array.prototype.sort` dengan komparator `(a,b) => number`.
 * - Memahami stabilitas: V8 modern mengurutkan `sort` secara stabil untuk array.
 * - Menyimpan urutan asli lewat indeks sekunder ketika nilai sama.
 *
 * Solusi: Komparator membandingkan kunci utama; jika `0`, bandingkan indeks asli untuk determinisme.
 *
 * @see knowledge-base/05-coding-interview-v2/19-sorting-comparator-stability.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * Judul: Sortir berdasarkan `key` numerik — stabil dengan indeks asli
 *
 * Soal test:
 * - Item dengan `key` 1 mempertahankan urutan payload `"a"` lalu `"c"` sebelum `key` 2.
 *
 * Ringkasan soal:
 * - Diberi `{ value, key }[]`, urutkan naik menurut `key`; jika seri, urutkan indeks masuk lebih awal.
 *
 * Kontrak: setiap item punya `key` finite number.
 *
 * Solusi: Map ke `index` lalu `sort`; komparator `(a,b) => key diff || index diff`.
 *
 * @param {Array<{ key: number; payload: string }>} items
 */
export function stableSortByKey(items) {
  if (!Array.isArray(items)) throw new TypeError("items must be an array");
  const decorated = items.map((item, index) => {
    if (item == null || typeof item !== "object") {
      throw new TypeError("each item must be an object");
    }
    const k = item.key;
    if (typeof k !== "number" || !Number.isFinite(k)) {
      throw new TypeError("key must be a finite number");
    }
    return { ...item, _index: index };
  });
  decorated.sort((a, b) => {
    if (a.key !== b.key) return a.key - b.key;
    return a._index - b._index;
  });
  return decorated.map(({ _index, ...rest }) => rest);
}

/**
 * Judul: Sortir string — case-insensitive
 *
 * Soal test:
 * - `sortStringsCaseInsensitive(["B", "a", "C"])` → `["a", "B", "C"]`.
 *
 * Ringkasan soal:
 * - Komparator locale-aware sederhana.
 *
 * Kontrak: `strings` array string.
 *
 * Solusi: `localeCompare` dengan `sensitivity: 'base'`.
 *
 * @param {string[]} strings
 */
export function sortStringsCaseInsensitive(strings) {
  if (!Array.isArray(strings)) throw new TypeError("strings must be an array");
  const copy = [...strings];
  copy.sort((a, b) => {
    if (typeof a !== "string" || typeof b !== "string") {
      throw new TypeError("elements must be strings");
    }
    return a.localeCompare(b, undefined, { sensitivity: "base" });
  });
  return copy;
}

/**
 * Judul: Urutkan berdasarkan beberapa kunci (tuple)
 *
 * Soal test:
 * - Baris contoh: urutan nama hasil `["a", "c", "b"]` setelah sort prioritas lalu nama.
 *
 * Ringkasan soal:
 * - Pertama `priority` menurun, lalu `name` menaik.
 *
 * Kontrak: `priority` finite; `name` string.
 *
 * Solusi: Komparator berurutan.
 *
 * @param {Array<{ name: string; priority: number }>} rows
 */
export function sortByPriorityDescNameAsc(rows) {
  if (!Array.isArray(rows)) throw new TypeError("rows must be an array");
  const copy = rows.map((r, i) => {
    if (r == null || typeof r !== "object") throw new TypeError("row must be object");
    if (typeof r.name !== "string" || typeof r.priority !== "number" || !Number.isFinite(r.priority)) {
      throw new TypeError("invalid row shape");
    }
    return { ...r, _i: i };
  });
  copy.sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    const nameCmp = a.name.localeCompare(b.name);
    if (nameCmp !== 0) return nameCmp;
    return a._i - b._i;
  });
  return copy.map(({ _i, ...rest }) => rest);
}

/**
 * Judul: Sortir angka — menurun vs menaik
 *
 * Soal test:
 * - `sortNumbers([3, 1, 2], "desc")` → `[3, 2, 1]`.
 *
 * Ringkasan soal:
 * - `order` `'asc' | 'desc'`.
 *
 * Kontrak: `nums` finite numbers.
 *
 * Solusi: `sort` dengan `(a,b) => order === 'asc' ? a-b : b-a`.
 *
 * @param {number[]} nums
 * @param {'asc' | 'desc'} order
 */
export function sortNumbers(nums, order) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (order !== "asc" && order !== "desc") {
    throw new RangeError("order must be 'asc' or 'desc'");
  }
  const copy = [...nums];
  copy.sort((a, b) => {
    if (typeof a !== "number" || !Number.isFinite(a) || typeof b !== "number" || !Number.isFinite(b)) {
      throw new TypeError("elements must be finite numbers");
    }
    return order === "asc" ? a - b : b - a;
  });
  return copy;
}

/**
 * Judul: Urutkan berdasarkan properti bertingkat (a.b.c)
 *
 * Soal test:
 * - Dua item: inner `2` dan `1` → hasil terurut naik menurut `outer.inner`.
 *
 * Ringkasan soal:
 * - Array objek nested; bandingkan `outer.inner` numerik.
 *
 * Kontrak: struktur konsisten.
 *
 * Solusi: Helper `get` + komparator.
 *
 * @param {Array<{ outer: { inner: number } }>} items
 */
export function stableSortByNestedKey(items) {
  if (!Array.isArray(items)) throw new TypeError("items must be an array");
  const decorated = items.map((item, index) => {
    if (item?.outer == null || typeof item.outer.inner !== "number" || !Number.isFinite(item.outer.inner)) {
      throw new TypeError("invalid nested shape");
    }
    return { item, key: item.outer.inner, index };
  });
  decorated.sort((a, b) => {
    if (a.key !== b.key) return a.key - b.key;
    return a.index - b.index;
  });
  return decorated.map((d) => d.item);
}

/**
 * Judul: Partisi — tidak mutasi input (salinan)
 *
 * Soal test:
 * - `partitionCopy([1, 2, 3, 4], (x) => x % 2 === 0)` → `{ pass: [2, 4], fail: [1, 3] }`.
 *
 * Ringkasan soal:
 * - Pisahkan `predicate` true / false dengan `filter` (bukan quicksort partition).
 *
 * Kontrak: `arr` array sembarang.
 *
 * Solusi: `[...filter]` — dokumentasi untuk interview.
 *
 * @param {unknown[]} arr
 * @param {(x: unknown) => boolean} predicate
 */
export function partitionCopy(arr, predicate) {
  if (!Array.isArray(arr)) throw new TypeError("arr must be an array");
  if (typeof predicate !== "function") throw new TypeError("predicate must be a function");
  const pass = [];
  const fail = [];
  for (let i = 0; i < arr.length; i++) {
    const x = arr[i];
    if (predicate(x)) pass.push(x);
    else fail.push(x);
  }
  return { pass, fail };
}
