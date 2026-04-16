import { describe, it, expect } from 'vitest';
import { findDuplicate } from './find-the-duplicate-number.js';

describe('findDuplicate', () => {
  it('contoh', () => {
    expect(findDuplicate([1, 3, 4, 2, 2])).toBe(2);
    expect(findDuplicate([3, 1, 3, 4, 2])).toBe(3);
  });

  it('beberapa nilai valid', () => {
    expect(findDuplicate([1, 2, 3, 2])).toBe(2);
  });
});
