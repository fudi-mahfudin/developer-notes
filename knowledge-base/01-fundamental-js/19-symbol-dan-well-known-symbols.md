# `Symbol` & well-known symbols

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: mengapa ada `Symbol`?

**`Symbol`** adalah tipe primitive **unik** (kecuali `Symbol.for` di registry global). Berguna untuk **kunci properti** yang tidak bentrok dengan string user, dan untuk **metadata** protokol (`Symbol.iterator`, dll.).

### Well-known symbols (contoh)

| Symbol | Peran |
|--------|--------|
| `Symbol.iterator` | protokol `for...of` |
| `Symbol.toStringTag` | `Object.prototype.toString` |
| `Symbol.asyncIterator` | `for await...of` |

### Contoh

```js
const id = Symbol('id');
const o = { [id]: 123 };
```

### Kesalahan umum

- Dua `Symbol('x')` **tidak** sama — gunakan `Symbol.for('x')` jika butuh idempoten global.  
- Deskripsi string hanya untuk debugging (`description`), bukan untuk equality.

---

# Contoh soal coding: `createNamespace` (factory symbol)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih `Symbol`, closure, dan computed property. Struktur jawaban mengikuti template singkat coding test.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy  
- **Topik utama:** `Symbol`, factory, closure  
- **Inti masalah:** Kembalikan fungsi yang setiap pemanggilan menghasilkan **symbol baru** berlabel deskripsi tetap.

---

- Soal: Implementasikan `createNamespace(desc)` yang mengembalikan fungsi `() => Symbol(desc)`.  
- Input: string `desc`.  
- Output: fungsi; tiap invoke mengembalikan symbol **unik** baru.  
- Constraints utama: hindari `Symbol.for` kecuali disengaja (registry global).  
- Pattern utama: closure menyimpan `desc`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> `Symbol(desc)` setiap call menghasilkan identitas baru; closure menutup `desc` sehingga label konsisten. O(1) per call.

Struktur cepat:

- Observasi: unik per call adalah kontrak `Symbol()` (bukan `for`).  
- Strategi: `return () => Symbol(desc)`.  
- Edge: `desc` boleh string kosong.

## 3) Versi Ultra Singkat (10-20 detik)

> Factory yang mengembalikan `() => Symbol(desc)`.

## 4) Pseudocode Ringkas (5-10 baris)

```text
createNamespace(desc):
  return fungsi:
    return Symbol(desc) baru tiap panggilan
```

## 5) Implementasi Final (Inti Saja)

```js
export function createNamespace(desc) {
  return () => Symbol(desc);
}
```

## 6) Bukti Correctness (Wajib)

- Dua panggilan fungsi hasil `createNamespace` menghasilkan symbol berbeda.  
- Label `desc` tidak mengubah equality symbol.

## 7) Dry Run Singkat

- `const next = createNamespace('x'); next() !== next()` bernilai `true`.

## 8) Red Flags (Yang Harus Dihindari)

- Mengembalikan **satu** `Symbol` yang dibuat sekali — tidak fresh per call.  
- Memakai `Symbol.for` tanpa memahami registry global.

## 9) Follow-up yang Sering Muncul

- Follow-up 1: well-known `Symbol.iterator` pada koleksi custom.  
- Follow-up 2: `Symbol.toStringTag` untuk nama tipe di `Object.prototype.toString`.  
- Follow-up 3: `Symbol.asyncIterator` untuk async iterable.

## 10) Trade-off Keputusan

- Opsi A (`Symbol`): tidak bentrok string key.  
- Opsi B (prefix string `__internal__`): mudah tabrak konvensi user.  
- Risiko: JSON.stringify mengabaikan symbol key secara default.

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

## Template Drill Cepat (Isi < 2 Menit) — iterable mini

- Tingkat kesulitan: Easy–Medium  
- Topik utama: `Symbol.iterator`  
- Inti masalah: objek dengan `[Symbol.iterator]` yang yield `1,2,3`.  
- Strategi: iterator manual atau `function*`.  
- 1 potensi bug: lupa `done: true` di akhir.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
