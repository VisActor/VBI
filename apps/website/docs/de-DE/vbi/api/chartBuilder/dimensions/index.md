# DimensionsBuilder

Ein Dimensions-Generator zum Hinzufügen, Ändern und Löschen von Dimensionskonfigurationen.Dimension ist das Klassifizierungsfeld der Daten, wie z. B.: Zeit, Region, Produktkategorie

## Eigenschaften

## Methoden

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### add

Dimension hinzufügen

**Definition**:

```typescript
add(field: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Rückgabe**: `DimensionsBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `field` | string | - Feldname |
| `callback` | (node: DimensionNodeBuilder) => void | - Callback-Funktion |

### remove

Dimension mit angegebener ID löschen

**Definition**:

```typescript
remove(id: string): DimensionsBuilder
```

**Rückgabe**: `DimensionsBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | string | - Dimensions-ID |

### update

Konfiguration für angegebene Dimensions-ID aktualisieren

**Definition**:

```typescript
update(id: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Rückgabe**: `DimensionsBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | string | - Dimensions-ID |
| `callback` | (node: DimensionNodeBuilder) => void | - Callback-Funktion |

### find

Finden Sie die erste Dimension durch die Rückrufbedingung, das Verhalten ist konsistent mit Array.find

**Definition**:

```typescript
find(predicate: (node: DimensionNodeBuilder, index: number) => boolean): DimensionNodeBuilder | undefined
```

**Rückgabe**: `DimensionNodeBuilder \| undefined`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `predicate` | (node: DimensionNodeBuilder, index: number) => boolean | - Kriterien finden |

### findAll

Alle Abmessungen abrufen

**Definition**:

```typescript
findAll(): DimensionNodeBuilder[]
```

**Rückgabe**: `DimensionNodeBuilder[]`

### toJSON

Alle Dimensionen als JSON-Array exportieren

**Definition**:

```typescript
toJSON(): VBIDimension[]
```

**Rückgabe**: `VBIDimension[]`

### observe

Achten Sie auf Dimensionsänderungen und geben Sie die Funktion zurück, um das Hören abzubrechen

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Rückgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Callback-Funktion |

### static isDimensionNode

**Definition**:

```typescript
static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
```

**Rückgabe**: `node is VBIDimension`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `node` | `VBIDimensionTree[0]` | - |

### static isDimensionGroup

**Definition**:

```typescript
static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
```

**Rückgabe**: `node is VBIDimensionGroup`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `node` | `VBIDimensionTree[0]` | - |