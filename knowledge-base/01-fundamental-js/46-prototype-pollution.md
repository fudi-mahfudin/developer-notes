# Prototype pollution

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: injeksi properti ke prototype global

Prototype pollution terjadi saat input tidak tepercaya bisa menulis key berbahaya seperti `__proto__`, `constructor`, atau `prototype` pada object merge.

### Mengapa dipedulikan di interview & produksi?

- Bisa mengubah perilaku object lain secara global.  
- Sering muncul di util merge/patch payload JSON.  
- Dampaknya bisa keamanan dan data integrity.

### Kesalahan umum

- Merge object user langsung ke config tanpa whitelist.  
- Menggunakan `for...in` pada input tanpa filter key berbahaya.

---

# Contoh soal coding: `safeAssign`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Medium  
- **Topik utama:** object merge aman  
- **Inti masalah:** Salin properti dari source ke target dengan memblokir key berbahaya.

---

- Soal: `safeAssign(target, source)` mengembalikan object hasil merge aman.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Iterasi own keys source, skip `__proto__`, `constructor`, `prototype`, lalu assign biasa.

## 3) Versi Ultra Singkat (10-20 detik)

> Whitelist/blacklist key kritis saat merge object eksternal.

## 4) Pseudocode Ringkas (5-10 baris)

```text
safeAssign(target, source):
  blocked = { "__proto__", "constructor", "prototype" }
  untuk key di Object.keys(source):
    jika key tidak diblok: target[key] = source[key]
  return target
```

## 5) Implementasi Final (Inti Saja)

```js
export function safeAssign(target, source) {
  const blocked = new Set(['__proto__', 'constructor', 'prototype']);
  for (const key of Object.keys(source)) {
    if (!blocked.has(key)) target[key] = source[key];
  }
  return target;
}
```

## 6) Bukti Correctness (Wajib)

- Key berbahaya tidak pernah ditulis.  
- Key normal tetap disalin.

## 7) Dry Run Singkat

- Source `{ "__proto__": { polluted: true }, a: 1 }` hanya menyalin `a`.

## 8) Red Flags (Yang Harus Dihindari)

- Menganggap `JSON.parse` otomatis aman dari pollution.  
- Memakai deep merge tanpa sanitasi key.

## 9) Follow-up yang Sering Muncul

- Freeze object config.  
- Validasi schema input.

## 10) Trade-off Keputusan

- Filter key menambah guard sederhana; whitelist schema lebih kuat.

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

- Tambah versi deep merge aman yang tetap memblokir key berbahaya.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
