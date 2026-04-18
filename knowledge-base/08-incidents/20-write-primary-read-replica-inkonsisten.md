# #20 — Tulis ke primary, baca dari replica tanpa konsistensi sesi

**Indeks:** [`README.md`](./README.md) · **ID:** `#20` · **Kategori:** Database & transaksi

---

## Ringkasan

Ini vari desain dari [#19](19-replica-lag-data-usang.md): aplikasi **tanpa strategi eksplisit** untuk menjaga konsistensi sesi setelah menulis. Load balancer DNS atau library connection string mengarahkan GET ke replica secara round-robin sementara POST ke primary—tanpa koordinasi. Hasilnya perilaku **non-deterministik** bergantung pada node mana yang melayani baca.

---

## Mitigasi ideal (~60 detik)

“Kalau kita tulis primary dan baca replica tanpa aturan, kita dapat perilaku acak. Mitigasinya: **router koneksi** yang memahami ‘session baru vs follow-up read’; gunakan **connection attribute** atau **cookie** untuk pin read ke primary beberapa detik setelah write; atau pakai **single endpoint** dengan parameter konsistensi. Dokumentasikan trade-off—offload replica tidak boleh mengorbankan kepercayaan pengguna pada data yang baru mereka masukkan.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Split brain experience:** UI melihat keadaan berbeda untuk operasi berurutan oleh pengguna sama.
- **Sticky routing:** afinitas koneksi/read ke primary dalam window waktu.

---

## Mengapa pola ini sangat umum di healthcare

1. Introduksi replica untuk skala tanpa refactor routing.
2. Microservice berbeda untuk read vs write tanpa kontrak konsistensi.
3. CDN/cache layer ikut campur.

---

## Pola gagal (ilustrasi)

GraphQL mutation resolve ke service A (primary); subscription/query list resolve ke service B (replica) tanpa barrier.

---

## Gejala di production

- Bug “kadang muncul kadang tidak” pada fitur baru dengan split read/write.

---

## Diagnosis

1. Trace distributed: label host DB untuk setiap span.
2. Reproduksi dengan menekan lag replika buatan.

---

## Mitigasi yang disarankan

1. **CQRS** eksplisit dengan mekanisme projection eventual + status job.
2. **Read from primary** untuk endpoint session user setelah commit.
3. **Causal consistency** token pada payload response untuk client polling.

---

## Trade-off dan risiko

- Primary overload jika semua baca dipindahkan—gunakan window pendek saja.

---

## Aspek khusus healthcare

- Kesalahan persepsi data pasien dapat menyebabkan keputusan klinis salah—prioritas konsistensi UX tinggi.

---

## Checklist review PR

- [ ] Arsitektur read/write terdokumentasi dan diuji konsistensi pengguna.

---

## Kata kunci untuk pencarian

`CQRS consistency`, `read/write split`, `sticky reads`

---

## Catatan tambahan operasional

Integrasikan tes integrasi yang melakukan POST→GET berantai dengan replica yang di-delay sengaja.

Dokumentasikan perilaku yang diharapkan ketika **multi-region** memperkenalkan lag tambahan lintas zona—UI harus toleran terhadap penundaan singkat tanpa menyembunyikan status gagal tulis.

Bangun tes yang menggabungkan **latency injection** pada replica untuk meniru skenario geografis tanpa mengorbankan staging.

Dokumentasikan perilaku ketika **cache edge** ikut menyimpan respons baca yang seharusnya konsisten kuat—invalidasi harus selaras dengan token konsistensi.

---

## Referensi internal

- [`README.md`](./README.md) · **#19**.
