import { describe, it, expect } from 'vitest';
import { findTargetSumWays } from './target-sum.js';

describe('findTargetSumWays', () => {
  it('contoh', () => {
    expect(findTargetSumWays([1, 1, 1, 1, 1], 3)).toBe(5);
    expect(findTargetSumWays([1], 1)).toBe(1);
  });
});
