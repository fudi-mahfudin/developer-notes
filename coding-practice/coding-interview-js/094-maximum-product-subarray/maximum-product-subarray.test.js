import { describe, it, expect } from 'vitest';
import { maxProduct } from './maximum-product-subarray.js';

describe('maxProduct', () => {
  it('negatif', () => {
    expect(maxProduct([2, 3, -2, 4])).toBe(6);
    expect(maxProduct([-2, 0, -1])).toBe(0);
  });
});
