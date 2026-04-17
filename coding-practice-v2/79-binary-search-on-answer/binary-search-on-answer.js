/**
 * Judul: Topik 79 — Binary Search on Answer (minimize / maximize)
 *
 * Soal Test eksplisit:
 * - minimumCapacityForShipping: cari kapasitas minimum agar paket selesai <= D hari.
 * - maximumMinimumDistance: taruh k titik agar jarak minimum antar titik semaksimal mungkin.
 * - lowerBoundAnswer / upperBoundAnswer: utility predicate monotonic.
 *
 * Kontrak (opsional):
 * - Predicate harus monotonic (false..false..true atau true..true..false).
 *
 * Contoh output:
 * - weights [1,2,3,1,1], days 4 => capacity 3.
 *
 * Solusi detail:
 * - Definisikan ruang jawaban [lo, hi], bukan index data.
 * - Uji feasibility(answer) dan sempitkan range dengan binary search.
 *
 * @see knowledge-base/05-coding-interview-v2/79-binary-search-on-answer.md
 * Menjalankan tes: `pnpm test -- coding-practice-v2/79-binary-search-on-answer/binary-search-on-answer.test.js`
 */

/**
 * Judul: Cari jawaban minimum yang memenuhi predicate (first true)
 * Soal Test eksplisit: lowerBoundAnswer pada rentang bilangan bulat.
 * Contoh output: lo=1, hi=10, pred(x>=7) => 7.
 * Solusi detail: binary search first true.
 */
export function lowerBoundAnswer(lo, hi, predicate) {
  let l = lo;
  let r = hi;
  while (l < r) {
    const mid = l + ((r - l) >> 1);
    if (predicate(mid)) r = mid;
    else l = mid + 1;
  }
  return l;
}

/**
 * Judul: Cari jawaban maksimum yang memenuhi predicate (last true)
 * Soal Test eksplisit: upperBoundAnswer.
 * Contoh output: lo=1, hi=10, pred(x<=7) => 7.
 * Solusi detail: bias midpoint ke kanan.
 */
export function upperBoundAnswer(lo, hi, predicate) {
  let l = lo;
  let r = hi;
  while (l < r) {
    const mid = l + ((r - l + 1) >> 1);
    if (predicate(mid)) l = mid;
    else r = mid - 1;
  }
  return l;
}

/**
 * Judul: Hitung hari yang dibutuhkan untuk kapasitas tertentu
 * Soal Test eksplisit: helper shipping.
 * Contoh output: weights [3,2,2,4,1,4], cap=6 => 3 hari.
 * Solusi detail: greedy isi hari hingga overflow.
 */
export function shippingDaysNeeded(weights, cap) {
  let days = 1;
  let sum = 0;
  for (const w of weights) {
    if (w > cap) return Infinity;
    if (sum + w <= cap) sum += w;
    else {
      days += 1;
      sum = w;
    }
  }
  return days;
}

/**
 * Judul: Capacity minimum agar selesai dalam `days`
 * Soal Test eksplisit: varian LeetCode 1011.
 * Contoh output: [1,2,3,1,1], 4 => 3.
 * Solusi detail:
 * - lo = max(weights), hi = sum(weights).
 * - feasibility(cap): shippingDaysNeeded(weights, cap) <= days.
 */
export function minimumCapacityForShipping(weights, days) {
  const lo = Math.max(...weights);
  const hi = weights.reduce((a, b) => a + b, 0);
  return lowerBoundAnswer(lo, hi, (cap) => shippingDaysNeeded(weights, cap) <= days);
}

/**
 * Judul: Feasible penempatan dengan jarak minimum `dist`
 * Soal Test eksplisit: helper aggressive cows.
 * Contoh output: positions [1,2,4,8,9], k=3, dist=3 => true.
 * Solusi detail: greedy pilih posisi paling kiri lalu lanjut.
 */
export function canPlaceWithDistance(positions, k, dist) {
  let placed = 1;
  let last = positions[0];
  for (let i = 1; i < positions.length; i++) {
    if (positions[i] - last >= dist) {
      placed += 1;
      last = positions[i];
      if (placed >= k) return true;
    }
  }
  return placed >= k;
}

/**
 * Judul: Maksimalkan jarak minimum antar titik terpilih
 * Soal Test eksplisit: positions sorted/unsorted.
 * Contoh output: [1,2,4,8,9], k=3 => 3.
 * Solusi detail:
 * - Sort posisi.
 * - Search last true untuk dist.
 */
export function maximumMinimumDistance(rawPositions, k) {
  const positions = [...rawPositions].sort((a, b) => a - b);
  const lo = 0;
  const hi = positions[positions.length - 1] - positions[0];
  return upperBoundAnswer(lo, hi, (dist) => canPlaceWithDistance(positions, k, dist));
}

/**
 * Judul: Template generic minimize answer
 * Soal Test eksplisit: bisa dipakai soal minimize threshold.
 * Contoh output: cocok dengan lowerBoundAnswer.
 * Solusi detail: wrapper untuk readability interview.
 */
export function minimizeAnswer(lo, hi, feasible) {
  return lowerBoundAnswer(lo, hi, feasible);
}

