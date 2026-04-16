/**
 * Copy List with Random Pointer
 * @see knowledge-base/05-coding-test2/044-copy-list-with-random-pointer.md
 */
export class Node {
  /**
   * @param {number} val
   * @param {Node|null} next
   * @param {Node|null} random
   */
  constructor(val = 0, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

/**
 * @param {Node|null} head
 * @returns {Node|null}
 */
export function copyRandomList(head) {
  if (!head) return null;
  const map = new Map();
  let p = head;
  while (p) {
    map.set(p, new Node(p.val));
    p = p.next;
  }
  p = head;
  while (p) {
    const c = map.get(p);
    c.next = p.next ? map.get(p.next) : null;
    c.random = p.random ? map.get(p.random) : null;
    p = p.next;
  }
  return map.get(head);
}
