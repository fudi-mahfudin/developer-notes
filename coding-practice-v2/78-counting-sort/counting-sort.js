/**
 * Judul: Topik 78 — Counting sort untuk integer dalam rentang terbatas [0, k]
 *
 * Soal test eksplisit:
 * - countingSort(arr): stabil (pertahankan urutan relatif untuk nilai sama); output terurut naik.
 * - countingSortUnstable: varian tidak stabil (isi dari belakang bucket).
 * - sameMultisetSorted(a,b): multiset sama untuk verifikasi.
 *
 * Kontrak (opsional): elemen integer 0..k; k = max(arr) default.
 *
 * Contoh output:
 * - [3,0,2,2,5,1] → [0,1,2,2,3,5].
 *
 * Solusi detail: hitung frekuensi; prefix sum = posisi akhir; iterasi dari belakang untuk stabil.
 *
 * @see knowledge-base/05-coding-interview-v2/78-counting-sort.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/78-counting-sort/counting-sort.test.js`
 */

/**
 * Judul: Counting sort stabil
 *
 * Soal test eksplisit:
 * - Dua nilai sama mempertahankan urutan kemunculan asli (stabil).
 *
 * Contoh output:
 * - Record objects — di sini hanya number; stabil tetap terdefinisi untuk indeks.
 *
 * Solusi detail: count[i]++; prefix; place dari belakang ke depan.
 *
 * @param {number[]} arr
 * @param {number} [k]
 * @returns {number[]}
 */
export function countingSort(arr, k) {
  if (!arr.length) return [];
  const max = k !== undefined ? k : Math.max(...arr);
  /** @type {number[]} */
  const count = Array(max + 1).fill(0);
  for (const x of arr) count[x] += 1;
  for (let i = 1; i <= max; i++) count[i] += count[i - 1];
  /** @type {number[]} */
  const out = Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    const x = arr[i];
    count[x] -= 1;
    out[count[x]] = x;
  }
  return out;
}

/**
 * Judul: Counting sort tidak stabil — isi dari depan bucket
 *
 * Soal test eksplisit:
 * - Multiset sama dengan countingSort; urutan relatif elemen sama bisa beda.
 *
 * Contoh output:
 * - Lebih sederhana untuk implementasi cepat.
 *
 * Solusi detail: ulangi angka i sebanyak freq[i] ke output berurutan.
 *
 * @param {number[]} arr
 * @param {number} [k]
 * @returns {number[]}
 */
export function countingSortUnstable(arr, k) {
  if (!arr.length) return [];
  const max = k !== undefined ? k : Math.max(...arr);
  /** @type {number[]} */
  const freq = Array(max + 1).fill(0);
  for (const x of arr) freq[x] += 1;
  /** @type {number[]} */
  const out = [];
  for (let v = 0; v <= max; v++) {
    for (let j = 0; j < freq[v]; j++) out.push(v);
  }
  return out;
}

/**
 * Judul: Verifikasi multiset identik (sorted compare)
 *
 * Soal test eksplisit:
 * - [1,2,2] vs [2,1,2] → true.
 *
 * Contoh output:
 * - Panjang beda → false.
 *
 * Solusi detail: sort salinan bandingkan elemen per elemen.
 *
 * @param {number[]} a
 * @param {number[]} b
 */
export function sameMultisetSorted(a, b) {
  if (a.length !== b.length) return false;
  const x = a.slice().sort((p, q) => p - q);
  const y = b.slice().sort((p, q) => p - q);
  for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) return false;
  return true;
}

/**
 * Judul: Rentang (max−min) untuk counting sort pada array yang tidak dari 0
 *
 * Soal test eksplisit:
 * - Geser nilai ke [0..R] lalu sort; unshift optional (tidak diimplementasi penuh — dokumentasi).
 *
 * Contoh output:
 * - min=5 max=9 → offset 5.
 *
 * Solusi detail: counting sort pada (x - min).
 *
 * @param {number[]} arr
 * @returns {number[]}
 */
export function countingSortShifted(arr) {
  if (!arr.length) return [];
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const shifted = arr.map((x) => x - min);
  const sorted = countingSort(shifted, max - min);
  return sorted.map((x) => x + min);
}

/**
 * Judul: Kompleksitas waktu O(n+k) — catatan untuk wawancara
 *
 * Soal test eksplisit:
 * - k << n optimal; k besar counting sort tidak menguntungkan vs comparison sort.
 *
 * @param {number} n
 * @param {number} k
 */
export function countingSortTimeNote(n, k) {
  return n + k;
}
