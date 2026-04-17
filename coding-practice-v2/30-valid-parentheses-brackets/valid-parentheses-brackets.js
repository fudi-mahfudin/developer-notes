/**
 * Judul: Topik 30 — Valid parentheses / bracket matching
 *
 * Soal test:
 * - isValidBrackets: `()[]{}` valid; `([)]` invalid.
 * - minBracketsToAdd: berapa kurung tambahan untuk membuat valid (LeetCode varian).
 *
 * Ringkasan soal:
 * - Stack untuk pembuka; pop jika pasangan; akhir stack kosong.
 *
 * Solusi: Map `)` → `(`; invalid jika mismatch atau stack kosong saat tutup.
 *
 * @see knowledge-base/05-coding-interview-v2/30-valid-parentheses-brackets.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/30-valid-parentheses-brackets/valid-parentheses-brackets.test.js`
 */

const PAIR = /** @type {const} */ ({
  ")": "(",
  "]": "[",
  "}": "{",
});

const OPEN = new Set(["(", "[", "{"]);

/**
 * Judul: Validasi string hanya `()[]{}`
 *
 * Soal test:
 * - `""` true; `"{[]}"` true; `"([)]"` false.
 *
 * Ringkasan soal:
 * - Invariant: stack = pembuka yang belum ditutup.
 *
 * Kontrak: karakter lain → `false` atau throw — di sini `false`.
 *
 * Solusi: Stack array.
 *
 * @param {string} s
 */
export function isValidBrackets(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  /** @type {string[]} */
  const st = [];
  for (const ch of s) {
    if (OPEN.has(ch)) {
      st.push(ch);
      continue;
    }
    if (PAIR[/** @type {keyof typeof PAIR} */ (ch)] !== undefined) {
      const need = PAIR[/** @type {keyof typeof PAIR} */ (ch)];
      if (st.length === 0 || st[st.length - 1] !== need) return false;
      st.pop();
      continue;
    }
    return false;
  }
  return st.length === 0;
}

/**
 * Judul: Minimal kurung tambahan agar valid (hanya `(` dan `)`)
 *
 * Soal test:
 * - `")("` → `2` (tambah pembuka di depan dan penutup di belakang).
 *
 * Ringkasan soal:
 * - Satu pass: track `open` dan `add` untuk `)` tanpa pasangan.
 *
 * Kontrak: string hanya `(` dan `)`.
 *
 * Solusi: Greedy: `balance` + `add` untuk `)` extra needed; akhir `balance` = `(` tidak tertutup.
 *
 * @param {string} s
 */
export function minParenthesesToAdd(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  let add = 0;
  let bal = 0;
  for (const ch of s) {
    if (ch === "(") {
      bal += 1;
    } else if (ch === ")") {
      if (bal === 0) add += 1;
      else bal -= 1;
    } else {
      throw new RangeError("only ( and ) allowed");
    }
  }
  return add + bal;
}

/**
 * Judul: Panjang substring valid maksimum (hanya `(` dan `)`)
 *
 * Soal test:
 * - `")()())"` → `4` untuk `()()`.
 *
 * Ringkasan soal:
 * - DP/stack indeks — di sini solusi stack DP ringkas O(n).
 *
 * Kontrak: `(` dan `)` saja.
 *
 * Solusi: Stack simpan indeks `(`; saat `)` pop atau push indeks `)` sebagai sentinel.
 *
 * @param {string} s
 */
export function longestValidParenthesesLength(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  /** @type {number[]} */
  const st = [-1];
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "(") {
      st.push(i);
    } else if (ch === ")") {
      st.pop();
      if (st.length === 0) st.push(i);
      else best = Math.max(best, i - st[st.length - 1]);
    } else {
      throw new RangeError("only ( and ) allowed");
    }
  }
  return best;
}
