# Debouncing / throttling

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: kontrol frekuensi event

**Debounce**: jalankan setelah jeda tanpa event baru.  
**Throttle**: batasi maksimal sekali per interval.

### Mengapa dipedulikan di interview & produksi?

- Input/scroll/resize bisa menembakkan ratusan event.  
- Mengurangi beban render dan request berlebihan.  
- Meningkatkan responsivitas UI.

---

# Contoh soal coding: `debounce`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Medium  
- **Topik utama:** timer, closure  
- **Inti masalah:** Kembalikan fungsi yang menunda eksekusi hingga `wait` ms sejak panggilan terakhir.

---

- Soal: `debounce(fn, wait)` -> fungsi baru.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Simpan id timer di closure; setiap call `clearTimeout` timer lama lalu jadwalkan baru.

## 3) Versi Ultra Singkat (10-20 detik)

> `clearTimeout` lalu `setTimeout` ulang.

## 4) Pseudocode Ringkas (5-10 baris)

```text
debounce(fn, wait):
  t = null
  return (...args):
    clear t jika ada
    t = setTimeout(() => fn(...args), wait)
```

## 5) Implementasi Final (Inti Saja)

```js
export function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
```

## 6) Bukti Correctness (Wajib)

- Hanya timer terakhir yang bertahan.  
- `fn` dipanggil sekali setelah jeda stabil.

## 7) Dry Run Singkat

- Call cepat 3x dalam 100ms, `wait=200` -> `fn` dieksekusi sekali.

## 8) Red Flags (Yang Harus Dihindari)

- Lupa `clearTimeout`.  
- Kehilangan `this` jika dipakai sebagai method.

## 9) Follow-up yang Sering Muncul

- Leading/trailing options.  
- Cancel/flush method.

## 10) Trade-off Keputusan

- Debounce cocok search box; throttle cocok scroll progress.

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

- Implementasikan `throttle(fn, wait)` versi trailing sederhana.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
