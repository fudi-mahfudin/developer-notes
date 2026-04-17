/**
 * Longest Palindromic Substring
 * @see knowledge-base/05-coding-interview-pembahasan/090-longest-palindromic-substring.md
 *
 * @param {string} s
 * @returns {string}
 */
export function longestPalindrome(s) {
  let start = 0;
  let maxLen = 0;

  function expand(lo, hi) {
    while (lo >= 0 && hi < s.length && s[lo] === s[hi]) {
      if (hi - lo + 1 > maxLen) {
        maxLen = hi - lo + 1;
        start = lo;
      }
      lo--;
      hi++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.slice(start, start + maxLen);
}
