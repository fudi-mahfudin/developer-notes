# Kth Smallest Element in a BST

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** BST, inorder traversal
- **Inti masalah:** Urutan **sorted** BST = **inorder** kiri-root-kanan; elemen ke-*k* terkecil = k-th pada traversal inorder.

---

- Soal: `kthSmallest(root, k)` return value (`1<=k<=n`).
- Input: BST root, k
- Output: `number`
- Constraints utama: O(h + k) iterative with stack; O(n) worst flat tree; bisa simpan `count` while popping.

## 2) Jawaban Ideal Singkat (30-60 detik)

> **Iteratif inorder**: cur = root; stack. Selama `cur` atau stack tidak kosong: dorong semua `cur.left` ke stack, `cur = cur.left`; lalu pop = current smallest, `k--`; jika `k==0` return `val`; pindah ke `right`. Ini mengeluarkan elemen **naik** order BST. Rekursif juga bisa: `return dfs` with counter.

Struktur cepat:
- Observasi inti masalah: Inorder of BST = sorted sequence.
- Strategi final yang dipilih: Controlled inorder stop early at k.
- Kenapa strategi ini paling cocok: No full array storage; stops at k.
- Time complexity: O(h + k) average balanced; O(n) skewed
- Space complexity: O(h) stack
- Edge case utama: k=1 smallest; k=n largest.

## 3) Versi Ultra Singkat (10-20 detik)

> Leftmost stack inorder; pop k times; k-th pop answer.

## 4) Pseudocode Ringkas (5-10 baris)

```text
stack = []; cur = root
while cur:
  push cur; cur = cur.left
while stack:
  cur = pop
  k -= 1
  if k == 0: return cur.val
  cur = cur.right
  while cur:
    push cur; cur = cur.left
```

## 5) Implementasi Final (Inti Saja)

```js
function kthSmallest(root, k) {
  const st = [];
  let cur = root;
  while (true) {
    while (cur) {
      st.push(cur);
      cur = cur.left;
    }
    cur = st.pop();
    if (--k === 0) return cur.val;
    cur = cur.right;
  }
}
```

## 6) Bukti Correctness (Wajib)

- Inorder enumeration of BST matches sorted order; k-th pop is k-th smallest.

## 7) Dry Run Singkat

- Build BST from array; ask k=3.

## 8) Red Flags (Yang Harus Dihindari)

- Sorting array build O(n log n) when O(n) traverse exists.

## 9) Follow-up yang Sering Muncul

- Frequent insert/delete — augment subtree size in node for order-statistics tree.

## 10) Trade-off Keputusan

- Iterative vs recursive counter — same asymptotics.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: Practice Morris traversal O(1) space rare follow-up.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: BST inorder
- Inti masalah (1 kalimat): kth smallest via inorder.
- Soal: Integer.
- Strategi final: Stack inorder early exit
- Kompleksitas: O(h+k), O(h)
- 2 edge case: k=1; skewed chain
- 1 potensi bug: wrong traversal order
- 1 alasan valid: BST inorder is sorted
