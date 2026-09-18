# DashboardChartBuilder

## Metode

### constructor

**Definisi**:

```typescript
constructor(widget: Y.Map<any>, options?: DashboardChartBuilderOptions<TQueryDSL, TSeedDSL>)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `widget` | Y.Map<any> | - |
| `options?` = {} | DashboardChartBuilderOptions<TQueryDSL, TSeedDSL> | - |

### getId

**Definisi**:

```typescript
getId(): string
```

**Mengembalikan**: `string`

### getBuilder

**Definisi**:

```typescript
getBuilder(): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Mengembalikan**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

### setTitle

**Definisi**:

```typescript
setTitle(title: string): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `title` | string | - |

### setDescription

**Definisi**:

```typescript
setDescription(description: string): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `description` | string | - |

### setChart

**Definisi**:

```typescript
setChart(chart: ResourceReference): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setLayouts

**Definisi**:

```typescript
setLayouts(layouts: DashboardWidgetLayouts): this
```

**Mengembalikan**: `this`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `layouts` | DashboardWidgetLayouts | - |

### getLayouts

**Definisi**:

```typescript
getLayouts(): DashboardWidgetLayouts
```

**Mengembalikan**: `DashboardWidgetLayouts`

### toJSON

**Definisi**:

```typescript
toJSON(): VBIDashboardWidget
```

**Mengembalikan**: `VBIDashboardWidget`
