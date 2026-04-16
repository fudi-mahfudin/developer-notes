# Prototype chain

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: mencari properti di rantai

Setiap objek punya **internal slot** `[[Prototype]]` (diakses `Object.getPrototypeOf`). **Properti** dicari: objek, lalu prototype, sampai `null`.

**`instanceof`** mengecek apakah `Ctor.prototype` ada di rantai (dengan nuansa `Symbol.hasInstance`).

### Mengapa dipedulikan di interview & produksi?

- Memahami **lookup properti** menjelaskan perilaku `class`, mixin, dan `Object.create`.  
- Debug **instanceof** cross-realm atau library duplikat mengarah ke prototype chain.  
- Menjelaskan **komposisi** vs inheritance sering memakai diagram rantai ini.

### Contoh

```js
function C() {}
const o = new C();
Object.getPrototypeOf(o) === C.prototype; // true
o instanceof C; // true
```

### Kesalahan umum

- Assignment ke properti biasanya menambah di **instance**, bukan prototype.
- `Object.create(null)` tidak punya `Object.prototype` - hati-hati dengan `toString`.

---

# Contoh soal coding: `isPrototypeOfChain` (walk manual)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih pemahaman prototype tanpa `instanceof`. Struktur jawaban mengikuti template singkat coding test.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy-Medium
- **Topik utama:** prototype chain, `getPrototypeOf`
- **Inti masalah:** Tanpa `instanceof`, tentukan apakah `Ctor.prototype` ada di rantai `obj`.

---

- Soal: Implementasikan `isPrototypeOfChain(obj, Ctor)`.
- Input: `obj` sembarang object, `Ctor` fungsi konstruktor.
- Output: `true` jika `Ctor.prototype` ditemukan saat naik rantai.
- Constraints utama: henti di `null`.
- Pattern utama: loop `p = obj` lalu `Object.getPrototypeOf(p)`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Bandingkan setiap tautan prototype dengan `Ctor.prototype`. Waktu O(d) dengan d kedalaman rantai; ruang O(1).

Struktur cepat:

- Observasi: sama dengan intuisi `instanceof` untuk konstruktor biasa.
- Strategi: while `p != null`.
- Edge: `Ctor` arrow tanpa `prototype` - tidak menjadi fokus soal minimal.

## 3) Versi Ultra Singkat (10-20 detik)

> Naik `getPrototypeOf` sampai ketemu atau `null`.

## 4) Pseudocode Ringkas (5-10 baris)

```text
isPrototypeOfChain(obj, Ctor):
  target = Ctor.prototype
  p = obj
  while p != null:
    if p === target: return true
    p = Object.getPrototypeOf(p)
  return false
```

## 5) Implementasi Final (Inti Saja)

```js
export function isPrototypeOfChain(obj, Ctor) {
  const target = Ctor.prototype;
  let p = obj;
  while (p != null) {
    if (p === target) return true;
    p = Object.getPrototypeOf(p);
  }
  return false;
}
```

## 6) Bukti Correctness (Wajib)

- Setiap langkah memindahkan ke prototype berikutnya; tidak ada lompatan.
- Jika `target` tidak pernah sama, mengembalikan `false`.

## 7) Dry Run Singkat

- `isPrototypeOfChain(new Date(), Object)` mengembalikan `true`.

## 8) Red Flags (Yang Harus Dihindari)

- Memakai `obj.__proto__` langsung di kode baru - prefer `getPrototypeOf`.
- Mengabaikan `Symbol.hasInstance` - perilaku `instanceof` bisa berbeda di subclass kustom.

## 9) Follow-up yang Sering Muncul

- Follow-up 1: `Symbol.hasInstance` pada class.
- Follow-up 2: `Object.create(proto)` untuk prototipe manual.
- Follow-up 3: `instanceof` dan iframe - beberapa edge cross-realm.

## 10) Trade-off Keputusan

- Opsi A (manual walk): edukatif.
- Opsi B (`instanceof`): produksi biasanya cukup.

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

## Template Drill Cepat (Isi < 2 Menit) - diagram

- Tingkat kesulitan: Konsep
- Topik utama: prototype
- Inti masalah: gambar rantai `new Foo()` -> `Foo.prototype` -> `Object.prototype` -> `null`.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
