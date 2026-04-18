/**
 * Judul: Topik 44 — Monotonic stack (next greater element)
 *
 * Soal test:
 * - nextGreaterElementsRight: elemen strictly greater pertama ke kanan; jika tidak ada → `-1`.
 *
 * Kontrak: array integer finite; scan dari kanan atau kiri dengan stack monoton naik/turun.
 *
 * Solusi: Monotonic decreasing stack indeks; pop saat `nums[i] > nums[stack.top]`.
 *
 * @see knowledge-base/05-coding-interview-v2/44-monotonic-stack-next-greater.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/44-monotonic-stack-next-greater/monotonic-stack-next-greater.test.js`
 */

/**
 * Judul: Next greater ke kanan
 *
 * Soal test:
 * - `[2,1,2,4,3]` → `[4,2,4,-1,-1]` (strictly greater ke kanan).
 *
 * Kontrak: `nums` non-kosong.
 *
 * Solusi: Scan `i` dari `n-1` ke `0`; stack indeks dengan nilai decreasing; pop jika `<= nums[i]`; top = next greater.
 *
 * @param {number[]} nums
 * @returns {number[]}
 */
export function nextGreaterElementsRight(nums) {
  if (!Array.isArray(nums) || nums.length === 0) throw new RangeError("nums must be non-empty");
  const n = nums.length;
  /** @type {number[]} */
  const ans = new Array(n).fill(-1);
  /** @type {number[]} */
  const st = [];
  for (let i = n - 1; i >= 0; i--) {
    const x = nums[i];
    if (typeof x !== "number" || !Number.isFinite(x)) throw new TypeError("finite numbers only");
    while (st.length > 0 && nums[st[st.length - 1]] <= x) st.pop();
    if (st.length > 0) ans[i] = nums[st[st.length - 1]];
    st.push(i);
  }
  return ans;
}

/**
 * Judul: Next greater element — array circular (dua kali pass)
 *
 * Soal test:
 * - `[1,2,1]` → `[2,-1,2]` (wrap).
 *
 * Kontrak: `nums` non-kosong.
 *
 * Solusi: Duplikasi virtual indeks `i` in `0..2n-1`.
 *
 * @param {number[]} nums
 * @returns {number[]}
 */
export function nextGreaterElementsCircular(nums) {
  if (!Array.isArray(nums) || nums.length === 0) throw new RangeError("nums must be non-empty");
  const n = nums.length;
  /** @type {number[]} */
  const ans = new Array(n).fill(-1);
  /** @type {number[]} */
  const st = [];
  for (let i = 2 * n - 1; i >= 0; i--) {
    const idx = i % n;
    const x = nums[idx];
    while (st.length > 0 && nums[st[st.length - 1]] <= x) st.pop();
    if (i < n && st.length > 0) ans[idx] = nums[st[st.length - 1]];
    st.push(idx);
  }
  return ans;
}

/**
 * Judul: Previous smaller element ke kiri (strictly smaller)
 *
 * Soal test:
 * - `[3,1,2]` → `[-1,-1,1]`.
 *
 * Kontrak: array non-kosong.
 *
 * Solusi: Monotonic stack dari kiri.
 *
 * @param {number[]} nums
 * @returns {number[]}
 */
export function previousSmallerLeft(nums) {
  if (!Array.isArray(nums) || nums.length === 0) throw new RangeError("nums must be non-empty");
  const n = nums.length;
  /** @type {number[]} */
  const ans = new Array(n).fill(-1);
  /** @type {number[]} */
  const st = [];
  for (let i = 0; i < n; i++) {
    const x = nums[i];
    while (st.length > 0 && nums[st[st.length - 1]] >= x) st.pop();
    if (st.length > 0) ans[i] = nums[st[st.length - 1]];
    st.push(i);
  }
  return ans;
}
