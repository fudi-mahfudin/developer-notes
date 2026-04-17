import { describe, it, expect } from 'vitest';
import { findRedundantConnection } from './redundant-connection.js';

describe('findRedundantConnection', () => {
  it('sisi terakhir yang bikin cycle', () => {
    expect(
      findRedundantConnection([
        [1, 2],
        [1, 3],
        [2, 3],
      ]),
    ).toEqual([2, 3]);
  });
});
