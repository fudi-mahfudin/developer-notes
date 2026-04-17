# Merge K Sorted Lists

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Hard
- **Topik utama:** Heap / divide & conquer merge
- **Inti masalah:** Gabungkan `k` linked list terurut menjadi satu list terurut.

---

- Soal: `mergeKLists(lists)` return head combined ascending.
- Input: `Array<ListNode|null>` length k
- Output: head merged
- Constraints utama: O(N log k) dengan **min-heap** (val,listIndex,node) atau divide conquer merge pairwise O(N log k) juga.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Heap / merge sort style

## 2) Jawaban Ideal Singkat (30-60 detik)

> **Heap** (prioritas min by `node.val`): push head tiap list non-null. While heap not empty: pop smallest, append to result tail, if popped `.next` push next node. N total nodes → each push/pop log k ⇒ O(N log k). **Divide & conquer**: merge pairs of lists seperti merge-sort recursion depth log k, total work O(N log k) juga tanpa heap. JS tanpa `heapq` — pakai array sort setiap iteration O(k N log k) **buruk** — implement min-heap sederhana atau pakai **priority queue** polyfill; untuk interview sering terima pseudo-heap atau bahasa dengan `PriorityQueue`.

Struktur cepat:
- Observasi inti masalah: repeatedly take global minimum among k fronts = k-way merge.
- Strategi final yang dipilih: Min-heap of size ≤ k or divide-conquer merge two lists repeatedly.
- Kenapa strategi ini paling cocok: Near-optimal comparisons.
- Time complexity: O(N log k) where N total nodes
- Space complexity: O(k) heap; O(log k) recursion stack for D&C
- Edge case utama: empty lists array; all null; one heavy list.

## 3) Versi Ultra Singkat (10-20 detik)

> Min-heap of current heads; repeatedly extract-min and advance; or merge lists pairwise recursively.

## 4) Pseudocode Ringkas (5-10 baris)

```text
heap push (val, id, node) for each non-null list head
dummy tail
while heap not empty:
  (_,_,node) = pop min
  append node to tail
  if node.next: push (node.next.val, id, node.next)
return dummy.next
```

## 5) Implementasi Final (Inti Saja)

```js
// Divide & conquer — tanpa heap; pure JS
function mergeKLists(lists) {
  if (!lists.length) return null;
  while (lists.length > 1) {
    const next = [];
    for (let i = 0; i < lists.length; i += 2) {
      if (i + 1 < lists.length) next.push(mergeTwo(lists[i], lists[i + 1]));
      else next.push(lists[i]);
    }
    lists = next;
  }
  return lists[0];
}
function mergeTwo(a, b) {
  const d = { next: null };
  let t = d;
  while (a && b) {
    if (a.val <= b.val) {
      t.next = a;
      a = a.next;
    } else {
      t.next = b;
      b = b.next;
    }
    t = t.next;
  }
  t.next = a || b;
  return d.next;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Pairwise merge of sorted lists yields sorted merged list; repeating reduces to one list while preserving order by induction.
- Kenapa semua kasus valid tercakup: Every node merged exactly through merge tree.
- Kenapa tidak ada kasus yang terlewat: Base singleton lists handled.

## 7) Dry Run Singkat

- `[[1,4,5],[1,3,4],[2,6]]` → `1→1→2→3→4→4→5→6`.

## 8) Red Flags (Yang Harus Dihindari)

- Concat then sort O(N log N) global.
- Append all then sort array — wrong structure overhead.

## 9) Follow-up yang Sering Muncul

- Merge k sorted arrays — same heap idea.

## 10) Trade-off Keputusan

- Heap vs D&C — D&C easier in JS without PQ library.

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
- Catatan perbaikan: If required heap, sketch binary heap API.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Hard
- Topik utama: k-way merge
- Inti masalah (1 kalimat): Merge k sorted linked lists.
- Soal: One sorted head.
- Strategi final: Divide & conquer mergeTwo / min-heap
- Kompleksitas: O(N log k), O(1) extra besides recursion/heap
- 2 edge case: k=0; many empty lists
- 1 potensi bug: mergeTwo breaks linkage
- 1 alasan valid: Merge of sorted lists is associative via merge tree
