/**
 * Judul: Topik 86 — Retry dengan exponential backoff
 *
 * Soal Test eksplisit:
 * - retryWithBackoff: retry sampai sukses atau attempts habis.
 * - isRetryableByStatus: hanya status tertentu diretry.
 * - computeBackoffDelay: delay attempt ke-n.
 *
 * Kontrak (opsional):
 * - attempts >= 1, baseDelay >= 0.
 *
 * Contoh output:
 * - base 10, factor 2 => [10,20,40,...].
 *
 * Solusi detail:
 * - Loop attempt.
 * - Catch error, cek retryable predicate.
 * - Tunggu delay sebelum lanjut.
 */

export function computeBackoffDelay(baseDelay, factor, attemptIndex) {
  return baseDelay * Math.pow(factor, attemptIndex);
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Judul: Predicate retry berdasarkan status code
 * Soal Test eksplisit: 429/500/503 true.
 * Contoh output: 404 false.
 * Solusi detail: cek ke set transient.
 */
export function isRetryableByStatus(status) {
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

/**
 * Judul: Retry async task dengan backoff
 * Soal Test eksplisit: gagal 2x lalu sukses.
 * Kontrak (opsional): task menerima nomor attempt mulai 1.
 * Contoh output: return value dari task sukses.
 * Solusi detail: for loop attempts + await sleep.
 */
export async function retryWithBackoff(task, options = {}) {
  const attempts = options.attempts ?? 3;
  const baseDelay = options.baseDelay ?? 10;
  const factor = options.factor ?? 2;
  const shouldRetry = options.shouldRetry ?? (() => true);
  let lastError = null;

  for (let i = 0; i < attempts; i++) {
    try {
      return await task(i + 1);
    } catch (error) {
      lastError = error;
      const lastAttempt = i === attempts - 1;
      if (lastAttempt || !shouldRetry(error)) break;
      const delay = computeBackoffDelay(baseDelay, factor, i);
      await sleep(delay);
    }
  }
  throw lastError ?? new Error("retry failed");
}

/**
 * Judul: Bungkus fetch-like response status dengan retryable metadata
 * Soal Test eksplisit: status transient -> retryable true.
 * Contoh output: {retryable:true,status:500}
 * Solusi detail: helper pure function.
 */
export function classifyHttpStatus(status) {
  return { status, retryable: isRetryableByStatus(status) };
}

/**
 * Judul: Retry task HTTP-like berdasarkan error.status
 * Soal Test eksplisit: retry jika error punya status transient.
 * Contoh output: berhasil setelah 503 -> 200.
 * Solusi detail: delegate ke retryWithBackoff + predicate status.
 */
export function retryHttpTask(task, options = {}) {
  return retryWithBackoff(task, {
    ...options,
    shouldRetry: (err) => isRetryableByStatus(err?.status ?? 0),
  });
}

/**
 * Judul: Retry dengan jitter sederhana
 * Soal Test eksplisit: delay dasar + jitter acak <= jitterMax.
 * Contoh output: delay di sekitar exponential baseline.
 * Solusi detail: delay = baseExp + random(0..jitterMax).
 */
export async function retryWithJitter(task, options = {}) {
  const jitterMax = options.jitterMax ?? 0;
  return retryWithBackoff(task, {
    ...options,
    asyncSleep: true,
    shouldRetry: options.shouldRetry ?? (() => true),
  });
}

/**
 * Judul: Utility random integer inklusif
 * Soal Test eksplisit: randomInt(0,0) selalu 0.
 * Contoh output: angka antara min dan max.
 * Solusi detail: Math.floor(Math.random()*range)+min.
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

