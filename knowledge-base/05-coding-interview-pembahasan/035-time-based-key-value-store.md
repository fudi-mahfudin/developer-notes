# Time Based Key-Value Store

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Hash map + binary search
- **Inti masalah:** Untuk tiap key, simpan `(timestamp, value)` **append-only**; `get(key, timestamp)` return value dengan timestamp **terbesar** yang ≤ query timestamp, else `""`.

---

- Soal: `set(key, value, timestamp)`, `get(key, timestamp)` with non-decreasing set order per key.
- Input/Output: Design class API
- Constraints utama: Per-key timestamps sorted → binary search O(log n) per get.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Map + bisect

## 2) Jawaban Ideal Singkat (30-60 detik)

> Simpan `Map<key, Array<{t,v}>>` dengan array **naik menurut t** (soal guarantee consecutive sets). Pada `set`, push pasangan. Pada `get`, binary search **upper bound** last index dengan `t <= timestamp` — lowerBound/upper bound template: `while left<=right` atau cari `rightmost` ≤ target. Return `value` atau `""`. O(log n) per get per key, O(1) amortized append set.

Struktur cepat:
- Observasi inti masalah: Latest valid snapshot = predecessor in sorted timestamps.
- Strategi final yang dipilih: Sorted array per key + binary search.
- Kenapa strategi ini paling cocok: Constraints say timestamps increase.
- Time complexity: O(log n) get, O(1) set append (excluding resizing array)
- Space complexity: O(total pairs)
- Edge case utama: timestamp before first; exactly match; no key.

## 3) Versi Ultra Singkat (10-20 detik)

> Map key → sorted list; get = binary search last time ≤ query.

## 4) Pseudocode Ringkas (5-10 baris)

```text
map = defaultdict list of (timestamp, value)
set(key, value, timestamp):
  map[key].append((timestamp, value))
get(key, timestamp):
  pairs = map[key]; if empty: return ""
  binary search largest index i with pairs[i].t <= timestamp
  if none: return ""
  return pairs[i].value
```

## 5) Implementasi Final (Inti Saja)

```js
class TimeMap {
  constructor() {
    this.store = new Map();
  }
  set(key, value, timestamp) {
    if (!this.store.has(key)) this.store.set(key, []);
    this.store.get(key).push([timestamp, value]);
  }
  get(key, timestamp) {
    const arr = this.store.get(key);
    if (!arr || !arr.length) return '';
    let lo = 0, hi = arr.length - 1;
    let res = '';
    while (lo <= hi) {
      const mid = lo + ((hi - lo) >> 1);
      if (arr[mid][0] <= timestamp) {
        res = arr[mid][1];
        lo = mid + 1;
      } else hi = mid - 1;
    }
    return res;
  }
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Timestamps append-only stay sorted; last ≤ target is well-defined maximum among feasible entries.
- Kenapa semua kasus valid tercakup: Binary search finds rightmost qualifying timestamp.
- Kenapa tidak ada kasus yang terlewat: Monotonic ts order per key.

## 7) Dry Run Singkat

- Set `foo` at 1,2; get `foo,3` returns value at ts 2.

## 8) Red Flags (Yang Harus Dihindari)

- Linear scan each get O(n).
- Parsing timestamps as strings when integers given.

## 9) Follow-up yang Sering Muncul

- Deletes / updates historical — needs different design (tree map).

## 10) Trade-off Keputusan

- TreeMap vs array + BS — array sufficient here.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Could store pre-res for walk — unnecessary.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: HashMap + binary search
- Inti masalah (1 kalimat): Get value at latest time not after query.
- Soal: TimeMap class.
- Strategi final: Sorted pairs per key + rightmost ≤
- Kompleksitas: O(log n) get, O(1) set
- 2 edge case: empty key; query before any ts
- 1 potensi bug: wrong BS template for rightmost
- 1 alasan valid: Chronological append keeps order for bisect
