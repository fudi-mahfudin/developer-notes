/**
 * Judul: Topik 48 — RPN / kalkulator postfix
 *
 * Soal test:
 * - evalRpn: token `+ - * /` dan integer; stack operand.
 *
 * Kontrak: ekspresi valid; bagi integer truncates toward zero (seperti LeetCode).
 *
 * Solusi: Stack; pop dua operand; apply operator.
 *
 * @see knowledge-base/05-coding-interview-v2/48-rpn-calculator.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/48-rpn-calculator/rpn-calculator.test.js`
 */

/**
 * Judul: Evaluasi notasi postfix (Reverse Polish)
 *
 * Soal test:
 * - `["2","1","+","3","*"]` → `9`; `["4","13","5","/","+"]` → `6`.
 *
 * Kontrak: `tokens` non-kosong; hasil dalam rentang integer aman.
 *
 * Solusi: Satu pass stack.
 *
 * @param {string[]} tokens
 */
export function evalRpn(tokens) {
  if (!Array.isArray(tokens) || tokens.length === 0) throw new RangeError("tokens must be non-empty");
  /** @type {number[]} */
  const st = [];
  const ops = new Set(["+", "-", "*", "/"]);
  for (const t of tokens) {
    if (!ops.has(t)) {
      const n = Number(t);
      if (!Number.isFinite(n)) throw new RangeError(`invalid number: ${t}`);
      st.push(n);
      continue;
    }
    if (st.length < 2) throw new RangeError("invalid expression");
    const b = st.pop();
    const a = st.pop();
    if (t === "+") st.push(a + b);
    else if (t === "-") st.push(a - b);
    else if (t === "*") st.push(a * b);
    else st.push(truncDiv(a, b));
  }
  if (st.length !== 1) throw new RangeError("invalid expression");
  return st[0];
}

/**
 * @param {number} a
 * @param {number} b
 */
function truncDiv(a, b) {
  const q = a / b;
  return q >= 0 ? Math.floor(q) : Math.ceil(q);
}

/**
 * Judul: Tokenize string RPN dengan spasi
 *
 * Soal test:
 * - `"2 1 + 3 *"` → `["2","1","+","3","*"]`.
 *
 * Kontrak: trim; whitespace run di-collapse.
 *
 * Solusi: `trim` + `split(/\s+/)` filter kosong.
 *
 * @param {string} expr
 * @returns {string[]}
 */
export function tokenizeRpn(expr) {
  if (typeof expr !== "string") throw new TypeError("expr must be string");
  return expr
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0);
}

/**
 * Judul: Evaluasi dari string satu baris
 *
 * Soal test:
 * - Sama hasil dengan `evalRpn(tokenizeRpn(s))`.
 *
 * Kontrak: ekspresi valid.
 *
 * Solusi: `evalRpn(tokenizeRpn(expr))`.
 *
 * @param {string} expr
 */
export function evalRpnString(expr) {
  return evalRpn(tokenizeRpn(expr));
}

/**
 * Judul: Validasi token hanya angka atau operator
 *
 * Soal test:
 * - `["2","+"]` valid; `["x"]` invalid.
 *
 * Kontrak: throw `RangeError` jika invalid.
 *
 * Solusi: Set operator + Number check.
 *
 * @param {string[]} tokens
 */
export function assertValidRpnTokens(tokens) {
  if (!Array.isArray(tokens)) throw new TypeError("tokens must be array");
  const ops = new Set(["+", "-", "*", "/"]);
  for (const t of tokens) {
    if (ops.has(t)) continue;
    const n = Number(t);
    if (!Number.isFinite(n)) throw new RangeError(`invalid token: ${t}`);
  }
}
