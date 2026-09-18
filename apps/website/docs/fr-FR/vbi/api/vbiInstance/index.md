# createVBI

Crée une instance VBI indépendante.

Chaque instance possède son propre registre de ressources, adapté pour isoler différents dashboards ou contextes de test dans une même application.

## Signature de fonction

```typescript
function createVBI(): VBIInstance<DefaultVBIQueryDSL, DefaultVBISeedDSL>
function createVBI<TQueryDSL, TSeedDSL>(defaultBuilderOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>): VBIInstance<TQueryDSL, TSeedDSL>
```

## Paramètres

| Paramètre | Type | Description |
| --- | --- | --- |
| `defaultBuilderOptions` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | Configuration par défaut du chart Builder, transmise aux chart Builders créés dans chart et dashboard. |

---

# VBI

Instance VBI par défaut, adaptée à l'utilisation directe des capacités Builder et ressources partagées globalement.

**Type**: `VBIInstance`

**Définition**:

```typescript
const VBI: VBIInstance = createVBI()
```

---

# VBIInstance

L'instance VBI retournée par createVBI, point d'entrée unifié pour accéder aux capacités chart, insight, dashboard, etc.

## Propriétés

| Propriété | Type | Description |
| --- | --- | --- |
| **connectors** | `VBIConnectorNamespace` | API d'enregistrement, de récupération et de libération des connecteurs. |
| **resources** | `VBIResourceNamespace` | API d'enregistrement des ressources chart et insight, utilisées par dashboard pour référencer des ressources partagées. |
| **chart** | `VBIChartNamespace<TQueryDSL, TSeedDSL>` | API de création de Chart Builder. |
| **insight** | `VBIInsightNamespace` | API de création d'Insight Builder. |
| **dashboard** | `VBIDashboardNamespace<TQueryDSL, TSeedDSL>` | API de création de Dashboard Builder. |
