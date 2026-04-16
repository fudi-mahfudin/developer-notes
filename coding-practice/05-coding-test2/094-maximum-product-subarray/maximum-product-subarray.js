/**
 * Maximum Product Subarray
 * @see knowledge-base/05-coding-test2/094-maximum-product-subarray.md
 *
 * @param {number[]} nums
 * @returns {number}
 */
export function maxProduct(nums) {
  let maxP = nums[0];
  let minP = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    const cand = [x, x * maxP, x * minP];
    maxP = Math.max(...cand);
    minP = Math.min(...cand);
    best = Math.max(best, maxP);
  }
  return best;
}
