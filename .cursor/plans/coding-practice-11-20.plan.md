---
name: Coding practice 11-20
overview: Menambahkan 10 modul solusi enterprise + file tes Vitest di coding-practice-v2 untuk topik 11–20; setiap file solusi utama minimal 100 baris (kode bermakna + JSDoc). Komentar Judul / Ringkasan Soal / Kontrak (opsional) / Solusi. Verifikasi dengan vitest per file lalu pnpm test.
todos:
  - id: topic-11
    content: "Topik 11: iterables-iterators-for-of — solusi ≥100 baris + *.test.js"
    status: pending
  - id: topic-12
    content: "Topik 12: generators-function-star — solusi ≥100 baris + *.test.js"
    status: pending
  - id: topic-13
    content: "Topik 13: modules-esm-commonjs — solusi ≥100 baris + cjs helper + *.test.js"
    status: pending
  - id: topic-14
    content: "Topik 14: error-handling-try-catch-custom — solusi ≥100 baris + *.test.js"
    status: pending
  - id: topic-15
    content: "Topik 15: strict-mode-gotchas — solusi ≥100 baris + *.test.js"
    status: pending
  - id: topic-16
    content: "Topik 16: two-pointers — solusi ≥100 baris + *.test.js"
    status: pending
  - id: topic-17
    content: "Topik 17: sliding-window — solusi ≥100 baris + *.test.js"
    status: pending
  - id: topic-18
    content: "Topik 18: prefix-sum — solusi ≥100 baris + *.test.js"
    status: pending
  - id: topic-19
    content: "Topik 19: sorting-comparator-stability — solusi ≥100 baris + *.test.js"
    status: pending
  - id: topic-20
    content: "Topik 20: binary-search-sorted-array — solusi ≥100 baris + *.test.js"
    status: pending
  - id: verify-tests
    content: "Jalankan vitest per topik 11–20 (satu per satu), lalu pnpm test di root Career"
    status: pending
isProject: false
---

# Rencana: solusi + tes topik 11–20 (`coding-practice-v2`) — revisi

## Ruang lingkup

Sumber indeks: [knowledge-base/05-coding-interview-v2/README.md](knowledge-base/05-coding-interview-v2/README.md) (baris 36–50 untuk 11–15, 46–50 untuk 16–20).


| # | Topik | Folder / file solusi utama |
|---|--------|----------------------------|
| 11 | Iterables, iterators, `for...of` | [coding-practice-v2/11-iterables-iterators-for-of/iterables-iterators-for-of.js](coding-practice-v2/11-iterables-iterators-for-of/iterables-iterators-for-of.js) |
| 12 | Generators `function*` | [coding-practice-v2/12-generators-function-star/generators-function-star.js](coding-practice-v2/12-generators-function-star/generators-function-star.js) |
| 13 | Modules ESM vs CommonJS | [coding-practice-v2/13-modules-esm-commonjs/modules-esm-commonjs.js](coding-practice-v2/13-modules-esm-commonjs/modules-esm-commonjs.js) + file `.cjs` bantu |
| 14 | Error handling, custom errors | [coding-practice-v2/14-error-handling-try-catch-custom/error-handling-try-catch-custom.js](coding-practice-v2/14-error-handling-try-catch-custom/error-handling-try-catch-custom.js) |
| 15 | Strict mode, gotchas | [coding-practice-v2/15-strict-mode-gotchas/strict-mode-gotchas.js](coding-practice-v2/15-strict-mode-gotchas/strict-mode-gotchas.js) |
| 16 | Two pointers | [coding-practice-v2/16-two-pointers/two-pointers.js](coding-practice-v2/16-two-pointers/two-pointers.js) |
| 17 | Sliding window | [coding-practice-v2/17-sliding-window/sliding-window.js](coding-practice-v2/17-sliding-window/sliding-window.js) |
| 18 | Prefix sum | [coding-practice-v2/18-prefix-sum/prefix-sum.js](coding-practice-v2/18-prefix-sum/prefix-sum.js) |
| 19 | Sorting, comparator, stability | [coding-practice-v2/19-sorting-comparator-stability/sorting-comparator-stability.js](coding-practice-v2/19-sorting-comparator-stability/sorting-comparator-stability.js) |
| 20 | Binary search (array terurut) | [coding-practice-v2/20-binary-search-sorted-array/binary-search-sorted-array.js](coding-practice-v2/20-binary-search-sorted-array/binary-search-sorted-array.js) |

Setiap topik: **satu** file solusi utama (lihat batas baris di bawah) + **satu** `*.test.js` dengan nama mirror. Impor relatif seperti [coding-practice-v2/02-closure-lexical-scope/closure-lexical-scope.test.js](coding-practice-v2/02-closure-lexical-scope/closure-lexical-scope.test.js).

## Persyaratan ukuran: file solusi ≥ 100 baris

- Untuk **setiap** topik 11–20, file JavaScript solusi utama (bukan file tes, bukan `.cjs` kecuali dihitung eksplisit di bawah) harus **minimal 100 baris**.
- Isi harus **bermakna**: beberapa ekspor (fungsi/kelas/helper), blok JSDoc per bagian (`Judul`, `Ringkasan soal` berpoin, `Kontrak` bila perlu, `Solusi`), validasi enterprise, dan bila perlu fungsi bantu privat (`function assert…`, `function clamp…`) — **bukan** penggenapan kosong atau komentar sampah.
- Topik **13**: minimal 100 baris pada file ESM utama; file `*.cjs` tambahan tidak menggantikan persyaratan ini (tetap wajib utamanya ≥ 100 baris).

## Konvensi komentar (selaras topik 1–10)

- **Header modul**: `Judul`, `Ringkasan soal` (poin-poin), `Solusi` singkat, `@see` ke `knowledge-base/05-coding-interview-v2/NN-….md`, baris **Menjalankan tes: dari root repo Career, jalankan `pnpm test`.**
- **Per fungsi/kelas**: `Judul`, `Ringkasan soal` (poin-poin), `Kontrak` (opsional), `Solusi`.
- **Tingkat enterprise**: validasi input (`TypeError` / `RangeError`), tes edge case; tanpa skrip otomasi Python/bash.

## Isi fungsional per topik (cukup untuk modul panjang)

Rencana ini **mengarahkan** beberapa sub-soal per topik agar file solusi mencapai ≥100 baris secara alami:

- **11**: beberapa iterable/kelas (`Range`, `Take`, `Zip` ringkas), helper `sumIterable`, `iteratorToArray`, plus assert.
- **12**: beberapa generator (`range`, `fibonacci`, `flattenDeep` dengan `yield*`), dokumentasi alur yield.
- **13**: re-export / barrel pattern, factory `createConfig`, perbandingan kontrak ESM vs `createRequire(…)(./cjs-exports.cjs)`.
- **14**: hierarki error (`AppError`, `ValidationError`), `parseJsonSafe`, `wrapAsync` pola try/catch.
- **15**: kumpulan fungsi demonstrasi strict vs sloppy (`Function` builder), `delete` non-konfigurabel, dll. (tanpa mengubah global proses).
- **16**: minimal tiga soal dua pointer (mis. two-sum terurut, palindrome, max area / terkait) dengan helper assert array terurut.
- **17**: minimal dua variasi sliding window (fixed `k`, variable distinct / max sum) + validasi.
- **18**: `buildPrefixSum`, `rangeSum`, mungkin `build2D` ringkas atau tes indeks — tetap satu file utama.
- **19**: sort dengan komparator, contoh stabilitas (pasangan nilai + indeks asli), dokumentasi perilaku V8.
- **20**: `lowerBound`, `upperBound`, `searchInsert`, semua berbagi helper `assertSorted`.

## Verifikasi (manual)

Untuk **setiap** topik 11–20, jalankan satu per satu dari root repo Career:

`pnpm exec vitest run coding-practice-v2/<folder>/<nama>.test.js`

Tanpa skrip loop. Setelah 10 file hijau, jalankan **`pnpm test`** untuk seluruh suite.

## Catatan integrasi

- [package.json](package.json): `"type": "module"` — `.cjs` untuk topik 13.
- [vitest.config.ts](vitest.config.ts): hanya mengabaikan `coding-practice/**`; `coding-practice-v2` ikut tes default.

## Daftar todo (eksekusi)

Satu todo per topik 11–20 (implementasi + tes), lalu satu todo verifikasi vitest + `pnpm test` — lihat frontmatter YAML di atas.
