# 05 Coding Interview v2 — Index 100 Topik (JavaScript Developer)

Index ini merangkum **100 topik** yang paling sering muncul di coding test untuk peran **JavaScript developer** (front-end, full-stack, atau SWE dengan fokus JS). Dipakai sebagai peta belajar dan checklist; detail soal per nomor ada di [`../05-coding-interview-soal/README.md`](../05-coding-interview-soal/README.md).

## Isi cepat

- [Dasar bahasa dan perilaku JS (1–15)](#dasar-bahasa-dan-perilaku-js-115)
- [Array dan string (16–35)](#array-dan-string-1635)
- [Hash map, set, dan frequency (36–42)](#hash-map-set-dan-frequency-3642)
- [Stack dan queue (43–48)](#stack-dan-queue-4348)
- [Linked list (49–54)](#linked-list-4954)
- [Tree dan graph (55–65)](#tree-dan-graph-5565)
- [Rekursi dan backtracking (66–70)](#rekursi-dan-backtracking-6670)
- [Dynamic programming (71–76)](#dynamic-programming-7176)
- [Sorting dan searching lanjut (77–80)](#sorting-dan-searching-lanjut-7780)
- [Async, waktu, dan concurrency di JS (81–88)](#async-waktu-dan-concurrency-di-js-8188)
- [API dan penanganan data praktis (89–93)](#api-dan-penanganan-data-praktis-8993)
- [Pola desain kecil di test (94–100)](#pola-desain-kecil-di-test-94100)

---

## Dasar bahasa dan perilaku JS (1–15)

| # | Topik |
|---|--------|
| 1 | Hoisting, `var` vs `let`/`const`, temporal dead zone. Detail: [01-hoisting-var-let-const-tdz.md](01-hoisting-var-let-const-tdz.md) |
| 2 | Closure dan lexical scope. Detail: [02-closure-lexical-scope.md](02-closure-lexical-scope.md) |
| 3 | `this` (binding, arrow functions, `call`/`apply`/`bind`). Detail: [03-this-binding-call-apply-bind.md](03-this-binding-call-apply-bind.md) |
| 4 | Prototype chain dan `class` (syntax sugar). Detail: [04-prototype-chain-class.md](04-prototype-chain-class.md) |
| 5 | Coercion (`==` vs `===`), truthy/falsy. Detail: [05-coercion-equality-truthy-falsy.md](05-coercion-equality-truthy-falsy.md) |
| 6 | `typeof`, `instanceof`, type checking praktis. Detail: [06-typeof-instanceof-type-checking.md](06-typeof-instanceof-type-checking.md) |
| 7 | Immutability (spread object/array, shallow vs deep copy). Detail: [07-immutability-shallow-deep-copy.md](07-immutability-shallow-deep-copy.md) |
| 8 | Destructuring (array dan object). Detail: [08-destructuring-array-object.md](08-destructuring-array-object.md) |
| 9 | Optional chaining (`?.`) dan nullish coalescing (`??`). Detail: [09-optional-chaining-nullish-coalescing.md](09-optional-chaining-nullish-coalescing.md) |
| 10 | Template literals dan tagged templates. Detail: [10-template-literals-tagged-templates.md](10-template-literals-tagged-templates.md) |
| 11 | Iterables dan iterators (`for...of`, `Symbol.iterator`). Detail: [11-iterables-iterators-for-of.md](11-iterables-iterators-for-of.md) |
| 12 | Generators (`function*`). Detail: [12-generators-function-star.md](12-generators-function-star.md) |
| 13 | Modules (ESM vs CommonJS, import/export). Detail: [13-modules-esm-commonjs.md](13-modules-esm-commonjs.md) |
| 14 | Error handling (`try/catch`, custom errors). Detail: [14-error-handling-try-catch-custom.md](14-error-handling-try-catch-custom.md) |
| 15 | Strict mode dan gotchas umum. Detail: [15-strict-mode-gotchas.md](15-strict-mode-gotchas.md) |

## Array dan string (16–35)

| # | Topik |
|---|--------|
| 16 | Two pointers (subarray, palindrome string). Detail: [16-two-pointers.md](16-two-pointers.md) |
| 17 | Sliding window (fixed dan variable). Detail: [17-sliding-window.md](17-sliding-window.md) |
| 18 | Prefix sum. Detail: [18-prefix-sum.md](18-prefix-sum.md) |
| 19 | Sorting (custom comparator, stability). Detail: [19-sorting-comparator-stability.md](19-sorting-comparator-stability.md) |
| 20 | Binary search pada array terurut. Detail: [20-binary-search-sorted-array.md](20-binary-search-sorted-array.md) |
| 21 | Merge intervals / overlapping intervals. Detail: [21-merge-intervals.md](21-merge-intervals.md) |
| 22 | Rotasi array, reversal. Detail: [22-array-rotation-reversal.md](22-array-rotation-reversal.md) |
| 23 | Kadane / maximum subarray. Detail: [23-kadane-maximum-subarray.md](23-kadane-maximum-subarray.md) |
| 24 | Majority element, voting algorithm. Detail: [24-majority-element-voting.md](24-majority-element-voting.md) |
| 25 | Permutation dan combination (backtracking dasar). Detail: [25-permutation-combination-intro.md](25-permutation-combination-intro.md) |
| 26 | Subset / powerset. Detail: [26-subset-powerset.md](26-subset-powerset.md) |
| 27 | Anagram, frequency counter (hash map). Detail: [27-anagram-frequency-hash-map.md](27-anagram-frequency-hash-map.md) |
| 28 | String matching dasar (brute force; kadang KMP). Detail: [28-string-matching-basics.md](28-string-matching-basics.md) |
| 29 | Parsing string (tokenisasi sederhana, delimiter). Detail: [29-string-parsing-tokenization.md](29-string-parsing-tokenization.md) |
| 30 | Valid parentheses / bracket matching. Detail: [30-valid-parentheses-brackets.md](30-valid-parentheses-brackets.md) |
| 31 | Run-length encoding / decoding. Detail: [31-run-length-encoding.md](31-run-length-encoding.md) |
| 32 | Longest common prefix / substring (varian). Detail: [32-longest-common-prefix-substring.md](32-longest-common-prefix-substring.md) |
| 33 | Matrix traversal (baris/kolom, spiral). Detail: [33-matrix-traversal-spiral.md](33-matrix-traversal-spiral.md) |
| 34 | 2D prefix sum (kadang). Detail: [34-2d-prefix-sum.md](34-2d-prefix-sum.md) |
| 35 | Top K elements (heap / quickselect, konsep). Detail: [35-top-k-heap-quickselect.md](35-top-k-heap-quickselect.md) |

## Hash map, set, dan frequency (36–42)

| # | Topik |
|---|--------|
| 36 | Counting dengan `Map` / object. Detail: [36-counting-map-object.md](36-counting-map-object.md) |
| 37 | Deduplication dengan `Set`. Detail: [37-deduplication-set.md](37-deduplication-set.md) |
| 38 | First unique character / first non-repeating. Detail: [38-first-unique-character.md](38-first-unique-character.md) |
| 39 | Group by key (misalnya anagram groups). Detail: [39-group-by-key.md](39-group-by-key.md) |
| 40 | Subarray sum equals K (prefix + map). Detail: [40-subarray-sum-equals-k.md](40-subarray-sum-equals-k.md) |
| 41 | Longest substring without repeat (sliding window klasik). Detail: [41-longest-substring-without-repeat.md](41-longest-substring-without-repeat.md) |
| 42 | Collision handling (konsep, untuk menjelaskan `Map`). Detail: [42-map-collision-concept.md](42-map-collision-concept.md) |

## Stack dan queue (43–48)

| # | Topik |
|---|--------|
| 43 | Stack untuk parsing dan pola undo/redo. Detail: [43-stack-parsing-undo-redo.md](43-stack-parsing-undo-redo.md) |
| 44 | Monotonic stack (next greater element). Detail: [44-monotonic-stack-next-greater.md](44-monotonic-stack-next-greater.md) |
| 45 | Queue dengan dua stack. Detail: [45-queue-using-two-stacks.md](45-queue-using-two-stacks.md) |
| 46 | BFS level-order (tree). Detail: [46-bfs-tree-level-order.md](46-bfs-tree-level-order.md) |
| 47 | Deque (konsep, sliding window max). Detail: [47-deque-sliding-window-max.md](47-deque-sliding-window-max.md) |
| 48 | Evaluasi ekspresi (RPN / calculator). Detail: [48-rpn-calculator.md](48-rpn-calculator.md) |

## Linked list (49–54)

| # | Topik |
|---|--------|
| 49 | Reverse linked list. Detail: [49-reverse-linked-list.md](49-reverse-linked-list.md) |
| 50 | Cycle detection (Floyd). Detail: [50-linked-list-cycle-floyd.md](50-linked-list-cycle-floyd.md) |
| 51 | Merge two sorted lists. Detail: [51-merge-two-sorted-lists.md](51-merge-two-sorted-lists.md) |
| 52 | Middle of linked list. Detail: [52-middle-linked-list.md](52-middle-linked-list.md) |
| 53 | Remove Nth from end. Detail: [53-remove-nth-from-end.md](53-remove-nth-from-end.md) |
| 54 | Intersection of two lists. Detail: [54-intersection-two-lists.md](54-intersection-two-lists.md) |

## Tree dan graph (55–65)

| # | Topik |
|---|--------|
| 55 | DFS vs BFS. Detail: [55-dfs-vs-bfs.md](55-dfs-vs-bfs.md) |
| 56 | Binary tree traversal (pre/in/post, level). Detail: [56-binary-tree-traversal.md](56-binary-tree-traversal.md) |
| 57 | Height/depth, balanced tree check. Detail: [57-height-balanced-tree.md](57-height-balanced-tree.md) |
| 58 | LCA (lowest common ancestor). Detail: [58-lowest-common-ancestor.md](58-lowest-common-ancestor.md) |
| 59 | Path sum. Detail: [59-path-sum-tree.md](59-path-sum-tree.md) |
| 60 | BST insert/search/delete (konsep). Detail: [60-bst-operations.md](60-bst-operations.md) |
| 61 | Trie (prefix tree) untuk pola autocomplete. Detail: [61-trie-prefix-tree.md](61-trie-prefix-tree.md) |
| 62 | Graph representation (adjacency list/matrix). Detail: [62-graph-representation.md](62-graph-representation.md) |
| 63 | Shortest path (BFS unweighted; Dijkstra konsep). Detail: [63-shortest-path-bfs-dijkstra-concept.md](63-shortest-path-bfs-dijkstra-concept.md) |
| 64 | Topological sort (dependency order). Detail: [64-topological-sort.md](64-topological-sort.md) |
| 65 | Connected components, island counting (grid BFS/DFS). Detail: [65-connected-components-islands.md](65-connected-components-islands.md) |

## Rekursi dan backtracking (66–70)

| # | Topik |
|---|--------|
| 66 | Rekursi vs iterasi, base case. Detail: [66-recursion-vs-iteration.md](66-recursion-vs-iteration.md) |
| 67 | Subset / combination dengan backtracking. Detail: [67-backtracking-subset-combination.md](67-backtracking-subset-combination.md) |
| 68 | Permutation dengan backtracking. Detail: [68-backtracking-permutation.md](68-backtracking-permutation.md) |
| 69 | N-Queens / Sudoku (varian klasik). Detail: [69-n-queens-sudoku.md](69-n-queens-sudoku.md) |
| 70 | Word search pada grid. Detail: [70-word-search-grid.md](70-word-search-grid.md) |

## Dynamic programming (71–76)

| # | Topik |
|---|--------|
| 71 | Fibonacci (memoization vs tabulation). Detail: [71-fibonacci-memo-tabulation.md](71-fibonacci-memo-tabulation.md) |
| 72 | Climbing stairs. Detail: [72-climbing-stairs.md](72-climbing-stairs.md) |
| 73 | Coin change (min coins / ways). Detail: [73-coin-change.md](73-coin-change.md) |
| 74 | LCS (longest common subsequence). Detail: [74-longest-common-subsequence.md](74-longest-common-subsequence.md) |
| 75 | Knapsack 0/1 (konsep). Detail: [75-knapsack-01-concept.md](75-knapsack-01-concept.md) |
| 76 | Edit distance. Detail: [76-edit-distance.md](76-edit-distance.md) |

## Sorting dan searching lanjut (77–80)

| # | Topik |
|---|--------|
| 77 | Merge sort / quick sort (implementasi atau analisis). Detail: [77-merge-sort-quick-sort.md](77-merge-sort-quick-sort.md) |
| 78 | Counting sort untuk range terbatas. Detail: [78-counting-sort.md](78-counting-sort.md) |
| 79 | Binary search on answer (minimize/maximize). Detail: [79-binary-search-on-answer.md](79-binary-search-on-answer.md) |
| 80 | Meeting rooms / schedule conflicts. Detail: [80-meeting-rooms-schedule.md](80-meeting-rooms-schedule.md) |

## Async, waktu, dan concurrency di JS (81–88)

| # | Topik |
|---|--------|
| 81 | Event loop (call stack, microtask vs macrotask). Detail: [81-event-loop-microtask-macrotask.md](81-event-loop-microtask-macrotask.md) |
| 82 | Promises (`then`/`catch`/`finally`, chaining). Detail: [82-promises-chaining.md](82-promises-chaining.md) |
| 83 | `async`/`await` dan error handling. Detail: [83-async-await-error-handling.md](83-async-await-error-handling.md) |
| 84 | `Promise.all` / `allSettled` / `race`. Detail: [84-promise-all-settled-race.md](84-promise-all-settled-race.md) |
| 85 | Throttle dan debounce. Detail: [85-throttle-debounce.md](85-throttle-debounce.md) |
| 86 | Retry dengan backoff (pola). Detail: [86-retry-backoff.md](86-retry-backoff.md) |
| 87 | Concurrent task limit (pooling promises). Detail: [87-concurrent-promise-pool.md](87-concurrent-promise-pool.md) |
| 88 | Cancellation / `AbortController` (konsep). Detail: [88-abort-controller-cancellation.md](88-abort-controller-cancellation.md) |

## API dan penanganan data praktis (89–93)

| # | Topik |
|---|--------|
| 89 | Fetch JSON, handling status dan errors. Detail: [89-fetch-json-errors.md](89-fetch-json-errors.md) |
| 90 | Pagination (offset/cursor). Detail: [90-pagination-offset-cursor.md](90-pagination-offset-cursor.md) |
| 91 | Deep merge object (tanpa lib, hati-hati edge case). Detail: [91-deep-merge-objects.md](91-deep-merge-objects.md) |
| 92 | Flatten nested array / object. Detail: [92-flatten-nested-array-object.md](92-flatten-nested-array-object.md) |
| 93 | Deep equality comparison (terbatas). Detail: [93-deep-equality-limited.md](93-deep-equality-limited.md) |

## Pola desain kecil di test (94–100)

| # | Topik |
|---|--------|
| 94 | LRU cache (`Map` + order). Detail: [94-lru-cache-map-order.md](94-lru-cache-map-order.md) |
| 95 | Rate limiter (token bucket / sliding window). Detail: [95-rate-limiter-token-bucket.md](95-rate-limiter-token-bucket.md) |
| 96 | Observer / pub-sub sederhana. Detail: [96-observer-pub-sub.md](96-observer-pub-sub.md) |
| 97 | Memoization function wrapper. Detail: [97-memoization-wrapper.md](97-memoization-wrapper.md) |
| 98 | Curry dan partial application. Detail: [98-curry-partial-application.md](98-curry-partial-application.md) |
| 99 | Pipeline / compose functions. Detail: [99-pipeline-compose.md](99-pipeline-compose.md) |
| 100 | Immutability-friendly update (nested state update). Detail: [100-immutable-nested-update.md](100-immutable-nested-update.md) |

---

## Urutan belajar yang disarankan

1. Array/hash, two pointers, sliding window  
2. Stack, queue, binary search  
3. Linked list, tree, graph  
4. Backtracking, lalu DP  
5. Async/Promise dan pola JS-specific (throttle, debounce)  
6. Pola desain kecil (LRU, memoize, dll.)

## Catatan

Frekuensi topik di perusahaan berbeda-beda. Yang paling sering jadi fondasi: **array/string + hash map + two pointers/sliding window**, **tree BFS/DFS**, **graph BFS**, serta **async/Promise** untuk peran JS.
