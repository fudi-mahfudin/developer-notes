/**
 * Palindromic Substrings
 * @see knowledge-base/05-coding-test2/091-palindromic-substrings.md
 *
 * @param {string} s
 * @returns {number}
 */
export function countSubstrings(s) {
  let cnt = 0;

  function expand(lo, hi) {
    while (lo >= 0 && hi < s.length && s[lo] === s[hi]) {
      cnt++;
      lo--;
      hi++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return cnt;
}
