# Q15 - Immutability dan Kenapa Penting untuk Maintainability

## Pertanyaan Interview

Apa itu immutability, dan kenapa penting untuk maintainability di frontend/backend JS?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Immutability berarti data tidak diubah langsung setelah dibuat; kalau butuh perubahan,
kita buat data baru. Ini penting karena menurunkan side effect tersembunyi, membuat alur
state lebih mudah diprediksi, dan debugging lebih cepat.

Di frontend, immutability membantu render logic dan state management tetap konsisten.
Di backend, ini mengurangi bug akibat object yang dimutasi lintas function.
Untuk domain healthcare, immutability membantu menjaga integritas data transaksi,
karena payload yang sudah divalidasi tidak berubah diam-diam di tengah pipeline." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apakah semua data harus immutable?"
2. "Apa biaya performa dari immutability?"
3. "Bagaimana praktik immutability di Node service?"
4. "Tools apa yang biasa dipakai?"
5. "Apa anti-pattern paling berbahaya?"

### Jawaban Singkat untuk Follow-up

1) Semua data?
"Tidak absolut; fokus pada boundary domain dan state kritikal."

2) Biaya performa:
"Ada overhead copy, tapi biasanya layak dibanding risiko bug side effect."

3) Node service:
"Treat request payload sebagai read-only setelah validasi."

4) Tools:
"Spread operator, Object.freeze, Immer, readonly type di TypeScript."

5) Anti-pattern:
"Mutasi object shared lintas layer tanpa kontrak."

## Jawaban Ideal (Versi Singkat, Level Senior)

Immutability memberi:
- behavior lebih deterministic
- debugging lebih mudah (state transition jelas)
- code review lebih sederhana

Trade-off:
- alokasi object baru
- potensi overhead jika tidak dioptimasi

Prinsip senior:
gunakan immutability secara strategis pada data domain penting,
bukan dogma di semua titik.

## Penjelasan Detail yang Dicari Interviewer

### 1) Kenapa mutasi diam-diam berbahaya

Jika object dipass by reference dan dimutasi:
- fungsi lain bisa terdampak tanpa sadar
- bug muncul jauh dari sumber perubahan
- test bisa flaky karena state bocor antar kasus

### 2) Immutability dan maintainability

State transition eksplisit membuat:
- reasoning lebih cepat
- rollback logic lebih aman
- tracing perubahan data lebih jelas saat incident

### 3) Anti-pattern umum

- mutasi object input function
- menyimpan state mutable di singleton global
- mengubah payload yang sudah lolos validasi

Mitigasi:
- copy-on-write
- readonly typing
- satu arah alur data

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// Mutable (risky)
function applyDiscountMutable(order) {
  order.total = order.total - 10;
  return order;
}

// Immutable (safer)
function applyDiscountImmutable(order) {
  return {
    ...order,
    total: order.total - 10,
  };
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada alur integrasi healthcare:
- payload melewati banyak layer (validate, map, send, audit)
- perubahan tak sengaja di tengah flow bisa merusak konsistensi data
- auditability sangat penting untuk investigasi

Dengan immutability, payload final lebih terpercaya karena tidak berubah
setelah lolos validasi domain.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
payload retur obat sudah divalidasi di service A.
service B memutasi `qty` untuk kebutuhan internal logging.
payload yang sama lalu dipakai kirim ke WMS, angka menjadi tidak sesuai.

Dampak:
- mismatch stok
- retry tidak menyelesaikan akar masalah
- investigasi lama karena source mutasi tidak jelas

Solusi:
- treat payload validated sebagai readonly
- buat object turunan untuk kebutuhan transform lokal

## Contoh Pola Kode yang Lebih Aman

```ts
type ReturnPayload = Readonly<{
  encounterId: string;
  sku: string;
  qty: number;
}>;

function toWarehouseFormat(payload: ReturnPayload) {
  return {
    encounter_id: payload.encounterId,
    item_code: payload.sku,
    quantity: payload.qty,
  };
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan immutability sebagai teknik pengendalian side effect.
- Menjelaskan trade-off performa secara realistis.
- Menunjukkan manfaat untuk maintainability.
- Memberikan contoh mutasi berisiko vs immutable update.
- Mengaitkan ke integritas data healthcare.

## Ringkasan Final

Immutability bukan tren, tapi alat untuk menekan kompleksitas.
Di frontend/backend JS, ini meningkatkan prediktabilitas dan kualitas debugging.
Untuk sistem healthcare, immutability pada data domain kritikal membantu menjaga
konsistensi transaksi, audit trail, dan stabilitas operasional.
