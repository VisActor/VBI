# DimensionsBuilder

Pembuat dimensi, digunakan untuk menambah, mengubah, dan menghapus konfigurasi dimensi. Dimensi adalah field klasifikasi data, seperti: waktu, wilayah, kategori produk

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

### add

menambahkan dimensi

**definisi**:

```typescript
add(field: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Pengembalian**: `DimensionsBuilder`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `field` | string | - nama field |
| `callback` | (simpul: DimensionNodeDimensionNodeBuilder) => batal | - fungsi panggilan balik |

### remove

Hapus dimensi yang ditentukan ID

**definisi**:

```typescript
remove(id: string): DimensionsBuilder
```

**Pengembalian**: `DimensionsBuilder`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - Dimensi ID |

### update

Perbarui konfigurasi dimensi yang ditentukan ID

**definisi**:

```typescript
update(id: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Pengembalian**: `DimensionsBuilder`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - Dimensi ID |
| `callback` | (simpul: DimensionNodeDimensionNodeBuilder) => batal | - fungsi panggilan balik |

### find

Temukan dimensi pertama berdasarkan kondisi panggilan balik, perilakunya konsisten dengan Array.find.find

**definisi**:

```typescript
find(predicate: (node: DimensionNodeBuilder, index: number) => boolean): DimensionNodeBuilder | undefined
```

**Pengembalian**: `DimensionNodeBuilder \| undefined`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `predicate` | (simpul: DimensionNodeDimensionNodeBuilder, indeks: number) => boolean | - Kriteria pencarian |

### findAll

Dapatkan semua dimensi

**definisi**:

```typescript
findAll(): DimensionNodeBuilder[]
```

**Pengembalian**: `DimensionNodeBuilder[]`

### toJSON

Ekspor semua dimensi sebagai larik JSON

**definisi**:

```typescript
toJSON(): VBIDimension[]
```

**Pengembalian**: `VBIDimension[]`

### observe

Pantau perubahan dimensi dan kembalikan fungsi untuk membatalkan pemantauan.

**definisi**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Pengembalian**: `() => void`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - fungsi panggilan balik |

### static isDimensionNode

**definisi**:

```typescript
static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
```

**Pengembalian**: `node is VBIDimension`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `node` | `VBIDimensionTree[0]` | - |

### static isDimensionGroup

**definisi**:

```typescript
static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
```

**Pengembalian**: `node is VBIDimensionGroup`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `node` | `VBIDimensionTree[0]` | - |