# Copy List with Random Pointer

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Hash map, linked list cloning
- **Inti masalah:** Duplikasi linked list dengan pointer `next` **dan** `random` (ke node sembarang atau null) dalam O(n) waktu dan O(n) ruang (map), atau O(1) ruang dengan interleave trick.

---

- Soal: Return deep copy of graph-like list node `Node { val, next, random }`.
- Input: head (may null)
- Output: new head disconnected from original
- Constraints utama: Hash map old→new **dua pass**; atau weave copies between nodes then split (O(1) extra — advanced).

## 2) Jawaban Ideal Singkat (30-60 detik)

> **Map approach**: pass1 — iterate original, buat `copy = new Node(x)` untuk setiap node, `map.set(old, copy)`. pass2 — set `copy.next = map.get(old.next)`, `copy.random = map.get(old.random)` (null-safe). Return `map.get(head)`. O(n) time & space. **Interleaved** (optional): insert `copy` antara `node` dan `node.next`; assign random via `copy.random = copyOriginal.random.next`; split list — O(n) time O(1) space.

Struktur cepat:
- Observasi inti masalah: Random pointer needs referential mapping between old and new universe.
- Strategi final yang dipilih: HashMap + two passes (most interview-friendly).
- Kenapa strategi ini paling cocok: Clear correctness, moderate space.
- Time complexity: O(n)
- Space complexity: O(n) for map; O(1) for interleave variant
- Edge case utama: random null; single node; self-pointing random.

## 3) Versi Ultra Singkat (10-20 detik)

> Map original node → clone; second pass wire next and random.

## 4) Pseudocode Ringkas (5-10 baris)

```text
map = empty
for cur in walk original:
  map[cur] = new Node(cur.val)
for cur in walk original:
  copy = map[cur]
  copy.next = map.get(cur.next)
  copy.random = map.get(cur.random)
return map.get(head)
```

## 5) Implementasi Final (Inti Saja)

```js
function copyRandomList(head) {
  if (!head) return null;
  const map = new Map();
  let cur = head;
  while (cur) {
    map.set(cur, { val: cur.val, next: null, random: null });
    cur = cur.next;
  }
  cur = head;
  while (cur) {
    const copy = map.get(cur);
    copy.next = cur.next ? map.get(cur.next) : null;
    copy.random = cur.random ? map.get(cur.random) : null;
    cur = cur.next;
  }
  return map.get(head);
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Bijection old↔new ensures structural identity with independent objects.
- Kenapa semua kasus valid tercakup: All nodes created before wiring pointers avoiding partial dependencies cycles (handled by map).
- Kenapa tidak ada kasus yang terlewat: Full iteration covers all edges.

## 7) Dry Run Singkat

- Small list with random back edge — verify pointers point to new clones not old.

## 8) Red Flags (Yang Harus Dihindari)

- Shallow copy sharing nodes with original.
- Recursion without visited map on cyclic structure — need map anyway in copy sense.

## 9) Follow-up yang Sering Muncul

- Clone graph — same pattern BFS/DFS + map.

## 10) Trade-off Keputusan

- Map vs interleave — space vs code trickiness.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 9/10
- Efisiensi: 9/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Mention O(1) space if interviewer asks optimal.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Clone + random ref
- Inti masalah (1 kalimat): Deep copy list with random pointer.
- Soal: New head.
- Strategi final: HashMap two-pass
- Kompleksitas: O(n), O(n)
- 2 edge case: null head; random null
- 1 potensi bug: point random to old node
- 1 alasan valid: Map fixes identity mapping
