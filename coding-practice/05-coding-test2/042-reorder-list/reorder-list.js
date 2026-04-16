/**
 * Reorder List
 * @see knowledge-base/05-coding-test2/042-reorder-list.md
 */
export class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverse(head) {
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

/**
 * @param {ListNode|null} head
 * @returns {void}
 */
export function reorderList(head) {
  if (!head?.next) return;
  let slow = head;
  let fast = head;
  while (fast.next?.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let second = reverse(slow.next);
  slow.next = null;
  let first = head;
  while (second) {
    const t1 = first.next;
    const t2 = second.next;
    first.next = second;
    second.next = t1;
    first = t1;
    second = t2;
  }
}
