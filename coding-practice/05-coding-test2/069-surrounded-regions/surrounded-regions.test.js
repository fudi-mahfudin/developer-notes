import { describe, it, expect } from 'vitest';
import { solve } from './surrounded-regions.js';

describe('solve', () => {
  it('flip O tertutup', () => {
    const b = [
      ['X', 'X', 'X', 'X'],
      ['X', 'O', 'O', 'X'],
      ['X', 'X', 'O', 'X'],
      ['X', 'O', 'X', 'X'],
    ].map((r) => [...r]);
    solve(b);
    expect(b).toEqual([
      ['X', 'X', 'X', 'X'],
      ['X', 'X', 'X', 'X'],
      ['X', 'X', 'X', 'X'],
      ['X', 'O', 'X', 'X'],
    ]);
  });
});
