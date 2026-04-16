# Array helpers

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: helper array modern yang sering keluar interview

Helper umum: `find`, `some`, `every`, `includes`, `flat`, `flatMap`, `at`, `toSorted`, `toSpliced` (engine modern).

### Mengapa dipedulikan di interview & produksi?

- Mengurangi loop manual dan bug index.  
- Membantu mengekspresikan intent (`some` vs `every`).  
- Beberapa helper punya perilaku mutasi/non-mutasi yang penting.

### Contoh cepat

```js
[1, 2, 3].find((x) => x > 1); // 2
[1, 2].every((x) => x > 0); // true
```

### Kesalahan umum

- Bingung `find` (nilai) vs `findIndex` (indeks).  
- Lupa `flat` default hanya satu level.

---

# Contoh soal coding: `firstMatchIndex` (find index aman)

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy  
- **Topik utama:** array traversal  
- **Inti masalah:** Temukan indeks elemen pertama yang memenuhi predicate.

---

- Soal: `firstMatchIndex(arr, predicate)`.  
- Input: array dan fungsi predicate.  
- Output: indeks pertama; `-1` jika tidak ada.  
- Constraints utama: berhenti secepat mungkin saat ketemu.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Gunakan `findIndex` karena API sudah sesuai kebutuhan dan short-circuit. O(n) waktu terburuk, O(1) ruang.

Struktur cepat:

- Observasi: ini persis spesifikasi `findIndex`.  
- Strategi: delegasi ke API standar.  
- Edge case: array kosong langsung `-1`.

## 3) Versi Ultra Singkat (10-20 detik)

> `return arr.findIndex(predicate)`.

## 4) Pseudocode Ringkas (5-10 baris)

```text
firstMatchIndex(arr, pred):
  untuk i dari 0..n-1:
    jika pred(arr[i]): return i
  return -1
```

## 5) Implementasi Final (Inti Saja)

```js
export function firstMatchIndex(arr, predicate) {
  return arr.findIndex(predicate);
}
```

## 6) Bukti Correctness (Wajib)

- `findIndex` memeriksa dari kiri ke kanan.  
- Mengembalikan `-1` saat tidak ada yang lolos.

## 7) Dry Run Singkat

- `firstMatchIndex([4, 5, 6], (x) => x > 4)` -> `1`.

## 8) Red Flags (Yang Harus Dihindari)

- Menggunakan `filter` lalu ambil pertama (lebih mahal).  
- Predicate punya side effect berat.

## 9) Follow-up yang Sering Muncul

- Follow-up 1: `findLastIndex` (engine modern).  
- Follow-up 2: `some` vs `every` untuk validasi.  
- Follow-up 3: non-mutating helpers `toSorted`.

## 10) Trade-off Keputusan

- Opsi A (`findIndex`): idiomatik.  
- Opsi B (loop manual): kontrol detail logging/debug.

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

## Template Drill Cepat (Isi < 2 Menit) - `allUnique`

- Tingkat kesulitan: Easy  
- Topik utama: `some`/`includes` vs `Set`  
- Inti masalah: cek apakah semua elemen unik.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
