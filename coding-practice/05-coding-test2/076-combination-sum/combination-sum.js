/**
 * Combination Sum
 * @see knowledge-base/05-coding-test2/076-combination-sum.md
 *
 * @param {number[]} candidates unik, positif
 * @param {number} target
 * @returns {number[][]}
 */
export function combinationSum(candidates, target) {
  const res = [];
  candidates.sort((a, b) => a - b);

  function dfs(i, sum, path) {
    if (sum === target) {
      res.push([...path]);
      return;
    }
    if (sum > target) return;
    for (let j = i; j < candidates.length; j++) {
      path.push(candidates[j]);
      dfs(j, sum + candidates[j], path);
      path.pop();
    }
  }
  dfs(0, 0, []);
  return res;
}
