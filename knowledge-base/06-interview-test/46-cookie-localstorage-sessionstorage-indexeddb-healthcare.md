# Q46 - Cookie vs localStorage vs sessionStorage vs IndexedDB

## Pertanyaan Interview

Bedakan cookie, localStorage, sessionStorage, IndexedDB untuk use case autentikasi/data.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Cookie cocok untuk data kecil yang perlu ikut request HTTP otomatis (misalnya session cookie),
dan bisa diamankan dengan `HttpOnly`, `Secure`, `SameSite`.
`localStorage` cocok untuk data non-sensitif persisten di browser.
`sessionStorage` mirip localStorage tapi hanya hidup selama tab aktif.
`IndexedDB` dipakai untuk data lebih kompleks/besar secara structured di client.

Untuk autentikasi web sensitif, saya cenderung pilih cookie HttpOnly untuk token/session
agar menurunkan risiko eksfiltrasi via XSS. Di sistem healthcare, pilihan storage harus
berbasis risiko keamanan + kebutuhan operasional offline/performa." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kenapa token di localStorage dianggap berisiko?"
2. "Kapan IndexedDB wajib?"
3. "Apakah cookie selalu lebih aman?"
4. "Kapan sessionStorage lebih tepat?"
5. "Apa anti-pattern paling sering?"

### Jawaban Singkat untuk Follow-up

1) Risiko localStorage:
"Terbaca JS di halaman; XSS bisa mencuri token."

2) IndexedDB wajib:
"Saat butuh simpan data besar/terstruktur/offline cache."

3) Cookie selalu aman?
"Tidak otomatis; harus dikonfigurasi atribut security dengan benar."

4) sessionStorage:
"Untuk data sementara per-tab yang tidak perlu lintas sesi."

5) Anti-pattern:
"Menyimpan data sensitif plaintext di storage client."

## Jawaban Ideal (Versi Singkat, Level Senior)

Ringkas use case:
- Cookie: session/auth server-managed
- localStorage: preferensi UI non-sensitif persisten
- sessionStorage: state sementara per tab
- IndexedDB: cache data besar dan query client-side

## Penjelasan Detail yang Dicari Interviewer

### 1) Security posture

Cookie HttpOnly:
- tidak bisa diakses JS
- tetap perlu proteksi CSRF

Web Storage:
- lebih mudah dipakai JS
- lebih rentan jika terjadi XSS

### 2) Kapasitas dan struktur data

- local/sessionStorage: key-value string sederhana
- IndexedDB: object store kompleks, kapasitas lebih besar

### 3) Anti-pattern umum

- token auth jangka panjang di localStorage tanpa mitigasi
- simpan PII sensitif tanpa enkripsi client policy
- pakai localStorage untuk dataset besar

Mitigasi:
- minimalkan data sensitif di client
- gunakan cookie secure untuk auth utama
- gunakan IndexedDB untuk cache non-sensitive yang perlu skala

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
localStorage.setItem("theme", "dark");
sessionStorage.setItem("currentTab", "transactions");

// IndexedDB dipakai via API async (lebih kompleks)
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di aplikasi healthcare:
- ada data sensitif pasien/transaksi
- ada kebutuhan performa dan kadang offline-friendly
- kepatuhan keamanan data sangat penting

Salah pilih storage bisa meningkatkan risiko kebocoran atau masalah performa.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
token akses disimpan di localStorage.
terjadi XSS di modul non-kritikal, token dicuri.

Perbaikan:
- migrasi token sensitif ke HttpOnly secure cookie
- harden CSP
- audit script injection paths

## Contoh Pola Kode yang Lebih Aman

```ts
type UiPreference = {
  tableDensity: "compact" | "comfortable";
  theme: "light" | "dark";
};
```

Gunakan storage client untuk preferensi non-sensitif, bukan kredensial utama.

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan perbedaan fungsi empat storage.
- Menyentuh aspek security (XSS/CSRF).
- Menyebut kapasitas dan kompleksitas data.
- Menyebut use case auth yang aman.
- Relevan dengan data sensitif healthcare.

## Ringkasan Final

Tidak ada satu storage terbaik untuk semua kebutuhan.
Pilih berdasarkan sensitivitas data, lifecycle, dan skala.
Untuk healthcare, desain storage harus mengutamakan keamanan data
tanpa mengorbankan performa operasional aplikasi.
