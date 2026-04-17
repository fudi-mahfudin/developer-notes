import { describe, it, expect } from 'vitest';
import { LRUCache } from './lru-cache.js';

describe('LRUCache', () => {
  it('urutan LRU', () => {
    const c = new LRUCache(2);
    c.put(1, 1);
    c.put(2, 2);
    expect(c.get(1)).toBe(1);
    c.put(3, 3);
    expect(c.get(2)).toBe(-1);
    c.put(4, 4);
    expect(c.get(1)).toBe(-1);
    expect(c.get(3)).toBe(3);
    expect(c.get(4)).toBe(4);
  });
});
