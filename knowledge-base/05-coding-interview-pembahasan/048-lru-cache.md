# LRU Cache

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium / Hard
- **Topik utama:** Hash map + doubly linked list (atau JS `Map` insertion order trick)
- **Inti masalah:** `get` dan `put` keduanya O(1); `kapasitas` tetap; evict **least recently used** saat penuh.

---

- Soal: `LRUCache(capacity)` dengan metode `get(key)` mengembalikan value atau -1; `put(key,value)` mengubah atau menyisipkan; evict LRU.
- Input/Output: class API
- Constraints utama: All ops O(1) average — doubly linked list near/head tail + map key→node **ata** Map reorder hack in newer JS engines (ordered Map) move to end on access (be careful with spec nuances — classic is DLL).

## 2) Jawaban Ideal Singkat (30-60 detik)

> Struktur: `Map` key → `{key,val}` node dalam **doubly linked list** dengan `head` (MRU side) dan `tail` (LRU side), atau sebaliknya konsisten. `get`: if key exists, splices node to front (mark recent), return val else -1. `put`: if exists update val + move front; else insert front; if `size>capacity`, remove node near LRU tail (prev pointer from tail dummy). Doubly list gives O(1) splice. **JavaScript shortcut**: `Map` preserves insertion order — on get/put delete+re-insert key to mark newest, evict first entry of iterator when oversize (`map.keys().next()`). Works in practice for LC.

Struktur cepat:
- Observasi inti masalah: LRU = queue by recency, needs order updates O(1).
- Strategi final yang dipilih: Hash + doubly linked list (or ordered Map trick).
- Kenapa strategi ini paling cocok: Meets O(1) complexity goals.
- Time complexity: O(1) each op average
- Space complexity: O(capacity)
- Edge case utama: capacity 1; update existing key doesn't change size; get updates recency.

## 3) Versi Ultra Singkat (10-20 detik)

> Map for O(1) lookup + list for LRU order, or Map delete/reinsert for order in JS.

## 4) Pseudocode Ringkas (5-10 baris)

```text
structure Node { key, val, prev, next }
map key->Node
head,tail sentinels
moveToFront(node):
  unlink(node); link after head
removeLRU():
  unlink node before tail
get(key): if in map: moveToFront(node); return val else -1
put(key,val): if exists update+move; else add front; if size>cap remove LRU
```

## 5) Implementasi Final (Inti Saja)

```js
class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.cap) {
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
  }
}
```

*(Catatan: pola `Map` order di atas mengikuti banyak solusi LC modern; untuk wawancara enterprise, siapkan DLL + map.)*

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Recency modeled by position in LIFO/FIFO structure; eviction always removes stale key.
- Kenapa semua kasus valid tercakup: Capacity enforcement by explicit eviction when insert overloaded.
- Kenapa tidak ada kasus yang terlewat: Map handles key uniqueness.

## 7) Dry Run Singkat

- capacity 2: put 1, put 2, get 1, put 3 evicts 2.

## 8) Red Flags (Yang Harus Dihindari)

- Plain object `{}` without order control in all engines for LRU.
- O(n) eviction scan.

## 9) Follow-up yang Sering Muncul

- LFU cache — frequency structure addition.

## 10) Trade-off Keputusan

- Map trick vs DLL — trade rigor vs speed to code.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 9/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 8/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Prepare DLL version if interviewer dislikes Map order reliance.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Hard
- Topik utama: Design / DLL + map
- Inti masalah (1 kalimat): Cache bounded with LRU eviction.
- Soal: get/put O(1).
- Strategi final: Hash + doubly linked list
- Kompleksitas: O(1), O(capacity)
- 2 edge case: cap=1; overwrite key
- 1 potensi bug: evict wrong side
- 1 alasan valid: DLL splices maintain recency in constant time
