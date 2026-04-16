# `eval` & `new Function`

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: eksekusi string sebagai kode

`eval` dan `new Function` mengeksekusi kode dari string. Keduanya berisiko tinggi untuk keamanan dan auditability.

### Mengapa dipedulikan di interview & produksi?

- Membuka permukaan serangan injeksi kode.  
- Sulit dioptimasi dan sulit dianalisis static tools.  
- Sering dilarang oleh CSP ketat.

---

# Contoh soal coding: `safeCalculator`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Easy-Medium  
- **Topik utama:** keamanan input  
- **Inti masalah:** Hitung ekspresi sederhana tanpa `eval`.

---

- Soal: `safeCalculator(a, op, b)` untuk `+ - * /`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Gunakan dispatch table operator, bukan eval string.

## 3) Versi Ultra Singkat (10-20 detik)

> Hindari `eval`; map operator ke fungsi.

## 4) Pseudocode Ringkas (5-10 baris)

```text
safeCalculator(a, op, b):
  map = {"+": add, "-": sub, "*": mul, "/": div}
  jika op tidak ada: throw
  return map[op](a,b)
```

## 5) Implementasi Final (Inti Saja)

```js
export function safeCalculator(a, op, b) {
  const ops = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };
  if (!ops[op]) throw new Error('operator tidak valid');
  return ops[op](a, b);
}
```

## 6) Bukti Correctness (Wajib)

- Hanya operator yang diizinkan dieksekusi.  
- Tidak ada parsing/eksekusi string kode.

## 7) Dry Run Singkat

- `safeCalculator(2, '+', 3)` -> `5`.

## 8) Red Flags (Yang Harus Dihindari)

- Sanitasi regex dangkal lalu tetap pakai eval.  
- Mengizinkan operator bebas dari input.

## 9) Follow-up yang Sering Muncul

- Parser expression kecil (shunting-yard).  
- CSP `unsafe-eval`.

## 10) Trade-off Keputusan

- Dispatch table sederhana dan aman untuk kasus terbatas.

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

## Template Drill Cepat (Isi < 2 Menit)

- Tambahkan `%` dan validasi pembagian nol.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
