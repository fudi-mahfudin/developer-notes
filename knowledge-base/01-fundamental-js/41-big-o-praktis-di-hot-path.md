# Big-O praktis di hot path

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: kompleksitas yang terasa di produksi

Big-O jadi kritikal di hot path (kode yang sering dijalankan atau data besar).

### Mengapa dipedulikan di interview & produksi?

- O(n^2) pada data kecil mungkin aman, tapi meledak saat skala naik.  
- Pemilihan struktur data (`Set`, `Map`) sering memberi lompatan besar.  
- Membantu bicara trade-off performa dengan jelas.

---

# Contoh soal coding: `hasIntersection`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Easy-Medium  
- **Topik utama:** kompleksitas, `Set`  
- **Inti masalah:** Cek apakah dua array punya elemen irisan.

---

- Soal: `hasIntersection(a, b)` -> boolean.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Buat `Set` dari array kecil, lalu scan array lain. Kompleksitas O(n+m), lebih baik dari nested loop O(n*m).

## 3) Versi Ultra Singkat (10-20 detik)

> `Set` + satu scan.

## 4) Pseudocode Ringkas (5-10 baris)

```text
hasIntersection(a,b):
  set = Set dari array lebih kecil
  untuk x di array lain:
    jika set.has(x): return true
  return false
```

## 5) Implementasi Final (Inti Saja)

```js
export function hasIntersection(a, b) {
  const [small, large] = a.length <= b.length ? [a, b] : [b, a];
  const set = new Set(small);
  return large.some((x) => set.has(x));
}
```

## 6) Bukti Correctness (Wajib)

- Jika ada elemen sama, `some` akan menemukan dan berhenti.  
- Jika tidak ada, semua elemen dicek lalu `false`.

## 7) Dry Run Singkat

- `[1,2]` dan `[3,2]` -> `true`.

## 8) Red Flags (Yang Harus Dihindari)

- Nested loop di hot path.  
- Sort kedua array padahal hanya butuh boolean.

## 9) Follow-up yang Sering Muncul

- Hitung semua irisan unik.  
- Skala memory vs CPU.

## 10) Trade-off Keputusan

- Opsi Set cepat, tapi butuh memori tambahan O(min(n,m)).

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

- Refactor fungsi dedup dari O(n^2) ke O(n) dengan `Set`.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
