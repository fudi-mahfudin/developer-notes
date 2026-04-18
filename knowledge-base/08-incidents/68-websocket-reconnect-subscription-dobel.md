# #68 — WebSocket reconnect → subscription dobel → update duplikat

**Indeks:** [`README.md`](./README.md) · **ID:** `#68` · **Kategori:** Frontend & edge (browser / proxy)

---

## Ringkasan

Klien WebSocket yang **reconnect** otomatis sering mendaftarkan ulang **channel subscription** tanpa menghapus yang lama—menerima **duplikat event** untuk pesan yang sama (misalnya status order lab berubah dua kali identik). Tanpa dedup di klien atau server, UI dapat menampilkan notifikasi ganda atau menjalankan efek samping berulang.

---

## Mitigasi ideal (~60 detik)

“Pada reconnect, kirim **session id** dan minta server menggantikan subscription lama—atau gunakan ID unik subscription server-side. Klien dedup berdasarkan `eventId`. Gunakan backoff reconnect dengan jitter [#34](34-retry-tanpa-exponential-backoff.md). Pastikan `onopen` tidak menambahkan listener baru tanpa menghapus lama.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **At-least-once delivery:** duplikat mungkin—dedup diperlukan.
- **Subscription lease:** server mengenali satu konsumen logis.

---

## Mengapa pola ini sangat umum di healthcare

1. Monitoring vital real-time dan status bed.
2. Implementasi reconnect copy-paste tanpa state machine.
3. Load balancer sticky tidak konsisten.

---

## Pola gagal (ilustrasi)

```typescript
ws.onopen = () => {
  ws.send(JSON.stringify({ type: 'subscribe', channel })); // dipanggil berulang tanpa unsubscribe
};
```

---

## Gejala di production

- Notifikasi duplikat pada perawat mobile saat sinyal goyang.

---

## Diagnosis

1. Hitung subscription aktif di server untuk satu user.
2. Log event duplikat dengan id sama.

---

## Mitigasi yang disarankan

1. Protocol subscribe dengan replace semantik.
2. Client dedup map lastEventId.
3. Heartbeat untuk mendeteksi dead connection lebih awal.

---

## Trade-off dan risiko

- Dedup berlebihan bisa menyembunyikan event sah berulang—bedakan id unik.

---

## Aspek khusus healthcare

- Alert duplikat menyebabkan alarm fatigue di ICU—bahaya.

---

## Checklist review PR

- [ ] Reconnect pathway diuji dengan memutus jaringan berulang.

---

## Kata kunci untuk pencarian

`websocket reconnect`, `subscription leak`, `dedup`, `at-least-once`

---

## Skenario regresi yang disarankan

1. Putus Wi-Fi 20 kali dalam lima menit—subscription tunggal aktif.
2. Uji dengan dua tab browser terbuka ke dashboard yang sama.
3. Pastikan server menolak subscribe identik berlebihan atau menggabungkan.

---

## KPI pemantauan

- Jumlah event duplikat dengan id sama yang diterima klien per jam.

---

## Catatan tambahan operasional

Cantumkan **protocol version** pada handshake agar server dapat menolak klien usang yang perilakunya salah subscribe.

---

## Referensi internal

- [`README.md`](./README.md) · **#54**, **#69**.
