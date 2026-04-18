import { describe, it, expect } from 'vitest';
import { containsDuplicate } from './contains-duplicate.js';

describe('containsDuplicate', () => {
  it('duplikat ada', () => {
    expect(containsDuplicate([1, 2, 3, 1])).toBe(true);
  });

  it('semua unik', () => {
    expect(containsDuplicate([1, 2, 3, 4])).toBe(false);
  });

  it('array kosong atau satu elemen: tidak ada duplikat', () => {
    expect(containsDuplicate([])).toBe(false);
    expect(containsDuplicate([1])).toBe(false);
  });

  it('nilai negatif dan nol', () => {
    expect(containsDuplicate([0, -1, 0])).toBe(true);
  });
});
