# Dynamic `import()`

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: muat modul secara async

**`import(specifier)`** mengembalikan **Promise** ke namespace modul. Berguna untuk **code splitting**, **lazy load**, dan **conditional** load. Berbeda dari `import` statis yang di-hoist.

### Mengapa dipedulikan di interview & produksi?

- **Route-based splitting** mengurangi payload awal; dynamic import adalah blok bangunannya.  
- Pola **cache promise** menghindari race dan double-fetch modul.  
- **Interop default** (`default` vs namespace) sering muncul saat mencampur CJS dan ESM.

### Contoh

```js
const mod = await import('./heavy.js');
mod.run();
```

### Kesalahan umum

- Mengira hasil selalu `{ default }` - cek struktur ekspor.
- **CJS interop**: sering butuh `mod.default ?? mod`.

---

# Contoh soal coding: `createLazySingleton` (cache promise)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih pola dynamic import (satu promise untuk banyak pemanggil). Struktur jawaban mengikuti template singkat coding test.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Promise, lazy initialization, closure
- **Inti masalah:** Panggil `loader()` yang mengembalikan Promise **hanya sekali**; pemanggilan berikutnya berbagi Promise yang sama.

---

- Soal: Implementasikan `createLazySingleton(loader)`.
- Input: `loader` fungsi `() => Promise<any>`.
- Output: fungsi `() => Promise<any>` - cache promise pertama.
- Constraints utama: paralel `await get()` tidak memicu dua kali `loader`.
- Pattern utama: variabel `p` di closure; assign sekali.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Simpan promise pertama di closure; pemanggilan berikutnya mengembalikan referensi sama. Kompleksitas O(1) per call setelah cache; `loader` O(1) kali.

Struktur cepat:

- Observasi: jangan `await` di factory - cache **promise**, bukan nilai resolved.
- Strategi: assign sekali saat `p === undefined`.
- Edge: jika `loader` reject, promise tetap cached (kebijakan umum; bisa di-reset di produksi).

## 3) Versi Ultra Singkat (10-20 detik)

> Cache promise, bukan hasil sync; hindari double invoke.

## 4) Pseudocode Ringkas (5-10 baris)

```text
createLazySingleton(loader):
  p = undefined
  return ():
    jika p undefined: p = loader()
    return p
```

## 5) Implementasi Final (Inti Saja)

```js
export function createLazySingleton(loader) {
  let p;
  return () => {
    if (p === undefined) {
      p = loader();
    }
    return p;
  };
}
```

## 6) Bukti Correctness (Wajib)

- Invariant: setelah pemanggilan pertama, `p` tidak pernah di-assign ulang ke hasil baru.
- Dua `await get()` paralel memakai promise identik.

## 7) Dry Run Singkat

- `let n = 0; const g = createLazySingleton(() => { n++; return Promise.resolve(n); });` dua kali `await g()` menghasilkan `n === 1`.

## 8) Red Flags (Yang Harus Dihindari)

- Menyimpan hasil `await loader()` - race bisa memanggil `loader` dua kali.
- Memanggil `loader()` di setiap `get()` tanpa cache.

## 9) Follow-up yang Sering Muncul

- Follow-up 1: dynamic `import()` dengan string dinamis dan bundler chunk naming.
- Follow-up 2: reset cache setelah error.
- Follow-up 3: `import.meta` untuk base URL.

## 10) Trade-off Keputusan

- Opsi A (nullish assign): padat.
- Opsi B (IIFE async): tidak perlu jika hanya cache promise.
- Risiko: rejection cache - perlu retry policy terpisah.

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

## Template Drill Cepat (Isi < 2 Menit) - bungkus `import()`

- Tingkat kesulitan: Easy
- Topik utama: dynamic import
- Inti masalah: `const load = createLazySingleton(() => import('./x.js'));` lalu `await load()` di banyak route.
- 1 potensi bug: path salah - chunk gagal load sekali, cache reject selamanya.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
