/**
 * Search a 2D Matrix
 * @see knowledge-base/05-coding-test2/031-search-a-2d-matrix.md
 *
 * Matrix terurut per baris; baris berikutnya lebih besar dari baris sebelumnya.
 * Time: O(log(mn)), Space: O(1)
 *
 * @param {number[][]} matrix
 * @param {number} target
 * @returns {boolean}
 */
export function searchMatrix(matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;
  const m = matrix.length;
  const n = matrix[0].length;
  let lo = 0;
  let hi = m * n - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const v = matrix[Math.floor(mid / n)][mid % n];
    if (v === target) return true;
    if (v < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}
