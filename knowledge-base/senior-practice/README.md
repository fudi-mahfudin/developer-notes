# Senior JavaScript Developer Practice Index

## Index Topik yang Harus Dikuasai

### 01. JavaScript dan TypeScript Advanced

Fokus agar Anda bukan hanya bisa pakai bahasa, tapi bisa menjelaskan perilaku runtime dan membuat keputusan design yang tepat.

- Event loop, call stack, task queue, microtask queue. Detail: [01-event-loop-call-stack-task-queue-microtask-queue.md](./01-javascript-and-typescript-advanced/01-event-loop-call-stack-task-queue-microtask-queue.md)
- Closure, scope, `this`, prototype, inheritance. Detail: [02-closure-scope-this-prototype-inheritance.md](./01-javascript-and-typescript-advanced/02-closure-scope-this-prototype-inheritance.md)
- Async flow: `Promise`, `async/await`, cancellation, race condition. Detail: [03-async-flow-promise-async-await-cancellation-race-condition.md](./01-javascript-and-typescript-advanced/03-async-flow-promise-async-await-cancellation-race-condition.md)
- Immutability vs mutation dan dampaknya ke maintainability. Detail: [04-immutability-vs-mutation-dan-dampaknya-ke-maintainability.md](./01-javascript-and-typescript-advanced/04-immutability-vs-mutation-dan-dampaknya-ke-maintainability.md)
- Error handling pattern di JS/TS. Detail: [05-error-handling-pattern-di-js-ts.md](./01-javascript-and-typescript-advanced/05-error-handling-pattern-di-js-ts.md)
- TypeScript advanced types: generics, utility types, mapped types, conditional types, discriminated unions. Detail: [06-typescript-advanced-types-generics-utility-types-mapped-types-conditional-types-discriminated-unions.md](./01-javascript-and-typescript-advanced/06-typescript-advanced-types-generics-utility-types-mapped-types-conditional-types-discriminated-unions.md)
- Runtime validation vs static typing. Detail: [07-runtime-validation-vs-static-typing.md](./01-javascript-and-typescript-advanced/07-runtime-validation-vs-static-typing.md)
- Desain type yang maintainable untuk domain kompleks. Detail: [08-desain-type-yang-maintainable-untuk-domain-kompleks.md](./01-javascript-and-typescript-advanced/08-desain-type-yang-maintainable-untuk-domain-kompleks.md)

### 02. Node.js Internals dan Backend Reliability

Fokus agar Anda bisa menjelaskan kenapa service stabil atau gagal di production.

- Arsitektur runtime Node.js. Detail: [01-arsitektur-runtime-nodejs.md](./02-nodejs-internals-and-backend-reliability/01-arsitektur-runtime-nodejs.md)
- Non-blocking I/O dan kapan bottleneck tetap terjadi. Detail: [02-non-blocking-io-dan-kapan-bottleneck-tetap-terjadi.md](./02-nodejs-internals-and-backend-reliability/02-non-blocking-io-dan-kapan-bottleneck-tetap-terjadi.md)
- CPU-bound vs I/O-bound workload. Detail: [03-cpu-bound-vs-io-bound-workload.md](./02-nodejs-internals-and-backend-reliability/03-cpu-bound-vs-io-bound-workload.md)
- Worker threads, clustering, process model. Detail: [04-worker-threads-clustering-process-model.md](./02-nodejs-internals-and-backend-reliability/04-worker-threads-clustering-process-model.md)
- Connection pooling, timeout, retry, backoff. Detail: [05-connection-pooling-timeout-retry-backoff.md](./02-nodejs-internals-and-backend-reliability/05-connection-pooling-timeout-retry-backoff.md)
- Idempotency untuk request yang bisa terulang. Detail: [06-idempotency-untuk-request-yang-bisa-terulang.md](./02-nodejs-internals-and-backend-reliability/06-idempotency-untuk-request-yang-bisa-terulang.md)
- Graceful shutdown, health checks, readiness, liveness. Detail: [07-graceful-shutdown-health-checks-readiness-liveness.md](./02-nodejs-internals-and-backend-reliability/07-graceful-shutdown-health-checks-readiness-liveness.md)
- Memory leak, event emitter leak, dan debugging dasar. Detail: [08-memory-leak-event-emitter-leak-dan-debugging-dasar.md](./02-nodejs-internals-and-backend-reliability/08-memory-leak-event-emitter-leak-dan-debugging-dasar.md)
- Concurrency control pada service backend. Detail: [09-concurrency-control-pada-service-backend.md](./02-nodejs-internals-and-backend-reliability/09-concurrency-control-pada-service-backend.md)

### 03. Frontend Architecture untuk Aplikasi Besar

Fokus agar Anda bisa memimpin codebase frontend yang tumbuh, bukan hanya menyelesaikan halaman.

- Arsitektur `Next.js` untuk aplikasi skala tim. Detail: [01-arsitektur-nextjs-untuk-aplikasi-skala-tim.md](./03-frontend-architecture-untuk-aplikasi-besar/01-arsitektur-nextjs-untuk-aplikasi-skala-tim.md)
- Server Components vs Client Components. Detail: [02-server-components-vs-client-components.md](./03-frontend-architecture-untuk-aplikasi-besar/02-server-components-vs-client-components.md)
- Data fetching strategy, caching, revalidation, invalidation. Detail: [03-data-fetching-strategy-caching-revalidation-invalidation.md](./03-frontend-architecture-untuk-aplikasi-besar/03-data-fetching-strategy-caching-revalidation-invalidation.md)
- State management dan kapan memakai local state, server state, global state. Detail: [04-state-management-dan-kapan-memakai-local-state-server-state-global-state.md](./03-frontend-architecture-untuk-aplikasi-besar/04-state-management-dan-kapan-memakai-local-state-server-state-global-state.md)
- Component boundaries dan folder/module organization. Detail: [05-component-boundaries-dan-folder-module-organization.md](./03-frontend-architecture-untuk-aplikasi-besar/05-component-boundaries-dan-folder-module-organization.md)
- Design system, reusability, dan consistency. Detail: [06-design-system-reusability-dan-consistency.md](./03-frontend-architecture-untuk-aplikasi-besar/06-design-system-reusability-dan-consistency.md)
- Frontend performance: rendering cost, memoization, bundling, code splitting. Detail: [07-frontend-performance-rendering-cost-memoization-bundling-code-splitting.md](./03-frontend-architecture-untuk-aplikasi-besar/07-frontend-performance-rendering-cost-memoization-bundling-code-splitting.md)
- Error boundary, loading strategy, skeleton, resilience UX. Detail: [08-error-boundary-loading-strategy-skeleton-resilience-ux.md](./03-frontend-architecture-untuk-aplikasi-besar/08-error-boundary-loading-strategy-skeleton-resilience-ux.md)
- Accessibility dan maintainability sebagai quality baseline. Detail: [09-accessibility-dan-maintainability-sebagai-quality-baseline.md](./03-frontend-architecture-untuk-aplikasi-besar/09-accessibility-dan-maintainability-sebagai-quality-baseline.md)

### 04. Database, Transaction, dan Data Consistency

Ini area penting karena CV Anda sudah menyentuh integrasi PostgreSQL dan SQL Server; sekarang perlu naik ke level design reasoning.

- Normalization vs denormalization. Detail: [01-normalization-vs-denormalization.md](./04-database-transaction-and-data-consistency/01-normalization-vs-denormalization.md)
- Indexing, query planning, dan performance bottleneck. Detail: [02-indexing-query-planning-dan-performance-bottleneck.md](./04-database-transaction-and-data-consistency/02-indexing-query-planning-dan-performance-bottleneck.md)
- ACID, transaction boundary, isolation level, locking. Detail: [03-acid-transaction-boundary-isolation-level-locking.md](./04-database-transaction-and-data-consistency/03-acid-transaction-boundary-isolation-level-locking.md)
- Deadlock, phantom read, dirty read, lost update. Detail: [04-deadlock-phantom-read-dirty-read-lost-update.md](./04-database-transaction-and-data-consistency/04-deadlock-phantom-read-dirty-read-lost-update.md)
- Optimistic vs pessimistic locking. Detail: [05-optimistic-vs-pessimistic-locking.md](./04-database-transaction-and-data-consistency/05-optimistic-vs-pessimistic-locking.md)
- Data consistency antar service atau antar database. Detail: [06-data-consistency-antar-service-atau-antar-database.md](./04-database-transaction-and-data-consistency/06-data-consistency-antar-service-atau-antar-database.md)
- Outbox pattern, saga, compensating action. Detail: [07-outbox-pattern-saga-compensating-action.md](./04-database-transaction-and-data-consistency/07-outbox-pattern-saga-compensating-action.md)
- Rekonsiliasi data dan audit trail. Detail: [08-rekonsiliasi-data-dan-audit-trail.md](./04-database-transaction-and-data-consistency/08-rekonsiliasi-data-dan-audit-trail.md)
- Strategi migration schema yang aman. Detail: [09-strategi-migration-schema-yang-aman.md](./04-database-transaction-and-data-consistency/09-strategi-migration-schema-yang-aman.md)

### 05. API Design dan Integration Patterns

Fokus agar Anda bisa merancang interface sistem yang tahan perubahan.

- REST API design yang konsisten. Detail: [01-rest-api-design-yang-konsisten.md](./05-api-design-and-integration-patterns/01-rest-api-design-yang-konsisten.md)
- Versioning strategy. Detail: [02-versioning-strategy.md](./05-api-design-and-integration-patterns/02-versioning-strategy.md)
- Pagination, filtering, sorting, dan search semantics. Detail: [03-pagination-filtering-sorting-dan-search-semantics.md](./05-api-design-and-integration-patterns/03-pagination-filtering-sorting-dan-search-semantics.md)
- Contract validation dan backward compatibility. Detail: [04-contract-validation-dan-backward-compatibility.md](./05-api-design-and-integration-patterns/04-contract-validation-dan-backward-compatibility.md)
- Webhook, polling, message queue, event-driven integration. Detail: [05-webhook-polling-message-queue-event-driven-integration.md](./05-api-design-and-integration-patterns/05-webhook-polling-message-queue-event-driven-integration.md)
- Idempotency key. Detail: [06-idempotency-key.md](./05-api-design-and-integration-patterns/06-idempotency-key.md)
- Retry-safe integration. Detail: [07-retry-safe-integration.md](./05-api-design-and-integration-patterns/07-retry-safe-integration.md)
- Failure mode lintas sistem. Detail: [08-failure-mode-lintas-sistem.md](./05-api-design-and-integration-patterns/08-failure-mode-lintas-sistem.md)
- External dependency management dan timeout budgeting. Detail: [09-external-dependency-management-dan-timeout-budgeting.md](./05-api-design-and-integration-patterns/09-external-dependency-management-dan-timeout-budgeting.md)

### 06. Performance Engineering

Anda sudah punya bukti optimasi performa; yang dibutuhkan sekarang adalah framework berpikir yang lebih senior.

- Cara ukur performa, bukan asumsi performa. Detail: [01-cara-ukur-performa-bukan-asumsi-performa.md](./06-performance-engineering/01-cara-ukur-performa-bukan-asumsi-performa.md)
- Profiling frontend dan backend. Detail: [02-profiling-frontend-dan-backend.md](./06-performance-engineering/02-profiling-frontend-dan-backend.md)
- Bottleneck analysis. Detail: [03-bottleneck-analysis.md](./06-performance-engineering/03-bottleneck-analysis.md)
- N+1 query dan over-fetching. Detail: [04-n-plus-1-query-dan-over-fetching.md](./06-performance-engineering/04-n-plus-1-query-dan-over-fetching.md)
- Caching strategy: browser, CDN, application, database. Detail: [05-caching-strategy-browser-cdn-application-database.md](./06-performance-engineering/05-caching-strategy-browser-cdn-application-database.md)
- Lazy loading, streaming, batching, pagination. Detail: [06-lazy-loading-streaming-batching-pagination.md](./06-performance-engineering/06-lazy-loading-streaming-batching-pagination.md)
- Throughput, latency, tail latency. Detail: [07-throughput-latency-tail-latency.md](./06-performance-engineering/07-throughput-latency-tail-latency.md)
- Capacity thinking dan load expectation dasar. Detail: [08-capacity-thinking-dan-load-expectation-dasar.md](./06-performance-engineering/08-capacity-thinking-dan-load-expectation-dasar.md)

### 07. Testing Strategy dan Quality Engineering

Fokus agar Anda bisa memilih level test yang tepat, bukan sekadar menambah coverage.

- Unit test, integration test, end-to-end test. Detail: [01-unit-test-integration-test-end-to-end-test.md](./07-testing-strategy-and-quality-engineering/01-unit-test-integration-test-end-to-end-test.md)
- Test pyramid dan trade-off nyata. Detail: [02-test-pyramid-dan-trade-off-nyata.md](./07-testing-strategy-and-quality-engineering/02-test-pyramid-dan-trade-off-nyata.md)
- Contract testing untuk integrasi. Detail: [03-contract-testing-untuk-integrasi.md](./07-testing-strategy-and-quality-engineering/03-contract-testing-untuk-integrasi.md)
- Mocking vs real dependency. Detail: [04-mocking-vs-real-dependency.md](./07-testing-strategy-and-quality-engineering/04-mocking-vs-real-dependency.md)
- Testing async flow dan race condition. Detail: [05-testing-async-flow-dan-race-condition.md](./07-testing-strategy-and-quality-engineering/05-testing-async-flow-dan-race-condition.md)
- Regression prevention pada refactor. Detail: [06-regression-prevention-pada-refactor.md](./07-testing-strategy-and-quality-engineering/06-regression-prevention-pada-refactor.md)
- Quality gate, static analysis, dan code review heuristics. Detail: [07-quality-gate-static-analysis-dan-code-review-heuristics.md](./07-testing-strategy-and-quality-engineering/07-quality-gate-static-analysis-dan-code-review-heuristics.md)
- Menentukan test mana yang bernilai dan mana yang noise. Detail: [08-menentukan-test-bernilai-vs-noise.md](./07-testing-strategy-and-quality-engineering/08-menentukan-test-bernilai-vs-noise.md)

### 08. Security Fundamentals untuk Full Stack

Topik ini sering jadi pembeda senior yang matang vs developer yang hanya bisa shipping.

- Authentication dan session management. Detail: [01-authentication-dan-session-management.md](./08-security-fundamentals-for-full-stack/01-authentication-dan-session-management.md)
- Authorization model: RBAC, permission-based access. Detail: [02-authorization-model-rbac-dan-permission-based-access.md](./08-security-fundamentals-for-full-stack/02-authorization-model-rbac-dan-permission-based-access.md)
- OWASP dasar untuk web app. Detail: [03-owasp-dasar-untuk-web-app.md](./08-security-fundamentals-for-full-stack/03-owasp-dasar-untuk-web-app.md)
- XSS, CSRF, SQL injection, SSRF, insecure direct object reference. Detail: [04-xss-csrf-sql-injection-ssrf-idor.md](./08-security-fundamentals-for-full-stack/04-xss-csrf-sql-injection-ssrf-idor.md)
- Secret handling dan config management. Detail: [05-secret-handling-dan-config-management.md](./08-security-fundamentals-for-full-stack/05-secret-handling-dan-config-management.md)
- Input validation, output encoding, audit logging. Detail: [06-input-validation-output-encoding-audit-logging.md](./08-security-fundamentals-for-full-stack/06-input-validation-output-encoding-audit-logging.md)
- Rate limiting dan abuse prevention. Detail: [07-rate-limiting-dan-abuse-prevention.md](./08-security-fundamentals-for-full-stack/07-rate-limiting-dan-abuse-prevention.md)
- Secure API design. Detail: [08-secure-api-design.md](./08-security-fundamentals-for-full-stack/08-secure-api-design.md)

### 09. System Design dan Distributed Systems

Ini topik yang paling sering muncul saat transisi ke senior.

- Requirement clarification dan estimasi beban. Detail: [01-requirement-clarification-dan-estimasi-beban.md](./09-system-design-and-distributed-systems/01-requirement-clarification-dan-estimasi-beban.md)
- High-level design dan pemilihan komponen. Detail: [02-high-level-design-dan-pemilihan-komponen.md](./09-system-design-and-distributed-systems/02-high-level-design-dan-pemilihan-komponen.md)
- Monolith vs modular monolith vs microservices. Detail: [03-monolith-vs-modular-monolith-vs-microservices.md](./09-system-design-and-distributed-systems/03-monolith-vs-modular-monolith-vs-microservices.md)
- Sync vs async architecture. Detail: [04-sync-vs-async-architecture.md](./09-system-design-and-distributed-systems/04-sync-vs-async-architecture.md)
- Queue, pub/sub, event-driven flow. Detail: [05-queue-pubsub-event-driven-flow.md](./09-system-design-and-distributed-systems/05-queue-pubsub-event-driven-flow.md)
- Cache-aside dan invalidation problem. Detail: [06-cache-aside-dan-invalidation-problem.md](./09-system-design-and-distributed-systems/06-cache-aside-dan-invalidation-problem.md)
- Single point of failure dan failure isolation. Detail: [07-single-point-of-failure-dan-failure-isolation.md](./09-system-design-and-distributed-systems/07-single-point-of-failure-dan-failure-isolation.md)
- Consistency vs availability vs complexity. Detail: [08-consistency-vs-availability-vs-complexity.md](./09-system-design-and-distributed-systems/08-consistency-vs-availability-vs-complexity.md)
- Trade-off design berdasarkan konteks bisnis. Detail: [09-trade-off-design-berdasarkan-konteks-bisnis.md](./09-system-design-and-distributed-systems/09-trade-off-design-berdasarkan-konteks-bisnis.md)

### 10. Observability, Incident Response, dan Operability

Karena Anda sudah memakai `Elastic APM`, ini harus diperluas menjadi kemampuan incident ownership.

- Logging, metrics, tracing. Detail: [01-logging-metrics-tracing.md](./10-observability-incident-response-and-operability/01-logging-metrics-tracing.md)
- SLI, SLO, SLA. Detail: [02-sli-slo-sla.md](./10-observability-incident-response-and-operability/02-sli-slo-sla.md)
- Alert fatigue vs alert quality. Detail: [03-alert-fatigue-vs-alert-quality.md](./10-observability-incident-response-and-operability/03-alert-fatigue-vs-alert-quality.md)
- Root cause analysis. Detail: [04-root-cause-analysis.md](./10-observability-incident-response-and-operability/04-root-cause-analysis.md)
- Incident triage dan rollback decision. Detail: [05-incident-triage-dan-rollback-decision.md](./10-observability-incident-response-and-operability/05-incident-triage-dan-rollback-decision.md)
- Runbook dan postmortem. Detail: [06-runbook-dan-postmortem.md](./10-observability-incident-response-and-operability/06-runbook-dan-postmortem.md)
- Debugging production issue secara sistematis. Detail: [07-debugging-production-issue-secara-sistematis.md](./10-observability-incident-response-and-operability/07-debugging-production-issue-secara-sistematis.md)
- Instrumentation yang membantu keputusan, bukan sekadar menambah log. Detail: [08-instrumentation-yang-membantu-keputusan-bukan-sekadar-menambah-log.md](./10-observability-incident-response-and-operability/08-instrumentation-yang-membantu-keputusan-bukan-sekadar-menambah-log.md)

### 11. Cloud, Deployment, dan CI/CD

Tidak harus jadi DevOps specialist, tapi senior engineer harus paham jalur software ke production.

- Build pipeline dan release workflow. Detail: [01-build-pipeline-dan-release-workflow.md](./11-cloud-deployment-dan-ci-cd/01-build-pipeline-dan-release-workflow.md)
- CI/CD fundamentals. Detail: [02-ci-cd-fundamentals.md](./11-cloud-deployment-dan-ci-cd/02-ci-cd-fundamentals.md)
- Environment strategy: local, staging, production. Detail: [03-environment-strategy-local-staging-production.md](./11-cloud-deployment-dan-ci-cd/03-environment-strategy-local-staging-production.md)
- Feature flag. Detail: [04-feature-flag.md](./11-cloud-deployment-dan-ci-cd/04-feature-flag.md)
- Blue-green vs canary vs rolling deployment. Detail: [05-blue-green-vs-canary-vs-rolling-deployment.md](./11-cloud-deployment-dan-ci-cd/05-blue-green-vs-canary-vs-rolling-deployment.md)
- Rollback strategy. Detail: [06-rollback-strategy.md](./11-cloud-deployment-dan-ci-cd/06-rollback-strategy.md)
- Container basics dan runtime environment. Detail: [07-container-basics-dan-runtime-environment.md](./11-cloud-deployment-dan-ci-cd/07-container-basics-dan-runtime-environment.md)
- Konfigurasi, secret, dan deployment safety. Detail: [08-konfigurasi-secret-dan-deployment-safety.md](./11-cloud-deployment-dan-ci-cd/08-konfigurasi-secret-dan-deployment-safety.md)

### 12. Technical Leadership dan Komunikasi Senior

Kalau ini tidak dibangun, Anda akan tetap terlihat sebagai strong mid-level executor.

- Menulis design note atau ADR sederhana. Detail: [01-menulis-design-note-atau-adr-sederhana.md](./12-technical-leadership-dan-komunikasi-senior/01-menulis-design-note-atau-adr-sederhana.md)
- Menjelaskan trade-off teknis ke stakeholder non-teknis. Detail: [02-menjelaskan-trade-off-teknis-ke-stakeholder-non-teknis.md](./12-technical-leadership-dan-komunikasi-senior/02-menjelaskan-trade-off-teknis-ke-stakeholder-non-teknis.md)
- Code review yang tajam dan berguna. Detail: [03-code-review-yang-tajam-dan-berguna.md](./12-technical-leadership-dan-komunikasi-senior/03-code-review-yang-tajam-dan-berguna.md)
- Breaking down problem dan membagi pekerjaan ke tim. Detail: [04-breaking-down-problem-dan-membagi-pekerjaan-ke-tim.md](./12-technical-leadership-dan-komunikasi-senior/04-breaking-down-problem-dan-membagi-pekerjaan-ke-tim.md)
- Mentoring junior dan pair debugging. Detail: [05-mentoring-junior-dan-pair-debugging.md](./12-technical-leadership-dan-komunikasi-senior/05-mentoring-junior-dan-pair-debugging.md)
- Mengangkat engineering standard, bukan hanya menyelesaikan task. Detail: [06-mengangkat-engineering-standard-bukan-hanya-menyelesaikan-task.md](./12-technical-leadership-dan-komunikasi-senior/06-mengangkat-engineering-standard-bukan-hanya-menyelesaikan-task.md)
- Prioritization antara speed, quality, dan risk. Detail: [07-prioritization-antara-speed-quality-dan-risk.md](./12-technical-leadership-dan-komunikasi-senior/07-prioritization-antara-speed-quality-dan-risk.md)
- Ownership lintas fungsi saat incident atau proyek kompleks. Detail: [08-ownership-lintas-fungsi-saat-incident-atau-proyek-kompleks.md](./12-technical-leadership-dan-komunikasi-senior/08-ownership-lintas-fungsi-saat-incident-atau-proyek-kompleks.md)

## Cara Pakai Folder Ini

- Buat satu file per topik.
- Untuk setiap topik, isi empat bagian: `konsep`, `trade-off`, `contoh kasus nyata`, dan `latihan interview`.
- Hubungkan tiap topik ke pengalaman nyata di Siloam, Juke, atau Corporate Room Deal.
- Jangan belajar topik sebagai hafalan. Paksa setiap topik menjawab: kapan dipakai, kapan tidak, apa risikonya, dan bagaimana failure mode-nya.

## Checklist Senior Readiness

- Saya bisa menjelaskan trade-off teknis tanpa jawaban normatif.
- Saya bisa menghubungkan pengalaman kerja saya ke prinsip arsitektur yang benar.
- Saya bisa mendesain solusi yang aman terhadap failure dan retry.
- Saya bisa membedakan solusi cepat vs solusi yang maintainable.
- Saya bisa menjelaskan testing strategy berdasarkan risiko.
- Saya bisa menjelaskan observability yang relevan untuk sistem produksi.
- Saya bisa memimpin diskusi teknis kecil tanpa bergantung pada orang lain.

## Prinsip Belajar

- Prioritaskan kedalaman pada topik yang dekat dengan pengalaman kerja Anda.
- Ubah setiap pengalaman di CV menjadi case study teknis yang bisa dipertanggungjawabkan.
- Fokus pada reasoning, bukan istilah.
- Jika tidak bisa menjelaskan trade-off dan failure mode, berarti topiknya belum benar-benar dikuasai.

