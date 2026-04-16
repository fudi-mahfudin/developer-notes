/**
 * Linked List Cycle
 * @see knowledge-base/05-coding-test2/046-linked-list-cycle.md
 */
export class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * @param {ListNode|null} head
 * @returns {boolean}
 */
export function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast?.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
