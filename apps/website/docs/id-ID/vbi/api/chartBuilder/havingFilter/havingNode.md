# HavingFilterNodeBuilder

Pembuat simpul filter Having untuk mengonfigurasi kondisi filter Having tunggal

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

### getOperator

Dapatkan operator filter

**definisi**:

```typescript
getOperator(): string | undefined
```

**Pengembalian**: `string \| undefined`

### getAggregate

Dapatkan konfigurasi agregat

**definisi**:

```typescript
getAggregate(): VBIHavingAggregate | undefined
```

**Pengembalian**: `VBIHavingAggregate \| undefined`

### setValue

Tetapkan nilai kondisi filter

**definisi**:

```typescript
setValue(value: unknown): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `value` | tidak diketahui | - nilai filter |

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

### setAggregate

Tetapkan konfigurasi agregasi

**definisi**:

```typescript
setAggregate(aggregate: VBIHavingAggregate): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `aggregate` | `VBIHavingAggregate` | - Konfigurasi agregasi |

### toJSON

Ekspor sebagai JSON

**definisi**:

```typescript
toJSON(): VBIHavingFilter
```

**Pengembalian**: `VBIHavingFilter`