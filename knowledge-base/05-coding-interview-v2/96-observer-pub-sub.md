# Topik 96 — Observer dan Pub/Sub

**Observer pattern:** objek **subject** menyimpan daftar **observer** dan memberi tahu mereka saat state berubah. **Pub/Sub (publish-subscribe)** menambahkan **event bus** — publisher tidak mengetahui subscriber secara langsung; topik/channel memisahkan keduanya. Di JavaScript, **`EventTarget`**, **`EventEmitter` (Node)**, atau bus kustom sering dipakai.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Observer: `subscribe(fn)`, `notify(payload)` loop listeners—synchronous atau microtask. Pub/sub: `on(topic, fn)`, `emit(topic, data)` dengan map topik → set listener. Perhatikan **unsubscribe** untuk mencegah **memory leak**, **error handling** di listener (satu throw bisa menghentikan notifikasi lain jika tidak ditangkap), dan **urutan** pemanggilan. **RxJS** memperumum menjadi stream—di luar cakupan dasar.

---

## 2. Mengapa topik ini keluar di interview

- Implement `EventEmitter` mini.
- Diskusi arsitektur UI decoupling.

---

## 3. Observer minimal

```javascript
class Subject {
  constructor() {
    this.listeners = new Set();
  }
  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
  notify(data) {
    for (const fn of this.listeners) fn(data);
  }
}
```

---

## 4. Pub/sub minimal

```javascript
class Bus {
  constructor() {
    this.topics = new Map();
  }
  on(topic, fn) {
    if (!this.topics.has(topic)) this.topics.set(topic, new Set());
    this.topics.get(topic).add(fn);
    return () => this.topics.get(topic).delete(fn);
  }
  emit(topic, data) {
    const set = this.topics.get(topic);
    if (!set) return;
    for (const fn of set) fn(data);
  }
}
```

---

## 5. Kompleksitas

Emit O(jumlah listener topik).

---

## 6. Pitfall: listener mengubah set selama iterasi

Salin array/set sebelum iterasi atau gunakan struktur aman.

---

## 7. Pitfall: leak

Simpan unsubscribe dan panggil on unmount.

---

## 8. Pitfall: async listener

Urutan completion berbeda—pertimbangkan queue.

---

## 9. Pola interview: once

Wrapper hapus listener setelah satu panggilan.

---

## 10. Pola interview: wildcard topics

`foo.*` — perlu routing pattern (minimatch).

---

## 11. Latihan konsep

Bandingkan observer GOF dengan DOM events.

---

## 12. Latihan kode

Tambahkan `emit` yang swallow error per listener.

---

## 13. Edge cases

- Emit sebelum ada listener — no-op.
- Subscribe dalam callback emit yang sama — definisikan apakah terpanggil rekursif.

---

## 14. Checklist

- [ ] Unsubscribe API.
- [ ] Error isolation.
- [ ] Memori leak awareness.

---

## 15. Referensi

Node EventEmitter; Gang of Four Observer.

---

## 16. Anti-pattern

Global singleton bus tanpa namespace topik—tabrakan string.

---

## 17. Flashcard

- **Pub/sub:** indirection via channel.

---

## 18. Testing

Spy listeners; assert call order.

---

## 19. Performa

Banyak listener lambat—pertimbangkan prioritas atau batch.

---

## 20. Integrasi TypeScript

`type Handler<T> = (e: T) => void`.

---

## 21. Debugging

Log topic + listener count.

---

## 22. Memori

Set/Map per topik — bersihkan topik kosong.

---

## 23. Parallel

Event loop single-thread—listener tidak paralel.

---

## 24. Etika wawancara

Tanyakan apakah synchronous dispatch OK.

---

## 25. Rangkuman

Observer dan pub/sub mendekopel produsen dan konsumen event.

---

## 26. Soal terkait

Redux middleware — rantai event/pipeline.

---

## 27. Drill manual

Tiga listener pada `user:login` — satu throw — siapa yang masih jalan tanpa try per listener?

---

## 28. Varian: priority queue listener

Sort by priority field—advanced.

---

## 29. Penutup

Pola ini mendasari hampir semua sistem UI dan messaging ringan.

---

Dokumen ini menjelaskan observer vs pub/sub, unsubscribe, dan error di listener.
