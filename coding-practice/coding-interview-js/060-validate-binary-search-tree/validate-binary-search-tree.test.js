import { describe, it, expect } from 'vitest';
import { TreeNode, isValidBST } from './validate-binary-search-tree.js';

describe('isValidBST', () => {
  it('valid', () => {
    const r = new TreeNode(2, new TreeNode(1), new TreeNode(3));
    expect(isValidBST(r)).toBe(true);
  });

  it('invalid duplicate / urutan', () => {
    const r = new TreeNode(5, new TreeNode(1), new TreeNode(4, new TreeNode(3), new TreeNode(6)));
    expect(isValidBST(r)).toBe(false);
  });
});
