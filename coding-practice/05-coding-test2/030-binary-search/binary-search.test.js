import { describe, it, expect } from 'vitest';
import { binarySearch } from './binary-search.js';

describe('binarySearch', () => {
  it('ketemu tengah / ujung', () => {
    expect(binarySearch([-1, 0, 3, 5, 9, 12], 9)).toBe(4);
    expect(binarySearch([-1, 0, 3, 5, 9, 12], 2)).toBe(-1);
  });

  it('satu elemen', () => {
    expect(binarySearch([5], 5)).toBe(0);
    expect(binarySearch([5], -1)).toBe(-1);
  });
});
