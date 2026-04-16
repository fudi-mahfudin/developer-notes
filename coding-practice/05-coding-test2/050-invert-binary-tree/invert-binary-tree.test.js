import { describe, it, expect } from 'vitest';
import { TreeNode, invertTree } from './invert-binary-tree.js';

describe('invertTree', () => {
  it('swap anak', () => {
    const root = new TreeNode(
      4,
      new TreeNode(2, new TreeNode(1), new TreeNode(3)),
      new TreeNode(7, new TreeNode(6), new TreeNode(9)),
    );
    const inv = invertTree(root);
    expect(inv.val).toBe(4);
    expect(inv.left.val).toBe(7);
    expect(inv.right.val).toBe(2);
    expect(inv.left.left.val).toBe(9);
  });

  it('null', () => {
    expect(invertTree(null)).toBe(null);
  });
});
