/**
 * Judul: Topik 96 — Observer / Pub-Sub sederhana
 *
 * Soal Test eksplisit:
 * - subscribe, publish, unsubscribe.
 * - once subscription hanya terpicu sekali.
 * - wildcard handler semua event.
 *
 * Kontrak (opsional):
 * - Handler sinkron; error handler ditangkap agar publish tetap jalan.
 *
 * Contoh output:
 * - publish('user.created',{id:1}) memanggil subscriber event tersebut.
 *
 * Solusi detail:
 * - Map event -> Set handler.
 * - Publish ke event spesifik + wildcard '*'.
 */

export class PubSub {
  constructor() {
    this.events = new Map();
    this.wildcards = new Set();
  }

  subscribe(event, handler) {
    if (event === "*") {
      this.wildcards.add(handler);
      return () => this.wildcards.delete(handler);
    }
    if (!this.events.has(event)) this.events.set(event, new Set());
    const set = this.events.get(event);
    set.add(handler);
    return () => set.delete(handler);
  }

  once(event, handler) {
    const off = this.subscribe(event, (payload) => {
      off();
      handler(payload);
    });
    return off;
  }

  publish(event, payload) {
    const handlers = this.events.get(event) ?? new Set();
    const errors = [];
    for (const h of handlers) {
      try {
        h(payload);
      } catch (e) {
        errors.push(e);
      }
    }
    for (const h of this.wildcards) {
      try {
        h(event, payload);
      } catch (e) {
        errors.push(e);
      }
    }
    return errors;
  }

  clear(event = null) {
    if (event === null) {
      this.events.clear();
      this.wildcards.clear();
      return;
    }
    this.events.delete(event);
  }

  subscriberCount(event) {
    if (event === "*") return this.wildcards.size;
    return (this.events.get(event) ?? new Set()).size;
  }
}

/**
 * Judul: Create event emitter facade
 * Soal Test eksplisit: API on/emit/off.
 * Contoh output: emitter.emit('x',1).
 * Solusi detail: wrapper PubSub instance.
 */
export function createEmitter() {
  const bus = new PubSub();
  return {
    on: (event, handler) => bus.subscribe(event, handler),
    once: (event, handler) => bus.once(event, handler),
    emit: (event, payload) => bus.publish(event, payload),
    offAll: (event) => bus.clear(event ?? null),
    count: (event) => bus.subscriberCount(event),
  };
}

/**
 * Judul: Replay publish helper
 * Soal Test eksplisit: publish beberapa event berurutan.
 * Contoh output: return total errors.
 * Solusi detail: loop tuple [event,payload].
 */
export function replay(bus, records) {
  let totalErrors = 0;
  for (const [event, payload] of records) totalErrors += bus.publish(event, payload).length;
  return totalErrors;
}

