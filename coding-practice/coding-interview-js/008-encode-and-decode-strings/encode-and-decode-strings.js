/**
 * Encode and Decode Strings
 * @see knowledge-base/05-coding-interview-pembahasan/008-encode-and-decode-strings.md
 *
 * Ringkasan: serialisasi string[] <-> string lossless (length prefix + #).
 *
 * @param {string[]} strs
 * @returns {string}
 */
export function encode(strs) {
  return strs.map((w) => `${w.length}#${w}`).join('');
}

/**
 * @param {string} s
 * @returns {string[]}
 */
export function decode(s) {
  const out = [];
  let i = 0;
  while (i < s.length) {
    let j = i;
    while (s[j] !== '#') j++;
    const len = Number(s.slice(i, j));
    const start = j + 1;
    out.push(s.slice(start, start + len));
    i = start + len;
  }
  return out;
}
