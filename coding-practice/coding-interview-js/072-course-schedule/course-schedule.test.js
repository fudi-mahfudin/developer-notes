import { describe, it, expect } from 'vitest';
import { canFinish } from './course-schedule.js';

describe('canFinish', () => {
  it('bisa', () => {
    expect(canFinish(2, [[1, 0]])).toBe(true);
  });

  it('siklus', () => {
    expect(canFinish(2, [[1, 0], [0, 1]])).toBe(false);
  });
});
