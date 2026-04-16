/**
 * Longest Substring Without Repeating Characters
 * @see knowledge-base/05-coding-test2/017-longest-substring-without-repeating-characters.md
 *
 * Ringkasan: panjang substring terpanjang tanpa karakter duplikat.
 * Time: O(n), Space: O(min(n, alphabet))
 *
 * @param {string} s
 * @returns {number}
 */
export function lengthOfLongestSubstring(s) {
  const last = new Map();
  let start = 0;
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (last.has(c) && last.get(c) >= start) start = last.get(c) + 1;
    last.set(c, i);
    best = Math.max(best, i - start + 1);
  }
  return best;
}
