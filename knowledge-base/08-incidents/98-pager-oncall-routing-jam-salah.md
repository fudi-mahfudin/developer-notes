# #98 — Routing pager / on-call salah jam → SLA breach tampak sebagai bug aplikasi

**Indeks:** [`README.md`](./README.md) · **ID:** `#98` · **Kategori:** Domain healthcare & integrasi

---

## Ringkasan

Sistem **on-call** yang mengirim alert kritis (hasil lab STAT, alarm ventilator integrasi) bergantung pada **jadwal shift** dan zona waktu. Kesalahan konfigurasi DST, spreadsheet manual, atau integrasi Calendar API yang salah menyebabkan alert ke orang salah atau tertunda—sering disalahkan pada “bug aplikasi” meskipun akarnya operasional.

---

## Mitigasi ideal (~60 detik)

“Simpan jadwal on-call dalam DB dengan **timezone IANA**; otomatisasi rotasi melalui sistem terpusat; uji DST; sediakan override darurat dengan audit; integrasikan dengan PagerDuty/Opsgenie yang mengelola shift profesional.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Escalation policy:** rantai panggilan ketika level pertama tidak merespons.

---

## Mengapa pola ini sangat umum di healthcare

1. Jadwal dokter kompleks dengan subtitusi harian.
2. Campuran zona waktu untuk tele-specialist.
3. Dependensi spreadsheet manusia.

---

## Pola gagal (ilustrasi)

Pager diarahkan ke nomor lama setelah rotasi malam karena cron tidak memperbarui cache.

---

## Gejala di production

- Insiden kesehatan tidak ditanggapi tepat waktu—keluhan ke IT.

---

## Diagnosis

1. Audit trail pager vs jadwal aktual.
2. Korelasi dengan event DST.

---

## Mitigasi yang disarankan

1. Source of truth tunggal untuk jadwal.
2. Heartbeat test notifikasi harian non-intrusif.

---

## Trade-off dan risiko

- Terlalu banyak saluran alert menyebabkan fatigue—atur prioritas.

---

## Aspek khusus healthcare

- **Joint Commission** dan regulator setempat menekan respons waktu—routing salah berisiko reputasi besar.

---

## Checklist review PR

- [ ] Perubahan jadwal on-call memiliki tes timezone dan handoff manual terdokumentasi.

---

## Kata kunci untuk pencarian

`on-call`, `pager`, `PagerDuty`, `DST schedule`

---

## Skenario regresi yang disarankan

1. Simulasikan paging pada hari DST berubah.
2. Uji escalations ketika level pertama tidak menjawab.

---

## KPI pemantauan

- Mean time to acknowledge alert kritis vs SLA.

---

## Catatan tambahan operasional

Libatkan **kepala instalasi** dalam menyetujui kebijakan override pager darurat.

---

## Referensi internal

- [`README.md`](./README.md) · **#42**, **#57**.
