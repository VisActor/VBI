# LocaleBuilder

Pembuat bahasa untuk mengatur dan mendapatkan bahasa saat ini

## Properti

## metode

### constructor

Konstruktor

**definisi**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `_doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### observe

Pantau perubahan bahasa dan kembalikan fungsi untuk membatalkan pemantauan

**definisi**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Pengembalian**: `() => void`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | ObserveCallback | - fungsi panggilan balik |

### setLocale

Tetapkan bahasa

**definisi**:

```typescript
setLocale(locale: string)
```

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `locale` | string | - Nama bahasa |

### getLocale

Dapatkan bahasa saat ini

**definisi**:

```typescript
getLocale(): string
```

**Pengembalian**: `string`

### toJSON

Ekspor sebagai JSON

**definisi**:

```typescript
toJSON(): string
```

**Pengembalian**: `string`