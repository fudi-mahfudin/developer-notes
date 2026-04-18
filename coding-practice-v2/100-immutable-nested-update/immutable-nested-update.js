/**
 * Judul: Topik 100 — Immutability-friendly nested update
 *
 * Soal Test eksplisit:
 * - setIn: update path nested tanpa mutasi asal.
 * - updateIn: apply updater function pada path.
 * - removeIn: hapus key nested secara immutable.
 *
 * Kontrak (opsional):
 * - Path berupa array string/number.
 *
 * Contoh output:
 * - setIn({a:{b:1}},['a','b'],2) => {a:{b:2}}.
 *
 * Solusi detail:
 * - Clone shallow di setiap level path.
 * - Build tree baru dari bawah ke atas.
 */

export function cloneContainer(value) {
  if (Array.isArray(value)) return [...value];
  if (value && typeof value === "object") return { ...value };
  return {};
}

/**
 * Judul: setIn immutable
 * Soal Test eksplisit: path belum ada tetap terbentuk.
 * Contoh output: setIn({},['a','b'],1)=>{a:{b:1}}.
 * Solusi detail: rekursif clone level.
 */
export function setIn(obj, path, value) {
  if (path.length === 0) return value;
  const [head, ...tail] = path;
  const base = obj ?? (typeof head === "number" ? [] : {});
  const out = cloneContainer(base);
  out[head] = setIn(base[head], tail, value);
  return out;
}

/**
 * Judul: getIn helper
 * Soal Test eksplisit: path tidak ada => defaultValue.
 * Contoh output: getIn({a:1},['b'],0)=>0.
 * Solusi detail: reduce aman nullish.
 */
export function getIn(obj, path, defaultValue = undefined) {
  let cur = obj;
  for (const key of path) {
    if (cur == null) return defaultValue;
    cur = cur[key];
  }
  return cur === undefined ? defaultValue : cur;
}

/**
 * Judul: updateIn immutable
 * Soal Test eksplisit: update nilai existing.
 * Contoh output: updateIn({n:1},['n'],x=>x+1)=>{n:2}.
 * Solusi detail: getIn lalu setIn dengan hasil updater.
 */
export function updateIn(obj, path, updater, defaultValue = undefined) {
  const prev = getIn(obj, path, defaultValue);
  const next = updater(prev);
  return setIn(obj, path, next);
}

/**
 * Judul: removeIn immutable
 * Soal Test eksplisit: remove key nested object/array index.
 * Contoh output: removeIn({a:{b:1}},['a','b'])=>{a:{}}.
 * Solusi detail: clone parent lalu delete/splice.
 */
export function removeIn(obj, path) {
  if (path.length === 0) return obj;
  const [head, ...tail] = path;
  const base = obj ?? {};
  const out = cloneContainer(base);
  if (tail.length === 0) {
    if (Array.isArray(out)) out.splice(Number(head), 1);
    else delete out[head];
    return out;
  }
  out[head] = removeIn(base[head], tail);
  return out;
}

/**
 * Judul: mergeIn immutable (deep merge di titik path)
 * Soal Test eksplisit: merge object pada path target.
 * Contoh output: mergeIn(state,['cfg'],{x:1}).
 * Solusi detail: get current, shallow merge object, set back.
 */
export function mergeIn(obj, path, patch) {
  const current = getIn(obj, path, {});
  const merged = { ...current, ...patch };
  return setIn(obj, path, merged);
}

/**
 * Judul: applyManyUpdates helper
 * Soal Test eksplisit: daftar operasi set/update.
 * Contoh output: result final setelah semua op.
 * Solusi detail: reduce operations.
 */
export function applyManyUpdates(obj, operations) {
  let acc = obj;
  for (const op of operations) {
    if (op.type === "set") acc = setIn(acc, op.path, op.value);
    else if (op.type === "update") acc = updateIn(acc, op.path, op.updater, op.defaultValue);
    else if (op.type === "remove") acc = removeIn(acc, op.path);
  }
  return acc;
}

