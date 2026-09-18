# VBI.resources

Der Ressourcen-Namespace auf einer VBI-Instanz, zum Registrieren gemeinsamer Ressourcen, die von dashboard referenziert werden können.

## Eigenschaften

| Eigenschaft | Typ | Beschreibung |
| --- | --- | --- |
| **chart** | `VBIChartResourceNamespace` | API zur Verwaltung von Chart-Ressourcen. |
| **insight** | `VBIInsightResourceNamespace` | API zur Verwaltung von Insight-Ressourcen. |


## Methoden

### register

Registriert Chart- und insight-Ressourcen gesammelt.

**Definition**:

```typescript
register(resources: VBIResourceRegisterInput): VBIResourceRegisterResult
```

**Rückgabe**: `VBIResourceRegisterResult`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `resources` | VBIResourceRegisterInput | - |

### clear

Leert alle Chart- und insight-Ressourcen der aktuellen VBI-Instanz.

**Definition**:

```typescript
clear(): void
```

**Rückgabe**: `void`

### snapshot

Exportiert einen DSL-Snapshot der Ressourcen, die von der aktuellen VBI-Instanz referenziert werden können.

**Definition**:

```typescript
snapshot(): VBIResourceSnapshot
```

**Rückgabe**: `VBIResourceSnapshot`
