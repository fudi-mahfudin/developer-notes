/**
 * Majority Element
 * @see knowledge-base/05-coding-interview-pembahasan/010-majority-element.md
 *
 * Ringkasan: elemen yang muncul > n/2 kali.
 * Time: O(n), Space: O(1)
 *
 * @param {number[]} nums
 * @returns {number}
 */
export function majorityElement(nums) {
  let candidate = 0;
  let count = 0;
  for (const x of nums) {
    if (count === 0) candidate = x;
    count += x === candidate ? 1 : -1;
  }
  return candidate;
}
