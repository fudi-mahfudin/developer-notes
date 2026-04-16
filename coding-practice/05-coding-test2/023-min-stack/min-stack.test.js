import { describe, it, expect } from 'vitest';
import { MinStack } from './min-stack.js';

describe('MinStack', () => {
  it('operasi dasar', () => {
    const st = new MinStack();
    st.push(-2);
    st.push(0);
    st.push(-3);
    expect(st.getMin()).toBe(-3);
    st.pop();
    expect(st.top()).toBe(0);
    expect(st.getMin()).toBe(-2);
  });

  it('duplikat min', () => {
    const st = new MinStack();
    st.push(0);
    st.push(1);
    st.push(0);
    expect(st.getMin()).toBe(0);
    st.pop();
    expect(st.getMin()).toBe(0);
  });
});
