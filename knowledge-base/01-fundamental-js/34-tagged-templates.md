# Tagged templates

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: template literal + fungsi tag

Tagged template memungkinkan string literal diproses oleh fungsi: `tag\`hello ${x}\`` memanggil `tag(strings, ...values)`.

### Mengapa dipedulikan di interview & produksi?

- Dasar DSL populer (`styled-components`, `lit`, query builder).  
- Memisahkan string statis dan nilai dinamis (penting untuk sanitasi).  
- Membuka peluang optimasi cache pada bagian statis.

### Contoh cepat

```js
function tag(strings, ...values) {
  return { strings, values };
}
```

### Kesalahan umum

- Mengira hasil tagged template selalu string.  
- Lupa `strings.length = values.length + 1`.

---

# Contoh soal coding: `joinTag` (render aman sederhana)

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium  
- **Topik utama:** tagged templates  
- **Inti masalah:** Gabungkan `strings` dan `values` jadi satu string akhir.

---

- Soal: Implementasikan tag `joinTag` yang menempelkan semua segmen berurutan.  
- Input: `strings` array literal, `...values`.  
- Output: string gabungan.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Lakukan loop pada `strings`, sisipkan `values[i]` di antara `strings[i]` dan `strings[i+1]`. O(n) terhadap jumlah segmen.

Struktur cepat:

- Observasi: format interleave tetap.  
- Strategi: concat berurutan pakai `for`.  
- Edge case: tanpa value, hasil sama dengan `strings[0]`.

## 3) Versi Ultra Singkat (10-20 detik)

> Interleave `strings` dan `values` secara linear.

## 4) Pseudocode Ringkas (5-10 baris)

```text
joinTag(strings, ...values):
  out = ""
  untuk i di strings:
    out += strings[i]
    jika i < values.length: out += values[i]
  return out
```

## 5) Implementasi Final (Inti Saja)

```js
export function joinTag(strings, ...values) {
  let out = '';
  for (let i = 0; i < strings.length; i += 1) {
    out += strings[i];
    if (i < values.length) out += String(values[i]);
  }
  return out;
}
```

## 6) Bukti Correctness (Wajib)

- Setiap segmen literal ditulis tepat sekali.  
- Setiap nilai interpolasi disisipkan di posisi benar.

## 7) Dry Run Singkat

- `joinTag\`a${1}b${2}c\`` -> `"a1b2c"`.

## 8) Red Flags (Yang Harus Dihindari)

- Salah asumsi jumlah elemen `strings` dan `values`.  
- Konversi nilai kompleks tanpa kebijakan (`JSON.stringify` vs `String`).

## 9) Follow-up yang Sering Muncul

- Follow-up 1: escape HTML di setiap value.  
- Follow-up 2: cache berdasarkan `strings.raw`.  
- Follow-up 3: validasi placeholder tertentu.

## 10) Trade-off Keputusan

- Opsi A (loop): mudah dibaca.  
- Opsi B (`reduce`): ringkas tapi lebih padat.

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

## Template Drill Cepat (Isi < 2 Menit) - `htmlTag`

- Tingkat kesulitan: Medium  
- Topik utama: tagged template  
- Inti masalah: escape interpolasi agar aman untuk context teks HTML.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
