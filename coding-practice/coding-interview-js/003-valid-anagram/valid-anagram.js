/**
 * Valid Anagram
 * @see knowledge-base/05-coding-interview-pembahasan/003-valid-anagram.md
 *
 * Ringkasan: multiset karakter s sama dengan t?
 * Time: O(n), Space: O(1) jika alfabet tetap (26)
 *
 * @param {string} s
 * @param {string} t
 * @returns {boolean}
 */
export function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Map();
  for (let i = 0; i < s.length; i++) {
    const a = s[i];
    const b = t[i];
    count.set(a, (count.get(a) || 0) + 1);
    count.set(b, (count.get(b) || 0) - 1);
  }
  for (const v of count.values()) {
    if (v !== 0) return false;
  }
  return true;
}
