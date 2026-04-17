/**
 * Judul: Topik 1 — Hoisting, `var` vs `let`/`const`, Temporal Dead Zone (TDZ)
 *
 * Soal test:
 * - Suite Vitest: closure di loop (`let` / IIFE / bug `var`); TDZ `let`/`class` dan `typeof` di TDZ;
 *   `const` reassign → `TypeError`; hoisting function declaration vs expression (`typeof`).
 *
 * Ringkasan soal:
 * - Menguji hoisting (`var`, function declaration vs expression).
 * - Closure di loop (`let` vs `var`, IIFE, bug klasik).
 * - TDZ pada `let`/`const`/`class` (termasuk `typeof` di TDZ).
 * - Pola yang sering muncul di review kode dan trivia tingkat senior.
 *
 * Solusi: Setiap ekspor berisi satu pola terisolasi dengan kontrak input yang jelas (`RangeError`
 * untuk prekondisi gagal). Komentar per fungsi menjelaskan mekanisme bahasa, bukan hanya jawaban.
 *
 * @see knowledge-base/05-coding-interview-v2/01-hoisting-var-let-const-tdz.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * @param {number} n
 */
function assertNonNegativeInteger(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError("n must be a non-negative integer");
  }
}

/**
 * Judul: Callback loop dengan `let` — indeks per iterasi
 *
 * Soal test:
 * - `buildLoopClosuresWithLet(3)` → `[0,1,2]`; `n=0` → `[]`; input invalid → `RangeError`.
 *
 * Ringkasan soal:
 * - Input: `n` ≥ 0; output: array berisi `n` fungsi.
 * - Setelah semua callback dibuat, `f[0]()` … `f[n−1]()` harus mengembalikan `0` … `n−1`.
 * - Bukan nilai indeks loop setelah iterasi terakhir.
 *
 * Kontrak:
 * - Pre: `n` bilangan bulat ≥ 0; jika tidak → `RangeError`.
 *
 * Solusi: `for (let i = 0; …)` — `let` membuat binding baru per iterasi sehingga setiap closure
 * menangkap `i` yang benar.
 *
 * @param {number} n
 * @returns {(() => number)[]}
 */
export function buildLoopClosuresWithLet(n) {
  assertNonNegativeInteger(n);
  const callbacks = [];
  for (let i = 0; i < n; i++) {
    callbacks.push(() => i);
  }
  return callbacks;
}

/**
 * Judul: Memperbaiki `for (var …)` + closure dengan IIFE
 *
 * Soal test:
 * - `buildLoopClosuresVarFixedWithIIFE(4)` → `[0,1,2,3]`; `n` invalid → `RangeError`.
 *
 * Ringkasan soal:
 * - Pola `for (var i …)` + push callback sering menghasilkan nilai akhir `i` untuk semua closure.
 * - Perbaiki perilaku agar setiap callback mengembalikan indeks iterasinya.
 * - Tanpa mengganti ke `let` — gunakan IIFE (latihan pola).
 *
 * Kontrak:
 * - Pre: `n` bilangan bulat ≥ 0; jika tidak → `RangeError`.
 *
 * Solusi: IIFE `(function (j) { … })(i)` menangkap salinan nilai `i` per iterasi ke parameter `j`.
 *
 * @param {number} n
 * @returns {(() => number)[]}
 */
export function buildLoopClosuresVarFixedWithIIFE(n) {
  assertNonNegativeInteger(n);
  const callbacks = [];
  for (var i = 0; i < n; i++) {
    ((j) => {
      callbacks.push(() => j);
    })(i);
  }
  return callbacks;
}

/**
 * Judul: `for (var …)` + closure — perilaku bug klasik (sengaja tidak diperbaiki)
 *
 * Soal test:
 * - `buildLoopClosuresWithVarBug(3)` → `[3,3,3]`; `n=0` → `[]`; `n` invalid → `RangeError`.
 *
 * Ringkasan soal:
 * - Sama kontrak I/O dengan `buildLoopClosuresWithLet`, tetapi `for (var i …)`.
 * - Setelah loop selesai, panggil tiap callback.
 * - Prediksi: nilai apa yang dikembalikan masing-masing? (perilaku bug klasik, sengaja tidak diperbaiki).
 *
 * Kontrak:
 * - Pre: `n` bilangan bulat ≥ 0; jika tidak → `RangeError`.
 *
 * Solusi: Satu binding `i` untuk seluruh function scope; saat callback dipanggil, `i` sudah `n`.
 * Hasil: `[n, …, n]` (bukan rentang 0..n−1).
 *
 * @param {number} n
 * @returns {(() => number)[]}
 */
export function buildLoopClosuresWithVarBug(n) {
  assertNonNegativeInteger(n);
  const callbacks = [];
  for (var i = 0; i < n; i++) {
    callbacks.push(() => i);
  }
  return callbacks;
}

/**
 * Judul: Membaca `var` sebelum baris assignment
 *
 * Soal test:
 * - `readVarBeforeAssignmentInSameFunction()` → `undefined`.
 *
 * Ringkasan soal:
 * - Dalam satu fungsi: `var result = x; var x = 42; return result;`.
 * - Prediksi nilai `result` (hoisting vs urutan eksekusi assignment).
 *
 * Solusi: `var x` di-hoist dan diinisialisasi `undefined`; assignment `x = 42` terjadi setelah
 * `result = x`, jadi `result` adalah `undefined`.
 *
 * @returns {unknown}
 */
export function readVarBeforeAssignmentInSameFunction() {
  var result = x;
  var x = 42;
  return result;
}

/**
 * Judul: `typeof` pada nama yang tidak pernah dideklarasikan
 *
 * Soal test:
 * - `typeofUndeclaredName()` → `'undefined'`.
 *
 * Ringkasan soal:
 * - Di dalam fungsi, `y` tidak pernah dideklarasikan di scope yang relevan.
 * - Apa hasil `typeof y`?
 *
 * Solusi: Ekspresi `typeof` untuk nama yang tidak ter-resolve mengembalikan string `'undefined'`
 * (bukan ReferenceError; berbeda dari TDZ `let`/`const`).
 *
 * @returns {string}
 */
export function typeofUndeclaredName() {
  return typeof y;
}

/**
 * Judul: TDZ — akses `let` sebelum inisialisasi
 *
 * Soal test:
 * - `accessLetInTemporalDeadZone()` → `ReferenceError`.
 *
 * Ringkasan soal:
 * - Fungsi berisi `return a` diikuti `let a = 1` (urutan teks).
 * - Apa yang terjadi saat fungsi dipanggil?
 *
 * Solusi: Binding `let` ada tetapi belum diinisialisasi → Temporal Dead Zone → `ReferenceError`
 * saat mengevaluasi `return a`.
 */
export function accessLetInTemporalDeadZone() {
  return a;
  let a = 1;
}

/**
 * Judul: TDZ — `typeof` pada `let` yang belum diinisialisasi
 *
 * Soal test:
 * - `typeofLetInTemporalDeadZone()` → `ReferenceError`.
 *
 * Ringkasan soal:
 * - Di blok yang sama: `typeof b` ditulis sebelum `let b = 1`.
 * - Apakah hasilnya `'undefined'` seperti nama yang sama sekali tidak dideklarasikan?
 *
 * Solusi: Tidak. Binding `let` sudah ada di scope blok sehingga `typeof` tidak membebaskan dari
 * TDZ — tetap `ReferenceError`.
 */
export function typeofLetInTemporalDeadZone() {
  if (true) {
    return typeof b;
    let b = 1;
  }
}

/**
 * Judul: Reassign binding `const`
 *
 * Soal test:
 * - `constBindingReassignThrows()` → `TypeError`.
 *
 * Ringkasan soal:
 * - Eksekusi: `const o = { k: 1 };` lalu `o = { k: 2 };`.
 * - Error apa yang dilempar?
 *
 * Solusi: `TypeError` — binding `const` tidak boleh diganti referensi baru (bukan TDZ `let`).
 */
export function constBindingReassignThrows() {
  const o = { k: 1 };
  o = { k: 2 };
}

/**
 * Judul: Hoisting function declaration
 *
 * Soal test:
 * - `typeofHoistedFunctionDeclaration()` → `'function'`.
 *
 * Ringkasan soal:
 * - Pada baris yang dieksekusi sebelum teks `function hoistedLater() {}`.
 * - Apa hasil `typeof hoistedLater`?
 *
 * Solusi: `'function'` — deklarasi fungsi di-hoist beserta isi sehingga nama tersedia di seluruh
 * fungsi pembungkus.
 *
 * @returns {string}
 */
export function typeofHoistedFunctionDeclaration() {
  return typeof hoistedLater;
  function hoistedLater() {
    return 0;
  }
}

/**
 * Judul: TDZ — `class` dipakai sebelum baris deklarasi
 *
 * Soal test:
 * - `instantiateClassBeforeDeclarationThrows()` → `ReferenceError`.
 *
 * Ringkasan soal:
 * - Satu fungsi: `return new MyClass()` ditulis sebelum `class MyClass {}`.
 * - Error apa saat fungsi dipanggil?
 *
 * Solusi: Deklarasi `class` di-hoist dengan TDZ mirip `let`; sebelum baris class dieksekusi,
 * nama mengacu ke binding yang belum diinisialisasi → `ReferenceError`.
 */
export function instantiateClassBeforeDeclarationThrows() {
  return new HoistedClassLater();
  class HoistedClassLater {}
}

/**
 * Judul: Hoisting function expression lewat `var`
 *
 * Soal test:
 * - `typeofVarFunctionExpressionBeforeLine()` → `'undefined'`.
 *
 * Ringkasan soal:
 * - Pada baris sebelum `var assignedLater = function () {}` dieksekusi.
 * - Apa hasil `typeof assignedLater`?
 *
 * Solusi: `'undefined'` — yang di-hoist hanya `var assignedLater` (nilai awal `undefined`);
 * assignment ke fungsi terjadi saat baris tersebut dieksekusi.
 *
 * @returns {string}
 */
export function typeofVarFunctionExpressionBeforeLine() {
  return typeof assignedLater;
  var assignedLater = function () {
    return 1;
  };
}
