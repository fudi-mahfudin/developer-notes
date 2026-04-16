/**
 * Climbing Stairs
 * @see knowledge-base/05-coding-test2/086-climbing-stairs.md
 *
 * @param {number} n
 * @returns {number}
 */
export function climbStairs(n) {
  let a = 1;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
