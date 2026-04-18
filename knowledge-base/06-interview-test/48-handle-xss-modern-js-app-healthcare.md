# Q48 - Menangani XSS pada Aplikasi JS Modern

## Pertanyaan Interview

Bagaimana menangani XSS pada aplikasi JS modern?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"XSS ditangani dengan pendekatan berlapis: validasi dan sanitasi input/output,
hindari render HTML mentah tanpa sanitization, gunakan framework escaping default,
pasang Content Security Policy (CSP), dan minimalkan penggunaan API berbahaya seperti
`innerHTML` tanpa kontrol.

Di backend, jangan percaya input client. Di frontend, treat semua data eksternal sebagai untrusted.
Untuk aplikasi healthcare, hardening XSS sangat krusial karena bisa membuka akses ke data sensitif
dan kredensial sesi jika model auth tidak aman." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apakah framework modern otomatis aman dari XSS?"
2. "Kapan sanitization wajib?"
3. "Apa peran CSP?"
4. "Bagaimana testing XSS secara praktis?"
5. "Apa anti-pattern paling berbahaya?"

### Jawaban Singkat untuk Follow-up

1) Framework otomatis aman?
"Membantu, tapi bypass API tetap bisa membuka celah."

2) Sanitization wajib:
"Saat menampilkan HTML/user-generated content."

3) CSP:
"Membatasi eksekusi script sehingga memitigasi dampak injection."

4) Testing:
"Security tests untuk payload injeksi umum + code review sink API."

5) Anti-pattern:
"Render input user ke `innerHTML` tanpa sanitizer."

## Jawaban Ideal (Versi Singkat, Level Senior)

Lapisan proteksi:
- output escaping default
- sanitize rich text
- CSP ketat
- dependency hygiene
- secure auth token strategy

## Penjelasan Detail yang Dicari Interviewer

### 1) Jenis risiko utama

- reflected XSS
- stored XSS
- DOM-based XSS

Setiap jenis punya entry point berbeda, tapi prinsip mitigasi serupa:
jangan percaya data mentah.

### 2) Anti-pattern umum

- menyimpan HTML user langsung ke DB lalu render mentah
- inline script luas tanpa CSP nonces/hashes
- percaya sanitizer sekali tanpa regression tests

Mitigasi:
- gunakan library sanitizer teruji
- implement Trusted Types (jika memungkinkan)
- audit sink berbahaya (`innerHTML`, `insertAdjacentHTML`, `eval`)

### 3) Incident readiness

- log anomali input
- alert pada CSP violations
- punya prosedur revoke session jika suspected compromise

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// berbahaya
container.innerHTML = userContent;

// lebih aman (contoh konseptual)
container.textContent = userContent;
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Dalam healthcare systems:
- data dan workflow sangat sensitif
- XSS bisa jadi pintu ke penyalahgunaan akun
- dampak bisa meluas ke integrasi lintas sistem

Mitigasi XSS harus jadi bagian standar secure coding, bukan patch akhir.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
kolom catatan bebas user ditampilkan kembali sebagai HTML.
payload script tersimpan (stored XSS) dan dieksekusi saat admin membuka halaman.

Perbaikan:
- sanitize saat simpan dan saat render
- CSP ketat
- review semua titik render rich text

## Contoh Pola Kode yang Lebih Aman

```ts
function renderUserNoteSafely(note: string) {
  return note; // note diperlakukan sebagai plain text pada render layer
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan mitigasi berlapis (bukan satu teknik).
- Menyebut sink API berbahaya.
- Menyebut CSP dan sanitization.
- Menyebut testing/audit.
- Relevan untuk proteksi data healthcare.

## Ringkasan Final

XSS harus ditangani sebagai risiko arsitektural, bukan bug UI biasa.
Defence-in-depth adalah kunci: escaping, sanitization, CSP, dan audit berkelanjutan.
Di domain healthcare, ketelitian ini langsung berdampak pada keamanan data pasien
dan kepercayaan operasional sistem.
