/**
 * Palindrome Partitioning
 * @see knowledge-base/05-coding-interview-pembahasan/081-palindrome-partitioning.md
 *
 * @param {string} s
 * @returns {string[][]}
 */
export function partition(s) {
  const res = [];
  const path = [];
  const n = s.length;

  function isPal(lo, hi) {
    while (lo < hi) {
      if (s[lo] !== s[hi]) return false;
      lo++;
      hi--;
    }
    return true;
  }

  function dfs(start) {
    if (start === n) {
      res.push([...path]);
      return;
    }
    for (let end = start; end < n; end++) {
      if (isPal(start, end)) {
        path.push(s.slice(start, end + 1));
        dfs(end + 1);
        path.pop();
      }
    }
  }
  dfs(0);
  return res;
}
