# #48 — Redis single-thread blocking oleh operasi berat

**Indeks:** [`README.md`](./README.md) · **ID:** `#48` · **Kategori:** Worker, cron, lock terdistribusi & cache

---

## Ringkasan

Redis utama berjalan **single-threaded** untuk command—operasi seperti **`KEYS`**, **`FLUSHALL`**, sorting besar, atau Lua script berat dapat **memblokir** seluruh instance, menunda semua lock/token session yang bergantung pada Redis. Di healthcare, ini dapat menyebabkan logout massal atau gagalnya rate limiting pada portal pasien.

---

## Mitigasi ideal (~60 detik)

“Larang **`KEYS *`** di production—gunakan **`SCAN`** iteratif. Pecah dataset besar ke beberapa instance (**cluster**) atau pisahkan workload session vs analytics. Untuk tugas berat gunakan **Redis modules** atau sistem lain (queue). Pantau **latency spikes** pada slowlog. Untuk PHI, hindari menyimpan payload besar di Redis—gunakan referensi ringan.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Event loop blocking:** satu command panjang menunda ribuan lain.
- **Hot command:** pola yang tidak boleh muncul di prod.

---

## Mengapa pola ini sangat umum di healthcare

1. Debug script meninggalkan `KEYS` di jalur migrasi cache.
2. Menyimpan blob besar sebagai string Redis.
3. Sorted set besar tanpa pagination pada range query.

---

## Pola gagal (ilustrasi)

Cron maintenance menjalankan `KEYS session:*` untuk audit—Redis freeze beberapa detik.

---

## Gejala di production

- Seluruh layanan bergantung Redis mengalami latency burst bersamaan.

---

## Diagnosis

1. Redis **SLOWLOG** dan **latency doctor**.
2. Audit repo untuk pola berbahaya.

---

## Mitigasi yang disarankan

1. Lint CI melarang `KEYS`, `FLUSHALL` dalam kode aplikasi.
2. Pisahkan cluster untuk workload berbeda.
3. Gunakan **IO threads** (Redis 6+) untuk membantu read-only—tetapi tidak menghapus hindari blocking command.

---

## Trade-off dan risiko

- Cluster Redis menambah kompleksitas operasi—perlengkapan tim DevOps.

---

## Aspek khusus healthcare

- Session Redis terblokir dapat mengunci akses portal saat lonjakan informasi kesehatan publik.

---

## Checklist review PR

- [ ] Tidak ada akses Redis yang melakukan scan penuh tanpa SCAN.

---

## Kata kunci untuk pencarian

`Redis KEYS`, `slowlog`, `blocking command`, `SCAN`

---

## Catatan tambahan operasional

Siapkan **capacity playbook** ketika throughput Redis mendekati batas single-thread CPU.

Pertimbangkan **read replicas** Redis untuk beban read-only yang dapat mentolerir lag kecil namun hindari untuk session lock sensitif.

Blokir akses Redis langsung dari shell produksi kecuali melalui prosedur break-glass yang tercatat.

Siapkan **dashboard slowlog** otomatis yang mengirim alert ketika perintah berbahaya muncul.

---

## Referensi internal

- [`README.md`](./README.md) · **#49**.
