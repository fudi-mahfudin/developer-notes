import { describe, it, expect } from 'vitest';
import { minCostClimbingStairs } from './min-cost-climbing-stairs.js';

describe('minCostClimbingStairs', () => {
  it('contoh', () => {
    expect(minCostClimbingStairs([10, 15, 20])).toBe(15);
    expect(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])).toBe(6);
  });
});
