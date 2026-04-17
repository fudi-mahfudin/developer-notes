import { describe, it, expect } from 'vitest';
import { orangesRotting } from './rotting-oranges.js';

describe('orangesRotting', () => {
  it('contoh', () => {
    const g = [
      [2, 1, 1],
      [1, 1, 0],
      [0, 1, 1],
    ].map((r) => [...r]);
    expect(orangesRotting(g)).toBe(4);
  });

  it('tidak bisa', () => {
    const g = [
      [2, 1, 1],
      [0, 1, 1],
      [1, 0, 1],
    ].map((r) => [...r]);
    expect(orangesRotting(g)).toBe(-1);
  });
});
