/**
 * Judul: Topik 3 — `this`, arrow functions, `call` / `apply` / `bind`
 *
 * Soal test:
 * - `addWithThisCall(10,1,2) === 13`; `productWithThisApply(2,[2,3]) === 12`; method lepas → `TypeError`;
 *   `boundGetLabel(7)()` === 7; arrow getter dipanggil longgar tetap benar; input invalid → `RangeError`.
 *
 * Ringkasan soal:
 * - Konteks `this` pada pemanggilan biasa vs `call` / `apply` / `bind`.
 * - Method yang “lepas” dari objek kehilangan receiver.
 * - Arrow function menutup `this` leksikal.
 *
 * Solusi: Terapkan aturan pemanggilan eksplisit; hindari mengandalkan `this` global untuk logika bisnis.
 *
 * @see knowledge-base/05-coding-interview-v2/03-this-binding-call-apply-bind.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * Judul: Jumlahkan dengan `this.base` memakai `call`
 *
 * Soal test:
 * - `addWithThisCall(10, 1, 2)` harus `13`; argumen non-finite → `RangeError`.
 *
 * Ringkasan soal:
 * - Fungsi `function add(a,b) { return this.base + a + b }`.
 * - Panggil dengan `this = { base }` dan argumen `(a,b)` tanpa mengubah definisi fungsi.
 *
 * Kontrak:
 * - `base`, `a`, `b` harus bilangan (finite); jika tidak → `RangeError`.
 *
 * Solusi: `add.call({ base }, a, b)`.
 *
 * @param {number} base
 * @param {number} a
 * @param {number} b
 */
export function addWithThisCall(base, a, b) {
  if (![base, a, b].every((x) => typeof x === "number" && Number.isFinite(x))) {
    throw new RangeError("base, a, b must be finite numbers");
  }
  function add(x, y) {
    return this.base + x + y;
  }
  return add.call({ base }, a, b);
}

/**
 * Judul: Sama seperti `call`, argumen di `apply` sebagai array
 *
 * Soal test:
 * - `productWithThisApply(2, [2, 3]) === 12`; array kosong → `RangeError`.
 *
 * Ringkasan soal:
 * - Satu fungsi yang memakai `this.multiplier` dan menerima array angka.
 *
 * Kontrak: `multiplier` dan setiap elemen `numbers` finite number; array tidak kosong → `RangeError` jika invalid.
 *
 * Solusi: `fn.apply({ multiplier }, [numbers])` dengan fungsi yang mengiterasi `arguments` atau parameter rest.
 *
 * @param {number} multiplier
 * @param {number[]} numbers
 */
export function productWithThisApply(multiplier, numbers) {
  if (typeof multiplier !== "number" || !Number.isFinite(multiplier)) {
    throw new RangeError("multiplier must be a finite number");
  }
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new RangeError("numbers must be a non-empty array");
  }
  if (!numbers.every((n) => typeof n === "number" && Number.isFinite(n))) {
    throw new RangeError("every element must be a finite number");
  }
  function productAll(nums) {
    return nums.reduce((acc, n) => acc * n, this.multiplier);
  }
  return productAll.apply({ multiplier }, [numbers]);
}

/**
 * Judul: Method extraction — `this` hilang saat dipanggil sebagai fungsi bebas
 *
 * Soal test:
 * - Memanggil method yang dilepas tanpa receiver harus melempar `TypeError` (strict module).
 *
 * Ringkasan soal:
 * - Objek punya `getLabel()` yang mengembalikan `this.id`.
 * - Assign `const f = obj.getLabel` lalu panggil `f()` di strict mode (modul).
 *
 * Kontrak: tidak ada; memprediksi perilaku.
 *
 * Solusi: `f()` bukan pemanggilan metode → `this` adalah `undefined` → akses properti melempar `TypeError`.
 */
export function detachedMethodThrowsTypeError() {
  const obj = {
    id: 42,
    getLabel() {
      return this.id;
    },
  };
  const f = obj.getLabel;
  return f();
}

/**
 * Judul: Perbaiki method lepas dengan `bind`
 *
 * Soal test:
 * - `boundGetLabel(7)()` harus mengembalikan `7` (`this` terikat).
 *
 * Ringkasan soal:
 * - Sama seperti kasus lepas, tetapi kembalikan fungsi terikat ke `obj`.
 *
 * Kontrak: `id` bilangan bulat (untuk konteks demo).
 *
 * Solusi: `obj.getLabel.bind(obj)`.
 *
 * @param {number} id
 * @returns {() => number}
 */
export function boundGetLabel(id) {
  if (!Number.isInteger(id)) throw new RangeError("id must be an integer");
  const obj = {
    id,
    getLabel() {
      return this.id;
    },
  };
  return obj.getLabel.bind(obj);
}

/**
 * Judul: Arrow mengikat `this` leksikal dari pembungkus
 *
 * Soal test:
 * - `arrowGetterLexicalThis(99)()` harus `99` meski fungsi dipanggil tanpa receiver.
 *
 * Ringkasan soal:
 * - Konstruktor fungsi men-set `this.value = v` dan mengembalikan arrow `() => this.value`.
 * - Arrow dipanggil tanpa receiver; nilai tetap mengikuti instance.
 *
 * Kontrak: `v` finite number.
 *
 * Solusi: Arrow tidak punya `this` sendiri; menutup `this` dari pemanggilan `new`.
 *
 * @param {number} v
 * @returns {() => number}
 */
export function arrowGetterLexicalThis(v) {
  if (typeof v !== "number" || !Number.isFinite(v)) {
    throw new RangeError("v must be a finite number");
  }
  function Wrapper() {
    this.value = v;
    this.get = () => this.value;
  }
  const w = new Wrapper();
  const loose = w.get;
  return loose;
}
