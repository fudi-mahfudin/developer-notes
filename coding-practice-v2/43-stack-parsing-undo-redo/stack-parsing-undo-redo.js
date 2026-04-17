/**
 * Judul: Topik 43 — Stack untuk parsing / undo–redo
 *
 * Soal test:
 * - TextEditorUndo: `type`, `undo`, `redo`, `getText` — dua stack undo/redo.
 * - isBalancedParens: valid `(` `)` dengan satu jenis.
 *
 * Kontrak: undo/redo dalam batas history.
 *
 * Solusi: Stack `past` dan `future`; operasi memindahkan snapshot string.
 *
 * @see knowledge-base/05-coding-interview-v2/43-stack-parsing-undo-redo.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/43-stack-parsing-undo-redo/stack-parsing-undo-redo.test.js`
 */

/**
 * Judul: Editor teks minimal dengan undo/redo
 *
 * Soal test:
 * - Ketik `a`,`b`, undo → `a`, redo → `ab`.
 *
 * Kontrak: state string internal.
 *
 * Solusi: `undoStack` push snapshot sebelum mutasi; `redoStack` clear on new type.
 */
export class TextEditorUndo {
  constructor() {
    /** @type {string[]} */
    this.undoStack = [];
    /** @type {string[]} */
    this.redoStack = [];
    /** @type {string} */
    this.text = "";
  }

  /**
   * @param {string} chunk
   */
  type(chunk) {
    if (typeof chunk !== "string") throw new TypeError("chunk must be string");
    this.undoStack.push(this.text);
    this.redoStack.length = 0;
    this.text += chunk;
  }

  undo() {
    if (this.undoStack.length === 0) return;
    this.redoStack.push(this.text);
    this.text = /** @type {string} */ (this.undoStack.pop());
  }

  redo() {
    if (this.redoStack.length === 0) return;
    this.undoStack.push(this.text);
    this.text = /** @type {string} */ (this.redoStack.pop());
  }

  getText() {
    return this.text;
  }
}

/**
 * Judul: Kurung seimbang satu jenis
 *
 * Soal test:
 * - `"(())"` true; `"(()"` false.
 *
 * Kontrak: hanya `(` dan `)`.
 *
 * Solusi: Counter/stack height.
 *
 * @param {string} s
 */
export function isBalancedParens(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  let bal = 0;
  for (const ch of s) {
    if (ch === "(") bal += 1;
    else if (ch === ")") {
      bal -= 1;
      if (bal < 0) return false;
    } else throw new RangeError("only ( and )");
  }
  return bal === 0;
}

/**
 * Judul: Parser perintah sederhana: `T:text` ketik, `U` undo, `R` redo
 *
 * Soal test:
 * - `"T:a|T:b|U|R"` → teks akhir `ab`.
 *
 * Kontrak: token dipisah `|`; chunk setelah `T:` boleh kosong.
 *
 * Solusi: `split` + loop; `TextEditorUndo`.
 *
 * @param {string} script
 * @param {TextEditorUndo} editor
 */
export function applyTextScript(script, editor) {
  if (typeof script !== "string") throw new TypeError("script must be string");
  if (!(editor instanceof TextEditorUndo)) throw new TypeError("editor must be TextEditorUndo");
  const parts = script.split("|");
  for (const p of parts) {
    if (p.startsWith("T:")) editor.type(p.slice(2));
    else if (p === "U") editor.undo();
    else if (p === "R") editor.redo();
    else throw new RangeError(`unknown command: ${p}`);
  }
}

/**
 * Judul: Kedalaman tumpukan kurung maksimum (untuk memori stack)
 *
 * Soal test:
 * - `"((()))"` → 3; `"()()"` → 1.
 *
 * Kontrak: hanya `(` `)`.
 *
 * Solusi: Simulasi stack height.
 *
 * @param {string} s
 */
export function maxNestingDepthParens(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  let cur = 0;
  let best = 0;
  for (const ch of s) {
    if (ch === "(") {
      cur += 1;
      best = Math.max(best, cur);
    } else if (ch === ")") {
      cur -= 1;
      if (cur < 0) throw new RangeError("invalid: ) without (");
    } else throw new RangeError("only ( and )");
  }
  if (cur !== 0) throw new RangeError("unbalanced");
  return best;
}
