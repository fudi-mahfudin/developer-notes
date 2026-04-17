/**
 * Judul: Topik 94 — LRU cache dengan Map order
 *
 * Soal Test eksplisit:
 * - get/put menjaga kapasitas dan evict least recently used.
 * - has, size, keysMostRecentLast helper.
 * - fromEntries membuat cache awal.
 *
 * Kontrak (opsional):
 * - kapasitas > 0.
 *
 * Contoh output:
 * - cap 2: put(1),put(2),get(1),put(3) => key 2 ter-evict.
 *
 * Solusi detail:
 * - Gunakan Map: insertion order dipakai sebagai recency.
 * - Saat get/put existing, delete+set agar pindah ke belakang.
 */

export class LRUCache {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) throw new RangeError("capacity must be > 0");
    this.capacity = capacity;
    this.map = new Map();
  }

  get size() {
    return this.map.size;
  }

  has(key) {
    return this.map.has(key);
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
  }

  delete(key) {
    return this.map.delete(key);
  }

  clear() {
    this.map.clear();
  }

  keysLeastRecentFirst() {
    return [...this.map.keys()];
  }

  keysMostRecentFirst() {
    return [...this.map.keys()].reverse();
  }
}

/**
 * Judul: Build cache dari entries
 * Soal Test eksplisit: entries melebihi kapasitas -> auto evict.
 * Contoh output: fromEntries(2, [[1,1],[2,2],[3,3]]) sisa 2 key.
 * Solusi detail: reuse put berurutan.
 */
export function fromEntries(capacity, entries) {
  const cache = new LRUCache(capacity);
  for (const [k, v] of entries) cache.put(k, v);
  return cache;
}

/**
 * Judul: Snapshot isi cache untuk debug/test
 * Soal Test eksplisit: return array [key,value] urutan LRU->MRU.
 * Contoh output: [[1,1],[3,3]].
 * Solusi detail: spread map entries.
 */
export function snapshot(cache) {
  return [...cache.map.entries()];
}

/**
 * Judul: Hit rate utility
 * Soal Test eksplisit: hit/miss count.
 * Contoh output: 2 hit dari 4 lookup => 0.5.
 * Solusi detail: scan lookup keys.
 */
export function cacheHitRate(cache, lookups) {
  let hit = 0;
  for (const k of lookups) {
    if (cache.get(k) !== -1) hit += 1;
  }
  return lookups.length === 0 ? 0 : hit / lookups.length;
}

