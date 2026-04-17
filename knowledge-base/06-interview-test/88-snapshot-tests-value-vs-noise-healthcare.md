# Q88 - Snapshot Test: Value vs Noise

## Pertanyaan Interview

Kapan snapshot test memberi nilai, dan kapan hanya jadi noise?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Snapshot test bernilai jika dipakai untuk output yang stabil
dan perubahan memang perlu ditinjau dengan cepat.
Tapi snapshot bisa jadi noise jika terlalu besar atau terlalu sering berubah,
sehingga reviewer hanya menekan 'update snapshot' tanpa analisis.

Saya membatasi snapshot pada komponen/output kecil yang deterministik,
dan tetap melengkapinya dengan assertion behavior penting.
Snapshot bukan pengganti test logika.
Di proyek healthcare, saya hindari snapshot masif
karena bisa menutupi perubahan kritikal di UI operasional." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa ciri snapshot berkualitas?"
2. "Kenapa snapshot sering diabaikan reviewer?"
3. "Bagaimana mengurangi snapshot noise?"
4. "Apakah snapshot cocok untuk dynamic data?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Snapshot berkualitas:
"Kecil, deterministik, dan merepresentasikan perilaku penting."

2) Diabaikan:
"Diff terlalu besar dan sering berubah tanpa konteks."

3) Kurangi noise:
"Split komponen, stabilkan data, batasi scope snapshot."

4) Dynamic data:
"Kurang cocok tanpa normalisasi/mocking nilai dinamis."

5) Anti-pattern:
"Snapshot seluruh halaman kompleks sebagai satu file besar."

## Jawaban Ideal (Versi Singkat, Level Senior)

Gunakan snapshot untuk:
- struktur output stabil
- visual/regression signal cepat

Jangan gunakan snapshot untuk:
- logic decision penting
- output sangat dinamis

## Penjelasan Detail yang Dicari Interviewer

### 1) Sumber noise snapshot

- timestamp/random IDs
- className generated dinamis
- komponen terlalu besar

### 2) Praktik terbaik

- snapshot per unit kecil
- normalize unstable fields
- kombinasikan dengan explicit assertions

### 3) Governance review

- wajib baca diff, bukan auto-approve
- snapshot update harus punya alasan jelas
- periodic cleanup snapshot usang

Mitigasi:
- lint rule snapshot size max
- golden snapshot untuk komponen kritikal tertentu
- flaky snapshot triage cepat

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
expect(renderedButton).toMatchSnapshot();
expect(renderedButton).toContain("Submit");
```

Snapshot + assertion eksplisit memberi confidence lebih baik.

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

UI healthcare sering punya elemen status kritikal.
Snapshot noise dapat menyamarkan perubahan visual yang penting.
Penggunaan snapshot yang disiplin menjaga sinyal review tetap tajam.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
snapshot besar diupdate otomatis.
perubahan label status kritikal tidak disadari reviewer.

Perbaikan:
- pecah snapshot per komponen kecil
- tambah assertion spesifik pada label/status kritikal

## Contoh Pola Kode yang Lebih Aman

```ts
type SnapshotPolicy = {
  maxLines: number;
  requiresExplicitAssertions: boolean;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan kapan snapshot bernilai.
- Menjelaskan sumber snapshot noise.
- Menjelaskan praktik terbaik snapshot.
- Menjelaskan kombinasi snapshot + assertion.
- Relevan untuk UI risiko tinggi healthcare.

## Ringkasan Final

Snapshot test berguna jika dipakai tepat sasaran.
Tanpa disiplin, snapshot berubah jadi kebisingan yang menipu.
Tujuan akhirnya adalah menjaga review signal tetap jelas
dan mendeteksi regresi yang benar-benar penting.
