import { describe, it, expect } from 'vitest';
import { isValid } from './valid-parentheses.js';

describe('isValid', () => {
  it('valid sederhana', () => {
    expect(isValid('()')).toBe(true);
  });

  it('valid nested', () => {
    expect(isValid('()[]{}')).toBe(true);
    expect(isValid('{[]}')).toBe(true);
  });

  it('urutan salah', () => {
    expect(isValid('([)]')).toBe(false);
  });

  it('kurang tutup', () => {
    expect(isValid('((')).toBe(false);
  });

  it('kosong: biasanya true', () => {
    expect(isValid('')).toBe(true);
  });
});
