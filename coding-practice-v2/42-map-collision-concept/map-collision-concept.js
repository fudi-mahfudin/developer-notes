/**
 * Judul: Topik 42 — Konsep collision (hash map sederhana)
 *
 * Soal test:
 * - SimpleHashMap: `set`/`get`/`has` dengan **separate chaining** (array bucket); `hashString` deterministik sederhana.
 * - collisionStats: jumlah bucket yang berisi lebih dari satu entri (untuk ilustrasi collision).
 *
 * Kontrak: kunci string; nilai sembarang; hash bukan kriptografi.
 *
 * Solusi: `hash % bucketCount`; tiap bucket array pasangan `{key, value}`.
 *
 * @see knowledge-base/05-coding-interview-v2/42-map-collision-concept.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/42-map-collision-concept/map-collision-concept.test.js`
 */

/**
 * Judul: Hash string sederhana (djb2-like)
 *
 * Soal test:
 * - Deterministik untuk string yang sama.
 *
 * Kontrak: `s` string.
 *
 * Solusi: XOR/shift; return unsigned 32-bit.
 *
 * @param {string} s
 */
export function hashString(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = (h * 33) ^ s.charCodeAt(i);
  }
  return h >>> 0;
}

/**
 * Judul: Hash map dengan separate chaining
 *
 * Soal test:
 * - `set`/`get`/`has`; update nilai key sama.
 *
 * Kontrak: `bucketCount` integer ≥ 1.
 *
 * Solusi: Buckets array of lists; linear scan dalam bucket untuk equality kunci.
 */
export class SimpleHashMap {
  /**
   * @param {number} [bucketCount]
   */
  constructor(bucketCount = 8) {
    if (!Number.isInteger(bucketCount) || bucketCount < 1) {
      throw new RangeError("bucketCount must be positive integer");
    }
    /** @type {Array<Array<{ key: string; value: unknown }>>} */
    this.buckets = Array.from({ length: bucketCount }, () => []);
    this.bucketCount = bucketCount;
  }

  /**
   * @param {string} key
   */
  #bucketIndex(key) {
    return hashString(key) % this.bucketCount;
  }

  /**
   * @param {string} key
   * @param {unknown} value
   */
  set(key, value) {
    if (typeof key !== "string") throw new TypeError("key must be string");
    const bi = this.#bucketIndex(key);
    const bucket = this.buckets[bi];
    for (const e of bucket) {
      if (e.key === key) {
        e.value = value;
        return;
      }
    }
    bucket.push({ key, value });
  }

  /**
   * @param {string} key
   */
  get(key) {
    if (typeof key !== "string") throw new TypeError("key must be string");
    const bucket = this.buckets[this.#bucketIndex(key)];
    for (const e of bucket) {
      if (e.key === key) return e.value;
    }
    return undefined;
  }

  /**
   * @param {string} key
   */
  has(key) {
    return this.get(key) !== undefined;
  }
}

/**
 * Judul: Hitung bucket dengan lebih dari satu entri
 *
 * Soal test:
 * - Setelah banyak `set` dengan bucket kecil, `>0` collision buckets mungkin > 0.
 *
 * Kontrak: `map` instance `SimpleHashMap`.
 *
 * Solusi: Iterasi buckets.
 *
 * @param {SimpleHashMap} map
 */
export function collisionBucketCount(map) {
  if (!(map instanceof SimpleHashMap)) throw new TypeError("expected SimpleHashMap");
  let c = 0;
  for (const b of map.buckets) {
    if (b.length > 1) c += 1;
  }
  return c;
}
