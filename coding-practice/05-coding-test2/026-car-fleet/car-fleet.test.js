import { describe, it, expect } from 'vitest';
import { carFleet } from './car-fleet.js';

describe('carFleet', () => {
  it('contoh klasik', () => {
    expect(carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])).toBe(3);
  });

  it('satu mobil', () => {
    expect(carFleet(100, [0], [1])).toBe(1);
  });

  it('belakang tidak membentuk fleet baru (waktu lebih kecil)', () => {
    expect(carFleet(10, [0, 4], [5, 1])).toBe(1);
  });
});
