# Structured clone

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: clone data kompleks dengan benar

`structuredClone` adalah API standar untuk menyalin banyak tipe data kompleks (`Map`, `Set`, `Date`, `ArrayBuffer`, dll.) tanpa trik JSON.

### Mengapa dipedulikan di interview & produksi?

- `JSON.parse(JSON.stringify(x))` merusak tipe tertentu.  
- Clone yang benar penting untuk immutability dan worker messaging.  
- Menjelaskan batas clone membantu desain data app.

### Contoh cepat

```js
const copy = structuredClone(original);
```

### Kesalahan umum

- Mengira fungsi bisa di-clone (tidak).  
- Mengabaikan biaya performa clone besar.

---

# Contoh soal coding: `deepCopySafe` (fallback clone)

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy-Medium  
- **Topik utama:** clone data  
- **Inti masalah:** Gunakan `structuredClone` jika tersedia; jika tidak, fallback terbatas.

---

- Soal: Implementasikan `deepCopySafe(value)`.  
- Input: nilai serializable standar.  
- Output: salinan dalam.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Cek ketersediaan `structuredClone`; jika ada, pakai langsung. Fallback JSON hanya untuk data sederhana. O(n) terhadap ukuran data.

Struktur cepat:

- Observasi: API native paling aman untuk tipe modern.  
- Strategi: guard fitur + fallback.  
- Edge case: fungsi/simbol tidak valid untuk JSON fallback.

## 3) Versi Ultra Singkat (10-20 detik)

> Prefer `structuredClone`; fallback JSON untuk lingkungan lama.

## 4) Pseudocode Ringkas (5-10 baris)

```text
deepCopySafe(v):
  jika structuredClone tersedia: return structuredClone(v)
  return JSON.parse(JSON.stringify(v))
```

## 5) Implementasi Final (Inti Saja)

```js
export function deepCopySafe(value) {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}
```

## 6) Bukti Correctness (Wajib)

- Di environment modern, perilaku mengikuti spesifikasi structured clone.  
- Fallback mempertahankan struktur JSON-valid.

## 7) Dry Run Singkat

- `deepCopySafe({ a: new Date() })` valid penuh hanya pada cabang `structuredClone`.

## 8) Red Flags (Yang Harus Dihindari)

- Mengandalkan fallback JSON untuk tipe kompleks penting.  
- Clone setiap render UI tanpa profiling.

## 9) Follow-up yang Sering Muncul

- Follow-up 1: transferables pada worker (`postMessage`).  
- Follow-up 2: shallow copy vs deep copy kapan cukup.  
- Follow-up 3: immutable update selective.

## 10) Trade-off Keputusan

- Opsi A (structuredClone): benar untuk banyak tipe.  
- Opsi B (JSON): kompatibel luas, tapi lossy.

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

## Template Drill Cepat (Isi < 2 Menit) - `cloneMap`

- Tingkat kesulitan: Easy  
- Topik utama: `Map` + clone  
- Inti masalah: kapan `new Map(oldMap)` cukup, kapan butuh deep clone nilai.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
