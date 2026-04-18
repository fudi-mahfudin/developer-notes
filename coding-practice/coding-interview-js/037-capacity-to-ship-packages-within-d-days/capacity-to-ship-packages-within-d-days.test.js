import { describe, it, expect } from 'vitest';
import { shipWithinDays } from './capacity-to-ship-packages-within-d-days.js';

describe('shipWithinDays', () => {
  it('contoh', () => {
    expect(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)).toBe(15);
  });

  it('satu hari', () => {
    expect(shipWithinDays([3, 2, 2, 4, 1, 4], 1)).toBe(16);
  });
});
