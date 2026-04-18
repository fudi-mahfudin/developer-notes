/**
 * Judul: Topik 84 — Promise.all / allSettled / race wrappers
 *
 * Soal Test eksplisit:
 * - runAllStrict: reject bila ada 1 gagal.
 * - runAllSettledSummary: hitung fulfilled/rejected.
 * - runRaceFirst: hasil tercepat resolve/reject.
 *
 * Kontrak (opsional):
 * - Input berupa array promise atau factory fungsi async.
 *
 * Contoh output:
 * - allSettled summary => {fulfilled:2,rejected:1}.
 *
 * Solusi detail:
 * - Wrapper tipis di atas API native plus formatter output.
 */

export function runAllStrict(promises) {
  return Promise.all(promises);
}

/**
 * Judul: Ringkasan hasil Promise.allSettled
 * Soal Test eksplisit: count sukses/gagal.
 * Contoh output: details array status.
 * Solusi detail: await allSettled lalu reduce.
 */
export async function runAllSettledSummary(promises) {
  const details = await Promise.allSettled(promises);
  let fulfilled = 0;
  let rejected = 0;
  for (const d of details) {
    if (d.status === "fulfilled") fulfilled += 1;
    else rejected += 1;
  }
  return { fulfilled, rejected, details };
}

/**
 * Judul: Promise.race wrapper
 * Soal Test eksplisit: resolve tercepat menang.
 * Contoh output: race dari 10ms dan 1ms => hasil 1ms.
 * Solusi detail: direct Promise.race.
 */
export function runRaceFirst(promises) {
  return Promise.race(promises);
}

/**
 * Judul: Buat delayed resolved promise
 * Soal Test eksplisit: helper test timing.
 * Contoh output: after ms return value.
 * Solusi detail: setTimeout resolve.
 */
export function resolveAfter(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/**
 * Judul: Buat delayed rejected promise
 * Soal Test eksplisit: helper reject race.
 * Contoh output: reject Error(message).
 * Solusi detail: setTimeout reject.
 */
export function rejectAfter(ms, message) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));
}

/**
 * Judul: Factory-runner untuk array task functions
 * Soal Test eksplisit: tasks dipanggil lazily.
 * Kontrak (opsional): task: () => Promise<any>.
 * Contoh output: runTaskFactoriesAll([f1,f2]) => Promise.all result.
 * Solusi detail: map call.
 */
export function runTaskFactoriesAll(taskFactories) {
  return Promise.all(taskFactories.map((f) => f()));
}

/**
 * Judul: Settled summary dari task factories
 * Soal Test eksplisit: kombinasi resolve/reject.
 * Contoh output: same schema runAllSettledSummary.
 * Solusi detail: execute then delegate.
 */
export async function runTaskFactoriesSettled(taskFactories) {
  const promises = taskFactories.map((f) => f());
  return runAllSettledSummary(promises);
}

/**
 * Judul: Promise.any wrapper dengan fallback
 * Soal Test eksplisit: jika semua reject -> fallback.
 * Contoh output: any gagal semua => "fallback".
 * Solusi detail: try Promise.any, catch AggregateError.
 */
export async function runAnyWithFallback(promises, fallbackValue) {
  try {
    return await Promise.any(promises);
  } catch {
    return fallbackValue;
  }
}

/**
 * Judul: Normalisasi settled details ke array pesan ringkas
 * Soal Test eksplisit: status+value/error summary.
 * Contoh output: ["ok:1","err:x"].
 * Solusi detail: map object details.
 */
export function summarizeSettledDetails(details) {
  return details.map((d) => (d.status === "fulfilled" ? `ok:${d.value}` : `err:${d.reason?.message ?? d.reason}`));
}

