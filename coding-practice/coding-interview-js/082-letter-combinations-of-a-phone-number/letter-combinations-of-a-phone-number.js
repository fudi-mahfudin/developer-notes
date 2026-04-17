/**
 * Letter Combinations of a Phone Number
 * @see knowledge-base/05-coding-interview-pembahasan/082-letter-combinations-of-a-phone-number.md
 *
 * @param {string} digits
 * @returns {string[]}
 */
const pad = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];

export function letterCombinations(digits) {
  if (!digits.length) return [];
  const res = [];

  function dfs(i, path) {
    if (i === digits.length) {
      res.push(path);
      return;
    }
    const letters = pad[Number(digits[i])];
    for (const ch of letters) {
      dfs(i + 1, path + ch);
    }
  }
  dfs(0, '');
  return res;
}
