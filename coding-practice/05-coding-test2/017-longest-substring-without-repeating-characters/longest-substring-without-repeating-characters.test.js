import { describe, it, expect } from 'vitest';
import { lengthOfLongestSubstring } from './longest-substring-without-repeating-characters.js';

describe('lengthOfLongestSubstring', () => {
  it('contoh klasik', () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
  });

  it('duplikat di awal', () => {
    expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
  });

  it('substring di tengah', () => {
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
  });

  it('kosong', () => {
    expect(lengthOfLongestSubstring('')).toBe(0);
  });
});
