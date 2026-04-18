import { describe, it, expect } from 'vitest';
import { nextGreaterElement } from './next-greater-element-i.js';

describe('nextGreaterElement', () => {
  it('contoh LC', () => {
    expect(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])).toEqual([-1, 3, -1]);
  });

  it('semua -1', () => {
    expect(nextGreaterElement([2, 4], [4, 2])).toEqual([-1, -1]);
  });
});
