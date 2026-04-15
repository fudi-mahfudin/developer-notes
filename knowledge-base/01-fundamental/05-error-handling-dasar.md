# Error Handling Dasar

## Core Idea (Feynman Concept Applied)

Error handling itu seperti sabuk pengaman. Tujuannya bukan mencegah semua masalah, tapi memastikan saat masalah terjadi, dampaknya terkendali.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Error handling memisahkan error bisnis dan error sistem.
- `try/catch` dipakai untuk menangkap error sinkron/async.
- Mapping error ke HTTP status menjaga kontrak API tetap jelas.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: custom error class.
  - Kapan dipakai: validasi bisnis.
  - Kelebihan: mapping respons lebih rapih.
  - Keterbatasan: butuh standar lintas tim.
- Strategi 2: global error middleware.
  - Kapan dipakai: API production.
  - Kelebihan: konsisten di semua endpoint.
  - Keterbatasan: context error harus lengkap dari layer bawah.

### Risiko dan Pitfall
- Risiko 1: swallow error.
  - Gejala: error hilang tanpa jejak.
  - Dampak: RCA sulit.
  - Mitigasi: log terstruktur + rethrow yang tepat.
- Risiko 2: bocor detail internal.
  - Gejala: stack trace ke client.
  - Dampak: risiko keamanan.
  - Mitigasi: sanitasi pesan error ke user.

### Pros dan Cons
- **Pros**
  - Sistem lebih stabil.
  - UX error lebih jelas.
- **Cons**
  - Implementasi berlapis menambah boilerplate.
  - Butuh disiplin standar error code.

### Trade-off Praktis di Produksi
- Transparansi error user vs keamanan internal.
- Kecepatan implementasi vs konsistensi lintas service.
- Keputusan berdasarkan incident rate dan MTTR.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Gagal submit transaksi obat**
  - Kondisi: stok tidak cukup.
  - Masalah tanpa strategi: user hanya lihat "server error".
  - Solusi: custom business error + status 409.
  - Hasil yang diharapkan: user paham aksi lanjutan.
  - Catatan trade-off: error catalog harus terjaga.
- **Kasus 2: Integrasi pihak ketiga timeout**
  - Kondisi: dependency eksternal lambat.
  - Masalah tanpa strategi: error acak dan sulit ditelusuri.
  - Solusi: timeout + log ber-request-id.
  - Hasil yang diharapkan: troubleshooting lebih cepat.
  - Catatan trade-off: timeout terlalu pendek bisa false failure.

## Best Practices

- Jangan menelan error tanpa logging.
- Bedakan error user (4xx) dan error sistem (5xx).
- Gunakan message aman; jangan bocorkan detail internal ke client.
- Gunakan error code konsisten agar frontend dan monitoring mudah melakukan klasifikasi.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
class ValidationError extends Error {}

async function createPatient(input: { name?: string }) {
  try {
    if (!input.name) {
      throw new ValidationError("Nama wajib diisi");
    }
    // simulasi simpan data
    return { ok: true };
  } catch (err) {
    // log internal untuk debugging
    console.error("createPatient failed:", err);
    throw err; // lempar lagi agar layer atas bisa putuskan response
  }
}
```

## Checklist Pemahaman

- [ ] Bisa jelaskan kapan pakai custom error.
- [ ] Tahu cara handling error async.
- [ ] Tahu perbedaan logging internal vs pesan ke user.
- [ ] Bisa memetakan minimal 3 jenis error ke status code HTTP yang tepat.

## Latihan Mandiri

- Latihan 1 (basic): Buat dua custom error: `NotFoundError` dan `AuthError`.
- Latihan 2 (intermediate): Simulasikan mapping error ke status code HTTP.
- Latihan 3 (simulasi produksi): Buat global error handler Express dengan request-id, sanitasi message, dan format response standar.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: error rate per endpoint, MTTR.
- Metrik bisnis: kegagalan transaksi karena error non-bisnis.
- Ambang batas awal: 5xx endpoint kritikal < 0.5%.
