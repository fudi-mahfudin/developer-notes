import { describe, it, expect } from 'vitest';
import { subsets } from './subsets.js';

function norm(a) {
  return [...a].sort((x, y) => x.join(',').localeCompare(y.join(',')));
}

describe('subsets', () => {
  it('contoh', () => {
    const got = subsets([1, 2, 3]);
    expect(norm(got)).toEqual(norm([[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]));
  });
});
