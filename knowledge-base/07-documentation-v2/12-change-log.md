# Change Log

Panduan ini menjelaskan **fungsi change log** dalam rekayasa perangkat lunak, **format populer (Keep a Changelog)**, **perbedaan dengan release notes**, **automatisasi**, serta **kesalahan** yang membuat histori versi tidak dapat dipercaya.

---

## 1. Definisi singkat

**Change log** adalah daftar kronologis perubahan pada **produk atau paket** untuk setiap versi yang dirilis. Biasanya terstruktur per kategori: **Added**, **Changed**, **Deprecated**, **Removed**, **Fixed**, **Security**.

Tujuannya adalah **transparansi** dan **kemudahan diff** antar versi untuk developer dan operator.

---

## 2. Mengapa developer sering membuka change log

- Menilai dampak **upgrade dependency** pada build.
- Mencari kapan bug tertentu diperbaiki (`Fixed`).
- Mendeteksi **breaking change** sebelum bump mayor.

---

## 3. Keep a Changelog

Prinsip umum dari [Keep a Changelog](https://keepachangelog.com/):

- Manusia yang membaca, bukan commit log mentah.
- Versi mengikuti **SemVer** untuk library.
- Tanggal rilis dicantumkan per versi.

---

## 4. Change log vs commit history

Commit Git menjelaskan **bagaimana** kode berubah di repo; change log menjelaskan **dampak** pada konsumen paket atau operator layanan. Tanpa kurasi, commit noise mengaburkan perubahan penting.

---

## 5. Change log vs release notes

| Artefak | Fokus |
|---------|--------|
| Change log | Terstruktur, padat, sering untuk repo/produk teknis. |
| Release notes | Narasi, panduan upgrade, audiens bisnis dan IT. |

Keduanya dapat dibuat dari **sumber data yang sama** dengan template berbeda.

---

## 6. Lokasi file

Umumnya `CHANGELOG.md` di root repo library atau layanan. Monorepo dapat memiliki change log per paket (`packages/foo/CHANGELOG.md`).

---

## 7. Automatisasi

Alat seperti **semantic-release**, **changesets**, atau **standard-version** membantu mengisi entri dari conventional commits—tetap perlu **review manusia** untuk merge entri dan menjaga bahasa konsumen.

---

## 8. Entri keamanan

Kategori **Security** harus menyebutkan apakah upgrade **wajib** dan rentang versi yang terdampak—tanpa detail eksploitasi yang membahayakan pengguna yang belum patch.

---

## 9. Deprecation

Cantumkan di **Deprecated** dengan timeline penghapusan. Hindari menghapus API tanpa jejak di change log versi perantara.

---

## 10. Kesalahan umum

- Sekadar menempel output `git log`.
- Versi tanpa tanggal atau urutan kronologis terbalik.
- Tidak mencatat breaking change di header yang sesuai.
- Change log binary besar di repo tanpa link ke release artifact.

---

## 11. Ringkasan

Change log adalah **indeks perubahan versi** yang mempercepat keputusan upgrade dan audit “kapan perilaku X berubah”. Untuk tim yang mengirimkan banyak layanan, disiplin change log mengurangi panik saat incident menelusuri regresi.

---

## 12. Monorepo dan banyak paket

Pada monorepo, pertimbangkan **satu change log root** dengan sub-seksi per paket atau change log terpisah per paket dengan indeks beranda. Yang penting pembaca menemukan entri tanpa berburu di commit ribuan baris.

---

## 13. Link ke advisory keamanan

Untuk entri Security, tautkan ke **advisory internal atau CVE** resmi sehingga tim keamanan dapat memverifikasi cakupan patch tanpa membuka thread Slack panjang.

---

## 14. Change log untuk layanan SaaS

Layanan tanpa nomor versi yang terlihat pengguna tetap membutuhkan histori perubahan terjadwal untuk tim integrasi—gunakan **nomor rilis** atau **tanggal deploy** sebagai pengganti semver konsumen.
