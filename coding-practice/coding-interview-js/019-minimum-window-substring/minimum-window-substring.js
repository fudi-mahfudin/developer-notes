/**
 * Minimum Window Substring
 * @see knowledge-base/05-coding-interview-pembahasan/019-minimum-window-substring.md
 *
 * Ringkasan: substring terpendek di s yang memuat multiset t.
 * Time: O(|s|+|t|), Space: O(|alphabet|)
 *
 * @param {string} s
 * @param {string} t
 * @returns {string}
 */
export function minWindow(s, t) {
  if (t.length === 0) return '';
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);

  let have = 0;
  const needCount = need.size;
  const win = new Map();
  let L = 0;
  let start = 0;
  let bestLen = Infinity;

  for (let R = 0; R < s.length; R++) {
    const c = s[R];
    win.set(c, (win.get(c) || 0) + 1);
    if (need.has(c) && win.get(c) === need.get(c)) have++;

    while (have === needCount) {
      if (R - L + 1 < bestLen) {
        bestLen = R - L + 1;
        start = L;
      }
      const left = s[L];
      win.set(left, win.get(left) - 1);
      if (need.has(left) && win.get(left) < need.get(left)) have--;
      L++;
    }
  }

  return bestLen === Infinity ? '' : s.slice(start, start + bestLen);
}
