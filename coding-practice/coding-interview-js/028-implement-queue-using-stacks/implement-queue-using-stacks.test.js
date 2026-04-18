import { describe, it, expect } from 'vitest';
import { MyQueue } from './implement-queue-using-stacks.js';

describe('MyQueue', () => {
  it('FIFO', () => {
    const q = new MyQueue();
    q.push(1);
    q.push(2);
    expect(q.peek()).toBe(1);
    expect(q.pop()).toBe(1);
    expect(q.empty()).toBe(false);
    expect(q.pop()).toBe(2);
    expect(q.empty()).toBe(true);
  });
});
