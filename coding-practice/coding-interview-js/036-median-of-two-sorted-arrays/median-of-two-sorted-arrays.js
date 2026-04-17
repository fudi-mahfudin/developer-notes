/**
 * Median of Two Sorted Arrays
 * @see knowledge-base/05-coding-interview-pembahasan/036-median-of-two-sorted-arrays.md
 *
 * Partisi binary search pada array lebih pendek.
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @returns {number}
 */
export function findMedianSortedArrays(nums1, nums2) {
  const A = nums1.length <= nums2.length ? nums1 : nums2;
  const B = nums1.length <= nums2.length ? nums2 : nums1;
  const m = A.length;
  const n = B.length;
  let lo = 0;
  let hi = m;
  const half = (m + n + 1) >> 1;
  while (lo <= hi) {
    const i = (lo + hi) >> 1;
    const j = half - i;
    const Aleft = i === 0 ? -Infinity : A[i - 1];
    const Aright = i === m ? Infinity : A[i];
    const Bleft = j === 0 ? -Infinity : B[j - 1];
    const Bright = j === n ? Infinity : B[j];
    if (Aleft <= Bright && Bleft <= Aright) {
      if ((m + n) % 2) return Math.max(Aleft, Bleft);
      return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
    }
    if (Aleft > Bright) hi = i - 1;
    else lo = i + 1;
  }
  return 0;
}
