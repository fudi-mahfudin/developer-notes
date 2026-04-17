import { describe, it, expect } from 'vitest';
import { lengthOfLIS } from './longest-increasing-subsequence.js';

describe('lengthOfLIS', () => {
  it('contoh', () => {
    expect(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])).toBe(4);
    expect(lengthOfLIS([0, 1, 0, 3, 2, 3])).toBe(4);
  });
});
