import { describe, it, expect } from 'vitest';
import { combinationSum2 } from './combination-sum-ii.js';

function norm(a) {
  return [...a].sort((x, y) => x.join(',').localeCompare(y.join(',')));
}

describe('combinationSum2', () => {
  it('unik', () => {
    const got = combinationSum2([10, 1, 2, 7, 6, 1, 5], 8);
    expect(norm(got)).toEqual(
      norm([
        [1, 1, 6],
        [1, 2, 5],
        [1, 7],
        [2, 6],
      ]),
    );
  });
});
