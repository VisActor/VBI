# WhereFilterBuilder

Where Pembuat filter, digunakan untuk menambah, mengubah, dan menghapus kondisi filter tingkat baris. Where Pemfilteran berlaku sebelum kueri data dan digunakan untuk memfilter data asli

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

Tambahkan filter Where

**definisi**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Pengembalian**: `WhereFilterBuilder`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `field` | string | - nama field |
| `callback` | (node: WhereFilterNodeBuilder) => void | - fungsi callback |

### addGroup

Tambahkan grup Where

**definisi**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Pengembalian**: `WhereFilterBuilder`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `op` | 'dan' \| 'atau' | - Operator logika |
| `callback` | (group: WhereGroupBuilder) => void | - fungsi callback |

### update

Perbarui filter yang menentukan ID

**definisi**:

```typescript
update(id: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Pengembalian**: `WhereFilterBuilder`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - Saring ID |
| `callback` | (node: WhereFilterNodeBuilder) => void | - fungsi callback |

### updateGroup

Perbarui grup yang ditentukan oleh ID

**definisi**:

```typescript
updateGroup(id: string, callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Pengembalian**: `WhereFilterBuilder`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - Grup ID |
| `callback` | (group: WhereGroupBuilder) => void | - fungsi callback |

### remove

Hapus kondisi yang menentukan ID atau item pada indeks yang ditentukan

**definisi**:

```typescript
remove(idOrIndex: string | number): WhereFilterBuilder
```

**Pengembalian**: `WhereFilterBuilder`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID atau indeks |

### find

Temukan kondisi pertama (pemfilteran atau pengelompokan) berdasarkan kondisi panggilan balik, perilaku konsisten dengan Array.find.find

**definisi**:

```typescript
find(predicate: (entry: WhereFilterNodeBuilder | WhereGroupBuilder, index: number) => boolean): WhereFilterNodeBuilder | WhereGroupBuilder | undefined
```

**Pengembalian**: `WhereFilterNodeBuilder \| WhereGroupBuilder \| undefined`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `predicate` | (entry: WhereFilterNodeBuilder \| WhereGroupBuilder, index: number) => boolean | - Kriteria pencarian |

### clear

Hapus semua filter Where

**definisi**:

```typescript
clear()
```

### toJSON

Ekspor konfigurasi pemfilteran Where lengkap

**definisi**:

```typescript
toJSON(): VBIWhereGroup
```

**Pengembalian**: `VBIWhereGroup`

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