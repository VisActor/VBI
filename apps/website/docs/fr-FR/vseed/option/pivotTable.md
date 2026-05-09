# PivotTable

:::info{title="recommandé"}
\- Configuration de terrain recommandée : mesures `1`, dimensions `1`

\- Prise en charge du remodelage des données : au moins les mesures `1`, les dimensions `0`

:::

:::info{title="encodage mappage"}
Les tableaux croisés dynamiques prennent en charge les canaux visuels suivants :

`row` : dimension de ligne, prend en charge `plusieurs dimensions`, regroupement sur lignes par valeur de dimension

`column` : dimension de colonne, prend en charge `plusieurs dimensions`, regroupement sur colonnes par valeur de dimension

`detail` : canal de subdivision, prend en charge `plusieurs mesures`, affiche les valeurs des mesures dans les cellules

:::

:::note{title="Description"}
Les tableaux croisés dynamiques conviennent aux scénarios d'analyse croisée de données multidimensionnelles et peuvent configurer de manière flexible les dimensions des lignes et des colonnes ainsi que les méthodes de calcul des mesures.

Scénarios applicables :

\- Analyse statistique de données multidimensionnelles complexes

\- Exploration des données et affichage agrégé

\- Génération de rapports commerciaux et exploration de données

:::

:::warning{title="Warning"}
Exigences en matière de données :

\- Au moins 1 dimension de ligne ou 1 dimension de colonne ou 1 mesure

\- Les données doivent être agrégées

\- Les données peuvent être regroupées

Fonctionnalités activées par défaut :

\- Par défaut, le tri des lignes et des colonnes, le filtrage des données, les calculs agrégés et les sous-totaux/totaux sont activés.

:::


## chartType

**Type:** `"pivotTable"`

:::note{title="Description"}
Tableau croisé dynamique, adapté aux scénarios d'analyse croisée de données multidimensionnelles

:::

**Exemple**
```ts
'pivotTable'




```
## dataset

**Type:** `Record[]`

:::note{title="Description"}
Des ensembles de données conformes aux spécifications TidyData et qui ont été agrégées sont utilisés pour définir la source de données et la structure du graphique. L'ensemble de données saisi par l'utilisateur ne nécessite aucun traitement. VSeed est livré avec une puissante fonction de remodelage des données et remodèlera les données tout seul. Les données du tableau croisé dynamique seront finalement converties dans la structure arborescente correspondante et l'utilisateur n'aura pas besoin d'effectuer un traitement manuel des données.

:::

**Exemple**
```ts
[{region:'Chine orientale', product:'A', sales:1000}, {region:'Chine orientale', product:'B', sales:1500}]




```
## dimensions

**Type:** `TableDimension[] | undefined`

:::note{title="Description"}
Les dimensions des lignes et des colonnes du tableau croisé dynamique traiteront automatiquement les données dans une structure arborescente et les mapperont aux axes des lignes et des colonnes.

:::

**Exemple**
```ts
[{id : 'region', alias : 'Région', isRow : true}, {id : 'product', alias : 'Produit', isColumn : true}]




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

**Type:** `"row" | "column" | undefined`

:::note{title="Description"}
Canaux de mappage dimensionnel

\- row : prise en charge du mappage de plusieurs dimensions sur des canaux de ligne

\- column : prise en charge du mappage de plusieurs dimensions sur les canaux de colonnes

:::


## measures

**Type:** `TableMeasure[] | undefined`

:::note{title="Description"}
Les tableaux croisés dynamiques prennent en charge plusieurs mesures de dimension

:::

**Exemple**
```ts
[{id : 'sales', alias : 'Ventes', aggregation : 'sum'}]




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

**Type:** `"column" | undefined`

:::note{title="Description"}
Canal de cartographie des mesures

\- column : Colonne mesure

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
La couleur d'arrière-plan peut être une chaîne de couleur, telle que 'red', 'blue' ou hexadécimal, rgb ou rgba '#ff0000', 'rgba(255,0,0,0.5)'

:::


## borderColor

**Type:** `string | undefined`

:::note{title="Description"}
couleur de la bordure du tableau

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de la police du corps du tableau

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la police du corps du tableau

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
La couleur d'arrière-plan du corps du tableau

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille de la police des en-têtes de lignes et des en-têtes de colonnes

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de police des en-têtes de lignes et des en-têtes de colonnes

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
La couleur d’arrière-plan des en-têtes de lignes et des en-têtes de colonnes

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
La couleur d'arrière-plan lorsque la souris survole la cellule dans l'en-tête de ligne ou de colonne. Il est utilisé pour mettre en évidence les cellules où se croisent la ligne et la colonne où se trouve la souris.

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
Lorsque la souris survole la cellule en tête d'une ligne ou d'une colonne, elle est utilisée pour mettre en surbrillance toutes les cellules de la ligne et de la colonne où se trouve la souris.

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title="Description"}
La couleur de la bordure de la cellule sélectionnée, utilisée pour mettre en évidence la cellule sélectionnée

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
La couleur d'arrière-plan des cellules sélectionnées, utilisée pour mettre en évidence les cellules sélectionnées

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title="Description"}
Définir des styles spéciaux pour les cellules dans la partie corps du tableau

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title="Description"}
sélecteur de données



Si le sélecteur est configuré, fournissez la valeur numérique selector, les données locales selector, la dimension conditionnelle selector, l'mesure conditionnel selector pour un total de quatre types de capacités de correspondance de données.

Si le sélecteur n'est pas configuré, le style prend effet globalement.



Remarque : selector et dynamicFilter ne peuvent pas être utilisés en même temps, dynamicFilter a une priorité plus élevée

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

Filtre de colonne de champ
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




```
#### field

**Type:** `string | string[]`

:::note{title="Description"}
Nom du champ, qui peut être un champ unique ou un tableau de plusieurs champs

:::

**Exemple**
```ts
champ unique
field: 'sales'

plusieurs champs
field: ['sales', 'profit', 'revenue']



```
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

**Type:** `TableDynamicFilter | undefined`

:::note{title="Description"}
Filtres dynamiques (pilotés par code)



Implémenter une logique complexe de filtrage des données via le code JavaScript généré par AI

Convient pour Top N, l'analyse statistique, les conditions complexes et autres scénarios difficiles à exprimer avec selector statique



Compétences de base :

\- Prend en charge des conditions de filtrage de données arbitrairement complexes

\- Utiliser les fonctions utilitaires intégrées pour la manipulation des données

\- Exécution sécurisée dans un environnement de navigateur (Web Worker sandbox)



Exigences d'environnement : seuls les environnements de navigateur sont pris en charge, l'environnement fallback utilisera fallback



Remarque : selector et dynamicFilter ne peuvent pas être utilisés en même temps, dynamicFilter a une priorité plus élevée



Configuration du filtre dynamique de table



Un filtrage précis au niveau des cellules du tableau est obtenu grâce au code JavaScript généré par AI

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
"Mettez en surbrillance les cellules dont les ventes sont supérieures à 1 000"

"Mettez en surbrillance la cellule avec la plus grande valeur dans chaque ligne"



```
#### code

**Type:** `string`

:::note{title="Description"}
AI Généré JavaScript code filtre



\- Ne peut utiliser que les fonctions utilitaires intégrées (accessibles via _ ou R)

\- Paramètres d'entrée : data (tableau), chaque item contient un champ _index représentant le numéro de ligne

\- Doit renvoyer un tableau de sélection de cellules : ``Array<{ __row_index: number, field: string }>``

\- Lorsque field est "*", cela signifie que la ligne entière est mise en surbrillance.

\- Utilisation interdite : eval, Function, opérations asynchrones, Function eval, requêtes réseau

:::

**Exemple**
```ts
Top N Filtre
dynamicFilter = {
type: 'row\-with\-field',
description: 'Mettez en avant les 3 produits les plus vendus',
code: `
const sorted = _.sortBy(data, 'sales');
const reversed = [...sorted].reverse();
const result = _.take(reversed, 3);
return _.flatten(
`_.map(result, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Filtrer selon plusieurs conditions
dynamicFilter = {
type: 'row\-with\-field',
description: 'Mettez en avant les produits avec des marges bénéficiaires supérieures à 20% et des ventes supérieures à 5 000',
code: `
const matched = _.filter(data, item => {
const profitRate = (item.profit / item.sales) * 100;
return profitRate > 20 && item.sales > 5000;
});
return _.flatten(
`_.map(matched, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Filtre de valeur relative
dynamicFilter = {   *
type: 'row\-with\-field',
description: 'Mettre en avant les produits dont les ventes sont supérieures à la moyenne',
code: `
const avgSales = _.meanBy(data, 'sales');
const matched = _.filter(data, item => item.sales > avgSales);
return _.flatten(
`_.map(matched, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Filtre de groupe
dynamicFilter = {
type: 'row\-with\-field',
description: « Produits avec les ventes les plus élevées dans chaque région »,
code: `
const grouped = _.groupBy(data, 'region');
const topByRegion = _.map(_.values(grouped), group => _.maxBy(group, 'sales'));
return _.flatten(
`_.map(topByRegion, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Mettre en surbrillance toute la ligne
dynamicFilter = {
description: "Mettez en surbrillance des lignes entières où les ventes sont supérieures aux bénéfices",
code: `
const matched = _.filter(data, item => item.sales > item.profit);
`return matched.map(item => ({`
__row_index: item._index,
field: '*'
}));
`,
enabled: true
}



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

### backgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur d'arrière-plan des cellules

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut activer la configuration du niveau de couleur d'arrière-plan (color scale)

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title="Description"}
Cartographie de l'échelle de couleur d'arrière-plan des cellules, la priorité est supérieure à backgroundColor

:::


#### minValue

**Type:** `number | undefined`

:::note{title="Description"}
Valeur minimale. S'il n'est pas configuré, la valeur par défaut est la valeur minimale dans la colonne de données actuelle.

:::

#### maxValue

**Type:** `number | undefined`

:::note{title="Description"}
Valeur maximale. S'il n'est pas configuré, la valeur par défaut est la valeur maximale dans la colonne de données actuelle.

:::

#### minColor

**Type:** `string`

:::note{title="Description"}
La couleur correspondant à la valeur minimale

:::

#### maxColor

**Type:** `string`

:::note{title="Description"}
La couleur correspondant à la valeur maximale

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut activer la fonction de barre de données d'arrière-plan (une barre pour afficher la taille de la cellule actuelle). Il n'est pas activé par défaut.

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title="Description"}
La couleur de la barre de données d'arrière-plan lorsque la cellule actuelle est un nombre positif

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la barre de données d'arrière-plan lorsque la valeur est négative

:::

### barMin

**Type:** `number | undefined`

:::note{title="Description"}
Valeur minimale de la barre de progression



Calcule automatiquement la valeur minimale de la colonne lorsqu'elle n'est pas configurée

:::

### barMax

**Type:** `number | undefined`

:::note{title="Description"}
Valeur maximale de la barre de progression



Calcule automatiquement la valeur maximale de la colonne lorsqu'elle n'est pas configurée

:::

### textColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur du texte de la cellule

:::

### textFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Taille du texte de la cellule

:::

### borderColor

**Type:** `string | undefined`

:::note{title="Description"}
Couleur de la bordure des cellules

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title="Description"}
Largeur de la ligne de bordure de cellule

:::


## indicatorsAsCol

**Type:** `boolean | undefined`

:::note{title="Description"}
Indique si l'mesure est affiché sous forme de colonne. Lorsqu'il vaut true, l'mesure est développé dans le sens de la colonne. Lorsqu'il est false, l'mesure est développé dans le sens de la ligne.

:::

**Exemple**
```ts
true




```
## totals

**Type:** `PivotTableTotals | undefined`

:::note{title="Description"}
Configuration du total et du sous-total pour les tableaux croisés dynamiques



Configuration du sous-total total pour le tableau croisé dynamique

:::

**Exemple**
```ts
{ row: { showGrandTotals: true, showSubTotals: true, subTotalsDimensions: ['category'] } }




```
### row

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title="Description"}
Configuration du sous-total du total des lignes



Configuration du sous-total du total de ligne ou de colonne

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut afficher les totaux (total des lignes/colonnes)

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut afficher les sous-totaux

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title="Description"}
La dimension du sous-total, quelles dimensions sont utilisées pour regrouper les sous-totaux

:::

**Exemple**
```ts
['category', 'region']



```
### column

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title="Description"}
Configuration du sous-total total pour les colonnes



Configuration du sous-total du total de ligne ou de colonne

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut afficher les totaux (total des lignes/colonnes)

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title="Description"}
S'il faut afficher les sous-totaux

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title="Description"}
La dimension du sous-total, quelles dimensions sont utilisées pour regrouper les sous-totaux

:::

**Exemple**
```ts
['category', 'region']




```
## theme

**Type:** `Theme | undefined`

:::note{title="Description"}
Le thème d'un graphique. Un thème est une configuration fonctionnelle de priorité inférieure qui contient des configurations communes communes à tous les types de graphiques et des configurations de graphiques communes aux types de graphiques à classe unique.



Il existe deux thèmes intégrés : clair et sombre. Les utilisateurs peuvent personnaliser le thème via Builder



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


## locale

**Type:** `Locale | undefined`

:::note{title="Description"}
langue



Configuration du langage du graphique, prend en charge 'zh\-CN' et 'en\-US'. De plus, vous pouvez appeler la méthode intl.setLocale('zh\-CN') pour définir la langue.

:::

