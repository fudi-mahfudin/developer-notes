# Source maps & debugging produksi

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: mengaitkan bundle ke source asli

Source map memetakan kode hasil build/minify ke file sumber agar stack trace dan debugging lebih bermakna.

### Mengapa dipedulikan di interview & produksi?

- Error produksi lebih cepat diinvestigasi.  
- Perlu trade-off keamanan (jangan bocorkan source sensitif).  
- Menentukan kualitas observability.

---

# Contoh soal coding: `normalizeStackLine`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Easy-Medium  
- **Topik utama:** parsing stack line  
- **Inti masalah:** Ekstrak `file:line:column` dari satu baris stack trace.

---

- Soal: `normalizeStackLine(line)` -> object atau null.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Gunakan regex sederhana untuk menangkap pola akhir `:line:column`.

## 3) Versi Ultra Singkat (10-20 detik)

> Parse baris stack jadi struktur data.

## 4) Pseudocode Ringkas (5-10 baris)

```text
normalizeStackLine(line):
  cocokkan regex /(.*):(\d+):(\d+)/
  jika tidak cocok return null
  return { file, line, column }
```

## 5) Implementasi Final (Inti Saja)

```js
export function normalizeStackLine(line) {
  const m = line.match(/^(.*):(\d+):(\d+)$/);
  if (!m) return null;
  return { file: m[1], line: Number(m[2]), column: Number(m[3]) };
}
```

## 6) Bukti Correctness (Wajib)

- Pola valid menghasilkan angka line/column.  
- Pola non-standar aman return `null`.

## 7) Dry Run Singkat

- `"app.min.js:1:234"` -> `{ file:'app.min.js', line:1, column:234 }`.

## 8) Red Flags (Yang Harus Dihindari)

- Ekspos full source map publik tanpa pertimbangan.  
- Mengandalkan satu format stack lintas browser.

## 9) Follow-up yang Sering Muncul

- Hidden source maps.  
- Upload sourcemap ke error tracker.

## 10) Trade-off Keputusan

- Debuggability tinggi vs risiko kebocoran source.

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

- Tambah parser untuk format stack `"at fn (file:line:col)"`.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
