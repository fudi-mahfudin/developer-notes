# #38 — Tanpa outbox → pesan hilang antara commit DB dan queue

**Indeks:** [`README.md`](./README.md) · **ID:** `#38` · **Kategori:** Async, reliability & antrian

---

## Ringkasan

Pola menulis ke database lalu mengirim pesan ke **message broker** sebagai dua langkah terpisah tanpa transaksi bersama berisiko: commit DB sukses tetapi publish gagal—atau sebaliknya—menghasilkan **ketidakkonsistenan**. **Transactional outbox** menulis rekaman outbox dalam transaksi yang sama dengan perubahan domain; worker terpisah mem-publish ke broker secara andal. Tanpa ini, integrasi healthcare (notifikasi critical lab, sinkronisasi MPI) bisa kehilangan event tanpa jejak.

---

## Mitigasi ideal (~60 detik)

“Gunakan **outbox table** + **polling atau logical decoding** untuk mengirim event setelah commit; atau pola **change data capture** jika infrastruktur mendukung. Jangan mengandalkan ‘DB commit lalu fire-and-forget publish’ tanpa konfirmasi. Untuk layanan kecil, minimal tulis status ‘pending publish’ yang dapat di-retry. Healthcare membutuhkan jejak audit—outbox juga membantu rekonstruksi.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Dual-write problem:** dua sistem penyimpanan tanpa atomic cross-system commit.
- **Outbox relay:** komponen yang membaca outbox dan menerbitkan pesan.

---

## Mengapa pola ini sangat umum di healthcare

1. Butuh respons cepat ke pengguna—kerja async via queue.
2. Tim mengira broker “andal” tanpa menangani partial failure.
3. Microservice baru tanpa infrastruktur CDC matang.

---

## Pola gagal (ilustrasi)

```typescript
await db.commit();
await mq.publish(event); // throws → event hilang padahal DB sudah berubah
```

---

## Gejala di production

- Pasien tidak menerima notifikasi hasil padaham status internal final.

---

## Diagnosis

1. Bandingkan log commit DB dengan log publish.
2. Cari rentang waktu tanpa pasangan event.

---

## Mitigasi yang disarankan

1. Outbox + worker publisher.
2. Gunakan layanan managed yang menawarkan exactly-once semantics jika memungkinkan.
3. Reconciliation batch harian untuk menemukan drift.

---

## Trade-off dan risiko

- Latency tambahan kecil—outbox harus dipantau backlog.

---

## Aspek khusus healthcare

- Hasil lab kritis membutuhkan jejak bahwa notifikasi telah dipublikasikan—metrik backlog outbox.

---

## Checklist review PR

- [ ] Event domain penting tidak mengandalkan dual-write naif.

---

## Kata kunci untuk pencarian

`transactional outbox`, `dual write`, `CDC`, `reliable messaging`

---

## Catatan tambahan operasional

Atur **dead letter** untuk pesan outbox yang gagal berulang agar tim dapat mengoreksi manual dengan aman.

Monitor **kedalaman outbox** seperti antrian lain—alarm ketika relay tertinggal lebih dari beberapa menit untuk domain kritis.

---

## Referensi internal

- [`README.md`](./README.md) · **#39**.
