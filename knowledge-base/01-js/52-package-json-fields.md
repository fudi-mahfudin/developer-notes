# `package.json` fields

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: metadata paket sebagai kontrak distribusi

Field penting: `name`, `version`, `type`, `main`, `module`, `exports`, `engines`, `scripts`.

### Mengapa dipedulikan di interview & produksi?

- Menentukan cara package di-resolve consumer.  
- Menghindari dual package hazard dan runtime mismatch.  
- Menjaga kompatibilitas Node/version policy.

---

# Contoh soal coding: `pickPackageFields`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Easy  
- **Topik utama:** object projection  
- **Inti masalah:** Ambil subset field penting dari object package.

---

- Soal: `pickPackageFields(pkg, keys)` -> object baru.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Iterasi daftar keys, salin hanya own property yang ada.

## 3) Versi Ultra Singkat (10-20 detik)

> Object pick untuk field yang relevan.

## 4) Pseudocode Ringkas (5-10 baris)

```text
out = {}
untuk k di keys:
  jika pkg punya own k: out[k] = pkg[k]
return out
```

## 5) Implementasi Final (Inti Saja)

```js
export function pickPackageFields(pkg, keys) {
  const out = {};
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(pkg, k)) out[k] = pkg[k];
  }
  return out;
}
```

## 6) Bukti Correctness (Wajib)

- Hanya key diminta yang disalin.  
- Key tidak ada diabaikan aman.

## 7) Dry Run Singkat

- `pickPackageFields({name:'a',version:'1.0.0'},['name'])` -> `{name:'a'}`.

## 8) Red Flags (Yang Harus Dihindari)

- Mengandalkan field deprecated tanpa fallback.  
- Tidak sinkron antara `type` dan file extension.

## 9) Follow-up yang Sering Muncul

- `exports` conditional.  
- `engines` enforcement.

## 10) Trade-off Keputusan

- Surface kecil lebih aman, tapi perlu dokumentasi jelas.

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

- Tambahkan validasi field wajib `name`, `version`.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
