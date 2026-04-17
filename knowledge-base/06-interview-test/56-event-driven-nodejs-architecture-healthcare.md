# Q56 - Arsitektur Event-Driven di Node.js

## Pertanyaan Interview

Bagaimana mendesain arsitektur event-driven di Node.js yang aman untuk production?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Arsitektur event-driven cocok untuk workflow asinkron dan integrasi banyak sistem.
Di Node.js, saya memisahkan command dan event:
command memicu perubahan, event menyebarkan fakta bahwa perubahan sudah terjadi.

Kunci production bukan hanya publish event, tapi reliability:
idempotent consumer, retry policy jelas, dead-letter queue,
dan observability per event flow.
Skema event harus versioned untuk menghindari breaking change diam-diam.

Di healthcare, pola ini membantu integrasi lintas layanan,
tapi harus disiplin karena event ganda atau event hilang
bisa menyebabkan inkonsistensi data operasional." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan event-driven lebih baik dari request-response langsung?"
2. "Bagaimana mencegah event diproses dua kali?"
3. "Bagaimana handle event schema evolution?"
4. "Apa itu outbox pattern?"
5. "Anti-pattern terbesar?"

### Jawaban Singkat untuk Follow-up

1) Event-driven lebih baik:
"Saat butuh loose coupling dan pemrosesan async lintas layanan."

2) Cegah duplikasi:
"Consumer idempotent + dedup key."

3) Schema evolution:
"Gunakan versioning kompatibel dan contract tests."

4) Outbox:
"Menjamin perubahan DB dan publish event tetap konsisten."

5) Anti-pattern:
"Publish event tanpa observability dan tanpa retry strategy."

## Jawaban Ideal (Versi Singkat, Level Senior)

Event-driven yang matang butuh:
- event contract jelas
- delivery semantics dipahami
- consumer idempotent
- recovery path terdefinisi
- monitoring end-to-end

## Penjelasan Detail yang Dicari Interviewer

### 1) Delivery semantics

- at-most-once: bisa kehilangan event
- at-least-once: bisa duplikasi event
- exactly-once: mahal dan kompleks

Karena praktik umumnya at-least-once,
desain consumer harus tahan duplikasi.

### 2) Building blocks penting

- message broker and durable topic
- outbox/inbox pattern
- retry + DLQ
- correlation ID dan tracing

### 3) Risiko implementasi

- event storm tanpa governance
- schema drift antar tim
- side effect ganda di consumer

Mitigasi:
- event catalog
- schema registry
- idempotent write model

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const event = {
  type: "OrderCreated.v2",
  eventId: "evt_123",
  occurredAt: new Date().toISOString(),
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Sistem healthcare biasanya punya banyak integrasi:
- pembayaran
- inventory
- notifikasi
- sinkronisasi data lintas unit

Event-driven membantu skalabilitas integrasi,
tapi tanpa kontrol reliability bisa memicu mismatch status transaksi.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
event `payment.confirmed` diterima dua kali.
stok inventory berkurang dua kali.

Perbaikan:
- simpan `eventId` yang sudah diproses
- reject processing jika event duplikat

## Contoh Pola Kode yang Lebih Aman

```ts
type DomainEvent = {
  eventId: string;
  eventType: string;
  version: number;
  payload: Record<string, unknown>;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan konsep event-driven dengan benar.
- Menjelaskan idempotency dan retry.
- Menyebut schema versioning.
- Menyebut outbox/DLQ.
- Relevan pada integrasi healthcare.

## Ringkasan Final

Event-driven Node.js sangat efektif untuk integrasi skala besar.
Kualitas arsitektur ditentukan oleh reliability controls,
bukan oleh jumlah event yang dipublish.
Di healthcare, desain yang disiplin menjaga konsistensi data
dan mencegah dampak operasional dari event duplication/loss.
