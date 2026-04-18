import { describe, it, expect } from 'vitest';
import { coinChange } from './coin-change.js';

describe('coinChange', () => {
  it('contoh', () => {
    expect(coinChange([1, 2, 5], 11)).toBe(3);
    expect(coinChange([2], 3)).toBe(-1);
  });
});
