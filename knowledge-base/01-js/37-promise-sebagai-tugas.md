# Promise sebagai tugas

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: satu promise mewakili satu pekerjaan async

Promise bisa dipandang sebagai "task handle": pending, fulfilled, rejected.

### Mengapa dipedulikan di interview & produksi?

- Menentukan lifecycle operasi async dengan jelas.  
- Memudahkan komposisi `all`, `race`, `allSettled`.  
- Mencegah callback hell.

---

# Contoh soal coding: `createTask`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Medium  
- **Topik utama:** Promise factory  
- **Inti masalah:** Bungkus executor async agar bisa dijalankan sekali dan dibaca status akhirnya.

---

- Soal: `createTask(run)` mengembalikan `{ start, promise }`.  
- `start` menjalankan `run` sekali.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Simpan promise di closure; `start` menginisialisasi jika belum ada. Pattern mirip lazy singleton.

## 3) Versi Ultra Singkat (10-20 detik)

> `start` idempoten, `promise` shared.

## 4) Pseudocode Ringkas (5-10 baris)

```text
createTask(run):
  p = undefined
  start():
    jika p kosong: p = Promise.resolve().then(run)
    return p
```

## 5) Implementasi Final (Inti Saja)

```js
export function createTask(run) {
  let p;
  return {
    start() {
      if (!p) p = Promise.resolve().then(run);
      return p;
    },
    get promise() {
      return p;
    },
  };
}
```

## 6) Bukti Correctness (Wajib)

- `run` hanya dipanggil sekali setelah `start` pertama.  
- Panggilan `start` berikutnya share promise sama.

## 7) Dry Run Singkat

- Dua kali `start()` paralel tetap satu eksekusi.

## 8) Red Flags (Yang Harus Dihindari)

- Membuat promise baru tiap call.  
- Tidak menangani rejection.

## 9) Follow-up yang Sering Muncul

- Retry policy setelah reject.  
- Cancellation dengan `AbortController`.

## 10) Trade-off Keputusan

- Shared promise efisien, tapi butuh kebijakan reset.

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

- Tambahkan `reset()` agar task bisa dijalankan ulang.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
