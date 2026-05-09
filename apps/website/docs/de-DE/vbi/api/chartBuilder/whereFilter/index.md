# WhereFilterBuilder

Where Filter Builder zum Hinzufügen, Ändern und Löschen von Filterkriterien auf Zeilenebene.Wo die Filterung vor der Datenabfrage wirksam wird, wird zum Filtern von Rohdaten verwendet

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

### getConditions

**Definition**:

```typescript
getConditions(): Y.Array<any>
```

**Rückgabe**: `Y.Array<any>`

### add

Einen Wo-Filter hinzufügen

**Definition**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Rückgabe**: `WhereFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `field` | string | - Feldname |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Callback-Funktion |

### addGroup

Fügen Sie eine WO-Gruppierung hinzu

**Definition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Rückgabe**: `WhereFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Logische Operatoren |
| `callback` | (group: WhereGroupBuilder) => void | - Callback-Funktion |

### update

Filterkriterien für angegebene IDs aktualisieren

**Definition**:

```typescript
update(id: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Rückgabe**: `WhereFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | string | - Filter-ID |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Callback-Funktion |

### updateGroup

Gruppierung der angegebenen IDs aktualisieren

**Definition**:

```typescript
updateGroup(id: string, callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Rückgabe**: `WhereFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | string | - Gruppen-ID |
| `callback` | (group: WhereGroupBuilder) => void | - Callback-Funktion |

### remove

Löschen Sie eine Bedingung mit einer bestimmten ID oder ein Element mit einem bestimmten Index

**Definition**:

```typescript
remove(idOrIndex: string | number): WhereFilterBuilder
```

**Rückgabe**: `WhereFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID oder Index |

### find

Finden Sie die erste Bedingung (Filtern oder Gruppieren) nach der Rückrufbedingung, das Verhalten stimmt mit Array.find überein

**Definition**:

```typescript
find(predicate: (entry: WhereFilterNodeBuilder | WhereGroupBuilder, index: number) => boolean): WhereFilterNodeBuilder | WhereGroupBuilder | undefined
```

**Rückgabe**: `WhereFilterNodeBuilder \| WhereGroupBuilder \| undefined`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `predicate` | (entry: WhereFilterNodeBuilder \| WhereGroupBuilder, index: number) => boolean | - Kriterien finden |

### clear

Alle Where-Filter löschen

**Definition**:

```typescript
clear()
```

### toJSON

Vollständig exportieren Wo Filterkonfiguration

**Definition**:

```typescript
toJSON(): VBIWhereGroup
```

**Rückgabe**: `VBIWhereGroup`

### observe

Hören Sie auf Filterzustandsänderungen und geben Sie die Funktion zurück, um das Hören abzubrechen

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Rückgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - Callback-Funktion |

### static isGroup

Stellen Sie fest, ob es sich um einen Paketknoten handelt

**Definition**:

```typescript
static isGroup(yMap: Y.Map<any>): boolean
```

**Rückgabe**: `boolean`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |

### static isNode

Bestimmen Sie, ob es sich um einen Blattknoten handelt

**Definition**:

```typescript
static isNode(yMap: Y.Map<any>): boolean
```

**Rückgabe**: `boolean`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |