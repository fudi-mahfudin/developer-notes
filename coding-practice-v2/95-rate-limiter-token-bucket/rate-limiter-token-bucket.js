/**
 * Judul: Topik 95 — Rate limiter (token bucket + sliding window)
 *
 * Soal Test eksplisit:
 * - TokenBucketLimiter allow() berdasarkan refill rate.
 * - SlidingWindowLimiter allow() berdasarkan hit dalam window.
 * - simulateRequests helper untuk tes urutan waktu.
 *
 * Kontrak (opsional):
 * - waktu diukur milidetik (number).
 *
 * Contoh output:
 * - bucket cap=2 refill=1/s: 3 request bersamaan => 2 allow, 1 deny.
 *
 * Solusi detail:
 * - Token bucket: hitung refill saat check.
 * - Sliding window: simpan timestamp dan purge lama.
 */

export class TokenBucketLimiter {
  constructor(capacity, refillPerSec, nowFn = () => Date.now()) {
    this.capacity = capacity;
    this.refillPerMs = refillPerSec / 1000;
    this.tokens = capacity;
    this.nowFn = nowFn;
    this.lastTs = nowFn();
  }

  refill() {
    const now = this.nowFn();
    const delta = Math.max(0, now - this.lastTs);
    this.tokens = Math.min(this.capacity, this.tokens + delta * this.refillPerMs);
    this.lastTs = now;
  }

  allow(cost = 1) {
    this.refill();
    if (this.tokens >= cost) {
      this.tokens -= cost;
      return true;
    }
    return false;
  }
}

export class SlidingWindowLimiter {
  constructor(limit, windowMs, nowFn = () => Date.now()) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.nowFn = nowFn;
    this.hits = [];
  }

  purge(now) {
    while (this.hits.length && this.hits[0] <= now - this.windowMs) this.hits.shift();
  }

  allow() {
    const now = this.nowFn();
    this.purge(now);
    if (this.hits.length < this.limit) {
      this.hits.push(now);
      return true;
    }
    return false;
  }
}

/**
 * Judul: Simulasi request timestamps untuk limiter
 * Soal Test eksplisit: output boolean per request.
 * Contoh output: [true,true,false].
 * Solusi detail: nowFn mock bergerak sesuai timestamps.
 */
export function simulateRequests(createLimiter, timestamps) {
  let i = 0;
  const nowFn = () => timestamps[i];
  const limiter = createLimiter(nowFn);
  const out = [];
  for (i = 0; i < timestamps.length; i++) out.push(limiter.allow());
  return out;
}

/**
 * Judul: Compose multi limiter (all must allow)
 * Soal Test eksplisit: salah satu deny => false.
 * Contoh output: combine bucket+window.
 * Solusi detail: every allow().
 */
export function allowAll(limiters) {
  return limiters.every((l) => l.allow());
}

/**
 * Judul: Estimate wait time sederhana untuk token bucket
 * Soal Test eksplisit: jika token cukup => 0.
 * Contoh output: kekurangan 1 token dengan refill 2/s => 500ms.
 * Solusi detail: need/refillPerMs.
 */
export function estimateWaitMs(bucket, cost = 1) {
  bucket.refill();
  if (bucket.tokens >= cost) return 0;
  const need = cost - bucket.tokens;
  return Math.ceil(need / bucket.refillPerMs);
}

