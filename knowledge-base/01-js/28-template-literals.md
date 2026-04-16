# Template literals

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: backtick dan interpolasi

**Template literal** (backtick) mendukung **interpolasi** `${expr}` dan string multi-baris. **Tagged template** memanggil fungsi dengan argumen khusus (raw string, cooked).

### Mengapa dipedulikan di interview & produksi?

- DSL seperti **styled-components** / **lit** memakai tagged template.  
- Multi-baris string mengurangi concat error-prone.  
- Membedakan **interpolasi** vs **tagged** menghindari salah paham di code review.

### Contoh

```js
const n = 2;
const s = `n + 1 = ${n + 1}`;
```

### Tagged (ringkas)

```js
function tag(strings, ...values) {
  return strings[0] + values.join(',');
}
tag`a${1}b`;
```

### Kesalahan umum

- `String.raw` vs escape - perbedaan backslash.
- Tagged template bukan pemanggilan fungsi biasa - bentuk khusus.

---

# Contoh soal coding: `htmlEscape` (teks aman)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih manipulasi string dan urutan replace. Struktur jawaban mengikuti template singkat coding test.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy
- **Topik utama:** string, escaping HTML dasar
- **Inti masalah:** Ganti karakter kritis agar aman sebagai teks HTML (latihan, bukan pengganti sanitasi penuh).

---

- Soal: Implementasikan `htmlEscape(str)`.
- Input: string.
- Output: string dengan `&`, `<`, `>`, `"` di-escape.
- Constraints utama: `&` harus diganti **dulu** sebelum entitas lain.
- Pattern utama: `replaceAll` berantai.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Urutan penting: `&` dulu ke `&amp;`, lalu `<`, `>`, `"`. Satu pass per `replaceAll`; total O(n) per operasi. Ini latihan string, bukan solusi XSS lengkap.

Struktur cepat:

- Observasi: jika `&` tidak pertama, bisa double-escape tergantung input.
- Strategi: rantai `replaceAll` dengan urutan tetap.
- Edge: string kosong tetap kosong.

## 3) Versi Ultra Singkat (10-20 detik)

> `&` dulu, lalu `<`, `>`, `"`.

## 4) Pseudocode Ringkas (5-10 baris)

```text
htmlEscape(str):
  ganti & -> &amp;
  ganti < -> &lt;
  ganti > -> &gt;
  ganti " -> &quot;
  return str
```

## 5) Implementasi Final (Inti Saja)

```js
export function htmlEscape(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
```

## 6) Bukti Correctness (Wajib)

- Tidak membuat `&` baru sebelum langkah `&` pertama selesai.
- Output stabil untuk input tanpa karakter kritis.

## 7) Dry Run Singkat

- `htmlEscape('<a>')` mengembalikan `&lt;a&gt;`.

## 8) Red Flags (Yang Harus Dihindari)

- Mengira escape ini cukup untuk `innerHTML` - konteks atribut vs teks berbeda.
- Lupa escape `'` jika konteks atribut single-quoted.

## 9) Follow-up yang Sering Muncul

- Follow-up 1: tagged template `html` (lit).
- Follow-up 2: `textContent` vs `innerHTML`.
- Follow-up 3: CSP dan sanitasi server-side.

## 10) Trade-off Keputusan

- Opsi A (`replaceAll`): jelas.
- Opsi B (satu regex): bisa lebih ringkas tapi lebih sulit dibaca.

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

## Template Drill Cepat (Isi < 2 Menit) - tagged `sql`

- Tingkat kesulitan: Medium (konsep)
- Topik utama: tagged template
- Inti masalah: rancang tagged template yang menolak interpolasi mentah (parameterized query) - hanya konsep.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
