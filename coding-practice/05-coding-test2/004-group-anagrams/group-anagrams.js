/**
 * Group Anagrams
 * @see knowledge-base/05-coding-test2/004-group-anagrams.md
 *
 * Ringkasan: kelompokkan string yang saling anagram.
 * Time: O(n * k) (n = jumlah string, k = panjang rata-rata), Space: O(n * k)
 *
 * @param {string[]} strs
 * @returns {string[][]}
 */
export function groupAnagrams(strs) {
  const map = new Map();
  for (const w of strs) {
    const key = [...w].sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(w);
  }
  return [...map.values()];
}
