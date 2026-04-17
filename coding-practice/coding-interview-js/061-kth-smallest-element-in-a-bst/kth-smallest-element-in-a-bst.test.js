import { describe, it, expect } from 'vitest';
import { TreeNode, kthSmallest } from './kth-smallest-element-in-a-bst.js';

describe('kthSmallest', () => {
  it('k=1', () => {
    const r = new TreeNode(3, new TreeNode(1, new TreeNode(0), new TreeNode(2)), new TreeNode(4));
    expect(kthSmallest(r, 1)).toBe(0);
  });

  it('k=tengah', () => {
    const r = new TreeNode(5, new TreeNode(3, new TreeNode(2, new TreeNode(1)), new TreeNode(4)), new TreeNode(6));
    expect(kthSmallest(r, 3)).toBe(3);
  });
});
