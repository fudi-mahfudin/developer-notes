/**
 * Judul: Topik 88 — Cancellation dengan AbortController
 *
 * Soal Test eksplisit:
 * - makeAbortableDelay: reject AbortError jika signal aborted.
 * - withTimeoutAbort: auto-abort setelah timeout.
 * - chainAbortSignals: signal gabungan (abort jika salah satu abort).
 *
 * Kontrak (opsional):
 * - Error cancellation bernama "AbortError".
 *
 * Contoh output:
 * - timeout 10ms pada task 50ms => reject AbortError.
 *
 * Solusi detail:
 * - Dengarkan signal "abort".
 * - Bersihkan listener setelah selesai.
 */

function abortError(message = "Aborted") {
  const err = new Error(message);
  err.name = "AbortError";
  return err;
}

/**
 * Judul: Delay yang bisa dibatalkan
 * Soal Test eksplisit: abort sebelum selesai -> reject.
 * Contoh output: reject AbortError.
 * Solusi detail: setTimeout + listener abort.
 */
export function makeAbortableDelay(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(abortError());
    const timer = setTimeout(() => {
      cleanup();
      resolve("done");
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      cleanup();
      reject(abortError());
    };
    const cleanup = () => signal?.removeEventListener("abort", onAbort);
    signal?.addEventListener("abort", onAbort);
  });
}

/**
 * Judul: Jalankan task dengan timeout abort
 * Soal Test eksplisit: task lambat dibatalkan.
 * Contoh output: reject AbortError.
 * Solusi detail: controller + timer abort.
 */
export async function withTimeoutAbort(task, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await task(controller.signal);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Judul: Gabungkan banyak AbortSignal menjadi satu
 * Soal Test eksplisit: jika salah satu abort, signal gabungan abort.
 * Contoh output: merged.aborted true.
 * Solusi detail: controller baru + forward abort.
 */
export function chainAbortSignals(signals) {
  const controller = new AbortController();
  const onAbort = () => {
    if (!controller.signal.aborted) controller.abort();
  };
  for (const s of signals) {
    if (!s) continue;
    if (s.aborted) {
      onAbort();
      break;
    }
    s.addEventListener("abort", onAbort);
  }
  return controller.signal;
}

/**
 * Judul: Cek apakah error adalah abort error
 * Soal Test eksplisit: Error biasa false.
 * Contoh output: {name:'AbortError'} => true.
 * Solusi detail: cek properti name.
 */
export function isAbortError(error) {
  return error instanceof Error && error.name === "AbortError";
}

/**
 * Judul: Buat AbortController yang auto abort setelah ms
 * Soal Test eksplisit: signal.aborted true setelah timeout.
 * Contoh output: controller.signal.aborted === true.
 * Solusi detail: setTimeout(controller.abort).
 */
export function createAutoAbortController(ms) {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller;
}

/**
 * Judul: Wrapper task cancellable dengan signal opsional
 * Soal Test eksplisit: jika aborted sebelum start -> reject.
 * Contoh output: AbortError.
 * Solusi detail: guard awal lalu jalankan task(signal).
 */
export async function runCancellable(task, signal) {
  if (signal?.aborted) throw abortError();
  return task(signal);
}

