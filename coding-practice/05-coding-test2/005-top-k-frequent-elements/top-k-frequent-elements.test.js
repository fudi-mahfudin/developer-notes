import { describe, it, expect } from 'vitest';
import { topKFrequent } from './top-k-frequent-elements.js';

function sameMultiset(a, b) {
  expect([...a].sort((x, y) => x - y)).toEqual([...b].sort((x, y) => x - y));
}

describe('topKFrequent', () => {
  it('k=2', () => {
    const got = topKFrequent([1, 1, 1, 2, 2, 3], 2);
    sameMultiset(got, [1, 2]);
  });

  it('k=1', () => {
    sameMultiset(topKFrequent([1], 1), [1]);
  });

  it('frekuensi sama untuk beberapa kandidat', () => {
    const got = topKFrequent([4, 4, 4, 2, 2, 1], 2);
    sameMultiset(got, [4, 2]);
  });
});
