/**
 * Restore IP Addresses
 * @see knowledge-base/05-coding-interview-pembahasan/085-restore-ip-addresses.md
 *
 * @param {string} s
 * @returns {string[]}
 */
export function restoreIpAddresses(s) {
  const res = [];

  function dfs(start, parts, path) {
    if (parts === 4) {
      if (start === s.length) res.push(path.join('.'));
      return;
    }
    if (start >= s.length) return;
    if (s[start] === '0') {
      path.push('0');
      dfs(start + 1, parts + 1, path);
      path.pop();
      return;
    }
    for (let end = start; end < Math.min(start + 3, s.length); end++) {
      const seg = s.slice(start, end + 1);
      const num = Number(seg);
      if (num > 255) break;
      path.push(seg);
      dfs(end + 1, parts + 1, path);
      path.pop();
    }
  }
  dfs(0, 0, []);
  return res;
}
