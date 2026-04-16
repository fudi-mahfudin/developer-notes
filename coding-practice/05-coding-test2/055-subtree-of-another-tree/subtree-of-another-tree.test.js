import { describe, it, expect } from 'vitest';
import { TreeNode, isSubtree } from './subtree-of-another-tree.js';

describe('isSubtree', () => {
  it('subtree ada', () => {
    const root = new TreeNode(
      3,
      new TreeNode(4, new TreeNode(1), new TreeNode(2)),
      new TreeNode(5),
    );
    const sub = new TreeNode(4, new TreeNode(1), new TreeNode(2));
    expect(isSubtree(root, sub)).toBe(true);
  });

  it('bukan subtree (nilai beda)', () => {
    const root = new TreeNode(
      3,
      new TreeNode(4, new TreeNode(1), new TreeNode(2, new TreeNode(0), null)),
      new TreeNode(5),
    );
    const sub = new TreeNode(4, new TreeNode(1), new TreeNode(2));
    expect(isSubtree(root, sub)).toBe(false);
  });
});
