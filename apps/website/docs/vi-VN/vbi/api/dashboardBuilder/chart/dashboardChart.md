# DashboardChartBuilder

## Phương thức

### constructor

**Định nghĩa**:

```typescript
constructor(widget: Y.Map<any>, options?: DashboardChartBuilderOptions<TQueryDSL, TSeedDSL>)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `widget` | Y.Map<any> | - |
| `options?` = {} | DashboardChartBuilderOptions<TQueryDSL, TSeedDSL> | - |

### getId

**Định nghĩa**:

```typescript
getId(): string
```

**Trả về**: `string`

### getBuilder

**Định nghĩa**:

```typescript
getBuilder(): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Trả về**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

### setTitle

**Định nghĩa**:

```typescript
setTitle(title: string): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `title` | string | - |

### setDescription

**Định nghĩa**:

```typescript
setDescription(description: string): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `description` | string | - |

### setChart

**Định nghĩa**:

```typescript
setChart(chart: ResourceReference): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setLayouts

**Định nghĩa**:

```typescript
setLayouts(layouts: DashboardWidgetLayouts): this
```

**Trả về**: `this`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `layouts` | DashboardWidgetLayouts | - |

### getLayouts

**Định nghĩa**:

```typescript
getLayouts(): DashboardWidgetLayouts
```

**Trả về**: `DashboardWidgetLayouts`

### toJSON

**Định nghĩa**:

```typescript
toJSON(): VBIDashboardWidget
```

**Trả về**: `VBIDashboardWidget`
