# Subsets

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Backtracking / bitmask
- **Inti masalah:** Semua subset (`2^n`) dari `nums` yang **elemennya unik** — termasuk kosong dan penuh.

---

- Soal: `subsets(nums)` return array of arrays.
- Input: distinct integers
- Output: power set
- Constraints utama: O(n·2^n) output size; DFS atau iteratif build from `[]`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> **Cascade / backtrack**: mulai `path` kosong; DFS indeks `i`: cabang **tidak ambil** vs **ambil** `nums[i]` (atau loop `i..` dengan path akumulasi seperti combination). Template umum: `dfs(i)` push `nums[i]` rekurs `dfs(i+1)` lalu pop; juga rekurs `dfs(i+1)` tanpa push — sering digabung satu loop dari `start`..end. **Iteratif**: mulai `[[]]`; untuk tiap `x` extend setiap subset existing dengan `+x`. O(2^n) subsets.

Struktur cepat:
- Observasi inti masalah: Each element in/out binary choice induces power set.
- Strategi final yang dipilih: Backtracking or iterative doubling.
- Kenapa strategi ini paling cocok: Natural for interview.
- Time complexity: O(n · 2^n)
- Space complexity: O(n) path / recursion
- Edge case utama: `[]` → `[[]]`; satu elemen.

## 3) Versi Ultra Singkat (10-20 detik)

> DFS start index choose include/exclude; or iterative append element to all existing subsets.

## 4) Pseudocode Ringkas (5-10 baris)

```text
ans = []
function dfs(start, path):
  if start == n: ans.append(copy(path)); return  // OR snapshot at each step depending template
Alternative classic:
  ans.append(copy(path))  // at each recursive entry
  for i from start to n-1:
    path.push(nums[i]); dfs(i+1, path); path.pop()
dfs(0, [])
```

*(Banyak template: «simpan path tiap node DFS» vs «hanya daun» — pilih konsisten; LC 78 umum simpan setiap recursive call.)*

## 5) Implementasi Final (Inti Saja)

```js
function subsets(nums) {
  const res = [],
    path = [];
  const dfs = (start) => {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      dfs(i + 1);
      path.pop();
    }
  };
  dfs(0);
  return res;
}
```

## 6) Bukti Correctness (Wajib)

- Loop `start..` avoids permutation duplicate subsets; every subset chosen exactly once non-decreasing index order.

## 7) Dry Run Singkat

- `[1,2,3]` → 8 subsets.

## 8) Red Flags (Yang Harus Dihindari)

- Subsets II duplicate input — butuh sort + skip seperti combination II.

## 9) Follow-up yang Sering Muncul

- Subsets II with duplicates.

## 10) Trade-off Keputusan

- Bitmask 0..2^n-1 — O(2^n) index building.

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
- Kerapihan implementasi: 10/10
- Catatan perbaikan: Dua template DFS—jelaskan yang dipakai.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Backtracking / power set
- Inti masalah (1 kalimat): All subsets unique elements.
- Soal: Array of subsets.
- Strategi final: DFS i+1 nondecreasing picks
- Kompleksitas: O(n·2^n)
- 2 edge case: empty nums; snapshot timing in DFS
- 1 potensi bug: off-by-one include duplicate logic
- 1 alasan valid: index-increasing picks = unique subset representation
