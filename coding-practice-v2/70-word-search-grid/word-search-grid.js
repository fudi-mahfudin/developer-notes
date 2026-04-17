/**
 * Judul: Topik 70 — Word search pada grid (DFS + backtrack)
 *
 * Soal test eksplisit:
 * - exist: apakah `word` dapat dibentuk dengan berjalan 4-arah tanpa reuse sel pada satu jalur.
 * - countWords: berapa banyak kata dari daftar yang ada (varian enterprise).
 *
 * Contoh output:
 * - Board [["A","B"],["C","D"]], word "AB" → true jika A-B adjacent.
 *
 * Solusi: DFS dari setiap sel; backtrack unmark saat keluar.
 *
 * @see knowledge-base/05-coding-interview-v2/70-word-search-grid.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/70-word-search-grid/word-search-grid.test.js`
 */

/**
 * Judul: Cari kata pada grid (huruf tunggal per sel)
 *
 * Soal test eksplisit:
 * - Kata kosong → true (definisi edge).
 * - Satu sel sama tidak boleh dipakai dua kali dalam satu path.
 *
 * Contoh output:
 * - Grid [["A","B","C","E"]],["S","F","C","S"],["A","D","E","E"]] — "ABCCED" style.
 *
 * Solusi: DFS; visited boolean matrix; 4 neighbor.
 *
 * @param {string[][]} board
 * @param {string} word
 * @returns {boolean}
 */
export function exist(board, word) {
  if (word.length === 0) return true;
  const rows = board.length;
  const cols = board[0].length;
  /** @type {boolean[][]} */
  const seen = Array.from({ length: rows }, () => Array(cols).fill(false));

  /**
   * @param {number} r
   * @param {number} c
   * @param {number} k
   */
  function dfs(r, c, k) {
    if (k === word.length) return true;
    if (r < 0 || c < 0 || r >= rows || c >= cols) return false;
    if (seen[r][c] || board[r][c] !== word[k]) return false;
    seen[r][c] = true;
    const ok =
      dfs(r + 1, c, k + 1) ||
      dfs(r - 1, c, k + 1) ||
      dfs(r, c + 1, k + 1) ||
      dfs(r, c - 1, k + 1);
    seen[r][c] = false;
    return ok;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}

/**
 * Judul: Hitung berapa kata dari `words` yang ada di board (reuse board, path tetap per kata)
 *
 * Soal test eksplisit:
 * - words kosong → 0.
 *
 * Contoh output:
 * - Dua kata valid → 2.
 *
 * Solusi: panggil exist untuk tiap kata.
 *
 * @param {string[][]} board
 * @param {string[]} words
 * @returns {number}
 */
export function countWordsPresent(board, words) {
  let n = 0;
  for (const w of words) if (exist(board, w)) n += 1;
  return n;
}

/**
 * Judul: Kumpulkan semua kata yang match dari daftar
 *
 * Soal test eksplisit:
 * - Subset dari words yang exist true.
 *
 * @param {string[][]} board
 * @param {string[]} words
 * @returns {string[]}
 */
export function filterWordsPresent(board, words) {
  return words.filter((w) => exist(board, w));
}

/**
 * Judul: Dimensi grid (validasi persegi panjang)
 *
 * Soal test eksplisit:
 * - Baris kosong → false.
 *
 * @param {string[][]} board
 */
export function isRectangularGrid(board) {
  if (!board.length) return false;
  const w = board[0].length;
  return board.every((row) => row.length === w);
}
