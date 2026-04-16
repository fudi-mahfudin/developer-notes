# Destructuring

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: destructuring array & objek

**Destructuring** mengekstrak nilai dari **array** atau properti dari **objek** ke variabel dengan sintaks ringkas. Mendukung **default value** dan **rest**.

### Mengapa dipedulikan di interview & produksi?

- Menyusun **parameter fungsi** (options object) menjadi rapi dan aman dengan default.  
- Menghindari **indeks magic** `parts[0]`, `parts[1]` ketika pola struktur jelas.  
- Dasar untuk pola **nested** data API (`const { data: { user } } = ...`).

### Contoh singkat

#### Array

```js
const [a, b = 0, ...rest] = [1];
// a=1, b=0, rest=[]
```

#### Object

```js
const { name, age = 0, ...rest } = { name: 'Ada' };
```

### Kesalahan umum

- Tanpa **default**, properti hilang → `undefined`.  
- Urutan **penting** untuk array; untuk object nama properti yang menentukan.

---

# Contoh soal coding: `splitPair` (parse `key=value`)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih destructuring array + default. Struktur jawaban mengikuti template singkat coding test.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy  
- **Topik utama:** Destructuring array, `split`, default  
- **Inti masalah:** Pecah string pada `=` **pertama**; bagian kanan boleh mengandung `=` lagi.

---

- Soal: Implementasikan `splitPair(s)`.  
- Input: string.  
- Output: `{ key, value }`; jika tidak ada `=`, `value` adalah `''`.  
- Constraints utama: gunakan `split` dengan limit; hindari memotong `=` di dalam value secara salah.  
- Pattern utama: `const [key, value = ''] = s.split('=', 2)`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> `split('=', 2)` menghasilkan paling banyak dua segmen: kunci dan sisa string sebagai nilai. Default `value = ''` menangani tidak ada `=`. Kompleksitas waktu O(n) panjang string untuk `split`.

Struktur cepat:

- Observasi: `=` pertama adalah delimiter; sisanya adalah value mentah.  
- Strategi: destructuring + default.  
- Time complexity: O(n).  
- Space complexity: O(n) untuk substring hasil split (tergantung engine).  
- Edge case: string kosong → `{ key: '', value: '' }` (periksa definisi; bisa juga `{ key: '', value: '' }` jika split menghasilkan `['']` — sesuaikan tes).

## 3) Versi Ultra Singkat (10-20 detik)

> `[key, value = ''] = s.split('=', 2)` lalu return object.

## 4) Pseudocode Ringkas (5-10 baris)

```text
splitPair(s):
  [key, value = ''] = s.split '=', batas 2
  return { key, value }
```

## 5) Implementasi Final (Inti Saja)

```js
export function splitPair(s) {
  const [key, value = ''] = s.split('=', 2);
  return { key, value };
}
```

## 6) Bukti Correctness (Wajib)

- Hanya satu pemisahan pada `=` pertama karena limit 2.  
- Jika tidak ada `=`, `value` default `''` sesuai kontrak.  
- `'a=b=c'` → key `a`, value `b=c`.

## 7) Dry Run Singkat

- `'a=b=c'` → `{ key: 'a', value: 'b=c' }`.  
- `'solo'` → `{ key: 'solo', value: '' }`.

## 8) Red Flags (Yang Harus Dihindari)

- `indexOf` + `slice` tanpa alasan jelas — lebih panjang dan rawan off-by-one.  
- Regex berat untuk format sederhana.

## 9) Follow-up yang Sering Muncul

- Follow-up 1: destructuring parameter `function f({ x = 0 } = {}) {}`.  
- Follow-up 2: nested destructuring dari JSON API.  
- Follow-up 3: rest object `{ a, ...rest }` untuk “sisanya”.

## 10) Trade-off Keputusan

- Opsi A (`split`): sederhana dan idiomatik.  
- Opsi B (manual scan): kontrol penuh karakter demi karakter — jarang perlu.  
- Risiko `split`: perilaku unicode surrogate jarang jadi masalah untuk pola ASCII `=`.

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

## Template Drill Cepat (Isi < 2 Menit) — variasi opsi fungsi

- Tingkat kesulitan: Easy  
- Topik utama: destructuring default + parameter  
- Inti masalah: `function draw({ x = 0, y = 0 } = {})` agar pemanggilan `draw()` aman.  
- Strategi: default di dalam + default object akhir.  
- 2 edge case: `draw(undefined)` vs `draw({})`.  
- 1 potensi bug: lupa `= {}` sehingga destructuring dari `undefined` melempar.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
