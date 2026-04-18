import { describe, it, expect } from 'vitest';
import { partition } from './palindrome-partitioning.js';

function norm(a) {
  return [...a].sort((x, y) => x.join().localeCompare(y.join()));
}

describe('partition', () => {
  it('aab', () => {
    expect(norm(partition('aab'))).toEqual(
      norm([
        ['a', 'a', 'b'],
        ['aa', 'b'],
      ]),
    );
  });
});
