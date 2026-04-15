# HTTP dan REST Dasar

## Core Idea (Feynman Concept Applied)

HTTP itu seperti layanan kurir: ada alamat, jenis paket, dan aturan kirim. REST adalah cara menata paket supaya pengirim dan penerima paham format yang sama.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- HTTP mendefinisikan cara client-server bertukar data.
- REST menggunakan resource sebagai pusat desain endpoint.
- Status code dan schema respons harus konsisten.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: endpoint resource murni.
  - Kapan dipakai: CRUD utama.
  - Kelebihan: mudah dipahami.
  - Keterbatasan: bisa verbose untuk agregasi kompleks.
- Strategi 2: endpoint agregasi terarah.
  - Kapan dipakai: dashboard/report.
  - Kelebihan: efisien untuk UI.
  - Keterbatasan: risiko coupling ke kebutuhan frontend tertentu.

### Risiko dan Pitfall
- Risiko 1: salah status code.
  - Gejala: client salah menangani error.
  - Dampak: retry tidak tepat.
  - Mitigasi: standard API response contract.
- Risiko 2: endpoint tanpa pagination.
  - Gejala: payload besar.
  - Dampak: latency naik.
  - Mitigasi: default page/limit.

### Pros dan Cons
- **Pros**
  - Interoperabilitas tinggi.
  - Tooling dan ekosistem matang.
- **Cons**
  - Konvensi berbeda antar tim bila governance lemah.
  - Overfetch/underfetch pada kebutuhan data kompleks.

### Trade-off Praktis di Produksi
- Fleksibilitas endpoint vs konsistensi jangka panjang.
- Response detail vs ukuran payload.
- Keputusan diambil dari latency, payload size, dan error handling quality.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Booking appointment**
  - Kondisi: user memilih slot dokter.
  - Masalah tanpa strategi: konflik slot tidak jelas.
  - Solusi: status 409 + pesan bisnis terstruktur.
  - Hasil yang diharapkan: user bisa pilih slot alternatif.
  - Catatan trade-off: butuh validasi backend kuat.
- **Kasus 2: Dashboard transaksi**
  - Kondisi: list data besar.
  - Masalah tanpa strategi: API berat.
  - Solusi: pagination + filter query param.
  - Hasil yang diharapkan: loading lebih cepat.
  - Catatan trade-off: butuh sinkronisasi state paging di frontend.

## Best Practices

- Gunakan kata benda untuk endpoint (`/patients`, bukan `/getPatients`).
- Buat response schema konsisten (misal selalu ada `data`/`error`).
- Gunakan status code yang tepat agar mudah debug.
- Terapkan pagination dan batas ukuran payload sejak awal untuk endpoint list.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
import express from "express";

const app = express();
app.use(express.json());

app.post("/patients", (req, res) => {
  // ambil data dari body request JSON
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  // simulasi create data
  return res.status(201).json({ data: { id: "p123", name } });
});
```

## Checklist Pemahaman

- [ ] Tahu kapan pakai `POST` vs `PUT/PATCH`.
- [ ] Tahu arti status code 4xx dan 5xx.
- [ ] Bisa desain endpoint resource-based sederhana.
- [ ] Bisa merancang format response yang konsisten untuk sukses dan error.

## Latihan Mandiri

- Latihan 1 (basic): Tambah endpoint `GET /patients/:id`.
- Latihan 2 (intermediate): Buat format response error yang konsisten.
- Latihan 3 (simulasi produksi): Rancang endpoint list dengan filter, sort, pagination, lalu definisikan status code untuk 3 skenario gagal (invalid query, unauthorized, server error).

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: p95 latency endpoint list, payload size.
- Metrik bisnis: completion rate booking.
- Ambang batas awal: p95 endpoint list < 500ms.
