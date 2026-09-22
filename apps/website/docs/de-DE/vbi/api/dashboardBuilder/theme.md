# DashboardThemeBuilder

Dashboard-Theme-Builder. Speichert den Theme-Namen; der Renderer registriert und ermittelt die Stile.

## Methoden

### constructor

**Definition**:

```typescript
constructor(dsl: Y.Map<any>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `dsl` | Y.Map<any> | - |

### observe

Beobachtet lokale, rückgängig gemachte und kollaborative Theme-Änderungen und gibt eine Abmeldefunktion zurück.

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Rückgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveCallback | - Callback für Theme-Änderungen |

### setTheme

Setzt light, dark oder ein registriertes benutzerdefiniertes Theme, ohne referenzierte Diagrammressourcen zu ändern.

**Definition**:

```typescript
setTheme(theme: string): void
```

**Rückgabe**: `void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `theme` | string | - Nicht leerer Theme-Name |

### getTheme

Liest den Theme-Namen; Standard ist light.

**Definition**:

```typescript
getTheme(): string
```

**Rückgabe**: `string`

### toJSON

Exportiert den Theme-Namen.

**Definition**:

```typescript
toJSON(): string
```

**Rückgabe**: `string`