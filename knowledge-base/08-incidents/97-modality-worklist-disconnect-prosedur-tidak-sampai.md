# #97 — Modality worklist disconnect → prosedur tidak sampai modality

**Indeks:** [`README.md`](./README.md) · **ID:** `#97` · **Kategori:** Domain healthcare & integrasi

---

## Ringkasan

Integrasi **DICOM Modality Worklist (MWL)** atau gateway setara mengirim jadwal prosedur imaging ke perangkat modalitas. **Disconnect** jaringan, restart PACS, atau bug HL7/ADT menyebabkan prosedur tidak muncul di modalitas—pasien datang tetapi tidak dapat diperiksa, atau pemeriksaan salah pasien jika worklist manual salah.

---

## Mitigasi ideal (~60 detik)

“Pantau **MQ antrian worklist** dengan alert; sediakan **fallback manual terdokumentasi** dan verifikasi identitas ketat; gunakan heartbeat dan reconnect otomatis; simpan log export MWL. Koordinasikan dengan radiologi untuk prosedur downtime.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **MWL:** daftar pekerjaan terjadwal untuk modalitas.

---

## Mengapa pola ini sangat umum di healthcare

1. Perangkat modalitas sering berada di subnet terpisah.
2. Perubahan firewall tanpa tes end-to-end.
3. Dual sistem RIS/PACS tidak sinkron.

---

## Pola gagal (ilustrasi)

ADT update tidak sampai ke worklist server—modalitas tidak melihat order baru.

---

## Gejala di production

- Antrean radiologi manual meningkat saat integrasi mati.

---

## Diagnosis

1. Trace pesan dari EMR ke worklist generator ke modalitas.
2. Korelasi dengan pekerjaan jaringan.

---

## Mitigasi yang disarankan

1. Monitoring file drop queue / HL7 feed.
2. Smoke test harian sintetis.

---

## Trade-off dan risiko

- Fallback manual meningkatkan risiko identitas—gunakan barcode wristband.

---

## Aspek khusus healthcare

- Keterlambatan diagnosis imaging berdampak pada pathway kanker—SLA ketat.

---

## Checklist review PR

- [ ] Perubahan jaringan radiologi menyertakan tes worklist end-to-end.

---

## Kata kunci untuk pencarian

`DICOM MWL`, `RIS PACS`, `HL7 ADT`, `imaging workflow`

---

## Skenario regresi yang disarankan

1. Matikan feed MWL sementara—alarm harus bunyi.
2. Uji dengan prosedur stat vs rutin.

---

## KPI pemantauan

- Usia tertua order tanpa entri worklist di modalitas.

---

## Catatan tambahan operasional

Cantumkan **runbook downtime imaging** yang melibatkan radiografer dan front desk.

---

## Referensi internal

- [`README.md`](./README.md) · **#91**.
