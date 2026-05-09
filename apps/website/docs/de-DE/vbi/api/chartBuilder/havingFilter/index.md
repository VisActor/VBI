# HavingFilterBuilder

Having Filter Builder zum Hinzufügen, Ändern und Löschen von Filterkriterien nach der Gruppierung.Die Filterung wird nach der Datenaggregation wirksam, um die Gruppierungsergebnisse zu filtern

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

Einen Having-Filter hinzufügen

**Definition**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Rückgabe**: `HavingFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `field` | string | - Feldname |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Callback-Funktion |

### addGroup

Fügen Sie eine Haben-Gruppierung hinzu

**Definition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Rückgabe**: `HavingFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Logische Operatoren |
| `callback` | (group: HavingGroupBuilder) => void | - Callback-Funktion |

### update

Filterkriterien für angegebene IDs aktualisieren

**Definition**:

```typescript
update(id: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Rückgabe**: `HavingFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | string | - Filter-ID |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Callback-Funktion |

### updateGroup

Gruppierung der angegebenen IDs aktualisieren

**Definition**:

```typescript
updateGroup(id: string, callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Rückgabe**: `HavingFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `id` | string | - Gruppen-ID |
| `callback` | (group: HavingGroupBuilder) => void | - Callback-Funktion |

### remove

Löschen Sie eine Bedingung mit einer bestimmten ID oder ein Element mit einem bestimmten Index

**Definition**:

```typescript
remove(idOrIndex: string | number): HavingFilterBuilder
```

**Rückgabe**: `HavingFilterBuilder`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID oder Index |

### find

Finden Sie die erste Bedingung (Filtern oder Gruppieren) nach der Rückrufbedingung, das Verhalten stimmt mit Array.find überein

**Definition**:

```typescript
find(predicate: (entry: HavingFilterNodeBuilder | HavingGroupBuilder, index: number) => boolean): HavingFilterNodeBuilder | HavingGroupBuilder | undefined
```

**Rückgabe**: `HavingFilterNodeBuilder \| HavingGroupBuilder \| undefined`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `predicate` | (entry: HavingFilterNodeBuilder \| HavingGroupBuilder, index: number) => boolean | - Kriterien finden |

### clear

Alle Having-Filter löschen

**Definition**:

```typescript
clear()
```

### toJSON

Vollständigen Export mit Filterkonfiguration exportieren

**Definition**:

```typescript
toJSON(): VBIHavingGroup
```

**Rückgabe**: `VBIHavingGroup`

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