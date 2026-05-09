# TidyData

:::info Signification
TidyData Grâce au principe de base « les variables sont des colonnes et les observations sont des lignes », la complexité du nettoyage des données est considérablement réduite, nous permettant de nous concentrer davantage sur les problèmes commerciaux plutôt que sur la conversion du format des données.
:::

## papier

Auteur de l'article `Hadley Wickham`, l'article traite d'un petit module de traitement des données, le tri des données, car des ensembles de données bien rangés sont faciles à manipuler, modéliser et visualiser, et ont une structure spécifique.

Il est fortement recommandé de lire cet article, veuillez vérifier : [Tidy Data](https://www.jstatsoft.org/article/view/v059i10)


## Application des TidyData aux VSeed

La configuration `dataset` dans VSeed DSL est un ensemble de données au format `TidyData`.

Les fonctionnalités principales sont les suivantes :
1. Une colonne par variable : les valeurs des variables sont stockées dans des colonnes distinctes, telles que l'âge ou le sexe.
2. Une ligne par observation : toutes les valeurs variables pour chaque objet d'observation forment une ligne, comme les informations sur l'âge et le sexe d'une personne.
3. Un tableau pour chaque unité d'observation : différents types d'unités d'observation (par exemple, personne, heure, lieu) doivent être stockés séparément.


Par conséquent, les résultats de la requête `SQL` peuvent être directement transmis à la configuration `dataset` de `VSeed`, et aucun traitement de données supplémentaire n'est requis pour une analyse et une visualisation rapides.