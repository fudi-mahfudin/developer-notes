# `class` & `extends`

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: sintaks class di atas prototype

**`class`** adalah sintaks di atas **prototype** - `constructor`, method di prototype, `extends` untuk inheritance. **`super`** memanggil parent constructor atau method.

### Mengapa dipedulikan di interview & produksi?

- Pola **OOP** tetap umum di framework dan domain model.  
- Aturan **`super()`** dan warisan prototype adalah sumber error klasik junior.  
- Membedakan **method field** vs **method prototype** memengaruhi memori dan `this`.

### Contoh

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
}
class Dog extends Animal {
  speak() {
    return `${this.name} barks`;
  }
}
```

### Kesalahan umum

- Lupa **`super()`** di subclass constructor sebelum akses `this`.
- Method field arrow = properti instance, bukan di prototype - beda memori.

---

# Contoh soal coding: `Rectangle` (extends `Shape`)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih `extends` dan `super`. Struktur jawaban mengikuti template singkat coding test.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy
- **Topik utama:** class, inheritance, `super`
- **Inti masalah:** Subclass menyimpan dimensi dan menghitung luas; parent menyimpan nama.

---

- Soal: Definisikan `Shape` dan `Rectangle`; `Rectangle` extends `Shape`.
- Input: constructor `Rectangle(name, width, height)`.
- Output: `area()` mengembalikan `width * height`.
- Constraints utama: panggil `super(name)` sebelum pakai `this`.
- Pattern utama: `class` + `extends` + method instance.

## 2) Jawaban Ideal Singkat (30-60 detik)

> `Rectangle` memanggil `super(name)`; `area` mengalikan dimensi. Tidak ada algoritma berat - fokus aturan `super` dan prototype chain.

Struktur cepat:

- Observasi: tanpa `super()` di subclass, akses `this` melempar.
- Strategi: field dimensi di subclass, nama di parent.
- Edge: dimensi 0 atau negatif - tidak didefinisikan di soal minimal.

## 3) Versi Ultra Singkat (10-20 detik)

> `extends` + `super(name)` + `area()`.

## 4) Pseudocode Ringkas (5-10 baris)

```text
class Shape(name): this.name = name
class Rectangle(name, w, h): super(name); this.width = w; this.height = h
area(): return width * height
```

## 5) Implementasi Final (Inti Saja)

```js
export class Shape {
  constructor(name) {
    this.name = name;
  }
}

export class Rectangle extends Shape {
  constructor(name, width, height) {
    super(name);
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}
```

## 6) Bukti Correctness (Wajib)

- `Object.getPrototypeOf(Rectangle.prototype) === Shape.prototype`.
- `area` hanya memakai field yang di-set di constructor.

## 7) Dry Run Singkat

- `new Rectangle('x', 2, 5).area()` mengembalikan `10`.

## 8) Red Flags (Yang Harus Dihindari)

- Mengakses `this` sebelum `super()`.
- Menyalin method `area` ke instance dengan arrow tanpa perlu.

## 9) Follow-up yang Sering Muncul

- Follow-up 1: `static` method di class.
- Follow-up 2: private fields `#` di subclass.
- Follow-up 3: `Object.setPrototypeOf` vs `extends` (jangan di produksi sembarangan).

## 10) Trade-off Keputusan

- Opsi A (`class`): ergonomi dan subclass jelas.
- Opsi B (factory + delegation): tanpa `new`.

## 11) Checklist Siap Submit

- [ ] Solusi lolos contoh soal.
- [ ] Kompleksitas disebutkan jelas.
- [ ] Edge case minimum sudah dicek.
- [ ] Nama variabel jelas dan tidak ambigu.
- [ ] Tidak ada mutasi input yang tidak perlu.
- [ ] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 1-10
- Efisiensi: 1-10
- Kejelasan penjelasan: 1-10
- Kerapihan implementasi: 1-10
- Catatan perbaikan:

---

## Template Drill Cepat (Isi < 2 Menit) - `Square`

- Tingkat kesulitan: Easy
- Topik utama: extends
- Inti masalah: `class Square extends Rectangle` dengan satu sisi `s` - panggil `super(name, s, s)`.
- 1 potensi bug: lupa mewarisi constructor args.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
