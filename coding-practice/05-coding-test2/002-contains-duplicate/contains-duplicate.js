/**
 * Contains Duplicate
 * @see knowledge-base/05-coding-test2/002-contains-duplicate.md
 *
 * Ringkasan: ada elemen yang muncul lebih dari sekali?
 * Time: O(n), Space: O(n)
 *
 * @param {number[]} nums
 * @returns {boolean}
 */
export function containsDuplicate(nums) {
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}
