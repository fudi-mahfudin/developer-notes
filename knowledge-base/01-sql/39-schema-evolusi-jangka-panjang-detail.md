# SQL Desain Schema untuk Evolusi Jangka Panjang - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- bagaimana mendesain schema yang tahan evolusi
- bagaimana menghindari schema yang cepat rapuh
- trade-off antara cepat rilis dan sehat jangka panjang

Schema yang hanya bagus untuk sprint ini
sering menjadi beban besar dalam 1-2 tahun.

---

## 1. Kenapa Evolusi Jangka Panjang Penting?

Karena requirement berubah:
- fitur baru muncul
- integrasi bertambah
- volume data naik
- reporting makin kompleks
- compliance berubah

Schema yang terlalu sempit / terlalu kaku
akan memaksa migration menyakitkan berulang-ulang.

Schema yang terlalu longgar / asal fleksibel
akan menghasilkan data berantakan.

Jadi desain harus seimbang.

---

## 2. Tanda Schema yang Rapuh

Contoh tanda:
- banyak kolom ambigu
- naming tidak konsisten
- semua hal disimpan sebagai string
- relasi tidak jelas
- enum/status liar
- setiap fitur baru butuh migration besar

Kalau perubahan kecil saja sudah menyakitkan,
kemungkinan besar schema dasarnya lemah.

---

## 3. Tanda Schema yang Sehat

Biasanya:
- naming konsisten
- grain tabel jelas
- relasi eksplisit
- constraint penting ada
- audit fields jelas
- migration bisa dilakukan bertahap

Schema sehat bukan yang "paling elegan di whiteboard",
tapi yang tetap masuk akal saat sistem bertumbuh.

---

## 4. Naming Matters

Nama tabel/kolom yang buruk
menjadi biaya permanen.

Contoh buruk:
- `data1`
- `type`
- `info`
- `flag`

Contoh lebih sehat:
- `appointment_status`
- `patient_contact_phone`
- `notification_delivery_state`

Nama buruk menumpuk kebingungan selama bertahun-tahun.

---

## 5. Status dan State Design

Status sering menjadi sumber kekacauan.

Masalah umum:
- status terlalu banyak
- definisi tidak terdokumentasi
- transisi tidak jelas
- nilai status lama dibiarkan hidup tanpa cleanup

Desain yang lebih sehat:
- definisi state machine jelas
- check constraint / enum policy jelas
- event log jika perlu jejak perubahan

---

## 6. Jangan Menyimpan Makna Ganda dalam Satu Kolom

Contoh buruk:
- satu kolom `status` dipakai campur
  untuk business state, payment state, dan delivery state

Akibat:
- query sulit
- transisi kacau
- analytics sulit dipercaya

Pisahkan makna yang berbeda
ke kolom / tabel / event yang sesuai.

---

## 7. Audit Columns

Schema jangka panjang sebaiknya memikirkan:
- `created_at`
- `updated_at`
- `deleted_at` jika relevan
- `created_by` / `updated_by` pada data sensitif

Ini membantu:
- debugging
- audit
- migration
- observability data lifecycle

Kalau sejak awal diabaikan,
tim sering menyesal belakangan.

---

## 8. Extensibility Bukan Berarti Serba JSON

Kesalahan umum:
- "biar fleksibel, semua taruh di JSON"

Kadang JSON tepat,
tapi sering dipakai sebagai jalan pintas
untuk menghindari desain schema.

Risiko:
- validasi lemah
- query berat
- index sulit
- reporting kacau

Fleksibel bukan berarti tanpa struktur.

---

## 9. Domain Model yang Jelas

Schema yang sehat mengikuti domain yang jelas.

Tanya:
- apa entitas utamanya?
- apa relasinya?
- mana data master?
- mana event/transaksi?
- mana snapshot/histori?

Kalau domain model kabur,
schema akan ikut kabur.

---

## 10. Backward-Compatible Evolution

Schema jangka panjang harus dipikirkan
agar bisa berubah tanpa mematahkan sistem.

Prinsip:
- tambah dulu, pindah bertahap, hapus belakangan
- hindari rename/drop mendadak
- pikirkan consumer selain service utama

Schema yang mudah berevolusi
biasanya schema yang kompatibel terhadap transisi.

---

## 11. Nullable by Laziness

Terlalu banyak kolom nullable
sering tanda desain lemah.

Masalah:
- makna data kabur
- validation dipindah ke aplikasi
- analytics jadi repot

Nullable itu alat.
Bukan default untuk semua hal.

---

## 12. Future-Proofing yang Salah

Kesalahan lain:
- over-engineer untuk kemungkinan yang belum jelas

Contoh:
- 15 tabel abstrak
- generic entity model berlebihan
- schema super fleksibel yang sulit dipakai

Future-proofing yang sehat:
- buka ruang evolusi masuk akal
- tanpa membunuh kesederhanaan saat ini.

---

## 13. Reference Data vs Transaction Data

Penting membedakan:
- data referensi/master
- data transaksi/event

Contoh:
- `doctors` = master
- `appointments` = transaksi

Kalau dua dunia ini dicampur sembarangan,
maintenance dan analytics jadi sulit.

---

## 14. Historization

Pertanyaan penting:
- apakah perubahan data harus menyimpan sejarah?

Contoh:
- alamat pasien terbaru saja cukup?
- atau perubahan contact detail harus tercatat?

Schema jangka panjang perlu menjawab:
- mana current state,
- mana historical state.

---

## 15. Healthcare Example

Dalam healthcare:
- appointment state
- doctor schedule
- patient contact history
- audit access

semuanya bisa berkembang seiring regulasi dan operasi.

Schema sehat sejak awal akan:
- menjaga relasi jelas
- mendukung audit
- memisahkan master vs event
- menghindari magic columns ambigu

---

## 16. Multi-Tenant / Expansion Awareness

Kalau sistem mungkin tumbuh:
- dari satu klinik ke banyak klinik
- dari satu negara ke banyak region

schema harus memikirkan:
- tenant boundary
- timezone
- unique key scope
- reporting scope

Bukan berarti overbuild.
Tapi abaikan total juga bodoh.

---

## 17. Analytics Readiness

Schema operasional tidak harus langsung jadi schema analytics.

Tapi desain yang sehat
akan memudahkan ekstraksi ke model analytics.

Contoh:
- event/state jelas
- key stabil
- timestamp akurat
- relasi eksplisit

Kalau transaksi mentah berantakan,
warehouse juga akan menderita.

---

## 18. Refactoring Cost Awareness

Semakin lama schema salah dibiarkan,
semakin mahal perbaikannya.

Biaya datang dari:
- backfill
- migration bertahap
- compatibility window
- query update
- dashboard update
- integrasi ikut berubah

Karena itu desain awal tidak boleh sembrono.

---

## 19. Best Practices

- desain berdasarkan domain, bukan hanya UI saat ini.
- naming jelas dan konsisten.
- pisahkan state yang berbeda.
- pakai constraint secukupnya untuk menjaga integritas.
- pikirkan bagaimana schema berubah tanpa downtime besar.

---

## 20. Anti-Pattern Umum

1. Semua jadi string/JSON.
2. Naming ambigu.
3. Status campur aduk.
4. Tidak ada audit field.
5. Desain hanya mengikuti fitur sprint saat ini.

---

## 21. Mini Latihan

Latihan:
1. Sebutkan 5 ciri schema sehat jangka panjang.
2. Jelaskan kenapa naming penting.
3. Jelaskan risiko overuse JSON.
4. Buat contoh pemisahan master vs transaksi.
5. Jelaskan kapan historization diperlukan.

---

## 22. Jawaban Contoh Ringkas

Schema sehat:
- grain jelas
- relasi jelas
- naming konsisten
- constraint penting ada
- mudah dievolusikan

JSON berlebihan berisiko:
- validasi lemah
- query/index sulit
- analytics kacau

---

## 23. Checklist Kelulusan Topik 39

Kamu dianggap lulus jika bisa:
- menilai apakah schema rapuh atau sehat,
- mendesain schema yang masih masuk akal saat domain berkembang,
- membedakan fleksibilitas sehat vs kekacauan,
- menghubungkan naming, constraints, dan evolvability,
- berpikir jangka panjang tanpa over-engineering.

---

## 24. Ringkasan Brutal

- Schema buruk itu seperti fondasi retak.
- Awalnya masih bisa dipakai.
  Lalu semua perubahan berikutnya jadi mahal dan menyebalkan.
