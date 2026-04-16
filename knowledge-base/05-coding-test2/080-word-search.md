# Word Search

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Grid DFS backtracking
- **Inti masalah:** Apakah `word` bisa dibentuk 4-neighbor **path** tanpa mengulang sel pada **satu** upaya path (marker per DFS branch).

---

- Soal: `exist(board, word)` boolean.
- Input: grid char 2D, string word
- Output: boolean
- Constraints utama: O(rows·cols·4^L) typical; mark `board[r][c]` visited dengan `#` restore backtrack.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Untuk tiap sel yang cocok `word[0]`, jalankan `dfs(r,c,k)` where `k` index karakter. Match fail return false. Jika `k === word.length-1` matched length return true. Tandai sel `#` atau `visited`; eksplor 4 arah `dfs(nr,nc,k+1)`; restore char. **Prune**: jika huruf tidak cocok sebelum dfs. Early exit ketika found.

Struktur cepat:
- Observasi inti masalah: Path existence in grid graph with label sequence = word.
- Strategi final yang dipilih: DFS backtrack with visited flip.
- Kenapa strategi ini paling cocok: Word length small relative to grid in LC constraints often.
- Time complexity: O(N · 4^L) worst, N cells, L = word length
- Space complexity: O(L) recursion stack
- Edge case utama: reused cell forbidden; same letter grid may need revisit different path from different start.

## 3) Versi Ultra Singkat (10-20 detik)

> Try each start; DFS match prefix; mark cell; backtrack unmark.

## 4) Pseudocode Ringkas (5-10 baris)

```text
for each cell (r,c):
  if dfs(r,c,0): return true
return false

dfs(r,c,k):
  if out of bounds or board[r][c] != word[k]: return false
  if k == len(word)-1: return true
  temp = board[r][c]; board[r][c] = '#'
  for each neighbor:
    if dfs(nr,nc,k+1): return true
  board[r][c] = temp
  return false
```

## 5) Implementasi Final (Inti Saja)

```js
function exist(board, word) {
  const m = board.length,
    n = board[0].length;
  const dfs = (r, c, k) => {
    if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] !== word[k]) return false;
    if (k === word.length - 1) return true;
    const t = board[r][c];
    board[r][c] = '#';
    const ok =
      dfs(r + 1, c, k + 1) ||
      dfs(r - 1, c, k + 1) ||
      dfs(r, c + 1, k + 1) ||
      dfs(r, c - 1, k + 1);
    board[r][c] = t;
    return ok;
  };
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) if (dfs(i, j, 0)) return true;
  return false;
}
```

## 6) Bukti Correctness (Wajib)

- DFS explores all simple paths from starts matching consecutive letters; backtracking unmarks for alternate branches.

## 7) Dry Run Singkat

- Board `ABCD` path for `ABCCED` example LC.

## 8) Red Flags (Yang Harus Dihindari)

- Global `visited[][]` without resetting per branch wrongly — or forget restore char.
- BFS for single path often heavier; DFS standard.

## 9) Follow-up yang Sering Muncul

- Word Search II — trie + DFS from each cell backtracking.

## 10) Trade-off Keputusan

- Mutable board vs visited matrix — both OK.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 9/10
- Efisiensi: 8/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Harmonize k vs word.length-1 termination rigorously.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Grid DFS BT
- Inti masalah (1 kalimat): Path spelling word without reuse.
- Soal: Boolean.
- Strategi final: DFS + mark/unmark
- Kompleksitas: O(N·4^L) rough
- 2 edge case: word length 1; impossible path
- 1 potensi bug: no unmark restore
- 1 alasan valid: backtracking explores all path prefixes from each start
