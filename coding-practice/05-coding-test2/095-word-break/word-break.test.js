import { describe, it, expect } from 'vitest';
import { wordBreak } from './word-break.js';

describe('wordBreak', () => {
  it('contoh', () => {
    expect(wordBreak('leetcode', ['leet', 'code'])).toBe(true);
    expect(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])).toBe(false);
  });
});
