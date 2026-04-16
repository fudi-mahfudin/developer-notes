import { describe, it, expect } from 'vitest';
import { trap } from './trapping-rain-water.js';

describe('trap', () => {
  it('contoh klasik', () => {
    expect(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
  });

  it('kosong / monoton tidak menampung', () => {
    expect(trap([])).toBe(0);
    expect(trap([3, 2, 1])).toBe(0);
  });

  it('cetakan sederhana', () => {
    expect(trap([4, 2, 0, 3, 2, 5])).toBe(9);
  });
});
