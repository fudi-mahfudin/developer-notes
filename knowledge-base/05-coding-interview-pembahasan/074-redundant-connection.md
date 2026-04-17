# Redundant Connection

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Union-Find (DSU), graph cycle
- **Inti masalah:** Tree adalah DAG `n` node `n-1` edge; tambah satu edge membuat **satu siklus**; cari edge **terakhir** dalam input yang bisa dihapus agar tetap tree (atau varians II — see follow-up).

---

- Soal: `findRedundantConnection(edges)` return edge length 2 (1-indexed nodes in LC… actually 1..n nodes).
- Input: undirected edges list order matters for output tie-break — **last edge forming cycle** typically answer when multiple choices.
- Constraints utama: Union-Find path compression; iterate edges order: `union(u,v)` — if already same set, that edge redundant.

## 2) Jawaban Ideal Singkat (30-60 detik)

> In redundant connection I: process edges sequentially. `find(u)!=find(v)` → `union`; else **this edge closes cycle** → candidate answer (last such due input order gives final answer). DSU `parent`, `rank`/`size` for union by rank O(α(n)) amortized.

Struktur cepat:
- Observasi inti masalah: `n` node + `n` sisi tak terarah ⇒ tepat satu siklus; memproses sisi **sesuai urutan** input: jika `find(u) === find(v)` sebelum union, sisi itu menutup siklus (pada LC I, jawaban adalah sisi yang seperti itu—biasanya sisi terakhir yang membuat siklus).
- Strategi final yang dipilih: DSU dengan **path compression** (dan union by rank bila dipakai).
- Kenapa strategi ini paling cocok: Satu lintasan edge list, O(α(n)) per operasi.
- Time complexity: O(n α(n))
- Space complexity: O(n)
- Edge case utama: beberapa sisi membentuk siklus yang sama; urutan input menentukan output soal.

## 3) Versi Ultra Singkat (10-20 detik)

> DSU: for each [u,v], if same root return edge; else union.

## 4) Pseudocode Ringkas (5-10 baris)

```text
parent = [1..n]
find(x): path compression
union(a,b): if find(a)==find(b): return false // redundant edge
else link roots; return true

for edge in edges:
  if !union(u,v): return edge
```

## 5) Implementasi Final (Inti Saja)

```js
function findRedundantConnection(edges) {
  const n = edges.length;
  const p = Array.from({ length: n + 1 }, (_, i) => i);
  const find = (x) => (p[x] === x ? x : (p[x] = find(p[x])));
  for (const [a, b] of edges) {
    const ra = find(a),
      rb = find(b);
    if (ra === rb) return [a, b];
    p[ra] = rb;
  }
}
```

## 6) Bukti Correctness (Wajib)

- First time union fails, edge creates cycle in spanning forest built so far; processing order ensures last edge in list among cycle edges for LC I property.

## 7) Dry Run Singkat

- `[[1,2],[1,3],[2,3]]` → `[2,3]`.

## 8) Red Flags (Yang Harus Dihindari)

- BFS cycle detection slower without union order guarantee.

## 9) Follow-up yang Sering Muncul

- Redundant Connection II — directed graph case with precedence rules.

## 10) Trade-off Keputusan

- DFS recursion vs DSU — DSU simpler undirected.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 8/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Study part II directed variant separately.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Union-Find
- Inti masalah (1 kalimat): Find extra undirected edge closing cycle.
- Soal: Edge pair.
- Strategi final: DSU sequential union
- Kompleksitas: nearly O(n α(n)), O(n)
- 2 edge case: triangle; last edge redundant
- 1 potensi bug: 0 vs 1-index nodes
- 1 alasan valid: First repeated connectivity edge is cycle closer
