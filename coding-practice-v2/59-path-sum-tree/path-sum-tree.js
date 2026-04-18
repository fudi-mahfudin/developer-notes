/**
 * Judul: Topik 59 — Path sum pada binary tree (root–leaf, semua jumlah, path mulai mana pun)
 *
 * Soal test eksplisit:
 * - hasPathSum: LeetCode 112 — tepat satu jalur root→daun sama dengan target.
 * - allRootToLeafSums: enumerasi jumlah semua daun.
 * - pathSumAnyStart: LeetCode 437 — prefix sum + hash map.
 * - minRootToLeafSum: soal sejenis — minimalkan jumlah root→daun (angka positif di uji).
 *
 * Kontrak (opsional): daun = tidak punya anak kiri dan kanan; path root–leaf tidak kosong.
 *
 * Contoh output:
 * - Pohon contoh LC 112 dengan target 22 → `true`.
 *
 * Solusi: DFS akumulasi; path any-start = `cur - target` lookup di map prefix.
 *
 * @see knowledge-base/05-coding-interview-v2/59-path-sum-tree.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/59-path-sum-tree/path-sum-tree.test.js`
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
 * Judul: Root-to-leaf path sum equals target
 *
 * Soal test:
 * - `5->4->11->2` = 22; target 22 → `true`.
 *
 * Contoh output:
 * - Pohon satu node `7`, target `7` → `true`.
 *
 * Kontrak: `targetSum` number; daun = tidak punya anak kiri dan kanan.
 *
 * Solusi: DFS akumulasi `sum + val`.
 *
 * @param {TreeNode | null} root
 * @param {number} targetSum
 * @returns {boolean}
 */
export function hasPathSum(root, targetSum) {
  if (root === null) return false;
  if (root.left === null && root.right === null) return root.val === targetSum;
  const rest = targetSum - root.val;
  return hasPathSum(root.left, rest) || hasPathSum(root.right, rest);
}

/**
 * Judul: Jumlah semua path root-to-leaf (nilai)
 *
 * Soal test:
 * - Daun kiri/kanan dihitung terpisah.
 *
 * @param {TreeNode | null} root
 * @returns {number[]}
 */
export function allRootToLeafSums(root) {
  /** @type {number[]} */
  const out = [];
  function dfs(n, acc) {
    if (n === null) return;
    const s = acc + n.val;
    if (n.left === null && n.right === null) {
      out.push(s);
      return;
    }
    dfs(n.left, s);
    dfs(n.right, s);
  }
  dfs(root, 0);
  return out;
}

/**
 * Judul: Path sum dari node mana pun (prefix map) — LeetCode 437 style
 *
 * Soal test:
 * - Contoh kecil dengan target 8.
 *
 * Kontrak: `target` integer; bisa negatif jika nil node negatif (tidak diuji di sini).
 *
 * Solusi: Prefix sum + `Map` count; DFS.
 *
 * @param {TreeNode | null} root
 * @param {number} target
 * @returns {number}
 */
export function pathSumAnyStart(root, target) {
  /** @type {Map<number, number>} */
  const prefix = new Map([[0, 1]]);
  let count = 0;
  /**
   * @param {TreeNode | null} n
   * @param {number} cur
   */
  function dfs(n, cur) {
    if (n === null) return;
    cur += n.val;
    count += prefix.get(cur - target) ?? 0;
    prefix.set(cur, (prefix.get(cur) ?? 0) + 1);
    dfs(n.left, cur);
    dfs(n.right, cur);
    prefix.set(cur, (prefix.get(cur) ?? 0) - 1);
  }
  dfs(root, 0);
  return count;
}

/**
 * Judul: Jumlah root–leaf minimum (nilai node asumsikan ≥ 0 pada tes)
 *
 * Soal test:
 * - `1(2,3)` → min sum = `3` (1+2 vs 1+3).
 *
 * Contoh output:
 * - Satu node `5` → `5`.
 *
 * Kontrak: pohon tidak kosong untuk pemanggilan bermakna; gunakan `Infinity` guard internal.
 *
 * Solusi: DFS `min(left,right)+val` di daun.
 *
 * @param {TreeNode | null} root
 * @returns {number}
 */
export function minRootToLeafSum(root) {
  if (root === null) return 0;
  if (root.left === null && root.right === null) return root.val;
  let best = Infinity;
  if (root.left !== null) best = Math.min(best, minRootToLeafSum(root.left));
  if (root.right !== null) best = Math.min(best, minRootToLeafSum(root.right));
  return root.val + best;
}
