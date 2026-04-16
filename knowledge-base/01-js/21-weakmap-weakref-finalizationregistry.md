# `WeakMap` / `WeakRef` / `FinalizationRegistry`

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: referensi lemah & siklus hidup objek

**`WeakMap`** — map dengan **kunci objek** (bukan primitive); referensi kunci **lemah**: tidak mencegah GC. Cocok **metadata** per objek tanpa mengotori objek asli.

**`WeakRef`** — referensi lemah; `deref()` mengembalikan objek atau `undefined` jika sudah GC.

**`FinalizationRegistry`** — callback saat objek ter-*finalize* (best-effort; jangan andalkan untuk logika kritis).

### Pola umum

| API | Kapan |
|-----|--------|
| `WeakMap` | cache / private data per instance |
| `WeakRef` | cache besar, boleh hilang |
| `FinalizationRegistry` | cleanup non-deterministik (hati-hati) |

### Kesalahan umum

- Kunci `WeakMap` harus **object**.  
- Mengandalkan **timing** GC untuk kebenaran program — salah.

---

# Contoh soal coding: `createMetaStore` (metadata per objek)

Berikut contoh soal **bukan** dari LeetCode; difokuskan untuk melatih `WeakMap` dan closure. Struktur jawaban mengikuti template singkat coding test.

---

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy–Medium  
- **Topik utama:** `WeakMap`, API pembungkus  
- **Inti masalah:** Simpan metadata per **identitas objek** tanpa menambah properti ke objek itu.

---

- Soal: Implementasikan `createMetaStore()` → `{ get(obj), set(obj, meta) }` memakai `WeakMap`.  
- Input: `obj` sebagai object; `meta` nilai apa pun.  
- Output: `get` mengembalikan meta atau `undefined`.  
- Constraints utama: tidak retention kuat pada `obj` hanya lewat map — `WeakMap` memastikan kunci bisa GC.  
- Pattern utama: `WeakMap` di closure.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Satu `WeakMap` di closure; `set`/`get` meneruskan ke map. Operasi rata-rata O(1). Tidak bisa iterasi semua entri — sesuai desain.

Struktur cepat:

- Observasi: `Map` biasa dengan kunci objek akan **menahan** objek — bocor.  
- Strategi: `WeakMap` untuk metadata “nempel” tanpa memaksa hidup.  
- Edge: primitive sebagai kunci — **tidak valid** untuk `WeakMap`.

## 3) Versi Ultra Singkat (10-20 detik)

> `new WeakMap()` + `get`/`set` di objek kembalian.

## 4) Pseudocode Ringkas (5-10 baris)

```text
createMetaStore():
  wm = WeakMap baru
  return {
    get(obj): return wm.get(obj)
    set(obj, meta): wm.set(obj, meta)
  }
```

## 5) Implementasi Final (Inti Saja)

```js
export function createMetaStore() {
  const wm = new WeakMap();
  return {
    get(obj) {
      return wm.get(obj);
    },
    set(obj, meta) {
      wm.set(obj, meta);
    },
  };
}
```

## 6) Bukti Correctness (Wajib)

- Tidak menambah field enumerable pada `obj`.  
- `set` lalu `get` mengembalikan referensi `meta` yang sama (kecuali GC pada `obj` — metadata ikut tidak terjangkau).

## 7) Dry Run Singkat

- `const s = createMetaStore(); const o = {}; s.set(o, { x: 1 }); s.get(o).x` → `1`.

## 8) Red Flags (Yang Harus Dihindari)

- `Map` dengan kunci objek untuk pola ini — retention kuat.  
- Mengira bisa `wm.size` — `WeakMap` tidak punya `size`.

## 9) Follow-up yang Sering Muncul

- Follow-up 1: `WeakRef` + cache `deref()`.  
- Follow-up 2: `FinalizationRegistry` untuk cleanup buffer — dokumentasi “tidak deterministik”.  
- Follow-up 3: `WeakSet` untuk “sudah dikunjungi?” di graph walk.

## 10) Trade-off Keputusan

- Opsi A (`WeakMap`): tidak iterasi; cocok metadata.  
- Opsi B (simbol di objek): mengubah objek asli / bentrok.  
- Risiko: debugging lebih sulit (tidak bisa list semua entri).

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

## Template Drill Cepat (Isi < 2 Menit) — `FinalizationRegistry`

- Tingkat kesulitan: Medium (konsep)  
- Topik utama: lifecycle  
- Inti masalah: baca MDN — kapan **tidak** memakai registry untuk “destructor” deterministik?  
- Jawaban singkat: jangan gantikan `try/finally` atau `close()` eksplisit untuk resource penting.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
