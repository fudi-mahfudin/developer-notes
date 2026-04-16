# Binary Tree Level Order Traversal

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** BFS, queue
- **Inti masalah:** Keluaran **per level**: array of arrays nilai node dari kiri ke kanan tiap level.

---

- Soal: `levelOrder(root)` return `number[][]`.
- Input: `TreeNode | null`
- Output: nested arrays by level
- Constraints utama: O(n) waktu, O(w) ruang queue width worst.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): BFS level-wise

## 2) Jawaban Ideal Singkat (30-60 detik)

> Queue: mulai `[root]`. Selama queue tidak kosong: `size = queue.length` (snapshot jumlah node level ini); loop `size` kali: dequeue, push `val`, enqueue anak kiri/kanan jika ada. Push `level` ke `ans`. Jika root null return `[]`. O(n) time.

Struktur cepat:
- Observasi inti masalah: BFS naturally groups by distance from root.
- Strategi final yang dipilih: Queue with explicit per-level loop using current queue size.
- Kenapa strategi ini paling cocok: Standard pattern for level order output.
- Time complexity: O(n)
- Space complexity: O(w) for queue, w max width ~ n/2 complete tree
- Edge case utama: empty tree; single node.

## 3) Versi Ultra Singkat (10-20 detik)

> BFS queue; for each level process `size` nodes; collect values.

## 4) Pseudocode Ringkas (5-10 baris)

```text
if root == null: return []
q = [root]
ans = []
while q not empty:
  row = []; sz = len(q)
  repeat sz times:
    node = pop front of q
    append node.val to row
    push node.left, node.right if exist
  append row to ans
return ans
```

## 5) Implementasi Final (Inti Saja)

```js
function levelOrder(root) {
  if (!root) return [];
  const ans = [],
    q = [root];
  while (q.length) {
    const row = [];
    const n = q.length;
    for (let i = 0; i < n; i++) {
      const node = q.shift();
      row.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    ans.push(row);
  }
  return ans;
}
```

*(Catatan: `shift()` O(n) per op pada `Array` JS — untuk wawancara sebutkan `deque` atau simpan indeks head untuk O(1) amortized.)*

## 6) Bukti Correctness (Wajib)

- Invariant: After processing `sz` dequeues, exactly one level consumed and children form next frontier.

## 7) Dry Run Singkat

- `3,9,20,null,null,15,7` → `[[3],[9,20],[15,7]]`.

## 8) Red Flags (Yang Harus Dihindari)

- Forgetting snapshot size before inner loop (mixes levels).

## 9) Follow-up yang Sering Muncul

- Zigzag level order — reverse alternate rows.

## 10) Trade-off Keputusan

- DFS with level index + ans[level].push — also O(n) but BFS clearer.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 9/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Implement index-based queue in JS for strict O(n) BFS.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: BFS
- Inti masalah (1 kalimat): Level-by-level values.
- Soal: 2D array.
- Strategi final: Queue + level size
- Kompleksitas: O(n), O(w)
- 2 edge case: null root; only left spine
- 1 potensi bug: level size not snapshotted
- 1 alasan valid: BFS frontier = level boundary
