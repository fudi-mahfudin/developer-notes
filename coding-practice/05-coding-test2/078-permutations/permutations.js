/**
 * Permutations
 * @see knowledge-base/05-coding-test2/078-permutations.md
 *
 * @param {number[]} nums unik
 * @returns {number[][]}
 */
export function permute(nums) {
  const res = [];
  const used = Array(nums.length).fill(false);
  const path = [];

  function dfs() {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  }
  dfs();
  return res;
}
