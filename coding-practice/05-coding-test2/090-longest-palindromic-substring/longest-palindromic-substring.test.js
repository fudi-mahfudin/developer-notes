import { describe, it, expect } from 'vitest';
import { longestPalindrome } from './longest-palindromic-substring.js';

describe('longestPalindrome', () => {
  it('contoh', () => {
    expect(['bab', 'aba'].includes(longestPalindrome('babad'))).toBe(true);
    expect(longestPalindrome('cbbd')).toBe('bb');
  });
});
