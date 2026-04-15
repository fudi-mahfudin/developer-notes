# TypeScript Dasar dan Type Safety

## Core Idea (Feynman Concept Applied)

Kalau JavaScript itu menulis surat bebas, TypeScript itu menulis surat dengan template. Template membantu kamu tidak lupa isi penting dan mengurangi salah kirim.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- TypeScript menambahkan type system statis di atas JavaScript.
- Compiler memvalidasi kontrak data sebelum aplikasi dijalankan.
- Type safety mengurangi bug integrasi antar modul.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: strict typing di layer domain.
  - Kapan dipakai: model bisnis inti.
  - Kelebihan: kontrak data kuat.
  - Keterbatasan: butuh disiplin type design.
- Strategi 2: gradual typing untuk migrasi.
  - Kapan dipakai: project legacy.
  - Kelebihan: adopsi bertahap.
  - Keterbatasan: area `any` tetap berisiko.

### Risiko dan Pitfall
- Risiko 1: overuse `any`.
  - Gejala: error runtime tetap tinggi.
  - Dampak: manfaat TypeScript hilang.
  - Mitigasi: gunakan `unknown` + narrowing.
- Risiko 2: type terlalu kompleks.
  - Gejala: code sulit dibaca.
  - Dampak: onboarding lambat.
  - Mitigasi: prioritaskan tipe yang sederhana.

### Pros dan Cons
- **Pros**
  - Refactor lebih aman.
  - Dokumentasi kontrak otomatis lewat tipe.
- **Cons**
  - Setup awal lebih panjang.
  - Build/type-check menambah waktu CI.

### Trade-off Praktis di Produksi
- Kecepatan delivery vs kualitas kontrak tipe.
- Fleksibilitas cepat vs konsistensi jangka panjang.
- Keputusan diambil dari defect rate dan lead time tim.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Payload registrasi pasien**
  - Kondisi: banyak channel input data.
  - Masalah tanpa strategi: field mismatch.
  - Solusi: interface payload tunggal.
  - Hasil yang diharapkan: validasi lebih konsisten.
  - Catatan trade-off: perubahan schema butuh sinkronisasi.
- **Kasus 2: Integrasi billing**
  - Kondisi: data dari service berbeda format.
  - Masalah tanpa strategi: parsing error.
  - Solusi: type guard dan mapper terpusat.
  - Hasil yang diharapkan: error integrasi turun.
  - Catatan trade-off: ada effort mapping tambahan.

## Best Practices

- Aktifkan `strict` pada `tsconfig`.
- Gunakan `interface` untuk kontrak data API.
- Hindari `any`; pakai `unknown` lalu lakukan narrowing.
- Definisikan tipe return function agar intent jelas.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
interface UserPayload {
  id: string;
  email: string;
  age?: number; // optional property
}

function formatUser(user: UserPayload): string {
  // TypeScript memastikan field wajib tersedia
  return `${user.id} - ${user.email}`;
}

const payload: UserPayload = { id: "u1", email: "a@x.com" };
console.log(formatUser(payload));
```

## Checklist Pemahaman

- [ ] Tahu bedanya `interface` dan `type` secara praktis.
- [ ] Tahu kapan memakai union type.
- [ ] Tahu kenapa `any` sebaiknya dihindari.
- [ ] Bisa menulis type guard sederhana untuk `unknown`.

## Latihan Mandiri

- Latihan 1 (basic): Buat tipe untuk response API daftar pasien.
- Latihan 2 (intermediate): Tambah validasi sederhana untuk field optional.
- Latihan 3 (simulasi produksi): Buat mapper payload API eksternal ke tipe internal dengan error handling saat field tidak valid.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: compile error trend, runtime type bug.
- Metrik bisnis: defect pasca release.
- Ambang batas awal: runtime type bug turun tiap sprint.
