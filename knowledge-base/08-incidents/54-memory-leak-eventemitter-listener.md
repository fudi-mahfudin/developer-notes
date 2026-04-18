# #54 — Memory leak: listener EventEmitter tidak di-remove

**Indeks:** [`README.md`](./README.md) · **ID:** `#54` · **Kategori:** Runtime Node.js & waktu

---

## Ringkasan

Menambahkan listener ke **EventEmitter** (HTTP server, WebSocket, domain internal) tanpa **`off`/`removeListener`** saat objek dibuang menyebabkan listener dan closure terkait menumpuk. Pada server Node yang menangani banyak koneksi dinamis, ini meningkatkan memori dan dapat memperlambat dispatch event.

---

## Mitigasi ideal (~60 detik)

“Gunakan **`once`** jika hanya perlu satu kali; pastikan cleanup pada `close`/`destroy`. Hindari menambahkan listener baru di dalam handler yang dipanggil berulang tanpa guard. Untuk WebSocket, bersihkan pada disconnect. Monitoring **listener count** pada objek penting selama soak test.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Listener leak:** count listener meningkat tanpa batas seiring waktu.

---

## Mengapa pola ini sangat umum di healthcare

1. Hot reload pengembangan menyembunyikan leak di dev.
2. Pola subscription events pada integrasi streaming HL7.
3. Logging diagnostik yang menambahkan listener debug dan lupa dicabut.

---

## Pola gagal (ilustrasi)

```typescript
socket.on('data', () => {
  socket.on('error', handler); // nested each packet → leak
});
```

---

## Gejala di production

- `MaxListenersExceededWarning` — atau tidak ada peringatan tetapi memori naik.

---

## Diagnosis

1. `emitter.listenerCount('event')` introspection pada debug.
2. Heap snapshot menunjukkan banyak closure identik.

---

## Mitigasi yang disarankan

1. Pola `AbortController` untuk cleanup terpusat.
2. Wrapper subscription dengan auto-unsubscribe on scope end.
3. Batasi max listeners di dev untuk menangkap bug lebih awal.

---

## Trade-off dan risiko

- Terlalu agresif remove bisa menghapus listener sah—uji menyeluruh.

---

## Aspek khusus healthcare

- Stream data pasien harus dihentikan bersih saat sesi berakhir untuk privasi dan memori.

---

## Checklist review PR

- [ ] Setiap `on` dinamis punya pasangan cleanup pada lifecycle yang jelas.

---

## Kata kunci untuk pencarian

`EventEmitter leak`, `removeListener`, `MaxListenersExceededWarning`

---

## Catatan tambahan operasional

Uji **soak** minimal 24 jam pada staging dengan simulasi koneksi berulang untuk mendeteksi leak perlahan.

Tambahkan **integration test** yang menginisiasi ribuan koneksi WebSocket berturut-turut untuk memastikan listener dibersihkan.

---

## Referensi internal

- [`README.md`](./README.md) · **#53**, **#68**.
