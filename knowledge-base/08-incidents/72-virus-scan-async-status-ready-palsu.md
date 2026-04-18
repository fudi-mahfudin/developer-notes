# #72 — Virus scan async gagal → status “ready” palsu untuk dokumen klinis

**Indeks:** [`README.md`](./README.md) · **ID:** `#72` · **Kategori:** Frontend & edge (browser / proxy)

---

## Ringkasan

Alur unggah sering mengatur status dokumen menjadi **AVAILABLE** setelah penyimpanan mentah—proses **virus scan/malware** berjalan asynchronous. Jika pemindaian gagal atau antrean scan macet, sistem dapat tetap menampilkan dokumen kepada pengguna atau mengizinkan distribusi sebelum scan selesai—risiko malware dan compliance; atau sebaliknya menampilkan siap padahal scan menolak tanpa pesan jelas.

---

## Mitigasi ideal (~60 detik)

“Modelkan status eksplisit: **UPLOADED → SCANNING → CLEAN / QUARANTINED**. UI tidak boleh mengizinkan unduhan ke pengguna luar sampai CLEAN kecuali policy mengizinkan dengan peringkat risiko tertentu—biasanya tidak untuk PHI. Tangani error scanner dengan DLQ dan alarm. Untuk healthcare, kuarantina harus mencatat audit.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Async gate:** persyaratan pemindaian sebelum akses luas.

---

## Mengapa pola ini sangat umum di healthcare

1. Scan memakan waktu untuk file besar.
2. UX ingin menganggap upload selesai cepat.
3. Integrasi scanner pihak ketiga tidak terhubung dengan status DB.

---

## Pola gagal (ilustrasi)

Webhook scan gagal tetapi tidak mengubah status dokumen dari PROCESSING—UI timeout menampilkan fallback salah.

---

## Gejala di production

- Dokumen malware lolos ke viewer internal—atau dokumen sah macet tidak terpakai.

---

## Diagnosis

1. Audit status dokumen yang dapat diunduh vs hasil scan logs.
2. Alert backlog scan.

---

## Mitigasi yang disarankan

1. State machine ketat dengan invariant tes.
2. Retry scan dengan DLQ [#39](39-poison-message-tanpa-dlq.md).
3. Nonaktifkan share link sampai CLEAN.

---

## Trade-off dan risiko

- Menahan akses sampai scan selesai menambah latensi UX—komunikasikan progres.

---

## Aspek khusus healthcare

- Malware pada workstation klinisi dapat menyebabkan kebocoran PHI besar—severity tinggi.

---

## Checklist review PR

- [ ] Status dokumen mencakup fase scan dan tidak ada jalan pintas tanpa review keamanan.

---

## Kata kunci untuk pencarian

`virus scan`, `async pipeline`, `quarantine`, `malware`

---

## Skenario regresi yang disarankan

1. Kirim file EICAR test—harus masuk QUARANTINED.
2. Matikan worker scan—UI harus menunjukkan backlog, bukan siap.
3. Uji resume setelah scanner kembali online.

---

## KPI pemantauan

- Umur tertua dokumen dalam status SCANNING.

---

## Catatan tambahan operasional

Integrasikan alert ke tim **infosec** ketika quarantine melebihi ambang harian.

---

## Referensi internal

- [`README.md`](./README.md) · **#38**, **#39**.
