# Q91 - 5 Kerentanan Umum di Stack JavaScript + Mitigasi

## Pertanyaan Interview

Sebutkan 5 kerentanan umum di stack JavaScript dan mitigasinya.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Lima kerentanan yang paling sering saya lihat:
XSS, CSRF, injection (SQL/NoSQL/command), broken access control, dan dependency supply-chain risk.

Mitigasinya harus berlapis:
escaping/sanitization + CSP untuk XSS,
token + SameSite untuk CSRF,
parameterized query untuk injection,
RBAC/ABAC plus server-side authorization untuk access control,
dan dependency governance untuk supply chain.

Di healthcare, saya juga tambahkan audit logging dan incident response playbook
karena dampak keamanan bukan hanya teknis tapi juga operasional dan kepatuhan." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kerentanan mana paling sering diremehkan?"
2. "Bagaimana memprioritaskan mitigasi?"
3. "Apa kontrol minimum yang wajib?"
4. "Bagaimana validasi mitigasi efektif?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Sering diremehkan:
"Broken access control di endpoint internal."

2) Prioritas:
"Berdasarkan dampak bisnis + exploitability + exposure."

3) Minimum wajib:
"Input validation, authz ketat, secret hygiene, dan dependency scanning."

4) Validasi:
"Security tests + pentest + monitoring runtime signals."

5) Anti-pattern:
"Fokus hanya pada scanner output tanpa perbaikan akar masalah."

## Jawaban Ideal (Versi Singkat, Level Senior)

5 risiko utama + kontrol inti:
- XSS -> escaping/sanitization/CSP
- CSRF -> token + SameSite + origin checks
- Injection -> prepared statements + validation
- Access control -> deny-by-default + per-resource checks
- Supply chain -> intake policy + scanning + pinning

## Penjelasan Detail yang Dicari Interviewer

### 1) XSS

Risiko:
- token/session theft
- DOM manipulation berbahaya

Mitigasi:
- output escaping
- sanitization HTML
- CSP ketat

### 2) CSRF

Risiko:
- aksi tak sah via browser user login

Mitigasi:
- CSRF token
- SameSite cookie
- origin validation

### 3) Injection

Risiko:
- data corruption / remote command risk

Mitigasi:
- parameterized query
- whitelist input policy
- no raw command concatenation

### 4) Broken Access Control

Risiko:
- privilege escalation
- data exposure lintas tenant

Mitigasi:
- server-side authorization
- object-level permission checks
- audit trail akses

### 5) Supply Chain

Risiko:
- compromised package
- transitive vulnerability

Mitigasi:
- dependency review
- lockfile + SBOM
- patch cadence

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// contoh mitigasi akses
if (!canAccess(user, resource)) {
  throw new Error("FORBIDDEN");
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Kerentanan keamanan dapat mengganggu layanan sensitif
dan berpotensi memicu dampak kepatuhan tinggi.
Mitigasi harus jadi bagian dari engineering rutin, bukan audit musiman.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
endpoint detail transaksi hanya cek role global, bukan ownership data.
user bisa melihat data tenant lain.

Perbaikan:
- tambah resource-level authorization
- tambahkan test akses negatif

## Contoh Pola Kode yang Lebih Aman

```ts
type SecurityControl = {
  risk: string;
  mitigation: string;
  owner: string;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menyebut 5 kerentanan umum yang relevan.
- Menjelaskan mitigasi spesifik, bukan umum.
- Menjelaskan prioritas risiko.
- Menjelaskan validasi efektivitas kontrol.
- Relevan pada konteks healthcare.

## Ringkasan Final

Keamanan stack JavaScript butuh pendekatan defense-in-depth.
Daftar kerentanan tanpa mitigasi operasional tidak cukup.
Dengan kontrol teknis + proses yang disiplin,
risiko serangan dapat ditekan secara nyata di produksi.
