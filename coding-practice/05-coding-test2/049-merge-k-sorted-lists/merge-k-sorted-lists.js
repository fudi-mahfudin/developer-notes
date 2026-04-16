/**
 * Merge K Sorted Lists
 * @see knowledge-base/05-coding-test2/049-merge-k-sorted-lists.md
 */
export class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwo(l1, l2) {
  const dummy = new ListNode(0);
  let t = dummy;
  let a = l1;
  let b = l2;
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

/**
 * @param {(ListNode|null)[]} lists
 * @returns {ListNode|null}
 */
export function mergeKLists(lists) {
  if (!lists.length) return null;
  let arr = lists;
  while (arr.length > 1) {
    const next = [];
    for (let i = 0; i < arr.length; i += 2) {
      next.push(mergeTwo(arr[i], arr[i + 1] ?? null));
    }
    arr = next;
  }
  return arr[0];
}
