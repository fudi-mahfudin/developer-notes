# Fundamental JavaScript — Index Konsep

Indeks topik sering dipakai (junior → senior); detail ada di materi `01-fundamental/`, `02-intermediate/`, `03-advanced/`.

## Fungsi & gaya fungsional

- **Higher-order function (HOF)** — kunci: `map` / `filter` / `reduce` / comparator `sort` → penjelasan & contoh soal: [`01-higher-order-functions.md`](./01-higher-order-functions.md)
- **Callback** — kunci: event, timer, argument fungsi → [`02-callback.md`](./02-callback.md)
- **Closure** — kunci: variabel tertutup, factory → [`03-closure.md`](./03-closure.md)
- **Pure function & efek samping** — kunci: prediktabilitas, immutability di UI → [`04-pure-function-dan-efek-samping.md`](./04-pure-function-dan-efek-samping.md)
- **`this` & binding** — kunci: arrow vs `function`, `bind` → [`05-this-dan-binding.md`](./05-this-dan-binding.md)
- **Rekursi** — kunci: basis case, kedalaman stack → [`06-rekursi.md`](./06-rekursi.md)
- **Composable pipelines** — kunci: chain kecil, hindari “callback hell” di UI → [`07-composable-pipelines.md`](./07-composable-pipelines.md)

## Asinkron

- **Promise** — kunci: `then` / `catch` / `finally`, chain → [`08-promise.md`](./08-promise.md)
- **`async` / `await`** — kunci: sugar di atas Promise, `try/catch` → [`09-async-await.md`](./09-async-await.md)
- **Event loop** — kunci: microtask vs task (`setTimeout`) → [`10-event-loop.md`](./10-event-loop.md)
- **Error handling async** — kunci: rejection, unhandled rejection → [`11-error-handling-async.md`](./11-error-handling-async.md)
- **Cancellation & timeout** — kunci: `AbortController`, `Promise.race`, batas waktu operasi → [`12-cancellation-dan-timeout.md`](./12-cancellation-dan-timeout.md)
- **Scheduling & back-pressure** — kunci: jangan banjiri I/O; antrian/batch di Node → [`13-scheduling-dan-back-pressure.md`](./13-scheduling-dan-back-pressure.md)

## Objek, tipe, struktur data

- **Primitive vs reference** — kunci: `===` object/array → [`14-primitive-vs-reference.md`](./14-primitive-vs-reference.md)
- **Object literal** — kunci: shorthand, spread, computed keys → [`15-object-literal.md`](./15-object-literal.md)
- **`Map` / `Set`** — kunci: dedup, iterasi berurutan → [`16-map-dan-set.md`](./16-map-dan-set.md)
- **Destructuring** — kunci: array/object, default → [`17-destructuring.md`](./17-destructuring.md)
- **Spread & rest** — kunci: `...` data & parameter → [`18-spread-dan-rest.md`](./18-spread-dan-rest.md)
- **`Symbol` & well-known symbols** — kunci: metadata, iterator, library interoperability → [`19-symbol-dan-well-known-symbols.md`](./19-symbol-dan-well-known-symbols.md)
- **Private fields `#`** — kunci: enkapsulasi benar di class (bukan “private” konvensi) → [`20-private-fields.md`](./20-private-fields.md)
- **`WeakMap` / `WeakRef` / `FinalizationRegistry`** — kunci: edge case memori, lifecycle objek → [`21-weakmap-weakref-finalizationregistry.md`](./21-weakmap-weakref-finalizationregistry.md)

## Modul & runtime

- **ES modules** — kunci: named / default `import` `export` → [`22-es-modules.md`](./22-es-modules.md)
- **Dynamic `import()`** — kunci: lazy, split bundle → [`23-dynamic-import.md`](./23-dynamic-import.md)
- **Module resolution & “dual package hazard”** — kunci: CJS vs ESM, field `exports` di `package.json` → [`24-module-resolution-dan-dual-package-hazard.md`](./24-module-resolution-dan-dual-package-hazard.md)
- **Globals & strict mode** — kunci: `'use strict'`, perilaku implisit lama → [`25-globals-dan-strict-mode.md`](./25-globals-dan-strict-mode.md)

## Class & prototipe

- **`class` & `extends`** — kunci: sintaks di atas prototype → [`26-class-dan-extends.md`](./26-class-dan-extends.md)
- **Prototype chain** — kunci: `instanceof`, inheritance lama → [`27-prototype-chain.md`](./27-prototype-chain.md)

## String & iterasi

- **Template literals** — kunci: `` `${}` `` → [`28-template-literals.md`](./28-template-literals.md)
- **Iterable & iterator** — kunci: `for...of`, generator → [`29-iterable-dan-iterator.md`](./29-iterable-dan-iterator.md)
- **Unicode & `Intl`** — kunci: sort/locale tanggal-angka; jangan asumsi ASCII saja → [`30-unicode-dan-intl.md`](./30-unicode-dan-intl.md)

## Fitur modern

- **Optional chaining `?.`** — kunci: akses aman → [`31-optional-chaining.md`](./31-optional-chaining.md)
- **Nullish coalescing `??`** — kunci: bukan `||` → [`32-nullish-coalescing.md`](./32-nullish-coalescing.md)
- **Array helpers** — kunci: `flat`, `find`, `some`, `every`, `includes` → [`33-array-helpers.md`](./33-array-helpers.md)
- **Tagged templates** — kunci: DSL / library → [`34-tagged-templates.md`](./34-tagged-templates.md)
- **Structured clone** — kunci: duplikasi data kompleks (typed array, `Map`), bukan `JSON` sembarangan → [`35-structured-clone.md`](./35-structured-clone.md)

## Pola (diskusi)

- **Module / IIFE** — kunci: scope file pra-ESM → [`36-module-dan-iife.md`](./36-module-dan-iife.md)
- **Promise sebagai tugas** — kunci: satu operasi async + state → [`37-promise-sebagai-tugas.md`](./37-promise-sebagai-tugas.md)
- **Dependency injection sederhana** — kunci: testability, mengganti implementasi → [`38-dependency-injection-sederhana.md`](./38-dependency-injection-sederhana.md)

## Runtime mendalam & performa (senior)

- **Garbage collection & retensi memori** — kunci: closure memegang referensi besar; `WeakMap` untuk cache → [`39-garbage-collection-dan-retensi-memori.md`](./39-garbage-collection-dan-retensi-memori.md)
- **Profiling mindset** — kunci: ukur dulu (DevTools / flame); jangan tebak bottleneck → [`40-profiling-mindset.md`](./40-profiling-mindset.md)
- **Big-O praktis di hot path** — kunci: nested loop + data besar; struktur data tepat → [`41-big-o-praktis-di-hot-path.md`](./41-big-o-praktis-di-hot-path.md)
- **Debouncing / throttling** — kunci: event pesat (scroll, resize, input) → [`42-debouncing-dan-throttling.md`](./42-debouncing-dan-throttling.md)
- **`requestAnimationFrame` vs `setTimeout`** — kunci: animasi vs jam semu → [`43-requestanimationframe-vs-settimeout.md`](./43-requestanimationframe-vs-settimeout.md)
- **Worker (browser) / `worker_threads` (Node)** — kunci: offload CPU berat dari thread utama → [`44-worker-dan-worker-threads.md`](./44-worker-dan-worker-threads.md)

## Keamanan & ketahanan (senior)

- **XSS & injeksi HTML** — kunci: `innerHTML` tidak tepercaya; sanitasi / template aman → [`45-xss-dan-injeksi-html.md`](./45-xss-dan-injeksi-html.md)
- **Prototype pollution** — kunci: merge objek dari input eksternal; freeze / validasi → [`46-prototype-pollution.md`](./46-prototype-pollution.md)
- **`eval` & `new Function`** — kunci: permukaan serangan + kesulitan audit → [`47-eval-dan-new-function.md`](./47-eval-dan-new-function.md)
- **Secrets & env** — kunci: tidak commit; bedakan build-time vs runtime di Node → [`48-secrets-dan-env.md`](./48-secrets-dan-env.md)

## Tooling & ekosistem (senior)

- **Transpilasi & target browser** — kunci: Babel/SWC, baseline proyek, polyfill terukur → [`49-transpilasi-dan-target-browser.md`](./49-transpilasi-dan-target-browser.md)
- **Source maps & debugging produksi** — kunci: error stack trace bermakna tanpa membocorkan terlalu banyak → [`50-source-maps-dan-debugging-produksi.md`](./50-source-maps-dan-debugging-produksi.md)
- **Semver & breaking change** — kunci: major vs perilaku “ketat baru” di dependensi → [`51-semver-dan-breaking-change.md`](./51-semver-dan-breaking-change.md)
- **`package.json` fields** — kunci: `type`, `exports`, `engines`, kontrak paket → [`52-package-json-fields.md`](./52-package-json-fields.md)

## Pola arsitektur & kolaborasi (senior)

- **Boundaries & ownership** — kunci: domain vs infra; API stabil antar modul → [`53-boundaries-dan-ownership.md`](./53-boundaries-dan-ownership.md)
- **Feature flags & gradual rollout** — kunci: risiko deploy; observability sebelum/selepas → [`54-feature-flags-dan-gradual-rollout.md`](./54-feature-flags-dan-gradual-rollout.md)
- **Observability dari kode** — kunci: correlation id, log terstruktur, metrik error rate → [`55-observability-dari-kode.md`](./55-observability-dari-kode.md)
- **Kontrak antar tim** — kunci: OpenAPI/Schema, versi API, deprecation window → [`56-kontrak-antar-tim.md`](./56-kontrak-antar-tim.md)

## Materi di repo (pelacakan)

| Topik | File |
|-------|------|
| Runtime & event loop | `01-fundamental/01-javascript-runtime-dan-event-loop.md` |
| Scope, closure, `this` | `01-fundamental/03-function-scope-closure-dan-this.md` |
| Objek & imutabilitas | `01-fundamental/04-object-array-immutability.md` |
| Promise & async | `02-intermediate/01-async-await-promise-pattern.md` |
| Idempotency, retry, circuit breaker | `03-advanced/05-idempotency-retry-timeout-circuit-breaker.md` |
| Race condition & mitigasi | `03-advanced/06-race-condition-deadlock-dan-mitigasi.md` |
