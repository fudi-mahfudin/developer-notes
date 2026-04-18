# Permutations

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Backtracking
- **Inti masalah:** Semua **permutasi** elemen `nums` (unik), return list lengkap.

---

- Soal: `permute(nums)` semua urutan panjang `n`.
- Input: `number[]` distinct typical
- Output: `number[][]`
- Constraints utama: O(n! × n); swap/backtrack atau `used[]` boolean array.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Track `used[i]` atau backtrack dengan menghapus elemen dari set sementara. Path penuh `length===n` → salin ke jawaban. DFS: coba setiap indeks belum `used`, mark, rekurs, unmark. Untuk optimasi swap in-place array berbeda pola. O(n! * n) waktu.

Struktur cepat:
- Observasi inti masalah: Full permutation enumeration factorial size.
- Strategi final yang dipilih: Backtracking with used mask array.
- Kenapa strategi ini paling cocok: Clear correctness on distinct elements.
- Time complexity: O(n · n!)
- Space complexity: O(n) recursion + used
- Edge case utama: `n=1`; empty (jarang).

## 3) Versi Ultra Singkat (10-20 detik)

> DFS: used array; add unused; backtrack; collect full permutations.

## 4) Pseudocode Ringkas (5-10 baris)

```text
ans = []
function dfs(path):
  if len(path) == n: ans.append(copy); return
  for i in 0..n-1:
    if not used[i]:
      used[i]=true; path.push(nums[i])
      dfs(path)
      path.pop(); used[i]=false
dfs([])
```

## 5) Implementasi Final (Inti Saja)

```js
function permute(nums) {
  const res = [],
    path = [],
    used = new Array(nums.length).fill(false);
  const dfs = () => {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  };
  dfs();
  return res;
}
```

## 6) Bukti Correctness (Wajib)

- Exhaustive placement without reuse yields exactly all bijections from positions to elements.

## 7) Dry Run Singkat

- `[1,2,3]` → 6 permutations.

## 8) Red Flags (Yang Harus Dihindari)

- Dengan **duplikat** di input butuh skip sama seperti subset II — varian Permutations II.

## 9) Follow-up yang Sering Muncul

- Permutations II — sort + skip duplicate at branch.

## 10) Trade-off Keputusan

- `next_permutation` library iteration vs DFS — bahasa-dependent.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 8/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: factorial blowup — mention output size.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Backtracking
- Inti masalah (1 kalimat): All orderings of distinct nums.
- Soal: 2D array.
- Strategi final: DFS + used[]
- Kompleksitas: O(n!), O(n)
- 2 edge case: n=1; remember reset used
- 1 potensi bug: forget unmark used
- 1 alasan valid: each full path is unique permutation
