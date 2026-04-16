import { describe, it, expect } from 'vitest';
import { TreeNode, isBalanced } from './balanced-binary-tree.js';

describe('isBalanced', () => {
  it('balanced', () => {
    const r = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
    expect(isBalanced(r)).toBe(true);
  });

  it('tidak balanced', () => {
    const r = new TreeNode(
      1,
      new TreeNode(2, new TreeNode(3, new TreeNode(4, new TreeNode(5), null), null), null),
      null,
    );
    expect(isBalanced(r)).toBe(false);
  });
});
