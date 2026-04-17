/**
 * Judul: Topik 33 — Traversal matrix (spiral)
 *
 * Soal test:
 * - spiralOrder: matrix `m x n` — keluaran spiral searah jarum jam dari luar ke dalam.
 * - layerBounds: helper batas per “lapisan” untuk dokumentasi API.
 *
 * Kontrak: matrix persegi panjang; elemen finite number (atau sembarang untuk tes shallow).
 *
 * Solusi: Batas `top,bottom,left,right`; gerak kanan→bawah→kiri→atas; persempit.
 *
 * @see knowledge-base/05-coding-interview-v2/33-matrix-traversal-spiral.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/33-matrix-traversal-spiral/matrix-traversal-spiral.test.js`
 */

/**
 * Judul: Spiral clockwise — flatten ke array satu dimensi
 *
 * Soal test:
 * - `[[1,2,3],[8,9,4],[7,6,5]]` → `[1,2,3,4,5,6,7,8,9]` (urutan spiral).
 *
 * Kontrak: `matrix` non-kosong; setiap baris sama panjang.
 *
 * Solusi: Simulasi boundary; empat arah bergantian.
 *
 * @param {number[][]} matrix
 * @returns {number[]}
 */
export function spiralOrder(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) throw new RangeError("matrix must be non-empty");
  const rows = matrix.length;
  const cols = matrix[0].length;
  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== cols) {
      throw new RangeError("matrix must be rectangular");
    }
  }
  /** @type {number[]} */
  const out = [];
  let top = 0;
  let bottom = rows - 1;
  let left = 0;
  let right = cols - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) out.push(matrix[top][c]);
    top += 1;
    if (top > bottom) break;
    for (let r = top; r <= bottom; r++) out.push(matrix[r][right]);
    right -= 1;
    if (left > right) break;
    for (let c = right; c >= left; c--) out.push(matrix[bottom][c]);
    bottom -= 1;
    if (top > bottom) break;
    for (let r = bottom; r >= top; r--) out.push(matrix[r][left]);
    left += 1;
  }
  return out;
}

/**
 * Judul: Jumlah elemen satu lapisan luar
 *
 * Soal test:
 * - Untuk 3×3 → lapisan pertama 8 elemen (atau 9 jika definisi berbeda — di sini spiral full 9).
 *
 * Kontrak: `rows`, `cols` positif.
 *
 * Solusi: `spiralOrder` panjang = `rows*cols`.
 *
 * @param {number} rows
 * @param {number} cols
 */
export function spiralElementCount(rows, cols) {
  if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 1 || cols < 1) {
    throw new RangeError("rows and cols must be positive integers");
  }
  return rows * cols;
}

/**
 * Judul: Validasi matrix persegi panjang non-kosong
 *
 * Soal test:
 * - Dipakai sebelum traversal; baris kosong → `RangeError`.
 *
 * Kontrak: setiap sel finite number untuk topik ini.
 *
 * Solusi: Cek panjang baris konsisten.
 *
 * @param {number[][]} matrix
 * @returns {{ rows: number; cols: number }}
 */
export function assertRectangularNumberMatrix(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) throw new RangeError("matrix must be non-empty");
  const rows = matrix.length;
  const cols = matrix[0].length;
  for (let i = 0; i < rows; i++) {
    if (!Array.isArray(matrix[i]) || matrix[i].length !== cols) {
      throw new RangeError("matrix must be rectangular");
    }
    for (let j = 0; j < cols; j++) {
      const x = matrix[i][j];
      if (typeof x !== "number" || !Number.isFinite(x)) throw new TypeError("cells must be finite numbers");
    }
  }
  return { rows, cols };
}

/**
 * Judul: Isi matrix `m x n` dengan nilai 1..mn spiral searah jarum jam
 *
 * Soal test:
 * - `generateSpiralFilled(3,3)` flatten = `spiralOrder` dari matrix yang sama.
 *
 * Kontrak: `rows`,`cols` positif.
 *
 * Solusi: Isi lapisan luar ke dalam dengan batas `top,bottom,left,right`.
 *
 * @param {number} rows
 * @param {number} cols
 * @returns {number[][]}
 */
export function generateSpiralFilled(rows, cols) {
  if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 1 || cols < 1) {
    throw new RangeError("rows and cols must be positive integers");
  }
  /** @type {number[][]} */
  const m = Array.from({ length: rows }, () => new Array(cols).fill(0));
  let val = 1;
  let top = 0;
  let bottom = rows - 1;
  let left = 0;
  let right = cols - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) m[top][c] = val++;
    top += 1;
    if (top > bottom) break;
    for (let r = top; r <= bottom; r++) m[r][right] = val++;
    right -= 1;
    if (left > right) break;
    for (let c = right; c >= left; c--) m[bottom][c] = val++;
    bottom -= 1;
    if (top > bottom) break;
    for (let r = bottom; r >= top; r--) m[r][left] = val++;
    left += 1;
  }
  return m;
}
