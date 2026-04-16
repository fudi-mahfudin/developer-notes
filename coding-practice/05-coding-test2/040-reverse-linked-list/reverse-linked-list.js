/**
 * Reverse Linked List
 * @see knowledge-base/05-coding-test2/040-reverse-linked-list.md
 */
export class ListNode {
  /**
   * @param {number} val
   * @param {ListNode|null} next
   */
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * @param {ListNode|null} head
 * @returns {ListNode|null}
 */
export function reverseList(head) {
  let prev = null;
  let cur = head;
  while (cur) {
    const nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  return prev;
}
