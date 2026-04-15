# Checklist Code Review dan Production Readiness

## Code Review

- [ ] Nama variabel/fungsi jelas dan konsisten.
- [ ] Tidak ada `any` tanpa alasan jelas.
- [ ] Error handling ada di jalur kritikal.
- [ ] Tidak ada query/API call yang berpotensi N+1.
- [ ] Test untuk jalur sukses dan gagal tersedia.
- [ ] Logging punya konteks (request id, operation name).

## Production Readiness

- [ ] Endpoint kritikal memiliki timeout.
- [ ] Retry policy terdefinisi untuk dependency eksternal.
- [ ] Metrik minimum dipantau (latency, error rate, throughput).
- [ ] Alert dasar sudah aktif.
- [ ] Rollback plan tersedia.
- [ ] Runbook incident tersedia dan bisa diakses tim.

## Catatan Review Mingguan

- Temuan penting:
- Perbaikan prioritas:
- Risiko yang belum ditutup:
