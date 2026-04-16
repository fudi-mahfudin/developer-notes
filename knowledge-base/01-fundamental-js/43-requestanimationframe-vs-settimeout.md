# `requestAnimationFrame` vs `setTimeout`

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: scheduler untuk tujuan berbeda

`requestAnimationFrame` (rAF) sinkron dengan frame rendering browser. `setTimeout` adalah timer umum berbasis delay.

### Mengapa dipedulikan di interview & produksi?

- Animasi halus sebaiknya pakai rAF.  
- Timer untuk bisnis logic tetap cocok pakai `setTimeout`.  
- Mengurangi jank saat UI padat.

---

# Contoh soal coding: `nextFrame`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Easy  
- **Topik utama:** scheduler browser  
- **Inti masalah:** Kembalikan Promise yang resolve di frame berikutnya.

---

- Soal: `nextFrame()` -> `Promise<number>` timestamp frame.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Bungkus `requestAnimationFrame` dalam Promise.

## 3) Versi Ultra Singkat (10-20 detik)

> `new Promise((r)=>requestAnimationFrame(r))`.

## 4) Pseudocode Ringkas (5-10 baris)

```text
nextFrame():
  return Promise baru
    requestAnimationFrame(ts => resolve(ts))
```

## 5) Implementasi Final (Inti Saja)

```js
export function nextFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });
}
```

## 6) Bukti Correctness (Wajib)

- Callback rAF dipanggil sebelum repaint berikutnya.  
- Promise resolve satu kali.

## 7) Dry Run Singkat

- `await nextFrame()` memberi timestamp numerik.

## 8) Red Flags (Yang Harus Dihindari)

- Pakai `setTimeout(16)` untuk animasi kompleks.  
- Mengabaikan tab background throttling.

## 9) Follow-up yang Sering Muncul

- Cancel rAF.  
- Perbedaan time origin dengan `performance.now`.

## 10) Trade-off Keputusan

- rAF akurat untuk visual; setTimeout fleksibel non-visual.

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

- Tulis loop animasi sederhana `animate(step)` dengan rAF dan `cancelAnimationFrame`.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
