# HavingGroupBuilder

Having Gruppierungsgenerator zum Konfigurieren logischer Beziehungen (und/oder) für eine Reihe von Bedingungen

## Eigenschaften

## Methoden

### constructor

**Definition**:

```typescript
constructor(yMap: Y.Map<any>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |

### getConditions

**Definition**:

```typescript
getConditions(): Y.Array<any>
```

**Rückgabe**: `Y.Array<any>`

### getId

Gruppen-ID abrufen

**Definition**:

```typescript
getId(): string
```

**Rückgabe**: `string`

### getOperator

Logische Operatoren abrufen

**Definition**:

```typescript
getOperator(): 'and' | 'or'
```

**Rückgabe**: `'and' \| 'or'`

### setOperator

Logischen Operator festlegen

**Definition**:

```typescript
setOperator(op: 'and' | 'or'): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Logische Operatoren |

### add

Fügen Sie der Gruppe eine Having-Filterbedingung hinzu

**Definition**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `field` | string | - Feldname |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Callback-Funktion |

### addGroup

Verschachtelte Gruppe zur aktuellen Gruppe hinzufügen

**Definition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Logische Operatoren |
| `callback` | (group: HavingGroupBuilder) => void | - Callback-Funktion |

### remove

Löschen Sie eine Bedingung mit einer bestimmten ID oder ein Element mit einem bestimmten Index

**Definition**:

```typescript
remove(idOrIndex: string | number): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID oder Index |

### clear

Alle Bedingungen in der Gruppe löschen

**Definition**:

```typescript
clear(): this
```

**Rückgabe**: `this`

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): VBIHavingGroup
```

**Rückgabe**: `VBIHavingGroup`