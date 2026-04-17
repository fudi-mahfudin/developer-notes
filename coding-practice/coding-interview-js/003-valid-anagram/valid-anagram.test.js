import { describe, it, expect } from 'vitest';
import { isAnagram } from './valid-anagram.js';

describe('isAnagram', () => {
  it('anagram klasik', () => {
    expect(isAnagram('anagram', 'nagaram')).toBe(true);
  });

  it('bukan anagram', () => {
    expect(isAnagram('rat', 'car')).toBe(false);
  });

  it('panjang beda', () => {
    expect(isAnagram('a', 'ab')).toBe(false);
  });

  it('string kosong', () => {
    expect(isAnagram('', '')).toBe(true);
  });
});
