import { describe, it, expect } from 'vitest';
import { letterCombinations } from './letter-combinations-of-a-phone-number.js';

describe('letterCombinations', () => {
  it('23', () => {
    expect(letterCombinations('23').sort()).toEqual(['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'].sort());
  });
});
