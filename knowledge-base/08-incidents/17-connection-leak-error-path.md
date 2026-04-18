# #17 — Connection leak (koneksi tidak dilepas pada error path)

**Indeks:** [`README.md`](./README.md) · **ID:** `#17` · **Kategori:** Database & transaksi

---

## Ringkasan

**Connection leak** terjadi ketika jalur kode mengambil koneksi dari pool tetapi **tidak melepaskan** pada exception—misalnya `throw` sebelum `release`, atau promise chain yang tidak memanggil `finally`. Secara bertahap pool kosong meskipun beban stabil. Node.js dengan callback manual lebih rentan; ORM modern mengurangi risiko tetapi tetap bisa salah pada raw client.

---

## Mitigasi ideal (~60 detik)

“Leak itu pola di mana kita pinjam koneksi lalu tidak return ke pool saat error. Mitigasinya: selalu gunakan **`try/finally`** atau API pool yang otomatis (`pool.query` vs manual acquire), wrap transaksi dengan helper yang **release** di `finally`. Tambahkan **monitoring** koneksi idle-in-transaction dan alert ketika pool waiting naik tanpa traffic baru. Review semua jalur early return.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Acquire without release:** pinjam client dari pool tanpa `release()` di semua cabang.
- **Idle in transaction:** transaksi terbuka tanpa aktivitas—kadang akibat exception tak tertangani.

---

## Mengapa pola ini sangat umum di healthcare

1. Kode integrasi rumit dengan banyak cabang error bisnis.
2. Logging/parsing respons eksternal di tengah transaksi.
3. Copy-paste boilerplate transaksi tanpa `finally`.

---

## Pola gagal (ilustrasi)

```typescript
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await risky(); // throws → tidak sampai COMMIT/ROLLBACK yang benar
} catch (e) {
  throw e; // lupa client.release()
}
```

---

## Gejala di production

- Pool exhaustion muncul setelah beberapa jam operasi normal dengan error sporadis.
- Restart aplikasi “memperbaiki” sementara.

---

## Diagnosis

1. Metrik pool + DB `idle in transaction`.
2. Audit kode untuk `connect()` manual.

---

## Mitigasi yang disarankan

1. Larangan `connect()` manual kecuali dibungkus helper terverifikasi.
2. Gunakan ORM transaction API dengan lifecycle jelas.
3. Timeout **statement** dan **idle transaction** di DB.

---

## Trade-off dan risiko

- Timeout transaksi idle bisa memutus operasi sah yang lama—sesuaikan dengan kasus admin.

---

## Aspek khusus healthcare

- Long-running query laporan harus menggunakan koneksi/worker terpisah dari API pasien.

---

## Checklist review PR

- [ ] Setiap `connect()` punya `finally { client.release() }`.
- [ ] Tidak ada `return` dalam `try` transaksi tanpa commit/rollback terjamin.

---

## Kata kunci untuk pencarian

`connection leak`, `pool.connect`, `release`, `idle in transaction`

---

## Catatan tambahan operasional

Integrasikan pemeriksaan statis (lint) untuk pola acquire tanpa finally pada modul raw SQL.

---

## Referensi internal

- [`README.md`](./README.md) · **#16**.
