# WhereFilterNodeBuilder

Pembuat simpul filter Where untuk mengonfigurasi kondisi filter Where tunggal

## Properti

## metode

### constructor

**definisi**:

```typescript
constructor(yMap: Y.Map<any>)
```

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |

### getId

Dapatkan simpul ID

**definisi**:

```typescript
getId(): string
```

**Pengembalian**: `string`

### getField

Dapatkan nama field

**definisi**:

```typescript
getField(): string
```

**Pengembalian**: `string`

### setField

Tetapkan nama field

**definisi**:

```typescript
setField(field: string): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `field` | string | - nama field |

### getOperator

Dapatkan operator filter

**definisi**:

```typescript
getOperator(): string | undefined
```

**Pengembalian**: `string \| undefined`

### setOperator

Atur operator filter

**definisi**:

```typescript
setOperator(operator: string): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `operator` | string | - operator |

### setValue

Tetapkan nilai filter

**definisi**:

```typescript
setValue(value: unknown): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `value` | tidak diketahui | - nilai filter |

### setDate

Tetapkan filter tanggal

**definisi**:

```typescript
setDate(predicate: VBIWhereDatePredicate): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `predicate` | `VBIWhereDatePredicate` | - Predikat tanggal |

### getDate

Dapatkan kondisi filter tanggal, filter non-tanggal mengembalikan undefined

**definisi**:

```typescript
getDate(): VBIWhereDatePredicate | undefined
```

**Pengembalian**: `VBIWhereDatePredicate \| undefined`

### toJSON

Ekspor sebagai JSON

**definisi**:

```typescript
toJSON(): VBIWhereFilter
```

**Pengembalian**: `VBIWhereFilter`