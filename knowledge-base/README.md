# Senior JavaScript Developer Practice Index

## Tujuan

Folder ini adalah index topik yang perlu dikuasai untuk naik dari full stack developer yang kuat di delivery menjadi senior JavaScript developer yang kuat di design, reliability, debugging, dan technical leadership.

Berdasarkan CV saat ini, kekuatan utama Anda sudah jelas di `React`, `Next.js`, `TypeScript`, `Node.js`, optimasi performa, dan integrasi sistem. Gap yang masih perlu dibuat lebih eksplisit dan terstruktur adalah:

- desain backend dan frontend pada skala besar;
- data consistency dan distributed system thinking;
- observability, reliability, dan incident handling;
- testing strategy level sistem, bukan hanya level fitur;
- keputusan arsitektur dan trade-off yang bisa dipertanggungjawabkan;
- ownership senior: mentoring, review, komunikasi teknis, dan pengaruh lintas tim.

## Profil CV Saat Ini

### Kekuatan yang Sudah Terbukti

- Sudah punya pengalaman production nyata lebih dari 5 tahun.
- Sudah mengerjakan problem bisnis yang relevan untuk senior, bukan hanya CRUD.
- Sudah punya bukti di area performance optimization.
- Sudah punya bukti integrasi lintas sistem dan lintas database.
- Sudah pernah kerja di domain yang sensitif operasionalnya, yaitu healthcare.
- Sudah familiar dengan quality gate dan automated testing.

### Gap yang Masih Harus Ditutup

- Belum terlihat kuat di topik `system design` end-to-end.
- Belum terlihat eksplisit di area `scalability`, `caching`, `queue`, dan `event-driven architecture`.
- Belum terlihat eksplisit di `security`, `authentication`, `authorization`, dan secure coding.
- Belum terlihat eksplisit di `CI/CD`, deployment strategy, dan operational excellence.
- Belum terlihat eksplisit di ownership senior seperti technical direction, design review, mentoring, dan standard setting.
- Belum terlihat eksplisit di database performance tuning, transaction isolation, dan failure recovery pattern.

## Prioritas Belajar

Urutan ini bukan akademik. Ini urutan yang paling masuk akal untuk memperkuat positioning senior Anda.

1. `JavaScript dan TypeScript advanced`
2. `Node.js internals dan backend reliability`
3. `Frontend architecture untuk aplikasi besar`
4. `Database, transaction, dan data consistency`
5. `API design dan integration patterns`
6. `Performance engineering`
7. `Testing strategy dan quality engineering`
8. `Security fundamentals untuk full stack`
9. `System design dan distributed systems`
10. `Observability, incident response, dan operability`
11. `Cloud, deployment, dan CI/CD`
12. `Technical leadership dan komunikasi senior`

## Index Topik yang Harus Dikuasai

### 01. JavaScript dan TypeScript Advanced

Fokus agar Anda bukan hanya bisa pakai bahasa, tapi bisa menjelaskan perilaku runtime dan membuat keputusan design yang tepat.

- Event loop, call stack, task queue, microtask queue.
- Closure, scope, `this`, prototype, inheritance.
- Async flow: `Promise`, `async/await`, cancellation, race condition.
- Immutability vs mutation dan dampaknya ke maintainability.
- Error handling pattern di JS/TS.
- TypeScript advanced types: generics, utility types, mapped types, conditional types, discriminated unions.
- Runtime validation vs static typing.
- Desain type yang maintainable untuk domain kompleks.

### 02. Node.js Internals dan Backend Reliability

Fokus agar Anda bisa menjelaskan kenapa service stabil atau gagal di production.

- Arsitektur runtime Node.js.
- Non-blocking I/O dan kapan bottleneck tetap terjadi.
- CPU-bound vs I/O-bound workload.
- Worker threads, clustering, process model.
- Connection pooling, timeout, retry, backoff.
- Idempotency untuk request yang bisa terulang.
- Graceful shutdown, health checks, readiness, liveness.
- Memory leak, event emitter leak, dan debugging dasar.
- Concurrency control pada service backend.

### 03. Frontend Architecture untuk Aplikasi Besar

Fokus agar Anda bisa memimpin codebase frontend yang tumbuh, bukan hanya menyelesaikan halaman.

- Arsitektur `Next.js` untuk aplikasi skala tim.
- Server Components vs Client Components.
- Data fetching strategy, caching, revalidation, invalidation.
- State management dan kapan memakai local state, server state, global state.
- Component boundaries dan folder/module organization.
- Design system, reusability, dan consistency.
- Frontend performance: rendering cost, memoization, bundling, code splitting.
- Error boundary, loading strategy, skeleton, resilience UX.
- Accessibility dan maintainability sebagai quality baseline.

### 04. Database, Transaction, dan Data Consistency

Ini area penting karena CV Anda sudah menyentuh integrasi PostgreSQL dan SQL Server; sekarang perlu naik ke level design reasoning.

- Normalization vs denormalization.
- Indexing, query planning, dan performance bottleneck.
- ACID, transaction boundary, isolation level, locking.
- Deadlock, phantom read, dirty read, lost update.
- Optimistic vs pessimistic locking.
- Data consistency antar service atau antar database.
- Outbox pattern, saga, compensating action.
- Rekonsiliasi data dan audit trail.
- Strategi migration schema yang aman.

### 05. API Design dan Integration Patterns

Fokus agar Anda bisa merancang interface sistem yang tahan perubahan.

- REST API design yang konsisten.
- Versioning strategy.
- Pagination, filtering, sorting, dan search semantics.
- Contract validation dan backward compatibility.
- Webhook, polling, message queue, event-driven integration.
- Idempotency key.
- Retry-safe integration.
- Failure mode lintas sistem.
- External dependency management dan timeout budgeting.

### 06. Performance Engineering

Anda sudah punya bukti optimasi performa; yang dibutuhkan sekarang adalah framework berpikir yang lebih senior.

- Cara ukur performa, bukan asumsi performa.
- Profiling frontend dan backend.
- Bottleneck analysis.
- N+1 query dan over-fetching.
- Caching strategy: browser, CDN, application, database.
- Lazy loading, streaming, batching, pagination.
- Throughput, latency, tail latency.
- Capacity thinking dan load expectation dasar.

### 07. Testing Strategy dan Quality Engineering

Fokus agar Anda bisa memilih level test yang tepat, bukan sekadar menambah coverage.

- Unit test, integration test, end-to-end test.
- Test pyramid dan trade-off nyata.
- Contract testing untuk integrasi.
- Mocking vs real dependency.
- Testing async flow dan race condition.
- Regression prevention pada refactor.
- Quality gate, static analysis, dan code review heuristics.
- Menentukan test mana yang bernilai dan mana yang noise.

### 08. Security Fundamentals untuk Full Stack

Topik ini sering jadi pembeda senior yang matang vs developer yang hanya bisa shipping.

- Authentication dan session management.
- Authorization model: RBAC, permission-based access.
- OWASP dasar untuk web app.
- XSS, CSRF, SQL injection, SSRF, insecure direct object reference.
- Secret handling dan config management.
- Input validation, output encoding, audit logging.
- Rate limiting dan abuse prevention.
- Secure API design.

### 09. System Design dan Distributed Systems

Ini topik yang paling sering muncul saat transisi ke senior.

- Requirement clarification dan estimasi beban.
- High-level design dan pemilihan komponen.
- Monolith vs modular monolith vs microservices.
- Sync vs async architecture.
- Queue, pub/sub, event-driven flow.
- Cache-aside dan invalidation problem.
- Single point of failure dan failure isolation.
- Consistency vs availability vs complexity.
- Trade-off design berdasarkan konteks bisnis.

### 10. Observability, Incident Response, dan Operability

Karena Anda sudah memakai `Elastic APM`, ini harus diperluas menjadi kemampuan incident ownership.

- Logging, metrics, tracing.
- SLI, SLO, SLA.
- Alert fatigue vs alert quality.
- Root cause analysis.
- Incident triage dan rollback decision.
- Runbook dan postmortem.
- Debugging production issue secara sistematis.
- Instrumentation yang membantu keputusan, bukan sekadar menambah log.

### 11. Cloud, Deployment, dan CI/CD

Tidak harus jadi DevOps specialist, tapi senior engineer harus paham jalur software ke production.

- Build pipeline dan release workflow.
- CI/CD fundamentals.
- Environment strategy: local, staging, production.
- Feature flag.
- Blue-green vs canary vs rolling deployment.
- Rollback strategy.
- Container basics dan runtime environment.
- Konfigurasi, secret, dan deployment safety.

### 12. Technical Leadership dan Komunikasi Senior

Kalau ini tidak dibangun, Anda akan tetap terlihat sebagai strong mid-level executor.

- Menulis design note atau ADR sederhana.
- Menjelaskan trade-off teknis ke stakeholder non-teknis.
- Code review yang tajam dan berguna.
- Breaking down problem dan membagi pekerjaan ke tim.
- Mentoring junior dan pair debugging.
- Mengangkat engineering standard, bukan hanya menyelesaikan task.
- Prioritization antara speed, quality, dan risk.
- Ownership lintas fungsi saat incident atau proyek kompleks.

## Urutan Eksekusi 12 Minggu

### Minggu 1-2

- `JavaScript dan TypeScript advanced`
- `Node.js internals`
- `Database transaction dan consistency`

### Minggu 3-4

- `API design dan integration patterns`
- `Testing strategy`
- `Security fundamentals`

### Minggu 5-6

- `Frontend architecture`
- `Performance engineering`
- `Observability dan incident handling`

### Minggu 7-8

- `System design`
- `Distributed systems basics`
- `Caching, queue, dan reliability pattern`

### Minggu 9-10

- `Cloud, deployment, dan CI/CD`
- `Operational excellence`
- `Failure recovery strategy`

### Minggu 11-12

- `Technical leadership`
- `Architecture communication`
- `Interview story refinement berbasis proyek nyata Anda`

## Cara Pakai Folder Ini

- Buat satu file per topik utama.
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

