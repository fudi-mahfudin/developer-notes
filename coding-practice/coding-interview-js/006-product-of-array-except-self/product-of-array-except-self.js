/**
 * Product of Array Except Self
 * @see knowledge-base/05-coding-interview-pembahasan/006-product-of-array-except-self.md
 *
 * Ringkasan: output[i] = produk semua elemen kecuali nums[i], tanpa pembagian.
 * Time: O(n), Space: O(1) ekstra (tidak termasuk output)
 *
 * @param {number[]} nums
 * @returns {number[]}
 */
export function productExceptSelf(nums) {
  const n = nums.length;
  const out = Array(n);
  let p = 1;
  for (let i = 0; i < n; i++) {
    out[i] = p;
    p *= nums[i];
  }
  p = 1;
  for (let i = n - 1; i >= 0; i--) {
    out[i] *= p;
    p *= nums[i];
  }
  return out;
}
