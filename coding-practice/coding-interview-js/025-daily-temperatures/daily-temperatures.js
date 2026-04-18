/**
 * Daily Temperatures
 * @see knowledge-base/05-coding-interview-pembahasan/025-daily-temperatures.md
 *
 * Ringkasan: untuk tiap hari, hari ke berapa suhu lebih hangat; jika tidak ada, 0.
 * Time: O(n), Space: O(n)
 *
 * @param {number[]} temperatures
 * @returns {number[]}
 */
export function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const ans = Array(n).fill(0);
  const st = [];
  for (let i = 0; i < n; i++) {
    while (st.length && temperatures[i] > temperatures[st[st.length - 1]]) {
      const j = st.pop();
      ans[j] = i - j;
    }
    st.push(i);
  }
  return ans;
}
