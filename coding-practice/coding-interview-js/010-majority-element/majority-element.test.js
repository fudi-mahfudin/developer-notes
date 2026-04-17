import { describe, it, expect } from 'vitest';
import { majorityElement } from './majority-element.js';

describe('majorityElement', () => {
  it('contoh klasik', () => {
    expect(majorityElement([3, 2, 3])).toBe(3);
  });

  it('lebih dari setengah', () => {
    expect(majorityElement([2, 2, 1, 1, 1, 2, 2])).toBe(2);
  });

  it('satu elemen', () => {
    expect(majorityElement([1])).toBe(1);
  });
});
