# Surrounded Regions

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Grid DFS/BFS, boundary flood
- **Inti masalah:** `O` harus diubah jadi `X` jika **sepenuhnya** dikelilingi `X` (tidak terhubung ke border); `O` yang menyentuh border tidak jadi `X`.

---

- Soal: mutate `board` in-place character 2D grid.
- Input: `char[][]`
- Output: void (mutate)
- Constraints utama: O(mn) — flood dari **semua `O` di boundary**, mark aman; kemudian flip `O` yang tidak aman ke `X`, unmark aman kembali `O`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> **Tidak** iterate interior setiap region secara naive. Dari setiap `O` pada **border**, DFS/BFS tandai `A` (Safe) semua `O` terhubung 4-arah. Lalu scan grid: sel `O` yang tidak `A` jadi `X`; sel `A` restore `O`. Alternatif: mulai boundary queue multi-source BFS. O(mn).

Struktur cepat:
- Observasi inti masalah: Surrounded iff not connected to border — complement of boundary-connected Os.
- Strategi final yang dipilih: Flood escape from borders.
- Kenapa strategi ini paling cocok: Linear vs recomputing per cell BFS interior.
- Time complexity: O(mn)
- Space complexity: O(mn) recursion or queue
- Edge case utama: All `O`; border ring all `O`.

## 3) Versi Ultra Singkat (10-20 detik)

> Mark all O touching border and their component; flip remaining O to X; unmark saves to O.

## 4) Pseudocode Ringkas (5-10 baris)

```text
for each border cell (r,c) with O: dfs mark # or temporary char
for each cell:
  if O: board[r][c] = X
  if marked safe: board[r][c] = O
```

*(Implementasi sering pakai pass pertama `T` temporary, pass kedua flip.)*

## 5) Implementasi Final (Inti Saja)

```js
function solve(board) {
  const m = board.length, n = board[0].length;
  const mark = (r, c) => {
    if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] !== 'O') return;
    board[r][c] = '#';
    mark(r + 1, c); mark(r - 1, c); mark(r, c + 1); mark(r, c - 1);
  };
  for (let j = 0; j < n; j++) {
    mark(0, j); mark(m - 1, j);
  }
  for (let i = 0; i < m; i++) {
    mark(i, 0); mark(i, n - 1);
  }
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O') board[i][j] = 'X';
      else if (board[i][j] === '#') board[i][j] = 'O';
    }
}
```

## 6) Bukti Correctness (Wajib)

- Os connected to boundary survive; all other Os enclosed by X must be flipped.

## 7) Dry Run Singkat

- LC `XXXX/XXOX/XXXX` example.

## 8) Red Flags (Yang Harus Dihindari)

- BFS every interior O — quadratic risk.

## 9) Follow-up yang Sering Muncul

- Number of enclaves — counting components not touching border.

## 10) Trade-off Keputusan

- Temporary `#` char if board allows letters — else visited matrix.

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
- Catatan perbaikan: Clarify in-place two-phase mark.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Boundary BFS
- Inti masalah (1 kalimat): Flip engulfed O to X.
- Soal: In-place board.
- Strategi final: Escape flood from border
- Kompleksitas: O(mn), O(mn)
- 2 edge case: all O; thin O corridor to border
- 1 potensi bug: flip safe regions
- 1 alasan valid: complement of border-connected frees region
