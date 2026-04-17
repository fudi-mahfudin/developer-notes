/**
 * Judul: Topik 98 — Curry dan Partial Application
 *
 * Soal Test eksplisit:
 * - curry: fungsi n-arg jadi chain unary/multi-arg call.
 * - partial: pre-fill sebagian argumen.
 * - placeholder partialWithPlaceholder.
 *
 * Kontrak (opsional):
 * - Default arity dari fn.length.
 *
 * Contoh output:
 * - curry(sum3)(1)(2)(3) => 6.
 *
 * Solusi detail:
 * - Kumpulkan argumen sampai cukup lalu eksekusi fn.
 */

export function curry(fn, arity = fn.length) {
  function curried(...args) {
    if (args.length >= arity) return fn(...args.slice(0, arity));
    return (...next) => curried(...args, ...next);
  }
  return curried;
}

export function partial(fn, ...presetArgs) {
  return (...rest) => fn(...presetArgs, ...rest);
}

export const __ = Symbol("placeholder");

/**
 * Judul: Partial dengan placeholder
 * Soal Test eksplisit: partialWithPlaceholder(sum3,__,2,__)(1,3)=6.
 * Kontrak (opsional): jumlah argumen final harus cukup.
 * Contoh output: placeholder diganti berurutan dari input call.
 * Solusi detail: iterate preset dan substitusi __.
 */
export function partialWithPlaceholder(fn, ...preset) {
  return (...later) => {
    const merged = [];
    let i = 0;
    for (const p of preset) {
      if (p === __) merged.push(later[i++]);
      else merged.push(p);
    }
    while (i < later.length) merged.push(later[i++]);
    return fn(...merged);
  };
}

/**
 * Judul: Uncurry helper
 * Soal Test eksplisit: uncurry(curry(fn))(a,b,c) sama dengan fn(a,b,c).
 * Contoh output: call biasa.
 * Solusi detail: apply bertahap ke returned function.
 */
export function uncurry(curriedFn, arity) {
  return (...args) => {
    let acc = curriedFn;
    for (let i = 0; i < arity; i++) acc = acc(args[i]);
    return acc;
  };
}

/**
 * Judul: Right partial (argumen dibelakang)
 * Soal Test eksplisit: partialRight(fn,3)(1,2)=fn(1,2,3).
 * Contoh output: result sesuai urutan kanan.
 * Solusi detail: join rest + presetRight.
 */
export function partialRight(fn, ...presetRight) {
  return (...rest) => fn(...rest, ...presetRight);
}

/**
 * Judul: isCurriedCallable helper
 * Soal Test eksplisit: cek bahwa return adalah function.
 * Contoh output: true.
 * Solusi detail: typeof check.
 */
export function isFunction(value) {
  return typeof value === "function";
}

/**
 * Judul: curry2 convenience
 * Soal Test eksplisit: curry2(add)(1)(2)=3.
 * Contoh output: integer result.
 * Solusi detail: wrapper curry arity 2.
 */
export function curry2(fn) {
  return curry(fn, 2);
}

/**
 * Judul: applyCurried helper
 * Soal Test eksplisit: applyCurried(curry(sum3),[1,2,3]) => 6.
 * Kontrak (opsional): args length >= arity target.
 * Contoh output: nilai hasil invoke bertahap.
 * Solusi detail: reduce panggil function berantai.
 */
export function applyCurried(curriedFn, args) {
  return args.reduce((acc, x) => acc(x), curriedFn);
}

/**
 * Judul: arityOf helper
 * Soal Test eksplisit: arityOf((a,b)=>a+b) => 2.
 * Contoh output: integer.
 * Solusi detail: gunakan fn.length.
 */
export function arityOf(fn) {
  return fn.length;
}

