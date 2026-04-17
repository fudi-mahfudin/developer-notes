import { describe, it, expect } from 'vitest';
import { maxArea } from './container-with-most-water.js';

describe('maxArea', () => {
  it('contoh klasik', () => {
    expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
  });

  it('dua bar', () => {
    expect(maxArea([1, 1])).toBe(1);
  });

  it('menurun', () => {
    expect(maxArea([4, 3, 2, 1, 4])).toBe(16);
  });
});
