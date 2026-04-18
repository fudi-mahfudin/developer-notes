/**
 * Coin Change
 * @see knowledge-base/05-coding-interview-pembahasan/093-coin-change.md
 *
 * @param {number[]} coins
 * @param {number} amount
 * @returns {number}
 */
export function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a - c >= 0) dp[a] = Math.min(dp[a], dp[a - c] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
