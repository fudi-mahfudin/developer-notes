# Testing Jest: Dasar Sampai Praktis

## Core Idea (Feynman Concept Applied)

Testing itu seperti checklist sebelum pesawat terbang. Tujuannya bukan membuktikan sempurna, tapi mengurangi risiko gagal saat dipakai.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Test memverifikasi perilaku kode secara otomatis.
- Unit test fokus fungsi kecil, integration test fokus alur komponen.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: test pyramid.
  - Kapan dipakai: mayoritas project.
  - Kelebihan: biaya test efisien.
  - Keterbatasan: coverage integration bisa kurang.
- Strategi 2: risk-based testing.
  - Kapan dipakai: domain kritikal.
  - Kelebihan: fokus area berdampak tinggi.
  - Keterbatasan: area non-prioritas bisa lolos bug.

### Risiko dan Pitfall
- Risiko 1: flaky test.
  - Gejala: test kadang gagal kadang lolos.
  - Dampak: CI tidak dipercaya.
  - Mitigasi: isolasi dependency dan deterministic setup.
- Risiko 2: coverage tinggi tapi tidak relevan.
  - Gejala: bug bisnis tetap lolos.
  - Dampak: false confidence.
  - Mitigasi: prioritaskan skenario bisnis inti.

### Pros dan Cons
- **Pros**
  - Refactor lebih aman.
  - Regression bug berkurang.
- **Cons**
  - Menambah effort awal.
  - Perlu maintenance test suite.

### Trade-off Praktis di Produksi
- Kecepatan delivery vs kedalaman pengujian.
- Coverage luas vs fokus risiko tinggi.
- Keputusan dari escaped defect dan CI duration.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Perhitungan billing**
  - Kondisi: formula berubah berkala.
  - Masalah tanpa strategi: invoice salah.
  - Solusi: unit test formula.
  - Hasil yang diharapkan: kalkulasi konsisten.
  - Catatan trade-off: test data harus selalu diperbarui.
- **Kasus 2: Alur create order**
  - Kondisi: melibatkan DB + API eksternal.
  - Masalah tanpa strategi: bug integrasi lolos.
  - Solusi: integration test jalur kritikal.
  - Hasil yang diharapkan: deploy lebih aman.
  - Catatan trade-off: waktu CI lebih panjang.

## Best Practices

- Uji logic bisnis kritikal lebih dulu.
- Nama test harus menjelaskan perilaku.
- Hindari test yang bergantung urutan/clock real.
- Pisahkan test cepat (unit) dan test mahal (integration) agar CI tetap efisien.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
import { describe, it, expect } from "@jest/globals";

function calcTotal(a: number, b: number) {
  return a + b;
}

describe("calcTotal", () => {
  it("menjumlahkan dua angka", () => {
    expect(calcTotal(2, 3)).toBe(5);
  });
});
```

## Checklist Pemahaman

- [ ] Bisa bedakan unit dan integration test.
- [ ] Bisa menulis test untuk edge case.
- [ ] Bisa menjelaskan risiko flaky test dan cara mitigasinya.
- [ ] Bisa menentukan prioritas test berbasis risiko bisnis.

## Latihan Mandiri

- Latihan 1 (basic): Tulis test untuk fungsi validasi payload.
- Latihan 2 (intermediate): Buat integration test untuk alur create order sederhana.
- Latihan 3 (simulasi produksi): Simulasikan pipeline CI test dengan kategori fast/slow tests dan tentukan aturan merge.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: flaky test rate, CI duration.
- Metrik bisnis: escaped defects.
- Ambang batas awal: flaky test < 2%.
