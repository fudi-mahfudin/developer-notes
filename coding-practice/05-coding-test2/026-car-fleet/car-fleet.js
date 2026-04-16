/**
 * Car Fleet
 * @see knowledge-base/05-coding-test2/026-car-fleet.md
 *
 * Pasangan (pos, waktu ke finish) diurutkan dari depan; fleet baru jika waktu > fleet sebelumnya.
 * Time: O(n log n), Space: O(n)
 *
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @returns {number}
 */
export function carFleet(target, position, speed) {
  const n = position.length;
  const order = [...Array(n).keys()].sort((a, b) => position[b] - position[a]);
  let fleets = 0;
  let maxT = -Infinity;
  for (const i of order) {
    const t = (target - position[i]) / speed[i];
    if (t > maxT) {
      fleets++;
      maxT = t;
    }
  }
  return fleets;
}
