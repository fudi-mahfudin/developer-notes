/**
 * Find the Duplicate Number
 * @see knowledge-base/05-coding-test2/047-find-the-duplicate-number.md
 *
 * Floyd pada indeks: array seperti linked list.
 *
 * @param {number[]} nums
 * @returns {number}
 */
export function findDuplicate(nums) {
  let slow = nums[0];
  let fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}
