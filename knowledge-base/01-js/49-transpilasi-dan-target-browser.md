# Transpilasi & target browser

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: menyesuaikan syntax ke target runtime

Transpilasi (Babel/SWC/tsc) mengubah syntax modern agar kompatibel dengan target browser/node tertentu.

### Mengapa dipedulikan di interview & produksi?

- Menentukan ukuran bundle dan kompatibilitas.  
- Polyfill yang berlebihan memperbesar JS payload.  
- Target baseline harus konsisten lintas tim.

---

# Contoh soal coding: `needsTranspile`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Easy  
- **Topik utama:** compat matrix sederhana  
- **Inti masalah:** Tentukan apakah fitur butuh transpile berdasarkan target major version.

---

- Soal: `needsTranspile(feature, targetVersion, minVersionMap)`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Bandingkan target dengan minimum version fitur. Jika target lebih rendah, butuh transpile/polyfill.

## 3) Versi Ultra Singkat (10-20 detik)

> `return target < minVersionMap[feature]`.

## 4) Pseudocode Ringkas (5-10 baris)

```text
needsTranspile(feature, target, map):
  min = map[feature]
  jika min tidak ada: return false
  return target < min
```

## 5) Implementasi Final (Inti Saja)

```js
export function needsTranspile(feature, targetVersion, minVersionMap) {
  const min = minVersionMap[feature];
  if (min == null) return false;
  return targetVersion < min;
}
```

## 6) Bukti Correctness (Wajib)

- Fitur tanpa data baseline dianggap tidak perlu transpile di model ini.  
- Perbandingan langsung mencerminkan aturan threshold.

## 7) Dry Run Singkat

- `needsTranspile('optionalChaining', 78, { optionalChaining: 80 })` -> `true`.

## 8) Red Flags (Yang Harus Dihindari)

- Menyamakan transpile syntax dengan polyfill API runtime.  
- Tidak dokumentasi baseline browser.

## 9) Follow-up yang Sering Muncul

- `browserslist` dan `core-js`.  
- Differential serving modern/legacy bundle.

## 10) Trade-off Keputusan

- Kompatibilitas luas vs ukuran bundle.

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

- Buat tabel mini `feature -> minChromeVersion`.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
