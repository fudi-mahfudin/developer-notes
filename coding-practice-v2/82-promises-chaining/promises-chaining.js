/**
 * Judul: Topik 82 — Promise chaining
 *
 * Soal Test eksplisit:
 * - runPipelineChain: transform nilai lewat chain then.
 * - chainWithRecovery: error di tengah chain ditangani catch lalu lanjut.
 * - toResultObject: normalisasi resolved/rejected jadi object.
 *
 * Kontrak (opsional):
 * - Step dapat sync/async.
 *
 * Contoh output:
 * - input 2, steps [x+1, x*2] => 6.
 *
 * Solusi detail:
 * - Start dari Promise.resolve(input).
 * - Loop step: p = p.then(step).
 */

/**
 * Judul: Jalankan pipeline dengan promise chain
 * Soal Test eksplisit: steps sync+async.
 * Contoh output: 2 => 6.
 * Solusi detail: reduce pada steps.
 */
export function runPipelineChain(input, steps) {
  return steps.reduce((p, step) => p.then(step), Promise.resolve(input));
}

/**
 * Judul: Chain dengan recovery saat error
 * Soal Test eksplisit: throw di step kedua, fallback dipakai.
 * Contoh output: fallback 10 lalu step lanjut => 11.
 * Solusi detail: .catch(recoverFn) ditempatkan setelah chain awal.
 */
export function chainWithRecovery(input, steps, recoverFn, finalFn = (x) => x) {
  return runPipelineChain(input, steps).catch(recoverFn).then(finalFn);
}

/**
 * Judul: Bungkus promise menjadi result object
 * Soal Test eksplisit: status fulfilled/rejected.
 * Contoh output: {ok:true,value:...} atau {ok:false,error:...}.
 * Solusi detail: try/await di helper async.
 */
export async function toResultObject(promise) {
  try {
    const value = await promise;
    return { ok: true, value };
  } catch (error) {
    return { ok: false, error };
  }
}

/**
 * Judul: Step async contoh
 * Soal Test eksplisit: dipakai pada pipeline.
 * Contoh output: asyncAdd(2,3) => 5.
 * Solusi detail: Promise.resolve(a+b).
 */
export function asyncAdd(a, b) {
  return Promise.resolve(a + b);
}

/**
 * Judul: Step async yang reject untuk test propagation
 * Soal Test eksplisit: should reject.
 * Contoh output: reject Error("boom").
 * Solusi detail: Promise.reject(new Error(msg)).
 */
export function asyncFail(message = "boom") {
  return Promise.reject(new Error(message));
}

/**
 * Judul: Compose promise steps (functional helper)
 * Soal Test eksplisit: composeThen([f,g])(x) == g(await f(x)).
 * Contoh output: composeThen([...])(2) => expected.
 * Solusi detail: return function yang panggil runPipelineChain.
 */
export function composeThen(steps) {
  return (input) => runPipelineChain(input, steps);
}

/**
 * Judul: Jalankan chain dan attach finally hook
 * Soal Test eksplisit: finally selalu dipanggil.
 * Contoh output: marker updated.
 * Solusi detail: promise.finally(cleanup).
 */
export function runWithFinally(input, steps, cleanup) {
  return runPipelineChain(input, steps).finally(cleanup);
}

/**
 * Judul: Chain nilai awal default bila input nullish
 * Soal Test eksplisit: null input diganti default.
 * Contoh output: runChainWithDefault(null,10,[x=>x+1]) => 11.
 * Solusi detail: normalisasi input lalu jalankan chain.
 */
export function runChainWithDefault(input, defaultValue, steps) {
  const start = input ?? defaultValue;
  return runPipelineChain(start, steps);
}

/**
 * Judul: Ubah callback style ke promise untuk chaining
 * Soal Test eksplisit: callback(err,val) jadi Promise.
 * Contoh output: promisifyNodeStyle((cb)=>cb(null,1)) => Promise<1>.
 * Solusi detail: wrapper new Promise(resolve,reject).
 */
export function promisifyNodeStyle(register) {
  return new Promise((resolve, reject) => {
    register((err, value) => (err ? reject(err) : resolve(value)));
  });
}

