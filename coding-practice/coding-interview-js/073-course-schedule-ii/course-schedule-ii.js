/**
 * Course Schedule II
 * @see knowledge-base/05-coding-interview-pembahasan/073-course-schedule-ii.md
 *
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @returns {number[]}
 */
export function findOrder(numCourses, prerequisites) {
  const g = Array.from({ length: numCourses }, () => []);
  const indeg = Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    g[b].push(a);
    indeg[a]++;
  }
  const q = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);
  const order = [];
  let qi = 0;
  while (qi < q.length) {
    const u = q[qi++];
    order.push(u);
    for (const v of g[u]) {
      indeg[v]--;
      if (indeg[v] === 0) q.push(v);
    }
  }
  return order.length === numCourses ? order : [];
}
