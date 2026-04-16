import { describe, it, expect } from 'vitest';
import { permute } from './permutations.js';

function norm(a) {
  return [...a].sort((x, y) => x.join(',').localeCompare(y.join(',')));
}

describe('permute', () => {
  it('n=3', () => {
    expect(norm(permute([1, 2, 3]))).toEqual(
      norm([
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1],
      ]),
    );
  });
});
