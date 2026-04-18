import { describe, it, expect } from 'vitest';
import { TreeNode, lowestCommonAncestor } from './lowest-common-ancestor-of-a-bst.js';

describe('lowestCommonAncestor (BST)', () => {
  it('LCA di root', () => {
    const r = new TreeNode(6, new TreeNode(2, new TreeNode(0), new TreeNode(4)), new TreeNode(8));
    const p = r.left;
    const q = r.right;
    expect(lowestCommonAncestor(r, p, q).val).toBe(6);
  });
});
