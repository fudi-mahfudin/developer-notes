import { describe, it, expect } from 'vitest';
import { sortColors } from './sort-colors.js';

describe('sortColors', () => {
  it('acak', () => {
    const nums = [2, 0, 2, 1, 1, 0];
    sortColors(nums);
    expect(nums).toEqual([0, 0, 1, 1, 2, 2]);
  });

  it('sudah terurut', () => {
    const nums = [0, 0, 1, 1, 2, 2];
    sortColors(nums);
    expect(nums).toEqual([0, 0, 1, 1, 2, 2]);
  });

  it('minimal', () => {
    const nums = [1];
    sortColors(nums);
    expect(nums).toEqual([1]);
  });
});
