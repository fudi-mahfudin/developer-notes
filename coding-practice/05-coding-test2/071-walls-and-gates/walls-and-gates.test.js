import { describe, it, expect } from 'vitest';
import { wallsAndGates } from './walls-and-gates.js';

describe('wallsAndGates', () => {
  it('jarak ke gate terdekat', () => {
    const rooms = [
      [2147483647, -1, 0, 2147483647],
      [2147483647, 2147483647, 2147483647, -1],
      [2147483647, -1, 2147483647, -1],
      [0, -1, 2147483647, 2147483647],
    ].map((r) => [...r]);
    wallsAndGates(rooms);
    expect(rooms).toEqual([
      [3, -1, 0, 1],
      [2, 2, 1, -1],
      [1, -1, 2, -1],
      [0, -1, 3, 4],
    ]);
  });
});
