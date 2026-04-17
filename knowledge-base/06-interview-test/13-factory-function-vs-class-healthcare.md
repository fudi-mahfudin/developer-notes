# Q13 - Kapan Pakai Factory Function vs Class

## Pertanyaan Interview

Kapan kamu akan pakai factory function dibanding class?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Saya pilih factory function ketika butuh object composition yang fleksibel,
private state sederhana via closure, dan menghindari kompleksitas `this`.
Saya pilih class ketika butuh kontrak instansiasi yang jelas, identitas object
yang konsisten, dan pola OOP yang familiar untuk tim besar.

Untuk production, keputusan saya berbasis maintainability dan kebutuhan domain.
Di workflow healthcare, saya cenderung prioritaskan pola yang paling gampang diaudit
dan paling kecil peluang bug context/runtime-nya." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apakah factory function lebih modern daripada class?"
2. "Bagaimana performa factory vs class?"
3. "Kapan closure di factory jadi masalah?"
4. "Bagaimana testability keduanya?"
5. "Apa risiko terbesar kalau salah pilih?"

### Jawaban Singkat untuk Follow-up

1) Lebih modern?
"Bukan soal modern, tapi soal kesesuaian konteks use case."

2) Performa:
"Class bisa lebih hemat method sharing via prototype, factory lebih fleksibel."

3) Closure risk:
"Bisa menahan memori lebih lama kalau menyimpan referensi besar."

4) Testability:
"Keduanya testable jika dependency injection dan boundary jelas."

5) Salah pilih:
"Code jadi over-engineered atau sulit di-maintain untuk tim."

## Jawaban Ideal (Versi Singkat, Level Senior)

Pakai factory function jika:
- butuh composition cepat dan fleksibel
- ingin encapsulation via closure
- tidak ingin berurusan dengan binding `this`

Pakai class jika:
- butuh instance contract yang kuat
- method sharing lewat prototype penting
- tim sudah standard pada style class-based service

## Penjelasan Detail yang Dicari Interviewer

### 1) Dimensi keputusan yang benar

Bukan "mana yang paling bagus", tapi:
- readability tim
- lifecycle object
- kebutuhan extensibility
- biaya debugging jangka panjang

### 2) Factory function strengths

- mudah compose behavior kecil
- natural untuk functional style
- private data sederhana via closure

### 3) Class strengths

- struktur eksplisit
- lebih familiar di codebase enterprise
- method shared pada prototype (tidak buat ulang per instance)

### 4) Anti-pattern umum

- class dipakai untuk object kecil stateless utility
- factory dipakai untuk object berat tanpa kontrol closure memory
- campur dua style tanpa guideline tim

Mitigasi:
- tetapkan default pattern per layer
- buat code review checklist arsitektur
- konsisten pada dependency injection

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// Factory function
function createRetryPolicy(maxRetry) {
  return {
    canRetry(attempt) {
      return attempt < maxRetry;
    },
  };
}

// Class
class RetryPolicy {
  constructor(maxRetry) {
    this.maxRetry = maxRetry;
  }
  canRetry(attempt) {
    return attempt < this.maxRetry;
  }
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Dalam sistem healthcare:
- service integrasi harus stabil
- perubahan cepat tetap terjadi karena kebutuhan operasional
- onboarding engineer harus cepat agar incident response efektif

Memilih style object creation yang tepat membantu:
- mengurangi bug context/state
- mempercepat code review
- menjaga konsistensi modul lintas tim

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
tim membuat banyak service class, tapi method sering dipassing sebagai callback
tanpa bind yang benar. Muncul bug `this` undefined di worker.

Alternatif:
untuk modul mapper stateless, factory function lebih sederhana dan aman.
untuk gateway dengan lifecycle jelas, class dengan constructor DI lebih masuk akal.

## Contoh Pola Kode yang Lebih Aman

```ts
type WmsGateway = {
  send(payload: unknown): Promise<void>;
};

function createReturnSyncService(gateway: WmsGateway) {
  return {
    async sync(payload: unknown) {
      await gateway.send(payload);
    },
  };
}
```

Pola ini cocok untuk service kecil yang tidak butuh inheritance.

## Checklist Kualitas Jawaban (Self-Review)

- Menjawab dengan framework keputusan, bukan opini absolut.
- Menjelaskan trade-off factory vs class secara adil.
- Menyebut isu `this`, prototype sharing, dan closure memory.
- Menyediakan contoh use case healthcare.
- Menunjukkan mitigasi praktis untuk tim production.

## Ringkasan Final

Factory function dan class sama-sama valid.
Factory unggul pada fleksibilitas composition; class unggul pada struktur eksplisit.
Pilihan senior ditentukan konteks domain, kebutuhan tim, dan risiko operasional,
bukan preferensi pribadi semata.
