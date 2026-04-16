import { describe, it, expect } from 'vitest';
import { groupAnagrams } from './group-anagrams.js';

function normalize(groups) {
  return groups.map((g) => [...g].sort()).sort((a, b) => a.join().localeCompare(b.join()));
}

describe('groupAnagrams', () => {
  it('contoh klasik', () => {
    const got = groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);
    const expected = [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']];
    expect(normalize(got)).toEqual(normalize(expected));
  });

  it('satu grup', () => {
    expect(normalize(groupAnagrams(['a']))).toEqual(normalize([['a']]));
  });

  it('string kosong di input', () => {
    const got = groupAnagrams(['']);
    expect(got).toHaveLength(1);
    expect(got[0]).toEqual(['']);
  });
});
