/**
 * Judul: Topik 97 — Memoization function wrapper
 *
 * Soal Test eksplisit:
 * - memoize unary/function multi-arg.
 * - custom key resolver.
 * - memoizeAsync dedupe in-flight promise.
 *
 * Kontrak (opsional):
 * - Default key pakai JSON.stringify(args) (terbatas).
 *
 * Contoh output:
 * - fn mahal dipanggil sekali untuk argumen sama.
 *
 * Solusi detail:
 * - Simpan cache Map<key,value>.
 * - Untuk async, simpan promise saat in-flight.
 */

export function defaultKeyResolver(args) {
  return JSON.stringify(args);
}

export function memoize(fn, keyResolver = defaultKeyResolver) {
  const cache = new Map();
  const wrapped = (...args) => {
    const key = keyResolver(args);
    if (cache.has(key)) return cache.get(key);
    const value = fn(...args);
    cache.set(key, value);
    return value;
  };
  wrapped.cache = cache;
  wrapped.clear = () => cache.clear();
  return wrapped;
}

/**
 * Judul: Memoize async dengan in-flight dedup
 * Soal Test eksplisit: dua call paralel argumen sama -> 1 eksekusi.
 * Contoh output: promise resolved value sama.
 * Solusi detail: cache promise, replace tetap promise resolved.
 */
export function memoizeAsync(fn, keyResolver = defaultKeyResolver) {
  const cache = new Map();
  const wrapped = async (...args) => {
    const key = keyResolver(args);
    if (cache.has(key)) return cache.get(key);
    const p = Promise.resolve(fn(...args));
    cache.set(key, p);
    try {
      return await p;
    } catch (e) {
      cache.delete(key);
      throw e;
    }
  };
  wrapped.cache = cache;
  wrapped.clear = () => cache.clear();
  return wrapped;
}

/**
 * Judul: TTL memoize (sync) sederhana
 * Soal Test eksplisit: expire setelah ttlMs.
 * Kontrak (opsional): nowFn injectable.
 * Contoh output: setelah ttl lewat, recompute.
 * Solusi detail: cache value + expiresAt.
 */
export function memoizeWithTTL(fn, ttlMs, nowFn = () => Date.now(), keyResolver = defaultKeyResolver) {
  const cache = new Map();
  const wrapped = (...args) => {
    const key = keyResolver(args);
    const now = nowFn();
    if (cache.has(key)) {
      const rec = cache.get(key);
      if (rec.expiresAt >= now) return rec.value;
    }
    const value = fn(...args);
    cache.set(key, { value, expiresAt: now + ttlMs });
    return value;
  };
  wrapped.cache = cache;
  return wrapped;
}

/**
 * Judul: Stats helper untuk memo wrapper
 * Soal Test eksplisit: inspect size/hit/miss eksternal.
 * Contoh output: {size:2}
 * Solusi detail: return metadata sederhana.
 */
export function memoStats(wrapper) {
  return { size: wrapper.cache.size };
}

/**
 * Judul: build key dari arg pertama saja
 * Soal Test eksplisit: custom resolver.
 * Contoh output: firstArgResolver([10,20]) => "10"
 * Solusi detail: stringify arg0.
 */
export function firstArgResolver(args) {
  return JSON.stringify(args[0]);
}

