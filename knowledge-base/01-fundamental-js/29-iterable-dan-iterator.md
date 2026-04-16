# Iterable & iterator

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: protokol `for...of`

**Iterable** punya method `Symbol.iterator` yang mengembalikan **iterator** - objek dengan `next()` -> `{ value, done }`. **`for...of`** memakai protokol ini.

**Generator** `function*` adalah cara nyaman membuat iterable.

### Mengapa dipedulikan di interview & produksi?

- **Lazy** collection menghemat memori untuk rentang atau stream besar.  
- Banyak API modern (`Map`, `Set`, DOM) mengimplementasikan iterable.  
- Generator adalah jembatan ke **async generator** dan pola konsumsi bertahap.

### Contoh

```js
const iterable = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        if (i < 3) return { value: i++, done: false };
        return { value: undefined, done: true };
      },
    };
  },
};
```

### Kesalahan umum

- Iterator habis - tidak reset kecuali buat iterable baru.
- Iterable vs array-like - `Array.from` berbeda konteksnya.

---

# Contoh soal coding: `range` (iterable malas)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih `Symbol.iterator` tanpa materialize array penuh. Struktur jawaban mengikuti template singkat coding test.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy-Medium
- **Topik utama:** iterator, iterable, lazy evaluation
- **Inti masalah:** `range(start, end)` mengembalikan iterable integer `[start, end)` tanpa membuat array besar di awal.

---

- Soal: Implementasikan `range(start, end)`.
- Input: integer dengan `start <= end`.
- Output: object iterable; `for...of` mengeluarkan `start` sampai `end - 1`.
- Constraints utama: `end` eksklusif (seperti `slice`).
- Pattern utama: method `[Symbol.iterator]` yang mengembalikan iterator dengan state lokal `i`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Iterator menjaga indeks `i`; `next` mengembalikan value sampai `i < end`. Memori O(1) untuk state iterator; waktu O(k) untuk k elemen yang dikonsumsi.

Struktur cepat:

- Observasi: tidak mengalokasi array `[...]` untuk rentang besar.
- Strategi: closure `i` di iterator.
- Edge: `start === end` - iterator langsung `done: true`.

## 3) Versi Ultra Singkat (10-20 detik)

> `[Symbol.iterator]` + `next` dengan `i++`.

## 4) Pseudocode Ringkas (5-10 baris)

```text
range(start, end):
  return object dengan Symbol.iterator:
    return iterator:
      i = start
      next():
        jika i < end: return { value: i++, done: false }
        return { done: true }
```

## 5) Implementasi Final (Inti Saja)

```js
export function range(start, end) {
  return {
    [Symbol.iterator]() {
      let i = start;
      return {
        next() {
          if (i < end) {
            return { value: i++, done: false };
          }
          return { value: undefined, done: true };
        },
      };
    },
  };
}
```

## 6) Bukti Correctness (Wajib)

- Invariant: setelah k nilai, `i === start + k`.
- Tidak menghasilkan nilai setelah `end - 1`.

## 7) Dry Run Singkat

- `[...range(0, 3)]` sama dengan `[0, 1, 2]`.
- `for (const x of range(2, 2))` tidak beriterasi.

## 8) Red Flags (Yang Harus Dihindari)

- Mengembalikan array `Array.from({length})` - tidak lazy.
- Lupa `value` pada `done: true` (boleh `undefined`).

## 9) Follow-up yang Sering Muncul

- Follow-up 1: `function*` generator untuk `range`.
- Follow-up 2: `async function*` untuk stream async.
- Follow-up 3: iterator throw/return (generator penuh).

## 10) Trade-off Keputusan

- Opsi A (iterator manual): eksplisit.
- Opsi B (`function*`): lebih ringkas.

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

## Template Drill Cepat (Isi < 2 Menit) - generator

- Tingkat kesulitan: Easy
- Topik utama: generator
- Inti masalah: tulis `export function* rangeGen(start, end)` lalu bandingkan dengan iterable manual.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
