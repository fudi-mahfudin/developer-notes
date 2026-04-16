/**
 * Sort Colors
 * @see knowledge-base/05-coding-test2/009-sort-colors.md
 *
 * Ringkasan: urut in-place: 0, 1, 2 (Dutch flag).
 * Time: O(n), Space: O(1)
 *
 * @param {number[]} nums
 * @returns {void}
 */
export function sortColors(nums) {
  let lo = 0;
  let mid = 0;
  let hi = nums.length - 1;
  while (mid <= hi) {
    const x = nums[mid];
    if (x === 0) {
      [nums[lo], nums[mid]] = [nums[mid], nums[lo]];
      lo++;
      mid++;
    } else if (x === 1) {
      mid++;
    } else {
      [nums[mid], nums[hi]] = [nums[hi], nums[mid]];
      hi--;
    }
  }
}
