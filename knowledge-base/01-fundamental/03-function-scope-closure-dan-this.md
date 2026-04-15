# Function, Scope, Closure, dan this

## Core Idea (Feynman Concept Applied)

Scope itu seperti ruangan. Barang di ruangan A tidak otomatis terlihat di ruangan B. Closure itu seperti tas yang dibawa keluar ruangan, jadi isi variabel lama masih bisa dipakai. `this` itu menunjuk “siapa pemilik konteks saat ini”.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Scope mengatur visibilitas variabel.
- Closure menyimpan akses ke variabel luar.
- `this` ditentukan dari konteks pemanggilan function.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: closure untuk state kecil.
  - Kapan dipakai: counter/limiter/session helper.
  - Kelebihan: sederhana.
  - Keterbatasan: rawan memory leak jika salah pakai.
- Strategi 2: arrow function untuk callback.
  - Kapan dipakai: handler async/UI callback.
  - Kelebihan: konteks `this` stabil.
  - Keterbatasan: tidak cocok untuk semua method object.

### Risiko dan Pitfall
- Risiko 1: salah paham `this`.
  - Gejala: akses properti `undefined`.
  - Dampak: bug runtime.
  - Mitigasi: konsisten gunakan arrow/bind.
- Risiko 2: closure menahan data besar.
  - Gejala: memori naik.
  - Dampak: performa turun.
  - Mitigasi: batasi data yang di-capture.

### Pros dan Cons
- **Pros**
  - Enkapsulasi state ringan.
  - Struktur kode lebih modular.
- **Cons**
  - Sulit dipahami jika nested function berlebihan.
  - Bug konteks `this` sering terjadi.

### Trade-off Praktis di Produksi
- Fleksibilitas closure vs risiko memori.
- Kode ringkas vs keterbacaan tim.
- Keputusan dari profil memori dan bug trend.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Rule validasi per cabang**
  - Kondisi: aturan berbeda tiap cabang.
  - Masalah tanpa strategi: rule tercampur.
  - Solusi: closure `createValidator`.
  - Hasil yang diharapkan: validasi konsisten.
  - Catatan trade-off: perlu lifecycle jelas.
- **Kasus 2: Callback notifikasi**
  - Kondisi: handler async memakai context object.
  - Masalah tanpa strategi: `this` hilang.
  - Solusi: arrow function.
  - Hasil yang diharapkan: handler stabil.
  - Catatan trade-off: style code harus konsisten.

## Best Practices

- Utamakan `const` dan `let`, hindari `var`.
- Pakai closure untuk enkapsulasi state sederhana.
- Gunakan arrow function untuk callback agar `this` konsisten.
- Hindari nested function berlebihan agar alur scope tetap mudah dibaca.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
function createCounter() {
  let count = 0; // variabel di scope luar

  return function increment() {
    // closure: function ini tetap bisa akses count
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

## Checklist Pemahaman

- [ ] Bisa jelaskan closure dengan contoh sendiri.
- [ ] Tahu beda `var` vs `let/const`.
- [ ] Tahu kapan `this` berubah.
- [ ] Bisa menjelaskan risiko memory leak dari closure yang menangkap data besar.

## Latihan Mandiri

- Latihan 1 (basic): Buat `createLimiter(max)` dengan closure.
- Latihan 2 (intermediate): Coba versi function biasa vs arrow function, lalu bandingkan `this`.
- Latihan 3 (simulasi produksi): Implementasi helper validasi form multi-tenant dengan closure, lalu ukur apakah ada growth memori saat dipakai berulang.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: memory growth, runtime error terkait context.
- Metrik bisnis: error form submission.
- Ambang batas awal: tidak ada spike memory abnormal per release.
