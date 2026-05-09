# ReportPageBuilder

## Propriétés

## Méthodes

### constructor

**définition**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, page: Y.Map<any>)
```

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `parent` | `VBIReportBuilder<TQueryDSL, TSeedDSL>` | - |
| `page` | `Y.Map<any>` | - |

### getId

**définition**:

```typescript
getId(): string
```

**Retour** : `string`

### setTitle

**définition**:

```typescript
setTitle(title: string): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `title` | string | - |

### setChartId

**définition**:

```typescript
setChartId(chart: ResourceReference): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setInsightId

**définition**:

```typescript
setInsightId(insight: ResourceReference): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### toJSON

**définition**:

```typescript
toJSON(): VBIReportPageDSL
```

**Retour** : `VBIReportPageDSL`