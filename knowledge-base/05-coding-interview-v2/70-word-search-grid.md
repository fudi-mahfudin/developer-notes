# Topik 70 — Word Search pada Grid

Diberikan grid huruf dan kata, tentukan apakah kata dapat dibentuk dengan **menjalan** sel **adjacent** (4-arah) **tanpa** mengunjungi sel yang sama dua kali dalam satu path. Gunakan **DFS + backtrack** dengan mark `visited` lalu undo.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Untuk setiap sel yang cocok huruf pertama, DFS ke arah tetangga yang valid; tandai sel dengan `#` sementara atau `visited` matrix boolean; jika mencapai panjang kata, return true; backtrack unmark saat mundur. Kompleksitas worst-case eksponensial tetapi dibatasi panjang kata dan branching. Word Search II menambahkan **Trie** untuk banyak kata sekaligus.

---

## 2. Mengapa topik ini keluar di interview

- Kombinasi grid graph + backtracking.
- Optimasi trie untuk banyak query.

---

## 3. DFS inti

```javascript
function exist(board, word) {
  const m = board.length,
    n = board[0].length;
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  function dfs(r, c, k) {
    if (k === word.length) return true;
    if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] !== word[k]) return false;
    const tmp = board[r][c];
    board[r][c] = "#";
    for (const [dr, dc] of dirs) {
      if (dfs(r + dr, c + dc, k + 1)) return true;
    }
    board[r][c] = tmp;
    return false;
  }
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++) if (dfs(r, c, 0)) return true;
  return false;
}
```

---

## 4. Kompleksitas

Worst sangat besar—praktis terbatas `L` panjang kata.

---

## 5. Pitfall: lupa undo

Grid rusak untuk path lain.

---

## 6. Pitfall: reuse cell

Visited harus per path.

---

## 7. Variasi: Word Search II

Bangun trie dari `words`, DFS dari setiap sel, hapus kata dari trie saat ditemukan untuk pruning.

---

## 8. Pola interview

Sebutkan backtrack mark/unmark.

---

## 9. Latihan

Kata yang memerlukan backtrack di tengah grid.

---

## 10. Checklist

- [ ] Boundary + match char.
- [ ] Restore cell.
- [ ] Trie untuk banyak kata.

---

## 11. Referensi

Grid as implicit graph.

---

## 12. Anti-pattern

BFS untuk satu kata panjang—tidak natural.

---

## 13. Flashcard

- **Backtrack:** restore letter.

---

## 14. Latihan tulis

Word Search II dengan trie node children map.

---

## 15. Testing

Board kecil brute force path enumeration.

---

## 16. Penutup

Word search adalah DFS dengan visited rollback.

---

## 17. Tambahan: 8-direction

Tambah diagonal ke dirs.

---

## 18. Tambahan: allow reuse dengan k steps

BFS state space—beda soal.

---

## 19. Kompleksitas memori

O(L) stack rekursi.

---

## 20. Rangkuman

Cari start match, DFS dengan mark sementara.

---

## 21. Soal terkait

Unique paths III—visit semua cells—TSP-ish.

---

## 22. Edge: kata kosong

Biasanya true/false definisikan.

---

## 23. Edge: satu sel

Cek panjang 1.

---

## 24. Drill

Trace kata `"ABCCED"` pada contoh klasik.

---

## 25. Performa

Trie pruning sangat membantu banyak kata.

---

## 26. Integrasi TypeScript

`board: string[][]`.

---

## 27. Debugging

Log path string kecil.

---

## 28. Memori

Mutasi board efisien—copy visited jika tidak boleh mutasi.

---

## 29. Parallel

Tidak relevan.

---

## 30. Etika wawancara

Konfirmasi reuse cell tidak diperbolehkan.

---

Dokumen ini mengikat word search sebagai DFS grid dengan undo eksplisit.
