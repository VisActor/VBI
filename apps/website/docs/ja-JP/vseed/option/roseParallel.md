# RoseParallel

:::info{title="推奨"}
\- 推奨フィールド設定: `1`個のメジャー, `1`個のディメンション

\- データ再形成に対応: 少なくとも`1`個のメジャー, `0`個のディメンション

:::

:::info{title="エンコーディングマッピング"}
グループローズチャートは、次の視覚チャネルをサポートします:

`angle`  : 角度チャネル。`複数のディメンション`をサポートし、ディメンション値に基づいて角度軸にマッピングします

`radius` : 半径チャネル。`複数のメジャー`をサポートし、メジャー値に基づいて半径軸にマッピングします

`detail` : 詳細チャネル。`複数のディメンション`をサポートし、同じ色系列の下でより細かい粒度のデータを表示するときに使用します

`color`  : 色チャネル。`複数のディメンション`または `1 つのメジャー`をサポートします。ディメンション色は異なるデータ系列の区別に使用し、メジャー色はメジャー値をグラフィック色へ線形マッピングするために使用します

`tooltip`: ツールチップチャネル。`複数のディメンション`と `複数のメジャー`をサポートし、マウスがデータポイントにホバーしたときに表示します

`label`  : ラベルチャネル。`複数のディメンション`と `複数のメジャー`をサポートし、データポイント上にデータラベルを表示します

:::

:::note{title="説明"}
グループローズチャートは、多次元データの比較シーンに適しており、極座標系の扇形の弧度と半径でデータの大きさを表示します

適用シーン:

\- 多次元データの分布比較

\- 周期性データの強弱比較

\- カテゴリデータの数値と構成比を同時に表示する

:::

:::warning{title="Warning"}
データ要件:

\- 少なくとも 1 個の数値フィールド（メジャー）が必要です

\- 最初のディメンションは角度軸に配置され、その他のディメンションはメジャー名（複数メジャーが存在する場合）と結合されて凡例項目として表示されます

\- すべてのメジャーは自動的に 1 つのメジャーに結合されます

デフォルトで有効な機能:

\- 凡例、極座標系、データラベル、ツールチップ、数値スケーリングがデフォルトで有効です

:::


## chartType

**Type:** `"roseParallel"`

:::note{title="説明"}
グループローズチャート



グループローズチャートです。極座標系で多次元データの比較関係を表示します。

:::

**例**
```ts
'roseParallel'




```
## dataset

**Type:** `Record[]`

:::note{title="説明"}
データセット



TidyData 仕様に準拠し、すでに集計済みのデータセットです。チャートのデータソースと構造を定義するために使用します。ユーザーが入力したデータセットに処理は不要です。VSeed は強力なデータ再形成機能を備えており、自動的にデータを再形成します。ローズチャートのデータは最終的に 2 個のディメンション、1 個のメジャーへ変換されます。

:::

**例**
```ts
[{month:'1月', value:100}, {month:'2月', value:150}, {month:'3月', value:120}]




```
## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title="説明"}
ディメンション



ローズチャートの最初のディメンションは角度軸にマッピングされ、その他のディメンションはメジャー名（複数メジャーが存在する場合）と結合されて凡例項目として表示されます。

:::

**例**
```ts
[{id: 'category', alias: 'カテゴリ'}]




```
### id

**Type:** `string`

:::note{title="説明"}
ディメンションに対応するフィールド id です

:::

### alias

**Type:** `string | undefined`

:::note{title="説明"}
ディメンションのエイリアスです

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title="説明"}
ディメンションの時間フォーマット設定です

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title="説明"}
時間粒度です。日付の表示精度を決定します

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title="説明"}
ディメンションをマッピングするチャネルです

\- angle: 複数のディメンションを角度チャネルにマッピングできます

\- color: 複数のディメンションを色チャネルにマッピングできます

\- detail: 複数のディメンションを詳細チャネルにマッピングできます

\- tooltip: 複数のディメンションをツールチップチャネルにマッピングできます

\- label: 複数のディメンションをラベルチャネルにマッピングできます

\- row: 複数のディメンションを行チャネルにマッピングできます

\- column: 複数のディメンションを列チャネルにマッピングできます

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title="説明"}
メジャー



ローズチャートのメジャーは自動的に 1 つのメジャーに結合され、半径軸にマッピングされます。複数メジャーが存在する場合、メジャー名はその他のディメンションと結合され、凡例項目として表示されます。

:::

**例**
```ts
[{id: 'value', alias: '数値'}]




```
### id

**Type:** `string`

:::note{title="説明"}
メジャー id です。重複できません

:::

### alias

**Type:** `string | undefined`

:::note{title="説明"}
メジャーのエイリアスです。重複を許可します。未入力の場合、alias は id になります

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="説明"}
数値の自動フォーマットです。デフォルトで有効で、最も高い優先度を持ちます

autoFormat=true の場合、numFormat のすべての設定を上書きします

有効にすると、チャートのデータラベルとツールチップは、メジャー値と言語環境に基づいて適切なフォーマット方法を自動的に選択します

フォーマット規則: 10 進数値、compact notation を有効化、小数部は最小 0 桁・最大 2 桁、自動丸め。ブラウザーが提供する Intl.NumberFormat で実装します

例:

\- locale が zh\-CN: 749740.264 → 74.45万

\- locale が en\-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="説明"}
カスタムメジャーの数値フォーマットです。label、tooltip に自動的に適用されます

注意: カスタムフォーマットを使用するには autoFormat=false を明示的に設定する必要があります。そうしないと autoFormat がこの設定を上書きします

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="説明"}
数値フォーマットのタイプです。数値（10 進数）、パーセント（%）、パーミル（‰）、科学表記に対応します

:::

#### ratio

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの比率です。0 にはできません

:::

**例**
```ts
\- 100000 を 10万, ratio:10000, symbol:"万"
\- 100000 を 10K, ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの記号です。例: %、‰

:::

**例**
```ts
\- 100000 を 10万, ratio:10000, symbol:"万"
\- 100000 を 10K, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="説明"}
数値フォーマットの桁区切り記号です

:::

#### suffix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットのサフィックスです

:::

#### prefix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットのプレフィックスです

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの小数桁数です, ブラウザーが提供する Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用してフォーマットします, 優先度は significantDigits より低くなります

:::

**例**
```ts
\- 1234.5678 を 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 を 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 を 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 を 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 を 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 を 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの有効桁数です, ブラウザーが提供する Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用してフォーマットします, 優先度は fractionDigits より高くなります

:::

**例**
```ts
\- 1234.5678 を 1000, significantDigits:1
\- 1234.5678 を 1200, significantDigits:2
\- 1234.5678 を 1230, significantDigits:3
\- 1234.5678 を 1234, significantDigits:4
\- 1234.5678 を 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 を 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 を 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 を 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="説明"}
数値フォーマットの丸め優先度です, significantDigits と fractionDigits が同時に設定された場合の丸め優先度を処理します, ブラウザーが提供する Intl.NumberFormat を使用してフォーマットします, 規則は Intl.NumberFormat の roundingPriority と同じです

:::

**例**
```ts
\- 1234.5678 を 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 を 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="説明"}
数値フォーマットの丸めモードです, ブラウザーが提供する Intl.NumberFormat を使用してフォーマットします, 規則は Intl.NumberFormat の roundingMode と同じです

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="説明"}
数値フォーマットのタイプです。数値（10 進数）、パーセント（%）、パーミル（‰）、科学表記に対応します

:::

#### ratio

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの比率です。0 にはできません

:::

**例**
```ts
\- 100000 を 10万, ratio:10000, symbol:"万"
\- 100000 を 10K, ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの記号です。例: %、‰

:::

**例**
```ts
\- 100000 を 10万, ratio:10000, symbol:"万"
\- 100000 を 10K, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="説明"}
数値フォーマットの桁区切り記号です

:::

#### suffix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットのサフィックスです

:::

#### prefix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットのプレフィックスです

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの小数桁数です, ブラウザーが提供する Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用してフォーマットします, 優先度は significantDigits より低くなります

:::

**例**
```ts
\- 1234.5678 を 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 を 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 を 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 を 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 を 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 を 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの有効桁数です, ブラウザーが提供する Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用してフォーマットします, 優先度は fractionDigits より高くなります

:::

**例**
```ts
\- 1234.5678 を 1000, significantDigits:1
\- 1234.5678 を 1200, significantDigits:2
\- 1234.5678 を 1230, significantDigits:3
\- 1234.5678 を 1234, significantDigits:4
\- 1234.5678 を 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 を 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 を 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 を 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="説明"}
数値フォーマットの丸め優先度です, significantDigits と fractionDigits が同時に設定された場合の丸め優先度を処理します, ブラウザーが提供する Intl.NumberFormat を使用してフォーマットします, 規則は Intl.NumberFormat の roundingPriority と同じです

:::

**例**
```ts
\- 1234.5678 を 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 を 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="説明"}
数値フォーマットの丸めモードです, ブラウザーが提供する Intl.NumberFormat を使用してフォーマットします, 規則は Intl.NumberFormat の roundingMode と同じです

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title="説明"}
メジャーをマッピングするチャネルです

\- radius: メジャーを半径にマッピングします

\- color: メジャーを色にマッピングします

\- label: メジャーをラベルにマッピングします

\- tooltip: メジャーをツールチップにマッピングします

:::

### parentId

**Type:** `string | undefined`

:::note{title="説明"}
フラットなメジャー設定形式でツリー状のメジャーグループを構築します。parentId は親メジャーグループの id を指し、メジャーツリーの構築に使用します

:::

:::tip{title="Tip"}
メジャーツリーの設定には 2 つの形式があります。1 つ目は children を持つメジャーツリーを直接設定する方法、2 つ目は parentId を持つフラットなメジャーリストを設定する方法です。この 2 つは同時に設定できません

:::


## page

**Type:** `Page | undefined`

:::note{title="説明"}
ページネーション設定です。ページネーションに使用するフィールド名を指定します。ディメンションである必要があります

:::


### field

**Type:** `string`

:::note{title="説明"}
ページネーションフィールドです。ページネーションに使用するフィールド名を指定します。ディメンションである必要があります

:::

### currentValue

**Type:** `string`

:::note{title="説明"}
現在のページネーション値です。現在のページネーションの基準値を指定します

:::

**例**
```ts
'2023\-01\-01'




```
## backgroundColor

**Type:** `BackgroundColor`

:::note{title="説明"}
チャートの背景色



背景色には色文字列を指定できます。例: 'red'、'blue'。hex、rgb、rgba（'#ff0000'、'rgba(255,0,0,0.5)' など）も指定できます

:::


## color

**Type:** `Color | undefined`

:::note{title="説明"}
色



色設定です。色リスト、色マッピング、色グラデーションなど、チャートのカラースキームを定義するために使用します。

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title="説明"}
離散色のカラースキーム, カラースキームはチャート内の異なる要素の色を定義するために使用します

:::

**例**
```ts
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



```
### linearColorScheme

**Type:** `string[] | undefined`

:::note{title="説明"}
線形グラデーションのカラースキームです。チャート内の異なる要素の色を定義するために使用します

:::

**例**
```ts
['#FFCDD2, #F8BBD0]



```
### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title="説明"}
色マッピングです。データ値を具体的な色にマッピングするために使用します

:::

**例**
```ts
{
 'profit': 'red',
 'sales': 'blue',
}



```
### positiveColor

**Type:** `string | undefined`

:::note{title="説明"}
正負色設定です。チャート内の正の値の色を定義するために使用します

:::

### negativeColor

**Type:** `string | undefined`

:::note{title="説明"}
正負色設定です。チャート内の負の値の色を定義するために使用します

:::


## label

**Type:** `PieLabel | undefined`

:::note{title="説明"}
ラベル



ラベル設定です。データラベルの位置、フォーマット、スタイルなど、チャートのデータラベルを定義するために使用します。

:::


### enable

**Type:** `false | true`

:::note{title="説明"}
ラベル機能を有効にするかどうか

:::

### wrap

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルを折り返すかどうか

:::

### showValue

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルにメジャー値を表示するかどうか

複数メジャーのシーンでも、複数メジャーの値が矛盾する心配はありません。描画に関係するすべてのメジャーは `foldMeasures` で処理され、1 つのメジャーに結合されて 1 つのデータ点を表すため、矛盾は発生しません

注意: encoding の label のほうが優先度が高く、この設定は encoding の label には影響しません

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルにメジャー値のパーセンテージを表示するかどうか

複数メジャーのシーンでも、複数メジャーの値が矛盾する心配はありません。描画に関係するすべてのメジャーは `foldMeasures` で処理され、1 つのメジャーに結合されて 1 つのデータ点を表すため、矛盾は発生しません

注意: encoding の label のほうが優先度が高く、この設定は encoding の label には影響しません

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルにディメンションラベルを表示するかどうか

すべてのディメンションラベルを表示します

注意: encoding の label のほうが優先度が高く、この設定は encoding の label には影響しません

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベル数値を自動フォーマットするかどうか。autoFormat が true の場合、numFormat 設定は無効になります

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="説明"}
ラベル数値のフォーマット設定です。`measure` 内の `format` とマージされ、`measure` 内の `format` のほうが優先度が高くなります。numFormat の優先度は autoFormat より低くなります

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="説明"}
数値フォーマットのタイプです。数値（10 進数）、パーセント（%）、パーミル（‰）、科学表記に対応します

:::

#### ratio

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの比率です。0 にはできません

:::

**例**
```ts
\- 100000 を 10万, ratio:10000, symbol:"万"
\- 100000 を 10K, ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの記号です。例: %、‰

:::

**例**
```ts
\- 100000 を 10万, ratio:10000, symbol:"万"
\- 100000 を 10K, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="説明"}
数値フォーマットの桁区切り記号です

:::

#### suffix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットのサフィックスです

:::

#### prefix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットのプレフィックスです

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの小数桁数です, ブラウザーが提供する Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用してフォーマットします, 優先度は significantDigits より低くなります

:::

**例**
```ts
\- 1234.5678 を 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 を 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 を 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 を 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 を 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 を 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの有効桁数です, ブラウザーが提供する Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用してフォーマットします, 優先度は fractionDigits より高くなります

:::

**例**
```ts
\- 1234.5678 を 1000, significantDigits:1
\- 1234.5678 を 1200, significantDigits:2
\- 1234.5678 を 1230, significantDigits:3
\- 1234.5678 を 1234, significantDigits:4
\- 1234.5678 を 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 を 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 を 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 を 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="説明"}
数値フォーマットの丸め優先度です, significantDigits と fractionDigits が同時に設定された場合の丸め優先度を処理します, ブラウザーが提供する Intl.NumberFormat を使用してフォーマットします, 規則は Intl.NumberFormat の roundingPriority と同じです

:::

**例**
```ts
\- 1234.5678 を 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 を 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="説明"}
数値フォーマットの丸めモードです, ブラウザーが提供する Intl.NumberFormat を使用してフォーマットします, 規則は Intl.NumberFormat の roundingMode と同じです

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title="説明"}
ラベルのフォントサイズ

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="説明"}
ラベルのフォントウェイト

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
ラベルの背景色

:::

### labelStroke

**Type:** `string | undefined`

:::note{title="説明"}
ラベルのストローク色

:::

### labelColor

**Type:** `string | undefined`

:::note{title="説明"}
ラベルのフォント色

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルのフォント色をマーク色に応じて自動反転するかどうか

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title="説明"}
ラベル位置

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルの重なり回避機能を有効にするかどうか

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="説明"}
ラベルフィルター，デフォルトでは selectors 間の条件関係は Or です

:::


#### field

**Type:** `string`

:::note{title="説明"}
ディメンションフィールド, dimensions のいずれかの項目の id

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目内のディメンションフィールドの値を選択します。配列に対応します

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（AI 生成コード実行）



AI が生成した JavaScript コードによって複雑なデータフィルタリングロジックを実現します



主な機能:

\- 任意の複雑なデータフィルタリング条件に対応します

\- 組み込みユーティリティ関数を使用してデータ操作を行います

\- ブラウザー環境で安全に実行します（Web Worker サンドボックス）



環境要件: ブラウザー環境のみ対応します，Node.js 環境では fallback を使用します



注意: selector 和 dynamicFilter 同時に使用できません，dynamicFilter 優先度が高くなります



チャート動的フィルター設定



AI が生成した JavaScript コードによってチャートマーク（棒、点など）のフィルタリングを実現します

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="説明"}
ユーザーのフィルタリング要件の説明（自然言語）

:::

**例**
```ts
"売上高が 1000 を超える棒をハイライトする"

"各地域で利益率が最も高い棒をハイライトする"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルタリングコード



\- 組み込みユーティリティ関数のみ使用できます（_ または R からアクセスします）

\- 入力引数: data (配列)，各 item は行番号を表す __row_index フィールドを含みます

\- 行インデックスとフィールドの組み合わせの配列を返す必要があります: ``Array<{ __row_index: number, field: string }>``

\- __row_index 元データ項目の行番号を表します，field はハイライトする必要があるフィールドを表します

\- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

:::

**例**
```ts
売上高が 1000 を超えるデータ項目の sales フィールドをハイライトする
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目をハイライトする
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

複数条件でフィルタリングしたデータ項目をハイライトする
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

:::note{title="説明"}
コード実行に失敗した場合、または環境が対応しない場合のフォールバック案

:::


##### field

**Type:** `string`

:::note{title="説明"}
ディメンションフィールド, dimensions のいずれかの項目の id

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目内のディメンションフィールドの値を選択します。配列に対応します

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="説明"}
動的フィルターの実行結果（実行時フィールド）



`prepare() 段階で書き込まれ，実行時は読み取り専用です`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title="説明"}
ラベルレイアウト方式です。円グラフ、ドーナツチャート、ローズチャートでのみ有効で、`labelPosition` が `outside` の場合に有効です

\- arc: 弧に沿ってラベルをレイアウトします

\- labelLine: ラベルの両端を揃えます, ガイド線で扇形マークとラベルを接続します

\- edge: ラベルの両端を揃えます, ガイド線で扇形マークとラベルを接続します, さらにチャート両端の端に近づけます

:::


## legend

**Type:** `Legend | undefined`

:::note{title="説明"}
凡例



凡例設定です。凡例の位置、フォーマット、スタイルなど、チャートの凡例を定義するために使用します。

:::


### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
凡例機能を有効にするかどうか

:::

**例**
```ts
enable: true



```
### border

**Type:** `boolean | undefined`

:::note{title="説明"}
凡例の枠線を有効にするかどうか

:::

:::warning{title="Warning"}
離散凡例でのみ有効です

:::

**例**
```ts
border: true



```
### labelColor

**Type:** `string | undefined`

:::note{title="説明"}
凡例のフォント色

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title="説明"}
ページャー icon の色

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title="説明"}
ページャー icon の無効色

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title="説明"}
凡例のフォントサイズ

:::

**例**
```ts
labelFontSize: 10



```
### labelFontColor

**Type:** `string | undefined`

:::note{title="説明"}
凡例のフォント色

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="説明"}
凡例のフォントウェイト

:::

**例**
```ts
labelFontWeight: 400



```
### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title="説明"}
凡例形状

:::

:::warning{title="Warning"}
離散凡例でのみ有効です

:::

**例**
```ts
shapeType: 'circle'



```
### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title="説明"}
凡例位置

:::

**例**
```ts
position: 'rightTop'



```
### maxSize

**Type:** `number | undefined`

:::note{title="説明"}
凡例が大量に存在する場合, 最大列数または凡例の最大行数

position が水平方向の場合(bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize表示する列数を制御します

position が垂直方向の場合(left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize表示する行数を制御します

:::

:::warning{title="Warning"}
離散凡例でのみ有効です

:::

**例**
```ts
maxSize: 2




```
## tooltip

**Type:** `Tooltip | undefined`

:::note{title="説明"}
ツールチップ



ツールチップ設定です。ツールチップの位置、フォーマット、スタイルなど、チャートのツールチップを定義するために使用します。

:::


### enable

**Type:** `false | true`

:::note{title="説明"}
ツールチップ機能を有効にするかどうか

:::


## brush

**Type:** `Brush | undefined`

:::note{title="説明"}
ブラシ選択



ブラシ選択設定です。brush 範囲選択機能の有効/無効を切り替えるために使用します



チャートのブラシ選択設定

:::


### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
brush 範囲選択を有効にするかどうか

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title="説明"}
brush のタイプ



ブラシ選択枠の形状と選択方向を定義します

\- `rect`: 矩形範囲選択，X 軸と Y 軸の両方向で同時に範囲選択できます

\- `polygon`: 多角形範囲選択，複数点をクリックして任意の多角形を描画し、範囲選択します

\- `x`: X 軸方向の範囲選択，X 軸方向のみで範囲選択します，Y 軸方向は制限しません

\- `y`: Y 軸方向の範囲選択，Y 軸方向のみで範囲選択します，X 軸方向は制限しません

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title="説明"}
範囲選択モード，単一選択か複数選択か



ブラシ選択のモードを定義します

\- `single`: 単一選択モード，一度に 1 つのブラシ選択枠のみ使用できます

\- `multiple`: 複数選択モード，複数のブラシ選択枠を同時に存在させることができます

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title="説明"}
範囲選択終了時に選択枠をクリアするかどうか

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="説明"}
範囲選択されたデータのスタイル



ブラシ選択されたデータ点のスタイルを定義します

:::


#### opacity

**Type:** `number | undefined`

:::note{title="説明"}
不透明度



範囲選択されたデータ点の不透明度，値の範囲 0\-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title="説明"}
ストローク色

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="説明"}
ストローク幅

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="説明"}
範囲選択されていないデータのスタイル



ブラシ選択されていないデータ点のスタイルを定義します

:::


#### opacity

**Type:** `number | undefined`

:::note{title="説明"}
不透明度



範囲選択されていないデータ点の不透明度，値の範囲 0\-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title="説明"}
ストローク色

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="説明"}
ストローク幅

:::


## animation

**Type:** `PieLikeAnimation | undefined`

:::note{title="説明"}
アニメーション設定



チャートアニメーション設定です。選択可能な効果はチャートタイプによって制約されます

:::


### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
円グラフ/ドーナツチャート/ローズチャートのアニメーションを有効にするかどうか

:::

### params

**Type:** `PieLikeAnimationParams | undefined`

:::note{title="説明"}
円グラフ/ドーナツチャート/ローズチャートのアニメーションパラメータ

:::


#### appear

**Type:** `PieLikeAppearAnimation | undefined`

:::note{title="説明"}
円グラフ/ドーナツチャート/ローズチャートの入場アニメーション設定

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title="説明"}
円グラフ/ドーナツチャート/ローズチャートの入場効果です。放射状アニメーションとズームアニメーションに対応します

:::

##### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
現在のアニメーション段階を有効にするかどうか

:::

##### ease

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションのイージング関数

:::

##### duration

**Type:** `number | undefined`

:::note{title="説明"}
アニメーション時間，単位はミリ秒です

:::

##### color

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションのハイライトまたは雰囲気色

:::

#### update

**Type:** `PieLikeUpdateAnimation | undefined`

:::note{title="説明"}
円グラフ/ドーナツチャート/ローズチャートの更新アニメーション設定

:::


##### effects

**Type:** `"radial"[] | undefined`

:::note{title="説明"}
円グラフ/ドーナツチャート/ローズチャートの更新効果です。放射状アニメーションに対応します

:::

##### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
現在のアニメーション段階を有効にするかどうか

:::

##### ease

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションのイージング関数

:::

##### duration

**Type:** `number | undefined`

:::note{title="説明"}
アニメーション時間，単位はミリ秒です

:::

##### color

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションのハイライトまたは雰囲気色

:::

#### loop

**Type:** `PieLikeAnimationLoop | undefined`

:::note{title="説明"}
円グラフ/ドーナツチャート/ローズチャートのループアニメーション設定

:::


##### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
ループアニメーションを有効にするかどうか

:::

##### interval

**Type:** `number | undefined`

:::note{title="説明"}
ループアニメーション間隔，単位はミリ秒です

:::

##### loop

**Type:** `PieLikeLoopAnimation | undefined`

:::note{title="説明"}
円グラフ/ドーナツチャート/ローズチャートのループアニメーション設定

:::


###### effects

**Type:** `PieLikeLoopEffect[] | undefined`

:::note{title="説明"}
円グラフ/ドーナツチャート/ローズチャートのループ効果

:::

###### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
現在のアニメーション段階を有効にするかどうか

:::

###### ease

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションのイージング関数

:::

###### duration

**Type:** `number | undefined`

:::note{title="説明"}
アニメーション時間，単位はミリ秒です

:::

###### color

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションのハイライトまたは雰囲気色

:::

##### atmosphere

**Type:** `NoEffectAtmosphereConfig | undefined`

:::note{title="説明"}
円グラフ/ドーナツチャート/ローズチャートの雰囲気アニメーション設定

:::


###### ease

**Type:** `string | undefined`

:::note{title="説明"}
雰囲気アニメーションのイージング関数

:::

###### color

**Type:** `string | undefined`

:::note{title="説明"}
雰囲気アニメーション色

:::


## theme

**Type:** `Theme | undefined`

:::note{title="説明"}
チャートのテーマ, テーマは優先度の低い機能設定です, すべてのチャートタイプで共有される汎用設定を含みます, 単一チャートタイプで共有されるチャート設定も含みます



light と dark の 2 つのテーマを内蔵しています, ユーザーは Builder でテーマをカスタム定義できます



テーマ



light、dark の 2 つのテーマを内蔵しています, 新しいテーマは registerTheme でカスタム定義できます.

:::

**例**
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

:::note{title="説明"}
言語



チャートの言語設定, 'zh\-CN' と 'en\-US' の 2 言語に対応します, また、intl.setLocale('zh\-CN') メソッドを呼び出して言語を設定できます

:::

