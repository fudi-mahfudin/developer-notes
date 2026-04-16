import { describe, it, expect } from 'vitest';
import { numIslands } from './number-of-islands.js';

describe('numIslands', () => {
  it('contoh', () => {
    const g = [
      ['1', '1', '1', '1', '0'],
      ['1', '1', '0', '1', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
    ];
    const g2 = g.map((row) => [...row]);
    expect(numIslands(g2)).toBe(1);
  });
});
