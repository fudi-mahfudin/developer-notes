import { describe, it, expect } from 'vitest';
import { rob } from './house-robber.js';

describe('rob', () => {
  it('contoh', () => {
    expect(rob([1, 2, 3, 1])).toBe(4);
    expect(rob([2, 7, 9, 3, 1])).toBe(12);
  });
});
