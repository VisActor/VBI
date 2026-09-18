# DashboardChartBuilder

## 메서드

### constructor

**정의**:

```typescript
constructor(widget: Y.Map<any>, options?: DashboardChartBuilderOptions<TQueryDSL, TSeedDSL>)
```

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `widget` | Y.Map<any> | - |
| `options?` = {} | DashboardChartBuilderOptions<TQueryDSL, TSeedDSL> | - |

### getId

**정의**:

```typescript
getId(): string
```

**반환**: `string`

### getBuilder

**정의**:

```typescript
getBuilder(): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**반환**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

### setTitle

**정의**:

```typescript
setTitle(title: string): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `title` | string | - |

### setDescription

**정의**:

```typescript
setDescription(description: string): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `description` | string | - |

### setChart

**정의**:

```typescript
setChart(chart: ResourceReference): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setLayouts

**정의**:

```typescript
setLayouts(layouts: DashboardWidgetLayouts): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `layouts` | DashboardWidgetLayouts | - |

### getLayouts

**정의**:

```typescript
getLayouts(): DashboardWidgetLayouts
```

**반환**: `DashboardWidgetLayouts`

### toJSON

**정의**:

```typescript
toJSON(): VBIDashboardWidget
```

**반환**: `VBIDashboardWidget`
