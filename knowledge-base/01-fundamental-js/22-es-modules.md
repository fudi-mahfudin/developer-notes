# ES modules

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: ESM di runtime modern

**ESM** (`import` / `export`) adalah sistem modul standar: **static structure** (analisis bundler), **live bindings** untuk `export`, **strict mode** implisit di modul.

### Mengapa dipedulikan di interview & produksi?

- Bundler dan tree-shaking mengandalkan struktur statis `import` / `export`.  
- Batas **barrel file** dan **circular dependency** langsung memengaruhi waktu build dan bug runtime.  
- Memisahkan **surface publik** modul dari implementasi internal menstabilkan API antar tim.

### Bentuk

| Sintaks | Arti |
|---------|------|
| `export const x = 1` | named export |
| `export default function f() {}` | satu default per modul |
| `export { x as y }` | alias |
| `import { x } from './m.js'` | named import |
| `import v from './m.js'` | default import |
| `import * as ns from './m.js'` | namespace |

### Kesalahan umum

- **Circular dependency** — urutan inisialisasi rumit.  
- Path relatif di browser harus eksplisit (`./`).

---

# Contoh soal coding: `pickExports` (public surface modul)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih pola “re-export subset” seperti barrel file. Struktur jawaban mengikuti template singkat coding test.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy  
- **Topik utama:** object pick, named exports (konsep)  
- **Inti masalah:** Dari objek `source`, buat objek baru hanya berisi kunci yang ada di daftar `names`.

---

- Soal: Implementasikan `pickExports(source, names)`.  
- Input: `source` object, `names` array string.  
- Output: object baru dengan own property dari `names` yang ada di `source`.  
- Constraints utama: gunakan `hasOwnProperty` atau `Object.hasOwn` (modern).  
- Pattern utama: loop + assign (sama seperti `pick` pada object literal).

## 2) Jawaban Ideal Singkat (30-60 detik)

> Satu traversal `names`: jika own property, salin ke `out`. O(k) dengan k = panjang `names`. Memisahkan **public API** dari implementasi internal.

Struktur cepat:

- Observasi: mirip `export { a, b }` dari modul besar.  
- Strategi: for-loop + guard own property.  
- Edge: `names` kosong → `{}`.

## 3) Versi Ultra Singkat (10-20 detik)

> Loop `names` + `hasOwn` + assign.

## 4) Pseudocode Ringkas (5-10 baris)

```text
pickExports(source, names):
  out = {}
  untuk n dalam names:
    jika source punya own property n: out[n] = source[n]
  return out
```

## 5) Implementasi Final (Inti Saja)

```js
export function pickExports(source, names) {
  const out = {};
  for (const n of names) {
    if (Object.prototype.hasOwnProperty.call(source, n)) {
      out[n] = source[n];
    }
  }
  return out;
}
```

## 6) Bukti Correctness (Wajib)

- Tidak menyalin properti prototype chain yang tidak diminta.  
- Urutan kunci di `out` mengikuti iterasi `names` (ES2015+ object key order).

## 7) Dry Run Singkat

- `pickExports({ a: 1, b: 2, c: 3 }, ['a', 'c'])` → `{ a: 1, c: 3 }`.

## 8) Red Flags (Yang Harus Dihindari)

- `for...in` tanpa filter — ikut inherited properties.  
- Menyalin getter sebagai snapshot — di sini akses value sekali (sesuai latihan).

## 9) Follow-up yang Sering Muncul

- Follow-up 1: `export type` / `import type` di TypeScript.  
- Follow-up 2: tree-shaking dan named vs default export.  
- Follow-up 3: barrel file yang re-export ratusan simbol — biaya bundler.

## 10) Trade-off Keputusan

- Opsi A (pick manual): eksplisit.  
- Opsi B (`export * from`): semua simbol — kurang kontrol.  
- Risiko: circular import di barrel.

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

## Template Drill Cepat (Isi < 2 Menit) — barrel re-export

- Tingkat kesulitan: Easy  
- Topik utama: sintaks ESM  
- Inti masalah: tulis `index.js` yang re-export `foo` dari `./lib.js`.  
- Contoh: `export { foo } from './lib.js';` atau `export { default as foo } from './lib.js'` tergantung ekspor.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
