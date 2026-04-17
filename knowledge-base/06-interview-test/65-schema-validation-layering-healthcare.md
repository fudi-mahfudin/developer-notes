# Q65 - Schema Validation: Kapan dan di Layer Mana

## Pertanyaan Interview

Kapan schema validation harus dilakukan, dan di layer mana?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Schema validation harus dilakukan sedini mungkin di boundary sistem,
terutama saat menerima input dari client atau service eksternal.
Tapi idealnya berlapis:
transport layer untuk format request,
domain layer untuk business rules,
dan persistence layer untuk constraint data.

Saya membedakan:
validation struktural (tipe, field wajib, format)
vs validation bisnis (aturan domain).
Keduanya tidak boleh dicampur sembarang.
Di sistem healthcare, validasi berlapis mencegah data kotor masuk
dan mengurangi bug downstream yang mahal diperbaiki." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kenapa tidak cukup validasi di frontend?"
2. "Apa beda schema validation dan business validation?"
3. "Apakah DB constraint masih perlu?"
4. "Bagaimana versioning schema API?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Frontend saja cukup?
"Tidak, client tidak bisa dipercaya dan bisa dibypass."

2) Beda validation:
"Schema cek bentuk data, business validation cek aturan domain."

3) DB constraint:
"Tetap wajib sebagai lapisan terakhir integritas data."

4) Versioning schema:
"Gunakan kompatibilitas bertahap dan deprecation plan."

5) Anti-pattern:
"Menaruh semua aturan domain di middleware request."

## Jawaban Ideal (Versi Singkat, Level Senior)

Prinsip layering:
- edge validation: sanitize dan reject cepat
- domain validation: enforce business invariant
- storage validation: final guardrail

## Penjelasan Detail yang Dicari Interviewer

### 1) Layer validasi yang sehat

- API layer: tipe, range dasar, format payload
- application/domain: rule bisnis (state transitions, policy)
- database: unique, foreign key, not null, checks

### 2) Manfaat berlapis

- fail fast untuk request invalid
- error message lebih jelas ke client
- konsistensi data jangka panjang

### 3) Risiko jika salah desain

- duplicate validation yang inkonsisten
- bypass aturan domain lewat jalur internal
- data rusak lolos karena hanya validasi UI

Mitigasi:
- shared schema contracts
- test negatif per layer
- observability error validation per endpoint

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const requestSchema = {
  type: "object",
  required: ["patientId", "amount"],
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Data healthcare harus konsisten lintas banyak proses.
Jika input invalid lolos awal:
- error bisa muncul jauh di downstream
- proses operasional terganggu
- investigasi menjadi lebih lama

Validasi berlapis menekan risiko dari hulu.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
payload status transaksi menerima enum tidak valid.
data masuk DB karena tidak ada guard di domain layer.

Perbaikan:
- tambah enum validation di API layer
- enforce state machine rule di domain
- DB constraint sebagai final net

## Contoh Pola Kode yang Lebih Aman

```ts
type ValidationLayer = "api" | "domain" | "database";
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan kapan validasi dilakukan (sedini mungkin).
- Menjelaskan pembagian layer validation.
- Menjelaskan schema vs business rules.
- Menjelaskan pentingnya DB constraints.
- Relevan untuk integritas data healthcare.

## Ringkasan Final

Schema validation bukan satu titik, melainkan sistem berlapis.
Validasi edge mempercepat reject input buruk,
validasi domain menjaga aturan bisnis,
dan DB constraint menjaga integritas akhir.
Pendekatan ini krusial di healthcare untuk menjaga kualitas data produksi.
