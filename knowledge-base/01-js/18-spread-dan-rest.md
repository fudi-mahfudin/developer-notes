# Spread & rest

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: `...` untuk membuka vs mengumpulkan

**Rest** `...` mengumpulkan sisa elemen (array) atau sisa properti (object). **Spread** `...` membuka iterable / object ke dalam literal baru.

| Konteks | Arti |
|---------|------|
| `function f(...args)` | `args` array semua argumen |
| `const [a, ...rest]` | `rest` array sisa |
| `[...a, ...b]` | gabung (shallow) |
| `{ ...obj }` | salin enumerable own props (shallow) |

### Mengapa dipedulikan di interview & produksi?

- **Merge** konfigurasi (kiri → kanan) tanpa library.  
- **Immutability** UI: salin lalu timpa satu field dengan spread.  
- Memahami **shallow** vs deep untuk menghindari bug referensi bersama.

### Kesalahan umum

- Spread object **shallow** — nested object masih shared.  
- **Rest** harus **terakhir** di destructuring / parameter list.

---

# Contoh soal coding: `mergeAll` (merge shallow)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih spread/rest dan `Object.assign`. Struktur jawaban mengikuti template singkat coding test.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy  
- **Topik utama:** Spread/rest, merge dangkal  
- **Inti masalah:** Gabungkan banyak plain object **dari kiri ke kanan**; properti kanan menimpa kiri tanpa mutasi argumen.

---

- Soal: Implementasikan `mergeAll(...objects)`.  
- Input: nol atau lebih plain object.  
- Output: object baru hasil merge shallow.  
- Constraints utama: tanpa argumen → `{}`; jangan mutasi input.  
- Pattern utama: `Object.assign({}, ...objects)` atau reduce spread.

## 2) Jawaban Ideal Singkat (30-60 detik)

> `Object.assign` ke target `{}` menerapkan properti enumerable secara berurutan; objek belakang menang. Kompleksitas waktu O(total keys) kasar; ruang O(output). Tidak dalam merge nested.

Struktur cepat:

- Observasi: urutan sama dengan urutan argumen.  
- Strategi: `Object.assign` paling ringkas.  
- Edge: tidak ada argumen → `{}`.  
- Red flag: mutasi `objects[0]`.

## 3) Versi Ultra Singkat (10-20 detik)

> `return Object.assign({}, ...objects)`.

## 4) Pseudocode Ringkas (5-10 baris)

```text
mergeAll(...objects):
  target = {}
  untuk tiap obj dalam objects:
    salin properti enumerable ke target (assign)
  return target
```

## 5) Implementasi Final (Inti Saja)

```js
export function mergeAll(...objects) {
  return Object.assign({}, ...objects);
}
```

Varian spread murni: `return { ...objects.reduce((a, b) => ({ ...a, ...b }), {}) };` — lebih verbose.

## 6) Bukti Correctness (Wajib)

- Target baru `{}` tidak pernah alias ke argumen pemanggil.  
- Untuk kunci yang bentrok, nilai dari argumen terakhir yang menang.  
- Zero argumen: `assign` ke `{}` → `{}`.

## 7) Dry Run Singkat

- `mergeAll({ a: 1 }, { b: 2 }, { a: 3 })` → `{ a: 3, b: 2 }`.  
- `mergeAll()` → `{}`.

## 8) Red Flags (Yang Harus Dihindari)

- `Object.assign(objects[0], ...)` — mutasi objek pertama.  
- Asumsi **deep merge** — soal ini shallow saja.

## 9) Follow-up yang Sering Muncul

- Follow-up 1: `mergeDeep` dengan rekursi + batas kedalaman.  
- Follow-up 2: prototype pollution saat merge dari input user — validasi kunci.  
- Follow-up 3: `structuredClone` untuk salin dalam.

## 10) Trade-off Keputusan

- Opsi A (`Object.assign`): satu baris, mudah dibaca.  
- Opsi B (loop manual): kontrol properti mana yang disalin.  
- Risiko: getter/setter ikut perilaku `assign`.

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

## Template Drill Cepat (Isi < 2 Menit) — variasi `tail`

- Tingkat kesulitan: Easy  
- Topik utama: rest array  
- Inti masalah: `const [head, ...tail] = arr` — `tail` untuk array kosong?  
- Strategi: definisikan perilaku edge (mis. `head` undefined, `tail` []).  
- 1 potensi bug: mutasi `tail` memengaruhi tidak? (tidak — salinan array baru untuk rest).

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
