import { describe, it, expect } from 'vitest';
import { restoreIpAddresses } from './restore-ip-addresses.js';

describe('restoreIpAddresses', () => {
  it('contoh', () => {
    expect(restoreIpAddresses('25525511135').sort()).toEqual(['255.255.11.135', '255.255.111.35'].sort());
  });
});
