import { describe, it, expect } from 'vitest';
import { solveSudoku } from './sudoku-solver.js';

function isValidSudoku(board) {
  const seen = new Set();
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const v = board[r][c];
      if (v === '.') return false;
      const rows = `r${r}${v}`;
      const cols = `c${c}${v}`;
      const box = `b${(r / 3) | 0}${(c / 3) | 0}${v}`;
      if (seen.has(rows) || seen.has(cols) || seen.has(box)) return false;
      seen.add(rows);
      seen.add(cols);
      seen.add(box);
    }
  }
  return true;
}

describe('solveSudoku', () => {
  it('selesaikan', () => {
    const b = [
      ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
      ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
      ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
      ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
      ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
      ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
      ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
      ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
      ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
    ].map((r) => [...r]);
    solveSudoku(b);
    expect(isValidSudoku(b)).toBe(true);
  });
});
