import { describe, it, expect } from 'vitest';
import { isPalindrome } from './valid-palindrome.js';

describe('isPalindrome', () => {
  it('contoh LC', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
  });

  it('bukan palindrome', () => {
    expect(isPalindrome('race a car')).toBe(false);
  });

  it('hanya non-alnum', () => {
    expect(isPalindrome(' ')).toBe(true);
  });

  it('kosong', () => {
    expect(isPalindrome('')).toBe(true);
  });
});
