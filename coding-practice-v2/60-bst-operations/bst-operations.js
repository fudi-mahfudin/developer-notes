/**
 * Judul: Topik 60 — BST insert, search, delete, dan utilitas agregat
 *
 * Soal test eksplisit:
 * - insert + buildBSTFromKeys: inorder terurut naik.
 * - search: ketemu / tidak ketemu.
 * - deleteNode: daun, satu anak, dua anak (successor inorder).
 * - contains / treeSize / minValue / maxValue: invariant BST setelah operasi.
 *
 * Kontrak (opsional): tidak duplikat insert pada tes (insert sama bisa no-op atau tetap — di sini abaikan duplikat).
 *
 * Contoh output:
 * - Keys `[5,3,7,2,4]` → inorder `[2,3,4,5,7]`.
 *
 * Solusi: rekursi lokasi; delete dua anak = min kanan lalu hapus successor.
 *
 * @see knowledge-base/05-coding-interview-v2/60-bst-operations.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/60-bst-operations/bst-operations.test.js`
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
 * Judul: Sisipkan nilai
 *
 * Soal test:
 * - `[3,1,4]` → inorder `[1,3,4]`.
 *
 * @param {TreeNode | null} root
 * @param {number} val
 * @returns {TreeNode}
 */
export function insert(root, val) {
  if (root === null) return new TreeNode(val);
  if (val < root.val) root.left = insert(root.left, val);
  else if (val > root.val) root.right = insert(root.right, val);
  return root;
}

/**
 * Judul: Cari nilai
 *
 * Soal test:
 * - Ada → node; tidak ada → `null`.
 *
 * @param {TreeNode | null} root
 * @param {number} val
 * @returns {TreeNode | null}
 */
export function search(root, val) {
  if (root === null || root.val === val) return root;
  if (val < root.val) return search(root.left, val);
  return search(root.right, val);
}

/**
 * Judul: Minimum subtree
 *
 * @param {TreeNode} root
 * @returns {TreeNode}
 */
export function minNode(root) {
  let cur = root;
  while (cur.left !== null) cur = cur.left;
  return cur;
}

/**
 * Judul: Hapus nilai
 *
 * Soal test:
 * - Hapus daun; hapus satu anak; hapus dua anak (ganti successor inorder).
 *
 * Contoh output:
 * - delete(root, 2)` pada pohon kecil tetap BST.
 *
 * @param {TreeNode | null} root
 * @param {number} val
 * @returns {TreeNode | null}
 */
export function deleteNode(root, val) {
  if (root === null) return null;
  if (val < root.val) root.left = deleteNode(root.left, val);
  else if (val > root.val) root.right = deleteNode(root.right, val);
  else {
    if (root.left === null) return root.right;
    if (root.right === null) return root.left;
    const succ = minNode(root.right);
    root.val = succ.val;
    root.right = deleteNode(root.right, succ.val);
  }
  return root;
}

/**
 * Judul: Inorder traversal values
 *
 * @param {TreeNode | null} root
 * @returns {number[]}
 */
export function inorderValues(root) {
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
 * Judul: Bangun BST dari array (urutan insert)
 *
 * Soal test:
 * - `[3,1,4]` BST valid.
 *
 * @param {number[]} keys
 * @returns {TreeNode | null}
 */
export function buildBSTFromKeys(keys) {
  if (!Array.isArray(keys)) throw new TypeError("keys must be array");
  let root = null;
  for (const k of keys) root = insert(root, k);
  return root;
}

/**
 * Judul: Apakah nilai ada di BST
 *
 * Soal test:
 * - Sama dengan `search(root,val) !== null`.
 *
 * @param {TreeNode | null} root
 * @param {number} val
 */
export function contains(root, val) {
  return search(root, val) !== null;
}

/**
 * Judul: Jumlah node
 *
 * Soal test:
 * - null → `0`; pohon kecil sesuai insert.
 *
 * @param {TreeNode | null} root
 */
export function treeSize(root) {
  if (root === null) return 0;
  return 1 + treeSize(root.left) + treeSize(root.right);
}

/**
 * Judul: Nilai minimum di BST
 *
 * Soal test:
 * - Pohon dari `[5,3,7]` → `3`.
 *
 * Kontrak: pohon tidak kosong.
 *
 * @param {TreeNode} root
 */
export function minValue(root) {
  return minNode(root).val;
}

/**
 * Judul: Nilai maksimum di BST
 *
 * Soal test:
 * - `[5,3,7]` → `7`.
 *
 * @param {TreeNode} root
 */
export function maxValue(root) {
  let cur = root;
  while (cur.right !== null) cur = cur.right;
  return cur.val;
}

/**
 * Judul: Validasi inorder terurut (cek invariant BST — opsional O(n))
 *
 * Soal test:
 * - BST valid → `true`; swap satu edge pada struktur tidak diuji di sini.
 *
 * @param {TreeNode | null} root
 */
export function isInorderSorted(root) {
  const vals = inorderValues(root);
  for (let i = 1; i < vals.length; i++) {
    if (vals[i] < vals[i - 1]) return false;
  }
  return true;
}
