# MeasureNodeBuilder

Pembuat simpul metrik untuk mengonfigurasi metrik individual

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
getEncoding(): VBIMeasure['encoding'] | undefined
```

**Pengembalian**: `VBIMeasure['encoding'] \| undefined`

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
setEncoding(encoding: NonNullable<VBIMeasure['encoding']>): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `encoding` | `<VBIMeasure['encoding']>NonNullable` | - Posisi pengkodean metrik |

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

Tetapkan fungsi agregat

**definisi**:

```typescript
setAggregate(aggregate: VBIMeasure['aggregate']): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `aggregate` | `VBIMeasureMeasure['agregat']` | - Konfigurasi agregasi |

### setFormat

Format angka

**definisi**:

```typescript
setFormat(format: VBIMeasureFormat): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `format` | `VBIMeasureFormatMeasureFormat` | - Konfigurasi format |

### getFormat

Dapatkan format numerik

**definisi**:

```typescript
getFormat(): VBIMeasureFormat | undefined
```

**Pengembalian**: `VBIMeasureFormat \| undefined`

### clearFormat

Hapus konfigurasi format numerik

**definisi**:

```typescript
clearFormat(): this
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
toJSON(): VBIMeasure
```

**Pengembalian**: `VBIMeasure`