import { describe, it, expect } from 'vitest';
import { checkInclusion } from './permutation-in-string.js';

describe('checkInclusion', () => {
  it('LC contoh', () => {
    expect(checkInclusion('ab', 'eidbaooo')).toBe(true);
  });

  it('tidak ada', () => {
    expect(checkInclusion('ab', 'eidboaoo')).toBe(false);
  });

  it('panjang sama', () => {
    expect(checkInclusion('adc', 'dcda')).toBe(true);
  });
});
