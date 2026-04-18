/**
 * Judul: Topik 92 — Flatten nested array/object
 *
 * Soal Test eksplisit:
 * - flattenArrayDepth: flatten array hingga depth tertentu.
 * - flattenObjectDot: object nested -> dot notation.
 * - unflattenObjectDot: kebalikan flatten object.
 *
 * Kontrak (opsional):
 * - flatten object handle plain object.
 * - array di object bisa dipertahankan atau di-flatten by option.
 *
 * Contoh output:
 * - {a:{b:1}} => {"a.b":1}
 *
 * Solusi detail:
 * - DFS rekursif dengan path akumulatif.
 */

export function flattenArrayDepth(arr, depth = Infinity) {
  const out = [];
  function dfs(cur, d) {
    for (const item of cur) {
      if (Array.isArray(item) && d > 0) dfs(item, d - 1);
      else out.push(item);
    }
  }
  dfs(arr, depth);
  return out;
}

export function flattenArrayIterative(arr) {
  const out = [];
  const stack = [...arr].reverse();
  while (stack.length) {
    const x = stack.pop();
    if (Array.isArray(x)) {
      for (let i = x.length - 1; i >= 0; i--) stack.push(x[i]);
    } else {
      out.push(x);
    }
  }
  return out;
}

export function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

/**
 * Judul: Flatten object ke dot keys
 * Soal Test eksplisit: nested level > 2.
 * Kontrak (opsional): skip prototype chain.
 * Contoh output: {a:{c:{d:2}}} => {"a.c.d":2}.
 * Solusi detail: rekursi + prefix.
 */
export function flattenObjectDot(obj, prefix = "", out = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (isPlainObject(value)) flattenObjectDot(value, path, out);
    else out[path] = value;
  }
  return out;
}

/**
 * Judul: Unflatten dot object
 * Soal Test eksplisit: {"a.b":1} => {a:{b:1}}.
 * Contoh output: multi key merge.
 * Solusi detail: split '.' lalu build node.
 */
export function unflattenObjectDot(flatObj) {
  const out = {};
  for (const [path, value] of Object.entries(flatObj)) {
    const keys = path.split(".");
    let cur = out;
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i === keys.length - 1) cur[k] = value;
      else {
        if (!isPlainObject(cur[k])) cur[k] = {};
        cur = cur[k];
      }
    }
  }
  return out;
}

/**
 * Judul: Flatten object termasuk array index
 * Soal Test eksplisit: {a:[10,{b:20}]} => {"a.0":10,"a.1.b":20}
 * Kontrak (opsional): index array dipakai sebagai path segment.
 * Contoh output: nested array-object campuran.
 * Solusi detail: DFS branch array/object.
 */
export function flattenObjectWithArray(obj, prefix = "", out = {}) {
  if (Array.isArray(obj)) {
    obj.forEach((value, i) => {
      const path = prefix ? `${prefix}.${i}` : String(i);
      if (isPlainObject(value) || Array.isArray(value)) flattenObjectWithArray(value, path, out);
      else out[path] = value;
    });
    return out;
  }
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (isPlainObject(value) || Array.isArray(value)) flattenObjectWithArray(value, path, out);
    else out[path] = value;
  }
  return out;
}

/**
 * Judul: joinPath helper
 * Soal Test eksplisit: joinPath("a","b") => "a.b"
 * Contoh output: joinPath("","a") => "a"
 * Solusi detail: guard prefix kosong.
 */
export function joinPath(prefix, segment) {
  return prefix ? `${prefix}.${segment}` : segment;
}

/**
 * Judul: getByDotPath helper
 * Soal Test eksplisit: getByDotPath({a:{b:1}},"a.b") => 1
 * Contoh output: path hilang => undefined.
 * Solusi detail: split lalu reduce berjalan.
 */
export function getByDotPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

