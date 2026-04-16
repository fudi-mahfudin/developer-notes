import { describe, it, expect } from 'vitest';
import { splitArray } from './split-array-largest-sum.js';

describe('splitArray', () => {
  it('contoh', () => {
    expect(splitArray([7, 2, 5, 10, 8], 2)).toBe(18);
  });

  it('k sama n', () => {
    expect(splitArray([1, 4, 4], 3)).toBe(4);
  });
});
