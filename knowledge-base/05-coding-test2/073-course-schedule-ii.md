# Course Schedule II

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Topological sort
- **Inti masalah:** Sama seperti Course Schedule I tetapi output **urutan** kursus yang valid jika ada; jika tidak ada (`cycle`) return `[]`.

---

- Soal: `findOrder(numCourses, prerequisites)` return `number[]` length `n` or empty.
- Constraints utama: O(V+E); Kahn queue atau DFS post-order stack reverse.

## 2) Jawaban Ideal Singkat (30-60 detik)

> **Kahn**: hitung `indegree`, queue nodes 0 indegree, pop append answer, reduce neighbor indegree; if `result.length < n` cycle. **DFS**: detect cycle with colors; `postorder` stack pop reverse — atau simpan order saat `state=2`. Return order jika processed `n` nodes.

Struktur cepat:
- Observasi inti masalah: Valid ordering = topological ordering of DAG.
- Strategi final yang dipilih: Kahn BFS order friendly, or DFS stack.
- Kenapa strategi ini paling cocok: Produces explicit sequence.
- Time complexity: O(V + E)
- Space complexity: O(V + E)
- Edge case utama: unique order not guaranteed — any valid accepted.

## 3) Versi Ultra Singkat (10-20 detik)

> Kahn BFS indegree; collect pops; if count < n impossible.

## 4) Pseudocode Ringkas (5-10 baris)

```text
build graph, indegree array
q = all with indegree 0
ans = []
while q:
  u = pop q; ans.append(u)
  for v in adj[u]:
    indegree[v]--
    if indegree[v]==0: push v
if len(ans) < n: return [] else return ans
```

## 5) Implementasi Final (Inti Saja)

```js
function findOrder(n, prerequisites) {
  const adj = Array.from({ length: n }, () => []);
  const ind = new Array(n).fill(0);
  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    ind[a]++;
  }
  const q = [];
  for (let i = 0; i < n; i++) if (ind[i] === 0) q.push(i);
  const ans = [];
  while (q.length) {
    const u = q.shift();
    ans.push(u);
    for (const v of adj[u]) if (--ind[v] === 0) q.push(v);
  }
  return ans.length === n ? ans : [];
}
```

## 6) Bukti Correctness (Wajib)

- Kahn algorithm lists vertices in order respecting edges; if stuck before n, graph has cycle.

## 7) Dry Run Singkat

- `n=4`, `[[1,0],[2,0],[3,1],[3,2]]` one valid topo order.

## 8) Red Flags (Yang Harus Dihindari)

- Outputting DFS finish order without reversing incorrectly — track carefully.

## 9) Follow-up yang Sering Muncul

- Alien dictionary — topo on characters.

## 10) Trade-off Keputusan

- Queue BFS Kahn vs DFS order — Kahn gives order directly.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 9/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: Same direction note as Course Schedule I.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Topological sort
- Inti masalah (1 kalimat): Output any valid course order.
- Soal: Array or [].
- Strategi final: Kahn BFS
- Kompleksitas: O(V+E), O(V+E)
- 2 edge case: impossible cycle; linear chain
- 1 potensi bug: len(ans) check off
- 1 alasan valid: Kahn completes iff DAG
