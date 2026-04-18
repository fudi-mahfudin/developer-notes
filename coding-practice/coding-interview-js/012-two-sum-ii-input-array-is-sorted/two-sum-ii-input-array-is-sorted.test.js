import { describe, it, expect } from 'vitest';
import { twoSumII } from './two-sum-ii-input-array-is-sorted.js';

describe('twoSumII', () => {
  it('indeks 1-based', () => {
    expect(twoSumII([2, 7, 11, 15], 9)).toEqual([1, 2]);
  });

  it('dua elemen', () => {
    expect(twoSumII([2, 3, 4], 6)).toEqual([1, 3]);
  });

  it('tidak ada jawaban', () => {
    expect(twoSumII([1, 2, 3], 10)).toEqual([]);
  });
});
