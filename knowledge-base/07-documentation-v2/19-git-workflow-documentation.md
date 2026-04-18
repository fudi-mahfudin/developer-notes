# Dokumentasi Git Workflow

Panduan ini menjelaskan **mengapa workflow Git didokumentasikan**, **model branching umum**, **konvensi commit dan PR**, **integrasi dengan issue tracker**, serta **kesalahan** yang menyebabkan repository sulit dirilis atau diaudit.

---

## 1. Definisi singkat

**Git workflow documentation** adalah kebijakan tim tentang **cara menggunakan Git** untuk kolaborasi: struktur branch, aturan merge, siapa boleh push ke mana, konvensi pesan commit, ukuran PR yang diharapkan, strategi tagging rilis, dan tanggung jawab review.

Tanpa dokumentasi ini, setiap developer membuat aturan sendiri—menghasilkan history yang tidak dapat dibaca dan rilis yang tidak dapat dilacak.

---

## 2. Mengapa dokumen ini sangat sering dirujuk

Developer melakukan commit dan merge **beberapa kali sehari**. Dokumentasi menjadi **satu-satunya sumber** untuk pertanyaan “branch apa yang harus saya buat untuk hotfix?” atau “apakah kami squash merge?”.

---

## 3. Model branching populer

| Model | Ciri |
|-------|------|
| **GitHub Flow** | branch fitur dari `main`, PR, deploy dari `main`. |
| **Git Flow** | `develop`, `release/*`, `hotfix/*` — lebih berat, cocok rilis terjadwal. |
| **Trunk-based** | cabang pendek ke trunk dengan feature flag—CI ketat. |

Pilih satu dan dokumentasikan pengecualian (misalnya hotfix produksi).

---

## 4. Konvensi nama branch

Contoh: `feature/CLIN-121-referral-queue`, `hotfix/1.5.1-notif`, `spike/CLIN-300-fhir`. Konsistensi membantu otomasi dan filter log.

---

## 5. Pesan commit

**Conventional Commits** (`feat:`, `fix:`, `chore:`) mendukung changelog otomatis. Dokumentasikan scope dan body yang diharapkan untuk perubahan lintas repo.

---

## 6. Pull request

Nyatakan **ukuran ideal**, **template PR**, persyaratan review (minimal dua reviewer untuk area kritis), dan **definisi merge** (squash vs merge commit). Untuk healthcare, pertimbangkan **review keamanan** untuk perubahan auth/PHI.

---

## 7. Protected branches

`main`/`production` harus dilindungi: required checks, no direct push, signed commits jika policy mensyaratkan.

---

## 8. Tagging dan rilis

Dokumentasikan format tag (`v1.5.0`), siapa membuat tag, dan hubungan tag ke artefak deploy.

---

## 9. Monorepo vs polyrepo

Jika monorepo, jelaskan **path ownership** dan tooling (`CODEOWNERS`). Polyrepo: jelaskan dependensi versi antar repo.

---

## 10. Integrasi issue tracker

Smart commit menghubungkan commit ke tiket—dokumentasikan format agar tidak merusak parsing.

---

## 11. Kesalahan umum

- Dokumen tidak diperbarui saat workflow berubah—developer mengikuti praktik lama.
- Tidak ada panduan hotfix—panik saat produksi down.
- Review hanya kosmetik tanpa kriteria risiko.

---

## 12. Ringkasan

Dokumentasi Git workflow adalah **peraturan lalu lintas** untuk perubahan kode. Ini adalah dokumen yang developer junior baca pada hari pertama dan yang senior tetap gunakan saat ambiguitas merge muncul—sangat masuk daftar referensi harian.

---

## 13. Cherry-pick dan porting antar cabang

Jelaskan kapan cherry-pick diperbolehkan antar cabang rilis versus merge biasa—kesalahan interpretasi di sini sering menghasilkan patch ganda atau konflik yang sulit dilacak saat audit.

---

## 14. Kebijakan rebase vs merge untuk cabang panjang

Tuliskan preferensi tim untuk menjaga readability history pada repo yang aktif—debate abadi ini selesai dengan kebijakan eksplisit, bukan dengan kesepakatan implisit tiap PR.

---

## 15. Pengelolaan submodule atau dependensi besar

Jika repo memakai submodule atau paket workspace, dokumentasikan langkah clone pertama dan pembaruan versi submodule—titik friction klasik onboarding.

---

## 16. Audit trail untuk compliance

Pada lingkungan terregulasi, cantumkan apakah commit ditandatangani dan bagaimana mengaudit siapa menyetujui merge ke cabang produksi—sering menjadi pertanyaan auditor ketika insiden terjadi.
