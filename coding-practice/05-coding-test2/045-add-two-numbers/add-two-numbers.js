/**
 * Add Two Numbers
 * @see knowledge-base/05-coding-test2/045-add-two-numbers.md
 */
export class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * @param {ListNode|null} l1
 * @param {ListNode|null} l2
 * @returns {ListNode|null}
 */
export function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let t = dummy;
  let carry = 0;
  while (l1 || l2 || carry) {
    const s = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
    t.next = new ListNode(s % 10);
    carry = Math.floor(s / 10);
    t = t.next;
    l1 = l1?.next ?? null;
    l2 = l2?.next ?? null;
  }
  return dummy.next;
}
