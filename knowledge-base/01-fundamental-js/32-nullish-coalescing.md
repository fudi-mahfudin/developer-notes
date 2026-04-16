# Nullish coalescing `??`

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: default hanya untuk nullish

Operator `??` mengembalikan operand kanan hanya saat operand kiri bernilai `null` atau `undefined`. Berbeda dengan `||` yang juga menganggap `0`, `false`, dan `''` sebagai falsy.

### Mengapa dipedulikan di interview & produksi?

- Nilai `0` dan `false` sering valid di konfigurasi.  
- Menghindari bug fallback yang mengubah data valid.  
- Sering dipakai bersama optional chaining `?.`.

### Contoh cepat

```js
0 || 10; // 10
0 ?? 10; // 0
```

### Kesalahan umum

- Menukar `||` dan `??` tanpa memahami nilai falsy vs nullish.  
- Menulis ekspresi campur `??` dengan `||` tanpa kurung.

---

# Contoh soal coding: `withDefault` (fallback aman)

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy  
- **Topik utama:** nullish coalescing  
- **Inti masalah:** Kembalikan nilai input kecuali jika nullish, maka pakai default.

---

- Soal: `withDefault(value, defaultValue)`.  
- Input: nilai apa pun dan default.  
- Output: `value ?? defaultValue`.  
- Constraints utama: `0/false/''` harus tetap lolos.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Gunakan `??` karena hanya nullish yang dianggap "tidak ada". Kompleksitas O(1).

Struktur cepat:

- Observasi inti: masalah klasik fallback `||`.  
- Strategi: satu ekspresi `value ?? defaultValue`.  
- Edge case: `value = NaN` tetap dianggap ada.

## 3) Versi Ultra Singkat (10-20 detik)

> Pakai `??`, bukan `||`, saat `0/false` valid.

## 4) Pseudocode Ringkas (5-10 baris)

```text
withDefault(value, def):
  jika value nullish: return def
  return value
```

## 5) Implementasi Final (Inti Saja)

```js
export function withDefault(value, defaultValue) {
  return value ?? defaultValue;
}
```

## 6) Bukti Correctness (Wajib)

- Nilai nullish diganti default.  
- Nilai non-nullish dikembalikan apa adanya.

## 7) Dry Run Singkat

- `withDefault(0, 9)` -> `0`  
- `withDefault(undefined, 9)` -> `9`

## 8) Red Flags (Yang Harus Dihindari)

- Menggunakan `||` padahal `false` valid.  
- Fallback default yang mahal dihitung berkali-kali (gunakan lazy bila perlu).

## 9) Follow-up yang Sering Muncul

- Follow-up 1: kombinasi `obj?.x ?? def`.  
- Follow-up 2: nullish assignment `??=`.  
- Follow-up 3: kapan `||` justru lebih tepat.

## 10) Trade-off Keputusan

- Opsi A (`??`): semantik tepat untuk "tidak ada nilai".  
- Opsi B (`||`): tepat untuk "falsy dianggap kosong".

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

## Template Drill Cepat (Isi < 2 Menit) - `readPort`

- Tingkat kesulitan: Easy  
- Topik utama: `??`  
- Inti masalah: `readPort(envPort)` harus mempertahankan `0` kalau memang valid.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
