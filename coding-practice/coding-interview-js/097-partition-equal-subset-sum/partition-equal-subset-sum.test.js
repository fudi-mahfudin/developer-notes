import { describe, it, expect } from 'vitest';
import { canPartition } from './partition-equal-subset-sum.js';

describe('canPartition', () => {
  it('contoh', () => {
    expect(canPartition([1, 5, 11, 5])).toBe(true);
    expect(canPartition([1, 2, 3, 5])).toBe(false);
  });
});
