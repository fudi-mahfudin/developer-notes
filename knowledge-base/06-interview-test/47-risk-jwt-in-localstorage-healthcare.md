# Q47 - Risiko Menyimpan JWT di localStorage

## Pertanyaan Interview

Apa risiko menyimpan JWT di localStorage?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Risiko utama JWT di localStorage adalah token dapat diakses JavaScript.
Jika terjadi XSS, attacker bisa mengekstrak token dan menyalahgunakannya.
Karena localStorage persisten, dampaknya bisa lebih lama daripada session sementara.

Di aplikasi sensitif, saya lebih suka token session di HttpOnly secure cookie
agar tidak bisa diakses script client. Ini bukan silver bullet karena CSRF tetap perlu dijaga,
tapi secara umum menurunkan risiko eksfiltrasi token via XSS.
Untuk healthcare, posture keamanan ini sangat penting." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kalau cookie aman, kenapa masih ada yang pakai localStorage?"
2. "Bagaimana mitigasi kalau tetap pakai localStorage?"
3. "Apa peran refresh token policy?"
4. "Kapan token rotation wajib?"
5. "Apa anti-pattern paling berbahaya?"

### Jawaban Singkat untuk Follow-up

1) Kenapa tetap dipakai:
"Kemudahan implementasi SPA, tapi trade-off security harus disadari."

2) Mitigasi:
"Perketat CSP, sanitasi input, short-lived token, rotasi agresif."

3) Refresh token:
"Batasi dampak token akses bocor dengan masa berlaku pendek."

4) Rotation wajib:
"Pada sistem sensitif dengan threat model tinggi."

5) Anti-pattern:
"Long-lived JWT di localStorage tanpa deteksi anomali."

## Jawaban Ideal (Versi Singkat, Level Senior)

Risiko localStorage token:
- rentan dieksfiltrasi via XSS
- persisten lintas sesi/tab
- sulit revoke jika arsitektur lemah

Alternatif:
- HttpOnly Secure SameSite cookies
- token pendek + refresh policy ketat

## Penjelasan Detail yang Dicari Interviewer

### 1) Threat model realistis

XSS adalah risiko nyata di aplikasi web kompleks.
Jika token ada di localStorage, script berbahaya bisa membacanya.

### 2) Trade-off

Cookie HttpOnly:
- pro: tidak bisa dibaca JS
- con: perlu mitigasi CSRF dan konfigurasi CORS tepat

localStorage:
- pro: mudah dipakai di SPA
- con: eksposur tinggi terhadap XSS

### 3) Anti-pattern umum

- access token berumur panjang
- tidak ada device/session revocation
- logging token tidak tersaring

Mitigasi:
- short TTL
- token rotation
- anomaly detection dan forced logout

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// berisiko jika ada XSS
localStorage.setItem("accessToken", token);
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada sistem healthcare:
- data sangat sensitif
- account compromise berdampak besar
- compliance dan audit security ketat

Menyimpan kredensial dengan model lebih aman bukan opsional.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
modul pihak ketiga punya celah XSS kecil.
token di localStorage dicuri.
attacker mengakses endpoint sensitif menggunakan token valid.

Perbaikan:
- pindah auth ke cookie HttpOnly
- perkuat CSP dan dependency audit
- aktifkan deteksi aktivitas anomali

## Contoh Pola Kode yang Lebih Aman

```ts
type SessionPolicy = {
  accessTokenTtlMinutes: number;
  refreshRotation: boolean;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan risiko utama localStorage (XSS).
- Menjelaskan trade-off terhadap cookie approach.
- Menyebut mitigasi praktis jika tetap dipakai.
- Menyebut token TTL/rotation.
- Relevan dengan security kebutuhan healthcare.

## Ringkasan Final

JWT di localStorage meningkatkan risiko jika XSS terjadi.
Untuk aplikasi sensitif, pendekatan HttpOnly cookie umumnya lebih aman.
Di domain healthcare, strategi token harus dirancang konservatif
dengan fokus pada pencegahan kebocoran kredensial.
