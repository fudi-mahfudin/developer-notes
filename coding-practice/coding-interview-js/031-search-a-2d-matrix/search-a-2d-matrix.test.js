import { describe, it, expect } from 'vitest';
import { searchMatrix } from './search-a-2d-matrix.js';

describe('searchMatrix', () => {
  const m = [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60],
  ];

  it('ada / tidak', () => {
    expect(searchMatrix(m, 3)).toBe(true);
    expect(searchMatrix(m, 13)).toBe(false);
  });

  it('kosong', () => {
    expect(searchMatrix([], 1)).toBe(false);
  });
});
