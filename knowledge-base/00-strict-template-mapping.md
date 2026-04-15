# Mapping Strict Template Knowledge Base

Dokumen ini adalah standar kualitas minimum agar semua materi di `knowledge-base` punya kedalaman penjelasan seperti `02-intermediate/07-caching-dan-rate-limiting.md`.

## Tujuan Standar

- Menjaga konsistensi struktur lintas semua materi.
- Memastikan tiap topik tidak hanya definisi, tapi juga menjawab cara kerja, risiko, trade-off, dan aplikasi bisnis nyata.
- Menjamin materi bisa dipakai untuk belajar harian, implementasi kerja, dan persiapan interview.

## Section Wajib per File

Setiap file **wajib** memiliki section berikut tanpa pengecualian:

1. `## Core Idea (Feynman Concept Applied)`
2. `## Penjelasan Detail Aspek Penting`
   - `### Konsep dan Mekanisme Inti`
   - `### Variasi/Strategi yang Umum Dipakai`
   - `### Risiko dan Pitfall`
   - `### Pros dan Cons`
   - `### Trade-off Praktis di Produksi`
   - `### Contoh Kasus Proses Bisnis Nyata`
3. `## Best Practices`
4. `## Contoh Praktis Ringkas (dengan komentar kode)`
5. `## Checklist Pemahaman`
6. `## Latihan Mandiri`
7. `## Catatan Metrik yang Perlu Dipantau (Opsional)`

## Standar Kualitas per Section

### 1) Core Idea
- Wajib pakai analogi sederhana.
- Maksimal 2-3 kalimat, mudah dipahami non-teknis.

### 2) Penjelasan Detail Aspek Penting
- **Konsep dan Mekanisme Inti**
  - Jelaskan apa, kenapa penting, dan bagaimana alurnya.
- **Variasi/Strategi yang Umum Dipakai**
  - Minimal 2 strategi.
  - Tiap strategi harus punya: kapan dipakai, kelebihan, keterbatasan.
- **Risiko dan Pitfall**
  - Minimal 2 risiko.
  - Tiap risiko harus punya: gejala, dampak, mitigasi.
- **Pros dan Cons**
  - Minimal 2 poin pros dan 2 poin cons.
- **Trade-off Praktis di Produksi**
  - Wajib jelaskan dilema nyata (mis. performa vs konsistensi).
  - Wajib ada cara pengambilan keputusan berbasis metrik.
- **Contoh Kasus Proses Bisnis Nyata**
  - Minimal 2 kasus.
  - Tiap kasus wajib punya: kondisi, masalah tanpa strategi, solusi, hasil yang diharapkan, catatan trade-off.

### 3) Best Practices
- Minimal 4 praktik yang bisa dieksekusi.
- Hindari tips yang terlalu umum dan tidak operasional.

### 4) Contoh Praktis Ringkas
- Kode harus relevan langsung dengan topik.
- Komentar wajib menjelaskan konteks, langkah inti, dan output.
- Hindari snippet terlalu abstrak.

### 5) Checklist Pemahaman
- Minimal 4 item checklist yang bisa diverifikasi sendiri.

### 6) Latihan Mandiri
- Wajib 3 level:
  - basic,
  - intermediate,
  - simulasi produksi.

### 7) Catatan Metrik
- Wajib ada 3 komponen:
  - metrik teknis,
  - metrik bisnis,
  - ambang batas awal.

## Aturan Bahasa dan Gaya

- Bahasa Indonesia, lugas, dan operasional.
- Hindari paragraf panjang tanpa struktur.
- Gunakan bullet bertingkat saat menjelaskan mekanisme.
- Gunakan istilah teknis seperlunya, lalu jelaskan maknanya.

## Aturan Konten Production

- Untuk materi observability/monitoring production:
  - APM sebagai pilar utama monitoring.
  - Logging sebagai pelengkap untuk konteks detail investigasi.
- Selalu jelaskan implikasi operasional (SLA/SLO, latency, error rate, reliability).

## Definisi "Lulus Strict"

File dianggap lulus strict jika:

- Semua section wajib ada.
- Semua sub-section detail terisi lengkap.
- Ada minimal 2 kasus bisnis nyata yang spesifik.
- Ada pros/cons, trade-off, dan metrik yang dapat dipantau.
- Kode contoh memiliki komentar penjelas, bukan hanya sintaks.
