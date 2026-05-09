# VSeed

:::info Résumé en une phrase
Il accepte les besoins flexibles des entreprises vers le haut, limite le formulaire d'accès aux données vers le bas, organise les données de manière unifiée et simplifie le complexe.
:::

## VSeedQu'est-ce que c'est ? 

`VSeed` est un outil de visualisation pour l'analyse des données. Il se concentre sur la fourniture de capacités de conversion de données hautement cohérentes entre différents types de graphiques. Il fournit également des fonctions prêtes à l'emploi pour répondre aux besoins d'analyse légère des données.

## VSeed Quels sont les avantages ?

> Tout d’abord, il est vraiment simple à utiliser. Deuxièmement, c'est vraiment flexible. Enfin, il existe de nombreux packages dans VSeed. Vous devez comprendre comment remodeler les données dans VSeed avant de pouvoir les appliquer parfaitement.

1. La manière la plus intuitive de changer de graphique [Demo](/vseed/guide/intro/chartTypeSwitch)
2. Le graphique en perspective le plus simple à utiliser [Demo](/vseed/guide/intro/pivotAndCombine)
3. Puissante capacité de remodelage des données, sans aucun traitement de données, n'importe quel nombre de dimensions, d'mesures et n'importe quel type de graphique peuvent être produits [Demo](/vseed/guide/intro/dataReshape)
4. `VSeed` est entièrement sérialisable et prend donc en charge le transfert multiplateforme `VSeed DSL` [Demo](/vseed/guide/intro/crossPlatformRender)
5. Prêts à l'emploi : tels que les formats numériques, l'internationalisation, les thèmes clairs et sombres, les styles couramment utilisés, etc. [Demo](/vseed/guide/intro/internationalization)
6. Excellentes performances de traitement des données, prend en charge le traitement des données à l'extrémité `Node` et la visualisation à l'extrémité `Web` [Demo](/vseed/guide/intro/separateBuild)

## VSeed Quels sont les inconvénients ?

1. `VSeed` n'est pas responsable du peaufinage de chaque détail d'une seule carte. Ces besoins seront couverts par les `VChart` et `VTable`. `VSeed` offre uniquement la possibilité de modifier de manière flexible `spec`. Les utilisateurs peuvent modifier de manière flexible chaque détail du graphique en fonction de leurs propres besoins.
2. Seuls les ensembles de données répondant aux spécifications du `tidyData` peuvent être visualisés par `VSeed`. Les ensembles de données non standards ne sont pas acceptés par `VSeed`.
3. Basé sur la construction écologique des `VisActor`, les utilisateurs doivent comprendre les concepts de base des `VChart` et `VTable`

## Quels sont les principes du VSeed ?

1. `VSeed` Doit prendre en charge la sérialisation
2. `VSeed` Il n'est pas nécessaire de fournir trop de capacités de style et doit se concentrer sur le traitement de la relation entre les graphiques et les données.
3. `VSeed` Il doit encapsuler les fonctions communes couramment utilisées dans le domaine de l'analyse, telles que les formats numériques, l'internationalisation, les thèmes, les styles communs et les fonctions communes, afin qu'elles puissent être utilisées immédiatement.
4. Les besoins de personnalisation plus flexibles doivent être personnalisés par l'utilisateur. Par conséquent, VSeed ne fournit qu'une seule spécification Builder au monde extérieur, qui est utilisée pour construire les spécifications de VChart et VTable. 
   - Les utilisateurs peuvent contrôler de manière flexible l'instance VChart et VTable Instance.
   - Les utilisateurs peuvent modifier de manière flexible les spécifications de VChart et VTable en fonction de leurs propres besoins.


## Pourquoi concevoir VSeed ?

1. `VChart` ne peut jamais être basculé de manière transparente vers `VTable`, et vice versa. Face à une telle demande, une encapsulation abstraite de niveau supérieur est vouée à apparaître.
2. Les utilisateurs utilisant `VChart` et `VTable` doivent traiter eux-mêmes les données. Ce travail sera répété des centaines ou des milliers de fois involontairement. `VSeed` souhaite réduire la complexité du traitement des données dans des scénarios courants et réduire le travail répétitif.
3. Le seuil d'utilisation de `VChart` et `VTable` peut être abaissé dans une certaine mesure, par exemple en utilisant `VTable`Rendu`PivotChart`.
4. `VSeed` pourra éventuellement être développé en un sous-module de `HeadlessBI` pour créer des outils généraux d'analyse de données.