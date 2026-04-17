/**
 * Combination Sum II
 * @see knowledge-base/05-coding-interview-pembahasan/077-combination-sum-ii.md
 *
 * @param {number[]} candidates (bisa duplikat, tiap angka dipakai sekali per kombinasi)
 * @param {number} target
 * @returns {number[][]}
 */
export function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b);
  const res = [];

  function dfs(start, sum, path) {
    if (sum === target) {
      res.push([...path]);
      return;
    }
    if (sum > target) return;
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      path.push(candidates[i]);
      dfs(i + 1, sum + candidates[i], path);
      path.pop();
    }
  }
  dfs(0, 0, []);
  return res;
}
