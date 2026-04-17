# Q20 - Cancellation Pattern di JavaScript (`AbortController`, Token, Cleanup)

## Pertanyaan Interview

Jelaskan cancellation pattern di JavaScript (`AbortController`, token, cleanup).

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Cancellation penting untuk menghentikan pekerjaan async yang sudah tidak relevan:
misalnya request lama di-override request baru, timeout, atau user berpindah halaman.
Di JavaScript modern, pola standar adalah `AbortController` dengan `signal`.
Operasi yang mendukung abort harus menerima signal, menghentikan proses, dan cleanup resource.

Di backend maupun frontend, cancellation mengurangi beban tak perlu dan mencegah state race.
Di sistem healthcare, ini penting agar proses stale tidak menimpa data terbaru." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apakah semua API mendukung AbortController?"
2. "Apa beda cancel vs timeout?"
3. "Bagaimana cleanup yang benar setelah cancel?"
4. "Bagaimana cancellation di batch process?"
5. "Apa anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Dukungan API:
"Tidak semua; untuk yang tidak support, buat wrapper/token custom."

2) Cancel vs timeout:
"Timeout adalah trigger otomatis; cancel adalah aksi penghentian operasi."

3) Cleanup:
"Lepas listener, stop timer, dan rollback state sementara jika perlu."

4) Batch process:
"Gunakan signal propagation ke tiap task + checkpoint state."

5) Anti-pattern:
"Abort dipicu tapi hasil request lama tetap diproses."

## Jawaban Ideal (Versi Singkat, Level Senior)

Pilar cancellation:
- **signal propagation**: teruskan sinyal ke semua layer async
- **cooperative cancellation**: task rutin cek status abort
- **cleanup**: lepaskan resource untuk hindari leak

Manfaat:
- hemat resource
- mencegah stale updates
- meningkatkan responsivitas sistem

## Penjelasan Detail yang Dicari Interviewer

### 1) Kapan cancellation wajib

- user trigger request baru (UI search/filter)
- timeout SLA terlampaui
- job parent dibatalkan
- service shutdown graceful

### 2) Implementasi yang benar

- buat controller di boundary request
- pass `signal` ke downstream call
- tangani error abort secara khusus (bukan generic failure)

### 3) Anti-pattern umum

- cancel hanya di layer atas, tapi downstream tetap jalan
- treat abort sebagai error biasa lalu retry
- tidak membedakan aborted vs failed dalam metrics

Mitigasi:
- standard error code untuk abort
- observability dengan label cancellation
- test scenario race/cancel

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const controller = new AbortController();

setTimeout(() => controller.abort(), 3000);

try {
  const res = await fetch("/api/sync", { signal: controller.signal });
  await res.json();
} catch (err) {
  if (err.name === "AbortError") {
    // request dibatalkan
  } else {
    throw err;
  }
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Dalam integrasi healthcare:
- data cepat berubah saat operasional berjalan
- request lama bisa jadi tidak relevan dalam hitungan detik
- resource backend harus efisien untuk beban jam sibuk

Cancellation mencegah proses usang menimpa status terbaru.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
operator mengubah filter transaksi beberapa kali cepat.
request pertama lebih lambat, selesai belakangan, lalu overwrite hasil terbaru.

Perbaikan:
- batalkan request lama saat request baru dimulai
- hanya terima response dengan token terbaru
- tandai aborted request sebagai non-error operasional

## Contoh Pola Kode yang Lebih Aman

```ts
let activeController: AbortController | null = null;

async function loadTransactions(query: string) {
  activeController?.abort();
  activeController = new AbortController();
  const signal = activeController.signal;

  const res = await fetch(`/api/transactions?q=${encodeURIComponent(query)}`, { signal });
  return res.json();
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan alasan bisnis kenapa cancellation penting.
- Menunjukkan penggunaan AbortController dengan benar.
- Menjelaskan perbedaan abort vs failure biasa.
- Menjelaskan cleanup dan observability.
- Mengaitkan ke stale update risk di healthcare.

## Ringkasan Final

Cancellation adalah komponen reliability, bukan fitur tambahan.
Dengan `AbortController` dan cleanup disiplin, sistem jadi lebih efisien dan aman.
Di domain healthcare, ini membantu mencegah data usang menimpa state terbaru
dan menjaga performa saat traffic operasional tinggi.
