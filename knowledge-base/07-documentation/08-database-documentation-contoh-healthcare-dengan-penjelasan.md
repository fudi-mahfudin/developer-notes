# Contoh Database Documentation Healthcare (Dengan Penjelasan Belajar)

## 1. Ringkasan Model Data

Entitas utama:
- `patients`
- `doctors`
- `appointments`
- `appointment_audit_logs`
- `notification_jobs`

> Database documentation menjelaskan struktur data dan alasan desain, bukan sekadar daftar tabel.

## 2. Relasi Inti

- `patients (1) -> (N) appointments`
- `doctors (1) -> (N) appointments`
- `appointments (1) -> (N) appointment_audit_logs`
- `appointments (1) -> (N) notification_jobs`

> Relasi membantu engineer memahami cardinality dan dampak query/join.

## 3. Data Dictionary (Contoh)

### Tabel `patients`
- `id` UUID PK
- `full_name` VARCHAR(120) NOT NULL
- `phone_number` VARCHAR(20) UNIQUE NOT NULL
- `date_of_birth` DATE
- `created_at` TIMESTAMP NOT NULL

### Tabel `doctors`
- `id` UUID PK
- `full_name` VARCHAR(120) NOT NULL
- `specialization` VARCHAR(80) NOT NULL
- `is_active` BOOLEAN DEFAULT TRUE

### Tabel `appointments`
- `id` UUID PK
- `patient_id` UUID FK -> `patients.id`
- `doctor_id` UUID FK -> `doctors.id`
- `schedule_at` TIMESTAMP NOT NULL
- `channel` VARCHAR(20) CHECK (`onsite`,`teleconsult`)
- `status` VARCHAR(20) CHECK (`confirmed`,`cancelled`,`completed`,`no_show`)
- `created_at` TIMESTAMP NOT NULL

> Data dictionary harus cukup detail agar dev baru bisa query tanpa menebak.

## 4. Indexing Strategy

- Index komposit `appointments(doctor_id, schedule_at)` untuk pencarian slot.
- Index `appointments(patient_id, schedule_at)` untuk histori pasien.
- Index `notification_jobs(status, scheduled_at)` untuk worker queue.

> Dokumentasi index wajib karena performa sistem production sangat bergantung di sini.

## 5. Data Retention Policy

- `appointment_audit_logs` disimpan minimal 2 tahun.
- Data sensitif yang tidak relevan di-anonimkan setelah kebijakan retensi terpenuhi.

> Retensi data harus sinkron dengan regulasi dan kebijakan internal.

## 6. Contoh Query Operasional

```sql
SELECT doctor_id, COUNT(*) AS total_no_show
FROM appointments
WHERE status = 'no_show'
  AND schedule_at >= NOW() - INTERVAL '30 days'
GROUP BY doctor_id
ORDER BY total_no_show DESC;
```

> Menyertakan query contoh membantu tim analytics dan ops bergerak lebih cepat.
