import { describe, it, expect } from 'vitest';
import { peakIndexInMountainArray } from './peak-index-in-a-mountain-array.js';

describe('peakIndexInMountainArray', () => {
  it('contoh', () => {
    expect(peakIndexInMountainArray([0, 1, 0])).toBe(1);
    expect(peakIndexInMountainArray([0, 2, 1, 0])).toBe(1);
  });
});
