# Q2 - Temporal Dead Zone (TDZ) dan Kenapa Sering Bikin Bug

## Pertanyaan Interview

Apa itu temporal dead zone (TDZ) dan kenapa sering bikin bug?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Temporal Dead Zone adalah periode sejak scope dibuat sampai `let` atau `const`
diinisialisasi. Variabelnya secara binding sudah ada, tapi belum bisa diakses, jadi
jika dipakai sebelum declaration line akan `ReferenceError`.

Ini sering bikin bug karena developer kadang mengasumsikan perilakunya seperti `var`
yang jadi `undefined`. Di production, terutama di flow async atau antar module,
urutan inisialisasi bisa tidak obvious.

Saya justru melihat TDZ sebagai safety mechanism. Dia memaksa fail-fast saat state
belum siap. Di proyek healthcare saya, ini penting karena lebih baik request gagal
cepat daripada jalan dengan konfigurasi `undefined` yang berisiko menciptakan
inkonsistensi data antar sistem." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apakah TDZ hanya berlaku untuk `let` dan `const`?"
2. "Apa hubungan TDZ dengan hoisting, apakah kontradiktif?"
3. "Bagaimana TDZ berinteraksi dengan function declaration?"
4. "Apa strategi debugging saat error TDZ muncul di codebase besar?"
5. "Bagaimana mencegah bug TDZ di project TypeScript tim besar?"

### Jawaban Singkat untuk Follow-up

1) Berlaku untuk `let`/`const`:
"Ya, TDZ terkait binding yang belum initialized pada `let` dan `const`.
`var` tidak punya TDZ karena langsung diinisialisasi `undefined`."

2) Hubungan dengan hoisting:
"Tidak kontradiktif. `let/const` tetap hoisted, hanya saja statusnya uninitialized
sampai declaration dieksekusi."

3) Dengan function declaration:
"Function declaration biasanya fully hoisted, jadi bisa dipanggil sebelum definisi.
TDZ tidak berlaku dengan pola yang sama seperti pada `let/const` variable binding."

4) Debugging di codebase besar:
"Lacak stack trace pertama, cek urutan module import, dan identifikasi read-access
yang terjadi sebelum declaration. Biasanya akar masalahnya urutan inisialisasi."

5) Pencegahan di TypeScript team:
"Terapkan lint rules (`no-use-before-define`, `no-var`, `prefer-const`), validasi
bootstrap config sejak startup, dan buat boundary inisialisasi yang eksplisit."

## Jawaban Ideal (Versi Singkat, Level Senior)

Temporal Dead Zone (TDZ) adalah rentang waktu sejak scope dibuat sampai baris
deklarasi `let` atau `const` dieksekusi. Di rentang ini, variabel sudah ada secara
binding (hoisted), tapi belum initialized, sehingga akses variabel akan melempar
`ReferenceError`.

TDZ sering bikin bug karena:
- urutan inisialisasi tidak selalu terlihat jelas di code async/modular
- developer mengira perilakunya sama seperti `var` (`undefined`), padahal tidak
- bug biasanya muncul di runtime pada path tertentu, bukan selalu saat compile

Praktik senior:
- desain flow inisialisasi eksplisit
- hindari akses state sebelum declaration
- gunakan linting + review rule untuk menangkap pola berisiko sejak awal

## Penjelasan Detail yang Dicari Interviewer

### 1) TDZ bukan "variabel tidak ada"

Ini poin konseptual paling penting.
Pada `let`/`const`, binding variabel dibuat saat lexical environment dibuat.
Namun variabel belum boleh diakses sebelum initialization selesai.

Jadi jawaban yang tepat:
"Variabel ada, tapi belum usable."

### 2) Beda perilaku `var` vs `let/const` sebelum deklarasi

- `var`:
  - hoisted
  - initialized ke `undefined`
  - akses sebelum declaration line tidak error
- `let/const`:
  - hoisted
  - uninitialized sampai declaration line
  - akses sebelum declaration line melempar `ReferenceError`

Inilah alasan TDZ sering dianggap "strict safety net".

### 3) Kenapa TDZ justru hal baik

Secara production engineering, TDZ membantu fail fast.
Daripada bug silent karena `undefined`, kita dapat error eksplisit lebih cepat.
Di sistem kritikal (seperti healthcare), fail-fast lebih aman untuk incident detection.

### 4) Pola bug umum terkait TDZ

- akses config/env sebelum module bootstrap selesai
- function helper dipanggil lebih awal dan membaca `let` state yang belum init
- circular dependency antar module yang memicu urutan evaluasi tidak terduga
- refactor block scope tanpa update urutan statement

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// Contoh TDZ pada let
function tdzExample() {
  // console.log(flag); // ReferenceError: Cannot access 'flag' before initialization
  let flag = true;
  return flag;
}

// Dibanding var (bug bisa silent)
function varExample() {
  console.log(flag); // undefined
  var flag = true;
  return flag;
}
```

Contoh di atas memperlihatkan:
- `var` bisa menutupi bug urutan inisialisasi
- `let` memaksa urutan yang benar sejak awal

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Konteks kamu relevan karena:
- menangani hospital workload di Node.js/TypeScript
- mengerjakan integrasi KAIROS dan WMS
- menjaga stabilitas production dan konsistensi data lintas sistem

Dalam alur seperti rekonsiliasi inventory atau transaksi farmasi:
- akses state terlalu cepat bisa memproses payload belum lengkap
- dampaknya bukan cuma error teknis, tapi mismatch data operasional

TDZ membantu mencegah "data dipakai sebelum siap".
Untuk domain healthcare, ini mengurangi risiko data inconsistency pada alur sensitif.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario realistis:
service retur farmasi membaca `warehouseConfig` dari bootstrap config.
Karena urutan inisialisasi module salah, helper mengakses config sebelum declaration.

Jika pakai `var`, nilai jadi `undefined` dan request lanjut dengan fallback default.
Akibatnya transaksi terkirim ke endpoint yang tidak semestinya.

Jika pakai `let/const`, error langsung muncul (TDZ), incident cepat terdeteksi,
dan transaksi bermasalah tidak sempat menyebar ke sistem downstream.

## Contoh Pola Kode yang Lebih Aman

```ts
type WarehouseConfig = {
  baseUrl: string;
  timeoutMs: number;
};

function loadWarehouseConfig(): WarehouseConfig {
  const baseUrl = process.env.WMS_BASE_URL;
  const timeoutRaw = process.env.WMS_TIMEOUT_MS ?? "8000";

  if (!baseUrl) {
    throw new Error("WMS_BASE_URL is required");
  }

  return {
    baseUrl,
    timeoutMs: Number(timeoutRaw),
  };
}

const warehouseConfig = loadWarehouseConfig();

export async function sendReturnPayload(payload: unknown) {
  // Config sudah pasti initialized sebelum dipakai.
  return postToWarehouse(warehouseConfig.baseUrl, payload, warehouseConfig.timeoutMs);
}
```

Kenapa pola ini aman:
- inisialisasi dipusatkan dan tervalidasi
- urutan dependency jelas
- kegagalan terjadi lebih awal saat startup, bukan di tengah transaksi

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan TDZ sebagai phase uninitialized, bukan "variabel belum dibuat".
- Menyebut hubungan TDZ dengan hoisting secara benar.
- Menjelaskan kenapa TDZ bisa jadi source bug runtime.
- Memberi contoh perbandingan `var` vs `let/const`.
- Mengaitkan ke reliability requirement di healthcare systems.
- Menyertakan mitigasi praktis untuk production code.

## Ringkasan Final

TDZ adalah mekanisme proteksi pada `let`/`const` yang memaksa akses variabel dilakukan
setelah initialization. Ini mengurangi bug silent yang sering terjadi dengan `var`.

Di sistem kritikal seperti healthcare:
- TDZ membantu fail-fast
- mempercepat debugging
- mencegah operasi berjalan dengan state/config yang belum siap

Mindset senior:
anggap TDZ bukan gangguan, tetapi guardrail untuk menjaga konsistensi dan keamanan flow produksi.
