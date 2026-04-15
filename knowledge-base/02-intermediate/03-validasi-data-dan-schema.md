# Validasi Data dan Schema

## Core Idea (Feynman Concept Applied)

Validasi itu seperti petugas pintu: hanya data yang memenuhi aturan yang boleh masuk.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Validasi memastikan input aman dan sesuai kontrak.
- Schema menjadi sumber kebenaran payload API.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: request-layer validation.
  - Kapan dipakai: semua endpoint.
  - Kelebihan: cepat menolak input invalid.
  - Keterbatasan: belum mencakup rule bisnis.
- Strategi 2: multi-layer validation.
  - Kapan dipakai: domain kritikal.
  - Kelebihan: kualitas data tinggi.
  - Keterbatasan: implementasi lebih panjang.

### Risiko dan Pitfall
- Risiko 1: rule hanya di frontend.
  - Gejala: data invalid tetap masuk backend.
  - Dampak: data corruption.
  - Mitigasi: validasi server-side wajib.
- Risiko 2: pesan error tidak konsisten.
  - Gejala: UX membingungkan.
  - Dampak: retry gagal berulang.
  - Mitigasi: standar error schema.

### Pros dan Cons
- **Pros**
  - Data lebih bersih dan konsisten.
  - Bug integrasi turun.
- **Cons**
  - Butuh sinkronisasi rule lintas layer.
  - Bisa menambah latency jika berlebihan.

### Trade-off Praktis di Produksi
- Ketatnya validasi vs kecepatan onboarding fitur.
- Rule bisnis lengkap vs kompleksitas maintenance.
- Keputusan berdasar validation failure rate dan data quality issue.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Appointment booking**
  - Kondisi: input dari beberapa channel.
  - Masalah tanpa strategi: slot bentrok.
  - Solusi: schema + rule slot check.
  - Hasil yang diharapkan: jadwal valid.
  - Catatan trade-off: query validasi bertambah.
- **Kasus 2: Input inventory retur**
  - Kondisi: operator memasukkan batch data.
  - Masalah tanpa strategi: SKU tidak valid.
  - Solusi: validasi format + referensi master data.
  - Hasil yang diharapkan: data retur akurat.
  - Catatan trade-off: error feedback harus jelas.

## Best Practices

- Jangan percaya data dari client.
- Kembalikan pesan error yang jelas namun aman.
- Simpan schema di tempat terpusat agar reuse tinggi.
- Sinkronkan validasi di request layer dan rule bisnis agar tidak saling bertentangan.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().positive().optional(),
});

const parsed = createSchema.safeParse({ name: "A" });
if (!parsed.success) console.log(parsed.error.flatten());
```

## Checklist Pemahaman

- [ ] Tahu perbedaan validasi sintaks vs validasi bisnis.
- [ ] Bisa membuat schema input endpoint.
- [ ] Bisa menentukan validasi mana yang wajib di service layer.
- [ ] Bisa membuat format error validasi yang konsisten.

## Latihan Mandiri

- Latihan 1 (basic): Buat schema untuk payload create transaction.
- Latihan 2 (intermediate): Tambahkan validasi rule bisnis sederhana (misalnya limit nominal).
- Latihan 3 (simulasi produksi): Rancang alur validasi berlapis (request, service, database) untuk endpoint booking.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: validation error rate.
- Metrik bisnis: data correction ticket per minggu.
- Ambang batas awal: invalid payload turun per sprint.
