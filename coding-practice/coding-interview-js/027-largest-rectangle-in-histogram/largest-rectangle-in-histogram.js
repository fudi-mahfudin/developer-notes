/**
 * Largest Rectangle in Histogram
 * @see knowledge-base/05-coding-interview-pembahasan/027-largest-rectangle-in-histogram.md
 *
 * Monotonic stack: untuk tiap bar, area = h * lebar sampai batas lebih rendah.
 * Time: O(n), Space: O(n)
 *
 * @param {number[]} heights
 * @returns {number}
 */
export function largestRectangleArea(heights) {
  const st = [-1];
  let best = 0;
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];
    while (st[st.length - 1] !== -1 && h < heights[st[st.length - 1]]) {
      const j = st.pop();
      const cur = heights[j] * (i - st[st.length - 1] - 1);
      best = Math.max(best, cur);
    }
    st.push(i);
  }
  return best;
}
