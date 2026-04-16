/**
 * Min Cost Climbing Stairs
 * @see knowledge-base/05-coding-test2/087-min-cost-climbing-stairs.md
 *
 * @param {number[]} cost
 * @returns {number}
 */
export function minCostClimbingStairs(cost) {
  let a = 0;
  let b = 0;
  for (let i = cost.length - 1; i >= 0; i--) {
    const cur = cost[i] + Math.min(a, b);
    b = a;
    a = cur;
  }
  return Math.min(a, b);
}
