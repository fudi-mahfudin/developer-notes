import { describe, it, expect } from 'vitest';
import { findMedianSortedArrays } from './median-of-two-sorted-arrays.js';

describe('findMedianSortedArrays', () => {
  it('ganjil / genap', () => {
    expect(findMedianSortedArrays([1, 3], [2])).toBe(2);
    expect(findMedianSortedArrays([1, 2], [3, 4])).toBe(2.5);
  });

  it('satu array kosong', () => {
    expect(findMedianSortedArrays([], [1])).toBe(1);
  });
});
