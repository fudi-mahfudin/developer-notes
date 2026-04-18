# #66 — Debounce search mengirim query dengan konteks ID salah

**Indeks:** [`README.md`](./README.md) · **ID:** `#66` · **Kategori:** Frontend & edge (browser / proxy)

---

## Ringkasan

**Debounce** pada kotak pencarian menunda eksekusi query hingga pengguna berhenti mengetik—jika pengguna **mengganti konteks** (misalnya ganti fasilitas atau pasien) sebelum debounce selesai, query dapat dikirim dengan **parameter lama** atau ID yang sudah tidak valid. Hasilnya autosuggest atau daftar dapat menampilkan entitas dari konteks sebelumnya.

---

## Mitigasi ideal (~60 detik)

“Simpan **versi konteks** pada saat mulai debounce—abaikan callback jika versi tidak sama; atau batalkan timeout saat konteks berubah. Gunakan hook debounce yang menerima dependency array untuk reset timer ketika context id berubah.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Timer debounce:** menunda eksekusi fungsi hingga jeda stabil.
- **Context version:** counter atau hash yang berubah saat konteks berubah.

---

## Mengapa pola ini sangat umum di healthcare

1. Pencarian pasien lintas cabang dengan dropdown fasilitas.
2. Typeahead dengan API berat sehingga debounce panjang.
3. Copy-paste komponen search tanpa konteks.

---

## Pola gagal (ilustrasi)

Debounce 500 ms—user mengganti cabang pada 300 ms, query untuk cabang lama tetap terkirim.

---

## Gejala di production

- Hasil pencarian “kadang dari cabang lain” menurut pengguna.

---

## Diagnosis

1. Instrument query params vs konteks UI saat request keluar.
2. Uji timing manual dengan script.

---

## Mitigasi yang disarankan

1. Cancel pending debounce on context change.
2. Sertakan context id dalam query dan validasi server.

---

## Trade-off dan risiko

- Debounce lebih pendek meningkatkan load—keseimbangan UX.

---

## Aspek khusus healthcare

- Mencampur pasien antar cabang dapat melanggar kebijakan privasi regional.

---

## Checklist review PR

- [ ] Komponen search debounced reset saat konteks organisasi/pasien berubah.

---

## Kata kunci untuk pencarian

`debounce`, `context switch`, `typeahead`, `cancellable promise`

---

## Skenario regresi yang disarankan

1. Ketik cepat lalu ganti fasilitas sebelum debounce selesai—tidak ada request dengan fasilitas lama.
2. Uji dengan debounce 0, 200, 800 ms untuk regresi.
3. Pastikan server menolak query jika user tidak punya akses cabang tersebut.

---

## KPI pemantauan

- Jumlah respons pencarian yang dibuang di klien karena stale guard.

---

## Catatan tambahan operasional

Cantumkan **facilityId** pada setiap permintaan search meskipun tampak redundan untuk pertahanan mendalam.

---

## Referensi internal

- [`README.md`](./README.md) · **#61**.
