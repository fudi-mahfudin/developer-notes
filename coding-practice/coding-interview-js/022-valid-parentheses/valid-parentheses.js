/**
 * Valid Parentheses
 * @see knowledge-base/05-coding-interview-pembahasan/022-valid-parentheses.md
 *
 * Ringkasan: tanda kurung seimbang dan urutan benar.
 * Time: O(n), Space: O(n)
 *
 * @param {string} s
 * @returns {boolean}
 */
const pair = new Map([
  ['(', ')'],
  ['[', ']'],
  ['{', '}'],
]);

export function isValid(s) {
  const st = [];
  for (const c of s) {
    if (pair.has(c)) st.push(pair.get(c));
    else if (st.pop() !== c) return false;
  }
  return st.length === 0;
}
