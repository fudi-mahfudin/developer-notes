/**
 * Judul: Topik 80 — Meeting rooms / schedule conflicts
 *
 * Soal Test eksplisit:
 * - canAttendAllMeetings: cek apakah interval saling bentrok.
 * - minMeetingRooms: jumlah room minimum untuk semua interval.
 * - mergeBusyIntervals: gabungkan slot bentrok jadi rentang padat.
 *
 * Kontrak (opsional):
 * - Interval format [start, end), start <= end.
 *
 * Contoh output:
 * - [[0,30],[5,10],[15,20]] => minMeetingRooms 2.
 *
 * Solusi detail:
 * - Sort interval berdasarkan waktu mulai.
 * - Konflik jika next.start < current.end.
 * - Room minimum via two pointers start/end.
 */

/**
 * Judul: Salin dan sort interval berdasarkan start lalu end
 * Soal Test eksplisit: input acak jadi terurut.
 * Contoh output: [[5,10],[0,1]] => [[0,1],[5,10]].
 * Solusi detail: clone + sort numerik.
 */
export function sortIntervals(intervals) {
  return [...intervals].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

/**
 * Judul: Cek semua meeting bisa dihadiri 1 orang
 * Soal Test eksplisit: overlap -> false.
 * Contoh output: [[0,5],[5,9]] => true.
 * Solusi detail: setelah sort, cek start_i < end_prev.
 */
export function canAttendAllMeetings(intervals) {
  const arr = sortIntervals(intervals);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][0] < arr[i - 1][1]) return false;
  }
  return true;
}

/**
 * Judul: Hitung room minimum
 * Soal Test eksplisit: kasus klasik.
 * Contoh output: [[0,30],[5,10],[15,20]] => 2.
 * Solusi detail:
 * - Pisah start[] dan end[] lalu sort.
 * - Jika start < end paling kecil, butuh room baru.
 */
export function minMeetingRooms(intervals) {
  if (intervals.length === 0) return 0;
  const starts = intervals.map((x) => x[0]).sort((a, b) => a - b);
  const ends = intervals.map((x) => x[1]).sort((a, b) => a - b);
  let s = 0;
  let e = 0;
  let used = 0;
  let best = 0;
  while (s < starts.length) {
    if (starts[s] < ends[e]) {
      used += 1;
      if (used > best) best = used;
      s += 1;
    } else {
      used -= 1;
      e += 1;
    }
  }
  return best;
}

/**
 * Judul: Gabungkan interval bentrok/menempel
 * Soal Test eksplisit: [[1,3],[2,4],[6,7]] => [[1,4],[6,7]]
 * Contoh output: interval saling sambung jadi satu.
 * Solusi detail: standard merge intervals.
 */
export function mergeBusyIntervals(intervals) {
  if (intervals.length === 0) return [];
  const arr = sortIntervals(intervals);
  /** @type {number[][]} */
  const out = [arr[0].slice()];
  for (let i = 1; i < arr.length; i++) {
    const last = out[out.length - 1];
    const cur = arr[i];
    if (cur[0] <= last[1]) last[1] = Math.max(last[1], cur[1]);
    else out.push(cur.slice());
  }
  return out;
}

/**
 * Judul: Cari slot kosong di antara busy intervals
 * Soal Test eksplisit: free windows.
 * Kontrak (opsional): dayStart <= dayEnd.
 * Contoh output: busy [[1,3],[5,6]], day [0,7] => [[0,1],[3,5],[6,7]]
 * Solusi detail: merge dulu lalu ambil gap.
 */
export function freeSlots(intervals, dayStart, dayEnd) {
  const merged = mergeBusyIntervals(intervals);
  /** @type {number[][]} */
  const out = [];
  let cur = dayStart;
  for (const [s, e] of merged) {
    if (s > cur) out.push([cur, s]);
    cur = Math.max(cur, e);
  }
  if (cur < dayEnd) out.push([cur, dayEnd]);
  return out;
}

/**
 * Judul: Validasi interval basic
 * Soal Test eksplisit: start > end invalid.
 * Contoh output: [[3,1]] => false.
 * Solusi detail: loop semua interval.
 */
export function isValidIntervals(intervals) {
  return intervals.every((x) => x[0] <= x[1]);
}

