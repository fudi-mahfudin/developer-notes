/**
 * Min Stack
 * @see knowledge-base/05-coding-interview-pembahasan/023-min-stack.md
 *
 * Ringkasan: stack dengan getMin() O(1).
 */
export class MinStack {
  constructor() {
    this.stack = [];
    this.mins = [];
  }

  /**
   * @param {number} val
   * @returns {void}
   */
  push(val) {
    this.stack.push(val);
    const prev = this.mins.length ? this.mins[this.mins.length - 1] : Infinity;
    this.mins.push(Math.min(val, prev));
  }

  /**
   * @returns {void}
   */
  pop() {
    this.stack.pop();
    this.mins.pop();
  }

  /**
   * @returns {number}
   */
  top() {
    return this.stack[this.stack.length - 1];
  }

  /**
   * @returns {number}
   */
  getMin() {
    return this.mins[this.mins.length - 1];
  }
}
