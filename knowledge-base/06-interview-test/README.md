# 100 Pertanyaan Interview Senior JavaScript Developer

Kumpulan pertanyaan yang paling sering muncul untuk level **Senior JavaScript Developer**.  
Gunakan index ini untuk latihan mandiri, mock interview, atau bahan diskusi tim.

## Cara Pakai

- Latihan 10-15 pertanyaan per sesi.
- Jawab dengan struktur: konteks, keputusan teknis, trade-off, dan contoh kasus nyata.
- Fokus pada reasoning senior, bukan sekadar definisi.

## Index Pertanyaan

### A. JavaScript Fundamentals (Core Senior Depth)

1. Jelaskan perbedaan `var`, `let`, dan `const` beserta implikasi hoisting-nya. ([detail](./01-var-let-const-hoisting-healthcare.md))
2. Apa itu temporal dead zone (TDZ) dan kenapa sering bikin bug? ([detail](./02-temporal-dead-zone-tdz-healthcare.md))
3. Jelaskan lexical scope vs dynamic scope di konteks JavaScript. ([detail](./03-lexical-scope-vs-dynamic-scope-healthcare.md))
4. Bagaimana closure bekerja, dan kapan closure jadi sumber memory leak? ([detail](./04-closure-dan-memory-leak-healthcare.md))
5. Jelaskan event loop secara detail: call stack, task queue, microtask queue. ([detail](./05-event-loop-call-stack-task-microtask-healthcare.md))
6. Mana yang jalan dulu: `setTimeout(fn, 0)` atau `Promise.resolve().then(fn)`? Jelaskan kenapa. ([detail](./06-settimeout-vs-promise-microtask-priority-healthcare.md))
7. Apa perbedaan `==` dan `===`, dan kapan coercion bisa berbahaya? ([detail](./07-double-equal-vs-triple-equal-healthcare.md))
8. Jelaskan type coercion eksplisit vs implisit dengan contoh kasus bug production. ([detail](./08-explicit-vs-implicit-type-coercion-healthcare.md))
9. Apa itu `this` di JavaScript, dan bagaimana nilainya ditentukan saat runtime? ([detail](./09-this-keyword-runtime-binding-healthcare.md))
10. Bedakan `call`, `apply`, dan `bind` dengan use case nyata. ([detail](./10-call-apply-bind-use-case-healthcare.md))
11. Jelaskan prototype chain dan bagaimana property lookup terjadi. ([detail](./11-prototype-chain-property-lookup-healthcare.md))
12. Bedakan class syntax dengan prototype-based inheritance di bawah hood. ([detail](./12-class-syntax-vs-prototype-inheritance-healthcare.md))
13. Kapan kamu akan pakai factory function dibanding class? ([detail](./13-factory-function-vs-class-healthcare.md))
14. Jelaskan `null` vs `undefined` dari sisi semantic design API. ([detail](./14-null-vs-undefined-semantic-api-healthcare.md))
15. Apa itu immutability, dan kenapa penting untuk maintainability di frontend/backend JS? ([detail](./15-immutability-dan-maintainability-healthcare.md))

### B. Functions, Async, Concurrency

16. Jelaskan callback hell, dan langkah migrasinya ke Promise/async-await. ([detail](./16-callback-hell-to-promise-async-await-healthcare.md))
17. Kapan `async/await` justru bikin code lambat (serial execution yang tidak perlu)? ([detail](./17-async-await-serial-execution-bottleneck-healthcare.md))
18. Bedakan `Promise.all`, `allSettled`, `race`, `any` dan trade-off-nya. ([detail](./18-promise-all-allsettled-race-any-healthcare.md))
19. Bagaimana menangani partial failure di beberapa request paralel? ([detail](./19-handle-partial-failure-parallel-requests-healthcare.md))
20. Jelaskan cancellation pattern di JavaScript (`AbortController`, token, cleanup). ([detail](./20-cancellation-pattern-abortcontroller-healthcare.md))
21. Apa risiko unhandled promise rejection di Node.js modern? ([detail](./21-unhandled-promise-rejection-nodejs-healthcare.md))
22. Bagaimana kamu melakukan retry dengan exponential backoff tanpa bikin retry storm? ([detail](./22-retry-exponential-backoff-no-retry-storm-healthcare.md))
23. Jelaskan debounce vs throttle dan kapan masing-masing dipakai. ([detail](./23-debounce-vs-throttle-healthcare.md))
24. Apa itu idempotency dan hubungannya dengan retry async call? ([detail](./24-idempotency-and-retry-async-call-healthcare.md))
25. Bagaimana mencegah race condition pada state async di UI? ([detail](./25-prevent-race-condition-async-ui-state-healthcare.md))
26. Jelaskan async iterator dan use case-nya pada stream data. ([detail](./26-async-iterator-and-stream-data-healthcare.md))
27. Kapan perlu worker thread / web worker? ([detail](./27-when-to-use-worker-thread-or-web-worker-healthcare.md))
28. Bagaimana kamu mengukur bottleneck CPU-bound vs I/O-bound di aplikasi JS? ([detail](./28-measure-cpu-bound-vs-io-bound-bottleneck-healthcare.md))
29. Apa itu event emitter leak dan cara mitigasinya? ([detail](./29-event-emitter-leak-and-mitigation-healthcare.md))
30. Bagaimana kamu mendesain job queue/retry queue yang aman di Node.js? ([detail](./30-design-safe-job-queue-retry-queue-healthcare.md))

### C. Data Structures, Algorithms, Complexity

31. Kapan pakai `Map` vs object biasa? ([detail](./31-map-vs-object-healthcare.md))
32. Kapan pakai `Set`, dan apa kompleksitas operasi utamanya? ([detail](./32-set-and-operation-complexity-healthcare.md))
33. Jelaskan big-O untuk `Array.prototype` method populer (`push`, `shift`, `splice`, `find`). ([detail](./33-big-o-array-methods-healthcare.md))
34. Bagaimana mendeteksi duplicate data besar secara efisien di JS? ([detail](./34-detect-large-duplicate-data-efficiently-healthcare.md))
35. Bagaimana kamu mendesain pagination offset vs cursor untuk data besar? ([detail](./35-pagination-offset-vs-cursor-healthcare.md))
36. Kapan sorting di client tidak lagi layak dan harus dipindah ke server? ([detail](./36-when-to-move-sorting-to-server-healthcare.md))
37. Jelaskan trade-off recursion vs iteration di JavaScript. ([detail](./37-recursion-vs-iteration-tradeoff-healthcare.md))
38. Bagaimana menangani deep clone object kompleks (Date, Map, circular reference)? ([detail](./38-deep-clone-complex-object-healthcare.md))
39. Apa risiko JSON stringify/parse sebagai deep clone cepat? ([detail](./39-risk-json-stringify-parse-deep-clone-healthcare.md))
40. Bagaimana kamu melakukan memoization yang aman dari memory bloat? ([detail](./40-safe-memoization-avoid-memory-bloat-healthcare.md))

### D. Browser & Web Platform

41. Jelaskan lifecycle rendering browser: parse, style, layout, paint, composite. ([detail](./41-browser-rendering-lifecycle-healthcare.md))
42. Apa itu reflow/repaint, dan bagaimana mengurangi layout thrashing? ([detail](./42-reflow-repaint-layout-thrashing-healthcare.md))
43. Bagaimana cara kerja event propagation: capturing, target, bubbling? ([detail](./43-event-propagation-capturing-bubbling-healthcare.md))
44. Kapan event delegation jadi wajib di UI besar? ([detail](./44-event-delegation-large-ui-healthcare.md))
45. Jelaskan CORS: preflight, simple request, credentials. ([detail](./45-cors-preflight-simple-credentials-healthcare.md))
46. Bedakan cookie, localStorage, sessionStorage, IndexedDB untuk use case autentikasi/data. ([detail](./46-cookie-localstorage-sessionstorage-indexeddb-healthcare.md))
47. Apa risiko menyimpan JWT di localStorage? ([detail](./47-risk-jwt-in-localstorage-healthcare.md))
48. Bagaimana menangani XSS pada aplikasi JS modern? ([detail](./48-handle-xss-modern-js-app-healthcare.md))
49. Apa itu CSRF, dan kapan token CSRF masih relevan? ([detail](./49-csrf-and-token-relevance-healthcare.md))
50. Kapan menggunakan Service Worker, dan risiko caching yang salah? ([detail](./50-service-worker-and-wrong-cache-risk-healthcare.md))
51. Bagaimana kamu merancang strategi cache invalidation di browser? ([detail](./51-browser-cache-invalidation-strategy-healthcare.md))
52. Jelaskan perbedaan SSR, CSR, SSG, ISR dari sisi performa dan DX. ([detail](./52-ssr-csr-ssg-isr-healthcare.md))
53. Apa itu hydration mismatch dan bagaimana mendiagnosisnya? ([detail](./53-hydration-mismatch-diagnosis-healthcare.md))
54. Bagaimana mengelola file upload besar secara robust di browser? ([detail](./54-large-file-upload-browser-healthcare.md))
55. Bagaimana kamu melakukan observability di frontend (error, perf, session replay)? ([detail](./55-frontend-observability-healthcare.md))

### E. Node.js & Backend JavaScript

56. Jelaskan arsitektur event-driven Node.js dan implikasi performanya. ([detail](./56-event-driven-nodejs-architecture-healthcare.md))
57. Kapan Node.js bukan pilihan tepat? ([detail](./57-when-nodejs-not-right-choice-healthcare.md))
58. Bagaimana kamu menangani CPU-intensive task di backend Node? ([detail](./58-cpu-intensive-task-node-backend-healthcare.md))
59. Apa perbedaan process, thread, cluster, dan worker_threads di Node? ([detail](./59-process-thread-cluster-workerthreads-healthcare.md))
60. Bagaimana graceful shutdown di service Node saat deploy? ([detail](./60-graceful-shutdown-node-service-healthcare.md))
61. Bagaimana mencegah memory leak di aplikasi Node jangka panjang? ([detail](./61-prevent-long-running-node-memory-leak-healthcare.md))
62. Apa itu backpressure pada stream, dan kenapa penting? ([detail](./62-stream-backpressure-healthcare.md))
63. Bagaimana mengamankan API Node dari abuse (rate limit, circuit breaker, timeout)? ([detail](./63-secure-node-api-from-abuse-healthcare.md))
64. Bagaimana mendesain error handling global di Express/Fastify/Koa? ([detail](./64-global-error-handling-express-fastify-koa-healthcare.md))
65. Kapan memakai schema validation (Zod/Joi/Yup) dan di layer mana? ([detail](./65-schema-validation-layering-healthcare.md))
66. Bagaimana logging yang benar untuk production Node (structured logging, correlation id)? ([detail](./66-production-logging-nodejs-healthcare.md))
67. Bagaimana mengelola konfigurasi environment lintas stage (dev/staging/prod)? ([detail](./67-environment-configuration-cross-stage-healthcare.md))
68. Bagaimana strategi secret management di aplikasi Node? ([detail](./68-secret-management-nodejs-healthcare.md))
69. Kapan kamu memilih monolith modular vs microservices untuk backend JS? ([detail](./69-modular-monolith-vs-microservices-healthcare.md))
70. Bagaimana migrasi API versioning tanpa memecah klien lama? ([detail](./70-api-versioning-migration-healthcare.md))

### F. Architecture, Design, and Scalability

71. Bagaimana kamu memecah codebase JavaScript besar agar tetap scalable? ([detail](./71-break-down-large-js-codebase-scalable-healthcare.md))
72. Apa batasan clean architecture di proyek yang deadline-driven? ([detail](./72-clean-architecture-vs-deadline-pragmatic-healthcare.md))
73. Bagaimana menerapkan SOLID secara pragmatis di JavaScript? ([detail](./73-pragmatic-solid-in-javascript-healthcare.md))
74. Kapan abstraction membantu, kapan jadi over-engineering? ([detail](./74-abstraction-vs-overengineering-healthcare.md))
75. Bagaimana strategi dependency management untuk menghindari supply chain risk? ([detail](./75-dependency-management-supply-chain-risk-healthcare.md))
76. Bagaimana kamu mendesain plugin/extensibility system di aplikasi JS? ([detail](./76-plugin-extensibility-system-healthcare.md))
77. Bagaimana menangani breaking change pada shared package internal? ([detail](./77-breaking-change-shared-internal-package-healthcare.md))
78. Apa strategi rollout fitur: feature flag, canary, gradual rollout? ([detail](./78-feature-flag-canary-gradual-rollout-healthcare.md))
79. Bagaimana kamu mendesain fallback saat dependency eksternal down? ([detail](./79-fallback-when-external-dependency-down-healthcare.md))
80. Bagaimana menentukan boundary modul agar coupling rendah? ([detail](./80-how-to-define-module-boundaries-healthcare.md))

### G. Testing & Quality Engineering

81. Apa testing pyramid versi realistis untuk JavaScript modern? ([detail](./81-realistic-testing-pyramid-modern-js-healthcare.md))
82. Kapan unit test tidak memberi nilai dan sebaiknya di-skip? ([detail](./82-when-unit-tests-add-no-value-healthcare.md))
83. Bagaimana menulis test async yang tidak flaky? ([detail](./83-stable-async-tests-non-flaky-healthcare.md))
84. Bedakan mock, stub, spy; kapan masing-masing dipakai. ([detail](./84-mock-stub-spy-use-cases-healthcare.md))
85. Bagaimana mengetes code yang sangat coupled tanpa refactor besar? ([detail](./85-test-coupled-code-without-big-refactor-healthcare.md))
86. Apa strategi kontrak API testing antara frontend dan backend? ([detail](./86-fe-be-api-contract-testing-healthcare.md))
87. Bagaimana mencegah false confidence dari coverage tinggi? ([detail](./87-high-coverage-false-confidence-healthcare.md))
88. Kapan snapshot test membantu, kapan jadi noise? ([detail](./88-snapshot-tests-value-vs-noise-healthcare.md))
89. Bagaimana mendesain E2E test yang stabil di CI? ([detail](./89-stable-e2e-tests-in-ci-healthcare.md))
90. Apa metrik kualitas yang kamu pakai selain test coverage? ([detail](./90-quality-metrics-beyond-coverage-healthcare.md))

### H. Security, Performance, and Production Readiness

91. Sebutkan 5 kerentanan paling sering di stack JavaScript dan mitigasinya. ([detail](./91-five-common-js-vulnerabilities-and-mitigation-healthcare.md))
92. Bagaimana proses audit dependency dan patch vulnerability tanpa merusak release? ([detail](./92-dependency-audit-and-vulnerability-patching-healthcare.md))
93. Bagaimana mencegah prototype pollution attack? ([detail](./93-prevent-prototype-pollution-attack-healthcare.md))
94. Apa strategi performance budget untuk aplikasi frontend JS? ([detail](./94-frontend-javascript-performance-budget-healthcare.md))
95. Bagaimana profiling memory dan CPU di browser/Node secara sistematis? ([detail](./95-profiling-memory-and-cpu-browser-node-healthcare.md))
96. Bagaimana kamu memastikan observability end-to-end (logs, metrics, traces)? ([detail](./96-end-to-end-observability-healthcare.md))
97. Bagaimana incident response flow saat production error meningkat mendadak? ([detail](./97-incident-response-when-production-errors-spike-healthcare.md))
98. Apa checklist release aman untuk aplikasi JavaScript skala besar? ([detail](./98-safe-release-checklist-large-scale-javascript-healthcare.md))
99. Bagaimana kamu memimpin postmortem yang menghasilkan perbaikan nyata? ([detail](./99-postmortem-that-drives-real-improvements-healthcare.md))
100. Jika diberi legacy JS codebase berantakan, apa 30-60-90 day plan kamu? ([detail](./100-30-60-90-day-plan-legacy-javascript-codebase-healthcare.md))

## Next Step (Opsional)

- Tambahkan file jawaban per kategori (`A-fundamentals.md`, dst).
- Tandai tingkat kesulitan per pertanyaan (`easy`, `medium`, `hard`).
- Simulasi mock interview 45 menit dengan timer.
