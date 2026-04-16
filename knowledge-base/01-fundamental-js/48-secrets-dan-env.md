# Secrets & env

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: rahasia jangan masuk repo

Secrets (API key, token, password) wajib dipisahkan dari kode dan dikelola lewat environment/secret manager.

### Mengapa dipedulikan di interview & produksi?

- Kebocoran secret bisa menyebabkan kompromi sistem.  
- Build-time vs runtime env memengaruhi deploy.  
- Rotasi secret lebih mudah jika tidak hardcoded.

---

# Contoh soal coding: `readRequiredEnv`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Easy  
- **Topik utama:** konfigurasi aman  
- **Inti masalah:** Ambil env wajib dan throw jika kosong.

---

- Soal: `readRequiredEnv(name, envObj = process.env)`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Ambil nilai dari env object, validasi nullish/kosong, lempar error deskriptif.

## 3) Versi Ultra Singkat (10-20 detik)

> Fail fast saat env penting tidak ada.

## 4) Pseudocode Ringkas (5-10 baris)

```text
readRequiredEnv(name, env):
  v = env[name]
  jika v nullish atau "":
    throw error
  return v
```

## 5) Implementasi Final (Inti Saja)

```js
export function readRequiredEnv(name, envObj = process.env) {
  const value = envObj[name];
  if (value == null || value === '') {
    throw new Error(`Env wajib tidak ada: ${name}`);
  }
  return value;
}
```

## 6) Bukti Correctness (Wajib)

- Env valid dikembalikan langsung.  
- Env tidak valid gagal cepat sebelum app berjalan.

## 7) Dry Run Singkat

- `readRequiredEnv('DB_URL', { DB_URL: '' })` -> throw.

## 8) Red Flags (Yang Harus Dihindari)

- Menaruh secret di source code.  
- Log secret ke console.

## 9) Follow-up yang Sering Muncul

- Secret manager cloud.  
- Rotasi key otomatis.

## 10) Trade-off Keputusan

- Fail fast aman, tapi perlu error handling deploy pipeline.

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

- Tulis helper `readIntEnv(name, fallback)` dengan validasi angka.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
