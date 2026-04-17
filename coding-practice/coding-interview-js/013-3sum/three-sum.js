/**
 * 3Sum
 * @see knowledge-base/05-coding-interview-pembahasan/013-3sum.md
 *
 * Ringkasan: tripel unik (nilai) dengan a+b+c=0.
 * Time: O(n²), Space: O(1) ekstra (sort in-place)
 *
 * @param {number[]} nums
 * @returns {number[][]}
 */
export function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const out = [];
  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let L = i + 1;
    let R = n - 1;
    while (L < R) {
      const s = nums[i] + nums[L] + nums[R];
      if (s === 0) {
        out.push([nums[i], nums[L], nums[R]]);
        L++;
        R--;
        while (L < R && nums[L] === nums[L - 1]) L++;
        while (L < R && nums[R] === nums[R + 1]) R--;
      } else if (s < 0) L++;
      else R--;
    }
  }
  return out;
}
