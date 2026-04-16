/**
 * Subsets
 * @see knowledge-base/05-coding-test2/079-subsets.md
 *
 * @param {number[]} nums unik
 * @returns {number[][]}
 */
export function subsets(nums) {
  const res = [];
  const path = [];

  function dfs(i) {
    if (i === nums.length) {
      res.push([...path]);
      return;
    }
    dfs(i + 1);
    path.push(nums[i]);
    dfs(i + 1);
    path.pop();
  }
  dfs(0);
  return res;
}
