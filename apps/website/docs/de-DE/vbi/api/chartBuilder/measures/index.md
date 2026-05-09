# MeasuresBuilder

Ein Metrik-Generator zum Hinzufügen, Ändern und Löschen von Metrikkonfigurationen.Messungen sind numerische Datenfelder wie Umsatz, Gewinn, Menge

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

Eine Metrik hinzufügen

**Definition**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Rückgabe**: `MeasuresBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `field` | string | - Feldname |
| `callback` | (node: MeasureNodeBuilder) => void | - Callback-Funktion |

### remove

Metrik mit der angegebenen ID löschen

**Definition**:

```typescript
remove(id: string): MeasuresBuilder
```

**Rückgabe**: `MeasuresBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | string | - Metrik-ID |

### update

Metrikkonfiguration aktualisieren

**Definition**:

```typescript
update(id: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Rückgabe**: `MeasuresBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | string | - Metrik-ID |
| `callback` | (node: MeasureNodeBuilder) => void | - Callback-Funktion |

### find

Finden Sie die erste Metrik anhand der Rückrufbedingung, das Verhalten stimmt mit Array.find überein

**Definition**:

```typescript
find(predicate: (node: MeasureNodeBuilder, index: number) => boolean): MeasureNodeBuilder | undefined
```

**Rückgabe**: `MeasureNodeBuilder \| undefined`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `predicate` | (node: MeasureNodeBuilder, index: number) => boolean | - Kriterien finden |

### findAll

Alle Metriken abrufen

**Definition**:

```typescript
findAll(): MeasureNodeBuilder[]
```

**Rückgabe**: `MeasureNodeBuilder[]`

### toJSON

Alle Metriken als JSON-Arrays exportieren

**Definition**:

```typescript
toJSON(): VBIMeasure[]
```

**Rückgabe**: `VBIMeasure[]`

### observe

Achten Sie auf Änderungen der Metrik

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Rückgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Callback-Funktion |

### static isMeasureNode

**Definition**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**Rückgabe**: `node is VBIMeasure`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `node` | `VBIMeasureTree[0]` | - |

### static isMeasureGroup

**Definition**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**Rückgabe**: `node is VBIMeasureGroup`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `node` | `VBIMeasureTree[0]` | - |