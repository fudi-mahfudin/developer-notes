# HLD (High-Level Design)

Penjelasan ini mendefinisikan **apa itu HLD**, **bagaimana posisinya antara TSD dan LLD**, elemen diagram yang umum dipakai, serta praktik membuat dokumen tingkat atas yang tetap bernilai seiring evolusi sistem.

---

## 1. Definisi singkat

**HLD (High-Level Design)** adalah dokumen atau kumpulan artefak yang menjelaskan **arsitektur sistem pada level agregat**: komponen utama, aliran data antar komponen, kepercayaan batas (trust boundary), dan prinsip integrasi—**tanpa** turun ke detail kelas atau query SQL per endpoint.

HLD menjawab **“sistem terdiri dari apa dan bagaimana bagian-bagian besar berkomunikasi”**, biasanya stabil lebih lama daripada LLD.

---

## 2. Tujuan utama HLD

1. **Memberi peta mental bersama** untuk engineer baru, arsitek, dan security.
2. **Mengungkap risiko integrasi** lebih awal (latency antar zona, single point of failure).
3. **Menyelaraskan keputusan platform** (managed service vs self-hosted) di level yang tepat.
4. **Dasar threat modeling**—alur data sensitif terlihat pada diagram konteks/data flow.
5. **Menjembatani sponsor teknis dan delivery** dengan satu gambaran konsisten.

---

## 3. Audiens

| Peran | Manfaat |
|--------|---------|
| **Software architect / principal engineer** | Menjaga konsistensi pola arsitektur. |
| **Tim feature** | Memahami layanan mana yang disentuh oleh fitur baru. |
| **Security & compliance** | Melihat boundary PHI/PII dan kontrol akses. |
| **SRE / platform** | Kapasitas, zona HA, dependency infrastruktur. |

---

## 4. HLD vs LLD vs TSD

| Artefak | Kedalaman tipikal |
|---------|-------------------|
| **HLD** | Container, integrasi, pola komunikasi (sync/async), zona jaringan. |
| **TSD** | Solusi untuk satu inisiatif—bisa merujuk HLD sebagai konteks. |
| **LLD** | Modul/kelas, skema tabel detail, algoritma spesifik, kontrak internal antar paket. |

Satu sistem dapat memiliki **satu HLD makro** dan **HLD turunan per domain** (clinical, billing) jika besar.

---

## 5. Isi tipikal dokumen HLD

1. **Tujuan dan ruang lingkup arsitektur** — apa yang dicakup diagram ini (seluruh platform vs subsistem).
2. **Diagram konteks (C4 Level 1)** — sistem dan aktor eksternal.
3. **Diagram container (C4 Level 2)** — aplikasi/layanan, database pesan, gateway.
4. **Aliran data utama** — beberapa diagram urutan atau data-flow untuk jalur kritis (misalnya rujukan klinis).
5. **Integrasi eksternal** — EHR vendor, identity provider, notification provider.
6. **Keamanan tingkat gambar** — zona DMZ, segmentasi, titik terminasi TLS.
7. **Observabilitas arsitektur** — di mana trace/metric/log dikumpulkan.
8. **Keputusan arsitektur ringkas** — merujuk ADR untuk detail.
9. **Daftar asumsi dan keterbatasan** — misalnya single region vs multi-region.

---

## 6. Notasi dan tooling

Umumnya memakai **C4**, **diagram arsitektur cloud** (ikon vendor), atau **UML deployment** ringkas. Yang penting **legenda konsisten** dan versi diagram terlacak di repo atau wiki.

---

## 7. Kualitas diagram yang baik

- **Satu fokus per halaman**: jangan mencampur konteks dan detail kelas dalam satu gambar.
- **Label protokol** pada panah (HTTPS, gRPC, MQ) untuk mengurangi tebakan.
- **Warna tidak menggantikan penjelasan**—diagram harus tetap terbaca hitam-putih.

---

## 8. Sinkron dengan implementasi

HLD mengalami drift jika tidak dipelihara. Praktik:

- Review HLD pada **arsitektur guild** ketika epik besar masuk.
- Hubungkan ke **repo diagram-as-code** (Structurizr, PlantUML) untuk diff bersama kode.

---

## 9. Kesalahan umum

- **HLD = inventarisasi teknologi** tanpa aliran atau ownership komponen.
- **Terlalu banyak detail** — mencampur LLD membuat dokumen sulit dibaca eksekutif teknikal.
- **Tidak ada boundary keamanan** pada sistem yang menangani data sensitif.
- **Versi tidak dikelola** — screenshot lama tersebar di wiki.

---

## 10. Ringkasan

HLD adalah **peta agregat** ekosistem perangkat lunak: ia membantu menjawab **bagaimana komponen besar bersandar satu sama lain** sebelum detail implementasi mengisi celah. Untuk organisasi enterprise healthcare, HLD sering menjadi dokumen pertama yang dibuka **security review** ketika fitur baru menyentuh PHI lintas sistem.

---

## 11. Pemeliharaan bersama roadmap

Perbarui HLD ketika ada **komponen baru**, **integrasi baru**, atau **perubahan zona kepercayaan**. Cantumkan tanggal revisi pada halaman pertama dan tautkan ke tiket arsitektur agar pembaca dapat menelusuri keputusan. Jika HLD hanya diperbarui setahun sekali, tim cenderung mengabaikannya dan mengandalkan diagram informal yang tidak dapat diaudit—akhirnya dokumen “sering dipakai” menjadi dokumen yang **seharusnya** dipakai tetapi tidak.
