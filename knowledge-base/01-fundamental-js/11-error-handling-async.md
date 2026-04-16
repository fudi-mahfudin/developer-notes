# Error handling async

Materi melengkapi indeks `README.md`: penjelasan + contoh soal (template coding test).

---

## Pengantar

**Kesalahan asinkron** bisa muncul sebagai:

- **Rejection** Promise (`reject`, `throw` di `async`).  
- **Exception** tidak tertangkap di `async` → rejection implisit.

### Penanganan

| Pola | Kapan |
|------|--------|
| `.catch(onRejected)` | Rantai Promise |
| `try { await p } catch (e) {}` | Di dalam `async` |
| `.finally()` | Cleanup selalu |

### Contoh per pola

#### `async` + `try/catch`

```js
async function load() {
  try {
    const r = await fetch('/x');
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  } catch (e) {
    return null;
  }
}
```

#### Unhandled rejection

```js
// hindari: tidak ada .catch atau try/catch
```

### Kesalahan umum

- **Swallow** error tanpa log — sulit debug.  
- `throw` di `then` non-async — tetap harus ditangkap di rantai.

---

# Contoh soal coding: `toResult`

## 1) Ringkasan Soal

- **Tingkat:** Easy–Medium  
- **Topik:** Promise, error handling  
- **Inti:** Bungkus Promise menjadi `{ ok: true, value }` atau `{ ok: false, error }` tanpa throw.

---

- Soal: `toResult(p)` → `Promise<{ok:true, value}|{ok:false, error}>`  
- Input: `p` Promise  
- Output: selalu resolve (tidak reject) dengan union diskriminan

## 2) Jawaban Ideal Singkat

> `p.then(v => ({ok:true, value:v})).catch(e => ({ok:false, error:e}))` — satu `catch` menyerap rejection.

## 3) Versi Ultra Singkat

> `then` + `catch` → selalu resolve.

## 4) Pseudocode

```text
toResult(p):
  return p.then(ok).catch(err)
```

## 5) Implementasi

```js
export function toResult(p) {
  return p.then(
    (value) => ({ ok: true, value }),
    (error) => ({ ok: false, error }),
  );
}
```

## 6) Bukti

- Cabang fulfilled dan rejected tertutup; tidak ada reject keluar.

## 7) Dry Run

- `toResult(Promise.resolve(1))` → `{ok:true,value:1}`  
- `toResult(Promise.reject('x'))` → `{ok:false,error:'x'}`

## 8) Red Flags

- Menggunakan `async`/`try` tanpa menyamakan bentuk return.

## 9) Follow-up

- `Result` type di TypeScript.

## 10) Trade-off

- Pola `never throw` vs exception — gaya fungsional vs tradisional.

## 11) Checklist

- [ ] Tidak unhandled rejection

## 12) Skor Diri

- …

---

## Template Drill Cepat

- Bungkus `fetch` dengan `try/catch` + mapping ke `AppError`.

---

## Tautan

- [`README.md`](./README.md)
