/**
 * Judul: Topik 21 — Merge intervals / overlapping intervals
 *
 * Soal test:
 * - mergeIntervals: `[[1,3],[2,6],[8,10],[15,18]]` → `[[1,6],[8,10],[15,18]]`; input kosong → `[]`.
 * - intervalsOverlap: pasangan yang overlap / tidak sesuai definisi inklusif ujung.
 * - insertInterval: sisipkan satu interval ke daftar **sudah merged** dan merge lagi.
 *
 * Ringkasan soal:
 * - Gabungkan interval yang overlap menjadi interval disjoint yang setara secara union (sort by start + sweep).
 *
 * Solusi: Sort `start` ascending; jaga interval “aktif”; perpanjang `end` dengan `max` bila `next.start <= last.end`.
 *
 * @see knowledge-base/05-coding-interview-v2/21-merge-intervals.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test -- coding-practice-v2/21-merge-intervals/merge-intervals.test.js`.
 */

/**
 * Judul: Validasi pasangan [start, end]
 *
 * Soal test:
 * - Dipakai internal; `start > end` → `RangeError`.
 *
 * Ringkasan soal:
 * - Interval numerik finite; `start <= end`.
 *
 * Kontrak: `start`, `end` finite number.
 *
 * Solusi: Perbandingan sederhana.
 *
 * @param {number} start
 * @param {number} end
 */
function assertValidInterval(start, end) {
  if (typeof start !== "number" || !Number.isFinite(start)) {
    throw new RangeError("start must be finite");
  }
  if (typeof end !== "number" || !Number.isFinite(end)) {
    throw new RangeError("end must be finite");
  }
  if (start > end) {
    throw new RangeError("interval start must be <= end");
  }
}

/**
 * Judul: Merge semua interval yang overlap
 *
 * Soal test:
 * - `mergeIntervals([[1,3],[2,6],[8,10],[15,18]])` → `[[1,6],[8,10],[15,18]]`; `[]` → `[]`.
 *
 * Ringkasan soal:
 * - Union interval 1D pada garis bilangan real (inklusif kedua ujung).
 *
 * Kontrak: setiap elemen `[s,e]` dengan `s <= e` finite; tidak memutasi input asli (salinan untuk sort).
 *
 * Solusi: Sort by `start`; linear scan; `last[1] = max(last[1], next[1])` bila overlap.
 *
 * @param {number[][]} intervals
 * @returns {number[][]}
 */
export function mergeIntervals(intervals) {
  if (!Array.isArray(intervals)) throw new TypeError("intervals must be an array");
  if (intervals.length === 0) return [];
  const sorted = intervals.map((iv) => {
    if (!Array.isArray(iv) || iv.length !== 2) {
      throw new TypeError("each interval must be [start, end]");
    }
    assertValidInterval(iv[0], iv[1]);
    return [iv[0], iv[1]];
  });
  sorted.sort((a, b) => a[0] - b[0]);
  /** @type {number[][]} */
  const out = [[sorted[0][0], sorted[0][1]]];
  for (let i = 1; i < sorted.length; i++) {
    const [s, e] = sorted[i];
    const last = out[out.length - 1];
    if (s <= last[1]) {
      last[1] = Math.max(last[1], e);
    } else {
      out.push([s, e]);
    }
  }
  return out;
}

/**
 * Judul: Apakah dua interval overlap (inklusif)
 *
 * Soal test:
 * - `intervalsOverlap([1, 5], [5, 8])` true; `intervalsOverlap([1, 4], [5, 6])` false.
 *
 * Ringkasan soal:
 * - Overlap iff `max(a0,b0) <= min(a1,b1)` untuk `[a0,a1]` dan `[b0,b1]` dengan `a0<=a1`, `b0<=b1`.
 *
 * Kontrak: `a`, `b` masing-masing `[start,end]` valid.
 *
 * Solusi: Cek `a[0] <= b[1] && b[0] <= a[1]`.
 *
 * @param {number[]} a
 * @param {number[]} b
 */
export function intervalsOverlap(a, b) {
  if (!Array.isArray(a) || a.length !== 2 || !Array.isArray(b) || b.length !== 2) {
    throw new TypeError("a and b must be [start, end]");
  }
  assertValidInterval(a[0], a[1]);
  assertValidInterval(b[0], b[1]);
  return a[0] <= b[1] && b[0] <= a[1];
}

/**
 * Judul: Sisipkan interval baru ke daftar yang sudah disjoint & terurut
 *
 * Soal test:
 * - `insertInterval([[1,2],[3,5]], [2,3])` menghasilkan merged yang mencakup union.
 *
 * Ringkasan soal:
 * - Pola “kalender”: insert lalu merge sekali lagi (input `merged` harus sudah merged).
 *
 * Kontrak: `merged` hasil `mergeIntervals` atau setara (non-overlap, sorted by start).
 *
 * Solusi: `mergeIntervals([...merged, interval])` — O(n log n) untuk kecil; cukup untuk latihan.
 *
 * @param {number[][]} merged
 * @param {number[]} interval
 */
export function insertInterval(merged, interval) {
  if (!Array.isArray(merged)) throw new TypeError("merged must be an array");
  if (!Array.isArray(interval) || interval.length !== 2) {
    throw new TypeError("interval must be [start, end]");
  }
  assertValidInterval(interval[0], interval[1]);
  return mergeIntervals([...merged, [interval[0], interval[1]]]);
}
