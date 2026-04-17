/**
 * Generate Parentheses
 * @see knowledge-base/05-coding-interview-pembahasan/075-generate-parentheses.md
 *
 * @param {number} n
 * @returns {string[]}
 */
export function generateParenthesis(n) {
  const out = [];
  function bt(s, open, close) {
    if (s.length === 2 * n) {
      out.push(s);
      return;
    }
    if (open < n) bt(s + '(', open + 1, close);
    if (close < open) bt(s + ')', open, close + 1);
  }
  bt('', 0, 0);
  return out;
}
