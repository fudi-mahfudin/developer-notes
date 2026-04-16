import { describe, it, expect } from 'vitest';
import { TreeNode, isSameTree } from './same-tree.js';

describe('isSameTree', () => {
  it('identik', () => {
    const a = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    const b = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    expect(isSameTree(a, b)).toBe(true);
  });

  it('beda struktur', () => {
    const a = new TreeNode(1, new TreeNode(2), null);
    const b = new TreeNode(1, null, new TreeNode(2));
    expect(isSameTree(a, b)).toBe(false);
  });
});
