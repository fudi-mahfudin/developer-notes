import { describe, it, expect } from 'vitest';
import { TreeNode, maxPathSum } from './binary-tree-maximum-path-sum.js';

describe('maxPathSum', () => {
  it('contoh', () => {
    const r = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    expect(maxPathSum(r)).toBe(6);
  });

  it('negatif di tengah', () => {
    const r = new TreeNode(-10, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
    expect(maxPathSum(r)).toBe(42);
  });
});
