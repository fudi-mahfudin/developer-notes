/**
 * Judul: Topik 4 — Prototype chain dan `class`
 *
 * Soal test:
 * - `Dog`/`Species`: `instanceof`, `describe()`, validasi string kosong → `RangeError`; rantai prototipe.
 *
 * Ringkasan soal:
 * - Pewarisan `extends` / `super`.
 * - Rantai prototipe dan `instanceof`.
 * - Method di prototype vs properti instance.
 *
 * Solusi: `class` adalah sintaksis di atas prototipe; `super()` di konstruktor turunan mendelegasi ke parent.
 *
 * @see knowledge-base/05-coding-interview-v2/04-prototype-chain-class.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * Judul: Pewarisan sederhana — `Species` dan `Dog`
 *
 * Soal test:
 * - `new Dog("Rex","lab").describe()` → `"Rex is a lab"`; nama/breed kosong → `RangeError`.
 *
 * Ringkasan soal:
 * - Kelas dasar menyimpan `name`; kelas turunan menambah `breed` dan `describe()`.
 * - `describe` memakai field instance (nama + breed).
 *
 * Kontrak:
 * - `name` dan `breed` string non-kosong; jika tidak → `RangeError`.
 *
 * Solusi: `Dog` memanggil `super(name)` lalu men-set `breed`; method pada `Dog.prototype`.
 */
export class Species {
  /**
   * @param {string} name
   */
  constructor(name) {
    if (typeof name !== "string" || name.length === 0) {
      throw new RangeError("name must be a non-empty string");
    }
    this.name = name;
  }
}

export class Dog extends Species {
  /**
   * @param {string} name
   * @param {string} breed
   */
  constructor(name, breed) {
    if (typeof breed !== "string" || breed.length === 0) {
      throw new RangeError("breed must be a non-empty string");
    }
    super(name);
    this.breed = breed;
  }

  describe() {
    return `${this.name} is a ${this.breed}`;
  }
}

/**
 * Judul: Rantai prototipe — daftar label konstruktor dari objek ke atas
 *
 * Soal test:
 * - Untuk instance `Dog`: `["Dog","Species","Object"]`; argumen `null` → `TypeError`.
 *
 * Ringkasan soal:
 * - Dari instance, kumpulkan `constructor.name` untuk tiap tautan `Object.getPrototypeOf` sampai `null`.
 *
 * Kontrak: `obj` harus object; jika tidak → `TypeError`.
 *
 * Solusi: Iterasi `getPrototypeOf` — urutan dari instance langsung lalu naik.
 *
 * @param {object} obj
 * @returns {string[]}
 */
export function getConstructorChainLabels(obj) {
  if (obj === null || typeof obj !== "object") {
    throw new TypeError("obj must be a non-null object");
  }
  const out = [];
  let cur = Object.getPrototypeOf(obj);
  while (cur !== null) {
    const ctor = cur.constructor;
    out.push(ctor && ctor.name ? ctor.name : "Object");
    cur = Object.getPrototypeOf(cur);
  }
  return out;
}
