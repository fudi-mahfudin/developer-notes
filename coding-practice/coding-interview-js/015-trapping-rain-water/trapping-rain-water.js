/**
 * Trapping Rain Water
 * @see knowledge-base/05-coding-interview-pembahasan/015-trapping-rain-water.md
 *
 * Ringkasan: air terjebak antar gedung.
 * Time: O(n), Space: O(1)
 *
 * @param {number[]} height
 * @returns {number}
 */
export function trap(height) {
  let L = 0;
  let R = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;
  while (L < R) {
    if (height[L] < height[R]) {
      if (height[L] >= leftMax) leftMax = height[L];
      else water += leftMax - height[L];
      L++;
    } else {
      if (height[R] >= rightMax) rightMax = height[R];
      else water += rightMax - height[R];
      R--;
    }
  }
  return water;
}
