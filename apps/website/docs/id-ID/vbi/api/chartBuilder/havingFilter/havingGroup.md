# HavingGroupBuilder

AND/OR Pembuat pengelompokan, digunakan untuk mengonfigurasi hubungan logis dari serangkaian kondisi (Having)

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

### getConditions

**definisi**:

```typescript
getConditions(): Y.Array<any>
```

**Pengembalian**: `Y.Array<any>`

### getId

Dapatkan grup ID

**definisi**:

```typescript
getId(): string
```

**Pengembalian**: `string`

### getOperator

Dapatkan operator logis

**definisi**:

```typescript
getOperator(): 'and' | 'or'
```

**Pengembalian**: `'and' \| 'or'`

### setOperator

Tetapkan operator logika

**definisi**:

```typescript
setOperator(op: 'and' | 'or'): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `op` | 'dan' \| 'atau' | - Operator logika |

### add

Tambahkan filter Having ke grup

**definisi**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `field` | string | - nama field |
| `callback` | (node: HavingFilterNodeBuilder) => void | - fungsi callback |

### addGroup

Tambahkan grup bertingkat ke grup saat ini

**definisi**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `op` | 'dan' \| 'atau' | - Operator logika |
| `callback` | (group: HavingGroupBuilder) => void | - fungsi callback |

### remove

Hapus kondisi yang menentukan ID atau item pada indeks yang ditentukan

**definisi**:

```typescript
remove(idOrIndex: string | number): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID atau indeks |

### clear

Hapus semua ketentuan dalam grup

**definisi**:

```typescript
clear(): this
```

**Pengembalian**: `this`

### toJSON

Ekspor sebagai JSON

**definisi**:

```typescript
toJSON(): VBIHavingGroup
```

**Pengembalian**: `VBIHavingGroup`