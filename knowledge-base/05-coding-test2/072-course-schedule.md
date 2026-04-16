# Course Schedule

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Topological sort, cycle detection
- **Inti masalah:** `n` kursus labelled `0..n-1`; prerequisite pairs `[a,b]` artinya ambil `b` sebelum `a`. Apakah bisa menyelesaikan **semua** kursus? (DAG vs cycle)

---

- Soal: `canFinish(numCourses, prerequisites)` boolean.
- Input: `n`, edge list directed
- Output: `true` iff no directed cycle (topo order exists finishing all courses).

## 2) Jawaban Ideal Singkat (30-60 detik)

> **DFS state** graph: `0` unvisited, `1` in recursion stack, `2` done. Cycle jika edge ke node `1`. Atau **Kahn BFS** indegree: queue indegree 0, pop reduce neighbors; count processed `== n` success. O(V+E) time and space adjacency list.

Struktur cepat:
- Observasi inti masalah: Feasible schedule ⇔ DAG (no directed cycles).
- Strategi final yang dipilih: Topo sort via DFS colors or Kahn.
- Kenapa strategi ini paling cocok: Linear time classic graph property check.
- Time complexity: O(V + E)
- Space complexity: O(V + E)
- Edge case utama: empty prereqs; self-loop; multi dependencies.

## 3) Versi Ultra Singkat (10-20 detik)

> DFS 3-color detect back-edge; or Kahn topological order count.

## 4) Pseudocode Ringkas (5-10 baris)

```text
build adjacency list
state = array n zeros
function dfs(u):
  state[u] = 1
  for v in adj[u]:
    if state[v]==1: return false  // cycle
    if state[v]==0 and !dfs(v): return false
  state[u] = 2; return true

for each node: if state[i]==0 and !dfs(i): return false
return true
```

## 5) Implementasi Final (Inti Saja)

```js
function canFinish(n, prerequisites) {
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of prerequisites) adj[b].push(a);
  const st = new Array(n).fill(0);
  let ok = true;
  function dfs(u) {
    st[u] = 1;
    for (const v of adj[u]) {
      if (st[v] === 1) {
        ok = false;
        return;
      }
      if (st[v] === 0) dfs(v);
      if (!ok) return;
    }
    st[u] = 2;
  }
  for (let i = 0; i < n; i++) if (st[i] === 0) dfs(i);
  return ok;
}
```

*(Alternatif Kahn lebih idiomatik untuk juga mengembalikan urutan.)*

## 6) Bukti Correctness (Wajib)

- Directed cycle prevents topological ordering; DFS gray node revisitation proves cycle.

## 7) Dry Run Singkat

- `n=2`, `[[1,0]]` true; `[[1,0],[0,1]]` false.

## 8) Red Flags (Yang Harus Dihindari)

- Ignoring multi-req edges building wrong graph direction — read problem: `[a,b]` take b before a = edge b→a.

## 9) Follow-up yang Sering Muncul

- Course Schedule II — output order.

## 10) Trade-off Keputusan

- DFS vs BFS Kahn — both O(V+E).

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
- Kerapihan implementasi: 8/10
- Catatan perbaikan: Verify adjacency direction matches statement.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Topo / cycle detect
- Inti masalah (1 kalimat): Finish all courses with prereq DAG?
- Soal: Boolean.
- Strategi final: 3-color DFS or Kahn
- Kompleksitas: O(V+E), O(V+E)
- 2 edge case: no prereqs; cycle
- 1 potensi bug: reverse edge direction
- 1 alasan valid: Schedule exists iff DAG
