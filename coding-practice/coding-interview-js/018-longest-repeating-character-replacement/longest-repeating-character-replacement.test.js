import { describe, it, expect } from 'vitest';
import { characterReplacement } from './longest-repeating-character-replacement.js';

describe('characterReplacement', () => {
  it('contoh klasik', () => {
    expect(characterReplacement('AABABBA', 1)).toBe(4);
  });

  it('k=0', () => {
    expect(characterReplacement('ABAB', 0)).toBe(1);
  });

  it('semua sama', () => {
    expect(characterReplacement('AAAA', 2)).toBe(4);
  });
});
