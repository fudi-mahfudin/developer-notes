/**
 * House Robber
 * @see knowledge-base/05-coding-interview-pembahasan/088-house-robber.md
 *
 * @param {number[]} nums
 * @returns {number}
 */
export function rob(nums) {
  let prev2 = 0;
  let prev1 = 0;
  for (const x of nums) {
    const cur = Math.max(prev1, prev2 + x);
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}
