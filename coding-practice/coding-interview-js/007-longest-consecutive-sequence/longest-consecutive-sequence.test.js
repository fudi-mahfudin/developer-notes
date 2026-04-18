import { describe, it, expect } from 'vitest';
import { longestConsecutive } from './longest-consecutive-sequence.js';

describe('longestConsecutive', () => {
  it('contoh klasik', () => {
    expect(longestConsecutive([100, 4, 200, 1, 3, 2])).toBe(4);
  });

  it('array kosong', () => {
    expect(longestConsecutive([])).toBe(0);
  });

  it('duplikat di input', () => {
    expect(longestConsecutive([0, 0])).toBe(1);
  });

  it('negatif', () => {
    expect(longestConsecutive([-1, -2, -3, 0])).toBe(4);
  });
});
