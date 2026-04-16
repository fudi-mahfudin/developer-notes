/**
 * Capacity To Ship Packages Within D Days
 * @see knowledge-base/05-coding-test2/037-capacity-to-ship-packages-within-d-days.md
 *
 * @param {number[]} weights
 * @param {number} days
 * @returns {number}
 */

function feasible(weights, cap, days) {
  let d = 1;
  let cur = 0;
  for (const w of weights) {
    if (w > cap) return false;
    if (cur + w > cap) {
      d++;
      cur = w;
    } else cur += w;
    if (d > days) return false;
  }
  return true;
}

export function shipWithinDays(weights, days) {
  let lo = Math.max(...weights);
  let hi = weights.reduce((a, b) => a + b, 0);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (feasible(weights, mid, days)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
