# Q44 - Kapan Event Delegation Jadi Wajib di UI Besar

## Pertanyaan Interview

Kapan event delegation jadi wajib di UI besar?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Event delegation berarti memasang satu listener di parent/container
dan menangani event child lewat inspeksi target.
Ini jadi wajib saat elemen child sangat banyak, dinamis, atau sering berubah.
Dengan delegation, jumlah listener turun drastis dan maintenance lebih sederhana.

Di UI besar seperti tabel transaksi rumah sakit, menempel listener di tiap row
bisa boros memori dan sulit dikelola. Delegation membantu performa dan stabilitas,
terutama saat data refresh terus-menerus." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan delegation tidak cocok?"
2. "Bagaimana handle nested clickable elements?"
3. "Apa dampak ke debugging?"
4. "Bagaimana memastikan target yang benar?"
5. "Apa anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Tidak cocok:
"Event yang tidak bubble atau interaksi sangat spesifik per elemen."

2) Nested clickable:
"Gunakan `closest()` dan aturan selector jelas."

3) Debugging:
"Lebih terpusat, tapi perlu tracing target yang teliti."

4) Target benar:
"Validasi dengan attribute data-action dan guard condition."

5) Anti-pattern:
"Delegation tanpa filter target -> handler kebanyakan cabang."

## Jawaban Ideal (Versi Singkat, Level Senior)

Delegation cocok jika:
- child elements banyak
- child dinamis (add/remove)
- interaksi seragam per pola aksi

Manfaat:
- listener lebih sedikit
- memory lebih hemat
- lifecycle UI lebih mudah dikontrol

## Penjelasan Detail yang Dicari Interviewer

### 1) Kapan menjadi "wajib"

Jika ribuan item dirender dan tiap item punya listener sendiri,
biaya register/unregister bisa signifikan.

### 2) Anti-pattern umum

- selector terlalu generik
- logika handler campur semua aksi
- tidak ada namespace action

Mitigasi:
- pakai `data-action`
- split handler by action map
- validasi context sebelum execute

### 3) Kaitan dengan virtualized UI

Delegation tetap relevan pada virtualized list
untuk menjaga event handling konsisten saat row mount/unmount.

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
table.addEventListener("click", (event) => {
  const el = event.target.closest("[data-action]");
  if (!el) return;
  const action = el.dataset.action;
  if (action === "open-detail") openDetail(el.dataset.id);
  if (action === "print-label") printLabel(el.dataset.id);
});
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada aplikasi operasional healthcare:
- tabel besar dan live updates umum
- aksi row-level sering (view, print, reconcile)
- stabilitas interaksi sangat penting

Delegation mengurangi beban event system saat data berubah cepat.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
setiap refresh tabel attach listener baru ke tiap tombol.
setelah beberapa refresh, handler dobel dan aksi terpanggil berkali-kali.

Perbaikan:
- satu listener delegation di container
- clear action map yang terkontrol
- audit duplication via test interaction

## Contoh Pola Kode yang Lebih Aman

```ts
type ActionHandler = (id: string) => void;

const actionMap: Record<string, ActionHandler> = {
  "open-detail": openDetail,
  "print-label": printLabel,
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan konsep delegation dan kapan wajib.
- Menjelaskan manfaat performa/memori.
- Menyebut pitfalls selector dan filtering.
- Menyebut teknik `closest`/`data-action`.
- Relevan ke tabel besar healthcare.

## Ringkasan Final

Event delegation adalah strategi inti untuk UI besar dan dinamis.
Pendekatan ini menurunkan kompleksitas listener dan risiko bug lifecycle.
Di konteks healthcare, delegation membantu menjaga interaksi tetap konsisten
saat data tabel berubah cepat sepanjang hari.
