# #36 — Idempotency key hilang atau hanya ada di client

**Indeks:** [`README.md`](./README.md) · **ID:** `#36` · **Kategori:** Async, reliability & antrian

---

## Ringkasan

Mempercayai **browser/mobile** untuk mengirim header idempotensi unik tanpa validasi server memungkinkan klien berbahaya atau bug mengabaikan atau menduplikasi kunci—atau menggunakan kunci yang terlalu pendek/tab bentrok. Tanpa penyimpanan server-side dari kunci yang sudah diproses, replay jaringan tetap berbahaya. Untuk pembayaran dan pemesanan medis, standar industri mengharuskan **persistensi idempotency record** dengan respons cache.

---

## Mitigasi ideal (~60 detik)

“Simpan **idempotency key** dengan hash payload dan respons final di tabel/redis TTL—server mengembalikan respons yang sama pada replay. Jangan percaya kunci yang tidak diamankan—generate opsional untuk klien tetapi verifikasi bentuknya. Kombinasikan dengan **nonce** untuk API publik sensitif. Untuk healthcare pastikan rekaman tidak menyimpan PHI sensitif sebagai bagian dari kunci cache.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Server-authoritative idempotency:** penyimpanan efek pertama menentukan jawaban replay.
- **Client-only hint:** dapat membantu tetapi tidak mencukupi sebagai keamanan.

---

## Mengapa pola ini sangat umum di healthcare

1. Implementasi cepat frontend-only untuk mengurangi konflik double-click.
2. Tidak ada storage bersama antara banyak instance Node tanpa Redis.
3. Kebijakan retensi tidak mempertimbangkan penyimpanan idempotensi.

---

## Pola gagal (ilustrasi)

Header idempotensi dihasilkan oleh `uuid()` di browser tanpa server menyimpan pemetaannya.

---

## Gejala di production

- Replay jaringan masih menciptakan duplikat efek walau ada header sekadar string.

---

## Diagnosis

1. Audit apakah server menyimpan snapshot respons per idempotency key.
2. Uji replay dengan curl mengulang POST identik.

---

## Mitigasi yang disarankan

1. Store idempotency hash di Redis/DB dengan TTL wajar.
2. Sinkronkan antar pod melalui store bersama.
3. Validasi panjang/entropy kunci.

---

## Trade-off dan risiko

- Storage tambahan—atur TTL dan kebersihan data.

---

## Aspek khusus healthcare

- Payload PHI tidak boleh menjadi key hash yang ter-log di sistem observabilitas rentan.

---

## Checklist review PR

- [ ] Endpoint mutasi publik punya store idempotensi server-side.

---

## Kata kunci untuk pencarian

`idempotency key`, `replay protection`, `Redis idempotency`

---

## Catatan tambahan operasional

Putuskan kebijakan **durasi TTL** idempotensi minimal lebih besar dari jendela retry maksimum klien.

Enkripsi simpanan idempotensi jika menyimpan ringkasan payload yang mengandung PHI—sesuaikan dengan kebijakan KMS internal.

Lakukan **pengetesan beban** pada store idempotensi untuk memastikan performa hash/lookup memadai saat trafik puncak.

Dokumentasikan batasan panjang kunci agar klien tidak mengirim string berlebihan yang membebani log.

---

## Referensi internal

- [`README.md`](./README.md) · **#35**, **#37**.
