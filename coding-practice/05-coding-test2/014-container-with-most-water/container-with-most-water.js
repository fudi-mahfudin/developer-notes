/**
 * Container With Most Water
 * @see knowledge-base/05-coding-test2/014-container-with-most-water.md
 *
 * Ringkasan: maksimalkan luas min(h[i],h[j])*|j-i|.
 * Time: O(n), Space: O(1)
 *
 * @param {number[]} height
 * @returns {number}
 */
export function maxArea(height) {
  let L = 0;
  let R = height.length - 1;
  let best = 0;
  while (L < R) {
    const w = R - L;
    best = Math.max(best, w * Math.min(height[L], height[R]));
    if (height[L] < height[R]) L++;
    else R--;
  }
  return best;
}
