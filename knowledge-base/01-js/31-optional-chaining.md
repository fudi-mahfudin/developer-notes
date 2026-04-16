# Optional chaining `?.`

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: akses properti aman tanpa `if` berlapis

**Optional chaining** menghentikan evaluasi jika nilai di kiri `?.` adalah `null` atau `undefined`, lalu menghasilkan `undefined` (bukan throw error akses properti).

### Mengapa dipedulikan di interview & produksi?

- Banyak data API punya field opsional; `?.` mengurangi boilerplate guard.  
- Mencegah crash runtime `Cannot read properties of undefined`.  
- Lebih mudah dibaca daripada guard bertingkat `a && a.b && a.b.c`.

### Bentuk umum

```js
obj?.prop;
obj?.[key];
fn?.(arg1, arg2);
```

### Kesalahan umum

- Mengira `?.` menangani semua error - hanya nullish di sisi kiri.  
- Dipakai berlebihan sampai menyembunyikan bug data yang seharusnya wajib ada.

---

# Contoh soal coding: `safeGet` (akses path bertingkat)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih optional chaining dan fallback aman.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy  
- **Topik utama:** optional chaining, nested object  
- **Inti masalah:** Ambil nilai dari path bertingkat dengan aman; jika tidak ada, kembalikan default.

---

- Soal: Implementasikan `safeGet(obj, key1, key2, defaultValue)`.  
- Input: object opsional, dua key string, nilai default.  
- Output: `obj?.[key1]?.[key2] ?? defaultValue`.  
- Constraints utama: jangan melempar error saat struktur tidak lengkap.  
- Pattern utama: `?.` + `??`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Gunakan optional chaining untuk menelusuri properti bertingkat dan nullish coalescing untuk fallback hanya saat hasil `null`/`undefined`. Waktu O(1), ruang O(1).

Struktur cepat:

- Observasi: masalah utamanya crash saat properti menengah tidak ada.  
- Strategi final: `obj?.[key1]?.[key2] ?? defaultValue`.  
- Time complexity: O(1).  
- Space complexity: O(1).  
- Edge case utama: nilai valid `0`, `false`, `''` tidak boleh tertimpa default.

## 3) Versi Ultra Singkat (10-20 detik)

> `?.` untuk akses aman, `??` untuk default nullish.

## 4) Pseudocode Ringkas (5-10 baris)

```text
safeGet(obj, k1, k2, def):
  v = obj?.[k1]?.[k2]
  jika v nullish: return def
  return v
```

## 5) Implementasi Final (Inti Saja)

```js
export function safeGet(obj, key1, key2, defaultValue) {
  return obj?.[key1]?.[key2] ?? defaultValue;
}
```

## 6) Bukti Correctness (Wajib)

- Jika salah satu level hilang, ekspresi menghasilkan `undefined`, lalu fallback aktif.  
- Jika nilai ada dan bukan nullish, nilai asli dikembalikan.

## 7) Dry Run Singkat

- `safeGet({ a: { b: 0 } }, 'a', 'b', 9)` -> `0`.  
- `safeGet({}, 'a', 'b', 9)` -> `9`.

## 8) Red Flags (Yang Harus Dihindari)

- Memakai `||` untuk fallback dan merusak nilai `0/false`.  
- Menyusun optional chaining terlalu panjang tanpa validasi schema.

## 9) Follow-up yang Sering Muncul

- Follow-up 1: akses path dinamis array key (reduce).  
- Follow-up 2: beda `?.()` dan cek `typeof fn === 'function'`.  
- Follow-up 3: kapan lebih baik throw daripada fallback.

## 10) Trade-off Keputusan

- Opsi A (`?.`): ringkas dan aman.  
- Opsi B (guard manual): eksplisit untuk logging error per level.

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

## Template Drill Cepat (Isi < 2 Menit) - `safeCall`

- Tingkat kesulitan: Easy  
- Topik utama: optional call  
- Inti masalah: `safeCall(fn, ...args)` memanggil fungsi hanya jika ada.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
