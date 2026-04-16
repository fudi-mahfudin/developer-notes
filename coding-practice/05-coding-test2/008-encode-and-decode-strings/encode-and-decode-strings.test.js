import { describe, it, expect } from 'vitest';
import { encode, decode } from './encode-and-decode-strings.js';

describe('encode / decode', () => {
  it('round-trip contoh', () => {
    const strs = ['hello', 'world'];
    expect(decode(encode(strs))).toEqual(strs);
  });

  it('delimiter dan karakter khusus di isi', () => {
    const strs = ['we:;::', 'say', 'yes', ':#;::'];
    expect(decode(encode(strs))).toEqual(strs);
  });

  it('array kosong', () => {
    expect(decode(encode([]))).toEqual([]);
  });

  it('string kosong di list', () => {
    const strs = ['', 'a', ''];
    expect(decode(encode(strs))).toEqual(strs);
  });
});
