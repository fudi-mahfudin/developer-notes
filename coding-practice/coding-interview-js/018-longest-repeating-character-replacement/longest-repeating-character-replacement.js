/**
 * Longest Repeating Character Replacement
 * @see knowledge-base/05-coding-interview-pembahasan/018-longest-repeating-character-replacement.md
 *
 * Ringkasan: substring panjang maksimal dengan paling banyak k penggantian agar seragam.
 * Time: O(n), Space: O(1) (alfabet 26)
 *
 * @param {string} s
 * @param {number} k
 * @returns {number}
 */
export function characterReplacement(s, k) {
  const cnt = new Array(26).fill(0);
  let L = 0;
  let maxFreq = 0;
  let best = 0;
  const code = (c) => c.charCodeAt(0) - 65;

  for (let R = 0; R < s.length; R++) {
    const i = code(s[R]);
    cnt[i]++;
    maxFreq = Math.max(maxFreq, cnt[i]);
    while (R - L + 1 - maxFreq > k) {
      cnt[code(s[L])]--;
      L++;
    }
    best = Math.max(best, R - L + 1);
  }
  return best;
}
