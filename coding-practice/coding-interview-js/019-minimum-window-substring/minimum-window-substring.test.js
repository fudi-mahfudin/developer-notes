import { describe, it, expect } from 'vitest';
import { minWindow } from './minimum-window-substring.js';

describe('minWindow', () => {
  it('contoh klasik', () => {
    expect(minWindow('ADOBECODEBANC', 'ABC')).toBe('BANC');
  });

  it('t sama panjang s', () => {
    expect(minWindow('a', 'a')).toBe('a');
  });

  it('tidak ada', () => {
    expect(minWindow('a', 'aa')).toBe('');
  });

  it('t kosong: konvensi', () => {
    expect(minWindow('abc', '')).toBe('');
  });
});
