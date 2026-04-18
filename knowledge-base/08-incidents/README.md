# Indeks insiden & bug production (Healthcare + JavaScript)

Panduan ini mengindeks **100 pola masalah** yang sering muncul di **environment production** pada sistem healthcare yang dibangun dengan stack JavaScript (Node.js, worker, browser/SPA). Pola bersifat umum lintas vendor; konteks contoh mengacu pada API klinis, pasien, jadwal, dan integrasi.

**Cakupan:** backend (DB, async, antrian), runtime Node, frontend/edge, keamanan & compliance, domain healthcare & integrasi, infrastruktur.

---

## Daftar isi

| Kategori | Rentang ID | Jumlah |
|----------|------------|--------|
| [Database & transaksi](#database--transaksi) | #01–#30 | 30 |
| [Async, reliability & antrian](#async-reliability--antrian) | #31–#42 | 12 |
| [Worker, cron, lock terdistribusi & cache](#worker-cron-lock-terdistribusi--cache) | #43–#50 | 8 |
| [Runtime Node.js & waktu](#runtime-nodejs--waktu) | #51–#60 | 10 |
| [Frontend & edge (browser / proxy)](#frontend--edge-browser--proxy) | #61–#74 | 14 |
| [Keamanan, compliance & identitas](#keamanan-compliance--identitas) | #75–#86 | 12 |
| [Domain healthcare & integrasi](#domain-healthcare--integrasi) | #87–#98 | 12 |
| [Infrastruktur & operasi](#infrastruktur--operasi) | #99–#100 | 2 |

---

## Dokumen detail

| ID | Topik | File |
|----|--------|------|
| #01 | N+1 query pada daftar encounter / pasien | [`01-n-plus-one-daftar-encounter.md`](./01-n-plus-one-daftar-encounter.md) |
| #02 | N+1 pada eager loading ORM yang salah konfigurasi | [`02-n-plus-one-eager-loading-orm-salah-konfigurasi.md`](./02-n-plus-one-eager-loading-orm-salah-konfigurasi.md) |
| #03 | Query tanpa index pada kolom filter high-cardinality (MRN, encounter_id, dll.) | [`03-query-tanpa-index-filter-high-cardinality.md`](./03-query-tanpa-index-filter-high-cardinality.md) |
| #04 | Terlalu banyak index → write lambat dan maintenance berat | [`04-terlalu-banyak-index-write-lambat.md`](./04-terlalu-banyak-index-write-lambat.md) |
| #05 | Partial / composite index salah urutan kolom | [`05-partial-composite-index-urutan-salah.md`](./05-partial-composite-index-urutan-salah.md) |
| #06 | Query plan berubah setelah statistik / `ANALYZE` → regresi performa | [`06-query-plan-berubah-setelah-analyze.md`](./06-query-plan-berubah-setelah-analyze.md) |
| #07 | Full table scan karena fungsi pada kolom terindeks (`WHERE LOWER(email)`, dll.) | [`07-full-table-scan-fungsi-pada-kolom-terindeks.md`](./07-full-table-scan-fungsi-pada-kolom-terindeks.md) |
| #08 | Pagination `OFFSET` besar → timeout | [`08-pagination-offset-besar-timeout.md`](./08-pagination-offset-besar-timeout.md) |
| #09 | Cursor pagination salah implementasi → duplikat atau hilang baris | [`09-cursor-pagination-salah-duplikat-hilang.md`](./09-cursor-pagination-salah-duplikat-hilang.md) |
| #10 | `SELECT *` membawa blob besar tanpa kebutuhan | [`10-select-star-blob-besar.md`](./10-select-star-blob-besar.md) |
| #11 | JOIN berlebihan pada materialized view yang stale | [`11-join-materialized-view-stale.md`](./11-join-materialized-view-stale.md) |
| #12 | Deadlock dua transaksi dengan urutan akses resource berbeda | [`12-deadlock-urutan-akses-resource.md`](./12-deadlock-urutan-akses-resource.md) |
| #13 | Lock timeout pada row “hot” (counter, slot jadwal) | [`13-lock-timeout-row-panas.md`](./13-lock-timeout-row-panas.md) |
| #14 | Transaction scope terlalu lebar → blocking panjang | [`14-transaction-scope-terlalu-lebar.md`](./14-transaction-scope-terlalu-lebar.md) |
| #15 | Isolation level → phantom read pada skenario booking | [`15-isolation-phantom-read-booking.md`](./15-isolation-phantom-read-booking.md) |
| #16 | Connection pool kehabisan koneksi saat lonjakan traffic | [`16-connection-pool-kehabisan-koneksi.md`](./16-connection-pool-kehabisan-koneksi.md) |
| #17 | Connection leak (koneksi tidak dilepas pada error path) | [`17-connection-leak-error-path.md`](./17-connection-leak-error-path.md) |
| #18 | Tanpa statement timeout → satu query mengunci worker | [`18-tanpa-statement-timeout.md`](./18-tanpa-statement-timeout.md) |
| #19 | Replica lag → user membaca data usang setelah write | [`19-replica-lag-data-usang.md`](./19-replica-lag-data-usang.md) |
| #20 | Tulis ke primary, baca dari replica tanpa konsistensi sesi | [`20-write-primary-read-replica-inkonsisten.md`](./20-write-primary-read-replica-inkonsisten.md) |
| #21 | Migration mengunci tabel terlalu lama di production | [`21-migration-mengunci-tabel-lama.md`](./21-migration-mengunci-tabel-lama.md) |
| #22 | Migration tidak idempotent → partial state | [`22-migration-tidak-idempotent.md`](./22-migration-tidak-idempotent.md) |
| #23 | Filter soft delete lupa diterapkan di satu endpoint | [`23-soft-delete-filter-lupa-endpoint.md`](./23-soft-delete-filter-lupa-endpoint.md) |
| #24 | Hard delete vs kebijakan retain bentrok dengan foreign key | [`24-hard-delete-retain-foreign-key.md`](./24-hard-delete-retain-foreign-key.md) |
| #25 | Race pada unique constraint → baris duplikat saat burst insert | [`25-race-unique-constraint-duplikat.md`](./25-race-unique-constraint-duplikat.md) |
| #26 | Asumsi penanganan sequence / UUID collision salah | [`26-sequence-uuid-collision-asumsi.md`](./26-sequence-uuid-collision-asumsi.md) |
| #27 | Query JSON / JSONB tanpa index yang sesuai | [`27-json-jsonb-tanpa-index.md`](./27-json-jsonb-tanpa-index.md) |
| #28 | Typo enum / string status vs constraint database | [`28-typo-enum-string-vs-constraint.md`](./28-typo-enum-string-vs-constraint.md) |
| #29 | Trigger DB dengan efek samping tidak terdokumentasi di aplikasi | [`29-trigger-db-efek-samping-tidak-terdokumentasi.md`](./29-trigger-db-efek-samping-tidak-terdokumentasi.md) |
| #30 | Bulk insert tanpa batching → spike memori Node | [`30-bulk-insert-tanpa-batching.md`](./30-bulk-insert-tanpa-batching.md) |
| #31 | Unhandled promise rejection di request handler | [`31-unhandled-promise-rejection-handler.md`](./31-unhandled-promise-rejection-handler.md) |
| #32 | Waterfall `async` tanpa parallelisasi yang tepat → latency tinggi | [`32-waterfall-async-tanpa-paralelisasi.md`](./32-waterfall-async-tanpa-paralelisasi.md) |
| #33 | `Promise.all` pada dependensi tidak jelas → partial failure kabur | [`33-promise-all-dependensi-kabur.md`](./33-promise-all-dependensi-kabur.md) |
| #34 | Retry tanpa exponential backoff → thundering herd ke DB / API | [`34-retry-tanpa-exponential-backoff.md`](./34-retry-tanpa-exponential-backoff.md) |
| #35 | Retry pada operasi non-idempoten → duplikat order / charge | [`35-retry-non-idempotent-duplikat-order.md`](./35-retry-non-idempotent-duplikat-order.md) |
| #36 | Idempotency key hilang atau hanya ada di client | [`36-idempotency-key-hilang-client-only.md`](./36-idempotency-key-hilang-client-only.md) |
| #37 | Pengiriman webhook duplicate → tugas klinis duplikat | [`37-webhook-duplicate-tugas-klinis-duplikat.md`](./37-webhook-duplicate-tugas-klinis-duplikat.md) |
| #38 | Tanpa outbox → pesan hilang antara commit DB dan queue | [`38-tanpa-outbox-pesan-hilang-antara-db-dan-queue.md`](./38-tanpa-outbox-pesan-hilang-antara-db-dan-queue.md) |
| #39 | Poison message tanpa DLQ yang jelas | [`39-poison-message-tanpa-dlq.md`](./39-poison-message-tanpa-dlq.md) |
| #40 | Worker concurrency terlalu tinggi → overwhelm DB / API | [`40-worker-concurrency-tinggi-overwhelm-db-api.md`](./40-worker-concurrency-tinggi-overwhelm-db-api.md) |
| #41 | Cron overlap (job lama belum selesai, job baru berjalan) | [`41-cron-overlap-job-lama-belum-selesai.md`](./41-cron-overlap-job-lama-belum-selesai.md) |
| #42 | Scheduled job salah timezone atau boundary DST | [`42-scheduled-job-timezone-dst.md`](./42-scheduled-job-timezone-dst.md) |
| #43 | TTL distributed lock terlalu pendek → double execution | [`43-ttl-distributed-lock-pendek-double-execution.md`](./43-ttl-distributed-lock-pendek-double-execution.md) |
| #44 | Lock tidak di-release saat crash → blocking hingga TTL habis | [`44-lock-tidak-di-release-saat-crash.md`](./44-lock-tidak-di-release-saat-crash.md) |
| #45 | Cache stampede pada key panas (jadwal dokter populer, dll.) | [`45-cache-stampede-key-panas.md`](./45-cache-stampede-key-panas.md) |
| #46 | Invalidasi cache terlalu agresif → load spike | [`46-invalidasi-cache-agresif-load-spike.md`](./46-invalidasi-cache-agresif-load-spike.md) |
| #47 | Cache stale untuk authorization / role | [`47-cache-stale-authorization-role.md`](./47-cache-stale-authorization-role.md) |
| #48 | Redis single-thread blocking oleh operasi berat | [`48-redis-blocking-operasi-berat.md`](./48-redis-blocking-operasi-berat.md) |
| #49 | Session store Redis down → logout massal / error generik | [`49-session-store-redis-down-logout-massal.md`](./49-session-store-redis-down-logout-massal.md) |
| #50 | Cache in-memory per instance → inkonsistensi antar pod | [`50-cache-in-memory-per-pod-inkonsisten.md`](./50-cache-in-memory-per-pod-inkonsisten.md) |
| #51 | Event loop terblokir (`JSON.parse` payload FHIR sangat besar) | [`51-event-loop-json-parse-fhir-bundle-besar.md`](./51-event-loop-json-parse-fhir-bundle-besar.md) |
| #52 | Operasi crypto / hash sinkron di jalur request panas | [`52-crypto-hash-sinkron-jalur-panas.md`](./52-crypto-hash-sinkron-jalur-panas.md) |
| #53 | Memory leak: closure menahan buffer PDF / string besar | [`53-memory-leak-closure-buffer-pdf.md`](./53-memory-leak-closure-buffer-pdf.md) |
| #54 | Memory leak: listener EventEmitter tidak di-remove | [`54-memory-leak-eventemitter-listener.md`](./54-memory-leak-eventemitter-listener.md) |
| #55 | Stream tidak di-destroy pada error → resource leak | [`55-stream-tidak-destroy-pada-error-resource-leak.md`](./55-stream-tidak-destroy-pada-error-resource-leak.md) |
| #56 | State global mutable lintas request (anti-pattern singleton) | [`56-state-global-mutable-lintas-request.md`](./56-state-global-mutable-lintas-request.md) |
| #57 | `Date` native tanpa zona → kesalahan boundary DST | [`57-date-native-tanpa-zona-dst.md`](./57-date-native-tanpa-zona-dst.md) |
| #58 | Konversi “local midnight” untuk recurring appointment salah hari | [`58-local-midnight-recurring-appointment.md`](./58-local-midnight-recurring-appointment.md) |
| #59 | ISO string tanpa offset disalahartikan sebagai UTC | [`59-iso-string-tanpa-offset-disalahartikan-utc.md`](./59-iso-string-tanpa-offset-disalahartikan-utc.md) |
| #60 | Round-trip timezone hasil lab vs server vs zona pengguna | [`60-round-trip-timezone-lab-server-user.md`](./60-round-trip-timezone-lab-server-user.md) |
| #61 | Wrong patient context: race saat ganti pasien cepat di SPA | [`61-wrong-patient-context-race-spa.md`](./61-wrong-patient-context-race-spa.md) |
| #62 | Stale React state → menampilkan catatan pasien sebelumnya | [`62-stale-react-state-catatan-pasien.md`](./62-stale-react-state-catatan-pasien.md) |
| #63 | Race fetch: respons lambat menimpa respons baru | [`63-race-fetch-respons-lambat-menimpa.md`](./63-race-fetch-respons-lambat-menimpa.md) |
| #64 | Optimistic UI rollback gagal tanpa sinyal jelas ke pengguna | [`64-optimistic-ui-rollback-gagal-tanpa-sinyal.md`](./64-optimistic-ui-rollback-gagal-tanpa-sinyal.md) |
| #65 | Form controlled tidak reset saat navigasi | [`65-form-controlled-tidak-reset-navigasi.md`](./65-form-controlled-tidak-reset-navigasi.md) |
| #66 | Debounce search mengirim query dengan konteks ID salah | [`66-debounce-search-konteks-id-salah.md`](./66-debounce-search-konteks-id-salah.md) |
| #67 | Infinite scroll memuat duplikat saat filter berubah mid-flight | [`67-infinite-scroll-duplikat-saat-filter-berubah.md`](./67-infinite-scroll-duplikat-saat-filter-berubah.md) |
| #68 | WebSocket reconnect → subscription dobel → update duplikat | [`68-websocket-reconnect-subscription-dobel.md`](./68-websocket-reconnect-subscription-dobel.md) |
| #69 | SSE connection drop tanpa backoff → polling agresif | [`69-sse-drop-polling-agresif.md`](./69-sse-drop-polling-agresif.md) |
| #70 | Upload file besar timeout di reverse proxy tanpa chunk | [`70-upload-besar-reverse-proxy-timeout.md`](./70-upload-besar-reverse-proxy-timeout.md) |
| #71 | Presigned URL kedaluwarsa saat upload lambat | [`71-presigned-url-kedaluwarsa-upload-lambat.md`](./71-presigned-url-kedaluwarsa-upload-lambat.md) |
| #72 | Virus scan async gagal → status “ready” palsu untuk dokumen klinis | [`72-virus-scan-async-status-ready-palsu.md`](./72-virus-scan-async-status-ready-palsu.md) |
| #73 | MIME sniff salah → viewer error hanya di production | [`73-mime-sniff-salah-viewer-error-production.md`](./73-mime-sniff-salah-viewer-error-production.md) |
| #74 | CSP memblokir script pihak ketiga baru tanpa deploy koordinasi | [`74-csp-memblokir-script-pihak-ketiga-baru.md`](./74-csp-memblokir-script-pihak-ketiga-baru.md) |
| #75 | PHI di `console.log` / client error reporter | [`75-phi-console-log-client-error-reporter.md`](./75-phi-console-log-client-error-reporter.md) |
| #76 | PHI di query string URL (referrer leak) | [`76-phi-query-string-referrer-leak.md`](./76-phi-query-string-referrer-leak.md) |
| #77 | Stack trace ke third-party tanpa scrubbing | [`77-stack-trace-third-party-tanpa-scrubbing.md`](./77-stack-trace-third-party-tanpa-scrubbing.md) |
| #78 | IDOR: akses resource tanpa validasi konteks pasien | [`78-idor-tanpa-validasi-konteks-pasien.md`](./78-idor-tanpa-validasi-konteks-pasien.md) |
| #79 | Pengecekan role hanya di frontend | [`79-role-check-hanya-frontend.md`](./79-role-check-hanya-frontend.md) |
| #80 | Break-glass tanpa audit trail memadai | [`80-break-glass-audit-trail-tidak-memadai.md`](./80-break-glass-audit-trail-tidak-memadai.md) |
| #81 | Audit log tidak mencakup before/after yang bermakna | [`81-audit-log-tanpa-before-after-bermakna.md`](./81-audit-log-tanpa-before-after-bermakna.md) |
| #82 | Break-glass tanpa alasan wajib → gap compliance | [`82-break-glass-tanpa-alasan-wajib.md`](./82-break-glass-tanpa-alasan-wajib.md) |
| #83 | Rate limiting lemah pada portal pasien | [`83-rate-limit-portal-pasien-lemah.md`](./83-rate-limit-portal-pasien-lemah.md) |
| #84 | Rotasi API key tidak atomic dengan deploy → downtime auth | [`84-rotasi-api-key-tidak-atomic-deploy.md`](./84-rotasi-api-key-tidak-atomic-deploy.md) |
| #85 | JWT clock skew antar service → 401 sporadis | [`85-jwt-clock-skew-intermittent-401.md`](./85-jwt-clock-skew-intermittent-401.md) |
| #86 | Tanpa deteksi reuse refresh token | [`86-tanpa-deteksi-reuse-refresh-token.md`](./86-tanpa-deteksi-reuse-refresh-token.md) |
| #87 | Versi resource FHIR di cache vs server tidak konsisten | [`87-fhir-cache-versus-server-version-tidak-konsisten.md`](./87-fhir-cache-versus-server-version-tidak-konsisten.md) |
| #88 | FHIR `_include` / `_revinclude` tanpa batas → timeout | [`88-fhir-include-revinclude-tanpa-batas.md`](./88-fhir-include-revinclude-tanpa-batas.md) |
| #89 | Parsing HL7: field opsional berbeda antar vendor → null silent | [`89-hl7-field-opsional-vendor-null-silent.md`](./89-hl7-field-opsional-vendor-null-silent.md) |
| #90 | Encoding HL7 (UTF-8 vs ISO-8859-1) → karakter nama rusak | [`90-hl7-encoding-utf8-vs-latin1.md`](./90-hl7-encoding-utf8-vs-latin1.md) |
| #91 | Penanganan ACK/NACK salah → pesan dianggap terkirim | [`91-penanganan-ack-nack-hilang-pesan.md`](./91-penanganan-ack-nack-hilang-pesan.md) |
| #92 | Mapping kode ICD / SNOMED / LOINC versi lama → downstream salah | [`92-mapping-kode-clinical-versi-lama.md`](./92-mapping-kode-clinical-versi-lama.md) |
| #93 | Merge pasien salah → catatan tertaut ke individu salah | [`93-merge-pasien-salah-catatan-tertaut.md`](./93-merge-pasien-salah-catatan-tertaut.md) |
| #94 | MPI match threshold terlalu longgar atau ketat | [`94-mpi-match-threshold-longgar-atau-ketat.md`](./94-mpi-match-threshold-longgar-atau-ketat.md) |
| #95 | Race pada decrement inventory → stok negatif / oversell | [`95-race-decrement-inventory-stok-negatif.md`](./95-race-decrement-inventory-stok-negatif.md) |
| #96 | Cache aturan interaksi obat stale setelah update formularium | [`96-cache-aturan-interaksi-obat-stale-formularium.md`](./96-cache-aturan-interaksi-obat-stale-formularium.md) |
| #97 | Modality worklist disconnect → prosedur tidak sampai modality | [`97-modality-worklist-disconnect-prosedur-tidak-sampai.md`](./97-modality-worklist-disconnect-prosedur-tidak-sampai.md) |
| #98 | Routing pager / on-call salah jam → SLA breach tampak sebagai bug aplikasi | [`98-pager-oncall-routing-jam-salah.md`](./98-pager-oncall-routing-jam-salah.md) |
| #99 | Cold start serverless → gateway timeout pada integrasi lambat | [`99-cold-start-serverless-gateway-timeout.md`](./99-cold-start-serverless-gateway-timeout.md) |
| #100 | Disk penuh pada volume attachment → upload gagal dengan pesan tidak jelas | [`100-disk-penuh-volume-attachment-upload-gagal.md`](./100-disk-penuh-volume-attachment-upload-gagal.md) |

---

## Database & transaksi

| ID | Pola |
|----|------|
| #01 | N+1 query pada daftar encounter / pasien |
| #02 | N+1 pada eager loading ORM yang salah konfigurasi |
| #03 | Query tanpa index pada kolom filter high-cardinality (MRN, encounter_id, dll.) |
| #04 | Terlalu banyak index → write lambat dan maintenance berat |
| #05 | Partial / composite index salah urutan kolom |
| #06 | Query plan berubah setelah statistik / `ANALYZE` → regresi performa |
| #07 | Full table scan karena fungsi pada kolom terindeks (`WHERE LOWER(email)`, dll.) |
| #08 | Pagination `OFFSET` besar → timeout |
| #09 | Cursor pagination salah implementasi → duplikat atau hilang baris |
| #10 | `SELECT *` membawa blob besar tanpa kebutuhan |
| #11 | JOIN berlebihan pada materialized view yang stale |
| #12 | Deadlock dua transaksi dengan urutan akses resource berbeda |
| #13 | Lock timeout pada row “hot” (counter, slot jadwal) |
| #14 | Transaction scope terlalu lebar → blocking panjang |
| #15 | Isolation level → phantom read pada skenario booking |
| #16 | Connection pool kehabisan koneksi saat lonjakan traffic |
| #17 | Connection leak (koneksi tidak dilepas pada error path) |
| #18 | Tanpa statement timeout → satu query mengunci worker |
| #19 | Replica lag → user membaca data usang setelah write |
| #20 | Tulis ke primary, baca dari replica tanpa konsistensi sesi |
| #21 | Migration mengunci tabel terlalu lama di production |
| #22 | Migration tidak idempotent → partial state |
| #23 | Filter soft delete lupa diterapkan di satu endpoint |
| #24 | Hard delete vs kebijakan retain bentrok dengan foreign key |
| #25 | Race pada unique constraint → baris duplikat saat burst insert |
| #26 | Asumsi penanganan sequence / UUID collision salah |
| #27 | Query JSON / JSONB tanpa index yang sesuai |
| #28 | Typo enum / string status vs constraint database |
| #29 | Trigger DB dengan efek samping tidak terdokumentasi di aplikasi |
| #30 | Bulk insert tanpa batching → spike memori Node |

---

## Async, reliability & antrian

| ID | Pola |
|----|------|
| #31 | Unhandled promise rejection di request handler |
| #32 | Waterfall `async` tanpa parallelisasi yang tepat → latency tinggi |
| #33 | `Promise.all` pada dependensi tidak jelas → partial failure kabur |
| #34 | Retry tanpa exponential backoff → thundering herd ke DB / API |
| #35 | Retry pada operasi non-idempoten → duplikat order / charge |
| #36 | Idempotency key hilang atau hanya ada di client |
| #37 | Pengiriman webhook duplicate → tugas klinis duplikat |
| #38 | Tanpa outbox → pesan hilang antara commit DB dan queue |
| #39 | Poison message tanpa DLQ yang jelas |
| #40 | Worker concurrency terlalu tinggi → overwhelm DB / API |
| #41 | Cron overlap (job lama belum selesai, job baru berjalan) |
| #42 | Scheduled job salah timezone atau boundary DST |

---

## Worker, cron, lock terdistribusi & cache

| ID | Pola |
|----|------|
| #43 | TTL distributed lock terlalu pendek → double execution |
| #44 | Lock tidak di-release saat crash → blocking hingga TTL habis |
| #45 | Cache stampede pada key panas (jadwal dokter populer, dll.) |
| #46 | Invalidasi cache terlalu agresif → load spike |
| #47 | Cache stale untuk authorization / role |
| #48 | Redis single-thread blocking oleh operasi berat |
| #49 | Session store Redis down → logout massal / error generik |
| #50 | Cache in-memory per instance → inkonsistensi antar pod |

---

## Runtime Node.js & waktu

| ID | Pola |
|----|------|
| #51 | Event loop terblokir (`JSON.parse` payload FHIR sangat besar) |
| #52 | Operasi crypto / hash sinkron di jalur request panas |
| #53 | Memory leak: closure menahan buffer PDF / string besar |
| #54 | Memory leak: listener EventEmitter tidak di-remove |
| #55 | Stream tidak di-destroy pada error → resource leak |
| #56 | State global mutable lintas request (anti-pattern singleton) |
| #57 | `Date` native tanpa zona → kesalahan boundary DST |
| #58 | Konversi “local midnight” untuk recurring appointment salah hari |
| #59 | ISO string tanpa offset disalahartikan sebagai UTC |
| #60 | Round-trip timezone hasil lab vs server vs zona pengguna |

---

## Frontend & edge (browser / proxy)

| ID | Pola |
|----|------|
| #61 | Wrong patient context: race saat ganti pasien cepat di SPA |
| #62 | Stale React state → menampilkan catatan pasien sebelumnya |
| #63 | Race fetch: respons lambat menimpa respons baru |
| #64 | Optimistic UI rollback gagal tanpa sinyal jelas ke pengguna |
| #65 | Form controlled tidak reset saat navigasi |
| #66 | Debounce search mengirim query dengan konteks ID salah |
| #67 | Infinite scroll memuat duplikat saat filter berubah mid-flight |
| #68 | WebSocket reconnect → subscription dobel → update duplikat |
| #69 | SSE connection drop tanpa backoff → polling agresif |
| #70 | Upload file besar timeout di reverse proxy tanpa chunk |
| #71 | Presigned URL kedaluwarsa saat upload lambat |
| #72 | Virus scan async gagal → status “ready” palsu untuk dokumen klinis |
| #73 | MIME sniff salah → viewer error hanya di production |
| #74 | CSP memblokir script pihak ketiga baru tanpa deploy koordinasi |

---

## Keamanan, compliance & identitas

| ID | Pola |
|----|------|
| #75 | PHI di `console.log` / client error reporter |
| #76 | PHI di query string URL (referrer leak) |
| #77 | Stack trace ke third-party tanpa scrubbing |
| #78 | IDOR: akses resource tanpa validasi konteks pasien |
| #79 | Pengecekan role hanya di frontend |
| #80 | Break-glass tanpa audit trail memadai |
| #81 | Audit log tidak mencakup before/after yang bermakna |
| #82 | Break-glass tanpa alasan wajib → gap compliance |
| #83 | Rate limiting lemah pada portal pasien |
| #84 | Rotasi API key tidak atomic dengan deploy → downtime auth |
| #85 | JWT clock skew antar service → 401 sporadis |
| #86 | Tanpa deteksi reuse refresh token |

---

## Domain healthcare & integrasi

| ID | Pola |
|----|------|
| #87 | Versi resource FHIR di cache vs server tidak konsisten |
| #88 | FHIR `_include` / `_revinclude` tanpa batas → timeout |
| #89 | Parsing HL7: field opsional berbeda antar vendor → null silent |
| #90 | Encoding HL7 (UTF-8 vs ISO-8859-1) → karakter nama rusak |
| #91 | Penanganan ACK/NACK salah → pesan dianggap terkirim |
| #92 | Mapping kode ICD / SNOMED / LOINC versi lama → downstream salah |
| #93 | Merge pasien salah → catatan tertaut ke individu salah |
| #94 | MPI match threshold terlalu longgar atau ketat |
| #95 | Race pada decrement inventory → stok negatif / oversell |
| #96 | Cache aturan interaksi obat stale setelah update formularium |
| #97 | Modality worklist disconnect → prosedur tidak sampai modality |
| #98 | Routing pager / on-call salah jam → SLA breach tampak sebagai bug aplikasi |

---

## Infrastruktur & operasi

| ID | Pola |
|----|------|
| #99 | Cold start serverless → gateway timeout pada integrasi lambat |
| #100 | Disk penuh pada volume attachment → upload gagal dengan pesan tidak jelas |

---

## Penggunaan

- **Review PR / desain:** lacak ID sebagai checklist risiko (mis. #01, #19, #61).
- **Postmortem:** petakan insiden ke ID untuk pola berulang.
- **Onboarding:** baca per kategori sesuai peran (backend, frontend, compliance).

Dokumen ini adalah indeks. Penjelasan mendalam per topik `#01`–`#100` ada di folder yang sama (lihat [Dokumen detail](#dokumen-detail)); mitigasi lain dapat ditautkan dari runbook, ADR, atau materi SQL/Node di knowledge base lain.
