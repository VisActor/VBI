# DashboardThemeBuilder

Dashboard-Theme-Builder. Verwaltet Definitionen, Vorlagen, Beobachtung und VSeed-Registrierung; Komponenten verwenden das aufgelöste Ergebnis.

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

Beobachtet lokale, rückgängig gemachte, wiederholte und synchronisierte Änderungen an Namen oder Definitionen. Gibt eine Funktion zum Abmelden zurück.

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Rückgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveCallback | - Callback bei Theme-Änderungen |

### setTheme

Wählt ein Theme. Eine optionale Definition wird im selben Schritt gespeichert und ausgewählt, ohne vorherige Registrierung oder Änderung der Diagrammressourcen.

**Definition**:

```typescript
setTheme(theme: string, definition?: VBIDashboardThemeDefinition): void
```

**Rückgabe**: `void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `theme` | string | - Nicht leerer Theme-Name |
| `definition?` | VBIDashboardThemeDefinition | - Optionale vollständige Definition für dieses Dashboard |

### registerTheme

Registriert oder aktualisiert ein Theme im Dokument, ohne es auszuwählen. Definitionen werden mit dem Dokument gespeichert und synchronisiert.

**Definition**:

```typescript
registerTheme(theme: string, definition: VBIDashboardThemeDefinition): void
```

**Rückgabe**: `void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `theme` | string | - Nicht leerer Theme-Name |
| `definition` | VBIDashboardThemeDefinition | - Vollständige Theme-Definition |

### getThemeConfig

Gibt eine Kopie der Definition zurück. Dokumentdefinitionen haben Vorrang vor integrierten Vorlagen. Fehlt eine Definition, wird undefined zurückgegeben.

**Definition**:

```typescript
getThemeConfig(theme?: string): VBIDashboardThemeDefinition | undefined
```

**Rückgabe**: `VBIDashboardThemeDefinition \| undefined`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `theme?` = this.getTheme() | string | - Theme-Name, standardmäßig das aktuelle Theme |

### getThemeDefinitions

Gibt Kopien aller Theme-Definitionen im Dokument zurück. observe abonniert Änderungen der verfügbaren Themes.

**Definition**:

```typescript
getThemeDefinitions(): Record<string, VBIDashboardThemeDefinition>
```

**Rückgabe**: `Record<string, VBIDashboardThemeDefinition>`

### getThemeOptions

Liefert Namen, Modi und Paletten der integrierten und dokumenteigenen Themes. Bei gleichen Namen hat das Dokument Vorrang.

**Definition**:

```typescript
getThemeOptions(): VBIDashboardThemeOption[]
```

**Rückgabe**: `VBIDashboardThemeOption[]`

### resolveTheme

Löst ein Theme auf und registriert es in VSeed mit isoliertem Laufzeitnamen. Unbekannte Namen fallen auf light zurück, ohne das Dokument zu ändern.

**Definition**:

```typescript
resolveTheme(theme?: string): VBIDashboardResolvedTheme
```

**Rückgabe**: `VBIDashboardResolvedTheme`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `theme?` = this.getTheme() | string | - Theme-Name, standardmäßig das ausgewählte Theme; auch zur vorübergehenden Vorschau geeignet |

### getTheme

Liest den Theme-Namen, standardmäßig light.

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
