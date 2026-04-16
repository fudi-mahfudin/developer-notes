import { describe, it, expect } from 'vitest';
import { TreeNode, levelOrder } from './binary-tree-level-order-traversal.js';

describe('levelOrder', () => {
  it('contoh', () => {
    const r = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
    expect(levelOrder(r)).toEqual([[3], [9, 20], [15, 7]]);
  });

  it('null', () => {
    expect(levelOrder(null)).toEqual([]);
  });
});
