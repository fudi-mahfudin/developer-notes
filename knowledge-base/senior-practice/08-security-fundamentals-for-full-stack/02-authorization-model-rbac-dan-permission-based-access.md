# Authorization Model: RBAC dan Permission-Based Access

## Tujuan

Topik ini penting karena setelah user terautentikasi, pertanyaan berikutnya adalah:
"Apa yang boleh dia lakukan?"
Authorization yang lemah menyebabkan privilege escalation dan kebocoran data.

## Kenapa Topik Ini Penting

Jika authorization salah:

- user bisa akses data tenant lain;
- aksi admin bisa dilakukan role biasa;
- kontrol keamanan terpecah dan inkonsisten;
- incident audit/compliance meningkat.

## Model Mental yang Benar

1. Authentication != authorization.
2. Authorization adalah evaluasi izin terhadap resource dan aksi spesifik.
3. Keputusan izin harus konsisten dan terpusat secara logis.
4. Least privilege adalah default sehat.
5. Multi-tenant boundary adalah requirement inti, bukan tambahan.

## RBAC Dasar

Role-Based Access Control:

- user diberi role;
- role punya permission set.

Contoh:

- `viewer`;
- `editor`;
- `admin`.

RBAC sederhana dan mudah dipahami.

## Kelebihan RBAC

- mudah dioperasikan;
- governance relatif jelas;
- cocok untuk banyak organisasi tahap awal.

## Keterbatasan RBAC

- role explosion saat kebutuhan granular meningkat;
- sulit menangani konteks resource spesifik;
- permission lintas tenant/project bisa kompleks.

## Permission-Based Access

Model ini memberi izin granular per aksi:

- `invoice.read`;
- `invoice.approve`;
- `user.invite`.

Lebih fleksibel, tetapi governance harus disiplin.

## Hybrid Model

Banyak sistem matang memakai hybrid:

- role sebagai paket default;
- permission granular untuk override atau kasus khusus.

Ini menyeimbangkan operasional dan fleksibilitas.

## Resource-Scoped Authorization

Authorization bukan cuma "punya permission global atau tidak".
Sering perlu scope:

- tenant;
- organization;
- project;
- ownership resource.

User bisa punya izin di scope A, tidak di B.

## Policy Evaluation Point

Keputusan authorization idealnya terjadi dekat boundary API/use-case.
Jangan sebar check izin acak di seluruh layer UI saja.

Frontend check hanya untuk UX.
Enforcement wajib di backend.

## Deny by Default

Prinsip aman:

- jika policy tidak jelas, tolak akses.

Allow by default membuka peluang bypass tak sengaja.

## Least Privilege

Berikan izin minimum untuk menyelesaikan tugas.
Akses berlebih adalah utang keamanan.

Review berkala terhadap permission assignment sangat penting.

## Role Explosion Risk

Tanda role explosion:

- puluhan role mirip;
- perbedaan kecil sulit dijelaskan;
- tim bingung role mana untuk user baru.

Solusi:

- normalisasi role;
- pindah sebagian ke permission granular;
- governance naming jelas.

## Privilege Escalation Defense

Waspadai:

- endpoint lupa check ownership/scope;
- IDOR akibat hanya cek "logged in";
- admin actions tidak dibatasi.

Test negatif untuk unauthorized path wajib ada.

## Auditability

Authorization decision harus bisa diaudit:

- siapa melakukan apa;
- di resource mana;
- berdasarkan izin apa.

Ini krusial untuk incident analysis dan compliance.

## Policy Change Management

Perubahan policy access harus:

- terreview;
- terdokumentasi;
- diuji regression.

Policy drift tanpa kontrol cepat jadi sumber celah.

## Anti-Pattern Umum

### 1. Authorization Hanya di Frontend

Mudah dibypass.

### 2. Hardcode Role Check di Banyak Tempat

Sulit dipelihara.

### 3. Tidak Ada Scope Check

Rawan akses lintas tenant.

### 4. Role Bertambah Tanpa Governance

Sistem izin jadi tidak terkendali.

## Heuristik Senior

1. Definisikan permission model dengan bahasa domain jelas.
2. Enforce authorization di backend boundary.
3. Terapkan deny-by-default.
4. Pisahkan authentication data dari authorization policy evaluation.
5. Uji unauthorized dan cross-tenant scenario.
6. Audit log keputusan akses penting.
7. Review role/permission secara periodik.

## Pertanyaan Interview

### Dasar

- Apa beda authentication dan authorization?
- Apa itu RBAC?
- Kenapa frontend check tidak cukup?
- Apa itu least privilege?

### Menengah

- Kapan RBAC tidak cukup?
- Bagaimana mencegah role explosion?
- Kenapa resource scope penting?
- Bagaimana mendesain hybrid role + permission?

### Senior

- Bagaimana Anda merancang model authorization untuk sistem multi-tenant berskala besar?
- Bagaimana Anda menjaga policy tetap konsisten lintas banyak service?
- Bagaimana Anda mengaudit dan memonitor penyalahgunaan akses?
- Bagaimana Anda memigrasi dari role hardcoded ke policy-driven authorization tanpa downtime?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- user biasa bisa melihat data tenant lain;
- fitur admin bocor ke role support;
- perubahan kecil role memecahkan alur operasional;
- incident audit gagal menelusuri kenapa akses diberikan.

## Ringkasan Brutal

- Authorization adalah kontrol dampak, bukan dekorasi.
- RBAC bagus untuk awal, tapi sering perlu granular permission.
- Scope dan deny-by-default adalah fondasi keamanan multi-tenant.
- Engineer senior memastikan akses benar bukan hanya login berhasil.

## Checklist Pemahaman

- Saya bisa membedakan model RBAC dan permission-based.
- Saya tahu kapan hybrid model dibutuhkan.
- Saya paham pentingnya scope dan backend enforcement.
- Saya menaruh perhatian pada auditability keputusan akses.
- Saya menguji unauthorized path secara eksplisit.

## Penutup

Sistem yang aman tidak hanya tahu siapa user-nya.
Sistem yang aman tahu persis batas apa yang boleh dan tidak boleh dilakukan user itu.
