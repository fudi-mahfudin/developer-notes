import { describe, it, expect } from 'vitest';
import { TreeNode, maxDepth } from './maximum-depth-of-binary-tree.js';

describe('maxDepth', () => {
  it('contoh', () => {
    const r = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
    expect(maxDepth(r)).toBe(3);
  });

  it('null', () => {
    expect(maxDepth(null)).toBe(0);
  });
});
