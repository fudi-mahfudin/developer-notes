/**
 * Judul: Topik 99 — Pipeline / Compose functions
 *
 * Soal Test eksplisit:
 * - pipe: kiri->kanan.
 * - compose: kanan->kiri.
 * - pipeAsync: dukung sync+async step.
 *
 * Kontrak (opsional):
 * - Setiap fungsi menerima satu argumen output step sebelumnya.
 *
 * Contoh output:
 * - pipe(add1,double)(2) => 6.
 *
 * Solusi detail:
 * - reduce / reduceRight untuk compose.
 */

export function pipe(...fns) {
  return (input) => fns.reduce((acc, fn) => fn(acc), input);
}

export function compose(...fns) {
  return (input) => fns.reduceRight((acc, fn) => fn(acc), input);
}

/**
 * Judul: Pipeline async
 * Soal Test eksplisit: mix sync+async.
 * Contoh output: pipeAsync(f1,f2)(x) resolve final value.
 * Solusi detail: reduce promise chain.
 */
export function pipeAsync(...fns) {
  return (input) => fns.reduce((p, fn) => Promise.resolve(p).then(fn), Promise.resolve(input));
}

/**
 * Judul: Tap operator untuk debug dalam pipeline
 * Soal Test eksplisit: tap tidak ubah nilai.
 * Contoh output: pipe(tap(log), fn) tetap jalankan fn dengan nilai sama.
 * Solusi detail: panggil sideEffect lalu return input.
 */
export function tap(sideEffect) {
  return (x) => {
    sideEffect(x);
    return x;
  };
}

/**
 * Judul: Identity helper
 * Soal Test eksplisit: identity(x)=x.
 * Contoh output: identity(10)=>10.
 * Solusi detail: fungsi langsung.
 */
export function identity(x) {
  return x;
}

/**
 * Judul: Guard pipeline step
 * Soal Test eksplisit: throw jika validator gagal.
 * Contoh output: guard(x>0) untuk angka positif.
 * Solusi detail: validate lalu return input.
 */
export function guard(validator, message = "validation failed") {
  return (x) => {
    if (!validator(x)) throw new Error(message);
    return x;
  };
}

/**
 * Judul: Branch helper (if/else in pipeline)
 * Soal Test eksplisit: pilih fnTrue/fnFalse.
 * Contoh output: branch(x>0,inc,dec).
 * Solusi detail: ternary function call.
 */
export function branch(predicate, fnTrue, fnFalse = identity) {
  return (x) => (predicate(x) ? fnTrue(x) : fnFalse(x));
}

/**
 * Judul: Create numeric transforms library
 * Soal Test eksplisit: add, mul builder.
 * Contoh output: add(2)(3)=>5.
 * Solusi detail: higher-order function.
 */
export const add = (n) => (x) => x + n;
export const mul = (n) => (x) => x * n;
export const toString = (x) => String(x);

/**
 * Judul: tryPipe wrapper
 * Soal Test eksplisit: error ditangkap jadi object {ok:false,error}.
 * Kontrak (opsional): fnPipe adalah fungsi unary.
 * Contoh output: tryPipe(f,-1) => {ok:false,...}
 * Solusi detail: try/catch sederhana.
 */
export function tryPipe(fnPipe, input) {
  try {
    return { ok: true, value: fnPipe(input), error: null };
  } catch (error) {
    return { ok: false, value: null, error };
  }
}

/**
 * Judul: parallelMap helper untuk pipeline data array
 * Soal Test eksplisit: parallelMap(add(1))([1,2]) => [2,3].
 * Contoh output: transform tiap elemen.
 * Solusi detail: arr.map(fn).
 */
export function parallelMap(fn) {
  return (arr) => arr.map(fn);
}

