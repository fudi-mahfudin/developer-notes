# #62 — Stale React state → menampilkan catatan pasien sebelumnya

**Indeks:** [`README.md`](./README.md) · **ID:** `#62` · **Kategori:** Frontend & edge (browser / proxy)

---

## Ringkasan

State React yang tidak **reset** saat `patientId` berubah menyebabkan komponen catatan menampilkan data dari kunjungan sebelumnya hingga fetch baru selesai—atau lebih buruk jika fetch gagal diam-diam. Ini variasi UX dari [#61](61-wrong-patient-context-race-spa.md) dengan akar di **state lokal** dan kurangnya **key** pada subtree.

---

## Mitigasi ideal (~60 detik)

“Pasang **`key={patientId}`** pada komponen akar catatan agar subtree di-remount lengket bersih saat pasien berganti—atau reset manual state pada `useEffect` ketika id berubah. Jangan mengandalkan loading global saja; tampilkan skeleton eksplisit sampai data baru valid. Kombinasikan dengan AbortController untuk fetch.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Stale UI state:** nilai React state tidak mencerminkan props/route terbaru.
- **Remount boundary:** membungkus subtree dengan key untuk reset deterministik.

---

## Mengapa pola ini sangat umum di healthcare

1. Form kompleks dengan banyak field controlled.
2. Cache client-side state untuk UX cepat tetapi berbahaya pada konteks pasien.
3. Komponen reuse tanpa invariant konteks.

---

## Pola gagal (ilustrasi)

Menyimpan `notes` dalam `useState` tanpa `setNotes([])` ketika pasien berganti.

---

## Gejala di production

- Flash konten lama saat membuka pasien baru pada perangkat lambat.

---

## Diagnosis

1. React DevTools—inspect state vs props.
2. Replay dengan CPU throttle.

---

## Mitigasi yang disarankan

1. Keyed subtrees untuk konteks pasien.
2. Reset eksplisit dalam effect dengan dependency `[patientId]`.
3. Gunakan server-state library dengan cache keyed.

---

## Trade-off dan risiko

- Remount besar bisa kehilangan draft yang belum disimpan—gunakan autosave draft per pasien id.

---

## Aspek khusus healthcare

- Draft catatan harus terikat pasien dengan jelas—jangan reuse textarea tanpa kontrol.

---

## Checklist review PR

- [ ] Layar catatan klinis reset state ketika konteks pasien berganti.

---

## Kata kunci untuk pencarian

`React key`, `stale state`, `reset state`, `patient context`

---

## Skenario regresi yang disarankan

1. Buka pasien A, tunggu catatan termuat sepenuhnya.
2. Navigasi cepat ke pasien B sebelum A selesai—verifikasi tidak ada teks A.
3. Putuskan jaringan saat navigasi—UI harus error aman tanpa konten silang.
4. Ulangi dengan throttling CPU 6×.
5. Tab ganda ke pasien berbeda secara bergantian selama dua menit.
6. Verifikasi autosave draft tidak tertukar antar pasien.

---

## KPI pemantauan

- Rasio error fetch catatan vs tampilan placeholder.
- Waktu dari perubahan route hingga konten pertama yang cocok patientId.
- Jumlah laporan pengguna tentang “data orang lain” per minggu.

---

## Catatan tambahan operasional

Tambahkan **banner verifikasi pasien** pada header yang menampilkan nama/MRN dari server terbaru, bukan cache lokal semata.

---

## Referensi internal

- [`README.md`](./README.md) · **#61**, **#63**.
