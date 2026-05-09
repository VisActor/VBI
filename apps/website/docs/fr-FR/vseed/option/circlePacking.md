# CirclePacking

:::info{title="encodage mappage"}
Les graphiques à cercles prennent en charge les canaux visuels suivants :

`color` : canal de couleur, prend en charge `plusieurs dimensions` ou `une mesure`

`label` : canal d'étiquette, prend en charge `plusieurs dimensions` et `plusieurs mesures`

`tooltip` : canal d'infobulle, prend en charge `plusieurs dimensions` et `plusieurs mesures`

:::

:::note{title="Description"}
Graphique circulaire, utilisé pour afficher des données hiérarchiques, utilisant la taille du cercle pour représenter la valeur numérique

Scénarios applicables :

\- Afficher la répartition proportionnelle des données hiérarchiques

\- Mettre l'accent sur la relation d'inclusion des données

:::

:::warning{title="Warning"}
Exigences en matière de données :

\- Au moins 1 champ numérique (métrique) utilisé pour cartographier la taille du cercle

\- Au moins un champ de dimension est utilisé pour la division hiérarchique

:::


## chartType

**Type:** `"circlePacking"`

:::note{title="Description"}
Schéma d'emballage circulaire



Graphique d'emballage circulaire, montrant la relation de proportion des données hiérarchiques

:::

**Exemple**
```ts
'circlePacking'




```
## dataset

**Type:** `Record[]`

:::note{title="Description"}
Ensemble de données



Un ensemble de données agrégées conforme aux TidyData et utilisé pour définir la source de données et la structure du graphique

:::

**Exemple**
```ts
[{category:'A', value:30}, {category:'B', value:70}]




```
## dimensions

**Type:** `HierarchyDimension[] | undefined`

:::note{title="Description"}
Dimensions



Configuration des dimensions, utilisée pour définir la structure hiérarchique des données

:::

**Exemple**
```ts
[{id : 'category', alias : 'Catégorie'}]




```
### id

**Type:** `string`

:::note{title="Description"}
L'identifiant du champ correspondant à la dimension

:::

### alias

**Type:** `string | undefined`

:::note{title="Description"}
alias de dimension

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title="Description"}
Configuration du formatage de l'heure des dimensions

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title="Description"}
La granularité temporelle détermine la précision de l'affichage de la date

:::

### encoding

**Type:** `"tooltip" | "label" | "hierarchy" | undefined`

:::note{title="Description"}
Canaux de mappage dimensionnel

\- hierarchy : prend en charge le mappage de plusieurs dimensions vers des canaux hiérarchiques

\- label : prise en charge du mappage de plusieurs dimensions pour étiqueter les canaux

\- tooltip : prise en charge du mappage de plusieurs dimensions pour infobuller les canaux

:::

:::tip{title="Tip"}
La première dimension sera mappée directement sur le canal color

:::


## measures

**Type:** `HierarchyMeasure[] | undefined`

:::note{title="Description"}
indice



Configuration des mesures pour définir la taille du cercle

:::

**Exemple**
```ts
[{id : 'value', alias : 'valeur numérique'}]




```
### id

**Type:** `string`

:::note{title="Description"}
ID de l'mesure, ne peut pas être répété

:::

### alias

**Type:** `string | undefined`

:::note{title="Description"}
Alias ​​de l'mesure, doublons autorisés, s'il n'est pas renseigné, alias sera id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="Description"}
Le formatage numérique automatique, activé par défaut, a la priorité la plus élevée

Lorsque autoFormat=true, toutes les configurations de numFormat seront écrasées.

Après l'avoir activé, les étiquettes de données et les informations d'infobulle du graphique sélectionneront automatiquement la méthode de formatage appropriée en fonction de la valeur de l'mesure et des paramètres régionaux.

Règles de formatage : valeur décimale, activer compact notation, minimum 0 décimale, maximum 2 décimales, arrondi automatique, utiliser Intl.NumberFormat fourni par le navigateur

Par exemple:

\- localepour zh\-CN : 749740,264 → 744 500

\- localepour en\-US : 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="Description"}
Le formatage des valeurs des mesures personnalisés sera automatiquement appliqué aux label, tooltip

REMARQUE : Pour utiliser un formatage personnalisé, autoFormat=false doit être défini explicitement, sinon autoFormat remplacera cette configuration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="Description"}
Type de formatage numérique, prenant en charge la valeur numérique (décimale), le pourcentage (%), les millièmes (‰) et la notation scientifique

:::

#### ratio

**Type:** `number | undefined`

:::note{title="Description"}
Taux de formatage numérique, ne peut pas être 0

:::

**Exemple**
```ts
\- 100000 est converti en 10 dix-mille, ratio:10000, symbol:"Dix mille"
\- 100 000 convertis en 10 Ko, ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="Description"}
Symboles de formatage numérique, tels que %, ‰

:::

**Exemple**
```ts
\- 100000 est converti en 10 dix-mille, ratio:10000, symbol:"Dix mille"
\- 100 000 convertis en 10 Ko, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="Description"}
Séparateur de milliers de formatage numérique

:::

#### suffix

**Type:** `string | undefined`

:::note{title="Description"}
Suffixe de format numérique

:::

#### prefix

**Type:** `string | undefined`

:::note{title="Description"}
Préfixe de formatage numérique

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="Description"}
Formatage numérique décimales, utilisez minimumFractionDigits et maximumFractionDigits dans Intl.NumberFormat fourni par le navigateur pour le formatage, avec une priorité inférieure à significantDigits

:::

**Exemple**
```ts
\- 1234.5678 converti en 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converti en 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="Description"}
Bits valides pour le formatage numérique, utilisez minimumSignificantDigits et maximumSignificantDigits dans Intl.NumberFormat fourni par le navigateur pour le formatage, avec une priorité plus élevée que fractionDigits

:::

**Exemple**
```ts
\- 1234.5678 converti en 1000, significantDigits:1
\- 1234.5678 converti en 1200, significantDigits:2
\- 1234.5678 converti en 1230, significantDigits:3
\- 1234.5678 converti en 1234, significantDigits:4
\- 1234.5678 converti en 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="Description"}
Priorité d'arrondi du formatage numérique, gère la priorité d'arrondi lorsque significantDigits et fractionDigits sont définis, utilise Intl.NumberFormat fourni par le navigateur pour le formatage, les règles sont les mêmes que celles de roundingPriority dans Intl.NumberFormat

:::

**Exemple**
```ts
\- 1234.5678 converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="Description"}
Mode d'arrondi du formatage numérique, utilisez Intl.NumberFormat fourni par le navigateur pour le formatage, les règles sont les mêmes que roundingMode dans Intl.NumberFormat

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="Description"}
Type de formatage numérique, prenant en charge la valeur numérique (décimale), le pourcentage (%), les millièmes (‰) et la notation scientifique

:::

#### ratio

**Type:** `number | undefined`

:::note{title="Description"}
Taux de formatage numérique, ne peut pas être 0

:::

**Exemple**
```ts
\- 100000 est converti en 10 dix-mille, ratio:10000, symbol:"Dix mille"
\- 100 000 convertis en 10 Ko, ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="Description"}
Symboles de formatage numérique, tels que %, ‰

:::

**Exemple**
```ts
\- 100000 est converti en 10 dix-mille, ratio:10000, symbol:"Dix mille"
\- 100 000 convertis en 10 Ko, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="Description"}
Séparateur de milliers de formatage numérique

:::

#### suffix

**Type:** `string | undefined`

:::note{title="Description"}
Suffixe de format numérique

:::

#### prefix

**Type:** `string | undefined`

:::note{title="Description"}
Préfixe de formatage numérique

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="Description"}
Formatage numérique décimales, utilisez minimumFractionDigits et maximumFractionDigits dans Intl.NumberFormat fourni par le navigateur pour le formatage, avec une priorité inférieure à significantDigits

:::

**Exemple**
```ts
\- 1234.5678 converti en 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converti en 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="Description"}
Bits valides pour le formatage numérique, utilisez minimumSignificantDigits et maximumSignificantDigits dans Intl.NumberFormat fourni par le navigateur pour le formatage, avec une priorité plus élevée que fractionDigits

:::

**Exemple**
```ts
\- 1234.5678 converti en 1000, significantDigits:1
\- 1234.5678 converti en 1200, significantDigits:2
\- 1234.5678 converti en 1230, significantDigits:3
\- 1234.5678 converti en 1234, significantDigits:4
\- 1234.5678 converti en 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="Description"}
Priorité d'arrondi du formatage numérique, gère la priorité d'arrondi lorsque significantDigits et fractionDigits sont définis, utilise Intl.NumberFormat fourni par le navigateur pour le formatage, les règles sont les mêmes que celles de roundingPriority dans Intl.NumberFormat

:::

**Exemple**
```ts
\- 1234.5678 converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="Description"}
Mode d'arrondi du formatage numérique, utilisez Intl.NumberFormat fourni par le navigateur pour le formatage, les règles sont les mêmes que roundingMode dans Intl.NumberFormat

:::

### encoding

**Type:** `"tooltip" | "label" | "size" | undefined`

:::note{title="Description"}
Canal de cartographie des mesures

\- size : L'mesure est mappé au canal de taille, qui est utilisé pour afficher la zone ou la taille des graphiques tels que les diagrammes arborescents.

\- label : Tags pour la cartographie des mesures

\- tooltip : Conseils sur la cartographie des mesures

:::

### parentId

**Type:** `string | undefined`

:::note{title="Description"}
Construisez un groupe d’mesures en forme d’arbre sous la forme d’une configuration d’mesures plats. parentId pointe vers l'identifiant du groupe d'mesures parent, qui est utilisé pour créer l'arborescence des mesures.

:::

:::tip{title="Tip"}
Il existe deux manières de configurer l'arborescence des mesures. La première façon consiste à configurer directement l’arborescence des mesures avec les enfants. La deuxième façon consiste à configurer la liste d'mesures plats de parentId. Les deux manières ne peuvent pas être configurées en même temps.

:::


## page

**Type:** `Page | undefined`

:::note{title="Description"}
Configuration de la pagination



Le nom du champ utilisé pour spécifier la pagination doit être une dimension

:::


### field

**Type:** `string`

:::note{title="Description"}
Le champ de pagination, utilisé pour spécifier le nom du champ de pagination, doit être une dimension

:::

### currentValue

**Type:** `string`

:::note{title="Description"}
Valeur de pagination actuelle, utilisée pour spécifier la valeur de base de la pagination actuelle

:::

**Exemple**
```ts
'2023\-01\-01'




```
## backgroundColor

**Type:** `BackgroundColor`

:::note{title="Description"}
Couleur d’arrière-plan du graphique



La couleur d'arrière-plan peut être une chaîne de couleur, telle que 'red', 'blue' ou hexadécimal, rgb ou rgba '#ff0000', 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title="Description"}
couleur



Configuration des couleurs, utilisée pour définir la palette de couleurs du graphique, y compris la liste des couleurs, le mappage des couleurs, le dégradé de couleurs, etc.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title="Description"}
Jeux de couleurs discrets, les jeux de couleurs sont utilisés pour définir les couleurs des différents éléments d'un graphique.

:::

**Exemple**
```ts
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



```
### linearColorScheme

**Type:** `string[] | undefined`

:::note{title="Description"}
Schéma de couleurs en dégradé linéaire, le schéma de couleurs en dégradé linéaire est utilisé pour définir les couleurs des différents éléments du graphique.

:::

**Exemple**
```ts
['#FFCDD2, #F8BBD0]



```
### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title="Description"}
Cartographie des couleurs, la cartographie des couleurs est utilisée pour mapper les valeurs des données à des couleurs spécifiques

:::

**Exemple**
```ts
{
 'profit': 'red',
 'sales': 'blue',
}



```
### positiveColor

**Type:** `string | undefined`

:::note{title="Description"}
Configuration des couleurs positives et négatives, utilisée pour définir la couleur des valeurs positives dans le graphique

:::

### negativeColor

**Type:** `string | undefined`

:::note{title="Description"}
Configuration des couleurs positives et négatives, utilisée pour définir la couleur des valeurs négatives dans le graphique

:::


## label

**Type:** `Label | undefined`

:::note{title="Description"}
Étiquette



La configuration des étiquettes est utilisée pour définir les étiquettes de données du graphique, y compris la position, le format, le style, etc. des étiquettes de données.

:::


### enable

**Type:** `false | true`

:::note{title="Description"}
La fonction d'étiquetage est-elle activée ?

:::

### wrap

**Type:** `boolean | undefined`

:::note{title="Description"}
Si l'étiquette s'enroule

:::

### showValue

**Type:** `boolean | undefined`

:::note{title="Description"}
Si l'étiquette affiche la valeur de l'mesure

Dans les scénarios multi-mesures, il n'y a pas lieu de s'inquiéter des valeurs conflictuelles de plusieurs mesures, car tous les mesures liés au dessin seront traités par `foldMeasures` et fusionnés en un seul mesure, représentant un point de données, il n'y aura donc pas de conflits.

Remarque : le label du encoding a une priorité plus élevée, cette configuration n'affecte pas le label du encoding

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title="Description"}
Si l'étiquette affiche le pourcentage de la valeur métrique

Dans les scénarios multi-mesures, il n'y a pas lieu de s'inquiéter des valeurs conflictuelles de plusieurs mesures, car tous les mesures liés au dessin seront traités par `foldMeasures` et fusionnés en un seul mesure, représentant un point de données, il n'y aura donc pas de conflits.

Remarque : le label du encoding a une priorité plus élevée, cette configuration n'affecte pas le label du encoding

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title="Description"}
Indique si l'étiquette affiche les étiquettes de dimension

Afficher toutes les étiquettes de dimension

Remarque : le label du encoding a une priorité plus élevée, cette configuration n'affecte pas le label du encoding

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="Description"}
Indique si la valeur de la balise est automatiquement formatée. Lorsque autoFormat est true, la configuration numFormat devient invalide.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="Description"}
La configuration de formatage de la valeur de l'étiquette sera fusionnée avec le `format` dans `measure`, et le `format` dans `measure` aura une priorité plus élevée. numFormat a une priorité inférieure à autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="Description"}
Type de formatage numérique, prenant en charge la valeur numérique (décimale), le pourcentage (%), les millièmes (‰) et la notation scientifique

:::

#### ratio

**Type:** `number | undefined`

:::note{title="Description"}
Taux de formatage numérique, ne peut pas être 0

:::

**Exemple**
```ts
\- 100000 est converti en 10 dix-mille, ratio:10000, symbol:"Dix mille"
\- 100 000 convertis en 10 Ko, ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="Description"}
Symboles de formatage numérique, tels que %, ‰

:::

**Exemple**
```ts
\- 100000 est converti en 10 dix-mille, ratio:10000, symbol:"Dix mille"
\- 100 000 convertis en 10 Ko, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="Description"}
Séparateur de milliers de formatage numérique

:::

#### suffix

**Type:** `string | undefined`

:::note{title="Description"}
Suffixe de format numérique

:::

#### prefix

**Type:** `string | undefined`

:::note{title="Description"}
Préfixe de formatage numérique

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="Description"}
Formatage numérique décimales, utilisez minimumFractionDigits et maximumFractionDigits dans Intl.NumberFormat fourni par le navigateur pour le formatage, avec une priorité inférieure à significantDigits

:::

**Exemple**
```ts
\- 1234.5678 converti en 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 est converti en 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converti en 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="Description"}
Bits valides pour le formatage numérique, utilisez minimumSignificantDigits et maximumSignificantDigits dans Intl.NumberFormat fourni par le navigateur pour le formatage, avec une priorité plus élevée que fractionDigits

:::

**Exemple**
```ts
\- 1234.5678 converti en 1000, significantDigits:1
\- 1234.5678 converti en 1200, significantDigits:2
\- 1234.5678 converti en 1230, significantDigits:3
\- 1234.5678 converti en 1234, significantDigits:4
\- 1234.5678 converti en 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converti en 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="Description"}
Priorité d'arrondi du formatage numérique, gère la priorité d'arrondi lorsque significantDigits et fractionDigits sont définis, utilise Intl.NumberFormat fourni par le navigateur pour le formatage, les règles sont les mêmes que celles de roundingPriority dans Intl.NumberFormat

:::

**Exemple**
```ts
\- 1234.5678 converti en 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converti en 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="Description"}
Mode d'arrondi du formatage numérique, utilisez Intl.NumberFormat fourni par le navigateur pour le formatage, les règles sont les mêmes que roundingMode dans Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de la police de l'étiquette

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="Description"}
Poids de la police de l'étiquette

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur d’arrière-plan de l’étiquette

:::

### labelStroke

**Type:** `string | undefined`

:::note{title="Description"}
Couleur du trait de l'étiquette

:::

### labelColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la police de l'étiquette

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title="Description"}
Si l'étiquette inverse automatiquement la couleur de la police en fonction de la couleur de l'élément

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title="Description"}
position de l'étiquette

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title="Description"}
La fonction anti-chevauchement des étiquettes est-elle activée ?

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="Description"}
Filtrage de balises, la relation conditionnelle par défaut entre les sélecteurs est Ou

:::


#### field

**Type:** `string`

:::note{title="Description"}
Champ de dimension, dimensions id d'un certain article

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="Description"}
Opérateur

\- in : Sélectionnez l'élément de données dont la valeur du champ de dimension est dans value

\- not in : Sélectionnez les éléments de données dont les valeurs des champs de dimension ne sont pas dans value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="Description"}
Opérateur

\- in : Sélectionnez l'élément de données dont la valeur du champ de dimension est dans value

\- not in : Sélectionnez les éléments de données dont les valeurs des champs de dimension ne sont pas dans value

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="Description"}
Sélectionnez la valeur du champ de dimension dans l'élément de données, prenant en charge les tableaux

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="Description"}
Filtres dynamiques (exécution de code généré par l'IA)



Implémenter une logique complexe de filtrage des données via le code JavaScript généré par AI



Compétences de base :

\- Prend en charge des conditions de filtrage de données arbitrairement complexes

\- Utiliser les fonctions utilitaires intégrées pour la manipulation des données

\- Exécution sécurisée dans un environnement de navigateur (Web Worker sandbox)



Exigences d'environnement : seuls les environnements de navigateur sont pris en charge, l'environnement fallback utilisera fallback



Remarque : selector et dynamicFilter ne peuvent pas être utilisés en même temps, dynamicFilter a une priorité plus élevée



Configuration du filtre dynamique du graphique



Implémenter le filtrage des marqueurs graphiques (barres, points, etc.) via le code JavaScript généré par AI

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="Description"}
Description des besoins de filtrage de l'utilisateur (langage naturel)

:::

**Exemple**
```ts
"Mettez en surbrillance les barres dont les ventes sont supérieures à 1 000"

"Mettez en évidence les bars avec la marge bénéficiaire la plus élevée dans chaque domaine"



```
#### code

**Type:** `string`

:::note{title="Description"}
AI Généré JavaScript code filtre



\- Ne peut utiliser que les fonctions utilitaires intégrées (accessibles via _ ou R)

\- Paramètres d'entrée : data (tableau), chaque item contient un champ __row_index représentant le numéro de ligne

\- Doit renvoyer un tableau de combinaisons d'index de ligne et de champ : ``Array<{ __row_index: number, field: string }>``

\- __row_index représente le numéro de ligne de l'élément de données d'origine, field représente le champ qui doit être mis en surbrillance.

\- Utilisation interdite : eval, Function, opérations asynchrones, Function eval, requêtes réseau

:::

**Exemple**
```ts
Mettez en surbrillance le champ sales des éléments de données dont les ventes sont supérieures à 1 000.
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Mettez en évidence les éléments de données les plus rentables dans chaque domaine
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

Mettre en surbrillance les éléments de données filtrés par plusieurs conditions
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```



```
#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title="Description"}
Rétrograder la solution lorsque l'exécution du code échoue ou que l'environnement ne la prend pas en charge

:::


##### field

**Type:** `string`

:::note{title="Description"}
Champ de dimension, dimensions id d'un certain article

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="Description"}
Opérateur

\- in : Sélectionnez l'élément de données dont la valeur du champ de dimension est dans value

\- not in : Sélectionnez les éléments de données dont les valeurs des champs de dimension ne sont pas dans value

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="Description"}
Opérateur

\- in : Sélectionnez l'élément de données dont la valeur du champ de dimension est dans value

\- not in : Sélectionnez les éléments de données dont les valeurs des champs de dimension ne sont pas dans value

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="Description"}
Sélectionnez la valeur du champ de dimension dans l'élément de données, prenant en charge les tableaux

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="Description"}
Filtrer dynamiquement les résultats d'exécution (champs d'exécution)



`prepare() écriture de scène, lecture seule au moment de l'exécution`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title="Description"}
Message rapide



La configuration des informations d'infobulle est utilisée pour définir les informations d'infobulle du graphique, y compris l'emplacement, le format, le style, etc. des informations d'infobulle.

:::


### enable

**Type:** `false | true`

:::note{title="Description"}
Si la fonction d'information rapide est activée

:::


## theme

**Type:** `Theme | undefined`

:::note{title="Description"}
Thème du graphique



Il existe deux thèmes intégrés : clair et sombre. Les utilisateurs peuvent personnaliser le thème via Builder



thème



Il existe deux thèmes intégrés : light et dark. Les nouveaux thèmes peuvent être personnalisés via registerTheme.

:::

**Exemple**
```ts
'dark'

'light'




```
### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `Locale | undefined`

:::note{title="Description"}
langue



Configuration de la langue du graphique, prend en charge les langues 'zh\-CN' et 'en\-US'

:::

