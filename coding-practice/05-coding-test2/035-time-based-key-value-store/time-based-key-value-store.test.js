import { describe, it, expect } from 'vitest';
import { TimeMap } from './time-based-key-value-store.js';

describe('TimeMap', () => {
  it('operasi dasar', () => {
    const tm = new TimeMap();
    tm.set('foo', 'bar', 1);
    expect(tm.get('foo', 1)).toBe('bar');
    expect(tm.get('foo', 3)).toBe('bar');
    tm.set('foo', 'bar2', 4);
    expect(tm.get('foo', 4)).toBe('bar2');
    expect(tm.get('foo', 5)).toBe('bar2');
  });

  it('tanpa predecesor', () => {
    const tm = new TimeMap();
    tm.set('love', 'high', 10);
    tm.set('love', 'low', 20);
    expect(tm.get('love', 5)).toBe('');
  });
});
