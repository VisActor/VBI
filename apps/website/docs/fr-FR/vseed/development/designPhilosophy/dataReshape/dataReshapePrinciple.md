# Principes de remodelage des données

:::info Remodelage des données
VSeed Proposer une méthode générale de remodelage des dimensions, visant à abaisser encore le seuil de visualisation des données
:::

La refonte des données fait référence au processus de conversion des données d'une forme structurée à une autre. L'essentiel réside dans la modification de la façon dont les données sont organisées (telles que les lignes, les colonnes, les index, les hiérarchies) pour s'adapter aux différents besoins d'analyse ou de traitement tout en préservant l'intégrité des données.


## Remodelage des dimensions
Les outils linguistiques Python et R prennent déjà en charge le remodelage des dimensions
1. Python Pandas fournit un remodelage des données pour `pivot` et `melt`
2. R tidyverse fournit un remodelage des données pour `pivot_longer` et `pivot_wider`


## Augmentation de la dimensionnalité et réduction de la dimensionnalité

La promotion et la réduction de la dimensionnalité sont spirituellement cohérentes avec les idées de la théorie des catégories (objets, morphismes et isomorphismes), mais elles ne suivent pas strictement la théorie des catégories dans sa mise en œuvre.
Un accent particulier :
1. Lors de la mise à niveau, des informations inexistantes sur le « nom de l'mesure » et la « valeur de l'mesure » seront créées « à partir de rien »
2. Lors de la réduction de dimensionnalité, les informations « nom de l'mesure » et « valeur de l'mesure » existant dans les données seront « supprimées ».

La mise à l'échelle des dimensions peut transformer complètement les données, mais les noms de colonnes de dimensions auront des valeurs nulles, ce qui permet de remplir des informations supplémentaires.
La réduction de la dimensionnalité fera perdre le contenu informationnel, un stockage supplémentaire des informations de transformation est donc nécessaire pour obtenir une véritable transformation isomorphe, sinon les informations seront définitivement perdues.

![commonDataReshape](/images/commonDataReshape.png)

## Regroupement de l'amélioration de la dimensionnalité et de la réduction de la dimensionnalité

Semblable à l’amélioration et à la réduction de dimensionnalité ordinaires, il existe des scénarios similaires d’augmentation ou de perte d’informations. De plus, en raison de l'introduction du regroupement, davantage de données vides seront générées.
Signification:
1. Regroupement d'mesures : augmentez facilement la dimension grâce au regroupement et traitez rapidement les données détaillées
2. Requête multi-groupes : plusieurs éléments de données détaillées peuvent être facilement obtenus via plusieurs SQL, et ils peuvent être fusionnés en un seul élément de données grâce au regroupement et à la réduction de dimensionnalité.

![groupedDataReshape](/images/groupedDataReshape.png)

## Dérivation de la loi

### Promotion dimensionnelle

![rule](/images/ruleDataReshape.png)

![commonDataReshape2](/images/commonDataReshape2.png)

:::tip
1. Lorsque plusieurs mesures sont mis à niveau, le nombre d’mesures devient un. Après la mise à niveau d’un mesure, l’mesure est toujours 1.
2. Mise à niveau des dimensions multidimensionnelles, s'il y a une dimension supplémentaire, 0 dimension sera également ajoutée par 1
3. 0 dimension et 1 mesure, vous pouvez augmenter la dimension à plusieurs reprises pour obtenir n'importe quel nombre de dimensions et 1 mesure (vous pouvez donc également dessiner un histogramme avec un mesure)

:::

### Réduction de dimensionnalité

![rule](/images/ruleDataReshape2.png)

![groupedDataReshape2](/images/groupedDataReshape2.png)

:::tip
1. Pour la réduction de dimensionnalité multi-index, la valeur de dimension et l'index seront un produit cartésien et deviendront un nouvel index.
2. Réduction de la dimensionnalité multidimensionnelle, les valeurs de plusieurs dimensions seront un produit cartésien pour devenir une nouvelle dimension

:::


## Exemple

#### 0 dimension 1 mesure
![0d1m](/images/0d1m.png)
#### 0 dimension 3 mesures
![0d3m](/images/0d3m.png)
#### 1 dimension 1 mesure
![1d1m](/images/1d1m.png)
#### 1 dimension 2 mesures
![1d2m](/images/1d2m.png)
#### 2 dimensions 1 mesure
![2d1m](/images/2d1m.png)
#### 2 dimensions 2 mesures
![2d2m](/images/2d2m.png)
