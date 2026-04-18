/**
 * Judul: Topik 56 — Binary tree traversal (DFS preorder/inorder/postorder + BFS level)
 *
 * Soal test eksplisit:
 * - preorder / inorder / postorder rekursif pada pohon `1(2,3)` menghasilkan urutan kanonik.
 * - levelOrderValues: BFS datar; levelOrderGrouped: per baris level.
 * - iterativePreorder: DFS preorder dengan stack (tanpa rekursi).
 * - maxDepth: kedalaman node (single node = 1).
 *
 * Kontrak (opsional): tidak siklus; `null` root → array kosong / depth 0.
 *
 * Contoh output:
 * - `1(2,3)` → preorder `[1,2,3]`, inorder `[2,1,3]`, postorder `[2,3,1]`.
 *
 * Solusi: DFS = closure `walk`; BFS = queue; iterative preorder = stack push right then left.
 *
 * @see knowledge-base/05-coding-interview-v2/56-binary-tree-traversal.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/56-binary-tree-traversal/binary-tree-traversal.test.js`
 */

export class TreeNode {
  /**
   * @param {number} val
   * @param {TreeNode | null} [left]
   * @param {TreeNode | null} [right]
   */
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Judul: Preorder (root-left-right)
 *
 * Soal test:
 * - Contoh di header modul.
 *
 * @param {TreeNode | null} root
 * @returns {number[]}
 */
export function preorder(root) {
  /** @type {number[]} */
  const out = [];
  function walk(n) {
    if (n === null) return;
    out.push(n.val);
    walk(n.left);
    walk(n.right);
  }
  walk(root);
  return out;
}

/**
 * Judul: Inorder (left-root-right)
 *
 * Soal test:
 * - BST kecil → inorder terurut.
 *
 * @param {TreeNode | null} root
 * @returns {number[]}
 */
export function inorder(root) {
  /** @type {number[]} */
  const out = [];
  function walk(n) {
    if (n === null) return;
    walk(n.left);
    out.push(n.val);
    walk(n.right);
  }
  walk(root);
  return out;
}

/**
 * Judul: Postorder (left-right-root)
 *
 * @param {TreeNode | null} root
 * @returns {number[]}
 */
export function postorder(root) {
  /** @type {number[]} */
  const out = [];
  function walk(n) {
    if (n === null) return;
    walk(n.left);
    walk(n.right);
    out.push(n.val);
  }
  walk(root);
  return out;
}

/**
 * Judul: Level order (BFS)
 *
 * Soal test:
 * - `[[1],[2,3]]` representasi per level.
 *
 * Contoh output:
 * - levelOrderValues → `[1,2,3]`.
 *
 * @param {TreeNode | null} root
 * @returns {number[]}
 */
export function levelOrderValues(root) {
  if (root === null) return [];
  /** @type {number[]} */
  const out = [];
  /** @type {TreeNode[]} */
  const q = [root];
  let qi = 0;
  while (qi < q.length) {
    const n = q[qi++];
    out.push(n.val);
    if (n.left) q.push(n.left);
    if (n.right) q.push(n.right);
  }
  return out;
}

/**
 * Judul: Level order per level (array of array)
 *
 * Soal test:
 * - `[[1],[2,3]]` untuk pohon `1(2,3)`.
 *
 * @param {TreeNode | null} root
 * @returns {number[][]}
 */
export function levelOrderGrouped(root) {
  if (root === null) return [];
  /** @type {number[][]} */
  const out = [];
  /** @type {TreeNode[]} */
  let cur = [root];
  while (cur.length) {
    /** @type {number[]} */
    const row = [];
    /** @type {TreeNode[]} */
    const next = [];
    for (const n of cur) {
      row.push(n.val);
      if (n.left) next.push(n.left);
      if (n.right) next.push(n.right);
    }
    out.push(row);
    cur = next;
  }
  return out;
}

/**
 * Judul: Hitung jumlah node
 *
 * Soal test:
 * - null → 0; pohon 3 node → 3.
 *
 * @param {TreeNode | null} root
 */
export function countNodes(root) {
  if (root === null) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

/**
 * Judul: Preorder iteratif (stack)
 *
 * Soal test:
 * - Hasil sama dengan `preorder` untuk pohon kecil acak (hingga 7 node).
 *
 * Contoh output:
 * - `1(2,3)` → `[1,2,3]`.
 *
 * Kontrak: sama dengan preorder rekursif.
 *
 * Solusi: stack = `[root]`; pop, push right lalu left agar left diproses dulu.
 *
 * @param {TreeNode | null} root
 * @returns {number[]}
 */
export function iterativePreorder(root) {
  if (root === null) return [];
  /** @type {number[]} */
  const out = [];
  /** @type {TreeNode[]} */
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    if (n === undefined) break;
    out.push(n.val);
    if (n.right) stack.push(n.right);
    if (n.left) stack.push(n.left);
  }
  return out;
}

/**
 * Judul: Kedalaman maksimum (hitung node pada jalur root–daun)
 *
 * Soal test:
 * - null → `0`; satu node → `1`; chain tiga → `3`.
 *
 * Contoh output:
 * - `1(2,null)` → `2`.
 *
 * @param {TreeNode | null} root
 * @returns {number}
 */
export function maxDepth(root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

/**
 * Judul: Bandingkan preorder rekursif vs iteratif (utilitas tes / invariant)
 *
 * Soal test:
 * - Pohon `1(2(4,5),3)` — keduanya sama panjang dan elemen.
 *
 * @param {TreeNode | null} root
 */
export function preorderRecursiveMatchesIterative(root) {
  const a = preorder(root);
  const b = iterativePreorder(root);
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}
