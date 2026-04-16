import { describe, it, expect } from 'vitest';
import { solveNQueens } from './n-queens.js';

describe('solveNQueens', () => {
  it('n=4', () => {
    const got = solveNQueens(4);
    expect(got.length).toBe(2);
    expect(got[0].length).toBe(4);
  });
});
