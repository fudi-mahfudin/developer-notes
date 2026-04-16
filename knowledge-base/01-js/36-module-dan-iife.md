# Module / IIFE

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: pola modular sebelum ESM

IIFE (Immediately Invoked Function Expression) dipakai untuk membuat scope privat sebelum modul modern.

### Mengapa dipedulikan di interview & produksi?

- Banyak codebase legacy masih memakai pola ini.  
- Membantu memahami closure untuk private state.  
- Menjelaskan evolusi dari script global ke ESM.

### Contoh cepat

```js
const counter = (() => {
  let n = 0;
  return { inc: () => ++n };
})();
```

---

# Contoh soal coding: `createModule` (state privat)

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Easy  
- **Topik utama:** IIFE, closure  
- **Inti masalah:** Kembalikan API publik dengan state privat yang tidak bisa diakses langsung.

---

- Soal: `createModule()` -> `{ get, set }`.  
- Pattern utama: closure variable privat.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Simpan state dalam variabel lokal function scope dan expose method yang menutup variabel itu.

## 3) Versi Ultra Singkat (10-20 detik)

> Closure menyembunyikan state, API publik mengaksesnya.

## 4) Pseudocode Ringkas (5-10 baris)

```text
createModule():
  x = 0
  return { get(){...}, set(v){...} }
```

## 5) Implementasi Final (Inti Saja)

```js
export function createModule() {
  let value = 0;
  return {
    get() { return value; },
    set(v) { value = v; },
  };
}
```

## 6) Bukti Correctness (Wajib)

- `value` tidak bisa diakses langsung dari luar.  
- `get/set` selalu sinkron dengan state yang sama.

## 7) Dry Run Singkat

- `m.set(2); m.get()` -> `2`.

## 8) Red Flags (Yang Harus Dihindari)

- Mengekspos state sebagai properti publik.  
- Mencampur global mutable.

## 9) Follow-up yang Sering Muncul

- Follow-up: bandingkan IIFE vs ESM.

## 10) Trade-off Keputusan

- IIFE cocok legacy, ESM lebih modern dan tooling-friendly.

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

- Ubah `createModule` jadi counter dengan `inc` dan `dec`.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
