# #65 — Form controlled tidak reset saat navigasi

**Indeks:** [`README.md`](./README.md) · **ID:** `#65` · **Kategori:** Frontend & edge (browser / proxy)

---

## Ringkasan

Komponen form kontrol menyimpan nilai dalam state lokal yang **persistent** lintas navigasi SPA ketika komponen tidak **unmount**—misalnya route bersarang yang memakai layout sama. Pengguna dapat melihat atau mengirim nilai untuk **pasien salah** atau kunjungan salah tanpa menyadari. Reset eksplisit atau keying subtree wajib.

---

## Mitigasi ideal (~60 detik)

“Pasang **`useEffect`** yang mengatur defaultValues ketika context id berubah atau gunakan **react-hook-form reset** pada transisi pasien/kunjungan. Untuk wizard panjang, simpan draft keyed by id agar tidak saling tertukar.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Controlled field:** nilai dikendalikan React state, bukan DOM murni.
- **Draft isolation:** penyimpanan sementara terikat konteks id.

---

## Mengapa pola ini sangat umum di healthcare

1. Form registrasi yang kompleks dengan banyak tab dalam satu shell.
2. Draft otomatis di localStorage tanpa namespace.
3. Kembalian navigasi browser (bfcache) mengembalikan state lama.

---

## Pola gagal (ilustrasi)

Form berada di route `/encounters/:id/edit` tetapi state tidak reset ketika `:id` berubah dengan komponen sama.

---

## Gejala di production

- Field formulir mengandung jawaban kunjungan sebelumnya ketika membuka kunjungan baru.

---

## Diagnosis

1. Manual test mengubah id melalui router tanpa reload penuh.
2. Inspect localStorage keys.

---

## Mitigasi yang disarankan

1. Reset form API pada id change.
2. Guard submit dengan verifikasi id konteks pada payload.
3. Pisahkan halaman kritikal dengan reload penuh jika perlu.

---

## Trade-off dan risiko

- Reset menghapus draft berguna—gunakan autosave keyed.

---

## Aspek khusus healthcare

- Form informed consent salah pasien dapat berimplikasi hukum besar.

---

## Checklist review PR

- [ ] Router param changes trigger form reset atau remount dengan key.

---

## Kata kunci untuk pencarian

`react-hook-form reset`, `useEffect dependency`, `form state`, `bfcache`

---

## Skenario regresi yang disarankan

1. Navigasi antara dua encounter id tanpa reload—semua field harus mengikuti data server.
2. Gunakan tombol browser back/forward setelah mengisi form—nilai harus konsisten atau reset terkontrol.
3. Ubah encounter melalui deep link sambil form terbuka.
4. Refresh halaman—pastikan tidak menggabungkan draft lokal ilegal.
5. Uji dengan autosave aktif dan nonaktif.

---

## KPI pemantauan

- Jumlah submit dengan mismatch antara form context dan route id (server-side validation harus menolak).

---

## Catatan tambahan operasional

Tambahkan **unit test** yang mensimulasikan perubahan router params untuk komponen form utama.

---

## Referensi internal

- [`README.md`](./README.md) · **#61**, **#62**.
