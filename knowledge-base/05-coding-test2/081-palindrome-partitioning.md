# Palindrome Partitioning

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Backtracking + palindrome check
- **Inti masalah:** Bagi `s` menjadi substring-substring yang **masing-masing palindrome**; kumpulkan **semua** cara pembagian.

---

- Soal: `partition(s)` array of array string.
- Input: string `s`
- Output: semua partition plans
- Constraints utama: Cek palindrome O(len) atau DP preprocess O(n²); backtrack O(2^n) worst.

## 2) Jawaban Ideal Singkat (30-60 detik)

> `dfs(start, path)`: jika `start === n` simpan path. Untuk `end` dari `start` sampai `n-1`, jika `s[start..end]` palindrome → `path.push` substring, `dfs(end+1)`, `pop`. Helper `isPal(lo,hi)` dua pointer. Precompute `isPal[i][j]` DP booleans untuk percepat opsional.

Struktur cepat:
- Observasi inti masalah: Every cut position choice branches; palindrome test gates branch.
- Strategi final yang dipilih: Backtracking with prefix palindrome expansion.
- Kenapa strategi ini paling cocok: Natural enumeration of partitions.
- Time complexity: exponential worst; palin check per edge O(n) naive
- Space complexity: O(n) depth recursion
- Edge case utama: single char whole string; all same letters many partitions.

## 3) Versi Ultra Singkat (10-20 detik)

> DFS: extend end; add if palindrome; recurse past end; backtrack.

## 4) Pseudocode Ringkas (5-10 baris)

```text
function isPal(lo, hi): two pointers

function dfs(start, path):
  if start == n: ans.append(copy(path)); return
  for end from start to n-1:
    if isPal(start, end):
      path.append(s.slice(start, end+1))
      dfs(end+1, path)
      path.pop()
```

## 5) Implementasi Final (Inti Saja)

```js
function partition(s) {
  const n = s.length,
    res = [],
    path = [];
  const pal = (lo, hi) => {
    while (lo < hi) if (s[lo++] !== s[hi--]) return false;
    return true;
  };
  const dfs = (start) => {
    if (start === n) {
      res.push([...path]);
      return;
    }
    for (let end = start; end < n; end++) {
      if (!pal(start, end)) continue;
      path.push(s.slice(start, end + 1));
      dfs(end + 1);
      path.pop();
    }
  };
  dfs(0);
  return res;
}
```

## 6) Bukti Correctness (Wajib)

- Recursive partition considers every end index for current start iff palindrome prefix — exhaustive partition coverage.

## 7) Dry Run Singkat

- `"aab"` → `[["a","a","b"],["aa","b"]]`.

## 8) Red Flags (Yang Harus Dihindari)

- Checking only whole string palindrome — misses internal cuts.

## 9) Follow-up yang Sering Muncul

- Minimum cuts — DP minimization variant.

## 10) Trade-off Keputusan

- Precompute pal table `O(n²)` once then O(1) check each branch.

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
- Catatan perbaikan: DP palindrome table for tight strings.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Backtracking
- Inti masalah (1 kalimat): All splits into palindrome substrings.
- Soal: List of lists of strings.
- Strategi final: DFS + isPal
- Kompleksitas: exponential partitions
- 2 edge case: length 1; all same char
- 1 potensi bug: slice end inclusive
- 1 alasan valid: every partition built by valid palindrome prefixes
