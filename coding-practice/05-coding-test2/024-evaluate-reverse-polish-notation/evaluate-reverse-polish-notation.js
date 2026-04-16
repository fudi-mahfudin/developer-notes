/**
 * Evaluate Reverse Polish Notation
 * @see knowledge-base/05-coding-test2/024-evaluate-reverse-polish-notation.md
 *
 * Ringkasan: evaluasi ekspresi postfix.
 * Time: O(n), Space: O(n)
 *
 * @param {string[]} tokens
 * @returns {number}
 */
export function evalRPN(tokens) {
  const st = [];
  for (const t of tokens) {
    if (t === '+' || t === '-' || t === '*' || t === '/') {
      const b = st.pop();
      const a = st.pop();
      switch (t) {
        case '+':
          st.push(a + b);
          break;
        case '-':
          st.push(a - b);
          break;
        case '*':
          st.push(a * b);
          break;
        default:
          st.push(Math.trunc(a / b));
      }
    } else {
      st.push(Number(t));
    }
  }
  return st[0];
}
