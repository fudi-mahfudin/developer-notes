/**
 * Judul: Topik 24 — Majority element (Boyer–Moore voting)
 *
 * Soal test:
 * - majorityElement: majority dijamin (contoh `[2,2,1,1,1,2,2]` → `2`).
 * - majorityElementVerify: jika tidak ada elemen > n/2 → `null`.
 * - countOccurrences: helper frekuensi untuk verifikasi.
 *
 * Ringkasan soal:
 * - Elemen yang muncul lebih dari ⌊n/2⌋ kali — voting O(n) O(1) ruang; verifikasi pass kedua jika tidak dijamin.
 *
 * Solusi: `candidate` + `count`; `count += x===candidate ? 1 : -1`; verify frequency.
 *
 * @see knowledge-base/05-coding-interview-v2/24-majority-element-voting.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/24-majority-element-voting/majority-element-voting.test.js`
 */

/**
 * Judul: Boyer–Moore — majority dijamin ada
 *
 * Soal test:
 * - `[2,2,1,1,1,2,2]` → `2`.
 *
 * Ringkasan soal:
 * - Asumsi soal: exactly satu majority strict > n/2.
 *
 * Kontrak: `nums` non-kosong; elemen comparable dengan `===` (number/string).
 *
 * Solusi: Satu pass voting.
 *
 * @template T
 * @param {T[]} nums
 */
export function majorityElement(nums) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (nums.length === 0) throw new RangeError("nums must be non-empty");
  /** @type {unknown} */
  let candidate = nums[0];
  let count = 0;
  for (const x of nums) {
    if (count === 0) candidate = x;
    count += x === candidate ? 1 : -1;
  }
  return candidate;
}

/**
 * Judul: Hitung kemunculan nilai (equality `===`)
 *
 * Soal test:
 * - `countOccurrences([1,2,1], 1)` → `2`.
 *
 * Ringkasan soal:
 * - Verifikasi majority atau statistik sederhana.
 *
 * Kontrak: `nums` array sembarang.
 *
 * Solusi: Linear scan.
 *
 * @template T
 * @param {T[]} nums
 * @param {T} value
 */
export function countOccurrences(nums, value) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  let c = 0;
  for (const x of nums) {
    if (x === value) c += 1;
  }
  return c;
}

/**
 * Judul: Majority dengan verifikasi — atau null
 *
 * Soal test:
 * - `[1,2,3]` tidak punya majority → `null`; `[1,1,2]` → `1`.
 *
 * Ringkasan soal:
 * - Produksi: jangan percaya voting tanpa cek jika constraint tidak eksplisit.
 *
 * Kontrak: `nums` non-kosong.
 *
 * Solusi: Voting lalu `count*2 > n`.
 *
 * @template T
 * @param {T[]} nums
 */
export function majorityElementVerify(nums) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (nums.length === 0) throw new RangeError("nums must be non-empty");
  const cand = majorityElement(nums);
  const c = countOccurrences(nums, cand);
  return c * 2 > nums.length ? cand : null;
}

/**
 * Judul: Dua kandidat untuk threshold > n/3 (Boyer–Moore extended, ringkas)
 *
 * Soal test:
 * - Pada `[1,2,3,1,2,3,1,2]` elemen > n/3 bisa dua kandidat; verifikasi frekuensi di pass akhir.
 *
 * Ringkasan soal:
 * - Variasi enterprise: laporan semua nilai dengan frekuensi > n/3.
 *
 * Kontrak: `nums` finite length; perbandingan `===`.
 *
 * Solusi: Extended voting untuk dua slot + filter verifikasi.
 *
 * @template T
 * @param {T[]} nums
 * @returns {T[]}
 */
export function majorityAtLeastThird(nums) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (nums.length === 0) return [];
  /** @type {unknown} */
  let c1 = null;
  /** @type {unknown} */
  let c2 = null;
  let count1 = 0;
  let count2 = 0;
  for (const x of nums) {
    if (count1 > 0 && x === c1) {
      count1 += 1;
    } else if (count2 > 0 && x === c2) {
      count2 += 1;
    } else if (count1 === 0) {
      c1 = x;
      count1 = 1;
    } else if (count2 === 0) {
      c2 = x;
      count2 = 1;
    } else {
      count1 -= 1;
      count2 -= 1;
    }
  }
  const n = nums.length;
  /** @type {unknown[]} */
  const out = [];
  const seen = new Set();
  for (const cand of [c1, c2]) {
    if (seen.has(cand)) continue;
    seen.add(cand);
    let k = 0;
    for (const x of nums) if (x === cand) k += 1;
    if (k * 3 > n) out.push(cand);
  }
  return out;
}
