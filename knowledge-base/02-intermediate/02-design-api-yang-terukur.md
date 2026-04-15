# Design API yang Terukur

## Core Idea (Feynman Concept Applied)

API itu seperti menu restoran. Kalau menunya rapi, pelanggan cepat paham dan dapur juga cepat bekerja.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- API terukur berarti kontrak endpoint stabil dan kualitasnya bisa dipantau.
- Endpoint harus konsisten dalam schema, status code, dan parameter.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: REST resource-first.
  - Kapan dipakai: CRUD inti.
  - Kelebihan: sederhana.
  - Keterbatasan: bisa verbose.
- Strategi 2: endpoint agregasi.
  - Kapan dipakai: kebutuhan dashboard.
  - Kelebihan: efisien untuk UI.
  - Keterbatasan: coupling ke use case tertentu.

### Risiko dan Pitfall
- Risiko 1: kontrak API berubah mendadak.
  - Gejala: client error setelah release.
  - Dampak: rollback.
  - Mitigasi: versioning + deprecation policy.
- Risiko 2: endpoint list tanpa pagination.
  - Gejala: response berat.
  - Dampak: latency naik.
  - Mitigasi: default page/limit.

### Pros dan Cons
- **Pros**
  - Integrasi lintas tim lebih cepat.
  - Performa dan kualitas lebih terukur.
- **Cons**
  - Perlu governance dokumen dan review API.
  - Evolusi API perlu disiplin.

### Trade-off Praktis di Produksi
- Fleksibilitas endpoint vs stabilitas kontrak.
- Kecepatan rilis vs backward compatibility.
- Keputusan berdasarkan p95, error rate, dan integrasi gagal.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: API transaksi dipakai web+mobile**
  - Kondisi: dua client berbeda.
  - Masalah tanpa strategi: schema sering berubah.
  - Solusi: contract standard + versioning.
  - Hasil yang diharapkan: rilis independen.
  - Catatan trade-off: maintenance versi meningkat.
- **Kasus 2: Endpoint laporan operasional**
  - Kondisi: data besar harian.
  - Masalah tanpa strategi: timeout.
  - Solusi: pagination + filter.
  - Hasil yang diharapkan: response stabil.
  - Catatan trade-off: query param lebih kompleks.

## Best Practices

- Gunakan format respons konsisten.
- Terapkan pagination default pada endpoint list.
- Versioning saat ada perubahan breaking.
- Dokumentasikan kontrak API dan deprecation timeline agar client siap migrasi.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
app.get("/transactions", (req, res) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 20);
  // balikan data + metadata pagination
  res.json({ data: [], meta: { page, limit, total: 0 } });
});
```

## Checklist Pemahaman

- [ ] Bisa mendesain endpoint list yang scalable.
- [ ] Tahu kapan perlu versioning API.
- [ ] Bisa menentukan schema error yang konsisten lintas endpoint.
- [ ] Bisa memilih kapan perlu endpoint agregasi khusus.

## Latihan Mandiri

- Latihan 1 (basic): Desain 3 endpoint untuk modul inventory return.
- Latihan 2 (intermediate): Tambahkan schema error standar untuk tiap endpoint.
- Latihan 3 (simulasi produksi): Buat rencana versioning dari v1 ke v2 tanpa memutus client lama.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: p95 latency, 4xx/5xx ratio.
- Metrik bisnis: API success rate per client.
- Ambang batas awal: 5xx < 0.5%.
