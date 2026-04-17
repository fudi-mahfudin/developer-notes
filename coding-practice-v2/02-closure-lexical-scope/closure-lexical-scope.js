/**
 * Judul: Topik 2 — Closure dan lexical scope
 *
 * Soal test:
 * - Suite Vitest: counter (`createCounter`) — alur nilai dan `RangeError` untuk input tidak valid;
 *   shadowing (`lexicalShadowingInnerWins`); dua factory (`twoIndependentCounters`) tidak berbagi state.
 *
 * Ringkasan soal:
 * - Latihan factory dengan state privat lewat closure.
 * - Shadowing leksikal vs rantai scope.
 * - Pola modul sederhana (API publik, variabel tertutup).
 *
 * Solusi: Binding `let`/`const` di outer function tetap hidup selama fungsi turunan direferensikan;
 * tidak ada `this` dinamis — semua lewat leksikal.
 *
 * @see knowledge-base/05-coding-interview-v2/02-closure-lexical-scope.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * Judul: Counter privat dengan closure
 *
 * Soal test:
 * - `createCounter(10)`: `get` 10 → `increment(3)` 13 → `decrement(5)` 8 → `reset(0)` → `get` 0;
 *   `createCounter(1.2)` dan `increment(1.5)` pada counter melempar `RangeError`.
 *
 * Ringkasan soal:
 * - Buat factory yang mengembalikan API increment / decrement / get / reset.
 * - State bilangan bulat tidak boleh diubah dari luar kecuali lewat API.
 *
 * Kontrak:
 * - `initial` bilangan bulat; default `0`; jika tidak → `RangeError`.
 * - `delta` pada increment/decrement harus bilangan bulat; jika tidak → `RangeError`.
 *
 * Solusi: Satu `let` di scope factory; method menutup variabel tersebut.
 *
 * @param {number} [initial=0]
 */
export function createCounter(initial = 0) {
  if (!Number.isInteger(initial)) {
    throw new RangeError("initial must be an integer");
  }
  let n = initial;
  return {
    increment(delta = 1) {
      if (!Number.isInteger(delta)) throw new RangeError("delta must be an integer");
      n += delta;
      return n;
    },
    decrement(delta = 1) {
      if (!Number.isInteger(delta)) throw new RangeError("delta must be an integer");
      n -= delta;
      return n;
    },
    get() {
      return n;
    },
    reset(value = 0) {
      if (!Number.isInteger(value)) throw new RangeError("value must be an integer");
      n = value;
      return n;
    },
  };
}

/**
 * Judul: Shadowing leksikal — inner mengalahkan outer
 *
 * Soal test:
 * - Nilai kembalian harus tepat `"inner"` (binding dalam menutup binding luar).
 *
 * Ringkasan soal:
 * - Fungsi luar punya `const name = 'outer'`; fungsi dalam mendeklarasikan `name = 'inner'` dan
 *   mengembalikan fungsi yang membaca `name`.
 * - Nilai apa yang dibaca callback paling dalam?
 *
 * Kontrak: tidak ada input; perilaku murni bahasa.
 *
 * Solusi: Pencarian nama leksikal dari dalam ke luar menemukan binding `inner` terdekat.
 *
 * @returns {string}
 */
export function lexicalShadowingInnerWins() {
  const name = "outer";
  function middle() {
    const name = "inner";
    return () => name;
  }
  return middle()();
}

/**
 * Judul: Dua counter independen dari factory yang sama
 *
 * Soal test:
 * - Setelah `a.increment(5)`: `a.get() === 5` dan `b.get() === 0` (dua closure, dua state).
 *
 * Ringkasan soal:
 * - Panggil `createCounter(0)` dua kali; mutasi counter A tidak boleh memengaruhi counter B.
 *
 * Kontrak: sama seperti `createCounter`.
 *
 * Solusi: Tiap pemanggilan factory membuat lingkungan leksikal baru → state terpisah.
 *
 * @returns {{ a: { increment: Function; decrement: Function; get: Function; reset: Function }; b: object }}
 */
export function twoIndependentCounters() {
  return { a: createCounter(0), b: createCounter(0) };
}
