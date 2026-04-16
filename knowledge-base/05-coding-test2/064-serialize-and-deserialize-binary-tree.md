# Serialize and Deserialize Binary Tree

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Hard
- **Topik utama:** Tree traversal, string encoding
- **Inti masalah:** Deserialisasi harus **membentuk kembali** struktur sama; null marker perlu agar pohon tidak ambigu.

---

- Soal: `serialize(root) → string` (atau array token); `deserialize(data) → TreeNode`.
- Input/Output: design class pair
- Constraints utama: Preorder DFS dengan token `null` populer; atau level-order (BFS) queue.

## 2) Jawaban Ideal Singkat (30-60 detik)

> **Preorder encode**: `dfs(node)` output `val` atau sentinel `N` untuk null; join delimiter (mis. `,`). **Decode**: index pointer baca token; jika `N` return null; else buat node, rekursi left then right. **BFS**: queue encode dequeue order dengan marker null — decode queue rebuild. O(n) time and space for string length.

Struktur cepat:
- Observasi inti masalah: Need null markers to recover shape — purely inorder insufficient without full structure.
- Strategi final yang dipilih: Preorder with nulls + recursive build.
- Kenapa strategi ini paling cocok: Simple coding interview standard.
- Time complexity: O(n)
- Space complexity: O(n) output / recursion
- Edge case utama: empty tree; single node; negative numbers (delimiter careful).

## 3) Versi Ultra Singkat (10-20 detik)

> Preorder string with nulls; deserialize with shared index array/object pointer.

## 4) Pseudocode Ringkas (5-10 baris)

```text
serialize(node):
  if node == null: return "N"
  return str(node.val) + "," + serialize(left) + "," + serialize(right)

deserialize(tokens):
  pop front token
  if "N": return null
  root = TreeNode(int(token))
  root.left = deserialize(tokens)   // consume stream
  root.right = deserialize(tokens)
  return root
```

## 5) Implementasi Final (Inti Saja)

```js
class Codec {
  serialize(root) {
    const out = [];
    const dfs = (node) => {
      if (!node) {
        out.push('N');
        return;
      }
      out.push(String(node.val));
      dfs(node.left);
      dfs(node.right);
    };
    dfs(root);
    return out.join(',');
  }
  deserialize(data) {
    const q = data.split(',');
    let i = 0;
    const dfs = () => {
      const t = q[i++];
      if (t === 'N') return null;
      const root = { val: Number(t), left: null, right: null };
      root.left = dfs();
      root.right = dfs();
      return root;
    };
    return dfs();
  }
}
```

## 6) Bukti Correctness (Wajib)

- Preorder with null uniquely identifies binary tree when read sequentially with consume semantics.

## 7) Dry Run Singkat

- `1,2,3` small tree round-trip.

## 8) Red Flags (Yang Harus Dihindari)

- Inorder only serialization — ambiguous.

## 9) Follow-up yang Sering Muncul

- Compact binary tree in array heap indexing if complete — special case.

## 10) Trade-off Keputusan

- Comma delimiter fails if values contain comma — JSON encode or length-prefixed.

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
- Kejelasan penjelasan: 8/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Handle negative ints and delimiter collision explicitly in interview.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Hard
- Topik utama: Preorder codec
- Inti masalah (1 kalimat): Lossless tree string round-trip.
- Soal: serialize + deserialize.
- Strategi final: Preorder + null tokens
- Kompleksitas: O(n), O(n)
- 2 edge case: empty; negative numbers
- 1 potensi bug: delimiter in value string
- 1 alasan valid: preorder with nulls is a bijection for binary trees
