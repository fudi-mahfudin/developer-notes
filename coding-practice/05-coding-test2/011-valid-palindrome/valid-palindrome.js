/**
 * Valid Palindrome
 * @see knowledge-base/05-coding-test2/011-valid-palindrome.md
 *
 * Ringkasan: abaikan non-alnum; perbandingan case-insensitive.
 * Time: O(n), Space: O(1)
 *
 * @param {string} s
 * @returns {boolean}
 */
function isAlNum(c) {
  return /[a-zA-Z0-9]/.test(c);
}

export function isPalindrome(s) {
  let L = 0;
  let R = s.length - 1;
  while (L < R) {
    while (L < R && !isAlNum(s[L])) L++;
    while (L < R && !isAlNum(s[R])) R--;
    if (s[L].toLowerCase() !== s[R].toLowerCase()) return false;
    L++;
    R--;
  }
  return true;
}
