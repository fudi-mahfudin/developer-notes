/**
 * Judul: Topik 83 — async/await dan error handling
 *
 * Soal Test eksplisit:
 * - safeAwait: ubah promise jadi tuple [err, data].
 * - executeWithFallback: jika gagal return fallback.
 * - withRetrySimple: retry n kali secara sederhana.
 *
 * Kontrak (opsional):
 * - task adalah function async yang return Promise.
 *
 * Contoh output:
 * - task gagal 2x lalu sukses => withRetrySimple(...,3) sukses.
 *
 * Solusi detail:
 * - try/catch di layer wrapper, bukan setiap caller.
 * - Kembalikan shape konsisten agar alur mudah dites.
 */

/**
 * Judul: safeAwait tuple
 * Soal Test eksplisit: fulfilled -> [null,data], reject -> [error,null].
 * Contoh output: await safeAwait(Promise.resolve(1)) => [null,1].
 * Solusi detail: try await catch.
 */
export async function safeAwait(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

/**
 * Judul: Jalankan task dengan fallback
 * Soal Test eksplisit: task reject -> fallback.
 * Contoh output: fallback "N/A".
 * Solusi detail: catch dan return fallbackValue.
 */
export async function executeWithFallback(task, fallbackValue) {
  try {
    return await task();
  } catch {
    return fallbackValue;
  }
}

/**
 * Judul: Retry sederhana berbasis attempts
 * Soal Test eksplisit: sukses sebelum max attempts.
 * Contoh output: percobaan ketiga berhasil.
 * Solusi detail: loop for + try/catch simpan lastError.
 */
export async function withRetrySimple(task, maxAttempts) {
  let lastError = null;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await task(i + 1);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError ?? new Error("retry exhausted");
}

/**
 * Judul: Ambil banyak task paralel tapi aman (allSettled style)
 * Soal Test eksplisit: hasil selalu array status.
 * Contoh output: [{ok:true,value}, {ok:false,error}]
 * Solusi detail: Promise.all atas mapped safe wrapper.
 */
export async function runManySafe(tasks) {
  const wrapped = tasks.map(async (task) => {
    try {
      return { ok: true, value: await task() };
    } catch (error) {
      return { ok: false, error };
    }
  });
  return Promise.all(wrapped);
}

/**
 * Judul: Domain error mapper
 * Soal Test eksplisit: map Error => object terstruktur.
 * Contoh output: {code:"E_GENERIC", message:"..."}.
 * Solusi detail: normalisasi instance Error / string.
 */
export function mapError(error) {
  if (error instanceof Error) return { code: "E_GENERIC", message: error.message };
  return { code: "E_UNKNOWN", message: String(error) };
}

/**
 * Judul: Executor dengan logging callback
 * Soal Test eksplisit: onError dipanggil saat throw.
 * Contoh output: logger menerima mapped error.
 * Solusi detail: catch -> onError(mapError(err)).
 */
export async function executeWithLogging(task, onError) {
  try {
    return await task();
  } catch (error) {
    onError(mapError(error));
    throw error;
  }
}

