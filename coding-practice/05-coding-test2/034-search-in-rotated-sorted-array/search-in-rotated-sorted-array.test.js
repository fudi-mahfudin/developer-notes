import { describe, it, expect } from 'vitest';
import { searchRotated } from './search-in-rotated-sorted-array.js';

describe('searchRotated', () => {
  it('contoh', () => {
    expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)).toBe(4);
    expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)).toBe(-1);
  });

  it('satu elemen', () => {
    expect(searchRotated([1], 0)).toBe(-1);
  });
});
