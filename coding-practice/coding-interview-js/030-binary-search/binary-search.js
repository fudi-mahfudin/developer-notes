/**
 * Binary Search
 * @see knowledge-base/05-coding-interview-pembahasan/030-binary-search.md
 *
 * @param {number[]} nums terurut naik
 * @param {number} target
 * @returns {number} indeks atau -1
 */
export function binarySearch(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
