/**
 * Remove Nth Node From End of List
 * @see knowledge-base/05-coding-interview-pembahasan/043-remove-nth-node-from-end-of-list.md
 */
export class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * @param {ListNode|null} head
 * @param {number} n
 * @returns {ListNode|null}
 */
export function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let fast = dummy;
  let slow = dummy;
  for (let i = 0; i <= n; i++) fast = fast.next;
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
}
