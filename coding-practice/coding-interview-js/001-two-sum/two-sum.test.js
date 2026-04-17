import { describe, it, expect } from 'vitest';
import { twoSum } from './two-sum.js';

function assertValidPair(nums, target, result) {
  expect(result).toHaveLength(2);
  const [i, j] = result;
  expect(i).not.toBe(j);
  expect(i).toBeLessThan(j);
  expect(nums[i] + nums[j]).toBe(target);
}

describe('twoSum', () => {
  it('contoh klasik: kembalikan indeks yang berjumlah target', () => {
    const nums = [2, 7, 11, 15];
    const target = 9;
    const got = twoSum(nums, target);
    assertValidPair(nums, target, got);
    expect(got).toEqual([0, 1]);
  });

  it('dua nilai sama: indeks harus berbeda', () => {
    const nums = [3, 3];
    const target = 6;
    const got = twoSum(nums, target);
    assertValidPair(nums, target, got);
    expect(got).toEqual([0, 1]);
  });

  it('angka negatif dan target negatif', () => {
    const nums = [-1, -2, -3, -4, -5];
    const target = -8;
    const got = twoSum(nums, target);
    assertValidPair(nums, target, got);
    expect(got).toEqual([2, 4]);
  });

  it('pasangan bukan urutan pertama yang mungkin (3 + 2 = 5)', () => {
    const nums = [3, 2, 4];
    const target = 6;
    const got = twoSum(nums, target);
    assertValidPair(nums, target, got);
    expect(got).toEqual([1, 2]);
  });

  it('minimal dua elemen: [0, 0] dan target 0', () => {
    const nums = [0, 0];
    const target = 0;
    expect(twoSum(nums, target)).toEqual([0, 1]);
  });

  it('tidak ada pasangan: kembalikan array kosong', () => {
    expect(twoSum([1, 2, 3], 7)).toEqual([]);
  });

  it('indeks harus urutan muncul: i lebih kecil dari j', () => {
    const nums = [1, 5, 3, 7];
    const target = 8;
    const got = twoSum(nums, target);
    assertValidPair(nums, target, got);
  });
});
