/**
 * Find Minimum in Rotated Sorted Array
 * @see knowledge-base/05-coding-test2/033-find-minimum-in-rotated-sorted-array.md
 *
 * @param {number[]} nums unik, rotasi terurut naik
 * @returns {number}
 */
export function findMin(nums) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return nums[lo];
}
