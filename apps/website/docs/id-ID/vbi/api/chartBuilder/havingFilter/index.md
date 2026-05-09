# HavingFilterBuilder

Having Pembuat filter, digunakan untuk menambah, mengubah, dan menghapus kondisi pemfilteran pasca-grup. Having Pemfilteran berlaku setelah agregasi data dan digunakan untuk memfilter hasil pengelompokan

## Properti

## metode

### constructor

**definisi**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### getConditions

**definisi**:

```typescript
getConditions(): Y.Array<any>
```

**Pengembalian**: `Y.Array<any>`

### add

Tambahkan filter Having

**definisi**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Pengembalian**: `HavingFilterBuilder`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `field` | string | - nama field |
| `callback` | (node: HavingFilterNodeBuilder) => void | - fungsi callback |

### addGroup

Tambahkan grup Having

**definisi**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Pengembalian**: `HavingFilterBuilder`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `op` | 'dan' \| 'atau' | - Operator logika |
| `callback` | (group: HavingGroupBuilder) => void | - fungsi callback |

### update

Perbarui filter yang menentukan ID

**definisi**:

```typescript
update(id: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Pengembalian**: `HavingFilterBuilder`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - Saring ID |
| `callback` | (node: HavingFilterNodeBuilder) => void | - fungsi callback |

### updateGroup

Perbarui grup yang ditentukan oleh ID

**definisi**:

```typescript
updateGroup(id: string, callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Pengembalian**: `HavingFilterBuilder`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - Grup ID |
| `callback` | (group: HavingGroupBuilder) => void | - fungsi callback |

### remove

Hapus kondisi yang menentukan ID atau item pada indeks yang ditentukan

**definisi**:

```typescript
remove(idOrIndex: string | number): HavingFilterBuilder
```

**Pengembalian**: `HavingFilterBuilder`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID atau indeks |

### find

Temukan kondisi pertama (pemfilteran atau pengelompokan) berdasarkan kondisi panggilan balik, perilaku konsisten dengan Array.find.find

**definisi**:

```typescript
find(predicate: (entry: HavingFilterNodeBuilder | HavingGroupBuilder, index: number) => boolean): HavingFilterNodeBuilder | HavingGroupBuilder | undefined
```

**Pengembalian**: `HavingFilterNodeBuilder \| HavingGroupBuilder \| undefined`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `predicate` | (entry: HavingFilterNodeBuilder \| HavingGroupBuilder, index: number) => boolean | - Kriteria pencarian |

### clear

Hapus semua filter Having

**definisi**:

```typescript
clear()
```

### toJSON

Ekspor konfigurasi pemfilteran Having lengkap

**definisi**:

```typescript
toJSON(): VBIHavingGroup
```

**Pengembalian**: `VBIHavingGroup`

### observe

Pantau perubahan kondisi filter dan kembalikan fungsi untuk membatalkan pemantauan.

**definisi**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Pengembalian**: `() => void`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - fungsi panggilan balik |

### static isGroup

Tentukan apakah itu adalah simpul grup

**definisi**:

```typescript
static isGroup(yMap: Y.Map<any>): boolean
```

**Pengembalian**: `boolean`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |

### static isNode

Tentukan apakah itu simpul daun

**definisi**:

```typescript
static isNode(yMap: Y.Map<any>): boolean
```

**Pengembalian**: `boolean`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |