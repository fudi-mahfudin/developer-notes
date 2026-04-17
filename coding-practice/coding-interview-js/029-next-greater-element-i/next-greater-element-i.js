/**
 * Next Greater Element I
 * @see knowledge-base/05-coding-interview-pembahasan/029-next-greater-element-i.md
 *
 * Map nilai -> next greater di nums2 (monotonic decreasing stack).
 * Time: O(n+m), Space: O(n+m)
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @returns {number[]}
 */
export function nextGreaterElement(nums1, nums2) {
  const next = new Map();
  const st = [];
  for (const x of nums2) {
    while (st.length && x > st[st.length - 1]) {
      next.set(st.pop(), x);
    }
    st.push(x);
  }
  for (const x of st) next.set(x, -1);
  return nums1.map((x) => next.get(x));
}
