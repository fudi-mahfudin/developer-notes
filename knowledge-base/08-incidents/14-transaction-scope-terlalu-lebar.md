# #14 — Transaction scope terlalu lebar → blocking panjang

**Indeks:** [`README.md`](./README.md) · **ID:** `#14` · **Kategori:** Database & transaksi

---

## Ringkasan

Menyimpan **BEGIN** hingga mencakup panggilan HTTP ke sistem eksternal (lab, payer), parsing file besar, atau komputasi CPU berat menjaga **lock dan snapshot MVCC** lebih lama dari yang dibutuhkan konsistensi data. Di Node.js satu transaksi panjang pada connection pool dapat mengurangi throughput keseluruhan sistem healthcare multi-tenant yang sensitif latency.

---

## Mitigasi ideal (~60 detik)

“Scope transaksi harus **sedikit mungkin**: commit setelah invariant data internal tercapai; panggilan ke sistem luar dan retry dilakukan **di luar** transaksi DB atau melalvi **outbox** asynchronous. Kalau harus konsisten dengan webhook, pisahkan ‘tulis fakta + enqueue’ vs ‘efek luar’. Untuk healthcare, pola umum salah adalah menahan transaksi selagi menunggu FHIR server—itu harusnya timeout terpisah dengan saga/kompensasi.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Minimal transaction boundary:** sesuai invariant bisnis satu agregat.
- **Distributed operation:** gabungkan eventual consistency dengan idempotensi.

---

## Mengapa pola ini sangat umum di healthcare

1. Workflow klinis panjang dicoba dimasukkan dalam satu transaksi “agar aman”.
2. Developer menyelipkan await fetch di tengah blok repository.
3. Logging audit sinkron besar dalam satu commit.

---

## Pola gagal (ilustrasi)

```typescript
await db.transaction(async (tx) => {
  await tx.orders.update(...);          // cepat
  await externalLab.placeOrder(http);    // lambat → lock/block panjang
});
```

---

## Gejala di production

- Pool exhaustion meskipun query individu cepat.
- Blocking berantai pada tabel yang disentuh transaksi awal.

---

## Diagnosis

1. Trace span transaksi DB pada APM—durasi tidak proporsional dengan SQL count.
2. Audit `await` dalam callback transaksi ORM.

---

## Mitigasi yang disarankan

1. **Commit early** kemudian lanjutkan saga dengan status mesin terjamin.
2. Gunakan **outbox** untuk pesan reliabel keluar sistem.
3. Pecah menjadi dua transaksi dengan token idempotensi.

---

## Trade-off dan risiko

- Tanpa saga, konsistensi eventual bisa menampilkan status perantara—komunikasikan pada UI.

---

## Aspek khusus healthcare

- Integrasi banyak sistem eksternal pada satu flow registrasi pasien—transaksi DB harus pendek.

---

## Checklist review PR

- [ ] Tidak ada HTTP call dalam `db.transaction` kecuali ditinjau eksplisit dengan timeout sangat pendek dan alasan kuat.

---

## Kata kunci untuk pencarian

`transaction boundary`, `hold connection`, `saga`, `outbox pattern`

---

## Catatan tambahan operasional

Monitor **idle in transaction** connections—sering gejala scope terlalu lebar atau bug yang tidak commit.

---

## Referensi internal

- [`README.md`](./README.md) · **#38** (outbox).
