# Q14 - `null` vs `undefined` dari Sisi Semantic Design API

## Pertanyaan Interview

Jelaskan `null` vs `undefined` dari sisi semantic design API.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"`undefined` biasanya berarti nilai belum diset atau tidak tersedia secara implisit.
`null` berarti sengaja dikosongkan secara eksplisit.
Di level senior, yang penting bukan definisi bahasa, tapi kontrak API:
kapan field boleh `null`, kapan boleh tidak dikirim, dan kapan harus selalu ada.

Saya biasanya pakai `undefined` untuk internal optional yang belum terisi,
dan `null` untuk state bisnis yang memang valid sebagai 'kosong' tapi diketahui.
Di healthcare integration, konsistensi ini penting supaya payload antar sistem tidak ambigu
dan audit data lebih jelas." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan field sebaiknya omit vs null?"
2. "Bagaimana dampaknya ke backward compatibility?"
3. "Apa kaitannya dengan JSON serialization?"
4. "Bagaimana aturan di TypeScript?"
5. "Apa anti-pattern paling sering?"

### Jawaban Singkat untuk Follow-up

1) Omit vs null:
"Omit untuk 'tidak relevan', null untuk 'relevan tapi kosong'."

2) Backward compatibility:
"Perubahan makna null/undefined bisa breaking; harus versioned dan didokumentasikan."

3) JSON:
"`undefined` biasanya tidak terserialisasi di JSON, `null` terserialisasi eksplisit."

4) TypeScript:
"Gunakan strict null checks dan tipe union yang jelas."

5) Anti-pattern:
"Campur `null`, `undefined`, dan empty string tanpa aturan domain."

## Jawaban Ideal (Versi Singkat, Level Senior)

Makna praktis:
- `undefined` = absent/unknown secara implisit
- `null` = absent secara eksplisit dan disengaja

Dalam API design:
- definisikan kontrak per field
- dokumentasikan semantic nullability
- jangan biarkan interpretasi berbeda antar service

## Penjelasan Detail yang Dicari Interviewer

### 1) Semantic contract lebih penting dari syntax

Masalah produksi biasanya muncul karena tim beda interpretasi:
- tim A: `null` = belum diisi
- tim B: `null` = sengaja tidak ada
- tim C: field hilang = error

Tanpa kontrak, integrasi jadi rapuh.

### 2) Dampak ke pipeline data

Pada ETL/reporting:
- `null` bisa dihitung sebagai kategori data kosong
- field hilang bisa diperlakukan schema drift
- perbedaan ini memengaruhi laporan operasional

### 3) Anti-pattern umum

- mengembalikan `undefined` dari public API tanpa dokumentasi
- mengisi `null` untuk semua field optional tanpa makna bisnis
- mengganti semantic saat refactor tanpa versioning

Mitigasi:
- schema contract (OpenAPI/Zod)
- explicit field policy
- contract test antar service

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const payload = {
  patientId: "P-001",
  note: null,          // diketahui kosong
  doctorName: undefined, // tidak akan ikut JSON.stringify
};

console.log(JSON.stringify(payload));
// {"patientId":"P-001","note":null}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Kamu mengerjakan integrasi lintas sistem rumah sakit dan warehouse.
Pada konteks ini:
- ketidakjelasan field bisa bikin sinkronisasi gagal diam-diam
- data audit harus eksplisit untuk investigasi
- kualitas data berdampak langsung ke operasional

Membedakan `null` dan `undefined` secara disiplin mengurangi ambiguity.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
field `returnReason` pada payload retur farmasi.
Sistem asal mengirim `undefined` (field hilang), sistem tujuan mengharapkan `null`
untuk menandai "tidak ada alasan khusus".
Akibatnya validasi downstream gagal sporadis.

Solusi:
- tetapkan kontrak: `returnReason: string | null`
- jika tidak relevan, kirim `null` eksplisit
- gunakan validator di boundary sebelum kirim

## Contoh Pola Kode yang Lebih Aman

```ts
type ReturnRequest = {
  encounterId: string;
  returnReason: string | null;
};

function normalizeReturnReason(input: unknown): string | null {
  if (typeof input === "string" && input.trim().length > 0) {
    return input.trim();
  }
  return null;
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan beda makna, bukan hanya beda teknis.
- Menyebut dampak JSON serialization.
- Menetapkan aturan omit vs null yang jelas.
- Menunjukkan implikasi backward compatibility.
- Mengaitkan ke kontrak integrasi healthcare.

## Ringkasan Final

`null` dan `undefined` bukan sekadar dua nilai kosong.
Keduanya mewakili semantic berbeda yang harus disepakati lintas service.
Di sistem healthcare, kejelasan kontrak nullability adalah guardrail penting
untuk menjaga konsistensi data, stabilitas integrasi, dan kemudahan audit.
