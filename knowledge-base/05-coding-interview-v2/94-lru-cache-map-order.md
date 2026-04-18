# Topik 94 — LRU Cache dengan Map dan Urutan

**LRU (Least Recently Used)** eviction mengeluarkan entri yang **paling lama tidak disentuh** ketika cache penuh. Di JavaScript modern, **`Map` menjaga urutan sisipan** untuk iterasi—bisa dipakai untuk LRU **O(1)** amortized dengan pola **get → delete → set** untuk memindahkan kunci ke “paling baru”.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Operasi: `get(key)` jika ada, pindahkan ke recent (hapus+set ulang); `put(key,val)` jika penuh, hapus entri **paling lama** (iterator `map.keys().next().value` pada Map JS). Kompleksitas rata-rata O(1) untuk get/put pada banyak engine untuk Map—dokumentasikan sebagai **amortized**. Alternatif: **doubly linked list + Map** untuk deterministik teoritis O(1) murni.

---

## 2. Mengapa topik ini keluar di interview

- Leetcode 146 klasik.
- Diskusi ORM query cache.

---

## 3. Implementasi Map (idiomatik JS)

```javascript
class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.m = new Map();
  }
  get(key) {
    if (!this.m.has(key)) return -1;
    const v = this.m.get(key);
    this.m.delete(key);
    this.m.set(key, v);
    return v;
  }
  put(key, value) {
    if (this.m.has(key)) this.m.delete(key);
    this.m.set(key, value);
    if (this.m.size > this.cap) {
      const oldest = this.m.keys().next().value;
      this.m.delete(oldest);
    }
  }
}
```

---

## 4. Kompleksitas

Map operations typically O(1) average; worst-case hash degrade jarang.

---

## 5. Pitfall: mengandalkan urutan Object

Object key enumeration tidak LRU-friendly seperti Map insertion order untuk string keys—gunakan Map.

---

## 6. Pitfall: concurrency

Struktur ini bukan thread-safe—perlu lock di environment paralel.

---

## 7. Pitfall: `get` tanpa refresh

Harus memperbarui recency pada akses.

---

## 8. Pola interview: TTL layer

Tambahkan timestamp + lazy eviction—bukan LRU murni.

---

## 9. Pola interview: LFU vs LRU

LFU butuh frekuensi—struktur lebih berat.

---

## 10. Latihan konsep

Buktikan mengapa delete+set mempertahankan LRU dengan Map.

---

## 11. Latihan kode

Implement LRU dengan doubly linked list manual.

---

## 12. Edge cases

- Kapasitas 0 — definisikan perilaku.
- Update nilai kunci yang sama — tidak mengubah ukuran.

---

## 13. Checklist

- [ ] Evict oldest on overflow.
- [ ] Move-to-end on get.
- [ ] Tahu alternatif DLL.

---

## 14. Referensi

Leetcode 146; CLRS amortized analysis.

---

## 15. Anti-pattern

Array.shift() untuk evict — O(n).

---

## 16. Flashcard

- **Recency:** akses memperbarui posisi.

---

## 17. Testing

Sequence operasi acak vs brute force kecil.

---

## 18. Performa

Map LRU cukup cepat untuk banyak kasus produksi JS.

---

## 19. Integrasi TypeScript

Generic `LRUCache<K,V>`.

---

## 20. Debugging

Log order dengan `[...map.keys()]`.

---

## 21. Memori

O(capacity) entri.

---

## 22. Parallel

Tidak aman tanpa sinkronisasi.

---

## 23. Etika wawancara

Tanyakan apakah Map insertion order dijamin (ES2015+).

---

## 24. Rangkuman

Map + refresh pada get + evict first key = LRU praktis di JS.

---

## 25. Soal terkait

Redis LRU approximation — evicted server-side.

---

## 26. Drill manual

Cap 2, urutan put(1), put(2), get(1), put(3) — kunci terbuang?

---

## 27. Varian: size-aware eviction

Weighted LRU—lanjutan.

---

## 28. Penutup

LRU menggabungkan struktur data dan kebijakan kebijakan cache nyata.

---

Dokumen ini menjelaskan LRU dengan Map, kompleksitas, dan opsi doubly linked list.
