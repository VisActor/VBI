# createVBI

Erstellt eine unabhängige VBI-Instanz.

Jede Instanz besitzt ihre eigene Ressourcenregistrierung und eignet sich dazu, unterschiedliche Dashboards oder Testkontexte innerhalb derselben Anwendung zu isolieren.

## Funktionssignatur

```typescript
function createVBI(): VBIInstance<DefaultVBIQueryDSL, DefaultVBISeedDSL>
function createVBI<TQueryDSL, TSeedDSL>(defaultBuilderOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>): VBIInstance<TQueryDSL, TSeedDSL>
```

## Parameter

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `defaultBuilderOptions` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | Standardkonfiguration für den Chart Builder, die an Chart Builder übergeben wird, die in chart und dashboard erstellt werden. |

---

# VBI

Die Standard-VBI-Instanz, geeignet für die direkte Nutzung global geteilter Builder- und Ressourcenfunktionen.

**Typ**: `VBIInstance`

**Definition**:

```typescript
const VBI: VBIInstance = createVBI()
```

---

# VBIInstance

Die von createVBI zurückgegebene VBI-Instanz ist der einheitliche Einstiegspunkt für chart, insight, dashboard, weitere Funktionen.

## Eigenschaften

| Eigenschaft | Typ | Beschreibung |
| --- | --- | --- |
| **connectors** | `VBIConnectorNamespace` | APIs zum Registrieren, Abrufen und Freigeben von Connectors. |
| **resources** | `VBIResourceNamespace` | APIs zum Registrieren von Chart- und Insight-Ressourcen, damit dashboard gemeinsame Ressourcen referenzieren können. |
| **chart** | `VBIChartNamespace<TQueryDSL, TSeedDSL>` | API zum Erstellen von Chart Buildern. |
| **insight** | `VBIInsightNamespace` | API zum Erstellen von Insight Buildern. |
| **dashboard** | `VBIDashboardNamespace<TQueryDSL, TSeedDSL>` | API zum Erstellen von Dashboard Buildern. |
