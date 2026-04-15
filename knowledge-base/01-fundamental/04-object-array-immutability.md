# Object, Array, dan Immutability

## Core Idea (Feynman Concept Applied)

Immutability itu seperti fotokopi dokumen. Kalau mau revisi, kamu edit salinannya, bukan dokumen asli. Ini mencegah perubahan tak sengaja.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Object/array adalah reference type.
- Immutability berarti update melalui salinan data.
- Teknik inti: spread, map/filter, object merge.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: shallow copy.
  - Kapan dipakai: object datar.
  - Kelebihan: cepat dan sederhana.
  - Keterbatasan: nested object belum aman.
- Strategi 2: normalized state update.
  - Kapan dipakai: data kompleks besar.
  - Kelebihan: update lebih efisien.
  - Keterbatasan: desain state lebih rumit.

### Risiko dan Pitfall
- Risiko 1: mutasi tidak sengaja.
  - Gejala: state berubah misterius.
  - Dampak: bug sulit direproduksi.
  - Mitigasi: linting dan helper update immutable.
- Risiko 2: copy berlebihan.
  - Gejala: CPU/memori naik.
  - Dampak: UI lag.
  - Mitigasi: desain struktur data yang efisien.

### Pros dan Cons
- **Pros**
  - Perubahan state lebih prediktif.
  - Debugging dan audit lebih mudah.
- **Cons**
  - Overhead performa pada data besar.
  - Perlu disiplin coding tim.

### Trade-off Praktis di Produksi
- Kejelasan perubahan data vs biaya copy.
- Struktur sederhana vs skala data besar.
- Keputusan dari render time dan memory usage.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Update status antrean pasien**
  - Kondisi: status berubah cepat.
  - Masalah tanpa strategi: UI tidak sinkron.
  - Solusi: immutable update per item.
  - Hasil yang diharapkan: render konsisten.
  - Catatan trade-off: ada biaya copy objek.
- **Kasus 2: Riwayat transaksi**
  - Kondisi: list data panjang.
  - Masalah tanpa strategi: update lambat.
  - Solusi: normalized state + update terarah.
  - Hasil yang diharapkan: performa lebih stabil.
  - Catatan trade-off: kompleksitas desain naik.

## Best Practices

- Hindari mutasi langsung pada state aplikasi.
- Gunakan function murni saat transformasi data.
- Untuk nested object, update bertahap agar jelas.
- Untuk list besar, pertimbangkan normalisasi state agar update tetap efisien.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
type Patient = { id: string; status: "WAITING" | "DONE" };

const list: Patient[] = [{ id: "p1", status: "WAITING" }];

const updated = list.map((item) =>
  item.id === "p1"
    ? { ...item, status: "DONE" } // salin object lalu update field
    : item
);

console.log(list[0].status); // WAITING (data asli tidak berubah)
console.log(updated[0].status); // DONE
```

## Checklist Pemahaman

- [ ] Tahu kenapa mutasi langsung berbahaya.
- [ ] Bisa update array of object tanpa mutasi.
- [ ] Tahu cara cek perubahan data secara aman.
- [ ] Paham kapan immutable update perlu dioptimalkan karena biaya copy.

## Latihan Mandiri

- Latihan 1 (basic): Buat fungsi update stok item berdasarkan id.
- Latihan 2 (intermediate): Tambah contoh nested object dan update satu field di level dalam.
- Latihan 3 (simulasi produksi): Simulasikan update 10.000 item list dan bandingkan waktu antara mutasi langsung vs immutable update terstruktur.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: render time, memory usage.
- Metrik bisnis: keluhan UI tidak sinkron.
- Ambang batas awal: update list utama < 200ms.
