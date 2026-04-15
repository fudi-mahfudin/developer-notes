# Node.js Modules dan Package Management

## Core Idea (Feynman Concept Applied)

Module itu seperti laci terpisah untuk alat kerja. Daripada semua alat ditumpuk jadi satu, tiap laci punya fungsi sendiri. Package manager membantu mengambil dan mengatur alat dari luar.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Modularisasi membagi kode berdasarkan tanggung jawab.
- `package.json` mengatur script dan dependency.
- Pemisahan dependency runtime dan development penting untuk produksi.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: modular per domain.
  - Kapan dipakai: aplikasi menengah-besar.
  - Kelebihan: ownership jelas.
  - Keterbatasan: butuh arsitektur awal.
- Strategi 2: modular per layer.
  - Kapan dipakai: tim kecil/awal proyek.
  - Kelebihan: mudah dimulai.
  - Keterbatasan: bisa sulit scale jika domain bertambah.

### Risiko dan Pitfall
- Risiko 1: dependency sprawl.
  - Gejala: package terlalu banyak.
  - Dampak: build lambat, risiko keamanan.
  - Mitigasi: audit dependency berkala.
- Risiko 2: boundary modul kabur.
  - Gejala: circular dependency.
  - Dampak: maintenance sulit.
  - Mitigasi: tetapkan kontrak antarmodul.

### Pros dan Cons
- **Pros**
  - Kode lebih maintainable.
  - Testing dan refactor lebih aman.
- **Cons**
  - Struktur awal butuh disiplin.
  - Over-modularization bisa memperlambat tim.

### Trade-off Praktis di Produksi
- Kecepatan awal development vs maintainability jangka panjang.
- Reuse tinggi vs kompleksitas struktur.
- Keputusan dari lead time, defect rate, dan churn perubahan modul.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Perubahan aturan billing**
  - Kondisi: tarif berubah periodik.
  - Masalah tanpa strategi: banyak file terdampak.
  - Solusi: modul billing terpisah.
  - Hasil yang diharapkan: perubahan terlokalisasi.
  - Catatan trade-off: butuh kontrak API internal modul.
- **Kasus 2: Notifikasi lintas channel**
  - Kondisi: SMS/email/WA berkembang.
  - Masalah tanpa strategi: logic campur aduk.
  - Solusi: modul notification dengan adapter.
  - Hasil yang diharapkan: channel baru mudah ditambah.
  - Catatan trade-off: lapisan abstraksi bertambah.

## Best Practices

- Pisahkan module berdasarkan domain/fitur, bukan file besar campur.
- Kunci versi dependency yang stabil.
- Audit dependency secara berkala untuk keamanan.
- Gunakan script standar (`dev`, `build`, `test`).

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
// file: src/math.ts
export function add(a: number, b: number): number {
  return a + b;
}

// file: src/index.ts
import { add } from "./math.js";

console.log(add(2, 3)); // 5
```

## Checklist Pemahaman

- [ ] Tahu beda `dependencies` dan `devDependencies`.
- [ ] Bisa membuat module sederhana dengan `export/import`.
- [ ] Tahu kapan memilih ESM dan CommonJS.
- [ ] Paham dampak dependency berlebih terhadap keamanan dan performa build.

## Latihan Mandiri

- Latihan 1 (basic): Pisahkan service, controller, dan util ke module terpisah.
- Latihan 2 (intermediate): Tambahkan script `lint` dan `test` di `package.json`.
- Latihan 3 (simulasi produksi): Audit dependency project dummy, lalu kategorikan mana yang harus pindah ke `devDependencies` dan mana yang bisa dihapus.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: build time, dependency vulnerabilities.
- Metrik bisnis: waktu implementasi perubahan fitur.
- Ambang batas awal: vulnerability critical = 0.
