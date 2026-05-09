# RacePie

:::note{title="Description"}
Graphique circulaire dynamique (Race Pie Chart)

Il convient pour afficher la relation de proportion des données dans le temps. La proportion de chaque catégorie est représentée par la taille de la zone du secteur.

Scénarios applicables :

\- Afficher les changements dans la répartition proportionnelle des données catégorielles au fil du temps

\- Accent sur l'évolution de la relation entre l'ensemble et les parties des données dans la dimension temporelle

\- Observer les fluctuations de la proportion des différentes catégories dans le total

:::

:::note{title="Note"}
Diagramme circulaire dynamique :

\- Valeur de l'mesure de mappage d'angle, valeur de dimension de mappage de couleurs

\- Prend en charge le contrôle de la dimension temporelle via le lecteur et l'affichage dynamique des changements de proportion

\- La zone sectorielle est ajustée dynamiquement à mesure que les données changent

:::


## chartType

**Type:** `"racePie"`

:::note{title="Description"}
Graphique circulaire dynamique, adapté à l'affichage de la relation proportionnelle entre les changements de données au fil du temps

:::


## dataset

**Type:** `Record[]`

:::note{title="Description"}
source de données

:::


## dimensions

**Type:** `RacePieDimension[] | undefined`

:::note{title="Description"}
Dimensions

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
Canaux de mappage dimensionnel

\- color : prend en charge le mappage de plusieurs dimensions sur des canaux de couleur

\- detail : Prise en charge du mappage de plusieurs dimensions sur les canaux de détail

\- tooltip : prise en charge du mappage de plusieurs dimensions pour infobuller les canaux

\- label : prise en charge du mappage de plusieurs dimensions pour étiqueter les canaux

\- row : prise en charge du mappage de plusieurs dimensions sur des canaux de ligne

\- column : prise en charge du mappage de plusieurs dimensions sur les canaux de colonnes

\- player : prend en charge le mappage de plusieurs dimensions sur les canaux des joueurs

:::


## measures

**Type:** `PieMeasure[] | undefined`

:::note{title="Description"}
indice

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

**Type:** `"color" | "tooltip" | "label" | "angle" | undefined`

:::note{title="Description"}
Canal de cartographie des mesures

\- angle : angle de cartographie des mesures

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
Configuration de la pagination

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
## player

**Type:** `Player | undefined`

:::note{title="Description"}
Configuration du lecteur, utilisée pour spécifier la dimension temporelle, la configuration de base des diagrammes circulaires dynamiques



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


## backgroundColor

**Type:** `BackgroundColor`

:::note{title="Description"}
couleur de fond

:::


## color

**Type:** `Color | undefined`

:::note{title="Description"}
Configuration des couleurs

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

**Type:** `PieLabel | undefined`

:::note{title="Description"}
Configuration des étiquettes

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

### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title="Description"}
Méthode de présentation des étiquettes, efficace uniquement pour les diagrammes circulaires et les diagrammes en anneau et lorsque `labelPosition` est `outside`

\- arc : disposition des étiquettes selon la forme de l'arc

\- labelLine : alignez les deux extrémités de l'étiquette et connectez les primitives et les étiquettes en forme d'éventail via des lignes de guidage

\- edge : alignez les deux extrémités de l'étiquette, connectez les primitives et les étiquettes en forme d'éventail via des lignes de guidage et rapprochez-vous des bords des deux extrémités du graphique.

:::


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
Configuration des informations rapides

:::


### enable

**Type:** `false | true`

:::note{title="Description"}
Si la fonction d'information rapide est activée

:::


## brush

**Type:** `Brush | undefined`

:::note{title="Description"}
Configuration de la sélection de trame



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


## locale

**Type:** `Locale | undefined`

:::note{title="Description"}
Configuration de la langue

:::

