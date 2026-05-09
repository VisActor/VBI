# LimitBuilder

Pembuat batas volume data, digunakan untuk mengatur dan mendapatkan batas saat ini

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

Pantau perubahan batas dan kembalikan fungsi untuk membatalkan pemantauan

**definisi**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Pengembalian**: `() => void`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | ObserveCallback | - fungsi panggilan balik |

### setLimit

batas yang ditetapkan

**definisi**:

```typescript
setLimit(limit: number)
```

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `limit` | number | - Batas volume data |

### getLimit

Dapatkan batas saat ini

**definisi**:

```typescript
getLimit(): number | undefined
```

**Pengembalian**: `number \| undefined`

### toJSON

Ekspor sebagai JSON

**definisi**:

```typescript
toJSON(): number | undefined
```

**Pengembalian**: `number \| undefined`