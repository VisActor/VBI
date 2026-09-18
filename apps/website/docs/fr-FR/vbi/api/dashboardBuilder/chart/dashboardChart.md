# DashboardChartBuilder

## Méthodes

### constructor

**Définition**:

```typescript
constructor(widget: Y.Map<any>, options?: DashboardChartBuilderOptions<TQueryDSL, TSeedDSL>)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `widget` | Y.Map<any> | - |
| `options?` = {} | DashboardChartBuilderOptions<TQueryDSL, TSeedDSL> | - |

### getId

**Définition**:

```typescript
getId(): string
```

**Retour**: `string`

### getBuilder

**Définition**:

```typescript
getBuilder(): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Retour**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

### setTitle

**Définition**:

```typescript
setTitle(title: string): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `title` | string | - |

### setDescription

**Définition**:

```typescript
setDescription(description: string): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `description` | string | - |

### setChart

**Définition**:

```typescript
setChart(chart: ResourceReference): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setLayouts

**Définition**:

```typescript
setLayouts(layouts: DashboardWidgetLayouts): this
```

**Retour**: `this`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `layouts` | DashboardWidgetLayouts | - |

### getLayouts

**Définition**:

```typescript
getLayouts(): DashboardWidgetLayouts
```

**Retour**: `DashboardWidgetLayouts`

### toJSON

**Définition**:

```typescript
toJSON(): VBIDashboardWidget
```

**Retour**: `VBIDashboardWidget`
