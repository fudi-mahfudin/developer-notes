# Topik 65 — Connected Components / Island Count (Grid BFS/DFS)

Pada **grid** biner `1` daratan, `0` air, hitung pulau atau luas. Tiap sel bisa dilintasi 4-arah atau 8-arah sesuai soal. Gunakan **DFS/BFS** dengan `visited` set/matrix.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Iterasi setiap sel; jika `1` dan belum dikunjungi, mulai flood fill, tandai semua `1` terhubung sebagai satu komponen, increment counter. Kompleksitas O(mn) waktu, O(mn) visited worst. **Union-Find** alternatif untuk dynamic edges—jarang di grid statis.

---

## 2. Mengapa topik ini keluar di interview

- Number of islands, max area, surrounded regions.

---

## 3. DFS rekursif

```javascript
function numIslands(grid) {
  const m = grid.length,
    n = grid[0].length;
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    for (const [dr, dc] of dirs) dfs(r + dr, c + dc);
  }
  let cnt = 0;
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++) if (grid[r][c] === "1") {
      cnt++;
      dfs(r, c);
    }
  return cnt;
}
```

Mutasi grid menghemat visited—atau gunakan `visited` terpisah.

---

## 4. Kompleksitas

O(mn) waktu, O(mn) rekursi stack worst skew line.

---

## 5. Pitfall: 8-direction

Tambahkan diagonal ke `dirs`.

---

## 6. Pitfall: mark visited

Hindari mengunjungi sel dua kali tanpa mark.

---

## 7. Variasi: count area maksimum

Simpan ukuran komponen saat DFS.

---

## 8. Pola interview

Sebutkan flood fill / connected components.

---

## 9. Latihan

Hitung pulau pada grid dengan danau dalam (hole)—perlu aturan connectivity.

---

## 10. Checklist

- [ ] Boundary checks.
- [ ] Directions count.
- [ ] Mutasi vs visited.

---

## 11. Referensi

Flood fill computer graphics.

---

## 12. Anti-pattern

Memeriksa setiap pasang sel O(n⁴).

---

## 13. Flashcard

- **Component:** connected 1s.

---

## 14. Latihan tulis

BFS dengan queue untuk hindari stack overflow besar.

---

## 15. Testing

Grid kecil brute compare.

---

## 16. Penutup

Grid graph implicit—tetangga dari koordinat.

---

## 17. Tambahan: union-find dynamic

Jika grid berubah—advanced.

---

## 18. Tambahan: parallel BFS

Advanced.

---

## 19. Kompleksitas memori

Visited atau inplace marking.

---

## 20. Rangkuman

Scan grid, start DFS/BFS setiap unvisited land.

---

## 21. Soal terkait

Pacific Atlantic water flow—multi-source BFS.

---

## 22. Edge: grid kosong

0.

---

## 23. Edge: semua air

0.

---

## 24. Drill

Trace 4x4 grid manual.

---

## 25. Performa

Linear dalam sel.

---

## 26. Integrasi TypeScript

`string[][]` atau `number[][]`.

---

## 27. Debugging

Print grid setelah mark.

---

## 28. Memori

Iterative BFS mengurangi stack depth.

---

## 29. 3D grid

6 neighbors—varian.

---

## 30. Etika wawancara

Konfirmasi 4 vs 8 connectivity.

---

Dokumen ini memadukan DFS/BFS pada grid untuk komponen terhubung.
