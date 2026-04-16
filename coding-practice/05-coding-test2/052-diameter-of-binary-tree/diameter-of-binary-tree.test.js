import { describe, it, expect } from 'vitest';
import { TreeNode, diameterOfBinaryTree } from './diameter-of-binary-tree.js';

describe('diameterOfBinaryTree', () => {
  it('contoh', () => {
    const r = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3));
    expect(diameterOfBinaryTree(r)).toBe(3);
  });

  it('satu node', () => {
    expect(diameterOfBinaryTree(new TreeNode(1))).toBe(0);
  });
});
