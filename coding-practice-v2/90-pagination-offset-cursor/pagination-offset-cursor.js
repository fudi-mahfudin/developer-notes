/**
 * Judul: Topik 90 — Pagination offset/cursor
 *
 * Soal Test eksplisit:
 * - paginateOffset: ambil page berdasarkan offset+limit.
 * - paginateCursor: ambil page setelah cursor id.
 * - encode/decodeCursor: token cursor sederhana.
 *
 * Kontrak (opsional):
 * - Data array stabil dan sudah urut sesuai key.
 *
 * Contoh output:
 * - offset 2 limit 3 dari [0..9] => [2,3,4].
 *
 * Solusi detail:
 * - Offset: slice langsung.
 * - Cursor: cari index cursor lalu ambil limit item setelahnya.
 */

/**
 * Judul: Offset pagination
 * Soal Test eksplisit: hasMore true jika masih ada data.
 * Contoh output: {items,nextOffset,hasMore}.
 * Solusi detail: start=offset, end=offset+limit.
 */
export function paginateOffset(items, offset, limit) {
  const start = Math.max(0, offset);
  const end = Math.max(start, start + limit);
  const page = items.slice(start, end);
  const nextOffset = end;
  const hasMore = nextOffset < items.length;
  return { items: page, nextOffset, hasMore };
}

/**
 * Judul: Encode cursor dari nilai key
 * Soal Test eksplisit: encode lalu decode kembali sama.
 * Contoh output: id 10 => base64 token.
 * Solusi detail: JSON.stringify lalu base64.
 */
export function encodeCursor(value) {
  return Buffer.from(JSON.stringify({ v: value }), "utf8").toString("base64");
}

/**
 * Judul: Decode cursor token
 * Soal Test eksplisit: token invalid -> null.
 * Contoh output: decodeCursor(validToken) => value.
 * Solusi detail: try/catch parse.
 */
export function decodeCursor(token) {
  try {
    const raw = Buffer.from(token, "base64").toString("utf8");
    const parsed = JSON.parse(raw);
    return parsed.v;
  } catch {
    return null;
  }
}

/**
 * Judul: Cursor pagination berdasarkan key extractor
 * Soal Test eksplisit:
 * - cursor null => ambil dari awal.
 * - cursor valid => ambil item setelah key cursor.
 * Contoh output: return {items,nextCursor,hasMore}.
 * Solusi detail:
 * - Cari index key==cursor.
 * - start = idx+1, ambil limit.
 */
export function paginateCursor(items, cursorToken, limit, keySelector = (x) => x.id) {
  const cursorValue = cursorToken ? decodeCursor(cursorToken) : null;
  let start = 0;
  if (cursorValue !== null) {
    const idx = items.findIndex((x) => keySelector(x) === cursorValue);
    start = idx === -1 ? 0 : idx + 1;
  }
  const page = items.slice(start, start + limit);
  const hasMore = start + limit < items.length;
  const nextCursor = page.length > 0 ? encodeCursor(keySelector(page[page.length - 1])) : null;
  return { items: page, nextCursor, hasMore };
}

/**
 * Judul: Utility total pages offset
 * Soal Test eksplisit: total 10 limit 3 => 4.
 * Contoh output: pembulatan ke atas.
 * Solusi detail: Math.ceil(total/limit).
 */
export function totalPages(totalCount, limit) {
  if (limit <= 0) throw new RangeError("limit must be > 0");
  return Math.ceil(totalCount / limit);
}

/**
 * Judul: Validasi parameter pagination
 * Soal Test eksplisit: limit <=0 invalid.
 * Contoh output: {ok:false,reason}.
 * Solusi detail: cek integer dan range.
 */
export function validatePaginationParams(offset, limit) {
  if (!Number.isInteger(offset) || offset < 0) return { ok: false, reason: "invalid offset" };
  if (!Number.isInteger(limit) || limit <= 0) return { ok: false, reason: "invalid limit" };
  return { ok: true, reason: null };
}

