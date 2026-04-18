import { describe, it, expect } from 'vitest';
import { countSubstrings } from './palindromic-substrings.js';

describe('countSubstrings', () => {
  it('contoh', () => {
    expect(countSubstrings('abc')).toBe(3);
    expect(countSubstrings('aaa')).toBe(6);
  });
});
