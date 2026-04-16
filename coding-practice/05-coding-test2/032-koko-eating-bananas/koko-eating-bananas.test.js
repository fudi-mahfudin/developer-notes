import { describe, it, expect } from 'vitest';
import { minEatingSpeed } from './koko-eating-bananas.js';

describe('minEatingSpeed', () => {
  it('contoh LC', () => {
    expect(minEatingSpeed([3, 6, 7, 11], 8)).toBe(4);
  });

  it('banyak jam', () => {
    expect(minEatingSpeed([30, 11, 23, 4, 20], 5)).toBe(30);
  });
});
