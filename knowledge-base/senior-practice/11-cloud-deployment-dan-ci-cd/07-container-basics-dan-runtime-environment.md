# Container Basics dan Runtime Environment

## Tujuan

Dokumen ini menjelaskan dasar **container** sebagai unit deploy, hubungannya dengan **runtime** (containerd, CRI-O), orkestrasi, dan implikasi performa, keamanan, dan debugging.

## Kenapa Topik Ini Penting

- Banyak tim “pakai Docker/Kubernetes” tanpa memahami batas isolasi dan lifecycle.
- Kesalahpahaman image vs container vs pod menyebabkan konfigurasi buruk.

## Image vs container

### Image

Template read-only berisi filesystem aplikasi dan metadata. **Immutable** setelah build (digest).

### Container

Instance menjalankan dari image dengan writable layer (overlay) dan cgroup/namespace.

Beberapa container bisa dari image sama dengan konfigurasi berbeda.

## Layer dan ukuran image

Layer caching mempercepat pull/build tetapi menumpuk kerentanan jika base tidak di-update terencana.

Praktik:

- multi-stage build;
- minimal base (distroless, alpine dengan hati-hati libc);
- scan image untuk CVE.

## Namespace dan isolasi

Container memakai Linux namespaces untuk PID, network, mount, dll.

Ini **bukan VM penuh**—kernel shared. Kernel exploit berdampak lintas container pada host yang sama.

## cgroup dan resource limits

### CPU

Requests dan limits mempengaruh scheduling dan throttling. Throttling berlebihan menghasilkan latency tail.

### Memory

Limit keras dapat mengakibatkan OOMKill—pahami working set aplikasi.

### Ephemeral storage

Log besar di container writable layer dapat mengisi disk node.

## Signals dan PID 1

Proses utama harus menangani **SIGTERM** untuk graceful shutdown.

PID 1 memiliki perilaku signal khusus—gunakan init kecil atau tini jika diperlukan.

## Health checks

### Liveness

Apakah container harus direstart?

Salah konfigurasi dapat restart loop saat dependency eksternal down.

### Readiness

Apakah container siap menerima traffic?

Pisahkan dari liveness untuk menghindari traffic ke instance belum siap.

## Networking dasar

Mode umum:

- bridge untuk dev;
- overlay/CNI di cluster.

Pahami port mapping vs service discovery di Kubernetes.

## Volume dan persistensi

Container stateless idealnya; state di volume terkelola atau layanan eksternal.

Mount permission dan SELinux/AppArmor bisa mempengaruhi path file.

## Security baseline

- non-root user;
- read-only root filesystem bila memungkinkan;
- drop capabilities;
- seccomp/apparmor profile sesuai kebutuhan;
- jangan embed secret di image.

## Observability di container

- stdout/stderr ke agen log;
- metrik cAdvisor/node exporter;
- trace exporter sidecar vs in-process—trade-off resource.

## Debugging

`kubectl exec` / `docker exec` untuk inspeksi singkat.

Jangan mengandalkan debug shell permanen di image produksi tanpa kebijakan.

## Anti-pattern

### Container sebagai VM “snowflake”

Banyak manual change di dalam container yang hilang saat restart.

### Tidak ada limit resource

Noisy neighbor di node.

### Logging ke file tanpa rotasi di dalam container

Isi disk.

### Menjalankan multiple unrelated proses tanpa supervisi

Signal handling buruk.

## Heuristik senior

1. Profil memory/CPU di staging sebelum set limit produksi.
2. Scan image di CI; blok CVE kritis sesuai kebijakan.
3. Uji graceful shutdown secara rutin.

## Pertanyaan interview

### Dasar

- Apa beda image dan container?
- Apa itu cgroup?

### Menengah

- Perbedaan liveness dan readiness?
- Kenapa PID 1 penting untuk shutdown?

### Senior

- Bagaimana Anda mendesain security context untuk workload multi-tenant?

## Kasus nyata

- Aplikasi Java OOMKilled karena heap + off-heap melebihi limit container tanpa `-XX:MaxRAMPercentage`—alignment JVM dengan cgroup.

## Ringkasan brutal

- Container adalah **packaging + isolasi proses**, bukan sihir keamanan atau performa.

## Checklist

- [ ] Resource requests/limits diset berdasarkan data.
- [ ] Non-root dan secret tidak di image.
- [ ] Health check terpisah liveness/readiness.
- [ ] Graceful shutdown diuji.

## Penutup

Memahami runtime menjembatani tim aplikasi dan platform—kurangi blame game saat node pressure.

## Kedalaman: init containers

Untuk migrasi sekali atau fetch secret—pisahkan dari container utama agar lifecycle jelas.

## Kedalaman: sidecar pattern

Logging/mesh sidecar menambah CPU/memori—hitung dalam kapasitas node.

## Latihan meja

Hitung overhead sidecar untuk N pod per node—apakah masih layak economically?

## Glosarium

- **CNI**: plugin jaringan Kubernetes.

## Ekstensi: Windows containers

Model berbeda dari Linux—tim cross-platform perlu dokumentasi terpisah.

## Penutup organisasi

Golden path template Dockerfile dan Helm chart mengurangi variasi berbahaya.

## Lampiran: minimal Dockerfile review

- user non-root;
- hanya port yang perlu exposed;
- HEALTHCHECK jika runtime mendukung dan sesuai orchestrator.

## Refleksi

Jika debug produksi selalu membutuhkan `exec` karena tidak ada metrik/log, perbaiki observability, bukan shell.

## Penutup akhir

Container basics yang solid membuat keputusan **scaling dan keamanan** didukung data, bukan mitos “Kubernetes akan menyelesaikan”.
