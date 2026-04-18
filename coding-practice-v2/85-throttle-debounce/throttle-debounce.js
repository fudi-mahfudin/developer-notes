/**
 * Judul: Topik 85 — Throttle dan Debounce
 *
 * Soal Test eksplisit:
 * - debounce: hanya eksekusi setelah jeda tanpa trigger baru.
 * - throttle: batasi frekuensi eksekusi dalam window.
 * - cancelDebounced/cancelThrottled helpers.
 *
 * Kontrak (opsional):
 * - Menggunakan timer environment (setTimeout/clearTimeout).
 *
 * Contoh output:
 * - debounce 50ms dipanggil 3x cepat => callback 1x.
 *
 * Solusi detail:
 * - Debounce: reset timer setiap call.
 * - Throttle: simpan lastTime dan optional trailing timer.
 */

export function debounce(fn, wait) {
  let timer = null;
  return function debounced(...args) {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, wait);
  };
}

/**
 * Judul: Debounce dengan cancel
 * Soal Test eksplisit: cancel mencegah eksekusi tertunda.
 * Contoh output: panggil cancel sebelum wait habis => 0 call.
 * Solusi detail: expose {call,cancel}.
 */
export function createDebounceController(fn, wait) {
  let timer = null;
  const call = (...args) => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, wait);
  };
  const cancel = () => {
    if (timer !== null) clearTimeout(timer);
    timer = null;
  };
  return { call, cancel };
}

export function throttle(fn, wait) {
  let last = -Infinity;
  let trailingTimer = null;
  let trailingArgs = null;

  return function throttled(...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
      return;
    }
    trailingArgs = args;
    if (trailingTimer !== null) return;
    const delay = wait - (now - last);
    trailingTimer = setTimeout(() => {
      trailingTimer = null;
      if (trailingArgs !== null) {
        last = Date.now();
        fn.apply(this, trailingArgs);
        trailingArgs = null;
      }
    }, delay);
  };
}

/**
 * Judul: Throttle controller dengan cancel
 * Soal Test eksplisit: cancel trailing call.
 * Contoh output: burst lalu cancel => hanya leading call.
 * Solusi detail: bungkus throttle + timer state.
 */
export function createThrottleController(fn, wait) {
  let last = -Infinity;
  let timer = null;
  let argsCache = null;
  const call = (...args) => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn(...args);
      return;
    }
    argsCache = args;
    if (timer !== null) return;
    timer = setTimeout(() => {
      timer = null;
      if (argsCache) {
        last = Date.now();
        fn(...argsCache);
        argsCache = null;
      }
    }, wait - (now - last));
  };
  const cancel = () => {
    if (timer !== null) clearTimeout(timer);
    timer = null;
    argsCache = null;
  };
  return { call, cancel };
}

/**
 * Judul: Helper no-op untuk benchmark sederhana
 * Soal Test eksplisit: return undefined.
 * Contoh output: noop() => undefined.
 * Solusi detail: fungsi kosong.
 */
export function noop() {}

