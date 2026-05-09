# pipeline 設計

:::info Why Pipeline?
1. チーム内の先人たちの選択です。
2. Pipeline の強みは、`VSeed` が各チャートタイプの実行フローを独立して制御できることです。適切に設計すれば、各チャートタイプの実装を疎結合にしながら部分的に再利用でき、各チャートタイプのあらゆる詳細を精密に制御できます。これは Pipeline がもたらすものであり、`VSeed` が最も必要としているものです。
3. それに比べると、Pipeline パターンの弱点は設計時に回避できます。`Pipe` を設計するときに単一 `Pipe` の規模を小さくし、`Pipe` 間の依存を減らせば、このパターンの弱点を大きく避けられます。
4. Pipeline は 4 世代にわたる設計と最適化を経て、VSeed では 5 番目のバージョンになっています。踏むべき落とし穴はすでに踏んできました。

:::

## Pipeline とは何か？

Pipeline は強力な抽象でありエンジニアリングプラクティスです。複雑なタスクを、相互につながり順番に実行される小さなステップの列へ分解することを目的とし、その設計思想と実装方法は関数型プログラミング（FP）の中核思想から強い影響を受けています。

### Pipeline の強み:
- モジュール化：原子的に実装し、原子を組み合わせてモジュールを得ます。
- 自動化：入力を決めるだけで自動的に出力を得られ、内部実装を意識する必要がありません。
- 純粋関数：指定した入力から必ず期待する出力を得ることは、純粋関数の特徴です。
- 並列性：並行実行を自然にサポートします。
- 再利用性：各モジュールを再利用できます。
- テスト容易性：理論上、各モジュールは独立しており、単独でテストして品質を保証できます。
- 追跡可能性：各段階の入出力が明確で、問題の特定やフロー状態の監視がしやすくなります。
- キャッシュ可能性：理論上、単一 `Pipe` の出力を個別にキャッシュできるため、重複計算を避けて効率を高められます。

### Pipeline の弱み:
- 前後依存：Pipe 間に前後依存がある場合、理解コストが増えます。後の段階を理解するには、先に前の段階を理解する必要があるためです。問題をすばやく特定するには、全体フローへの深い理解が必要です。
- デバッグコスト：Pipeline は順番に実行されるため、ある段階で失敗すると Pipeline 全体が失敗します。失敗した段階を特定して修正する必要があるため、デバッグが難しくなります。
- 性能問題：Pipeline は順番に実行されるため、各段階の出力は前段階の完了を待つ必要があり、性能問題につながることがあります。特にある段階の実行時間が長い場合、Pipeline 全体の実行効率に影響します。
- 関数型プログラミング：新しい概念を理解する必要があり、一定の学習コストがあります。そのため、設計原理と実装詳細をコントリビューションガイドに記載し、他の開発者が理解して利用しやすくすることで弱みを補います。

## VSeed 内では Pipeline をどう書くべきか？

### Pipe 組み合わせパターン

複数の機能 Pipe は、より大きな機能 Pipe に組み合わせることも、より複雑な Pipeline に組み合わせることもできます。

VSeed では、完全な Pipeline が 1 つのチャートタイプの実装に対応します。Pipe の組み合わせ関係を記述することで、異なるチャートタイプを作れます。Pipeline を組み合わせる段階では、各 pipe の具体的な実装を意識する必要はありません。


#### 組み合わせの差異

例:

折れ線グラフと面グラフは、ラベル、凡例、座標軸など多くの機能を再利用できます。しかし折れ線グラフには面図形スタイルがありません。そのため pipeline は機能 Pipe の組み合わせによってこの差異を解決し、プロセス全体に if 文はありません。

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


### Pipe アダプターパターン

組み合わせパターンに加えて、Pipe の構築には一定の条件が伴うことがよくあります。異なる条件下での Pipe の組み合わせを満たすため、VSeed では Pipe アダプターを多用しています。

#### 組み合わせ条件

例:

折れ線グラフにはピボット機能があります。ピボットなしの場合は VChart がレンダリングし、VChart spec を出力します。ピボットありの場合は VTable がレンダリングし、VTable spec を出力します。

ピボット折れ線グラフは、ラベル、凡例、座標軸など折れ線グラフの基本機能をほぼ再利用する必要があります。そのため、アダプターパターンによって折れ線グラフの Pipe をピボット折れ線グラフの Pipe に適配する必要があります。

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

まとめると、各 adapter は 1 つの if else に相当します。pipe 内に隠れた条件を adapter として抽象化できるため、if else は最上位に前倒しされます。その結果、依存関係がより明確な Pipeline を得られ、保守コストを減らせます。

### Pipeline の最小基本単位：機能 Pipe

VSeed はすべてのチャートタイプが機能を最小基本単位とし、十分な再利用性と拡張性を持つことを期待しています。チャートタイプの pipeline はボトムアップで構築します。各機能 Pipe は、独立し、テスト可能で、再利用可能なモジュールであるべきです。

最も重要なのは、機能差異をもとに異なる Pipe を抽象化すること（つまり if else を少なくすること）であり、大きく万能な Pipe を書くことではありません。

#### 機能 Pipe のフラット化

例:

横棒グラフ、縦棒グラフ、折れ線グラフ、面グラフ、散布図はいずれも X 軸と Y 軸を持ちます。これらは似ていますが少しずつ異なります。大きく万能な axes pipe を書くと、次のようになる可能性があります。

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

上記のロジックは、1 つの機能 Pipe 内でチャートタイプに応じて異なるサブ機能 pipe を選択しています。これによって次の問題が発生します。
1. xy、yx、yy 内で重複する機能はどのように再利用すべきか。似ているが少しずつ異なる大量のサブ関数を、異なるサブ機能 pipe の中で繰り返し呼び出す必要があります。依存関係が複雑になりやすく、保守コストが増えます。
2. 折れ線グラフや面グラフの機能を変更するとき、横棒グラフを見落としやすくなります。ロジックが分岐しているため、新機能を実装する際に差異を考慮する必要があります。

spec pipeline 全体の規模が数百個の pipe に拡大すると、このような書き方は非常に高い保守コストをもたらします。そのため、チャートタイプに応じて異なるサブ機能 pipe を選択する、より単純な方法が必要です。

上記の例を続けると、差異を異なる Pipe として抽象化し、より細かい粒度の機能で差異をラップし、最後に pipeline 内で直接組み合わせれば、上記の問題を避けられます。

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

上記の例では axes pipe を実装せず、xBandAxis、yBandAxis、xLinearAxis、yLinearAxis という 4 つの pipe を直接組み合わせています。これにより、axes pipe 内でチャートタイプに応じて異なるサブ機能 pipe を選択する問題を避け、チャートタイプに応じた判断を減らし、if else の使用を抑えられます。

すべてのチャートタイプ差異による分岐は Pipeline の上位に置くべきです。やむを得ない場合を除き、Pipeline 内でチャートタイプに応じて異なるサブ機能 pipe を選択する必要はありません。

この組み合わせ方は VSeed の設計思想に沿っています。つまり、if else 条件判断で大きく万能な機能 Pipe を作るのではなく、よりフラットな機能 Pipe の組み合わせを使います。

