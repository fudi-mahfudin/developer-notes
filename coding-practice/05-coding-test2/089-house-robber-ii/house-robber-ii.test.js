import { describe, it, expect } from 'vitest';
import { rob } from './house-robber-ii.js';

describe('rob (circular)', () => {
  it('contoh', () => {
    expect(rob([2, 3, 2])).toBe(3);
    expect(rob([1, 2, 3, 1])).toBe(4);
  });
});
