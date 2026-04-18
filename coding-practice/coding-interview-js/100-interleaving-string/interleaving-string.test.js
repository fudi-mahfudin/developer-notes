import { describe, it, expect } from 'vitest';
import { isInterleave } from './interleaving-string.js';

describe('isInterleave', () => {
  it('contoh', () => {
    expect(isInterleave('aabcc', 'dbbca', 'aadbbcbcac')).toBe(true);
    expect(isInterleave('aabcc', 'dbbca', 'aadbbbaccc')).toBe(false);
  });
});
