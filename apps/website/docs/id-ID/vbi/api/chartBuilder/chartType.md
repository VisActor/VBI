# ChartTypeBuilder

Pembuat tipe bagan untuk beralih dan mendapatkan tipe bagan. Mendukung berbagai jenis bagan seperti tabel, diagram batang, diagram garis, diagram lingkaran, diagram sebar, dll.

## Properti

## metode

### constructor

Konstruktor

**definisi**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### observe

Pantau perubahan jenis bagan

**definisi**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Pengembalian**: `() => void`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | ObserveCallback | - fungsi panggilan balik |

### changeChartType

Tetapkan jenis bagan

**definisi**:

```typescript
changeChartType(chartType: string)
```

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `chartType` | string | - tipe bagan |

### getChartType

Dapatkan tipe grafik saat ini

**definisi**:

```typescript
getChartType(): string
```

**Pengembalian**: `string`

### getSupportedDimensionEncodings

Dapatkan pengkodean dimensi yang didukung oleh tipe bagan saat ini

**definisi**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

Mengembalikan kode dimensi yang direkomendasikan dalam urutan dimensi berdasarkan jenis bagan saat ini.

**definisi**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `dimensionCount` | number | - Jumlah dimensi, secara default jumlah dimensi pada DSL saat ini digunakan |

### getSupportedMeasureEncodings

Dapatkan kode metrik yang didukung oleh tipe grafik saat ini

**definisi**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

Mengembalikan kode metrik yang direkomendasikan dalam urutan metrik berdasarkan jenis grafik saat ini.

**definisi**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `measureCount` | number | - Jumlah metrik, jumlah default adalah jumlah metrik pada DSL |

### toJSON

Ekspor sebagai JSON

**definisi**:

```typescript
toJSON(): string
```

**Pengembalian**: `string`

### getAvailableChartTypes

Dapatkan semua jenis bagan yang didukung

**definisi**:

```typescript
getAvailableChartTypes(): string[]
```

**Pengembalian**: `string[]`