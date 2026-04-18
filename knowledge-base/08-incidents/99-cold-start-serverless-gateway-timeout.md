# #99 — Cold start serverless → gateway timeout pada integrasi lambat

**Indeks:** [`README.md`](./README.md) · **ID:** `#99` · **Kategori:** Infrastruktur & operasi

---

## Ringkasan

Fungsi **serverless** (Lambda/Cloud Functions) mengalami **cold start** saat idle—menambahkan ratusan ms hingga detik sebelum kode Node berjalan. Jika API Gateway atau load balancer memiliki **timeout lebih pendek** dari cold start + integrasi eksternal lambat, klien melihat **504** meskipun fungsi akhirnya selesai—mengganggu webhook kesehatan dan callback pembayaran.

---

## Mitigasi ideal (~60 detik)

“Gunakan **provisioned concurrency**, **minimal instances**, atau arahkan endpoint kritis ke layanan selalu-on. Naikkan timeout gateway selaras dengan SLA integrasi; gunakan **async pattern** dengan queue untuk kerja panjang. Pantau cold start metrics dan optimalkan bundle JS—pakai bundler tree-shake.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Cold start:** inisialisasi runtime/container baru untuk fungsi.

---

## Mengapa pola ini sangat umum di healthcare

1. Integrasi webhook tidak sering memicu warm instances.
2. Bundle Lambda besar meningkatkan init time.
3. VPC attachment menambah latency cold start.

---

## Pola gagal (ilustrasi)

Timeout API Gateway 29 detik tetapi fungsi cold start + FHIR call = 35 detik.

---

## Gejala di production

- Webhook vendor gagal intermittens tanpa pola jam tertentu.

---

## Diagnosis

1. CloudWatch/X-Ray traces cold start vs duration.
2. Bandingkan dengan keep-alive pings.

---

## Mitigasi yang disarankan

1. Scheduled ping untuk warm-up (dengan biaya sadar).
2. Pisahkan jalur latency sensitif ke container.

---

## Trade-off dan risiko

- Provisioned concurrency meningkatkan biaya—hitung vs dampak klinis.

---

## Aspek khusus healthcare

- Callback pembayaran gagal dapat menahan pengobatan—prioritas bisnis tinggi.

---

## Checklist review PR

- [ ] Fungsi serverless kritis memiliki strategi cold start dan tes timeout end-to-end.

---

## Kata kunci untuk pencarian

`cold start`, `Lambda`, `provisioned concurrency`, `API Gateway timeout`

---

## Skenario regresi yang disarankan

1. Paksa cold start di staging—ukur total latency hingga respons klien.
2. Matikan warm traffic selama satu jam lalu picu webhook.

---

## KPI pemantauan

- Persentase invokasi dengan init duration > threshold.

---

## Catatan tambahan operasional

Cantumkan **architecture decision** mengapa endpoint tertentu tidak serverless—dokumentasi untuk auditor cloud.

---

## Referensi internal

- [`README.md`](./README.md) · **#18**, **#34**.
