# Builder

## Methods

### prepare

```ts
prepare(): Promise<void>
```

Exécutez le code de filtre dynamique de manière asynchrone. Appelé avant build() pour exécuter code dans dynamicFilter. Méthode idempotente, plusieurs appels ne seront pas répétés

### build

```ts
build<T = S>(): T
```

Générez la configuration finale du diagramme (Spec). Il s’agit de la méthode de base la plus couramment utilisée. Si la configuration contient dynamicFilter code, vous devez d'abord appeler prepare()

### buildSpec

```ts
buildSpec<T = S>(advanced: AdvancedVSeed): T
```

Convertissez la configuration de niveau intermédiaire (AdvancedVSeed) en Spec final. À utiliser uniquement lorsque vous devez personnaliser en profondeur la configuration de niveau intermédiaire

### buildAdvanced

```ts
buildAdvanced(): AdvancedVSeed | null
```

Générez la configuration de niveau intermédiaire (AdvancedVSeed), qui est le modèle de graphique. Plus détaillé que l'original AdvancedVSeed, exposant plus de détails cartographiques

### getColorItems

```ts
getColorItems(): __type[]
```

Obtenez les informations de champ impliquant la couleur dans les données. Légende ou filtre de couleur couramment utilisé pour générer des graphiques UI

### getColorIdMap

```ts
getColorIdMap(): Record
```

Obtenez un tableau de mappage détaillé pour les champs de couleur. Key est la couleur ID, Value est les informations détaillées

### getColorValueMap

```ts
getColorValueMap(): undefined | Record
```

Obtient le mappage de colorId aux valeurs de couleur finales dans une palette de couleurs discrète

## Static Methods

### getAdvancedPipeline

```ts
static getAdvancedPipeline(chartType: ChartType): Pipe[]
```

[Méthode interne] Obtenez le pipeline de construction de modèles du type de graphique spécifié pour déboguer le processus de conversion de AdvancedVSeed à AdvancedVSeed

### getSpecPipeline

```ts
static getSpecPipeline(chartType: ChartType): SpecPipe[]
```

[Méthode interne] Obtenez le pipeline de construction Spec du type de graphique spécifié, utilisé pour déboguer le processus de conversion de AdvancedVSeed en Spec

### getTheme

```ts
static getTheme(themeKey?: string): CustomThemeConfig
```

Obtenez la configuration du sujet spécifié. Si themeKey n'est pas transmis, le sujet 'light' sera renvoyé par défaut.

### getThemeMap

```ts
static getThemeMap(): Record<string, CustomThemeConfig>
```

Obtenez toutes les configurations de thème enregistrées

### from

```ts
static from<T extends Spec = Spec>(vseed: VSeed): Builder<T>
```

Méthode d'usine statique pour créer facilement des instances Builder

### registerAdvancedPipeline

```ts
static registerAdvancedPipeline(chartType: ChartType, pipeline: AdvancedPipeline): void
```

[Méthode d'extension] Enregistrez le pipeline de construction de modèles du nouveau type de graphique

### registerSpecPipeline

```ts
static registerSpecPipeline(chartType: ChartType, pipeline: SpecPipeline): void
```

[Méthode d'extension] Enregistrez le pipeline de build Spec pour un nouveau type de graphique

### updateAdvanced

```ts
static updateAdvanced(chartType: ChartType, pipe: AdvancedPipe): void
```

[Méthode d'extension] Modifiez la logique de construction du modèle du graphique existant et insérez le Pipe personnalisé pour affecter le AdvancedVSeed généré

### updateSpec

```ts
static updateSpec(chartType: ChartType, pipe: SpecPipe): void
```

[Méthode d'extension] Modifier la logique de construction Spec d'un graphique existant et insérer un Pipe personnalisé pour affecter le Spec final généré

### registerTheme

```ts
static registerTheme(key: string, theme: CustomThemeConfig): void
```

[Méthode d'extension] Enregistrez un thème personnalisé

## Properties

### get locale

```ts
get locale()
```

Obtenez les paramètres régionaux actuellement utilisés par Builder

### get vseed

```ts
get vseed()
```

Obtenez les données d'entrée actuelles VSeed

### set vseed

```ts
set vseed(value)
```

Mettre à jour prepare Saisir les données. L'état du cache de prepare() sera effacé après la mise à jour

### get isPrepared

```ts
get isPrepared()
```

Obtenir le statut prepare()

### set isPrepared

```ts
set isPrepared(value: boolean)
```

Définir le statut prepare()

### get advancedVSeed

```ts
get advancedVSeed()
```

Récupère l'objet de configuration intermédiaire AdvancedVSeed actuel

### set advancedVSeed

```ts
set advancedVSeed(value)
```

Définit l'objet de configuration intermédiaire AdvancedVSeed. Généralement utilisé pour mettre en cache ou réutiliser des configurations intermédiaires existantes

### get spec

```ts
get spec()
```

Récupère l'objet Spec final actuellement généré

### set spec

```ts
set spec(value)
```

Définissez l'objet Spec. Généralement utilisé pour la mise en cache

### get performance

```ts
get performance()
```

Obtenez des statistiques de performances pendant le processus de génération. Y compris le temps passé dans chaque étape (unité : ms)

### set performance

```ts
set performance(value)
```

Définir des statistiques de performances

