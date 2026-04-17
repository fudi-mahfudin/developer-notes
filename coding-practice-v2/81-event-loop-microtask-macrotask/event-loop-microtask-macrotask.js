/**
 * Judul: Topik 81 — Event loop microtask vs macrotask
 *
 * Soal Test eksplisit:
 * - scheduleDemoOrder: sinkron dijalankan dulu, lalu microtask, lalu macrotask.
 * - flushMicrotasks helper untuk test deterministik.
 * - simulateEventLoopQueue: simulasi sederhana dengan dua antrean.
 *
 * Kontrak (opsional):
 * - Di browser/node modern, Promise.then adalah microtask.
 *
 * Contoh output:
 * - Urutan: ["sync-start","sync-end","micro","macro"].
 *
 * Solusi detail:
 * - Gunakan Promise.resolve().then untuk microtask.
 * - Gunakan setTimeout(...,0) untuk macrotask.
 */

/**
 * Judul: Flush microtask queue satu tick
 * Soal Test eksplisit: callback Promise.then selesai sebelum assert.
 * Contoh output: await flushMicrotasks() setelah enqueue microtask.
 * Solusi detail: await Promise.resolve().
 */
export async function flushMicrotasks() {
  await Promise.resolve();
}

/**
 * Judul: Tunda satu macrotask tick
 * Soal Test eksplisit: callback setTimeout 0 selesai.
 * Contoh output: await delay(0).
 * Solusi detail: Promise + setTimeout.
 */
export function delay(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Judul: Demo urutan event loop nyata
 * Soal Test eksplisit: sync -> micro -> macro.
 * Contoh output: ["sync-start","sync-end","micro","macro"].
 * Solusi detail: isi array log dari tiga fase.
 */
export async function scheduleDemoOrder() {
  /** @type {string[]} */
  const log = [];
  log.push("sync-start");
  Promise.resolve().then(() => log.push("micro"));
  setTimeout(() => log.push("macro"), 0);
  log.push("sync-end");
  await flushMicrotasks();
  await delay(0);
  return log;
}

/**
 * Judul: Simulasi event loop sederhana (tanpa runtime async)
 * Soal Test eksplisit: micro selalu habis sebelum 1 macro dieksekusi.
 * Contoh output: ["s1","m1","m2","M1","m3","M2"].
 * Solusi detail:
 * - Jalankan semua sync.
 * - Loop: drain microtask penuh, lalu ambil 1 macrotask.
 */
export function simulateEventLoopQueue(syncTasks, microTasks, macroTasks) {
  /** @type {string[]} */
  const log = [];
  const syncQ = [...syncTasks];
  const microQ = [...microTasks];
  const macroQ = [...macroTasks];

  while (syncQ.length) log.push(syncQ.shift());

  while (microQ.length || macroQ.length) {
    while (microQ.length) log.push(microQ.shift());
    if (macroQ.length) {
      const task = macroQ.shift();
      log.push(task.name);
      for (const m of task.spawnMicro || []) microQ.push(m);
    }
  }
  return log;
}

/**
 * Judul: Buat macrotask model untuk simulator
 * Soal Test eksplisit: helper pembuatan fixture.
 * Contoh output: createMacro("M1",["m3"]).
 * Solusi detail: object plain.
 */
export function createMacro(name, spawnMicro = []) {
  return { name, spawnMicro };
}

/**
 * Judul: Prediksi urutan synchronous log
 * Soal Test eksplisit: hanya mengembalikan input sama.
 * Contoh output: ["a","b"] => ["a","b"].
 * Solusi detail: clone array untuk menghindari mutasi.
 */
export function runSyncOnly(logs) {
  return [...logs];
}

