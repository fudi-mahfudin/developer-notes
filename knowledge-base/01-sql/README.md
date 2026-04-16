# SQL Knowledge Base Index

Roadmap topik SQL dari fundamental sampai level senior.

## 01 - SQL Fundamentals
- Basic query: `SELECT`, `WHERE`, `ORDER BY`, `LIMIT` - Detail: [`01-basic-query-detail.md`](./01-basic-query-detail.md)
- `JOIN` dasar: `INNER`, `LEFT`, `RIGHT` - Detail: [`02-join-dasar-detail.md`](./02-join-dasar-detail.md)
- Agregasi: `COUNT`, `SUM`, `AVG`, `GROUP BY`, `HAVING` - Detail: [`03-agregasi-detail.md`](./03-agregasi-detail.md)
- Subquery dasar - Detail: [`04-subquery-dasar-detail.md`](./04-subquery-dasar-detail.md)
- DML: `INSERT`, `UPDATE`, `DELETE` - Detail: [`05-dml-insert-update-delete-detail.md`](./05-dml-insert-update-delete-detail.md)
- Data type, `NULL`, default value - Detail: [`06-data-type-null-default-detail.md`](./06-data-type-null-default-detail.md)
- Constraint: `PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, `NOT NULL` - Detail: [`07-constraints-detail.md`](./07-constraints-detail.md)

## 02 - SQL Intermediate
- CTE (`WITH`) untuk query kompleks - Detail: [`08-cte-detail.md`](./08-cte-detail.md)
- Window function: `ROW_NUMBER`, `RANK`, `LAG`, `LEAD` - Detail: [`09-window-function-detail.md`](./09-window-function-detail.md)
- Membaca execution plan dengan `EXPLAIN` - Detail: [`10-explain-query-plan-detail.md`](./10-explain-query-plan-detail.md)
- Index dasar: single index dan composite index - Detail: [`11-index-dasar-detail.md`](./11-index-dasar-detail.md)
- Transaction dasar: `BEGIN`, `COMMIT`, `ROLLBACK` - Detail: [`12-transaction-dasar-detail.md`](./12-transaction-dasar-detail.md)
- Isolation level dan anomali transaksi - Detail: [`13-isolation-level-detail.md`](./13-isolation-level-detail.md)
- Normalisasi (1NF-3NF) dan denormalisasi - Detail: [`14-normalisasi-denormalisasi-detail.md`](./14-normalisasi-denormalisasi-detail.md)

## 03 - SQL Advanced
- Query optimization berbasis bottleneck nyata - Detail: [`15-query-optimization-bottleneck-detail.md`](./15-query-optimization-bottleneck-detail.md)
- Join strategy dan cardinality awareness - Detail: [`16-join-strategy-cardinality-detail.md`](./16-join-strategy-cardinality-detail.md)
- Locking, blocking, deadlock, contention - Detail: [`17-locking-blocking-deadlock-contention-detail.md`](./17-locking-blocking-deadlock-contention-detail.md)
- Advanced indexing: covering, partial, expression index - Detail: [`18-advanced-indexing-detail.md`](./18-advanced-indexing-detail.md)
- Partitioning dan data retention strategy - Detail: [`19-partitioning-data-retention-detail.md`](./19-partitioning-data-retention-detail.md)
- Replication, read replica, consistency trade-off - Detail: [`20-replication-read-replica-consistency-detail.md`](./20-replication-read-replica-consistency-detail.md)
- Migration strategy minim downtime - Detail: [`21-migration-minim-downtime-detail.md`](./21-migration-minim-downtime-detail.md)
- Idempotency untuk operasi write kritikal - Detail: [`22-idempotency-write-kritikal-detail.md`](./22-idempotency-write-kritikal-detail.md)

## 04 - SQL Production & Reliability
- Backup dan restore drill - Detail: [`23-backup-restore-drill-detail.md`](./23-backup-restore-drill-detail.md)
- Monitoring database: latency, slow query, connection, cache hit - Detail: [`24-monitoring-database-detail.md`](./24-monitoring-database-detail.md)
- Incident handling: runaway query, lock storm, replication lag - Detail: [`25-incident-handling-database-detail.md`](./25-incident-handling-database-detail.md)
- Capacity planning: pertumbuhan data, index bloat, storage forecast - Detail: [`26-capacity-planning-detail.md`](./26-capacity-planning-detail.md)
- Rollback plan untuk perubahan schema - Detail: [`27-rollback-plan-schema-change-detail.md`](./27-rollback-plan-schema-change-detail.md)

## 05 - SQL Security & Compliance
- SQL injection prevention (parameterized query) - Detail: [`28-sql-injection-prevention-detail.md`](./28-sql-injection-prevention-detail.md)
- Least privilege dan role management - Detail: [`29-least-privilege-role-management-detail.md`](./29-least-privilege-role-management-detail.md)
- Encryption in transit dan at rest - Detail: [`30-encryption-transit-rest-detail.md`](./30-encryption-transit-rest-detail.md)
- Data masking/tokenization untuk PII - Detail: [`31-data-masking-tokenization-pii-detail.md`](./31-data-masking-tokenization-pii-detail.md)
- Data retention, purge, dan audit trail - Detail: [`32-data-retention-purge-audit-trail-detail.md`](./32-data-retention-purge-audit-trail-detail.md)

## 06 - SQL Analytics
- Data modeling dasar analytics: fact vs dimension - Detail: [`33-fact-vs-dimension-detail.md`](./33-fact-vs-dimension-detail.md)
- Funnel, cohort, retention query - Detail: [`34-funnel-cohort-retention-query-detail.md`](./34-funnel-cohort-retention-query-detail.md)
- Time-series aggregation dan timezone handling - Detail: [`35-time-series-timezone-detail.md`](./35-time-series-timezone-detail.md)
- Data quality checks (duplicate, null anomaly, referential issue) - Detail: [`36-data-quality-checks-detail.md`](./36-data-quality-checks-detail.md)

## 07 - SQL Senior Engineering Mindset
- Menentukan boundary transaksi DB vs orchestration aplikasi - Detail: [`37-boundary-transaksi-vs-orchestration-detail.md`](./37-boundary-transaksi-vs-orchestration-detail.md)
- Konsistensi data: strong vs eventual consistency - Detail: [`38-strong-vs-eventual-consistency-detail.md`](./38-strong-vs-eventual-consistency-detail.md)
- Mendesain schema untuk evolusi jangka panjang - Detail: [`39-schema-evolusi-jangka-panjang-detail.md`](./39-schema-evolusi-jangka-panjang-detail.md)
- Menulis ADR untuk keputusan data architecture - Detail: [`40-adr-data-architecture-detail.md`](./40-adr-data-architecture-detail.md)
- Review query dan migration dengan standar performa + risiko - Detail: [`41-review-query-migration-performa-risiko-detail.md`](./41-review-query-migration-performa-risiko-detail.md)

## 08 - Learning Path yang Direkomendasikan
- Praktik query real-world secara rutin - Detail: [`42-praktik-query-real-world-detail.md`](./42-praktik-query-real-world-detail.md)
- Biasakan cek `EXPLAIN ANALYZE` untuk query penting - Detail: [`43-explain-analyze-kebiasaan-detail.md`](./43-explain-analyze-kebiasaan-detail.md)
- Simulasi concurrency issue dan deadlock - Detail: [`44-simulasi-concurrency-deadlock-detail.md`](./44-simulasi-concurrency-deadlock-detail.md)
- Review slow query log mingguan - Detail: [`45-review-slow-query-log-mingguan-detail.md`](./45-review-slow-query-log-mingguan-detail.md)
- Tulis postmortem untuk incident database - Detail: [`46-postmortem-incident-database-detail.md`](./46-postmortem-incident-database-detail.md)

## 09 - Exit Criteria per Level
- **Junior**: mampu CRUD + join + agregasi dengan benar - Detail: [`47-exit-criteria-junior-sql-detail.md`](./47-exit-criteria-junior-sql-detail.md)
- **Mid**: mampu optimasi query dasar dan desain index tepat - Detail: [`48-exit-criteria-mid-sql-detail.md`](./48-exit-criteria-mid-sql-detail.md)
- **Senior**: mampu desain data architecture, cegah incident, dan menyelesaikan isu production - Detail: [`49-exit-criteria-senior-sql-detail.md`](./49-exit-criteria-senior-sql-detail.md)

## 10 - Roadmap Penutup
- Learning roadmap dan assessment penutup - Detail: [`50-learning-roadmap-assessment-detail.md`](./50-learning-roadmap-assessment-detail.md)
