/**
 * House Robber II
 * @see knowledge-base/05-coding-interview-pembahasan/089-house-robber-ii.md
 *
 * @param {number[]} nums
 * @returns {number}
 */
export function rob(nums) {
  if (nums.length === 1) return nums[0];

  function linear(arr) {
    let a = 0;
    let b = 0;
    for (const x of arr) {
      const c = Math.max(b, a + x);
      a = b;
      b = c;
    }
    return b;
  }

  return Math.max(linear(nums.slice(0, -1)), linear(nums.slice(1)));
}
