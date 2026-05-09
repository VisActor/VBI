# pipeline Conception

:::info Why Pipeline?
1. Le choix des seniors dans l'équipe
2. L'avantage de Pipeline est qu'il permet `VSeed` de contrôler indépendamment le processus d'exécution de chaque type de graphique. Grâce à une bonne conception, la mise en œuvre de chaque type de graphique peut être découplée et partiellement réutilisée. Chaque type de graphique peut avoir un contrôle parfait sur tous les détails. C’est ce qu’apporte le Pipeline, et ce dont le `VSeed` a le plus besoin.
3. En comparaison, les inconvénients du mode Pipeline peuvent être évités lors de la conception. Tant que vous réduisez la taille d'un seul `Pipe` et réduisez la dépendance entre `Pipe` lors de la conception de `Pipe`, vous pouvez grandement éviter les défauts causés par ce mode.
4. Après quatre générations de conception et d'optimisation du Pipeline, Pipeline en est désormais à sa cinquième version, et les écueils à surmonter ont été surmontés.

:::

## Qu'est-ce que Pipeline ?

Pipeline est une puissante pratique d'abstraction et d'ingénierie qui vise à décomposer une tâche complexe en une série d'étapes plus petites qui sont connectées et exécutées en séquence. Son concept de conception et sa mise en œuvre sont profondément influencés par les idées fondamentales de la programmation fonctionnelle (FP).

### Avantages de Pipeline :
- Modularisation : Implémentation atomique, les modules sont obtenus en combinant des atomes
- Automatisation : déterminez simplement l'entrée et vous pouvez obtenir automatiquement la sortie sans prêter attention à l'implémentation interne.
- Fonction pure : spécifiez l'entrée et vous obtiendrez la sortie attendue, qui est la caractéristique de la fonction pure.
- Parallélisme : prise en charge naturelle de la concurrence.
- Réutilisabilité : chaque module peut être réutilisé.
- Testabilité : En théorie, chaque module est indépendant et peut être testé individuellement pour garantir la qualité.
- Traçabilité : les entrées et sorties de chaque étape sont claires, ce qui facilite la localisation des problèmes et la surveillance de l'état du processus.
- Mise en cache : en théorie, la sortie d'un seul `Pipe` peut être mise en cache séparément, ce qui permet d'éviter des calculs répétés et d'améliorer l'efficacité.

### Inconvénients de Pipeline :
- Dépendances séquentielles : lorsqu'il existe des dépendances séquentielles entre les tuyaux, cela augmentera le coût de compréhension, car vous devez comprendre les étapes précédentes avant de pouvoir comprendre les étapes ultérieures. Une compréhension plus approfondie du processus global est nécessaire pour localiser rapidement les problèmes.
- Coût du débogage : étant donné que Pipeline est exécuté séquentiellement, une fois qu'une certaine étape échoue, l'intégralité de Pipeline échouera. Cela rend le débogage difficile car vous devez localiser l'étape défaillante et la corriger.
- Problèmes de performances : étant donné que Pipeline est exécuté de manière séquentielle, la sortie de chaque étape doit attendre la fin de l'étape précédente, ce qui peut entraîner des problèmes de performances. Surtout lorsque le temps d'exécution d'une certaine étape est long, cela affectera l'efficacité d'exécution de l'ensemble du Pipeline.
- Programmation fonctionnelle : Pour comprendre un nouveau concept, il y a un certain coût d'apprentissage. Par conséquent, les principes de conception et les détails de mise en œuvre doivent être écrits dans le guide de contribution pour permettre aux autres développeurs de le comprendre et de l'utiliser, et de compenser les inconvénients.

## Comment écrire Pipeline en Pipeline ?

### Pipe mode combinaison

Plusieurs tuyaux fonctionnels peuvent être combinés en un tuyau fonctionnel plus grand ou en un pipeline plus complexe.

Aux Pipeline, un Pipeline complet correspond à la mise en œuvre d'un type de graphique ; en décrivant la relation de combinaison des tuyaux, différents types de graphiques peuvent être créés. Lors de l’étape de combinaison de pipelines, il n’est pas nécessaire de prêter attention à la mise en œuvre spécifique de chaque pipeline.


#### Différences de combinaison

Par exemple:

Les graphiques linéaires et les graphiques en aires ont un grand nombre de fonctions qui peuvent être réutilisées, telles que des étiquettes, des légendes, des axes de coordonnées, etc., mais les graphiques linéaires n'ont pas de styles d'éléments de surface, donc le pipeline résout les différences ci-dessus en combinant la fonction Pipe, sans aucune instruction if dans l'ensemble du processus.

```ts
const lineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const areaChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,

  // 仅面积图有面图元样式
  areaStyle,
]
```


### Mode adaptateur Pipe

En plus du mode combiné, la construction de Pipe comporte souvent certaines conditions. Afin de répondre à la combinaison de tuyaux dans différentes conditions, un grand nombre d'adaptateurs de tuyaux sont utilisés dans les VSeed

#### Conditions combinées

Par exemple: 

Le graphique en courbes a une fonction de perspective. Lorsqu'il n'y a pas de perspective, elle est rendue par VChart, et la sortie est VChart spec. Lorsqu'il y a une perspective, elle est rendue par VTable, et la sortie est VTable spec. 

Le graphique en courbes en perspective doit essentiellement réutiliser les fonctions de base du graphique en courbes, telles que les étiquettes, les légendes, les axes de coordonnées, etc. Par conséquent, il est nécessaire d'adapter le canal du graphique en courbes au canal du graphique en courbes en perspective via le mode adaptateur.

```ts
const pivotLineChartPipeline = [
  initPivotChart,
  pivotIndicators([
    label,
    xAxis,
    yAxis,
    lineStyle,
    pointStyle,
  ]),
  pivotChartLegend,
] 

const commonLineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const lineChartPipeline = [
  pivotAdapter(commonLineChartPipeline, pivotLineChartPipeline)
]
```

En résumé, chaque adaptateur est un if else, qui peut extraire les conditions cachées dans le tube dans un adaptateur, de sorte que le if else est placé au niveau supérieur, obtenant ainsi un pipeline avec des dépendances plus claires et réduisant les coûts de maintenance.

### L'unité la plus basique de Pipeline : Fonction Pipe

VSeed Il est prévu que tous les types de graphiques utilisent la fonction comme unité la plus élémentaire pour fournir des capacités de réutilisation et d'extension suffisantes ; Construire un type de graphique de bas en haut pipeline ; Chaque Pipe fonctionnelle doit être un module indépendant, testable et réutilisable ;

La chose la plus importante est que les différents Pipes doivent être abstraits en fonction des différences fonctionnelles (c'est-à-dire, écrire moins si else) au lieu d'écrire un Pipe volumineux et complet.

#### Tuyau de fonction plat

Par exemple: 

Les graphiques à barres, les graphiques à colonnes, les graphiques linéaires, les graphiques en aires et les graphiques à nuages ​​de points ont tous un axe X et un axe Y. Ils sont similaires mais légèrement différents. Si vous écrivez un axes pipe volumineux et complet, cela peut devenir comme ceci

```ts
const lineChartPipeline = [
  axes
]
const barChartPipeline = [
  axes
]
const areaChartPipeline = [
  axes
]
const scatterChartPipeline = [
  axes
]
const axes = (spec, context) => {
  if (isLine || isArea || isColumn){
    // 折线图、面积图、柱状图有一个离散的轴, 一个连续的轴
    return xy(spec, context) 
  }
  if (isScatter){
    // 散点图有2个连续的轴
    return yy(spec, context) 
  }
  if (isBar){
    // 条形图有一个离散的轴, 一个连续的轴, 但与折线图、面积图、柱状图的轴方向不同
    return yx(spec, context) 
  }
}

const xy = (spec, context) => {
  linearAxis(spec, context, {orient: 'left'})
  bandAxis(spec, context, {orient: 'bottom'})
}

const yx = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  bandAxis(spec, context, {orient: 'left'})
}

const yy = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  linearAxis(spec, context, {orient: 'left'})
}
```

La logique ci-dessus est implémentée dans une fonction Pipe pour sélectionner différents tuyaux de sous-fonction en fonction du type de graphique. Le problème causé est :
1. Comment réutiliser les fonctions répétées dans xy, yx et yy ? Un grand nombre de sous-fonctions similaires mais différentes doivent être appelées à plusieurs reprises dans différents canaux de sous-fonctions. Les dépendances peuvent facilement devenir compliquées, entraînant une augmentation des coûts de maintenance.
2. Lors de la modification des fonctions des graphiques en courbes et des graphiques en aires, il est facile de manquer les graphiques à barres car la logique a bifurqué. Les différences doivent donc être prises en compte lors de la mise en œuvre de nouvelles fonctions.

Lorsque l'échelle de l'ensemble du pipeline de spécifications s'étend à des centaines de tuyaux, l'écriture d'une logique comme celle-ci entraînera des coûts de maintenance très élevés. Par conséquent, nous avons besoin d’un moyen plus simple pour sélectionner différents canaux de sous-fonctions en fonction du type de graphique.

En poursuivant l'exemple ci-dessus, résumer les différences dans différents Pipes, encapsuler les différences dans des fonctions plus fines et enfin les combiner directement dans le pipeline peut éviter les problèmes ci-dessus.

```ts
const lineChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const barChartPipeline = [
  yBandAxis,
  xLinearAxis,
]
const areaChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const scatterChartPipeline = [
  xLinearAxis,
  yLinearAxis,
]

const xBandAxis = (spec, context) => {
}
const yBandAxis = (spec, context) => {
}
const xLinearAxis = (spec, context) => {
}
const yLinearAxis = (spec, context) => {
}
```

Dans l'exemple ci-dessus, les axes pipe ne sont pas implémentés, mais les quatre tubes de xBandAxis, yBandAxis, xLinearAxis et yLinearAxis sont directement combinés. Cela évite le problème de la sélection de différents canaux de sous-fonctions en fonction du type de graphique dans le canal des axes, évitant ainsi de porter des jugements différents en fonction du type de graphique, réduisant ainsi l'utilisation de if else.

Par conséquent, la fourchette des différences dans les types de graphiques devrait se trouver sur le pipeline. Sauf nécessité absolue, il n'est pas nécessaire de sélectionner différents canaux de sous-fonctions en fonction du type de graphique dans le Pipeline.

Cette combinaison est conforme à la philosophie de conception du VSeed, qui consiste à utiliser une combinaison de tuyaux fonctionnels plus plats au lieu d'utiliser un jugement conditionnel if else pour créer un tuyau fonctionnel vaste et complet.


