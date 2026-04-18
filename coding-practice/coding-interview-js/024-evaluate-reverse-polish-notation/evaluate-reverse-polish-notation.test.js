import { describe, it, expect } from 'vitest';
import { evalRPN } from './evaluate-reverse-polish-notation.js';

describe('evalRPN', () => {
  it('contoh klasik', () => {
    expect(evalRPN(['2', '1', '+', '3', '*'])).toBe(9);
  });

  it('pembagian trunc toward zero', () => {
    expect(evalRPN(['4', '13', '5', '/', '+'])).toBe(6);
  });

  it('negatif', () => {
    expect(evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'])).toBe(22);
  });
});
