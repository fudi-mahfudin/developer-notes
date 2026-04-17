/**
 * LRU Cache
 * @see knowledge-base/05-coding-interview-pembahasan/048-lru-cache.md
 */
export class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.cap = capacity;
    /** @type {Map<number, number>} */
    this.cache = new Map();
  }

  /**
   * @param {number} key
   * @returns {number}
   */
  get(key) {
    if (!this.cache.has(key)) return -1;
    const v = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, v);
    return v;
  }

  /**
   * @param {number} key
   * @param {number} value
   * @returns {void}
   */
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.cap) {
      const first = this.cache.keys().next().value;
      this.cache.delete(first);
    }
  }
}
