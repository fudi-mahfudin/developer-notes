import { describe, it, expect } from 'vitest';
import { numDecodings } from './decode-ways.js';

describe('numDecodings', () => {
  it('contoh', () => {
    expect(numDecodings('12')).toBe(2);
    expect(numDecodings('226')).toBe(3);
    expect(numDecodings('06')).toBe(0);
  });
});
