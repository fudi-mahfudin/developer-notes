import { describe, it, expect } from 'vitest';
import { dailyTemperatures } from './daily-temperatures.js';

describe('dailyTemperatures', () => {
  it('contoh klasik', () => {
    expect(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])).toEqual([1, 1, 4, 2, 1, 1, 0, 0]);
  });

  it('menurun terus: semua nol kecuali', () => {
    expect(dailyTemperatures([30, 40, 50, 60])).toEqual([1, 1, 1, 0]);
  });

  it('satu elemen', () => {
    expect(dailyTemperatures([80])).toEqual([0]);
  });
});
