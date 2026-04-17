/**
 * Judul: Topik 61 — Trie (prefix tree) untuk autocomplete / prefix query
 *
 * Soal test eksplisit:
 * - insert + search: kata yang diinsert dapat dicari penuh; prefix tanpa isEnd → search false.
 * - startsWith: true jika ada kata dengan prefix tersebut.
 * - countWordsWithPrefix: jumlah kata yang tersimpan dengan prefix p.
 * - collectWordsWithPrefix: daftar kata (terurut leksikografis) di bawah prefix.
 *
 * Contoh output:
 * - insert "app","apple","april" → startsWith("ap") true; collectWordsWithPrefix("ap") mengandung "app","apple","april".
 *
 * Solusi: node punya Map karakter→anak; isEnd menandai akhir kata; DFS untuk kumpulkan kata.
 *
 * @see knowledge-base/05-coding-interview-v2/61-trie-prefix-tree.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/61-trie-prefix-tree/trie-prefix-tree.test.js`
 */

/**
 * Judul: Node trie — anak per karakter, flag akhir kata
 *
 * Soal test eksplisit:
 * - children Map kosong di awal; isEnd false.
 *
 * Contoh output:
 * - Setelah insert "a", root.children.get('a') terdefinisi.
 *
 * Solusi: Map untuk fleksibilitas alfabet (a–z atau ASCII).
 */
export class TrieNode {
  constructor() {
    /** @type {Map<string, TrieNode>} */
    this.children = new Map();
    /** @type {boolean} */
    this.isEnd = false;
  }
}

/**
 * Judul: Trie — insert kata huruf kecil (a–z) untuk tes deterministik
 *
 * Soal test eksplisit:
 * - insert("cat") lalu search("cat") true; search("ca") false.
 *
 * Contoh output:
 * - insert "app", "apple" → search("apple") true.
 *
 * Solusi: per karakter, buat node jika belum ada; node terakhir isEnd = true.
 */
export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  /**
   * @param {string} word
   */
  insert(word) {
    if (typeof word !== "string") throw new TypeError("word must be string");
    let cur = this.root;
    for (const ch of word) {
      if (!cur.children.has(ch)) cur.children.set(ch, new TrieNode());
      cur = cur.children.get(ch);
    }
    cur.isEnd = true;
  }

  /**
   * Kata penuh ada di trie
   * @param {string} word
   */
  search(word) {
    const node = this._traverse(word);
    return node !== null && node.isEnd;
  }

  /**
   * Ada kata dengan prefix `prefix`
   * @param {string} prefix
   */
  startsWith(prefix) {
    return this._traverse(prefix) !== null;
  }

  /**
   * @param {string} s
   * @returns {TrieNode | null}
   */
  _traverse(s) {
    let cur = this.root;
    for (const ch of s) {
      if (!cur.children.has(ch)) return null;
      cur = cur.children.get(ch);
    }
    return cur;
  }
}

/**
 * Judul: Jumlah kata yang tersimpan dengan prefix `prefix` (termasuk nested)
 *
 * Soal test eksplisit:
 * - Trie berisi "a","app","apple" → countWordsWithPrefix("ap") = 2.
 *
 * Contoh output:
 * - Prefix "" = semua kata di trie.
 *
 * Solusi: DFS dari node akhir prefix; hitung node dengan isEnd.
 *
 * @param {Trie} trie
 * @param {string} prefix
 * @returns {number}
 */
export function countWordsWithPrefix(trie, prefix) {
  const start = trie._traverse(prefix);
  if (start === null) return 0;
  let count = 0;
  function dfs(node) {
    if (node.isEnd) count += 1;
    for (const child of node.children.values()) dfs(child);
  }
  dfs(start);
  return count;
}

/**
 * Judul: Kumpulkan semua kata dengan prefix yang diberikan
 *
 * Soal test eksplisit:
 * - insert "app","apple","apricot" → collectWordsWithPrefix("ap") terurut.
 *
 * Contoh output:
 * - Prefix tidak ada → [].
 *
 * Solusi: DFS dengan path string; sort hasil untuk determinism.
 *
 * @param {Trie} trie
 * @param {string} prefix
 * @returns {string[]}
 */
export function collectWordsWithPrefix(trie, prefix) {
  const start = trie._traverse(prefix);
  if (start === null) return [];
  /** @type {string[]} */
  const out = [];
  function dfs(node, path) {
    if (node.isEnd) out.push(prefix + path);
    for (const [ch, child] of [...node.children.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
      dfs(child, path + ch);
    }
  }
  dfs(start, "");
  return out.sort();
}

/**
 * Judul: Hapus satu kemunculan kata (jika tidak ada kata lain di bawah prefix bersama, prune node)
 *
 * Soal test eksplisit:
 * - insert "app","apple"; remove("apple") → search("apple") false; startsWith("app") true.
 *
 * Contoh output:
 * - Hapus kata yang tidak ada → false.
 *
 * Solusi: DFS ke bawah; jika isEnd di hapus, unmark; prune node tanpa anak dan bukan isEnd.
 *
 * @param {Trie} trie
 * @param {string} word
 * @returns {boolean}
 */
export function removeWord(trie, word) {
  if (typeof word !== "string") throw new TypeError("word must be string");
  if (!trie.search(word)) return false;
  /**
   * @param {TrieNode} node
   * @param {number} i
   * @returns {boolean} true jika `node` boleh dihapus dari parent
   */
  function removeAt(node, i) {
    if (i === word.length) {
      node.isEnd = false;
      return node.children.size === 0;
    }
    const ch = word[i];
    const child = node.children.get(ch);
    if (child === undefined) return false;
    const empty = removeAt(child, i + 1);
    if (empty) node.children.delete(ch);
    return node.children.size === 0 && !node.isEnd;
  }
  removeAt(trie.root, 0);
  return true;
}
