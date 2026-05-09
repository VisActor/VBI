# DimensionNodeBuilder

Pembuat simpul dimensi untuk mengonfigurasi dimensi individual

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

### getEncoding

Dapatkan posisi pengkodean grafik

**definisi**:

```typescript
getEncoding(): VBIDimension['encoding'] | undefined
```

**Pengembalian**: `VBIDimension['encoding'] \| undefined`

### getSort

Dapatkan konfigurasi penyortiran

**definisi**:

```typescript
getSort(): VBISort | undefined
```

**Pengembalian**: `VBISort \| undefined`

### setAlias

Tetapkan nama tampilan

**definisi**:

```typescript
setAlias(alias: string): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `alias` | string | - nama tampilan |

### setEncoding

Atur posisi pengkodean grafik

**definisi**:

```typescript
setEncoding(encoding: NonNullable<VBIDimension['encoding']>): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `encoding` | `<VBIDimension['encoding']>NonNullable` | - Posisi pengkodean dimensi |

### setSort

Atur konfigurasi penyortiran

**definisi**:

```typescript
setSort(sort: VBISort): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `sort` | `VBISortSort` | - Konfigurasi Penyortiran |

### setAggregate

Tetapkan fungsi agregasi tanggal

**definisi**:

```typescript
setAggregate(aggregate: NonNullable<VBIDimension['aggregate']>): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `aggregate` | `<VBIDimension['aggregate']>NonNullable` | - Konfigurasi agregasi tanggal |

### clearAggregate

Hapus fungsi agregat tanggal

**definisi**:

```typescript
clearAggregate(): this
```

**Pengembalian**: `this`

### clearSort

Hapus konfigurasi pengurutan

**definisi**:

```typescript
clearSort(): this
```

**Pengembalian**: `this`

### toJSON

Ekspor sebagai JSON

**definisi**:

```typescript
toJSON(): VBIDimension
```

**Pengembalian**: `VBIDimension`