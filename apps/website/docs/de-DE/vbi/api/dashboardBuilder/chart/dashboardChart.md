# DashboardChartBuilder

## Methoden

### constructor

**Definition**:

```typescript
constructor(widget: Y.Map<any>, options?: DashboardChartBuilderOptions<TQueryDSL, TSeedDSL>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `widget` | Y.Map<any> | - |
| `options?` = {} | DashboardChartBuilderOptions<TQueryDSL, TSeedDSL> | - |

### getId

**Definition**:

```typescript
getId(): string
```

**Rückgabe**: `string`

### getBuilder

**Definition**:

```typescript
getBuilder(): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Rückgabe**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

### setTitle

**Definition**:

```typescript
setTitle(title: string): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `title` | string | - |

### setDescription

**Definition**:

```typescript
setDescription(description: string): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `description` | string | - |

### setChart

**Definition**:

```typescript
setChart(chart: ResourceReference): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setLayouts

**Definition**:

```typescript
setLayouts(layouts: DashboardWidgetLayouts): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `layouts` | DashboardWidgetLayouts | - |

### getLayouts

**Definition**:

```typescript
getLayouts(): DashboardWidgetLayouts
```

**Rückgabe**: `DashboardWidgetLayouts`

### toJSON

**Definition**:

```typescript
toJSON(): VBIDashboardWidget
```

**Rückgabe**: `VBIDashboardWidget`
