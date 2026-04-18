import { describe, it, expect } from 'vitest';
import { TreeNode, serialize, deserialize } from './serialize-and-deserialize-binary-tree.js';

function preorder(n, out = []) {
  if (!n) return out;
  out.push(n.val);
  preorder(n.left, out);
  preorder(n.right, out);
  return out;
}

describe('serialize / deserialize', () => {
  it('round-trip', () => {
    const r = new TreeNode(1, new TreeNode(2), new TreeNode(3, new TreeNode(4), new TreeNode(5)));
    const back = deserialize(serialize(r));
    expect(preorder(back)).toEqual(preorder(r));
  });

  it('null root', () => {
    expect(deserialize(serialize(null))).toBe(null);
  });
});
