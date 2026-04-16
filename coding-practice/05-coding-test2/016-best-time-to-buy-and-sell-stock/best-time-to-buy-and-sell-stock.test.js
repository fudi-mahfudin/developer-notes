import { describe, it, expect } from 'vitest';
import { maxProfit } from './best-time-to-buy-and-sell-stock.js';

describe('maxProfit', () => {
  it('naik terus', () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
  });

  it('tidak ada profit', () => {
    expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
  });

  it('dua harga', () => {
    expect(maxProfit([1, 2])).toBe(1);
  });
});
