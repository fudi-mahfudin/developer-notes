# Profiling mindset

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: ukur dulu, jangan tebak

Profiling berarti mengumpulkan bukti performa (CPU, memory, network) sebelum optimasi.

### Mengapa dipedulikan di interview & produksi?

- Optimasi tanpa data sering salah sasaran.  
- Membantu memprioritaskan bottleneck paling berdampak.  
- Mencegah micro-optimization yang tidak perlu.

---

# Contoh soal coding: `timeIt`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Easy  
- **Topik utama:** benchmarking sederhana  
- **Inti masalah:** Ukur durasi eksekusi fungsi sinkron.

---

- Soal: `timeIt(fn)` -> `{ result, ms }`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Ambil timestamp sebelum dan sesudah menjalankan fungsi, lalu hitung selisih.

## 3) Versi Ultra Singkat (10-20 detik)

> `start = performance.now(); ... end-start`.

## 4) Pseudocode Ringkas (5-10 baris)

```text
timeIt(fn):
  start = now()
  result = fn()
  end = now()
  return { result, ms: end-start }
```

## 5) Implementasi Final (Inti Saja)

```js
export function timeIt(fn) {
  const now = typeof performance !== 'undefined' ? performance.now.bind(performance) : Date.now;
  const start = now();
  const result = fn();
  const end = now();
  return { result, ms: end - start };
}
```

## 6) Bukti Correctness (Wajib)

- Durasi dihitung dari eksekusi yang sama.  
- Return function tetap tersedia di `result`.

## 7) Dry Run Singkat

- `timeIt(() => 1 + 1)` memberi `result=2`, `ms>=0`.

## 8) Red Flags (Yang Harus Dihindari)

- Membandingkan hasil benchmark satu kali run.  
- Mengabaikan warm-up/JIT.

## 9) Follow-up yang Sering Muncul

- Profiling async.  
- Flame graph interpretation.

## 10) Trade-off Keputusan

- Wrapper sederhana cepat dipakai, tapi bukan profiler penuh.

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

- Uji dua implementasi `sum` dalam loop 10_000 kali dan bandingkan median.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
