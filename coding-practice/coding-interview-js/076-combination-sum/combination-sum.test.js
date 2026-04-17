import { describe, it, expect } from 'vitest';
import { combinationSum } from './combination-sum.js';

function norm(a) {
  return [...a].sort((x, y) => x.join(',').localeCompare(y.join(',')));
}

describe('combinationSum', () => {
  it('contoh', () => {
    const got = combinationSum([2, 3, 6, 7], 7);
    expect(norm(got)).toEqual(
      norm([
        [2, 2, 3],
        [7],
      ]),
    );
  });
});
