# MeasuresBuilder

Pembuat metrik untuk menambahkan, mengubah, dan menghapus konfigurasi metrik. Ukuran adalah field data numerik, seperti: penjualan, laba, kuantitas

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

Tambahkan metrik

**definisi**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Pengembalian**: `MeasuresBuilder`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `field` | string | - nama field |
| `callback` | (simpul: MeasureNodeMeasureNodeBuilder) => batal | - fungsi panggilan balik |

### remove

Hapus metrik untuk ID yang ditentukan

**definisi**:

```typescript
remove(id: string): MeasuresBuilder
```

**Pengembalian**: `MeasuresBuilder`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - Pengukuran ID |

### update

Perbarui konfigurasi pengukuran

**definisi**:

```typescript
update(id: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Pengembalian**: `MeasuresBuilder`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `id` | string | - Pengukuran ID |
| `callback` | (simpul: MeasureNodeMeasureNodeBuilder) => batal | - fungsi panggilan balik |

### find

Menemukan metrik pertama berdasarkan kriteria panggilan balik, berperilaku sama seperti Array.find.find

**definisi**:

```typescript
find(predicate: (node: MeasureNodeBuilder, index: number) => boolean): MeasureNodeBuilder | undefined
```

**Pengembalian**: `MeasureNodeBuilder \| undefined`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `predicate` | (simpul: MeasureNodeMeasureNodeBuilder, indeks: number) => boolean | - Kriteria pencarian |

### findAll

Dapatkan semua metrik

**definisi**:

```typescript
findAll(): MeasureNodeBuilder[]
```

**Pengembalian**: `MeasureNodeBuilder[]`

### toJSON

Ekspor semua metrik sebagai larik JSON

**definisi**:

```typescript
toJSON(): VBIMeasure[]
```

**Pengembalian**: `VBIMeasure[]`

### observe

Dengarkan perubahan metrik

**definisi**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Pengembalian**: `() => void`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - fungsi panggilan balik |

### static isMeasureNode

**definisi**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**Pengembalian**: `node is VBIMeasure`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `node` | `VBIMeasureTree[0]` | - |

### static isMeasureGroup

**definisi**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**Pengembalian**: `node is VBIMeasureGroup`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `node` | `VBIMeasureTree[0]` | - |