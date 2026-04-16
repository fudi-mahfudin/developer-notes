import { describe, it, expect } from 'vitest';
import { findMin } from './find-minimum-in-rotated-sorted-array.js';

describe('findMin', () => {
  it('rotasi', () => {
    expect(findMin([3, 4, 5, 1, 2])).toBe(1);
  });

  it('tidak dirotasi', () => {
    expect(findMin([11, 13, 15, 17])).toBe(11);
  });
});
