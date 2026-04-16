# Higher-order function (HOF)

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: apa itu HOF?

**Higher-order function** adalah fungsi yang:

1. **Menerima fungsi lain sebagai argumen**, dan/atau  
2. **Mengembalikan fungsi** sebagai hasil.

Ini bukan sintaks khusus JavaScript, melainkan **pola** yang dipakai terus di API standar (`Array.prototype.map`, `addEventListener`, `setTimeout`, dll.) dan di kode aplikasi (middleware, hooks, builder).

### Mengapa dipedulikan di interview & produksi?

- Memisahkan **apa yang dilakukan** (logika bisnis) dari **kapan / berapa kali** (iterasi, event, retry).
- Mendukung **komposisi**: fungsi kecil digabung jadi alur besar tanpa menyalin loop.
- Menuntut pemahaman **closure** dan **nilai vs referensi fungsi** saat fungsi disimpan atau dikembalikan.

### HOF di API bawaan (yang sering ditanya)

| API | Peran argumen fungsi | Catatan cepat |
|-----|----------------------|---------------|
| `array.map(fn)` | `fn` mengubah tiap elemen | Mengembalikan **array baru** (panjang sama). |
| `array.filter(fn)` | `fn` boolean predikat | Elemen lolos ujian. |
| `array.reduce(fn, init?)` | `fn(akumulator, item)` | Satu nilai akhir; sangat fleksibel. |
| `array.sort(compare?)` | Comparator `(a,b) => number` | Mutasi **in-place**; comparator salah = urutan aneh. |
| `arr.flatMap(fn)` | `map` + `flat` satu lapis | Berguna untuk “expand” tiap item. |

### Contoh singkat per API

#### `map` — transformasi satu-satu, panjang tetap

```js
const ids = [1, 2, 3];
const doubles = ids.map((n) => n * 2); // [2, 4, 6]
// callback: (element, index?, array?) => nilai_baru
```

#### `filter` — menyisakan elemen yang lolos predikat

```js
const scores = [40, 55, 70, 90];
const pass = scores.filter((s) => s >= 60); // [70, 90]
// callback mengembalikan truthy/falsy
```

#### `reduce` — lipat array jadi satu nilai (akumulator)

```js
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, x) => acc + x, 0); // 10
// tanpa init: elemen pertama jadi init (hati-hati jika array kosong)
```

#### `sort` — urut in-place dengan comparator

```js
const pairs = [3, 1, 2];
pairs.sort((a, b) => a - b); // [1, 2, 3] — mengurutkan naik
// string: 'a'.localeCompare('b')
// mutasi array asli; salin dulu jika perlu: [...pairs].sort(...)
```

#### `flatMap` — `map` lalu `flat` satu tingkat

```js
const sentences = ['a b', 'c'];
const words = sentences.flatMap((s) => s.split(' ')); // ['a','b','c']
// setara: map(...).flat(1) dengan satu alokasi alur yang lebih mudah dibaca
```

### Pola “fungsi mengembalikan fungsi”

Contoh umum: **factory** atau **partial application**.

```js
function multiply(factor) {
  return (n) => n * factor;
}

const triple = multiply(3);
triple(4); // 12
```

Di sini `multiply` adalah HOF karena **return**-nya fungsi.

### Kesalahan umum

- **Mutasi samping** di dalam `map`/`filter` (misalnya push ke array global) — sulit diramal dan dirakit ulang.
- **Arrow vs function** saat butuh `this` dari pemanggil — HOF callback sering pakai arrow; aturan ini berkaitan materi terpisah (`this`).
- **Rantai `map`/`filter`/`map`** pada array sangat besar — tetap O(n) per langkah; kadang satu `reduce` atau satu loop lebih jelas dan hemat alokasi.

---

# Contoh soal coding: `pipe` (komposisi fungsi)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih HOF. Struktur jawaban mengikuti template singkat coding test.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium *(setara latihan “tulis utility kecil” di whiteboard)*  
- **Topik utama:** Higher-order function, functional composition  
- **Inti masalah:** Gabungkan beberapa fungsi **unary** (satu argumen) menjadi **satu** fungsi yang mengeksekusi dari kiri ke kanan.

---

- Soal: Implementasikan `pipe(...fns)` sedemikian sehingga `pipe(f, g, h)(x)` sama dengan `h(g(f(x)))`.  
- Input: daftar fungsi `fns` (tiap fungsi menerima satu argumen); argumen kedua nanti adalah `x` saat dipanggil.  
- Output: sebuah fungsi tunggal yang menerima `x` dan mengembalikan hasil komposisi.  
- Constraints utama: `fns` bisa kosong; jika kosong, kembalikan **identity** `x => x`.  
- Pattern utama: HOF (fungsi yang mengembalikan fungsi; argumen berupa fungsi)

## 2) Jawaban Ideal Singkat (30-60 detik)

> Komposisi kiri-ke-kanan berarti mengurutkan penerapan: mulai dari `x`, lalu untuk setiap `f` berturut-turut ganti nilai menjadi `f(nilai_sekarang)`. Tanpa trik khusus; satu `reduce` pada daftar fungsi atau loop sederhana. Kompleksitas waktu O(k) untuk k fungsi per pemanggilan akhir; ruang O(1) tambahan jika tidak membuat closure berlebihan. Edge: daftar kosong harus identitas; pastikan tidak memanggil fungsi jika tidak ada.

Struktur cepat:

- Observasi inti masalah: urutan eksekusi pasti linear mengikuti urutan `fns`.  
- Strategi final yang dipilih: `reduce((v, f) => f(v), x)` dari kiri ke kanan, atau loop `v = f(v)`.  
- Kenapa strategi ini paling cocok: langsung mencerminkan definisi pipe tanpa rekursi.  
- Time complexity: O(k) per invokasi `pipe(...)(x)` dengan k = `fns.length`.  
- Space complexity: O(1) ekstra (tidak menyimpan struktur baru selain variabel lokal).  
- Edge case utama: `fns.length === 0` → identity.

## 3) Versi Ultra Singkat (10-20 detik)

> Reduce nilai awal `x` dengan setiap fungsi berurutan; jika tidak ada fungsi, kembalikan `x`.

## 4) Pseudocode Ringkas (5-10 baris)

```text
pipe(fns):
  return (x) ->
    jika fns kosong, return x
    v = x
    untuk tiap f dalam fns:
      v = f(v)
    return v
```

## 5) Implementasi Final (Inti Saja)

```js
export function pipe(...fns) {
  return (x) => fns.reduce((v, f) => f(v), x);
}
```

Varian eksplisit edge `fns.length === 0` sudah tercakup: `reduce` pada array kosong dengan initial `x` mengembalikan `x`.

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: setelah iterasi ke-i, `v` sama dengan menerapkan `fns[0]…fns[i-1]` berurutan ke `x`.  
- Kenapa semua kasus valid tercakup: satu definisi untuk k panjang berapa pun; k=0 mempertahankan `x`.  
- Kenapa tidak ada kasus yang terlewat: setiap `f` dipanggil tepat sekali dan berurutan.

## 7) Dry Run Singkat

- Kasus normal: `pipe(x => x + 1, x => x * 2)(3)` → `(3+1)*2` = 8.  
- Kasus edge: `pipe()(100)` → 100.  
- Hasil: sesuai definisi pipe.

## 8) Red Flags (Yang Harus Dihindari)

- Mengira urutan sama dengan `compose` (kanan-ke-iri) dan menerapkan dari belakang tanpa sadar.  
- Memanggil `fns` dengan konteks `this` yang salah jika nanti fungsi mengandalkan `this` (di latihan ini diasumsikan unary murni).  
- Membuat array perantara baru berkali-kali tanpa perlu (kurang relevan di solusi minimal di atas).

## 9) Follow-up yang Sering Muncul

- Follow-up 1 (optimasi):  
  - Jawaban ideal singkat: Untuk k kecil, tidak perlu optimasi; untuk banyak layer, pertimbangkan satu fungsi inlined oleh bundler atau dokumentasi batasan.  
- Follow-up 2 (trade-off):  
  - Jawaban ideal singkat: `pipe` vs `compose` hanya urutan; pilih konvensi tim.  
- Follow-up 3 (variasi soal):  
  - Jawaban ideal singkat: Implementasikan `compose(...fns)` dengan `reduceRight` atau urutan terbalik.

## 10) Trade-off Keputusan

- Opsi A (loop `for`): lebih mudah dibaca beberapa developer.  
- Opsi B (`reduce`): lebih padat dan idiomatik untuk HOF.  
- Kenapa memilih opsi final: `reduce` satu baris inti dan jelas.  
- Risiko dari opsi final: pembaca yang kurang biasa dengan `reduce`.  
- Mitigasi: beri nama helper atau komentar satu baris definisi pipe.

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

## Template Drill Cepat (Isi < 2 Menit) — variasi `once`

- Tingkat kesulitan: Easy  
- Topik utama: HOF + closure  
- Inti masalah (1 kalimat): Bungkus `fn` agar hanya dieksekusi pada pemanggilan pertama dan mengembalikan nilai itu pada pemanggilan berikutnya.  
- Soal: Implementasikan `once(fn)` → fungsi baru; pemanggilan kedua ke atas mengembalikan hasil pertama tanpa menjalankan `fn` lagi.  
- Strategi final: simpan `called` / `result` dalam closure; pada pemanggilan pertama jalankan `fn`, lalu cache.  
- Kompleksitas: waktu O(1) per call amortized; ruang O(1) untuk state.  
- 2 edge case: `fn` melempar error (putuskan apakah error di-cache); dipanggil tanpa argumen vs banyak argumen (`...args`).  
- 1 potensi bug: lupa mengikat `this` jika `fn` adalah method object.  
- 1 alasan solusi ini valid: invariant “setelah pertama, tidak ada side effect tambahan dari `fn`”.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
