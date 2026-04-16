/**
 * Peak Index in a Mountain Array
 * @see knowledge-base/05-coding-test2/039-peak-index-in-a-mountain-array.md
 *
 * @param {number[]} arr
 * @returns {number}
 */
export function peakIndexInMountainArray(arr) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < arr[mid + 1]) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
