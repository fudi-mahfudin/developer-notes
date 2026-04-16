# Unicode & `Intl`

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: string, locale, dan Intl

**String JavaScript** adalah urutan UTF-16 code unit; **grapheme** bisa beberapa code point. **`Intl`** menyediakan sort, format angka/tanggal, plural sesuai locale.

### Mengapa dipedulikan di interview & produksi?

- Sort **abjad** bahasa salah jika memakai `sort()` default saja.  
- Format **mata uang / tanggal** harus konsisten per locale pengguna.  
- Asumsi **satu kode unit = satu huruf** gagal untuk emoji dan beberapa aksara.

### Contoh penting

| API | Peran |
|-----|--------|
| `Intl.Collator` | perbandingan string locale-aware |
| `Intl.DateTimeFormat` | format tanggal |
| `Intl.NumberFormat` | format angka / mata uang |
| `String.prototype.localeCompare` | bandingkan dengan locale |

### Kesalahan umum

- `Array.prototype.sort` default bukan abjad bahasa - gunakan `localeCompare` atau `Collator`.
- Asumsi satu `str[i]` = satu user-perceived character - salah untuk surrogate/emoji.

---

# Contoh soal coding: `localeSort` (sort salinan)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih `localeCompare` dan immutability array. Struktur jawaban mengikuti template singkat coding test.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy
- **Topik utama:** `Intl`, `localeCompare`, sort
- **Inti masalah:** Urutkan salinan array string menurut aturan locale, tanpa mutasi input.

---

- Soal: Implementasikan `localeSort(arr, locale)`.
- Input: `arr` array string; `locale` string atau `undefined` (default environment).
- Output: array baru terurut.
- Constraints utama: jangan memanggil `sort` pada `arr` asli.
- Pattern utama: `[...arr].sort((a, b) => a.localeCompare(b, locale))`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> `localeCompare` dengan locale memilih aturan pengurutan bahasa. Duplikasi array menjaga input. Kompleksitas O(n log n) perbandingan pada umumnya.

Struktur cepat:

- Observasi: sort default ASCII/UTF-16 tidak cocok untuk teks manusia.
- Strategi: salin lalu sort dengan comparator locale.
- Edge: `locale` undefined memakai default engine.

## 3) Versi Ultra Singkat (10-20 detik)

> `[...arr].sort` + `localeCompare`.

## 4) Pseudocode Ringkas (5-10 baris)

```text
localeSort(arr, locale):
  copy = salin arr
  sort copy dengan (a,b) => a.localeCompare(b, locale)
  return copy
```

## 5) Implementasi Final (Inti Saja)

```js
export function localeSort(arr, locale) {
  return [...arr].sort((a, b) => a.localeCompare(b, locale));
}
```

## 6) Bukti Correctness (Wajib)

- `arr` referensi tidak berubah.
- Urutan konsisten dengan `localeCompare` untuk pasangan yang sama.

## 7) Dry Run Singkat

- `localeSort(['b', 'a', 'c'], 'id')` menghasilkan urutan sesuai aturan locale `id`.

## 8) Red Flags (Yang Harus Dihindari)

- `arr.sort()` langsung - mutasi.
- Mengabaikan opsi `numeric: true` untuk angka dalam string jika kebutuhan bisnis meminta.

## 9) Follow-up yang Sering Muncul

- Follow-up 1: `Intl.Collator` dengan cache untuk banyak sort.
- Follow-up 2: `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })`.
- Follow-up 3: `Intl.Segmenter` untuk grapheme (environment baru).

## 10) Trade-off Keputusan

- Opsi A (`localeCompare`): sederhana.
- Opsi B (`Collator`): lebih cepat jika comparator dipakai berulang.

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

## Template Drill Cepat (Isi < 2 Menit) - Rupiah

- Tingkat kesulitan: Easy
- Topik utama: `Intl.NumberFormat`
- Inti masalah: format Rupiah dengan `new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(n)`.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
