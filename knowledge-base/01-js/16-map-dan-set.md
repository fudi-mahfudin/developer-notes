# `Map` / `Set`

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: kapan memakai `Map` dan `Set`?

**`Set`** menyimpan **nilai unik** (perbandingan `SameValueZero`, mirip `===` kecuali `NaN` dianggap sama). **`Map`** menyimpan **pasangan kunci–nilai** dengan kunci **sembarang** (termasuk objek), tidak memaksa string seperti `Object`.

### Mengapa dipedulikan di interview & produksi?

- **`Set`** adalah jawaban standar **dedup** dan keanggotaan O(1) rata-rata.  
- **`Map`** cocok untuk **frekuensi**, **cache** dengan kunci non-string, dan menjaga **urutan sisipan** (berguna saat iterasi).  
- Membedakan **key object identity** vs “sama secara nilai” menghindari bug halus.

### Kapan `Map` vs objek biasa?

| Aspek | `Map` | Object literal |
|--------|--------|----------------|
| Kunci | tipe apa pun | string / symbol |
| Ukuran | `map.size` | hitung manual |
| Iterasi | urutan sisipan (ES2015+) | tidak selalu intuitif |

### Contoh singkat per API

#### `Set` — dedup

```js
const u = [...new Set([1, 1, 2, 3])]; // [1, 2, 3]
```

#### `Map` — hitung frekuensi

```js
const m = new Map();
for (const x of ['a', 'b', 'a']) {
  m.set(x, (m.get(x) ?? 0) + 1);
}
```

### Kesalahan umum

- Mengira `Set` menyimpan **objek** “sama” berdasarkan isi — yang dibandingkan **referensi**.  
- Menggunakan `map[key]` — gunakan `map.get(key)` / `set`.

---

# Contoh soal coding: `uniqueInOrder` (urutan pertama tetap)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih `Set` dan urutan. Struktur jawaban mengikuti template singkat coding test.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy *(setara latihan utility array di whiteboard)*  
- **Topik utama:** `Set`, kompleksitas, urutan elemen  
- **Inti masalah:** Hilangkan duplikat tetapi pertahankan **kemunculan pertama** (bukan sekadar “unik” tanpa jaminan urutan soal).

---

- Soal: Implementasikan `uniqueInOrder(arr)`.  
- Input: array (primitive atau referensi).  
- Output: array baru: tiap nilai muncul sekali, urutan sama dengan kemunculan pertama di input.  
- Constraints utama: satu pass linear; tidak mengubah array input.  
- Pattern utama: `Set` sebagai “sudah pernah?” + `push` bersyarat.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Satu traversal: jika `x` belum ada di `Set`, tambahkan ke `Set` dan ke array hasil. Kompleksitas waktu O(n), ruang O(n) untuk `Set` + hasil. Ini membedakan dari `[...new Set(arr)]` yang pada praktik sering sama untuk primitive, tetapi loop eksplisit memperjelas invariant “kemunculan pertama”.

Struktur cepat:

- Observasi inti: urutan output mengikuti **scan kiri-ke-kanan**; `Set` hanya memutuskan skip atau tidak.  
- Strategi final: `for...of` + `seen.has` / `add`.  
- Kenapa cocok: satu struktur, tidak sort, tidak nested loop.  
- Time complexity: O(n).  
- Space complexity: O(n) untuk `Set` (dan output).  
- Edge case utama: array kosong → `[]`; objek berbeda referensi = entri berbeda.

## 3) Versi Ultra Singkat (10-20 detik)

> Satu loop: `Set` tandai pernah; push jika baru.

## 4) Pseudocode Ringkas (5-10 baris)

```text
uniqueInOrder(arr):
  seen = Set baru
  out = []
  untuk x dalam arr:
    jika not seen.has(x):
      seen.add(x)
      out.push(x)
  return out
```

## 5) Implementasi Final (Inti Saja)

```js
export function uniqueInOrder(arr) {
  const seen = new Set();
  const out = [];
  for (const x of arr) {
    if (!seen.has(x)) {
      seen.add(x);
      out.push(x);
    }
  }
  return out;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant: setelah memproses prefix input, `out` berisi unik dari prefix dengan urutan kemunculan pertama.  
- Setiap `x` masuk `out` paling banyak sekali; jika duplikat, dilewati setelah pertama.  
- Kasus valid tercakup: kosong, satu elemen, semua sama, campuran tipe.

## 7) Dry Run Singkat

- Kasus normal: `[1, 2, 1, 3]` → `[1, 2, 3]`.  
- Kasus edge: `[]` → `[]`.  
- Catatan: dua objek `{}` berbeda dianggap dua entri (referensi beda).

## 8) Red Flags (Yang Harus Dihindari)

- Mengandalkan sort lalu unik — mengubah urutan / definisi “pertama”.  
- Memutasi array input untuk “menandai” — efek samping.  
- Mengira `Set` membandingkan isi objek secara dalam.

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (variasi):  
  - Jawaban ideal singkat: `uniqueBy(arr, keyFn)` dengan `Map` dari kunci hasil fungsi.  
- Follow-up 2 (performa):  
  - Jawaban ideal singkat: untuk integer terbatas rentang kecil, array boolean bisa menang — tidak umum di JS interview.  
- Follow-up 3 (API):  
  - Jawaban ideal singkat: `Map` untuk frekuensi kata dalam teks.

## 10) Trade-off Keputusan

- Opsi A (`[...new Set(arr)]`): ringkas; urutan Set dari iterasi input biasanya konsisten dengan sisipan, tetapi soal ini menekankan invariant secara eksplisit.  
- Opsi B (loop + `Set`): lebih mudah dijelaskan di whiteboard.  
- Kenapa memilih opsi final: kejelasan invariant “pertama kali”.  
- Risiko: pembaca mengharapkan satu baris.  
- Mitigasi: komentar satu baris bahwa ini ekuivalen perilaku untuk kasus umum.

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

## Template Drill Cepat (Isi < 2 Menit) — variasi `countOccurrences`

- Tingkat kesulitan: Easy  
- Topik utama: `Map`  
- Inti masalah (1 kalimat): Hitung berapa kali tiap nilai muncul di array, kembalikan `Map` nilai → count.  
- Soal: `countOccurrences(arr)` → `Map` dengan `get`/`set`.  
- Strategi final: satu loop; `m.set(x, (m.get(x) ?? 0) + 1)`.  
- Kompleksitas: waktu O(n); ruang O(jumlah unik).  
- 2 edge case: array kosong; nilai `NaN` (perilaku `Map`/`SameValueZero`).  
- 1 potensi bug: memakai object sebagai key tanpa sadar identitas.  
- 1 alasan solusi ini valid: satu pass, struktur data tepat.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
