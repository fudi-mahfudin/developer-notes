/**
 * Sliding Window Maximum
 * @see knowledge-base/05-coding-interview-pembahasan/021-sliding-window-maximum.md
 *
 * Ringkasan: maksimum tiap window berukuran k.
 * Time: O(n), Space: O(k)
 *
 * @param {number[]} nums
 * @param {number} k
 * @returns {number[]}
 */
export function maxSlidingWindow(nums, k) {
  if (k === 0) return [];
  const dq = [];
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) dq.pop();
    dq.push(i);
    if (dq[0] <= i - k) dq.shift();
    if (i >= k - 1) res.push(nums[dq[0]]);
  }
  return res;
}
