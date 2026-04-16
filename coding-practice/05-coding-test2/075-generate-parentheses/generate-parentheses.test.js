import { describe, it, expect } from 'vitest';
import { generateParenthesis } from './generate-parentheses.js';

describe('generateParenthesis', () => {
  it('n=3', () => {
    const got = generateParenthesis(3).sort();
    expect(got).toEqual(['((()))', '(()())', '(())()', '()(())', '()()()'].sort());
  });

  it('n=1', () => {
    expect(generateParenthesis(1)).toEqual(['()']);
  });
});
