/**
 * Implement Queue using Stacks
 * @see knowledge-base/05-coding-test2/028-implement-queue-using-stacks.md
 */

export class MyQueue {
  constructor() {
    this.stackIn = [];
    this.stackOut = [];
  }

  _pour() {
    if (this.stackOut.length === 0) {
      while (this.stackIn.length) this.stackOut.push(this.stackIn.pop());
    }
  }

  /** @param {number} x @returns {void} */
  push(x) {
    this.stackIn.push(x);
  }

  /** @returns {number} */
  pop() {
    this._pour();
    return this.stackOut.pop();
  }

  /** @returns {number} */
  peek() {
    this._pour();
    return this.stackOut[this.stackOut.length - 1];
  }

  /** @returns {boolean} */
  empty() {
    return this.stackIn.length === 0 && this.stackOut.length === 0;
  }
}
