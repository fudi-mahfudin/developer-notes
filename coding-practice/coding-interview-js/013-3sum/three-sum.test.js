import { describe, it, expect } from 'vitest';
import { threeSum } from './three-sum.js';

function normalize(trips) {
  return [...trips]
    .map((t) => [...t].sort((a, b) => a - b))
    .sort((a, b) => a.join().localeCompare(b.join()));
}

describe('threeSum', () => {
  it('contoh klasik', () => {
    const got = threeSum([-1, 0, 1, 2, -1, -4]);
    expect(normalize(got)).toEqual(
      normalize([
        [-1, -1, 2],
        [-1, 0, 1],
      ]),
    );
  });

  it('tidak ada jawaban', () => {
    expect(threeSum([0, 1, 1])).toEqual([]);
  });

  it('banyak nol', () => {
    expect(normalize(threeSum([0, 0, 0]))).toEqual([[0, 0, 0]]);
  });
});
