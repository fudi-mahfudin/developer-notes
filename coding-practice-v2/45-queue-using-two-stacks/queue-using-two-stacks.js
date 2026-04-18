/**
 * Judul: Topik 45 — Queue dengan dua stack
 *
 * Soal test:
 * - QueueTwoStacks: FIFO `enqueue`/`peek`/`dequeue`/`size` — amortized O(1).
 *
 * Kontrak: tidak `dequeue` dari antrian kosong (throw).
 *
 * Solusi: `inStack` untuk push; `outStack` untuk pop — pindahkan `in` ke `out` saat `out` kosong.
 *
 * @see knowledge-base/05-coding-interview-v2/45-queue-using-two-stacks.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/45-queue-using-two-stacks/queue-using-two-stacks.test.js`
 */

/**
 * Judul: Antrian FIFO berbasis dua stack
 *
 * Soal test:
 * - Urutan dequeue sama dengan urutan enqueue.
 *
 * Kontrak: elemen sembarang.
 *
 * Solusi: Amortized transfer `in` → `out`.
 */
export class QueueTwoStacks {
  constructor() {
    /** @type {unknown[]} */
    this.inStack = [];
    /** @type {unknown[]} */
    this.outStack = [];
  }

  /**
   * @param {unknown} x
   */
  enqueue(x) {
    this.inStack.push(x);
  }

  #moveInToOut() {
    if (this.outStack.length > 0) return;
    while (this.inStack.length > 0) {
      this.outStack.push(this.inStack.pop());
    }
  }

  /**
   */
  dequeue() {
    this.#moveInToOut();
    if (this.outStack.length === 0) throw new RangeError("queue empty");
    return this.outStack.pop();
  }

  /**
   */
  peek() {
    this.#moveInToOut();
    if (this.outStack.length === 0) throw new RangeError("queue empty");
    return this.outStack[this.outStack.length - 1];
  }

  /**
   */
  get size() {
    return this.inStack.length + this.outStack.length;
  }

  /**
   * @returns {boolean}
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * @param {unknown[]} items
   */
  enqueueMany(items) {
    if (!Array.isArray(items)) throw new TypeError("items must be an array");
    for (const x of items) this.enqueue(x);
  }

  /**
   * @returns {unknown[]}
   */
  drainToArray() {
    /** @type {unknown[]} */
    const out = [];
    while (!this.isEmpty()) {
      out.push(this.dequeue());
    }
    return out;
  }
}

/**
 * Judul: Snapshot FIFO — mengembalikan array tanpa mengubah isi queue
 *
 * Soal test:
 * - `enqueue` 1,2,3 → snapshot `[1,2,3]`; queue masih bisa dequeue 1.
 *
 * Kontrak: queue dipulihkan setelah snapshot.
 *
 * Solusi: Drain ke buffer sementara lalu enqueue balik.
 *
 * @param {QueueTwoStacks} q
 */
export function queueSnapshotArray(q) {
  if (!(q instanceof QueueTwoStacks)) throw new TypeError("expected QueueTwoStacks");
  /** @type {unknown[]} */
  const order = [];
  const tmp = new QueueTwoStacks();
  while (!q.isEmpty()) {
    const x = q.dequeue();
    order.push(x);
    tmp.enqueue(x);
  }
  while (!tmp.isEmpty()) {
    q.enqueue(tmp.dequeue());
  }
  return order;
}
