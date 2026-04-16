# Globals & strict mode

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: satu global di semua environment

**Global object**: di browser `window` (legacy), `self` di worker; di Node `global`; standar **`globalThis`** mengarah ke global yang benar di mana pun.

**Strict mode** (`'use strict'` atau modul ESM): memperketat perilaku — penugasan ke undeclared variable error, `delete` pada nama tidak boleh, parameter duplikat dilarang, `this` di fungsi biasa pemanggilan sederhana jadi `undefined` (bukan global).

### Mengapa dipedulikan di interview & produksi?

- Kode **isomorphic** (Node + browser) harus menghindari asumsi `window` saja.  
- **Strict mode** menutup sebagian besar perilaku “silent bug” script lama.  
- Memahami **`globalThis`** mencegah polyfill yang salah di library umum.

### Contoh `globalThis`

```js
globalThis.JSON === JSON; // true
```

### Kesalahan umum

- Mengasumsikan `window` ada di Node.  
- Script non-strict membuat **global implisit** dengan assignment.

---

# Contoh soal coding: `getGlobalThis` (polyfill ringkas)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih deteksi global dan portabilitas. Struktur jawaban mengikuti template singkat coding test.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy  
- **Topik utama:** global object, kompatibilitas  
- **Inti masalah:** Kembalikan `globalThis` jika ada; jika tidak, fallback berantai (Node/browser/worker).

---

- Soal: Implementasikan `getGlobalThis()`.
- Input: tidak ada.
- Output: object global untuk environment saat ini.
- Constraints utama: hindari `Function` jika tidak perlu (CSP); di codebase modern, cabang pertama cukup.
- Pattern utama: `typeof globalThis !== 'undefined'` lalu `global`, `self`, `window`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> `globalThis` adalah standar; polyfill untuk engine lama. Kompleksitas O(1). Cabang `Function('return this')` terakhir bisa bermasalah di CSP ketat.

Struktur cepat:

- Observasi: urutan penting — `globalThis` dulu.  
- Strategi: rantai `typeof` guard.  
- Edge: web worker punya `self` bukan `window`.

## 3) Versi Ultra Singkat (10-20 detik)

> `return globalThis` di baseline modern; polyfill lengkap untuk legacy.

## 4) Pseudocode Ringkas (5-10 baris)

```text
getGlobalThis():
  jika globalThis ada: return
  else coba global, self, window
  else Function return this (hati-hati CSP)
```

## 5) Implementasi Final (Inti Saja)

```js
export function getGlobalThis() {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof global !== 'undefined') return global;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  // eslint-disable-next-line no-new-func
  return Function('return this')();
}
```

## 6) Bukti Correctness (Wajib)

- Di Node modern, `globalThis === global`.  
- Di browser modern, `globalThis` mengarah ke `window` atau `window`-like.

## 7) Dry Run Singkat

- Node: `getGlobalThis().process` mungkin ada.

## 8) Red Flags (Yang Harus Dihindari)

- `new Function` di produksi ketat CSP — hindari cabang jika baseline tidak memerlukan.  
- Mengakses `window` langsung di library isomorphic.

## 9) Follow-up yang Sering Muncul

- Follow-up 1: perbedaan `globalThis` dan `window` + `var` global.  
- Follow-up 2: strict mode di ESM otomatis.  
- Follow-up 3: `this` di fungsi biasa vs arrow.

## 10) Trade-off Keputusan

- Opsi A (hanya `globalThis`): minimal, asumsi baseline.  
- Opsi B (polyfill penuh): kompatibilitas luas.  
- Risiko: `Function` cabang terakhir.

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

## Template Drill Cepat (Isi < 2 Menit) — strict mode

- Tingkat kesulitan: Easy  
- Topik utama: strict mode  
- Inti masalah: `'use strict';` lalu assignment ke variabel tak dideklarasikan — amati error.  
- 1 alasan: global implisit dilarang.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
