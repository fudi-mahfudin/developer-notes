/**
 * Best Time to Buy and Sell Stock
 * @see knowledge-base/05-coding-interview-pembahasan/016-best-time-to-buy-and-sell-stock.md
 *
 * Ringkasan: satu kali beli lalu jual; profit maksimum.
 * Time: O(n), Space: O(1)
 *
 * @param {number[]} prices
 * @returns {number}
 */
export function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;
  for (const p of prices) {
    minPrice = Math.min(minPrice, p);
    best = Math.max(best, p - minPrice);
  }
  return best;
}
