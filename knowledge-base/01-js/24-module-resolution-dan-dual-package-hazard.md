# Module resolution & “dual package hazard”

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: satu paket, dua dunia?

**Module resolution** (Node): algoritma mencari file untuk `require('x')` / `import 'x'` — `node_modules`, `exports` di `package.json`, ekstensi `.js` / `.mjs` / `.cjs`.

**Dual package hazard**: paket menerbitkan **CJS dan ESM**; jika aplikasi memuat **dua salinan** (satu via `require`, satu via `import`), **identitas** (mis. `instanceof`, singleton) bisa pecah.

### Mengapa dipedulikan di interview & produksi?

- Bug **dua instance** kelas/library sulit dilacak dan sering muncul setelah migrasi ESM.  
- Field **`exports`** di `package.json` adalah kontrak resmi surface modul di ekosistem Node modern.  
- Helper **interop** mengurangi gesekan saat menggabungkan kode lama dan baru.

### Mitigasi (konsep)

- Field **`exports`** di `package.json` untuk surface konsisten.  
- Hindari dua instance kelas untuk satu konsep — dokumentasi / satu gaya import.

### Kesalahan umum

- Menganggap `default` CJS sama dengan ESM — perlu interop.

---

# Contoh soal coding: `interopDefault` (CJS / ESM)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih helper interop modul. Struktur jawaban mengikuti template singkat coding test.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy  
- **Topik utama:** bentuk namespace modul, `default`  
- **Inti masalah:** Dari nilai `m` (namespace atau `module.exports`-like), ambil “isi utama”.

---

- Soal: Implementasikan `interopDefault(m)`.
- Input: object modul (boleh `null` / `undefined` untuk guard).
- Output: `m.default` jika ada dan tidak `undefined`; jika tidak, kembalikan `m` (kecuali nullish).
- Constraints utama: tangani `m === null` tanpa throw jika API mengizinkan.
- Pattern utama: cek `default` eksplisit vs nullish coalescing.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Banyak bundler membungkus CJS sebagai `{ default: exports }`. ESM native sering punya `.default` untuk export default. Helper ini memilih satu perilaku konsisten. O(1).

Struktur cepat:

- Observasi: `??` vs `in` — namespace tanpa `default` tidak boleh jadi `undefined` mendadak.  
- Strategi: `m.default !== undefined ? m.default : m` setelah null check.  
- Edge: modul dengan `default: undefined` — jarang; perlu kontrak tim.

## 3) Versi Ultra Singkat (10-20 detik)

> Setelah null check, prefer `default` jika ada.

## 4) Pseudocode Ringkas (5-10 baris)

```text
interopDefault(m):
  jika m null/undefined: return m
  jika m.default !== undefined: return m.default
  return m
```

## 5) Implementasi Final (Inti Saja)

```js
export function interopDefault(m) {
  if (m == null) return m;
  return m.default !== undefined ? m.default : m;
}
```

## 6) Bukti Correctness (Wajib)

- Untuk `{ default: fn }`, mengembalikan `fn`.  
- Untuk `{ x: 2 }` tanpa `default`, mengembalikan objek penuh (sesuai kontrak latihan).

## 7) Dry Run Singkat

- `interopDefault({ default: 1, x: 2 })` → `1`.  
- `interopDefault({ x: 2 })` → `{ x: 2 }`.

## 8) Red Flags (Yang Harus Dihindari)

- Selalu `m.default` — menghancurkan namespace star import murni.  
- `m?.default ?? m` — bisa salah jika `default` adalah nilai `null` yang valid (langka).

## 9) Follow-up yang Sering Muncul

- Follow-up 1: `package.json` `"exports"` dengan `import` / `require`.  
- Follow-up 2: dua kopi singleton — dokumentasi “hanya ESM”.  
- Follow-up 3: `__esModule` flag legacy bundler.

## 10) Trade-off Keputusan

- Opsi A (helper generik): satu fungsi untuk banyak library.  
- Opsi B (import spesifik per paket): tidak perlu helper.  
- Risiko: kontrak `default` tidak seragam.

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

## Template Drill Cepat (Isi < 2 Menit) — baca dokumentasi

- Tingkat kesulitan: Konsep  
- Topik utama: dual package hazard  
- Inti masalah: baca dokumentasi Node/npm tentang hazard dua salinan paket.  
- Output: satu kalimat mengapa `instanceof` bisa gagal.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
