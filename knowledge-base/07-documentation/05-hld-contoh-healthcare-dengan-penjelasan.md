# Contoh HLD Healthcare (Dengan Penjelasan Belajar)

## 1. Gambaran Sistem Level Tinggi

MedCare Connect terdiri dari client app, API layer, service domain, data layer, dan integrasi eksternal (OTP, notifikasi, video).

> HLD memberi peta besar sistem. Detail kelas/fungsi tidak dibahas di sini.

## 2. Komponen Utama

- **Client Layer**: Web Admin, Web Pasien, Mobile App.
- **Application Layer**: API Gateway, BFF.
- **Domain Services**: Auth, Patient, Appointment, Notification, Teleconsult.
- **Data Layer**: PostgreSQL, Redis Cache/Queue.
- **External**: OTP Provider, WhatsApp/SMS Provider, Video Provider.

> Penamaan komponen harus konsisten agar sinkron dengan TSD/LLD.

## 3. Integrasi Antar Komponen

- Client -> API Gateway via HTTPS.
- Service internal via REST/gRPC (sesuai standar internal).
- Appointment event ke queue untuk reminder asynchronous.

> HLD cukup menyebut pola komunikasi utama, tanpa detail endpoint lengkap.

## 4. Scalability & Availability

- API stateless, horizontal scaling.
- Queue-based processing untuk beban notifikasi.
- Database read-replica untuk query reporting.

> HLD harus menunjukkan bagaimana sistem bertahan saat traffic naik.

## 5. Security Boundary

- Semua akses eksternal melalui API Gateway.
- Internal service tidak diekspos publik.
- Secret disimpan di secret manager.

> Security boundary menjelaskan titik kontrol akses utama sistem.
