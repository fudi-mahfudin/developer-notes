import { describe, it, expect } from 'vitest';
import { TreeNode, goodNodes } from './count-good-nodes-in-binary-tree.js';

describe('goodNodes', () => {
  it('contoh LC', () => {
    const r = new TreeNode(3, new TreeNode(1, new TreeNode(3), null), new TreeNode(4, new TreeNode(1), new TreeNode(5)));
    expect(goodNodes(r)).toBe(4);
  });
});
