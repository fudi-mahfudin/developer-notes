# Observability dari kode

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: log, metric, trace sebagai sinyal operasi

Observability memungkinkan kita menjawab "apa yang terjadi" di sistem produksi tanpa menebak.

### Mengapa dipedulikan di interview & produksi?

- Incident response lebih cepat.  
- Root cause analysis lebih terarah.  
- Menjadi dasar SLO/error budget.

---

# Contoh soal coding: `createRequestLogger`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Easy-Medium  
- **Topik utama:** structured logging  
- **Inti masalah:** Buat logger yang otomatis menyertakan `requestId`.

---

- Soal: `createRequestLogger(baseLogger, requestId)`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Bungkus logger asli dan tambahkan field tetap di setiap log event.

## 3) Versi Ultra Singkat (10-20 detik)

> Logger adapter menambahkan correlation id.

## 4) Pseudocode Ringkas (5-10 baris)

```text
return {
  info(msg, extra): base.info(msg, {requestId, ...extra})
  error(msg, extra): base.error(msg, {requestId, ...extra})
}
```

## 5) Implementasi Final (Inti Saja)

```js
export function createRequestLogger(baseLogger, requestId) {
  return {
    info(message, extra = {}) {
      baseLogger.info(message, { requestId, ...extra });
    },
    error(message, extra = {}) {
      baseLogger.error(message, { requestId, ...extra });
    },
  };
}
```

## 6) Bukti Correctness (Wajib)

- Semua log melalui wrapper selalu memiliki `requestId`.  
- Extra field tetap bisa ditambahkan caller.

## 7) Dry Run Singkat

- `logger.info('ok')` menghasilkan payload dengan `requestId`.

## 8) Red Flags (Yang Harus Dihindari)

- Log tanpa context id.  
- Log data sensitif mentah.

## 9) Follow-up yang Sering Muncul

- Integrasi tracing span id.  
- Metric counter per endpoint.

## 10) Trade-off Keputusan

- Log detail memudahkan debug, tapi menambah biaya storage.

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

- Tambahkan method `warn` dan field `service`.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
