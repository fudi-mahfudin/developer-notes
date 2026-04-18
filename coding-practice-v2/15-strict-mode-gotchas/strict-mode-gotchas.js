/**
 * Judul: Topik 15 — Strict mode dan gotchas umum
 *
 * Soal test:
 * - runStrictFunction: `"return 1+1"` → `2`.
 * - strictDeleteNonConfigurableThrows / strictAssignUndeclaredThrows / strictAssignToFrozenObjectThrows → `TypeError` atau `ReferenceError` sesuai kasus.
 * - strictThisOnPlainCallIsUndefined → `undefined`; strictContextObjectIsZeroVsNegZero → `true`; pragmaUseStrictRecognized → `true`.
 * - strictDuplicateParameterInInnerFunctionThrows → `SyntaxError`; sloppyLocalVarDeleteReturnsBoolean → `true`.
 * - strictModeIsolationHint: panjang > 30.
 *
 * Ringkasan soal:
 * - Perbedaan perilaku strict vs non-strict pada subset konstruksi (`delete`, `eval`, `with` tidak dipakai).
 * - Membangun fungsi dinamis dengan `Function` untuk mengisolasi mode (tanpa mengubah global file).
 * - `this` pada pemanggilan fungsi biasa di strict mode.
 *
 * Solusi: Setiap demonstrasi dibungkus dalam fungsi yang mengembalikan hasil atau melempar error
 * yang diharapkan; tidak mengaktifkan `"use strict"` di seluruh modul agar tidak mengubah tes lain.
 *
 * @see knowledge-base/05-coding-interview-v2/15-strict-mode-gotchas.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * Judul: Jalankan potongan kode dalam strict mode (via `Function`)
 *
 * Soal test:
 * - `runStrictFunction("return 1 + 1;")` → `2`.
 *
 * Ringkasan soal:
 * - `new Function('"use strict"; ...')` mengaktifkan strict hanya untuk fungsi tersebut.
 *
 * Kontrak: `body` string berisi pernyataan; tidak boleh mengimpor.
 *
 * Solusi: Pragma `"use strict"` di awal body.
 *
 * @param {string} body
 */
export function runStrictFunction(body) {
  if (typeof body !== "string") {
    throw new TypeError("body must be a string");
  }
  const fn = new Function(`"use strict"; ${body}`);
  return fn();
}

/**
 * Judul: `delete` properti non-konfigurabel — strict menolak
 *
 * Soal test:
 * - `strictDeleteNonConfigurableThrows()` → `TypeError`.
 *
 * Ringkasan soal:
 * - Buat objek dengan `Object.defineProperty` `configurable: false`.
 * - Di strict mode, `delete` melempar `TypeError`; di sloppy bisa `false` tanpa throw.
 *
 * Kontrak: tidak ada.
 *
 * Solusi: `runStrictFunction` dengan `delete o.x`.
 */
export function strictDeleteNonConfigurableThrows() {
  const fn = new Function(`
    "use strict";
    const o = {};
    Object.defineProperty(o, 'x', { value: 1, configurable: false, writable: true });
    delete o.x;
  `);
  return fn();
}

/**
 * Judul: Akses `this` pada pemanggilan fungsi bebas di strict mode
 *
 * Soal test:
 * - `strictThisOnPlainCallIsUndefined()` → `undefined`.
 *
 * Ringkasan soal:
 * - `function f() { return this; }` dipanggil dengan `f()` → `this` adalah `undefined` di strict.
 *
 * Kontrak: tidak ada.
 *
 * Solusi: Jalankan `Function` dengan strict.
 */
export function strictThisOnPlainCallIsUndefined() {
  const fn = new Function(`
    "use strict";
    const f = function () { return this; };
    return f();
  `);
  return fn();
}

/**
 * Judul: Assignment ke binding yang tidak dideklarasikan — ReferenceError
 *
 * Soal test:
 * - `strictAssignUndeclaredThrows()` → `ReferenceError`.
 *
 * Ringkasan soal:
 * - Di strict mode, `undeclared = 1` melempar `ReferenceError` (bukan membuat global).
 *
 * Kontrak: tidak ada.
 *
 * Solusi: `runStrictFunction` dengan assignment tanpa deklarasi.
 */
export function strictAssignUndeclaredThrows() {
  const fn = new Function(`
    "use strict";
    notDeclaredAnywhere = 1;
  `);
  return fn();
}

/**
 * Judul: Parameter duplikat — SyntaxError di strict
 *
 * Soal test:
 * - `strictDuplicateParameterInInnerFunctionThrows()` → `SyntaxError` dari `Function` constructor.
 *
 * Ringkasan soal:
 * - `function(a, a) {}` valid di sloppy `Function`; dalam strict mode body syntax error.
 *
 * Kontrak: tidak ada.
 *
 * Solusi: `new Function('"use strict"; function f(a,a){}')` melempar `SyntaxError`.
 */
export function strictDuplicateParameterInInnerFunctionThrows() {
  // Deklarasi fungsi dengan parameter duplikat di dalam strict: SyntaxError saat parse.
  new Function('"use strict"; function f(a, a) { return a; }');
}

/**
 * Judul: Sloppy mode — `delete` global property bisa tidak throw (var di global)
 *
 * Soal test:
 * - `sloppyLocalVarDeleteReturnsBoolean()` → `true` (delete properti objek lokal configurable).
 *
 * Ringkasan soal:
 * - Menggunakan `Function` tanpa strict: perilaku `delete` berbeda untuk deklarasi `var` di fungsi sloppy.
 *
 * Kontrak: tidak ada.
 *
 * Solusi: Fungsi `Function` tanpa pragma strict; `var x` lokal dapat dihapus jika configurable.
 */
export function sloppyLocalVarDeleteReturnsBoolean() {
  const fn = new Function(`
    var o = { x: 1 };
    return delete o.x;
  `);
  return fn();
}

/**
 * Judul: `Object.freeze` + strict mode — tidak bisa assign properti
 *
 * Soal test:
 * - `strictAssignToFrozenObjectThrows()` → `TypeError`.
 *
 * Ringkasan soal:
 * - Objek dibekukan; assignment di strict melempar `TypeError`.
 *
 * Kontrak: tidak ada.
 *
 * Solusi: `Object.freeze` lalu `o.x = 2` dalam strict.
 */
export function strictAssignToFrozenObjectThrows() {
  const fn = new Function(`
    "use strict";
    const o = Object.freeze({ x: 1 });
    o.x = 2;
  `);
  return fn();
}

/**
 * Judul: Membedakan `0` dan `-0` dengan `Object.is` di strict konteks
 *
 * Soal test:
 * - `strictContextObjectIsZeroVsNegZero()` → `true` (memverifikasi `Object.is(0, -0)` false).
 *
 * Ringkasan soal:
 * - Latihan edge case numerik yang sering dipakai bersama strict equality checks.
 *
 * Kontrak: tidak ada.
 *
 * Solusi: `Object.is(0, -0) === false`.
 */
export function strictContextObjectIsZeroVsNegZero() {
  return Object.is(0, -0) === false;
}

/**
 * Judul: `use strict` string harus tepat — pragma
 *
 * Soal test:
 * - `pragmaUseStrictRecognized()` → `true`.
 *
 * Ringkasan soal:
 * - Hanya `"use strict"` atau `'use strict'` di awal skrip/fungsi yang diakui.
 *
 * Kontrak: tidak ada.
 *
 * Solusi: Fungsi dengan pragma valid mengembalikan `true` untuk `this === undefined` pada plain call.
 */
export function pragmaUseStrictRecognized() {
  const fn = new Function(`
    "use strict";
    return (function () { return this === void 0; })();
  `);
  return fn() === true;
}

/**
 * Judul: Ringkasan teks — mengapa mengisolasi strict mode
 *
 * Soal test:
 * - `strictModeIsolationHint().length` > 30.
 *
 * Ringkasan soal:
 * - Dokumentasi singkat untuk README internal.
 *
 * Kontrak: tidak ada.
 *
 * Solusi: String statis.
 */
export function strictModeIsolationHint() {
  return [
    "Use strict per-function via Function or ES modules (modules are strict by default).",
    "Avoid relying on sloppy-mode globals; prefer explicit declarations.",
    "Catch TypeError on delete and assignment to frozen/sealed objects in strict code.",
  ].join("\n");
}
