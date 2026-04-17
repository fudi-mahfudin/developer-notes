import { describe, it, expect } from 'vitest';
import { pacificAtlantic } from './pacific-atlantic-water-flow.js';

function norm(a) {
  return [...a]
    .map((x) => x.join())
    .sort()
    .join('|');
}

describe('pacificAtlantic', () => {
  it('contoh kecil', () => {
    const got = pacificAtlantic([
      [1, 2, 2, 3, 5],
      [3, 2, 3, 4, 4],
      [2, 4, 5, 3, 1],
      [6, 7, 1, 4, 5],
      [5, 1, 1, 2, 4],
    ]);
    const exp = [
      [0, 4],
      [1, 3],
      [1, 4],
      [2, 2],
      [3, 0],
      [3, 1],
      [4, 0],
    ];
    expect(norm(got)).toBe(norm(exp));
  });
});
