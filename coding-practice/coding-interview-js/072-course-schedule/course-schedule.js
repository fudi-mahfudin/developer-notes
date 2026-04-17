/**
 * Course Schedule
 * @see knowledge-base/05-coding-interview-pembahasan/072-course-schedule.md
 *
 * @param {number} numCourses
 * @param {number[][]} prerequisites pair [a,b] artinya b -> a
 * @returns {boolean}
 */
export function canFinish(numCourses, prerequisites) {
  const g = Array.from({ length: numCourses }, () => []);
  const indeg = Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    g[b].push(a);
    indeg[a]++;
  }
  const q = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);
  let done = 0;
  let qi = 0;
  while (qi < q.length) {
    const u = q[qi++];
    done++;
    for (const v of g[u]) {
      indeg[v]--;
      if (indeg[v] === 0) q.push(v);
    }
  }
  return done === numCourses;
}
