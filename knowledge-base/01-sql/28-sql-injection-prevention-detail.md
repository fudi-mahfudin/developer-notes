# SQL Injection Prevention - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu SQL injection
- bagaimana serangan terjadi
- kenapa parameterized query wajib
- kesalahan umum developer
- pola mitigasi praktis

Kalau kamu masih membangun query
dengan string concatenation dari input user,
skill backend/database kamu belum aman.

---

## 1. Apa Itu SQL Injection?

SQL injection adalah serangan
di mana input user dimasukkan ke query
dengan cara yang mengubah maksud query.

Akibatnya bisa:
- baca data tanpa izin
- bypass login
- modify data
- delete data
- exfiltrate data sensitif

Ini salah satu celah klasik
yang masih sering terjadi karena kelalaian dasar.

---

## 2. Akar Masalah

Akar masalahnya sederhana:
- query dibentuk dengan menggabungkan string mentah dari user

Contoh buruk:

```sql
SELECT * FROM users WHERE email = '...input user...'
```

Jika input user tidak diperlakukan aman,
maka user bisa menyisipkan syntax SQL tambahan.

---

## 3. Contoh Pola Berbahaya

Secara konsep, pola buruk adalah:
- `"SELECT ... WHERE email = '" + userInput + "'"`.

Masalahnya:
- input user jadi bagian dari syntax query,
- bukan sekadar nilai.

Di situ SQL injection hidup.

---

## 4. Parameterized Query

Solusi utama:
- parameterized query / prepared statement.

Prinsip:
- query dan data dipisah.

Artinya:
- input user diperlakukan sebagai nilai,
- bukan bagian dari struktur SQL.

Ini fondasi utama pencegahan injection.

---

## 5. Kenapa Escaping Saja Tidak Cukup?

Banyak orang berpikir:
- "tinggal escape kutip"

Itu pola pikir setengah matang.

Masalah:
- variasi konteks query banyak
- engine/driver berbeda
- developer rawan salah
- edge case tetap bisa lolos

Escaping manual bukan strategi utama.
Parameterized query adalah baseline wajib.

---

## 6. Injection Tidak Hanya di WHERE

SQL injection bisa muncul di:
- filter
- sorting
- dynamic table/column choice
- search query
- limit/offset
- raw reporting query

Jadi jangan berpikir:
- "saya aman karena hanya input search".

Semua input dinamis harus dianggap berbahaya
sampai dibuktikan aman.

---

## 7. Dynamic ORDER BY Risk

Contoh sering diremehkan:
- user memilih sort field

Kalau langsung dimasukkan mentah,
itu berbahaya.

Solusi:
- whitelist nama kolom yang diizinkan,
- map dari input ke identifier yang sudah diketahui aman.

Jangan pernah percaya raw string kolom dari user.

---

## 8. Dynamic Table / Column Name

Identifier SQL biasanya tidak bisa diparameterkan
dengan cara yang sama seperti value.

Maka:
- gunakan whitelist eksplisit,
- jangan lewatkan input mentah.

Contoh aman:
- `sort_by=created_at` -> map ke `"created_at"`
- kalau tidak ada di whitelist -> tolak

Ini aturan penting.

---

## 9. ORM Tidak Selalu Menyelamatkanmu

ORM membantu,
tapi tidak otomatis membuatmu aman.

Risiko tetap ada saat:
- pakai raw query
- interpolation manual
- dynamic SQL naif
- bypass abstraction ORM

Jangan terlalu percaya framework.
Pahami prinsip dasarnya.

---

## 10. Stored Procedure Tidak Otomatis Aman

Sebagian orang mengira:
- pakai stored procedure = aman

Salah.

Kalau stored procedure membangun dynamic SQL mentah
dari input tak tervalidasi,
injection tetap bisa terjadi.

Yang aman adalah desainnya,
bukan label teknologinya.

---

## 11. Input Validation Tetap Penting

Parameterized query adalah wajib,
tapi input validation tetap berguna.

Manfaat:
- kurangi input absurd
- enforce domain rule
- bantu logging dan UX

Contoh:
- limit numerik harus positif
- enum filter harus dari daftar valid

Namun:
- validation bukan pengganti parameterization.

---

## 12. Principle of Least Exposure

Kalau query seharusnya hanya perlu 3 kolom,
jangan select semua kolom sensitif.

Mengapa relevan ke injection?
- saat ada kebocoran,
  dampaknya bisa diperkecil

Security bukan satu lapis.
Harus berlapis.

---

## 13. Error Message Leakage

Jangan bocorkan detail SQL error mentah ke user.

Kalau error database ditampilkan terlalu detail:
- attacker dapat petunjuk struktur query
- reconnaissance jadi lebih mudah

Prinsip:
- user dapat pesan aman dan umum,
- detail teknis masuk log internal.

---

## 14. Logging Input dengan Aman

Logging penting,
tapi jangan log input mentah sensitif sembarangan.

Apalagi jika input berbahaya ikut disimpan penuh.

Pertimbangkan:
- masking
- truncation
- structured logging

Tujuan:
- tetap bisa investigasi,
- tanpa menambah risiko.

---

## 15. Testing Injection

Security harus diuji.

Minimal:
- review code raw query
- test input aneh
- test sort/filter dynamic path
- audit semua tempat yang membangun SQL dinamis

Kalau tidak diuji,
kamu cuma berharap.

---

## 16. Defense in Depth

Walau query sudah diparameterkan,
tetap perlu:
- least privilege DB role
- monitoring anomali query
- audit log
- WAF/API protection (jika relevan)

Kalau satu lapis gagal,
lapisan lain masih bisa membatasi kerusakan.

---

## 17. Studi Kasus Search Endpoint

Kasus:
- endpoint search pasien menerima:
  - keyword
  - sort field
  - sort direction

Aman jika:
- `keyword` diparameterkan
- `sort field` dari whitelist
- `sort direction` dibatasi `ASC/DESC`

Bahaya jika:
- semua langsung dijahit ke string query.

---

## 18. Anti-Pattern Umum

1. String concatenation untuk query.
2. Escaping manual dianggap cukup.
3. Dynamic column/table name tanpa whitelist.
4. Terlalu percaya ORM.
5. Error SQL mentah dibocorkan ke user.

---

## 19. Best Practices

- selalu gunakan parameterized query.
- whitelist identifier dinamis.
- validasi input domain.
- minimalkan raw SQL tidak aman.
- review dan test jalur query dinamis.

---

## 20. Mini Latihan

Latihan:
1. Jelaskan kenapa parameterized query aman.
2. Jelaskan kenapa escaping manual tidak cukup.
3. Buat strategi aman untuk dynamic sorting.
4. Jelaskan kenapa ORM tidak otomatis aman.
5. Buat checklist review endpoint search.

---

## 21. Jawaban Contoh Ringkas

Dynamic sorting aman:
- map input ke daftar kolom yang sudah di-whitelist,
- direction dibatasi ke `ASC` atau `DESC`,
- nilai pencarian tetap diparameterkan.

---

## 22. Checklist Kelulusan Topik 28

Kamu dianggap lulus jika bisa:
- menjelaskan akar SQL injection,
- memahami parameterized query sebagai baseline wajib,
- mengamankan dynamic filter/sort secara benar,
- tidak tertipu rasa aman palsu dari ORM,
- berpikir defense-in-depth untuk akses database.

---

## 23. Ringkasan Brutal

- SQL injection itu bug dasar.
- Kalau masih terjadi di sistemmu,
  masalahnya bukan kurang framework.
  Masalahnya disiplin engineering rendah.
