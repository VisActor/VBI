# DSLConception

:::info Signification

VSeed est déclaratif DSL

- DSL La conception est l'art d'exprimer des problèmes de domaine et peut simplifier efficacement des problèmes complexes.
- DSL Rendez le codage aussi naturel que l'écriture de votre langue maternelle à des personnes qui la connaissent. Une fois que vous êtes familiarisé avec VSeed, le rendu des graphiques est aussi simple que l'écriture d'un langage naturel.
- Il en va de même pour les `VChart` et `VTable`


:::

:::tip

`DSL déclaratif` Se concentrer sur « quoi » (What). Décrivez à quoi devrait ressembler un résultat souhaité ou un état final, sans vous soucier des étapes spécifiques au sein de l'ordinateur pour accéder à cet état.


`DSL impératif` Focus sur le "comment" (How). Fournissez une série d'instructions claires, étape par étape, pour indiquer à l'ordinateur comment atteindre l'état cible étape par étape.
:::

## VSeed Compromis

1. Focus sur le domaine (Focus)

Sacrifiez une certaine généralité et concentrez-vous sur la résolution de problèmes dans des domaines spécifiques. Par conséquent, l'objectif principal de VSeed n'est pas de répondre en profondeur à toutes les exigences d'un type de graphique, mais de se concentrer sur la conversion des données avant le type de graphique. Le reste des fonctionnalités, comme les thèmes, les interactions, les animations, etc.

2. Niveau d'abstraction (Abstraction Level)

`VSeed` offre un niveau d'abstraction plus élevé, permettant aux utilisateurs de se concentrer sur la résolution des problèmes plutôt que de prêter attention aux détails de mise en œuvre sous-jacents. Cela améliore l’efficacité du développement. Par exemple, pour changer de type de graphique, modifiez simplement un paramètre sans avoir à prêter attention aux détails de la façon de changer.

3. Les contraintes sont des avantages (Constraint is Advantage)

`VSeed` met l'accent sur les contraintes, reçoit un `VSeed DSL` et génère un `VTable` ou `VChart`'s `spec`, qui permet aux utilisateurs de contrôler de manière plus flexible les fonctions d'un seul graphique, `VSeed` n'est pas une boîte noire.

Par conséquent, VSeed peut être simplement considéré comme un `Spec Builder`, sans détruire les fonctions originales de `VTable` ou `VChart`. Tout utilisateur `VChart`, `VTable` peut accéder rapidement aux `VSeed` au sein de la plateforme existante.