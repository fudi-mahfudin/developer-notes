# Rendering Strategy: CSR, SSR, SSG, ISR - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- perbedaan CSR, SSR, SSG, dan ISR
- trade-off tiap strategi rendering
- dampak terhadap performa, SEO, freshness, dan kompleksitas
- cara memilih strategi yang benar

Banyak developer menghafal singkatan,
tapi gagal memahami trade-off.

Rendering strategy adalah keputusan arsitektural.
Kalau salah pilih,
biaya performa dan kompleksitas akan muncul di belakang.

---

## 1. Apa Itu Rendering Strategy?

Rendering strategy adalah keputusan:
- kapan HTML dibuat
- di mana HTML dibuat
- kapan data diambil
- kapan user bisa melihat konten

Strategi ini memengaruhi:
- perceived performance
- SEO
- infra cost
- caching
- data freshness

Jadi ini bukan soal framework hype.
Ini soal kebutuhan produk.

---

## 2. CSR Itu Apa?

CSR = Client-Side Rendering.

Dalam model ini:
- browser mengambil JavaScript
- app boot
- data diambil dari client
- UI dirender di browser

Keunggulan:
- interaktif untuk aplikasi kaya state
- pengalaman seperti app
- cocok untuk area login/internal dashboard tertentu

Kelemahan:
- initial load bisa berat
- SEO sering kurang ideal
- user bisa lama menunggu konten bermakna

---

## 3. Kapan CSR Cocok?

Biasanya cocok untuk:
- admin dashboard
- aplikasi internal
- area setelah login
- fitur yang sangat interaktif

Kalau halaman:
- tidak terlalu SEO-sensitive
- user sudah authenticated
- data personalized berat

CSR bisa cukup masuk akal.

Tapi jangan gunakan CSR
hanya karena itu default termudah.

---

## 4. SSR Itu Apa?

SSR = Server-Side Rendering.

Dalam model ini:
- server merender HTML untuk request user
- browser menerima HTML yang lebih siap tampil
- lalu JavaScript melakukan hydration bila perlu

Keunggulan:
- initial content lebih cepat terlihat
- lebih baik untuk SEO
- cocok untuk halaman yang perlu data fresh saat request

Kelemahan:
- beban server naik
- kompleksitas lebih tinggi
- TTFB bisa memburuk jika backend lambat

---

## 5. Kapan SSR Cocok?

Biasanya cocok untuk:
- halaman marketing yang perlu SEO
- halaman detail publik
- halaman dengan data cukup fresh per request
- halaman yang ingin tampil cepat secara meaningful

SSR bagus jika:
- konten perlu indeks search engine
- personalization ada, tapi masih bisa dirender server

Namun SSR bukan sihir.
Kalau data backend lambat,
SSR hanya memindahkan rasa sakit ke server.

---

## 6. SSG Itu Apa?

SSG = Static Site Generation.

Dalam model ini:
- HTML dibuat saat build time
- file statis disajikan saat request

Keunggulan:
- sangat cepat
- murah disajikan
- SEO bagus
- sederhana untuk banyak konten stabil

Kelemahan:
- data bisa cepat stale
- build time bisa membengkak
- kurang cocok untuk data yang sering berubah

---

## 7. Kapan SSG Cocok?

Biasanya cocok untuk:
- landing page
- dokumentasi
- blog
- help center
- halaman yang relatif jarang berubah

Kalau konten tidak berubah per request,
SSG sering jadi opsi paling efisien.

Tapi jangan paksakan SSG
untuk data yang tuntutan freshness-nya tinggi.

---

## 8. ISR Itu Apa?

ISR = Incremental Static Regeneration.

Gagasan utamanya:
- halaman tetap static
- tapi bisa diregenerasi berkala atau saat trigger tertentu

Ini berusaha menggabungkan:
- kecepatan static
- dengan freshness yang lebih baik

ISR cocok
saat kamu butuh kompromi,
bukan data realtime absolut.

---

## 9. Kapan ISR Cocok?

Biasanya cocok untuk:
- katalog
- halaman detail publik yang sering diakses
- konten semi-dinamis
- knowledge base

Kalau data berubah,
tapi tidak harus selalu realtime per request,
ISR bisa sangat efektif.

---

## 10. SEO dan Rendering Strategy

SEO sering jadi alasan utama
memilih SSR atau SSG.

Tetapi ingat:
- SEO tidak cuma soal HTML awal
- performa, metadata, internal linking, dan konten juga penting

CSR murni
sering kurang ideal untuk halaman SEO publik.

Untuk halaman bisnis publik,
memilih CSR tanpa alasan kuat
sering keputusan yang lemah.

---

## 11. Performance Bukan Hanya "Cepat"

Kamu harus pikirkan:
- TTFB
- LCP
- hydration cost
- JS bundle size
- cache hit

SSR bisa unggul pada first content,
tapi kalah jika hydration berat.

CSR bisa terasa ringan setelah app boot,
tapi lambat pada first meaningful paint.

SSG sangat cepat,
tapi freshness bisa jadi korban.

Strategi rendering selalu trade-off.

---

## 12. Freshness vs Speed

Salah satu trade-off utama:
- seberapa fresh data harus tampil?
- seberapa cepat halaman harus tersedia?

Urutan kasar:
- SSG: cepat, tapi paling rentan stale
- ISR: cepat dan cukup fresh untuk banyak kasus
- SSR: bisa paling fresh per request
- CSR: freshness tergantung fetching client

Tidak ada jawaban universal.

---

## 13. Personalization

Kalau halaman sangat personalized,
pertanyaan penting:
- apakah personalization perlu pada HTML awal?
- atau cukup setelah hydration?

Jika personalization utama
baru relevan setelah user login,
kadang hybrid approach lebih masuk akal.

Jangan SSR semua hal
kalau personalization sebenarnya tidak memberi nilai besar di initial response.

---

## 14. Hybrid Strategy Itu Normal

Aplikasi modern sering memakai kombinasi:
- SSG untuk landing
- SSR untuk halaman publik dinamis
- CSR untuk dashboard internal
- ISR untuk katalog/konten semi-statis

Ini sehat.

Memilih satu strategi untuk seluruh aplikasi
sering terlalu simplistik.

Arsitektur yang matang
memilih per route atau per use case.

---

## 15. Healthcare Example

Contoh sistem healthcare:

SSG:
- halaman company profile
- halaman edukasi pasien

ISR:
- direktori dokter
- halaman layanan klinik

SSR:
- halaman detail jadwal yang butuh freshness publik

CSR:
- dashboard admin klinik
- appointment management internal

Ini jauh lebih masuk akal
daripada satu strategi dipaksakan ke semua halaman.

---

## 16. Operational Cost

SSR meningkatkan kebutuhan:
- compute server
- observability
- capacity planning

SSG/ISR cenderung lebih murah
untuk trafik tinggi pada konten yang cocok.

Jadi keputusan rendering
punya dampak biaya nyata,
bukan cuma keputusan engineer.

---

## 17. Complexity Cost

Kadang tim memilih strategi paling canggih,
padahal tim belum siap dengan kompleksitasnya.

Contoh:
- caching invalidation membingungkan
- regeneration sulit diprediksi
- hydration mismatch
- edge case auth

Strategi yang sedikit kurang optimal
tapi bisa dioperasikan dengan benar
sering lebih baik
daripada strategi canggih yang tidak dipahami tim.

---

## 18. Anti-Pattern Umum

1. Memilih rendering strategy karena hype framework.
2. Menggunakan CSR untuk semua halaman publik SEO penting.
3. Menggunakan SSR untuk semua halaman tanpa evaluasi biaya dan manfaat.
4. Memilih SSG untuk data yang butuh freshness tinggi.
5. Tidak membedakan kebutuhan per route.

---

## 19. Best Practices

- evaluasi kebutuhan per halaman, bukan per aplikasi secara membabi buta.
- nilai kebutuhan SEO, freshness, dan personalization secara eksplisit.
- pertimbangkan biaya server dan kompleksitas operasional.
- gunakan hybrid strategy jika itu paling rasional.
- ukur performa nyata, jangan hanya berdebat teori.

---

## 20. Pertanyaan Desain Penting

Sebelum memilih strategi rendering, tanya:
1. Apakah halaman ini butuh SEO?
2. Seberapa fresh data harus tampil?
3. Apakah konten personalized?
4. Seberapa besar trafiknya?
5. Seberapa berat bundle/hydration?
6. Apakah tim siap dengan operasional strateginya?

---

## 21. Mini Latihan

Latihan:
1. Ambil lima route aplikasi dan tentukan CSR/SSR/SSG/ISR.
2. Jelaskan alasan tiap pilihan.
3. Identifikasi halaman yang sebenarnya salah strategi rendering.
4. Tentukan satu halaman yang cocok hybrid.
5. Jelaskan dampak SEO dan cost dari pilihan tersebut.

---

## 22. Jawaban Contoh Ringkas

Public marketing page:
- SSG

Doctor directory:
- ISR

Public schedule page with fresh data:
- SSR

Internal admin dashboard:
- CSR

---

## 23. Checklist Kelulusan Topik Rendering Strategy

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan CSR, SSR, SSG, ISR tanpa hafalan kosong,
- memilih strategi berdasarkan route/use case,
- menilai trade-off SEO, freshness, performa, dan biaya,
- memahami hybrid strategy sebagai pendekatan normal,
- menghindari keputusan rendering berdasarkan hype semata.

---

## 24. Ringkasan Brutal

- Tidak ada strategi rendering yang "terbaik".
- Yang ada hanya strategi yang cocok atau salah konteks.
- Kalau kamu pilih strategi karena ikut tren,
  kemungkinan besar kamu sedang membeli kompleksitas
  tanpa tahu siapa yang akan membayarnya.
