import { describe, it, expect } from 'vitest';
import { uniquePaths } from './unique-paths.js';

describe('uniquePaths', () => {
  it('grid', () => {
    expect(uniquePaths(3, 7)).toBe(28);
    expect(uniquePaths(3, 2)).toBe(3);
  });
});
