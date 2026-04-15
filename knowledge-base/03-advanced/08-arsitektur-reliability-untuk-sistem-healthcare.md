# Arsitektur Reliability untuk Sistem Healthcare

## Core Idea (Feynman Concept Applied)

Sistem healthcare itu seperti IGD: tidak boleh mudah berhenti. Saat satu alat bermasalah, layanan utama tetap harus jalan.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Reliability healthcare menuntut availability tinggi, konsistensi data, dan audit trail.
- Critical flow harus tetap jalan meski dependency non-kritis bermasalah.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: graceful degradation.
  - Kapan dipakai: dependency eksternal tidak stabil.
  - Kelebihan: layanan inti tetap hidup.
  - Keterbatasan: fitur sekunder terbatas.
- Strategi 2: async isolation via queue.
  - Kapan dipakai: proses non-kritis.
  - Kelebihan: melindungi jalur transaksi utama.
  - Keterbatasan: eventual consistency.

### Risiko dan Pitfall
- Risiko 1: single point of failure.
  - Gejala: satu service down mematikan alur utama.
  - Dampak: operasional terganggu.
  - Mitigasi: fallback + redundancy.
- Risiko 2: audit log tidak lengkap.
  - Gejala: perubahan data tidak terlacak.
  - Dampak: compliance risk.
  - Mitigasi: standar audit trail wajib.

### Pros dan Cons
- **Pros**
  - Layanan kritikal lebih tahan gangguan.
  - Risiko operasional pasien menurun.
- **Cons**
  - Arsitektur dan operasi lebih kompleks.
  - Butuh koordinasi lintas tim yang kuat.

### Trade-off Praktis di Produksi
- Availability tinggi vs kompleksitas sistem.
- Konsistensi ketat vs kecepatan layanan.
- Keputusan dari SLO, incident frequency, dan dampak klinis.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Registrasi pasien saat vendor verifikasi lambat**
  - Kondisi: service verifikasi eksternal timeout.
  - Masalah tanpa strategi: frontdesk berhenti total.
  - Solusi: fallback mode + queue sinkronisasi.
  - Hasil yang diharapkan: registrasi tetap berjalan.
  - Catatan trade-off: verifikasi final tertunda.
- **Kasus 2: Order obat lintas modul**
  - Kondisi: farmasi dan billing berjalan bersamaan.
  - Masalah tanpa strategi: mismatch status.
  - Solusi: event-driven state + audit log.
  - Hasil yang diharapkan: jejak status konsisten.
  - Catatan trade-off: monitoring event pipeline wajib.

## Best Practices

- Definisikan SLA/SLO per fitur penting.
- Buat graceful degradation saat dependency gagal.
- Dokumentasikan SOP incident dan komunikasi lintas tim.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
async function getPatientSummary(id: string) {
  try {
    return await fetchPrimaryService(id);
  } catch {
    // fallback ke data cache agar UI tetap punya data minimal
    return fetchCachedSummary(id);
  }
}
```

## Checklist Pemahaman

- [ ] Tahu fitur mana yang termasuk critical flow.
- [ ] Tahu konsep graceful degradation.
- [ ] Tahu pentingnya audit log di domain healthcare.

## Latihan Mandiri

- Buat rancangan incident runbook untuk kasus API pasien timeout.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: uptime, error budget burn, incident MTTR.
- Metrik bisnis: gangguan layanan operasional.
- Ambang batas awal: availability flow kritikal > target SLO.
