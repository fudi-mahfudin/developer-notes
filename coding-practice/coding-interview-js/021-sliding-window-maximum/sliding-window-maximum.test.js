import { describe, it, expect } from 'vitest';
import { maxSlidingWindow } from './sliding-window-maximum.js';

describe('maxSlidingWindow', () => {
  it('contoh klasik', () => {
    expect(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([3, 3, 5, 5, 6, 7]);
  });

  it('k=1', () => {
    expect(maxSlidingWindow([1, -1], 1)).toEqual([1, -1]);
  });

  it('k=panjang array', () => {
    expect(maxSlidingWindow([9, 11], 2)).toEqual([11]);
  });
});
