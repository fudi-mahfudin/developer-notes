# Semver & breaking change

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: versi sebagai kontrak perilaku

Semver: `MAJOR.MINOR.PATCH`.  
MAJOR untuk breaking change, MINOR fitur kompatibel, PATCH bugfix kompatibel.

### Mengapa dipedulikan di interview & produksi?

- Membantu upgrade dependency lebih aman.  
- Mengatur ekspektasi user library.  
- Menghindari regressions dari update sembrono.

---

# Contoh soal coding: `bumpVersion`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Easy  
- **Topik utama:** parsing semver  
- **Inti masalah:** Naikkan major/minor/patch sesuai tipe perubahan.

---

- Soal: `bumpVersion(version, type)` dengan type `major|minor|patch`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Parse tiga angka, lalu update komponen sesuai aturan semver dan reset komponen di kanan.

## 3) Versi Ultra Singkat (10-20 detik)

> Major reset minor+patch, minor reset patch, patch naik 1.

## 4) Pseudocode Ringkas (5-10 baris)

```text
parse m,n,p
if major -> m+1, n=0, p=0
if minor -> n+1, p=0
if patch -> p+1
```

## 5) Implementasi Final (Inti Saja)

```js
export function bumpVersion(version, type) {
  let [major, minor, patch] = version.split('.').map(Number);
  if (type === 'major') {
    major += 1; minor = 0; patch = 0;
  } else if (type === 'minor') {
    minor += 1; patch = 0;
  } else if (type === 'patch') {
    patch += 1;
  } else {
    throw new Error('type tidak valid');
  }
  return `${major}.${minor}.${patch}`;
}
```

## 6) Bukti Correctness (Wajib)

- Setiap type mengikuti aturan reset semver standar.  
- Input invalid type gagal dengan error.

## 7) Dry Run Singkat

- `bumpVersion('1.2.3', 'minor')` -> `1.3.0`.

## 8) Red Flags (Yang Harus Dihindari)

- Menganggap "strictness baru" bukan breaking change.  
- Mengabaikan changelog saat major upgrade.

## 9) Follow-up yang Sering Muncul

- Pre-release tag (`-beta.1`).  
- Range dependency (`^`, `~`).

## 10) Trade-off Keputusan

- Semver memberi guideline, tapi perlu disiplin tim.

## 11) Checklist Siap Submit

- [ ] Solusi lolos contoh soal.  
- [ ] Kompleksitas disebutkan jelas.  
- [ ] Edge case minimum sudah dicek.  
- [ ] Nama variabel jelas dan tidak ambigu.  
- [ ] Tidak ada mutasi input yang tidak perlu.  
- [ ] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 1-10  
- Efisiensi: 1-10  
- Kejelasan penjelasan: 1-10  
- Kerapihan implementasi: 1-10  
- Catatan perbaikan:

---

## Template Drill Cepat (Isi < 2 Menit)

- Tambah validasi format semver `x.y.z`.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
