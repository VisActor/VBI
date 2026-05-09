# RaceScatter

:::note{title="Description"}
Nuage de points dynamique (Race Scatter Chart)

Il convient pour afficher la distribution des données dans le temps et représente les valeurs de deux mesures à travers la position des points de données.

Scénarios applicables :

\- Analyser les caractéristiques de distribution des données dans un espace bidimensionnel et afficher ses changements dynamiques au fil du temps

\- Montrer comment les corrélations entre plusieurs variables évoluent au fil du temps

\- Observer la trajectoire de mouvement des points de données dans un espace bidimensionnel

:::

:::note{title="Note"}
Nuage de points dynamique :

\- Les axes X et Y sont des axes numériques (données continues) et prennent en charge plusieurs mappages d'mesures.

\- Prend en charge le contrôle de la dimension temporelle via le lecteur et l'affichage dynamique des modifications des données

\- Afficher visuellement les changements dynamiques des données grâce aux changements de position des points de données

:::


## chartType

**Type:** `"raceScatter"`

:::note{title="Description"}
Nuage de points dynamique, adapté à l'affichage de la distribution des données dans le temps

:::


## dataset

**Type:** `Record[]`

:::note{title="Description"}
Source de données, un ensemble de données qui répond à la spécification TidyData

:::


## dimensions

**Type:** `RaceScatterDimension[] | undefined`

:::note{title="Description"}
Dimension, utilisée pour distinguer différentes séries de données et afficher les légendes

:::


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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title="Description"}
Canaux pour le mappage des dimensions dans les diagrammes de classes de nuages ​​de points de compétition

\- color : prend en charge le mappage de plusieurs dimensions sur des canaux de couleur

\- detail : Prise en charge du mappage de plusieurs dimensions sur les canaux de détail

\- tooltip : prise en charge du mappage de plusieurs dimensions pour infobuller les canaux

\- label : prise en charge du mappage de plusieurs dimensions pour étiqueter les canaux

\- row : prise en charge du mappage de plusieurs dimensions sur des canaux de ligne

\- column : prise en charge du mappage de plusieurs dimensions sur les canaux de colonnes

\- player : prend en charge le mappage de plusieurs dimensions sur les canaux des joueurs

:::


## measures

**Type:** `ScatterMeasure[] | undefined`

:::note{title="Description"}
Mesures, au moins 2 mesures doivent être mappés respectivement sur l'axe X et l'axe Y.

:::


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

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title="Description"}
Canal de cartographie des mesures

\- xAxis : axe x de la cartographie des mesures

\- yAxis : axe y de la cartographie des mesures

\- size : taille de la carte des mesures

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


## player

**Type:** `Player | undefined`

:::note{title="Description"}
La configuration du lecteur, utilisée pour spécifier la dimension temporelle, est la configuration de base des nuages ​​de points dynamiques

Contrôlez la progression de la lecture dans la dimension temporelle via le lecteur pour obtenir une mise à jour dynamique des données



La configuration du lecteur, utilisée pour spécifier le nom du champ pour la lecture, doit être une dimension

:::

:::warning{title="Warning"}
Cette fonction ne prend pas en charge les types de graphiques tels que table, pivotTable, dualAxis, histogram, boxPlot, etc., et ne prend pas en charge l'utilisation lorsque les combinaisons d'mesures ou les perspectives de lignes et de colonnes sont activées.

:::


### maxCount

**Type:** `number | false | undefined`

:::note{title="Description"}
Le nombre maximum de jeux. Les données dépassant ce nombre seront tronquées. Définissez sur false pour indiquer aucune limite.

:::

### interval

**Type:** `number | undefined`

:::note{title="Description"}
Intervalle de lecture, unité ms

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut jouer automatiquement

:::

### loop

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut boucler

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title="Description"}
position du joueur

:::

### railColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la piste de la barre de progression du joueur

:::

### fontFamily

**Type:** `string | undefined`

:::note{title="Description"}
Police du texte du joueur

:::

### fontSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de la police du texte du joueur

:::

### trackColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la barre de progression du joueur

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur du curseur de la barre de progression du joueur

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la bordure du curseur de la barre de progression du joueur

:::

### startButtonColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur du bouton de démarrage du joueur

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur du bouton pause du lecteur

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur du bouton retour du joueur

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur du bouton Avancer du joueur

:::


## sort

**Type:** `Sort | undefined`

:::note{title="Description"}
Configuration de tri, utilisée pour contrôler la manière dont les valeurs de dimension sont triées



Configuration du tri de l'axe des catégories, prend en charge le tri basé sur des dimensions ou des mesures et un ordre de tri personnalisé

:::

**Exemple**
```ts
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


## page

**Type:** `Page | undefined`

:::note{title="Description"}
Configuration de pagination, utilisée pour gérer des scénarios avec de grandes quantités de données

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
Configuration de la couleur d'arrière-plan

:::


## size

**Type:** `number | number[] | undefined`

:::note{title="Description"}
La taille de l'mesure du nuage de points, utilisé pour définir la taille ou la plage de tailles des points de données dans le nuage de points

\- Si la plage de tailles est un nombre, tel que 10, cela signifie que la plage de tailles des points de données est fixée à 10.

\- Si la plage de tailles est un tableau de longueur 2, tel que [10, 40], cela signifie que la plage de tailles des points de données est comprise entre 10 et 40.

\- Mutuellement exclusif avec sizeRange, avec une priorité inférieure à size

:::


## sizeRange

**Type:** `number | number[] | undefined`

:::note{title="Description"}
La plage de tailles de l'mesure de diagramme de dispersion est utilisée pour définir la plage de tailles des points de données dans le diagramme de dispersion.

\- Si la plage de tailles est un tableau de longueur 2, tel que [10, 40], cela signifie que la plage de tailles des points de données est comprise entre 10 et 40.

\- Si la plage de tailles est un nombre, tel que 10, cela signifie que la plage de tailles des points de données est fixée à 10.

\- Mutuellement exclusif avec sizeRange, a une priorité plus élevée que size

:::


## color

**Type:** `Color | undefined`

:::note{title="Description"}
Configuration des couleurs pour distinguer différentes dimensions ou mesures

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
Configuration d'étiquette pour afficher des étiquettes de données sur des points de données

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
Configuration de la légende

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
## tooltip

**Type:** `Tooltip | undefined`

:::note{title="Description"}
Configuration des informations rapides, utilisée pour afficher des informations détaillées lorsque la souris survole

:::


### enable

**Type:** `false | true`

:::note{title="Description"}
Si la fonction d'information rapide est activée

:::


## brush

**Type:** `Brush | undefined`

:::note{title="Description"}
Configuration de sélection de trame, utilisée pour prendre en charge l'interaction de sélection de trame



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


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title="Description"}
La configuration de l'axe X, qui est un axe numérique, affiche la première valeur de l'mesure

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


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title="Description"}
Configuration de l'axe Y, qui est un axe numérique et affiche la deuxième valeur de l'mesure

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


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title="Description"}
Configuration du réticule pour afficher l'emplacement précis des données



Configuration de la ligne de réticule, un type de configuration utilisé pour afficher les lignes de réticule (lignes de pointe) dans les graphiques

:::


### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut afficher les lignes en croix

:::

### lineColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la ligne du réticule

:::

### labelColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de l'étiquette de la ligne de réticule

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut afficher les étiquettes de ligne de réticule

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur d’arrière-plan de l’étiquette de la ligne de réticule

:::


## theme

**Type:** `Theme | undefined`

:::note{title="Description"}
Configuration du thème



thème



Il existe deux thèmes intégrés : light et dark. Les nouveaux thèmes peuvent être personnalisés via registerTheme.

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title="Description"}
Configuration de style de point de données, qui peut prendre la forme d'un style unique ou d'un tableau, et prend en charge la configuration de style global ou de style conditionnel.

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

### pointVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
Le point est-il visible ?

:::

### pointSize

**Type:** `number | undefined`

:::note{title="Description"}
taille en points



taille en points

:::

### pointColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur primitive du point



Couleur primitive du point

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title="Description"}
Transparence des couleurs primitives du point



Transparence des couleurs primitives du point

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la bordure de l'élément ponctuel



Couleur de la bordure de l'élément ponctuel

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title="Description"}
Largeur de bordure primitive de point



Largeur de bordure primitive de point

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Description"}
Style de bordure primitif de point



Style de bordure primitif de point

:::

**Exemple**
```ts
solid

dashed

dotted




```
## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title="Description"}
Configuration des points d'étiquette pour ajouter des marqueurs sur des points de données spécifiques

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
Ligne d'étiquette numérique, ligne d'étiquette verticale, marque la valeur spécifique de l'axe X

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
Lignes d'étiquettes numériques, lignes d'étiquettes horizontales, marquez les valeurs spécifiques de l'axe Y

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
Configuration de la zone de légende pour mettre en évidence des plages de données spécifiques

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
## locale

**Type:** `Locale | undefined`

:::note{title="Description"}
Configuration de la langue

:::

