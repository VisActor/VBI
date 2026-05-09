# Column

:::info{title="recommandé"}
\- Configuration de terrain recommandée : `1` mesures, `2` dimensions

\- Prise en charge du remodelage des données : au moins les mesures `1`, les dimensions `0`

:::

:::info{title="encodage mappage"}
L'histogramme prend en charge les canaux visuels suivants :

`xAxis` : canal de l'axe x, prend en charge `plusieurs dimensions`, mappé sur l'axe x en fonction de la valeur de dimension

`yAxis` : canal de l'axe y, prend en charge `plusieurs mesures`, mappé sur l'axe y en fonction de la valeur de l'mesure

`detail` : canal de subdivision, prend en charge `plusieurs dimensions`, utilisé lors de l'affichage de données plus fines dans la même série de couleurs

`color` : canal de couleur, prend en charge `plusieurs dimensions` ou `une mesure`, la couleur des dimensions est utilisée pour distinguer différentes séries de données, la couleur de l'mesure est utilisée pour mapper linéairement les valeurs de l'mesure aux couleurs graphiques

`tooltip` : canal d'infobulle, prend en charge `plusieurs dimensions` et `plusieurs mesures`, sera affiché lorsque la souris survole le point de données

`label` : canal d'étiquette, prend en charge `plusieurs dimensions` et `plusieurs mesures`, affichera les étiquettes de données sur les points de données

:::

:::note{title="Description"}
Graphique à barres, adapté aux scénarios de comparaison de données verticales. L'axe X est l'axe des catégories (données catégorielles), l'axe Y est l'axe numérique (données continues) et les colonnes sont disposées verticalement.

Scénarios applicables :

\- Lorsque le nom de l'élément de données est court

\- Besoin de comparer visuellement les tailles numériques des différentes catégories

\- Afficher les tendances dans les données de séries chronologiques

:::

:::warning{title="Warning"}
Exigences en matière de données :

\- Au moins 1 champ numérique (mesure)

\- La première dimension sera placée sur l'axe X et les dimensions restantes seront fusionnées avec le nom de l'mesure (lorsqu'il y a plusieurs mesures) et affichées sous forme d'éléments de légende.

\- Tous les mesures sont automatiquement fusionnés en un seul mesure

Fonctionnalités activées par défaut :

\- Les légendes, les axes de coordonnées, les étiquettes de données et les informations d'infobulle sont activés par défaut.

:::


## chartType

**Type:** `"column"`

:::note{title="Description"}
Graphique à barres, adapté aux scénarios de comparaison de données verticales. L'axe X est l'axe des catégories (données catégorielles), l'axe Y est l'axe numérique (données continues) et les colonnes sont disposées verticalement.

:::

**Exemple**
```ts
'column'




```
## dataset

**Type:** `Record[]`

:::note{title="Description"}
Un ensemble de données agrégées qui est conforme à la spécification TidyData et est utilisé pour définir la source de données et la structure du graphique. L'ensemble de données saisi par l'utilisateur ne nécessite aucun traitement. VSeed dispose d'une puissante fonction de remodelage des données et remodèlera les données par lui-même. Les données de l'histogramme seront finalement converties en 2 dimensions et 1 mesure.

:::

**Exemple**
```ts
[{category:'A', value:100}, {category:'B', value:200}]




```
## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title="Description"}
La première dimension de l'histogramme est mappée sur l'axe X et les dimensions restantes seront fusionnées avec le nom de l'mesure (lorsqu'il y a plusieurs mesures) et affichées sous forme d'éléments de légende.

:::

**Exemple**
```ts
[{id: "category", alias: "catégorie"}]




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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title="Description"}
Canaux de mappage dimensionnel

\- xAxis : Prise en charge du mappage de plusieurs dimensions sur l'axe des x

\- color : prend en charge le mappage de plusieurs dimensions sur des canaux de couleur

\- detail : Prise en charge du mappage de plusieurs dimensions sur les canaux de détail

\- tooltip : prise en charge du mappage de plusieurs dimensions pour infobuller les canaux

\- label : prise en charge du mappage de plusieurs dimensions pour étiqueter les canaux

\- row : prise en charge du mappage de plusieurs dimensions sur des canaux de ligne

\- column : prise en charge du mappage de plusieurs dimensions sur les canaux de colonnes

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title="Description"}
Tous les mesures de l'histogramme seront automatiquement fusionnés en un seul mesure et mappés sur l'axe Y. Lorsqu'il y a plusieurs mesures, le nom de l'mesure sera fusionné avec les autres dimensions et affiché sous forme d'élément de légende.

:::

**Exemple**
```ts
[{id: "value", alias: "valeur numérique"}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title="Description"}
Canal de cartographie des mesures

\- yAxis : axe y de la cartographie des mesures

\- detail : Détails de la cartographie des mesures

\- color : Couleur du mappage des mesures

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
La configuration de pagination, utilisée pour spécifier le nom du champ de pagination, doit être une dimension

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
La couleur d'arrière-plan du graphique. La couleur d'arrière-plan peut être une chaîne de couleurs. La valeur par défaut est un arrière-plan transparent, tel que 'red', 'blue', ou il peut être hexadécimal, RVB ou rgba '#ff0000', 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title="Description"}
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


## legend

**Type:** `Legend | undefined`

:::note{title="Description"}
La configuration de la légende est utilisée pour définir la légende du graphique, y compris l'emplacement, le format, le style, etc. de la légende.

:::


### enable

**Type:** `boolean | undefined`

:::note{title="Description"}
La fonction légende est-elle activée ?

:::

**Exemple**
```ts
enable: true



```
### border

**Type:** `boolean | undefined`

:::note{title="Description"}
Si la bordure de légende est activée

:::

:::warning{title="Warning"}
Seules les légendes discrètes prennent effet

:::

**Exemple**
```ts
border: true



```
### labelColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la police de la légende

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de l’icône du paginateur

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur grise de l'icône du paginateur

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de la police de la légende

:::

**Exemple**
```ts
labelFontSize: 10



```
### labelFontColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la police de la légende

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="Description"}
Poids de la police de la légende

:::

**Exemple**
```ts
labelFontWeight: 400



```
### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title="Description"}
forme de légende

:::

:::warning{title="Warning"}
Seules les légendes discrètes prennent effet

:::

**Exemple**
```ts
shapeType: 'circle'



```
### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title="Description"}
emplacement de la légende

:::

**Exemple**
```ts
position: 'rightTop'



```
### maxSize

**Type:** `number | undefined`

:::note{title="Description"}
Lorsqu'il y a un grand nombre de légendes, le nombre maximum de colonnes ou le nombre maximum de lignes de légende

Si la position est horizontale (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize contrôle le nombre de colonnes affichées

Si la position est verticale (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize contrôle le nombre de lignes affichées

:::

:::warning{title="Warning"}
Seules les légendes discrètes prennent effet

:::

**Exemple**
```ts
maxSize: 2




```
## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title="Description"}
Remplissage de la zone de dessin



region[0].padding mappé à VChart est utilisé pour réserver de l'espace pour les éléments d'extension externes de la zone de dessin tels que les étiquettes et les étiquettes.

:::


### top

**Type:** `number | undefined`

### right

**Type:** `number | undefined`

### bottom

**Type:** `number | undefined`

### left

**Type:** `number | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title="Description"}
La configuration des informations d'infobulle est utilisée pour définir les informations d'infobulle du graphique, y compris l'emplacement, le format, le style, etc. des informations d'infobulle.

:::


### enable

**Type:** `false | true`

:::note{title="Description"}
Si la fonction d'information rapide est activée

:::


## brush

**Type:** `Brush | undefined`

:::note{title="Description"}
Sélection du cadre



Configuration de sélection de trame, utilisée pour activer/désactiver la capacité de sélection de trame brush



Configuration de la sélection du cadre graphique

:::


### enable

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut activer la sélection du pinceau

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title="Description"}
type de brosse



Définir la forme et la direction de la zone de sélection du pinceau

\- `rect` : sélection de cadre rectangulaire, qui peut effectuer une sélection de cadre dans les deux directions de l'axe X et de l'axe Y en même temps

\- `polygon` : Sélection de polygone, cliquez sur plusieurs points pour dessiner n'importe quel polygone à sélectionner.

\- `x` : sélection du cadre dans la direction de l'axe X, la sélection du cadre est effectuée uniquement dans la direction de l'axe X et la direction de l'axe Y n'est pas limitée

\- `y` : sélection du cadre dans la direction de l'axe Y, sélection du cadre uniquement dans la direction de l'axe Y, la direction de l'axe X n'est pas limitée

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title="Description"}
Mode de sélection de boîte, sélection unique ou sélection multiple



Définir le mode de sélection du pinceau

\- `single` : Mode de sélection unique, il ne peut y avoir qu'une seule boîte de sélection de pinceau à la fois

\- `multiple` : Mode multi-sélection, plusieurs cases à cocher peuvent exister en même temps

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut effacer la case une fois la sélection de la case terminée

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="Description"}
Le style de données sélectionné par la boîte



Définir le style des points de données sélectionnés par le pinceau

:::


#### opacity

**Type:** `number | undefined`

:::note{title="Description"}
opacité



L'opacité des points de données sélectionnés par la boîte, la plage de valeurs est 0\-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title="Description"}
couleur du trait

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="Description"}
largeur de trait

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="Description"}
Style de données non sélectionné par la case



Définir le style des points de données qui ne sont pas sélectionnés par le pinceau

:::


#### opacity

**Type:** `number | undefined`

:::note{title="Description"}
opacité



L'opacité des points de données qui ne sont pas sélectionnés par la boîte, la plage de valeurs est 0\-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title="Description"}
couleur du trait

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="Description"}
largeur de trait

:::


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title="Description"}
Configuration des animations



Configuration de l'animation du graphique, effets facultatifs limités par le type de graphique

:::


### enable

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut activer l'animation barre/colonne

:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title="Description"}
Paramètres d'animation des graphiques à barres/colonnes

:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title="Description"}
Configuration de l'animation des entrées barre/colonne

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title="Description"}
Effet d'entrée de graphique à barres/colonnes, prend en charge l'animation de croissance

:::

##### enable

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut activer l'étape d'animation actuelle

:::

##### ease

**Type:** `string | undefined`

:::note{title="Description"}
fonction d'assouplissement de l'animation

:::

##### duration

**Type:** `number | undefined`

:::note{title="Description"}
durée de l'animation en millisecondes

:::

##### color

**Type:** `string | undefined`

:::note{title="Description"}
Points forts animés ou couleurs d'ambiance

:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title="Description"}
Configuration de l'animation de mise à jour des graphiques à barres/colonnes

:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title="Description"}
Effet de mise à jour du graphique à barres/colonnes, prise en charge de la croissance et de l'animation en mouvement

:::

##### enable

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut activer l'étape d'animation actuelle

:::

##### ease

**Type:** `string | undefined`

:::note{title="Description"}
fonction d'assouplissement de l'animation

:::

##### duration

**Type:** `number | undefined`

:::note{title="Description"}
durée de l'animation en millisecondes

:::

##### color

**Type:** `string | undefined`

:::note{title="Description"}
Points forts animés ou couleurs d'ambiance

:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title="Description"}
Configuration de l'animation du cycle barre/colonne

:::


##### enable

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut activer l'animation en boucle

:::

##### interval

**Type:** `number | undefined`

:::note{title="Description"}
Intervalle d'animation de boucle en millisecondes

:::

##### loop

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title="Description"}
Configuration de l'animation du cycle barre/colonne

:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title="Description"}
Effet de boucle de graphique à barres/colonnes

:::

###### enable

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut activer l'étape d'animation actuelle

:::

###### ease

**Type:** `string | undefined`

:::note{title="Description"}
fonction d'assouplissement de l'animation

:::

###### duration

**Type:** `number | undefined`

:::note{title="Description"}
durée de l'animation en millisecondes

:::

###### color

**Type:** `string | undefined`

:::note{title="Description"}
Points forts animés ou couleurs d'ambiance

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title="Description"}
Configuration de l'animation d'ambiance d'un graphique à barres/colonnes

:::


###### ease

**Type:** `string | undefined`

:::note{title="Description"}
Fonction d'assouplissement de l'animation d'atmosphère

:::

###### color

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de l'animation d'ambiance

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title="Description"}
Effets d'animation atmosphériques, prenant en charge les ondulations, la dissimulation et la respiration

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title="Description"}
Axe des x, axe des catégories, configuration de l'axe des x, utilisé pour définir l'axe des x du graphique, y compris la position, le format, le style, etc. de l'axe des x.

:::


### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
L'axe est-il visible ?

:::

### inverse

**Type:** `boolean | undefined`

:::note{title="Description"}
Si l'axe est affiché dans le sens inverse, valable uniquement pour les axes numériques

:::

### zero

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut forcer l'affichage de la valeur 0 sur l'axe des coordonnées. Lorsque min et max sont configurés, cet élément de configuration n'est pas valide et ne prend effet que sur l'axe des valeurs.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title="Description"}
Les étiquettes des axes sont automatiquement masquées. Si deux étiquettes se chevauchent (l'intervalle est inférieur à autoHideGap), les étiquettes qui se chevauchent seront automatiquement masquées. Efficace uniquement pour l’axe des catégories.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title="Description"}
Les étiquettes des axes masquent automatiquement l’espace. Si l'espace entre deux étiquettes de texte est inférieur à autoHideGap, les étiquettes qui se chevauchent seront automatiquement masquées. Efficace uniquement pour l’axe des catégories.

Lorsque autoHide est activé, utilisez autoHide et réglez-le sur autoHideSeparation

Lorsque autoHide est désactivé, l’échantillonnage est utilisé et défini sur minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title="Description"}
Les étiquettes des axes pivotent automatiquement. Lorsque la largeur de l'étiquette dépasse la longueur de l'axe, l'étiquette pivote automatiquement. Efficace uniquement pour l’axe des catégories.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title="Description"}
Étiquette d'axe, plage d'angle de rotation automatique, lorsque la rotation automatique est activée, plage d'angle de rotation de l'étiquette. Efficace uniquement pour les axes de catégories.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title="Description"}
Les étiquettes des axes limitent automatiquement la longueur. Lorsque la largeur de l'étiquette dépasse la longueur de l'axe, la partie excédentaire est représentée par des points de suspension. L'étiquette est visible après le survol de la souris et la largeur de l'étiquette est automatiquement limitée. Efficace uniquement pour l’axe des catégories.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title="Description"}
Les étiquettes d’axe limitent automatiquement la longueur maximale. Lorsque la longueur du texte de l'étiquette dépasse la longueur maximale, la partie excédentaire est représentée par des points de suspension et l'étiquette est visible après le survol de la souris. Cela ne prend effet que pour l’axe des catégories.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="Description"}
Étiquettes de graduation sur l'axe X

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
L'étiquette est-elle visible ?

:::

#### labelColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de l'étiquette

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de la police de l'étiquette

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Poids de la police de l'étiquette

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title="Description"}
Angle de rotation de l'étiquette

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="Description"}
Axe X

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
L'axe est-il visible ?

:::

#### lineColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur de l'axe

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="Description"}
largeur de l'axe

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="Description"}
Échelle de l'axe X

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
L'échelle est-elle visible ?

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title="Description"}
La balance est-elle tournée vers l'intérieur ?

:::

#### tickColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de l'échelle

:::

#### tickSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de l'échelle

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="Description"}
Titre de l'axe X

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
Le titre est-il visible ?

:::

#### titleText

**Type:** `string | undefined`

:::note{title="Description"}
Texte du titre, la valeur par défaut suit la configuration du champ

:::

#### titleColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur du titre

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de la police du titre

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Poids de la police du titre

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="Description"}
Lignes de quadrillage sur l'axe X

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur de la ligne de grille

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title="Description"}
largeur de la ligne de quadrillage

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title="Description"}
Type de ligne de grille

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="Description"}
Configuration de l'animation sur l'axe X

:::


#### duration

**Type:** `number | undefined`

:::note{title="Description"}
Durée de l'animation

:::

#### easing

**Type:** `string | undefined`

:::note{title="Description"}
fonction animation easing

:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title="Description"}
axe y, axe des valeurs, configuration de l'axe y, utilisé pour définir l'axe y du graphique, y compris la position, le format, le style, etc. de l'axe y.

:::


### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
L'axe est-il visible ?

:::

### min

**Type:** `number | undefined`

:::note{title="Description"}
La valeur minimale de l'axe, avec une priorité supérieure à nice et zero

:::

### max

**Type:** `number | boolean | undefined`

:::note{title="Description"}
La valeur maximale de l'axe, qui a une priorité plus élevée que nice et zero. Si c'est vrai, la valeur maximale sera automatiquement calculée en fonction de la plage de données.

:::

### log

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut utiliser l'axe logarithmique, efficace uniquement pour l'axe numérique

:::

### logBase

**Type:** `number | undefined`

:::note{title="Description"}
La base de l'axe logarithmique, valable uniquement pour l'axe numérique

:::

### nice

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut ajuster automatiquement l'intervalle d'échelle de l'axe pour rendre les étiquettes d'échelle plus lisibles. Lorsque min et max sont configurés, cet élément de configuration n'est pas valide et ne prend effet que pour l'axe des valeurs.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title="Description"}
Si l'axe est affiché dans le sens inverse, valable uniquement pour les axes numériques

:::

### zero

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut forcer l'affichage de la valeur 0 sur l'axe des coordonnées. Lorsque min et max sont configurés, cet élément de configuration n'est pas valide et ne prend effet que sur l'axe des valeurs.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="Description"}
Que ce soit pour formater automatiquement les étiquettes d'échelle de l'axe numérique, cela ne prend effet que pour l'axe numérique. Lorsque autoFormat est true, la configuration numFormat devient invalide.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="Description"}
Le formatage numérique de l'axe des valeurs ne prend effet que sur l'axe des valeurs et a une priorité inférieure à autoFormat

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

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="Description"}
Étiquettes de graduation sur l'axe X

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
L'étiquette est-elle visible ?

:::

#### labelColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de l'étiquette

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de la police de l'étiquette

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Poids de la police de l'étiquette

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title="Description"}
Angle de rotation de l'étiquette

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="Description"}
Axe X

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
L'axe est-il visible ?

:::

#### lineColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur de l'axe

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="Description"}
largeur de l'axe

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="Description"}
Échelle de l'axe X

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
L'échelle est-elle visible ?

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title="Description"}
La balance est-elle tournée vers l'intérieur ?

:::

#### tickColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de l'échelle

:::

#### tickSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de l'échelle

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="Description"}
Titre de l'axe X

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
Le titre est-il visible ?

:::

#### titleText

**Type:** `string | undefined`

:::note{title="Description"}
Texte du titre, la valeur par défaut suit la configuration du champ

:::

#### titleColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur du titre

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de la police du titre

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Poids de la police du titre

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="Description"}
Lignes de quadrillage sur l'axe X

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur de la ligne de grille

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title="Description"}
largeur de la ligne de quadrillage

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title="Description"}
Type de ligne de grille

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="Description"}
Configuration de l'animation sur l'axe Y

:::


#### duration

**Type:** `number | undefined`

:::note{title="Description"}
Durée de l'animation

:::

#### easing

**Type:** `string | undefined`

:::note{title="Description"}
fonction animation easing

:::


## sort

**Type:** `Sort | undefined`

:::note{title="Description"}
Configuration de tri sur l'axe X, prend en charge le tri basé sur des dimensions ou des mesures et un ordre de tri personnalisé



Configuration du tri de l'axe des catégories, prend en charge le tri basé sur des dimensions ou des mesures et un ordre de tri personnalisé

:::

**Exemple**
```ts
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
ou
\- customOrder:['2019', '2020', '2021']




```
### order

**Type:** `"asc" | "desc" | undefined`

:::note{title="Description"}
Ordre de tri, la valeur facultative est 'asc' ou 'desc'

:::

**Exemple**
```ts
order:'asc'



```
### orderBy

**Type:** `string | undefined`

:::note{title="Description"}
Le champ dont dépend le tri peut être l'identifiant de la dimension ou l'identifiant de l'mesure.

:::

**Exemple**
```ts
\- orderBy:'date'
\- orderBy:'profit'



```
### customOrder

**Type:** `string[] | undefined`

:::note{title="Description"}
Personnalisez l'ordre de tri, qui sera appliqué directement à l'axe des catégories

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title="Description"}
Configuration du tri des légendes, prend en charge le tri selon les dimensions ou les mesures et l'ordre de tri personnalisé



Configuration du tri des légendes, prend en charge le tri selon les dimensions ou les mesures et l'ordre de tri personnalisé ; le tableau trié suit l'ordre de gauche à droite ou de haut en bas

:::

**Exemple**
```ts
sortLegend: {
  orderBy: 'profit',
  order: 'asc',
}
sortLegend: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
ou
\- customOrder:['2019', '2020', '2021']




```
### order

**Type:** `"asc" | "desc" | undefined`

:::note{title="Description"}
Ordre de tri, la valeur facultative est 'asc' ou 'desc'

:::

**Exemple**
```ts
order:'asc'



```
### orderBy

**Type:** `string | undefined`

:::note{title="Description"}
Le champ dont dépend le tri peut être l'identifiant de la dimension ou l'identifiant de l'mesure.

:::

**Exemple**
```ts
\- orderBy:'date'
\- orderBy:'profit'



```
### customOrder

**Type:** `string[] | undefined`

:::note{title="Description"}
Personnalisez l'ordre de tri, qui sera appliqué directement à la légende, croissant de gauche à droite ou de haut en bas, décroissant de droite à gauche ou de bas en haut

:::


## theme

**Type:** `Theme | undefined`

:::note{title="Description"}
Le thème du graphique. Le thème est une configuration fonctionnelle de moindre priorité. Il contient des configurations communes partagées par tous les types de graphiques. Configurations de graphiques partagées avec des types de graphiques de type unique. Il existe deux thèmes clairs et sombres intégrés. Les utilisateurs peuvent personnaliser le thème via Builder



thème



Il existe deux thèmes intégrés : light et dark. Les nouveaux thèmes peuvent être personnalisés via registerTheme.

:::

**Exemple**
```ts
'dark'

'light'

'customThemeName'




```
### length

**Type:** `number`

### brand

**Type:** `brand`


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title="Description"}
La configuration de la boîte d'infobulle verticale est utilisée pour définir la boîte d'infobulle verticale du graphique, y compris la couleur de la boîte d'infobulle verticale, le style d'étiquette, etc.



La configuration de zone rectangulaire en réticule est un type de configuration utilisé pour afficher une zone rectangulaire en réticule dans un graphique.

:::


### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut afficher la zone rectangulaire du réticule

:::

### rectColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la zone rectangulaire de la ligne de réticule

:::

### labelColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de l'étiquette de la zone rectangulaire du réticule

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut afficher l'étiquette de la zone rectangulaire en forme de croix

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur d'arrière-plan de l'étiquette de zone rectangulaire de ligne de réticule

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title="Description"}
Graphique à colonnes empilé avec coins arrondis

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title="Description"}
La largeur maximale de la colonne, qui peut être une valeur en pixels ou une chaîne de pourcentage

:::


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title="Description"}
Style primitif rectangulaire, configuration du style de graphique à barres, utilisé pour définir le style de graphique à barres du graphique, y compris la couleur du graphique à barres, les bordures, les coins arrondis, etc.

Prend en charge la configuration de style global ou de style conditionnel

Filtre de données

Si le sélecteur est configuré, fournissez la valeur numérique selector, les données locales selector, la dimension conditionnelle selector, l'mesure conditionnel selector pour un total de quatre types de capacités de correspondance de données.

Si le sélecteur n'est pas configuré, le style prend effet globalement.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="Description"}
sélecteur de données



Si le sélecteur est configuré, fournissez la valeur numérique selector, les données locales selector, la dimension conditionnelle selector, l'mesure conditionnel selector pour un total de quatre types de capacités de correspondance de données.

Si le sélecteur n'est pas configuré, le style prend effet globalement.

:::

**Exemple**
```ts
Sélecteur numérique
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

sélecteur de données locales
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Sélecteur de dimension conditionnelle
selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}

Sélecteur d'mesure conditionnel
selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}




```
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

Convient pour Top N, l'analyse statistique, les conditions complexes et autres scénarios difficiles à exprimer avec selector statique



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

### barVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
Si la primitive de colonne (primitive rectangulaire) est visible

:::

### barColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la primitive de colonne (primitive rectangulaire)

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title="Description"}
Transparence des couleurs de la primitive de colonne (primitive rectangulaire)

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de bordure de la primitive de colonne (primitive rectangulaire)

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title="Description"}
Largeur de bordure de la primitive de colonne (primitive rectangulaire)

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Description"}
Style de bordure primitive de colonne (primitive rectangulaire)

:::

**Exemple**
```ts
solid

dashed

dotted



```
### barBorderOpacity

**Type:** `number | undefined`

:::note{title="Description"}
Coins arrondis de la primitive de colonne (primitive rectangulaire)



Transparence du trait de la primitive de colonne (primitive rectangulaire)

:::

**Exemple**
```ts
4

[0, 0, 10, 10]



```
### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title="Description"}
La configuration des points d'étiquette, basée sur les données sélectionnées, définit les points d'étiquette du graphique, y compris la position, le format, le style, etc. des points d'étiquette.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="Description"}
Sélecteur de points d'étiquette, utilisé pour sélectionner des points de données.

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

### measureId

**Type:** `string | undefined`

:::note{title="Description"}
Spécifie la métrique id à laquelle appartient le point d'étiquette. Dans plusieurs scénarios measure, il peut être combiné avec selector pour localiser de manière unique le point d'étiquette correspondant à l'mesure cible.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="Description"}
Filtres dynamiques (exécution de code généré par l'IA)



Implémenter une logique complexe de filtrage des données via le code JavaScript généré par AI

Convient pour Top N, l'analyse statistique, les conditions complexes et autres scénarios difficiles à exprimer avec selector statique



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

### text

**Type:** `string | string[] | undefined`

:::note{title="Description"}
Texte annoté

:::

**Exemple**
```ts
'Texte d'annotation'



```
### textColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur du texte

:::

**Exemple**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de la police du texte

:::

**Exemple**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Poids de la police du texte

:::

**Exemple**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="Description"}
Alignement du texte, généralement réglé à droite, le texte est affiché à gauche du point d'étiquette, garantissant ainsi son affichage dans la zone visible du graphique

Il est recommandé de le définir sur 'right', ce qui peut garantir que le texte se trouve sur le côté gauche du point d'étiquette.

right: Le texte se trouve sur le côté gauche du point d'étiquette et le bord droit du texte est aligné avec le point d'étiquette.

left: Le texte se trouve sur le côté droit du point d'étiquette et le bord gauche du texte est aligné avec le point d'étiquette.

center: Le texte est au centre du point d'étiquette et le centre du texte est aligné avec le point d'étiquette

:::

**Exemple**
```ts
Le texte 'right' se trouve à gauche du point d'étiquette



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Description"}
Alignement vertical du texte. Généralement, placé en haut, le texte est affiché en bas du point d'étiquette, garantissant ainsi qu'il est affiché dans la zone visible du graphique.

Il est recommandé de le définir sur 'top', ce qui peut garantir que le texte est entièrement affiché dans la zone visible du graphique.

top: Le texte se trouve au bas du point d'étiquette et le bord supérieur du texte est aligné avec le point d'étiquette.

middle: Le texte est au centre du point d'étiquette et le centre du texte est aligné avec le point d'étiquette

bottom: Le texte se trouve au-dessus du point d'étiquette et le bord inférieur du texte est aligné avec le point d'étiquette.

:::

**Exemple**
```ts
Le texte 'top' se trouve en bas du point d'étiquette



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
arrière-plan visible

:::

**Exemple**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur de fond

:::

**Exemple**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la bordure d'arrière-plan

:::

**Exemple**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="Description"}
largeur de la bordure d'arrière-plan

:::

**Exemple**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="Description"}
bordure d'arrière-plan coins arrondis

:::

**Exemple**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="Description"}
remplissage d'arrière-plan

:::

**Exemple**
```ts
4



```
### offsetY

**Type:** `number | undefined`

:::note{title="Description"}
Distance globale des pixels de décalage du point d'étiquetage dans la direction Y. Lorsque le point d'étiquetage est au-dessus du graphique (lorsque la valeur est grande), il est recommandé de le définir sur une valeur positive. Lorsque le point d'étiquetage se trouve en dessous du graphique (lorsque la valeur est petite), il est recommandé de le définir sur une valeur négative.

Une valeur négative déplacera le tout vers le haut. Par exemple, s'il est défini sur \-10, l'ensemble du composant du point d'étiquette, y compris le texte et l'arrière-plan du texte, sera décalé vers le haut de 10 pixels.

Une valeur positive déplacera le tout vers le bas. Par exemple, s'il est défini sur 10, l'ensemble du composant du point d'étiquette, y compris le texte et l'arrière-plan du texte, sera décalé vers le bas de 10 pixels.

:::

**Exemple**
```ts
offsetY: 5. Les points d'étiquetage sont décalés vers le bas de 5 pixels dans leur ensemble.



```
### offsetX

**Type:** `number | undefined`

:::note{title="Description"}
Distance globale des pixels de décalage du point d'étiquetage dans la direction X. Lorsque le point d'étiquetage se trouve sur le côté gauche du graphique (le point de départ de l'axe des catégories), il est recommandé de le définir sur une valeur positive. Lorsque le point d'étiquetage se trouve sur le côté droit du graphique (le point final de l'axe des catégories), il est recommandé de le définir sur une valeur négative.

Une valeur négative déplacera l’ensemble vers la gauche. Par exemple, s'il est défini sur \-10, l'ensemble du composant du point d'étiquette, y compris le texte et l'arrière-plan du texte, sera décalé vers la gauche de 10 pixels.

Une valeur positive déplacera l’ensemble vers la droite. Par exemple, s'il est défini sur 10, l'ensemble du composant du point d'étiquette, y compris le texte et l'arrière-plan du texte, sera décalé vers la droite de 10 pixels.

:::

**Exemple**
```ts
offsetX: 5. L'ensemble du point d'étiquetage est décalé de 5 pixels vers la droite.




```
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title="Description"}
La ligne d'étiquette de valeur de dimension, affichée dans le sens vertical, peut définir la position, le style, etc. de la ligne d'étiquette

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="Description"}
Valeur x fixe, utilisée pour marquer les lignes verticales. Si l'axe des catégories est dans la direction x, vous pouvez saisir une valeur de dimension. Si l'axe des valeurs est dans la direction x, vous pouvez saisir une valeur spécifique.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="Description"}
Filtres dynamiques (exécution de code généré par l'IA)



Calculer dynamiquement la valeur de la ligne de cote à l'aide du code JavaScript généré par AI

Convient à la détermination dynamique des positions des lignes d'étiquettes en fonction de données telles que la moyenne, le maximum, les quantiles, les secteurs d'activité, etc.



Prend en charge les environnements de navigateur uniquement (nécessite Web Worker)

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="Description"}
Description des besoins de filtrage de l'utilisateur (langage naturel)

:::

**Exemple**
```ts
"Obtenir la valeur avec le volume de ventes le plus élevé comme référence de ligne d'étiquette"

"Calculer les ventes moyennes des lignes d'étiquetage"



```
#### code

**Type:** `string`

:::note{title="Description"}
AI Généré JavaScript code filtre



\- Ne peut utiliser que les fonctions utilitaires intégrées (accessibles via _ ou R)

\- Paramètres d'entrée : data (tableau)

\- Doit renvoyer une seule valeur ou chaîne : number | string

\- Scénarios applicables : valeurs dynamiques requises pour les lignes d'étiquetage (lignes horizontales, lignes verticales)

\- Utilisation interdite : eval, Function, opérations asynchrones, Function eval, requêtes réseau

:::

**Exemple**
```ts
Obtenez la valeur de vente maximale en tant que valeur de ligne d'étiquette
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculer la valeur moyenne des lignes d'étiquetage
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Obtenir des quantiles sous forme de lignes d'étiquette
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculer la valeur cible en fonction des conditions
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



```
#### fallback

**Type:** `string | number | undefined`

:::note{title="Description"}
Rétrograder la solution lorsque l'exécution du code échoue ou que l'environnement ne la prend pas en charge

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="Description"}
Filtrer dynamiquement les résultats d'exécution (champs d'exécution)



`prepare() écriture de scène, lecture seule au moment de l'exécution`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title="Description"}
Texte annoté

:::

**Exemple**
```ts
'Texte d'annotation'



```
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="Description"}
Position du texte, position du label de la ligne de cote (position relative du label par rapport à la ligne).

:::

**Exemple**
```ts
'outsideEnd'



```
### textColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur du texte

:::

**Exemple**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de la police du texte

:::

**Exemple**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Poids de la police du texte

:::

**Exemple**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="Description"}
Alignement du texte, généralement, pas besoin de définir

Il est recommandé de le définir sur 'right', ce qui garantit que le texte se trouve sur le côté gauche de la ligne d'étiquette.

right: Le texte se trouve à gauche du guide et le bord droit du texte est aligné avec la ligne de légende (verticale).

left: Le texte se trouve à droite du guide et le bord gauche du texte est aligné avec la ligne de légende (verticale).

center: Le texte est centré sur le guide et le centre du texte est aligné avec la ligne de cote (verticale)

:::

**Exemple**
```ts
'right'



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Description"}
Alignement vertical du texte. Généralement, aucun réglage n’est requis.

Il est recommandé de le définir sur 'top', ce qui peut garantir que le texte est entièrement affiché dans la zone visible du graphique.

top: Le texte se trouve au bas de la ligne de guidage et le bord supérieur du texte est aligné (verticalement) sur le point final de la ligne de cote.

middle: Le texte est centré sur la ligne de guidage et le centre du texte est aligné (verticalement) sur le point final de la ligne de cote.

bottom: Le texte se trouve au-dessus du guide et le bord inférieur du texte est aligné (verticalement) sur le point final de la ligne de cote.

:::

**Exemple**
```ts
'top'



```
### lineVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
Ligne visible

:::

**Exemple**
```ts
true



```
### lineColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur de ligne

:::

**Exemple**
```ts
'red'



```
### lineWidth

**Type:** `number | undefined`

:::note{title="Description"}
largeur de ligne

:::

**Exemple**
```ts
2



```
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Description"}
style de ligne

:::

**Exemple**
```ts
'solid'



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
arrière-plan visible

:::

**Exemple**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur de fond

:::

**Exemple**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la bordure d'arrière-plan

:::

**Exemple**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="Description"}
largeur de la bordure d'arrière-plan

:::

**Exemple**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="Description"}
bordure d'arrière-plan coins arrondis

:::

**Exemple**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="Description"}
remplissage d'arrière-plan

:::

**Exemple**
```ts
4




```
## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title="Description"}
Les lignes d'étiquettes numériques (y compris la ligne moyenne, la ligne de valeur maximale, la ligne de valeur minimale, etc.) sont affichées dans le sens horizontal. La position et le style de la ligne d'étiquette peuvent être définis. Si vous devez tracer des lignes d'étiquette correspondant à des valeurs telles que des lignes moyennes, veuillez utiliser cette configuration.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="Description"}
Valeur y fixe, utilisée pour marquer les lignes horizontales. Si l'axe des catégories est dans la direction y, vous pouvez saisir une valeur de dimension. Si l'axe des valeurs est dans la direction y, vous pouvez saisir une valeur spécifique.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="Description"}
Filtres dynamiques (exécution de code généré par l'IA)



Calculer dynamiquement la valeur de la ligne de cote à l'aide du code JavaScript généré par AI

Convient à la détermination dynamique des positions des lignes d'étiquettes en fonction de données telles que la moyenne, le maximum, les quantiles, les secteurs d'activité, etc.



Prend en charge les environnements de navigateur uniquement (nécessite Web Worker)

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="Description"}
Description des besoins de filtrage de l'utilisateur (langage naturel)

:::

**Exemple**
```ts
"Obtenir la valeur avec le volume de ventes le plus élevé comme référence de ligne d'étiquette"

"Calculer les ventes moyennes des lignes d'étiquetage"



```
#### code

**Type:** `string`

:::note{title="Description"}
AI Généré JavaScript code filtre



\- Ne peut utiliser que les fonctions utilitaires intégrées (accessibles via _ ou R)

\- Paramètres d'entrée : data (tableau)

\- Doit renvoyer une seule valeur ou chaîne : number | string

\- Scénarios applicables : valeurs dynamiques requises pour les lignes d'étiquetage (lignes horizontales, lignes verticales)

\- Utilisation interdite : eval, Function, opérations asynchrones, Function eval, requêtes réseau

:::

**Exemple**
```ts
Obtenez la valeur de vente maximale en tant que valeur de ligne d'étiquette
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculer la valeur moyenne des lignes d'étiquetage
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Obtenir des quantiles sous forme de lignes d'étiquette
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculer la valeur cible en fonction des conditions
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



```
#### fallback

**Type:** `string | number | undefined`

:::note{title="Description"}
Rétrograder la solution lorsque l'exécution du code échoue ou que l'environnement ne la prend pas en charge

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="Description"}
Filtrer dynamiquement les résultats d'exécution (champs d'exécution)



`prepare() écriture de scène, lecture seule au moment de l'exécution`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title="Description"}
Texte annoté

:::

**Exemple**
```ts
'Texte d'annotation'



```
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="Description"}
position du texte



La position de l'étiquette de la ligne de cote (la position relative de l'étiquette par rapport à la ligne).

:::

**Exemple**
```ts
'outsideEnd'



```
### textColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur du texte

:::

**Exemple**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de la police du texte

:::

**Exemple**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Poids de la police du texte

:::

**Exemple**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="Description"}
Alignement du texte, généralement, pas besoin de définir

Il est recommandé de le définir sur 'right', ce qui garantit que le texte se trouve sur le côté gauche de la ligne d'étiquette.

right: Le texte se trouve à gauche de la ligne de guidage et le bord droit du texte est aligné avec le point final de la ligne de cote (horizontale).

left: Le texte se trouve à droite de la ligne de guidage et le bord gauche du texte est aligné avec le point final de la ligne de cote (horizontale).

center: Le texte est au centre de la ligne de guidage et le centre du texte est aligné avec le point final de la ligne de cote (horizontale).

:::

**Exemple**
```ts
'right'



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Description"}
Alignement vertical du texte. Généralement, aucun réglage n’est requis.

Il est recommandé de le définir sur 'top', ce qui peut garantir que le texte est entièrement affiché dans la zone visible du graphique.

top: Le texte se trouve au bas du guide et le bord supérieur du texte est aligné avec la ligne de cote (horizontale).

middle: Le texte est centré sur la ligne de guidage et le centre du texte est aligné avec la ligne de cote (horizontale)

bottom: Le texte se trouve en haut du guide et le bord inférieur du texte est aligné avec la ligne de cote (horizontale).

:::

**Exemple**
```ts
'top'



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
arrière-plan visible

:::

**Exemple**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur de fond

:::

**Exemple**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la bordure d'arrière-plan

:::

**Exemple**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="Description"}
largeur de la bordure d'arrière-plan



largeur de la bordure d'arrière-plan

:::

**Exemple**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="Description"}
bordure d'arrière-plan coins arrondis

:::

**Exemple**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="Description"}
remplissage d'arrière-plan

:::

**Exemple**
```ts
4



```
### lineVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
Ligne visible



Ligne visible

:::

**Exemple**
```ts
true



```
### lineColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur de ligne

:::

**Exemple**
```ts
'red'



```
### lineWidth

**Type:** `number | undefined`

:::note{title="Description"}
largeur de ligne

:::

**Exemple**
```ts
2



```
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Description"}
style de ligne

:::

**Exemple**
```ts
'solid'



```
### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title="Description"}
S'il faut activer la fonction de division de la ligne principale en deux sections

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title="Description"}
La partie supérieure à la valeur marquée, la couleur principale correspondante

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title="Description"}
La partie plus petite que la valeur marquée, la couleur principale correspondante

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title="Description"}
La configuration de la zone d'annotation, en fonction des données sélectionnées, définit la zone d'annotation du graphique, y compris l'emplacement, le style, etc. de la zone d'annotation.

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title="Description"}
En fonction des données sélectionnées, un étiquetage des données est effectué.

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

### text

**Type:** `string | string[] | undefined`

:::note{title="Description"}
Texte annoté

:::

**Exemple**
```ts
'Texte d'annotation'



```
### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title="Description"}
position du texte

:::

**Exemple**
```ts
'top'



```
### textColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur du texte

:::

**Exemple**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de la police du texte

:::

**Exemple**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Poids de la police du texte

:::

**Exemple**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="Description"}
Alignement du texte, généralement réglé à droite, le texte est affiché au milieu de la zone d'étiquette, garantissant ainsi son affichage dans la zone visible du graphique

Il est recommandé de le définir sur 'center', ce qui peut garantir que le texte se trouve au milieu de la zone d'étiquette.

right: Le texte se trouve sur le côté gauche de la zone d'étiquette et le bord droit du texte est aligné avec la zone d'étiquette.

left: Le texte se trouve sur le côté droit de la zone d'étiquette et le bord gauche du texte est aligné avec la zone d'étiquette.

center: Le texte se trouve au centre de la zone d'annotation et le centre du texte est aligné avec la zone d'annotation.

:::

**Exemple**
```ts
Le texte 'center' se trouve au milieu de la zone d'étiquette



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Description"}
Alignement vertical du texte. Généralement, placé en haut, le texte est affiché en bas de la zone d'étiquette, garantissant ainsi qu'il est affiché dans la zone visible du graphique.

Il est recommandé de le définir sur 'top', ce qui peut garantir que le texte est entièrement affiché dans la zone visible du graphique.

top: Le texte se trouve au bas de la zone de légende et le bord supérieur du texte est aligné avec la zone de légende.

middle: Le texte se trouve au centre de la zone d'annotation et le centre du texte est aligné avec la zone d'annotation.

bottom: Le texte se trouve en haut de la zone de légende et le bord inférieur du texte est aligné avec la zone de légende.

:::

**Exemple**
```ts
Le texte 'top' se trouve en bas de la zone d'étiquette



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
arrière-plan visible

:::

**Exemple**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur de fond

:::

**Exemple**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la bordure d'arrière-plan



Couleur de la bordure d'arrière-plan

:::

**Exemple**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="Description"}
largeur de la bordure d'arrière-plan

:::

**Exemple**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="Description"}
bordure d'arrière-plan coins arrondis



bordure d'arrière-plan coins arrondis

:::

**Exemple**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="Description"}
remplissage d'arrière-plan

:::

**Exemple**
```ts
4



```
### areaColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la zone de l'étiquette

:::

**Exemple**
```ts
'red'



```
### areaColorOpacity

**Type:** `number | undefined`

:::note{title="Description"}
Transparence des couleurs de la zone d'étiquette

:::

**Exemple**
```ts
0.5



```
### areaBorderColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la bordure de la zone d'étiquette

:::

**Exemple**
```ts
'red'



```
### areaBorderWidth

**Type:** `number | undefined`

:::note{title="Description"}
Largeur de la bordure de la zone d'étiquette

:::

**Exemple**
```ts
2



```
### areaBorderRadius

**Type:** `number | undefined`

:::note{title="Description"}
Coins arrondis de la bordure de la zone d’étiquette

:::

**Exemple**
```ts
4



```
### areaLineDash

**Type:** `number[] | undefined`

:::note{title="Description"}
Style de ligne de la bordure de la zone d'étiquette

:::

**Exemple**
```ts
[2, 2]



```
### outerPadding

**Type:** `number | undefined`

:::note{title="Description"}
Marges de la zone d'étiquette

:::

**Exemple**
```ts
0




```
## annotationDifferenceLine

**Type:** `AnnotationDifferenceLine | AnnotationDifferenceLine[] | undefined`

:::note{title="Description"}
Configuration de la ligne d'étiquette de différence, utilisée pour lier deux points d'ancrage de données et afficher la différence absolue ou la différence en pourcentage.

:::


### start

**Type:** `DifferenceAnchor`

:::note{title="Description"}
Point d'ancrage de départ de la ligne de cote de différence.



Configuration du point d'ancrage d'annotation différentielle, utilisée pour sélectionner les données à lier par le point de départ ou le point d'arrivée.

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title="Description"}
Le sélecteur de point d'ancrage doit finalement être positionné sur un point d'ancrage logique.

:::

**Exemple**
```ts
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




```
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

### end

**Type:** `DifferenceAnchor`

:::note{title="Description"}
Point d'ancrage final de la ligne de cote différentielle.



Configuration du point d'ancrage d'annotation différentielle, utilisée pour sélectionner les données à lier par le point de départ ou le point d'arrivée.

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title="Description"}
Le sélecteur de point d'ancrage doit finalement être positionné sur un point d'ancrage logique.

:::

**Exemple**
```ts
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




```
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

### differenceType

**Type:** `"percent" | "absolute" | undefined`

:::note{title="Description"}
Type de valeur de différence.

\- absolute : Affiche la différence absolue, calculée comme end \- start

\- percent : affiche la différence en pourcentage, calculée comme suit : (end \- start) / start

:::

### textFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de la police du texte.

:::

### textColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur du texte.

:::

### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur d’arrière-plan du texte.

:::

### lineColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de ligne.

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Description"}
Style de ligne.

:::


## polynomialRegressionLine

**Type:** `PolynomialRegressionLine | PolynomialRegressionLine[] | undefined`

:::note{title="Description"}
droite de régression polynomiale



Configuration de la ligne de régression polynomiale, y compris l'ordre polynomial, le style de ligne de régression, etc.

:::


### enable

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut allumer

:::

### color

**Type:** `string | undefined`

:::note{title="Description"}
couleur de la ligne de régression

Utilisé pour définir la couleur de la ligne de régression. Si elle n’est pas définie, la couleur principale du graphique sera utilisée par défaut.

:::

### degree

**Type:** `number | undefined`

:::note{title="Description"}
Ordre de régression polynomiale

:::

### lineWidth

**Type:** `number | undefined`

:::note{title="Description"}
largeur de la ligne de régression

Utilisé pour définir la largeur de la ligne de régression, l'unité est le pixel, la valeur par défaut est 1

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title="Description"}
style de ligne de régression

Utilisé pour définir le style de la ligne de régression, tel qu'une ligne continue, une ligne pointillée, etc. La valeur par défaut est une ligne continue

:::

### text

**Type:** `string | undefined`

:::note{title="Description"}
Texte de l'étiquette de la ligne de régression

Texte de l'étiquette utilisé pour définir la ligne de régression. Une chaîne vide signifie qu'aucune étiquette n'est affichée.

:::

### textColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur du texte

:::

**Exemple**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de la police du texte

:::

**Exemple**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Poids de la police du texte

:::

**Exemple**
```ts
400



```
### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut afficher les intervalles de confiance

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title="Description"}
Paramètre de valeur d'intervalle de confiance, niveau de confiance par défaut de 95 %

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de l'intervalle de confiance

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title="Description"}
Transparence de l’intervalle de confiance

:::

**Exemple**
```ts
0.5




```
## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title="Description"}
Lorsque le graphique active la fonction de perspective ou la combinaison d'mesures, s'il faut activer la fonction de liaison de dimension

Lorsque vous survolez une certaine valeur de dimension, les données ayant la même valeur de dimension dans d'autres graphiques seront mises en surbrillance.



Configuration des liaisons de dimensions du graphique en perspective

:::


### enable

**Type:** `false | true`

:::note{title="Description"}
S'il faut activer la liaison des dimensions de la table de perspective

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut afficher les informations d'infobulle pour les sous-graphiques correspondant à toutes les dimensions

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut afficher l'étiquette correspondant au réticule

:::


## locale

**Type:** `Locale | undefined`

:::note{title="Description"}
Configuration du langage du graphique, prend en charge 'zh\-CN' et 'en\-US'. De plus, vous pouvez appeler la méthode intl.setLocale('zh\-CN') pour définir la langue.

:::

