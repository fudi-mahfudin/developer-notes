/**
 * Merge Two Sorted Lists
 * @see knowledge-base/05-coding-test2/041-merge-two-sorted-lists.md
 */
export class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * @param {ListNode|null} list1
 * @param {ListNode|null} list2
 * @returns {ListNode|null}
 */
export function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let t = dummy;
  let a = list1;
  let b = list2;
  while (a && b) {
    if (a.val <= b.val) {
      t.next = a;
      a = a.next;
    } else {
      t.next = b;
      b = b.next;
    }
    t = t.next;
  }
  t.next = a || b;
  return dummy.next;
}
