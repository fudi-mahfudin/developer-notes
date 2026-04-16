/**
 * Permutation in String
 * @see knowledge-base/05-coding-test2/020-permutation-in-string.md
 *
 * Ringkasan (LC): apakah s2 memuat substring yang merupakan permutasi s1?
 * Time: O(26·|s2|), Space: O(1)
 *
 * @param {string} s1 pola
 * @param {string} s2 teks
 * @returns {boolean}
 */
function same26(a, b) {
  for (let i = 0; i < 26; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  const need = new Array(26).fill(0);
  for (const c of s1) need[c.charCodeAt(0) - 97]++;

  const win = new Array(26).fill(0);
  for (let i = 0; i < s1.length; i++) win[s2.charCodeAt(i) - 97]++;
  if (same26(need, win)) return true;

  for (let i = s1.length; i < s2.length; i++) {
    win[s2.charCodeAt(i) - 97]++;
    win[s2.charCodeAt(i - s1.length) - 97]--;
    if (same26(need, win)) return true;
  }
  return false;
}
