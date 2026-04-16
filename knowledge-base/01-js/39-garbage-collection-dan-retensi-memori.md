# Garbage collection & retensi memori

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: objek dibersihkan saat tidak terjangkau

GC membebaskan memori objek yang tidak lagi direferensikan. "Leak" di JS biasanya retensi tak sengaja: objek masih terjangkau dari closure/cache/listener.

### Mengapa dipedulikan di interview & produksi?

- Bug memori sering muncul di SPA jangka panjang.  
- Closure dan event listener mudah menahan objek besar.  
- Pola cache perlu strategi eviction.

---

# Contoh soal coding: `createCacheWithLimit`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Medium  
- **Topik utama:** retensi memori, cache  
- **Inti masalah:** Batasi ukuran cache agar tidak tumbuh tanpa henti.

---

- Soal: `createCacheWithLimit(limit)` dengan `get/set`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Gunakan `Map` dan hapus elemen tertua saat ukuran melebihi limit.

## 3) Versi Ultra Singkat (10-20 detik)

> Cache harus punya batas ukuran.

## 4) Pseudocode Ringkas (5-10 baris)

```text
set(k,v):
  map.set(k,v)
  jika map.size > limit:
    hapus key pertama
```

## 5) Implementasi Final (Inti Saja)

```js
export function createCacheWithLimit(limit) {
  const map = new Map();
  return {
    get(key) { return map.get(key); },
    set(key, value) {
      map.set(key, value);
      if (map.size > limit) {
        const oldest = map.keys().next().value;
        map.delete(oldest);
      }
    },
  };
}
```

## 6) Bukti Correctness (Wajib)

- Ukuran map tidak pernah melebihi `limit` setelah `set`.  
- Item lama tereviction secara deterministik.

## 7) Dry Run Singkat

- Limit 2: set a,b,c -> hanya b,c tersisa.

## 8) Red Flags (Yang Harus Dihindari)

- Cache global tanpa batas.  
- Menahan data besar di closure tanpa release path.

## 9) Follow-up yang Sering Muncul

- WeakMap untuk metadata object key.  
- LRU policy penuh.

## 10) Trade-off Keputusan

- FIFO sederhana vs LRU lebih akurat tapi lebih kompleks.

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

- Cari contoh leak: listener ditambah tapi tidak pernah di-remove.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
