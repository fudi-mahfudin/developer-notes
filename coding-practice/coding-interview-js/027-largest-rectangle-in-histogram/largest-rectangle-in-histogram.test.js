import { describe, it, expect } from 'vitest';
import { largestRectangleArea } from './largest-rectangle-in-histogram.js';

describe('largestRectangleArea', () => {
  it('contoh LC', () => {
    expect(largestRectangleArea([2, 1, 5, 6, 2, 3])).toBe(10);
  });

  it('tower tunggal', () => {
    expect(largestRectangleArea([4])).toBe(4);
  });

  it('naik lalu turun', () => {
    expect(largestRectangleArea([2, 4])).toBe(4);
  });
});
