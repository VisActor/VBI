# ThemeBuilder

Pembuat tema untuk mengatur dan mendapatkan tema saat ini

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

Pantau perubahan topik dan kembalikan fungsi untuk membatalkan pemantauan

**definisi**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Pengembalian**: `() => void`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | ObserveCallback | - fungsi panggilan balik |

### setTheme

Tetapkan tema

**definisi**:

```typescript
setTheme(theme: string)
```

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `theme` | string | - nama topik |

### getTheme

Dapatkan topik saat ini

**definisi**:

```typescript
getTheme(): string
```

**Pengembalian**: `string`

### toJSON

Ekspor sebagai JSON

**definisi**:

```typescript
toJSON(): string
```

**Pengembalian**: `string`