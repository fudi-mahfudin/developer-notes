import { describe, it, expect } from 'vitest';
import { buildTree } from './construct-binary-tree-from-preorder-and-inorder-traversal.js';

function preorder(node, out = []) {
  if (!node) return out;
  out.push(node.val);
  preorder(node.left, out);
  preorder(node.right, out);
  return out;
}

describe('buildTree', () => {
  it('contoh', () => {
    const r = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
    expect(preorder(r)).toEqual([3, 9, 20, 15, 7]);
  });
});
