# Knowledge Base JS/TS Node (Bahasa Indonesia)

## Core Idea (Feynman Concept Applied)

Knowledge base ini adalah peta belajar bertahap: dari konsep dasar sampai praktik production. Tujuannya agar belajar tidak acak dan langsung bisa dipakai saat kerja.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Semua materi disusun bertingkat: Fundamental -> Intermediate -> Advanced -> Reference.
- Urutan belajar utama ada di `00-learning-path.md`.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: belajar harian 1 materi.
  - Kapan dipakai: persiapan terstruktur.
  - Kelebihan: konsisten.
  - Keterbatasan: butuh disiplin.
- Strategi 2: fokus topik prioritas.
  - Kapan dipakai: kebutuhan interview cepat.
  - Kelebihan: lebih cepat ke target.
  - Keterbatasan: fondasi bisa bolong.

### Risiko dan Pitfall
- Risiko 1: lompat topik terlalu cepat.
  - Gejala: paham istilah, tidak paham implementasi.
  - Dampak: sulit saat technical interview.
  - Mitigasi: ikuti learning path berurutan.
- Risiko 2: belajar teori tanpa praktik.
  - Gejala: sulit mengerjakan kasus nyata.
  - Dampak: skill tidak transferable ke pekerjaan.
  - Mitigasi: wajib kerjakan checklist + latihan.

### Pros dan Cons
- **Pros**
  - Struktur belajar jelas.
  - Materi siap pakai untuk kerja dan interview.
- **Cons**
  - Waktu adaptasi awal lebih lama.
  - Perlu review rutin agar tidak lupa.

### Trade-off Praktis di Produksi
- Kecepatan belajar vs kedalaman pemahaman.
- Cakupan luas vs fokus topik kritikal.
- Keputusan berdasarkan target role dan timeline belajar.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Persiapan interview senior full stack**
  - Kondisi: waktu terbatas 8-12 minggu.
  - Masalah tanpa struktur: belajar acak.
  - Solusi: jalankan learning path dan log harian.
  - Hasil yang diharapkan: progres terukur.
  - Catatan trade-off: beberapa topik advanced mungkin dipelajari bertahap.
- **Kasus 2: Kebutuhan debugging incident produksi**
  - Kondisi: perlu memahami observability dan reliability cepat.
  - Masalah tanpa roadmap: konteks tercecer.
  - Solusi: fokus intermediate/advanced terkait incident.
  - Hasil yang diharapkan: respon insiden lebih baik.
  - Catatan trade-off: materi fundamental tetap perlu ditinjau ulang.

## Best Practices

- Ikuti `00-learning-path.md` sebagai jalur utama.
- Dokumentasikan progres di `04-reference/template-belajar-harian.md`.
- Latih ulang topik yang checklist-nya belum terpenuhi.
- Hubungkan setiap topik ke kasus bisnis nyata.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
// 1) Tujuan contoh: melacak progres belajar harian
const progress = { day: 1, topic: "event-loop", done: false };

// 2) Konfigurasi/aturan sederhana
const canMoveNext = (item: typeof progress) => item.done;

// 3) Implementasi inti
console.log(canMoveNext(progress) ? "Lanjut topik berikutnya" : "Ulangi materi");

// 4) Edge case: materi belum dipahami, jangan lompat

// 5) Output: status keputusan belajar harian
```

## Checklist Pemahaman

- [ ] Saya paham urutan belajar yang direkomendasikan.
- [ ] Saya tahu dokumen mana untuk latihan harian.
- [ ] Saya tahu cara memilih fokus materi sesuai kebutuhan.
- [ ] Saya bisa mengaitkan materi dengan kasus kerja nyata.

## Latihan Mandiri

- Latihan 1 (basic): pilih 5 topik pertama dan jadwalkan mingguan.
- Latihan 2 (intermediate): hubungkan tiap topik ke 1 kasus bisnis.
- Latihan 3 (simulasi produksi): buat review mingguan berbasis metrik belajar.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: jumlah materi selesai, skor checklist.
- Metrik bisnis: kesiapan interview/implementasi kerja.
- Ambang batas awal: minimal 5 sesi belajar per minggu.
