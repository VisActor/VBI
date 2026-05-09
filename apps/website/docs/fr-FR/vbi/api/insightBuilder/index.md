# VBIInsightBuilder

## Propriétés

| Propriétés | taper | Description |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |


## Méthodes

### constructor

**définition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### applyUpdate

**définition**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): any
```

**Retour** : `any`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `update` | `Uint8Array` | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**définition**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): any
```

**Retour** : `any`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `targetStateVector` | `Uint8Array` | - |

### getUUID

**définition**:

```typescript
getUUID(): string
```

**Retour** : `string`

### setContent

**définition**:

```typescript
setContent(content: string): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `content` | string | - |

### build

**définition**:

```typescript
build(): VBIInsightDSL
```

**Retour** : `VBIInsightDSL`

### isEmpty

**définition**:

```typescript
isEmpty(): boolean
```

**Retour** : `boolean`