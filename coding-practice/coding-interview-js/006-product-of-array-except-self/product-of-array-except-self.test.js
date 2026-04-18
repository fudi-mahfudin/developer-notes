import { describe, it, expect } from 'vitest';
import { productExceptSelf } from './product-of-array-except-self.js';

describe('productExceptSelf', () => {
  it('contoh klasik', () => {
    expect(productExceptSelf([1, 2, 3, 4])).toEqual([24, 12, 8, 6]);
  });

  it('ada nol', () => {
    const got = productExceptSelf([-1, 1, 0, -3, 3]);
    const asPlainZero = got.map((x) => (x === 0 ? 0 : x));
    expect(asPlainZero).toEqual([0, 0, 9, 0, 0]);
  });

  it('dua elemen', () => {
    expect(productExceptSelf([3, 4])).toEqual([4, 3]);
  });
});
