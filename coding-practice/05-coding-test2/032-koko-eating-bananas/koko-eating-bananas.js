/**
 * Koko Eating Bananas
 * @see knowledge-base/05-coding-test2/032-koko-eating-bananas.md
 *
 * Binary search pada kecepatan makan k.
 *
 * @param {number[]} piles
 * @param {number} h
 * @returns {number}
 */
export function minEatingSpeed(piles, h) {
  let lo = 1;
  let hi = Math.max(...piles);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    let need = 0;
    for (const p of piles) {
      need += Math.ceil(p / mid);
      if (need > h) break;
    }
    if (need <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
