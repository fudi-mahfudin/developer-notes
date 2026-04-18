import { describe, it, expect } from 'vitest';
import { TreeNode, rightSideView } from './binary-tree-right-side-view.js';

describe('rightSideView', () => {
  it('contoh', () => {
    const r = new TreeNode(1, new TreeNode(2, null, new TreeNode(5)), new TreeNode(3, null, new TreeNode(4)));
    expect(rightSideView(r)).toEqual([1, 3, 4]);
  });
});
