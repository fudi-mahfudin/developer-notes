/**
 * Judul: Topik 34 — Prefix sum 2D
 *
 * Soal test:
 * - buildPrefixSum2D: `ps[i+1][j+1]` jumlah persegi dari (0,0) ke (i,j) inklusif.
 * - rangeSum2D: query sub-persegi inklusif dengan inklusi-eksklusi.
 *
 * Kontrak: matrix persegi panjang; sel finite number.
 *
 * Solusi: `ps[i][j] = val + ps[i-1][j] + ps[i][j-1] - ps[i-1][j-1]` (1-indexed padding).
 *
 * @see knowledge-base/05-coding-interview-v2/34-2d-prefix-sum.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/34-2d-prefix-sum/2d-prefix-sum.test.js`
 */

/**
 * Judul: Bangun prefix 2D dengan baris 0 dan kolom 0 nol
 *
 * Soal test:
 * - Matrix 2×3 contoh di tes — query sudut konsisten.
 *
 * Kontrak: `matrix` non-kosong rectangular.
 *
 * Solusi: Double loop.
 *
 * @param {number[][]} matrix
 * @returns {number[][]}
 */
export function buildPrefixSum2D(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) throw new RangeError("matrix must be non-empty");
  const rows = matrix.length;
  const cols = matrix[0].length;
  for (let i = 0; i < rows; i++) {
    if (!Array.isArray(matrix[i]) || matrix[i].length !== cols) {
      throw new RangeError("matrix must be rectangular");
    }
  }
  /** @type {number[][]} */
  const ps = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = matrix[i][j];
      if (typeof x !== "number" || !Number.isFinite(x)) throw new TypeError("cells must be finite numbers");
      ps[i + 1][j + 1] = x + ps[i][j + 1] + ps[i + 1][j] - ps[i][j];
    }
  }
  return ps;
}

/**
 * Judul: Jumlah sub-persegi [r1,c1] — [r2,c2] inklusif (koordinat matrix asli)
 *
 * Soal test:
 * - Nilai sama dengan jumlah manual pada contoh kecil.
 *
 * Kontrak: `0 <= r1 <= r2 < rows`, `0 <= c1 <= c2 < cols`.
 *
 * Solusi: `ps[r2+1][c2+1] - ps[r1][c2+1] - ps[r2+1][c1] + ps[r1][c1]`.
 *
 * @param {number[][]} ps
 * @param {number} r1
 * @param {number} c1
 * @param {number} r2
 * @param {number} c2
 */
export function rangeSum2D(ps, r1, c1, r2, c2) {
  if (!Array.isArray(ps)) throw new TypeError("ps must be array");
  if (![r1, c1, r2, c2].every((x) => Number.isInteger(x) && x >= 0)) {
    throw new RangeError("coordinates must be non-negative integers");
  }
  if (r1 > r2 || c1 > c2) throw new RangeError("invalid rectangle");
  return ps[r2 + 1][c2 + 1] - ps[r1][c2 + 1] - ps[r2 + 1][c1] + ps[r1][c1];
}

/**
 * Judul: Jumlah seluruh matrix dari prefix 2D
 *
 * Soal test:
 * - Sama dengan `rangeSum2D(ps,0,0,rows-1,cols-1)`.
 *
 * Kontrak: `ps` hasil `buildPrefixSum2D` untuk matrix asli.
 *
 * Solusi: Query persegi penuh.
 *
 * @param {number[][]} ps
 * @param {number} rows
 * @param {number} cols
 */
export function sumEntireMatrixFromPrefix(ps, rows, cols) {
  if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 1 || cols < 1) {
    throw new RangeError("rows/cols must be positive");
  }
  return rangeSum2D(ps, 0, 0, rows - 1, cols - 1);
}

/**
 * Judul: Beberapa query rentang — akumulasi (demo batch API)
 *
 * Soal test:
 * - Hasil sama dengan jumlah manual tiap query.
 *
 * Kontrak: setiap query `[r1,c1,r2,c2]` valid.
 *
 * Solusi: Loop `rangeSum2D`.
 *
 * @param {number[][]} ps
 * @param {number[][]} queries
 */
export function batchRangeSum2D(ps, queries) {
  if (!Array.isArray(queries)) throw new TypeError("queries must be array");
  /** @type {number[]} */
  const out = [];
  for (const q of queries) {
    if (!Array.isArray(q) || q.length !== 4) throw new RangeError("each query [r1,c1,r2,c2]");
    out.push(rangeSum2D(ps, q[0], q[1], q[2], q[3]));
  }
  return out;
}

/**
 * Judul: Selisih dua sub-persegi (untuk analisis delta)
 *
 * Soal test:
 * - Nilai = sum(A) - sum(B) dengan definisi persegi valid.
 *
 * Kontrak: persegi `a` dan `b` valid terhadap `ps`.
 *
 * Solusi: Dua query `rangeSum2D`.
 *
 * @param {number[][]} ps
 * @param {[number, number, number, number]} rectA
 * @param {[number, number, number, number]} rectB
 */
export function diffTwoRegions(ps, rectA, rectB) {
  const [ar1, ac1, ar2, ac2] = rectA;
  const [br1, bc1, br2, bc2] = rectB;
  return rangeSum2D(ps, ar1, ac1, ar2, ac2) - rangeSum2D(ps, br1, bc1, br2, bc2);
}
