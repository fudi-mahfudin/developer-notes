# Generate Parentheses

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Backtracking, Catalan structures
- **Inti masalah:** Semua string `n` pasang kurung valid (well-formed): prefix mana pun `(` count ≥ `)` count.

---

- Soal: `generateParenthesis(n)` string array.
- Input: `n` integer 1..8 typical
- Output: all distinct valid combinations
- Constraints utama: Backtrack O(4^n / sqrt(n)) Catalan size output; build string with counts `open`, `close` used.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Backtrack: boleh tambah `(` jika `open < n`. Tambah `)` jika `close < open` (maintain prefix validity). Saat `open === close === n`, push ke `ans`. Depth-first string builder or char array. Tidak perlu check balance separately — invariant `close <= open` always.

Struktur cepat:
- Observasi inti masalah: Bijection between valid strings and Dyck paths — controlled branching.
- Strategi final yang dipilih: Backtracking with two constraints.
- Kenapa strategi ini paling cocok: Produces all and only valid strings.
- Time complexity: O(4^n / √n) untuk output size; O(n) depth recursion
- Space complexity: O(n) recursion + result storage
- Edge case utama: n=1 → `["()"]`.

## 3) Versi Ultra Singkat (10-20 detik)

> DFS: add '(' while open<n; add ')' while close<open; done when length 2n.

## 4) Pseudocode Ringkas (5-10 baris)

```text
ans = []
function backtrack(path, open, close):
  if len(path) == 2*n: append path; return
  if open < n: backtrack(path + '(', open+1, close)
  if close < open: backtrack(path + ')', open, close+1)
backtrack('', 0, 0)
return ans
```

## 5) Implementasi Final (Inti Saja)

```js
function generateParenthesis(n) {
  const ans = [];
  const bt = (arr, open, close) => {
    if (open + close === 2 * n) return ans.push(arr.join(''));
    if (open < n) {
      arr.push('(');
      bt(arr, open + 1, close);
      arr.pop();
    }
    if (close < open) {
      arr.push(')');
      bt(arr, open, close + 1);
      arr.pop();
    }
  };
  bt([], 0, 0);
  return ans;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant `close <= open` guarantees never invalid prefix; length `2n` with `n` each implies balanced.

## 7) Dry Run Singkat

- n=3 → five strings Catalan C3=5.

## 8) Red Flags (Yang Harus Dihindari)

- Generating all binary strings then filter — factorial explosion wasted.

## 9) Follow-up yang Sering Muncul

- Count valid parentheses — Catalan number closed form.

## 10) Trade-off Keputusan

- String concat vs char array mutation — array pop/push reduces copying in some langs.

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
- Kerapihan implementasi: 9/10
- Catatan perbaikan: State count of Catalan for complexity discussion.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Backtracking
- Inti masalah (1 kalimat): All well-formed n-pair parentheses strings.
- Soal: String array.
- Strategi final: BT with open/close bounds
- Kompleksitas: Catalan output; O(n) stack depth
- 2 edge case: n=1; closure only when open exhausted
- 1 potensi bug: allow ) before (
- 1 alasan valid: Prefix balance invariant
