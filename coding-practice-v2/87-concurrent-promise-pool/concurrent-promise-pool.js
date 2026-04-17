/**
 * Judul: Topik 87 — Concurrent promise pool
 *
 * Soal Test eksplisit:
 * - promisePool: batasi task concurrent maksimum.
 * - mapWithConcurrency: map async dengan concurrency limit.
 * - settleWithConcurrency: allSettled style dengan limit.
 *
 * Kontrak (opsional):
 * - limit >= 1.
 *
 * Contoh output:
 * - 5 task, limit 2 => tidak pernah >2 task running bersamaan.
 *
 * Solusi detail:
 * - Jalankan worker sebanyak `limit`.
 * - Worker ambil index global atomik lalu proses sampai habis.
 */

export async function promisePool(taskFactories, limit) {
  if (limit < 1) throw new RangeError("limit must be >= 1");
  const results = Array(taskFactories.length);
  let next = 0;

  async function worker() {
    while (true) {
      const i = next;
      next += 1;
      if (i >= taskFactories.length) return;
      results[i] = await taskFactories[i]();
    }
  }

  const workers = Array.from({ length: Math.min(limit, taskFactories.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

/**
 * Judul: map async dengan concurrency
 * Soal Test eksplisit: urutan hasil sesuai input index.
 * Contoh output: [1,2,3] mapper x*2 => [2,4,6].
 * Solusi detail: ubah item ke taskFactory lalu delegasi pool.
 */
export function mapWithConcurrency(items, mapper, limit) {
  const tasks = items.map((item, i) => () => mapper(item, i));
  return promisePool(tasks, limit);
}

/**
 * Judul: allSettled dengan concurrency limit
 * Soal Test eksplisit: campuran resolve/reject.
 * Contoh output: status fulfilled/rejected per index.
 * Solusi detail: worker try/catch simpan object status.
 */
export async function settleWithConcurrency(taskFactories, limit) {
  if (limit < 1) throw new RangeError("limit must be >= 1");
  const results = Array(taskFactories.length);
  let next = 0;
  async function worker() {
    while (true) {
      const i = next;
      next += 1;
      if (i >= taskFactories.length) return;
      try {
        const value = await taskFactories[i]();
        results[i] = { status: "fulfilled", value };
      } catch (reason) {
        results[i] = { status: "rejected", reason };
      }
    }
  }
  const workers = Array.from({ length: Math.min(limit, taskFactories.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

/**
 * Judul: Helper task factory dengan delay
 * Soal Test eksplisit: simpan timeline running.
 * Contoh output: createDelayedTask(5,"a") => promise resolve "a" setelah 5ms.
 * Solusi detail: setTimeout wrapper.
 */
export function createDelayedTask(ms, value, onStart, onEnd) {
  return () =>
    new Promise((resolve) => {
      onStart?.();
      setTimeout(() => {
        onEnd?.();
        resolve(value);
      }, ms);
    });
}

/**
 * Judul: Chunk array untuk batching awal (opsional)
 * Soal Test eksplisit: chunk([1,2,3,4],2) => [[1,2],[3,4]]
 * Contoh output: sisa elemen masuk chunk terakhir.
 * Solusi detail: loop step size.
 */
export function chunkArray(items, size) {
  /** @type {any[][]} */
  const out = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

/**
 * Judul: Hitung jumlah worker efektif
 * Soal Test eksplisit: min(limit, taskCount).
 * Contoh output: task 3, limit 10 => 3.
 * Solusi detail: Math.min.
 */
export function effectiveWorkers(taskCount, limit) {
  return Math.min(taskCount, Math.max(0, limit));
}

