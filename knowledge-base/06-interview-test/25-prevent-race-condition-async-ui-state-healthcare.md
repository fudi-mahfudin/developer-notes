# Q25 - Mencegah Race Condition pada State Async di UI

## Pertanyaan Interview

Bagaimana mencegah race condition pada state async di UI?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Race condition di UI terjadi ketika beberapa request async berjalan bersamaan,
lalu response lama datang belakangan dan menimpa state terbaru.
Pencegahannya: batalkan request lama, tandai request dengan sequence/token,
dan hanya terima hasil dari request paling baru.

Saya juga pisahkan status loading per request key, bukan satu flag global.
Di aplikasi healthcare, ini penting karena data operasional berubah cepat.
Kita tidak boleh menampilkan hasil stale yang bisa memicu keputusan salah." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "AbortController saja cukup?"
2. "Bagaimana jika API tidak support abort?"
3. "Apa peran cache library (React Query/SWR)?"
4. "Bagaimana menangani rapid filter changes?"
5. "Apa anti-pattern yang paling sering?"

### Jawaban Singkat untuk Follow-up

1) Abort saja cukup?
"Bagus, tapi tetap perlu guard sequence untuk safety tambahan."

2) API tidak support abort:
"Gunakan request id check dan ignore response lama."

3) Cache library:
"Membantu dedup, stale-while-revalidate, dan status management."

4) Rapid changes:
"Gabungkan debounce input + cancel/ignore request lama."

5) Anti-pattern:
"Single loading flag + setState langsung dari semua response."

## Jawaban Ideal (Versi Singkat, Level Senior)

Pilar pencegahan race di UI:
- cancellation request lama
- latest-request-wins policy
- state partition per query key
- atomic update strategy

Tujuan:
- mencegah stale overwrite
- menjaga UX konsisten
- menjaga integritas keputusan user

## Penjelasan Detail yang Dicari Interviewer

### 1) Sumber race condition UI

- user mengetik cepat memicu banyak request
- navigasi antar tab/filter beruntun
- retry otomatis yang tidak aware context terbaru

### 2) Strategi implementasi

- simpan `requestId` increment
- saat response datang, cocokkan dengan `currentRequestId`
- update state hanya jika cocok

### 3) Anti-pattern umum

- response handler tidak tahu request mana yang latest
- global loading/error state untuk semua query
- tidak cleanup effect saat unmount

Mitigasi:
- scoped state per resource key
- abort in-flight requests
- use async state manager library

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
let currentRequestId = 0;

async function loadData(query) {
  const requestId = ++currentRequestId;
  const data = await fetchData(query);
  if (requestId !== currentRequestId) return; // ignore stale response
  setState(data);
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di dashboard healthcare:
- operator sering ubah filter cepat
- data transaksi sensitif waktu
- keputusan operasional mengandalkan data yang tampil

Jika UI menampilkan data lama, dampaknya bisa langsung ke proses lapangan.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
user filter transaksi farmasi: "A", lalu "AB", lalu "ABC".
response "A" datang paling akhir dan overwrite hasil "ABC".
UI terlihat valid tapi sebenarnya stale.

Solusi:
- debounce input
- abort request lama
- latest response guard

## Contoh Pola Kode yang Lebih Aman

```ts
let activeController: AbortController | null = null;
let currentToken = 0;

async function fetchTransactions(query: string) {
  activeController?.abort();
  activeController = new AbortController();
  const token = ++currentToken;

  const res = await fetch(`/api/tx?q=${encodeURIComponent(query)}`, {
    signal: activeController.signal,
  });
  const data = await res.json();
  if (token !== currentToken) return;
  updateTransactionState(data);
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan mekanisme race condition UI dengan jelas.
- Menyebut cancel + request token guard.
- Menjelaskan anti-pattern stale overwrite.
- Menyebut state partitioning per query key.
- Relevan dengan kebutuhan akurasi data healthcare.

## Ringkasan Final

Race condition UI bukan bug minor; ini masalah akurasi informasi.
Pola latest-request-wins dan cancellation harus jadi standar.
Di konteks healthcare, pencegahan race menjaga agar pengguna selalu melihat
data terkini yang benar untuk pengambilan keputusan operasional.
