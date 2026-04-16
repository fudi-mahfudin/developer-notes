/**
 * Time Based Key-Value Store
 * @see knowledge-base/05-coding-test2/035-time-based-key-value-store.md
 */
export class TimeMap {
  constructor() {
    /** @type {Map<string, { t: number; v: string }[]>} */
    this.map = new Map();
  }

  /**
   * @param {string} key
   * @param {string} value
   * @param {number} timestamp
   * @returns {void}
   */
  set(key, value, timestamp) {
    if (!this.map.has(key)) this.map.set(key, []);
    this.map.get(key).push({ t: timestamp, v: value });
  }

  /**
   * @param {string} key
   * @param {number} timestamp
   * @returns {string}
   */
  get(key, timestamp) {
    const arr = this.map.get(key);
    if (!arr?.length) return '';
    let lo = 0;
    let hi = arr.length - 1;
    let best = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid].t <= timestamp) {
        best = mid;
        lo = mid + 1;
      } else hi = mid - 1;
    }
    return best === -1 ? '' : arr[best].v;
  }
}
