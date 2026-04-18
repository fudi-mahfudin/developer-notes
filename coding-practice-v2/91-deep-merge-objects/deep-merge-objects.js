/**
 * Judul: Topik 91 — Deep merge objects (limited)
 *
 * Soal Test eksplisit:
 * - deepMerge: gabung nested object tanpa mutasi input.
 * - mergeMany: gabungkan banyak source secara berurutan.
 * - deepMergeWithResolver: custom konflik per key.
 *
 * Kontrak (opsional):
 * - Hanya plain object/array/primitive.
 * - Function, Date, Map dianggap value biasa (overwrite).
 *
 * Contoh output:
 * - {a:{b:1}} + {a:{c:2}} => {a:{b:1,c:2}}.
 *
 * Solusi detail:
 * - Rekursif untuk object-object.
 * - Array default replace, mode concat opsional.
 */

export function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

export function cloneValue(value) {
  if (Array.isArray(value)) return value.map((v) => cloneValue(v));
  if (isPlainObject(value)) {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = cloneValue(v);
    return out;
  }
  return value;
}

/**
 * Judul: Merge dua value
 * Soal Test eksplisit: object recursive; array replace/concat.
 * Kontrak (opsional): modeArray = replace|concat.
 * Contoh output: [1] + [2] concat => [1,2].
 * Solusi detail: type dispatch.
 */
export function mergeValue(left, right, modeArray = "replace") {
  if (Array.isArray(left) && Array.isArray(right)) {
    if (modeArray === "concat") return [...cloneValue(left), ...cloneValue(right)];
    return cloneValue(right);
  }
  if (isPlainObject(left) && isPlainObject(right)) {
    return deepMerge(left, right, { modeArray });
  }
  return cloneValue(right);
}

/**
 * Judul: Deep merge dua object
 * Soal Test eksplisit: tidak mutasi left/right.
 * Kontrak (opsional): source override target.
 * Contoh output: {x:1}+{x:2} => {x:2}.
 * Solusi detail: clone target lalu iterasi source.
 */
export function deepMerge(target, source, options = {}) {
  const modeArray = options.modeArray ?? "replace";
  const out = cloneValue(target);
  for (const [key, sourceValue] of Object.entries(source)) {
    if (!(key in out)) {
      out[key] = cloneValue(sourceValue);
      continue;
    }
    out[key] = mergeValue(out[key], sourceValue, modeArray);
  }
  return out;
}

/**
 * Judul: Merge banyak source
 * Soal Test eksplisit: mergeMany({}, a,b,c).
 * Contoh output: hasil setara reduce deepMerge.
 * Solusi detail: loop reduce manual.
 */
export function mergeMany(target, ...sources) {
  let acc = cloneValue(target);
  for (const s of sources) acc = deepMerge(acc, s);
  return acc;
}

/**
 * Judul: Deep merge dengan resolver custom
 * Soal Test eksplisit: number conflict bisa dijumlahkan.
 * Kontrak (opsional): resolver(key,left,right) => value.
 * Contoh output: {n:1}+{n:2} resolver plus => {n:3}.
 * Solusi detail: resolver dipakai saat bukan object-object.
 */
export function deepMergeWithResolver(target, source, resolver) {
  const out = cloneValue(target);
  for (const [key, right] of Object.entries(source)) {
    if (!(key in out)) {
      out[key] = cloneValue(right);
      continue;
    }
    const left = out[key];
    if (isPlainObject(left) && isPlainObject(right)) {
      out[key] = deepMergeWithResolver(left, right, resolver);
    } else {
      out[key] = resolver(key, left, right);
    }
  }
  return out;
}

/**
 * Judul: Same JSON helper (terbatas)
 * Soal Test eksplisit: snapshot compare object sederhana.
 * Contoh output: true untuk struktur sama.
 * Solusi detail: JSON.stringify compare.
 */
export function sameJson(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Judul: Pick merge mode by env string
 * Soal Test eksplisit: "concat" -> concat, lainnya replace.
 * Contoh output: pickMergeMode("x") => replace.
 * Solusi detail: utility kecil untuk variasi soal.
 */
export function pickMergeMode(input) {
  return input === "concat" ? "concat" : "replace";
}

