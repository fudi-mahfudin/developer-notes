import { describe, it, expect } from 'vitest';
import { findOrder } from './course-schedule-ii.js';

describe('findOrder', () => {
  it('valid order', () => {
    expect(findOrder(2, [[1, 0]])).toEqual([0, 1]);
  });

  it('tidak mungkin', () => {
    expect(findOrder(2, [[1, 0], [0, 1]])).toEqual([]);
  });
});
