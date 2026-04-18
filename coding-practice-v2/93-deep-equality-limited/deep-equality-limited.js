/**
 * Judul: Topik 93 — Deep equality comparison (limited)
 *
 * Soal Test eksplisit:
 * - deepEqualLimited: bandingkan primitive, array, plain object.
 * - strictNumberEqual: NaN dianggap sama dengan NaN.
 * - compareArraysStrictOrder: urutan elemen harus sama.
 *
 * Kontrak (opsional):
 * - Tidak mendukung cycle reference.
 * - Tidak membandingkan Map/Set/Date secara spesifik.
 *
 * Contoh output:
 * - {a:[1,2]} vs {a:[1,2]} => true.
 *
 * Solusi detail:
 * - Rekursif berdasarkan tipe.
 * - Bandingkan key count + tiap value.
 */

export function strictNumberEqual(a, b) {
  return Object.is(a, b);
}

export function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

/**
 * Judul: Deep equal terbatas
 * Soal Test eksplisit: nested object + array.
 * Kontrak (opsional): only JSON-like values.
 * Contoh output: deepEqualLimited(1,1) => true.
 * Solusi detail: branch primitive/array/object.
 */
export function deepEqualLimited(a, b) {
  if (strictNumberEqual(a, b)) return true;
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) return compareArraysStrictOrder(a, b);

  if (isPlainObject(a) && isPlainObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const k of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
      if (!deepEqualLimited(a[k], b[k])) return false;
    }
    return true;
  }

  return false;
}

/**
 * Judul: Bandingkan array urutan ketat
 * Soal Test eksplisit: [1,2] != [2,1].
 * Contoh output: [] == [].
 * Solusi detail: same length lalu compare item.
 */
export function compareArraysStrictOrder(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!deepEqualLimited(a[i], b[i])) return false;
  }
  return true;
}

/**
 * Judul: Compare object hanya key tertentu
 * Soal Test eksplisit: subset key compare.
 * Kontrak (opsional): keys adalah array string.
 * Contoh output: equalByKeys({a:1,b:2},{a:1,b:3},['a']) => true.
 * Solusi detail: loop keys target.
 */
export function equalByKeys(a, b, keys) {
  for (const k of keys) {
    if (!deepEqualLimited(a[k], b[k])) return false;
  }
  return true;
}

/**
 * Judul: Shallow equal helper
 * Soal Test eksplisit: hanya level 1.
 * Contoh output: nested object reference berbeda => false.
 * Solusi detail: key-length + Object.is value.
 */
export function shallowEqual(a, b) {
  if (a === b) return true;
  if (!isPlainObject(a) || !isPlainObject(b)) return false;
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  for (const k of ka) {
    if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
    if (!Object.is(a[k], b[k])) return false;
  }
  return true;
}

/**
 * Judul: Normalize object keys order (untuk debug)
 * Soal Test eksplisit: output string stabil.
 * Contoh output: {b:1,a:2} => {"a":2,"b":1}
 * Solusi detail: sort keys recursively.
 */
export function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map((x) => stableStringify(x)).join(",")}]`;
  if (isPlainObject(value)) {
    const keys = Object.keys(value).sort();
    const body = keys.map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`).join(",");
    return `{${body}}`;
  }
  return JSON.stringify(value);
}

