import { describe, it, expect } from 'vitest';
import { exist } from './word-search.js';

describe('exist', () => {
  it('contoh', () => {
    const b = [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ].map((r) => [...r]);
    expect(exist(b, 'ABCCED')).toBe(true);
  });

  it('tidak ada', () => {
    const b = [['A', 'B'], ['C', 'D']].map((r) => [...r]);
    expect(exist(b, 'ABCD')).toBe(false);
  });
});
