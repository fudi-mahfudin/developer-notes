/**
 * Two Sum II — Input Array Is Sorted
 * @see knowledge-base/05-coding-interview-pembahasan/012-two-sum-ii-input-array-is-sorted.md
 *
 * Ringkasan: numbers terurut naik; kembalikan indeks 1-based [i, j].
 * Time: O(n), Space: O(1)
 *
 * @param {number[]} numbers
 * @param {number} target
 * @returns {number[]}
 */
export function twoSumII(numbers, target) {
  let L = 0;
  let R = numbers.length - 1;
  while (L < R) {
    const sum = numbers[L] + numbers[R];
    if (sum === target) return [L + 1, R + 1];
    if (sum < target) L++;
    else R--;
  }
  return [];
}
