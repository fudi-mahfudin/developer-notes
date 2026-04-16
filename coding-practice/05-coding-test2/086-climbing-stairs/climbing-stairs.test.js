import { describe, it, expect } from 'vitest';
import { climbStairs } from './climbing-stairs.js';

describe('climbStairs', () => {
  it('fibonacci', () => {
    expect(climbStairs(2)).toBe(2);
    expect(climbStairs(3)).toBe(3);
  });
});
