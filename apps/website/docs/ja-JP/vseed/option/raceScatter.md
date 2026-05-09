# RaceScatter

:::note{title="説明"}
動的散布図 (Race Scatter Chart)

データが時間とともに変化する分布状況を表示するのに適しており、データ点の位置で 2 つのメジャー値を表します

適用シーン:

\- 2 次元空間におけるデータの分布特性を分析し、時間に伴う動的な変化を表示する

\- 複数変数間の相関が時間とともに変化する様子を表示する

\- 2 次元空間におけるデータ点の移動軌跡を観察する

:::

:::note{title="Note"}
動的散布図:

\- X 軸と Y 軸はいずれも数値軸（連続データ）で、複数メジャーのマッピングに対応します

\- プレイヤーで時間ディメンションを制御し、データの変化を動的に表示できます

\- データ点の位置変化により、データの動的な変化を直感的に表示します

:::


## chartType

**Type:** `"raceScatter"`

:::note{title="説明"}
動的散布図です。データが時間とともに変化する分布状況の表示に適しています。

:::


## dataset

**Type:** `Record[]`

:::note{title="説明"}
データソースです。TidyData 仕様に準拠したデータセットです。

:::


## dimensions

**Type:** `RaceScatterDimension[] | undefined`

:::note{title="説明"}
ディメンションです。異なるデータ系列の区別と凡例表示に使用します。

:::


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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title="説明"}
動的散布図系チャートでディメンションをマッピングするチャネルです。

\- color: 複数のディメンションを色チャネルにマッピングできます

\- detail: 複数のディメンションを詳細チャネルにマッピングできます

\- tooltip: 複数のディメンションをツールチップチャネルにマッピングできます

\- label: 複数のディメンションをラベルチャネルにマッピングできます

\- row: 複数のディメンションを行チャネルにマッピングできます

\- column: 複数のディメンションを列チャネルにマッピングできます

\- player: 複数のディメンションをプレイヤーチャネルにマッピングできます

:::


## measures

**Type:** `ScatterMeasure[] | undefined`

:::note{title="説明"}
メジャーです。少なくとも 2 個のメジャーを、それぞれ X 軸と Y 軸にマッピングする必要があります。

:::


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

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title="説明"}
メジャーをマッピングするチャネルです

\- xAxis: メジャーを x 軸にマッピングします

\- yAxis: メジャーを y 軸にマッピングします

\- size: メジャーをサイズにマッピングします

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


## player

**Type:** `Player | undefined`

:::note{title="説明"}
プレイヤー設定です。時間ディメンションを指定するために使用し、動的散布図の中核となる設定です。

プレイヤーで時間ディメンションの再生進捗を制御し、データを動的に更新します。



プレイヤー設定, 再生に使用するフィールド名を指定するために使用します, ディメンションである必要があります

:::

:::warning{title="Warning"}
この機能は table, pivotTable, dualAxis, histogram, boxPlot などのチャートタイプをサポートしません, メジャー結合や行列ピボットが有効な状態では使用できません

:::


### maxCount

**Type:** `number | false | undefined`

:::note{title="説明"}
最大再生数です。この数を超えるデータは切り捨てられます。false に設定すると制限なしを表します

:::

### interval

**Type:** `number | undefined`

:::note{title="説明"}
再生間隔です。単位は ms です

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title="説明"}
自動再生するかどうか

:::

### loop

**Type:** `boolean | undefined`

:::note{title="説明"}
ループ再生するかどうか

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title="説明"}
プレイヤー位置

:::

### railColor

**Type:** `string | undefined`

:::note{title="説明"}
プレイヤーの進捗バーのトラック色

:::

### fontFamily

**Type:** `string | undefined`

:::note{title="説明"}
プレイヤーテキストのフォント

:::

### fontSize

**Type:** `number | undefined`

:::note{title="説明"}
プレイヤーテキストのフォントサイズ

:::

### trackColor

**Type:** `string | undefined`

:::note{title="説明"}
プレイヤーの進捗バーの進捗色

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note{title="説明"}
プレイヤーの進捗バーのスライダー色

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
プレイヤーの進捗バーのスライダー枠線色

:::

### startButtonColor

**Type:** `string | undefined`

:::note{title="説明"}
プレイヤーの開始ボタン色

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note{title="説明"}
プレイヤーの一時停止ボタン色

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note{title="説明"}
プレイヤーの戻るボタン色

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note{title="説明"}
プレイヤーの進むボタン色

:::


## sort

**Type:** `Sort | undefined`

:::note{title="説明"}
ソート設定です。ディメンション値の並び順を制御するために使用します。



カテゴリ軸のソート設定です。ディメンションまたはメジャーに基づくソート、およびカスタムの並び順に対応します。

:::

**例**
```ts
\- order:'asc'
\- orderBy:'date'
または
\- customOrder:['2019', '2020', '2021']




```
### order

**Type:** `"asc" | "desc" | undefined`

:::note{title="説明"}
ソート順です。指定できる値は 'asc' または 'desc' です。

:::

**例**
```ts
order:'asc'



```
### orderBy

**Type:** `string | undefined`

:::note{title="説明"}
ソートが依存するフィールドです。ディメンション id またはメジャー id を指定できます。

:::

**例**
```ts
\- orderBy:'date'
\- orderBy:'profit'



```
### customOrder

**Type:** `string[] | undefined`

:::note{title="説明"}
カスタムの並び順です。この順序がカテゴリ軸に直接適用されます。

:::


## page

**Type:** `Page | undefined`

:::note{title="説明"}
ページネーション設定です。データ量が多いシーンを処理するために使用します。

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
背景色設定

:::


## size

**Type:** `number | number[] | undefined`

:::note{title="説明"}
散布図メジャーのサイズです。散布図内のデータ点のサイズまたはサイズ範囲を定義します。

\- サイズ範囲が 10 のような数値の場合、データ点のサイズ範囲は 10 に固定されます

\- サイズ範囲が [10, 40] のような長さ 2 の配列の場合、データ点のサイズ範囲は 10 から 40 までになります

\- sizeRange とは相互排他で、優先度は size より低くなります

:::


## sizeRange

**Type:** `number | number[] | undefined`

:::note{title="説明"}
散布図メジャーのサイズ範囲です。散布図内のデータ点のサイズ範囲を定義します。

\- サイズ範囲が [10, 40] のような長さ 2 の配列の場合、データ点のサイズ範囲は 10 から 40 までになります

\- サイズ範囲が 10 のような数値の場合、データ点のサイズ範囲は 10 に固定されます

\- sizeRange とは相互排他で、優先度は size より高くなります

:::


## color

**Type:** `Color | undefined`

:::note{title="説明"}
色設定です。異なるディメンションまたはメジャーを区別するために使用します。

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

**Type:** `Label | undefined`

:::note{title="説明"}
ラベル設定です。データ点上にデータラベルを表示するために使用します。

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


## legend

**Type:** `Legend | undefined`

:::note{title="説明"}
凡例設定

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
ツールチップ設定です。マウスホバー時に詳細情報を表示するために使用します。

:::


### enable

**Type:** `false | true`

:::note{title="説明"}
ツールチップ機能を有効にするかどうか

:::


## brush

**Type:** `Brush | undefined`

:::note{title="説明"}
ブラシ選択設定です。範囲選択インタラクションをサポートするために使用します。



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


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title="説明"}
X 軸設定です。数値軸として最初のメジャー値を表示します。

:::


### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
軸を表示するかどうか

:::

### min

**Type:** `number | undefined`

:::note{title="説明"}
軸の最小値, 優先度は nice と zero より高くなります

:::

### max

**Type:** `number | boolean | undefined`

:::note{title="説明"}
軸の最大値, 優先度は nice と zero より高くなります, true の場合, データ範囲に基づいて最大値を自動計算します

:::

### log

**Type:** `boolean | undefined`

:::note{title="説明"}
対数軸を使用するかどうか, 数値軸でのみ有効です

:::

### logBase

**Type:** `number | undefined`

:::note{title="説明"}
対数軸の底, 数値軸でのみ有効です

:::

### nice

**Type:** `boolean | undefined`

:::note{title="説明"}
目盛りラベルを読みやすくするために軸の目盛り間隔を自動調整するかどうか, min と max が設定されている場合, この設定項目は無効になります, 数値軸でのみ有効です

:::

### inverse

**Type:** `boolean | undefined`

:::note{title="説明"}
軸を反転表示するかどうか, 数値軸でのみ有効です

:::

### zero

**Type:** `boolean | undefined`

:::note{title="説明"}
座標軸上に 0 値を強制表示するかどうか, min と max が設定されている場合, この設定項目は無効になります, 数値軸でのみ有効です

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="説明"}
数値軸の目盛りラベルを自動フォーマットするかどうか。数値軸でのみ有効です。autoFormat が true の場合、numFormat 設定は無効になります

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="説明"}
数値軸の数値フォーマット, 数値軸でのみ有効です, 優先度は autoFormat より低くなります

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

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="説明"}
X 軸目盛りラベル

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルを表示するかどうか

:::

#### labelColor

**Type:** `string | undefined`

:::note{title="説明"}
ラベル色

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title="説明"}
ラベルのフォントサイズ

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title="説明"}
ラベルのフォントウェイト

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title="説明"}
ラベルの回転角度

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="説明"}
X 軸線

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
軸線を表示するかどうか

:::

#### lineColor

**Type:** `string | undefined`

:::note{title="説明"}
軸線色

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="説明"}
軸線幅

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="説明"}
X 軸刻度

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
目盛りを表示するかどうか

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title="説明"}
目盛りを内向きにするかどうか

:::

#### tickColor

**Type:** `string | undefined`

:::note{title="説明"}
目盛り色

:::

#### tickSize

**Type:** `number | undefined`

:::note{title="説明"}
目盛りサイズ

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="説明"}
X 軸タイトル

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
タイトルを表示するかどうか

:::

#### titleText

**Type:** `string | undefined`

:::note{title="説明"}
タイトルテキスト, デフォルトではフィールド設定に従います

:::

#### titleColor

**Type:** `string | undefined`

:::note{title="説明"}
タイトル色

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title="説明"}
タイトルのフォントサイズ

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title="説明"}
タイトルのフォントウェイト

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="説明"}
X 軸グリッド線

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title="説明"}
グリッド線色

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title="説明"}
グリッド線幅

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title="説明"}
グリッド線タイプ

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="説明"}
Y 軸アニメーション設定

:::


#### duration

**Type:** `number | undefined`

:::note{title="説明"}
アニメーション時間

:::

#### easing

**Type:** `string | undefined`

:::note{title="説明"}
アニメーション easing 関数

:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title="説明"}
Y 軸設定です。数値軸として 2 番目のメジャー値を表示します。

:::


### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
軸を表示するかどうか

:::

### min

**Type:** `number | undefined`

:::note{title="説明"}
軸の最小値, 優先度は nice と zero より高くなります

:::

### max

**Type:** `number | boolean | undefined`

:::note{title="説明"}
軸の最大値, 優先度は nice と zero より高くなります, true の場合, データ範囲に基づいて最大値を自動計算します

:::

### log

**Type:** `boolean | undefined`

:::note{title="説明"}
対数軸を使用するかどうか, 数値軸でのみ有効です

:::

### logBase

**Type:** `number | undefined`

:::note{title="説明"}
対数軸の底, 数値軸でのみ有効です

:::

### nice

**Type:** `boolean | undefined`

:::note{title="説明"}
目盛りラベルを読みやすくするために軸の目盛り間隔を自動調整するかどうか, min と max が設定されている場合, この設定項目は無効になります, 数値軸でのみ有効です

:::

### inverse

**Type:** `boolean | undefined`

:::note{title="説明"}
軸を反転表示するかどうか, 数値軸でのみ有効です

:::

### zero

**Type:** `boolean | undefined`

:::note{title="説明"}
座標軸上に 0 値を強制表示するかどうか, min と max が設定されている場合, この設定項目は無効になります, 数値軸でのみ有効です

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="説明"}
数値軸の目盛りラベルを自動フォーマットするかどうか。数値軸でのみ有効です。autoFormat が true の場合、numFormat 設定は無効になります

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="説明"}
数値軸の数値フォーマット, 数値軸でのみ有効です, 優先度は autoFormat より低くなります

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

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="説明"}
X 軸目盛りラベル

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルを表示するかどうか

:::

#### labelColor

**Type:** `string | undefined`

:::note{title="説明"}
ラベル色

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title="説明"}
ラベルのフォントサイズ

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title="説明"}
ラベルのフォントウェイト

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title="説明"}
ラベルの回転角度

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="説明"}
X 軸線

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
軸線を表示するかどうか

:::

#### lineColor

**Type:** `string | undefined`

:::note{title="説明"}
軸線色

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="説明"}
軸線幅

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="説明"}
X 軸刻度

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
目盛りを表示するかどうか

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title="説明"}
目盛りを内向きにするかどうか

:::

#### tickColor

**Type:** `string | undefined`

:::note{title="説明"}
目盛り色

:::

#### tickSize

**Type:** `number | undefined`

:::note{title="説明"}
目盛りサイズ

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="説明"}
X 軸タイトル

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
タイトルを表示するかどうか

:::

#### titleText

**Type:** `string | undefined`

:::note{title="説明"}
タイトルテキスト, デフォルトではフィールド設定に従います

:::

#### titleColor

**Type:** `string | undefined`

:::note{title="説明"}
タイトル色

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title="説明"}
タイトルのフォントサイズ

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title="説明"}
タイトルのフォントウェイト

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="説明"}
X 軸グリッド線

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title="説明"}
グリッド線色

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title="説明"}
グリッド線幅

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title="説明"}
グリッド線タイプ

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="説明"}
Y 軸アニメーション設定

:::


#### duration

**Type:** `number | undefined`

:::note{title="説明"}
アニメーション時間

:::

#### easing

**Type:** `string | undefined`

:::note{title="説明"}
アニメーション easing 関数

:::


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title="説明"}
クロスヘア設定です。データの正確な位置を表示するために使用します



クロスヘアライン設定，チャート内にクロスヘアライン（ガイド線）を表示するための設定タイプです

:::


### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
クロスヘアラインを表示するかどうか

:::

### lineColor

**Type:** `string | undefined`

:::note{title="説明"}
クロスヘアライン色

:::

### labelColor

**Type:** `string | undefined`

:::note{title="説明"}
クロスヘアラインラベル色

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
クロスヘアラインラベルを表示するかどうか

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
クロスヘアラインラベルの背景色

:::


## theme

**Type:** `Theme | undefined`

:::note{title="説明"}
テーマ設定



テーマ



light、dark の 2 つのテーマを内蔵しています, 新しいテーマは registerTheme でカスタム定義できます.

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title="説明"}
データ点スタイル設定，単一スタイルまたは配列形式を指定できます，グローバルスタイルまたは条件付きスタイル設定に対応します

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="説明"}
データセレクター



selector を設定した場合, 数値 selector, ローカルデータ selector, 条件ディメンション selector, 条件メジャー selector の 4 種類のデータマッチング機能を提供します

selector を設定していない場合, スタイルはグローバルに有効になります.

:::

**例**
```ts
数値セレクター
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

ローカルデータセレクター
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

条件ディメンションセレクター
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

条件メジャーセレクター
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

Top N、統計分析、複雑な条件など、静的 selector では表現しにくいシーンに適しています



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

### pointVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
点を表示するかどうか

:::

### pointSize

**Type:** `number | undefined`

:::note{title="説明"}
点のサイズ



点のサイズ

:::

### pointColor

**Type:** `string | undefined`

:::note{title="説明"}
点マーク色



点マーク色

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title="説明"}
点マーク色の透明度



点マーク色の透明度

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
点マークの枠線色



点マークの枠線色

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
点マークの枠線幅



点マークの枠線幅

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="説明"}
点マークの枠線スタイル



点マークの枠線スタイル

:::

**例**
```ts
solid

dashed

dotted




```
## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title="説明"}
注釈点設定，特定のデータ点にマークを追加するために使用します

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="説明"}
注釈点のセレクター, データ点を選択するために使用します.

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

### measureId

**Type:** `string | undefined`

:::note{title="説明"}
注釈点が属するメジャー id を指定します。複数 measure のシーンでは selector と組み合わせて、対象メジャーに対応する注釈点を一意に特定できます。

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（AI 生成コード実行）



AI が生成した JavaScript コードによって複雑なデータフィルタリングロジックを実現します

Top N、統計分析、複雑な条件など、静的 selector では表現しにくいシーンに適しています



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

### text

**Type:** `string | string[] | undefined`

:::note{title="説明"}
注釈テキスト

:::

**例**
```ts
'注釈テキスト'



```
### textColor

**Type:** `string | undefined`

:::note{title="説明"}
テキスト色

:::

**例**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントサイズ

:::

**例**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントウェイト

:::

**例**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="説明"}
テキストの水平揃え, 通常, right に設定します, テキストは注釈点の左側に表示されます, チャートの表示領域内に表示されるようにします

次の値に設定することを推奨します: 'right', これによりテキストを注釈点の左側に配置できます

right: テキストは注釈点の左側にあります, テキストの右端を揃えます注釈点

left: テキストは注釈点の右側にあります, テキストの左端を揃えます注釈点

center: テキストは注釈点の中心にあります, テキストの中心を揃えます注釈点

:::

**例**
```ts
'right' テキストは注釈点の左側にあります



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="説明"}
テキストの垂直揃え, 通常, top に設定します, テキストは注釈点の下側に表示されます, チャートの表示領域内に表示されるようにします

次の値に設定することを推奨します: 'top', これによりテキスト全体をチャートの表示領域内に表示できます

top: テキストは注釈点の下側にあります, テキストの上端を揃えます注釈点

middle: テキストは注釈点の中心にあります, テキストの中心を揃えます注釈点

bottom: テキストは注釈点の上側にあります, テキストの下端を揃えます注釈点

:::

**例**
```ts
'top' テキストは注釈点の下側にあります



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
背景を表示するかどうか

:::

**例**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
背景色

:::

**例**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
背景の枠線色

:::

**例**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
背景の枠線幅

:::

**例**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="説明"}
背景の角丸

:::

**例**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="説明"}
背景のパディング

:::

**例**
```ts
4



```
### offsetY

**Type:** `number | undefined`

:::note{title="説明"}
注釈点全体の Y 方向のピクセルオフセット距離です。注釈点がチャート上部（値が大きい場合）にある場合は正の値、チャート下部（値が小さい場合）にある場合は負の値に設定することを推奨します。

負の値では全体が上方向にオフセットされます。たとえば \-10 に設定すると、テキストとテキスト背景を含む注釈点コンポーネント全体が、まとめて上方向に 10 ピクセルオフセットされます

正の値では全体が下方向にオフセットされます。たとえば 10 に設定すると、テキストとテキスト背景を含む注釈点コンポーネント全体が、まとめて下方向に 10 ピクセルオフセットされます

:::

**例**
```ts
offsetY: 5, 注釈点全体を下方向に 5 ピクセルオフセットします



```
### offsetX

**Type:** `number | undefined`

:::note{title="説明"}
注釈点全体の X 方向のピクセルオフセット距離です。注釈点がチャート左側（カテゴリ軸の始点）にある場合は正の値、チャート右側（カテゴリ軸の終点）にある場合は負の値に設定することを推奨します。

負の値では全体が左方向にオフセットされます。たとえば \-10 に設定すると、テキストとテキスト背景を含む注釈点コンポーネント全体が、まとめて左方向に 10 ピクセルオフセットされます

正の値では全体が右方向にオフセットされます。たとえば 10 に設定すると、テキストとテキスト背景を含む注釈点コンポーネント全体が、まとめて右方向に 10 ピクセルオフセットされます

:::

**例**
```ts
offsetX: 5, 注釈点全体を右方向に 5 ピクセルオフセットします




```
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title="説明"}
数値注釈線，縦方向の注釈線，特定のX軸値をマークします

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="説明"}
固定の x 値, 垂直線の注釈に使用します, カテゴリ軸が x 方向の場合, ディメンション値を入力できます, 数値軸が x 方向の場合, 具体的な数値を入力できます

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（AI 生成コード実行）



AI が生成した JavaScript コードで注釈線の値を動的に計算します

平均値、最大値、分位数、業務ラインなど、データに基づいて注釈線の位置を動的に決定する必要がある場合に適しています



ブラウザー環境のみ対応します（Web Worker が必要です）

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="説明"}
ユーザーのフィルタリング要件の説明（自然言語）

:::

**例**
```ts
"売上高が最大の値を注釈線の参照値として取得する"

"平均売上高を計算して注釈線に使用する"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルタリングコード



\- 組み込みユーティリティ関数のみ使用できます（_ または R からアクセスします）

\- 入力引数: data (配列)

\- 単一の数値または文字列を返す必要があります: number | string

\- 適用シーン：注釈線（水平線、垂直線）に必要な動的数値

\- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

:::

**例**
```ts
売上高の最大値を注釈線の値として取得する
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

平均値を計算して注釈線に使用する
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

分位数を注釈線として取得する
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

条件に基づいて目標値を計算する
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

:::note{title="説明"}
コード実行に失敗した場合、または環境が対応しない場合のフォールバック案

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="説明"}
動的フィルターの実行結果（実行時フィールド）



`prepare() 段階で書き込まれ，実行時は読み取り専用です`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title="説明"}
注釈テキスト

:::

**例**
```ts
'注釈テキスト'



```
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="説明"}
テキスト位置です。注釈線のラベル位置（線に対するラベルの相対位置）です。

:::

**例**
```ts
'outsideEnd'



```
### textColor

**Type:** `string | undefined`

:::note{title="説明"}
テキスト色

:::

**例**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントサイズ

:::

**例**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントウェイト

:::

**例**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="説明"}
テキストの水平揃え, 通常, 設定不要です

次の値に設定することを推奨します: 'right', これによりテキストを注釈線の左側に配置できます

right: テキストは基準線の左側にあります, テキストの右端を揃えます(垂直)注釈線

left: テキストは基準線の右側にあります, テキストの左端を揃えます(垂直)注釈線

center: テキストは基準線の中心にあります, テキストの中心を揃えます(垂直)注釈線

:::

**例**
```ts
'right'



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="説明"}
テキストの垂直揃え, 通常, 設定不要です

次の値に設定することを推奨します: 'top', これによりテキスト全体をチャートの表示領域内に表示できます

top: テキストは基準線の下側にあります, テキストの上端を揃えます(垂直)注釈線的终点

middle: テキストは基準線の中心にあります, テキストの中心を揃えます(垂直)注釈線的终点

bottom: テキストは基準線の上側にあります, テキストの下端を揃えます(垂直)注釈線的终点

:::

**例**
```ts
'top'



```
### lineVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
線を表示するかどうか

:::

**例**
```ts
true



```
### lineColor

**Type:** `string | undefined`

:::note{title="説明"}
線の色

:::

**例**
```ts
'red'



```
### lineWidth

**Type:** `number | undefined`

:::note{title="説明"}
線の幅

:::

**例**
```ts
2



```
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="説明"}
線のスタイル

:::

**例**
```ts
'solid'



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
背景を表示するかどうか

:::

**例**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
背景色

:::

**例**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
背景の枠線色

:::

**例**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
背景の枠線幅

:::

**例**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="説明"}
背景の角丸

:::

**例**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="説明"}
背景のパディング

:::

**例**
```ts
4




```
## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title="説明"}
数値注釈線，横方向の注釈線，特定のY軸値をマークします

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="説明"}
固定の y 値, 水平線の注釈に使用します, カテゴリ軸が y 方向の場合, ディメンション値を入力できます, 数値軸が y 方向の場合, 具体的な数値を入力できます

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（AI 生成コード実行）



AI が生成した JavaScript コードで注釈線の値を動的に計算します

平均値、最大値、分位数、業務ラインなど、データに基づいて注釈線の位置を動的に決定する必要がある場合に適しています



ブラウザー環境のみ対応します（Web Worker が必要です）

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="説明"}
ユーザーのフィルタリング要件の説明（自然言語）

:::

**例**
```ts
"売上高が最大の値を注釈線の参照値として取得する"

"平均売上高を計算して注釈線に使用する"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルタリングコード



\- 組み込みユーティリティ関数のみ使用できます（_ または R からアクセスします）

\- 入力引数: data (配列)

\- 単一の数値または文字列を返す必要があります: number | string

\- 適用シーン：注釈線（水平線、垂直線）に必要な動的数値

\- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

:::

**例**
```ts
売上高の最大値を注釈線の値として取得する
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

平均値を計算して注釈線に使用する
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

分位数を注釈線として取得する
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

条件に基づいて目標値を計算する
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

:::note{title="説明"}
コード実行に失敗した場合、または環境が対応しない場合のフォールバック案

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="説明"}
動的フィルターの実行結果（実行時フィールド）



`prepare() 段階で書き込まれ，実行時は読み取り専用です`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title="説明"}
注釈テキスト

:::

**例**
```ts
'注釈テキスト'



```
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="説明"}
テキスト位置



注釈線のラベル位置（線に対するラベルの相対位置）。

:::

**例**
```ts
'outsideEnd'



```
### textColor

**Type:** `string | undefined`

:::note{title="説明"}
テキスト色

:::

**例**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントサイズ

:::

**例**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントウェイト

:::

**例**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="説明"}
テキストの水平揃え, 通常, 設定不要です

次の値に設定することを推奨します: 'right', これによりテキストを注釈線の左側に配置できます

right: テキストは基準線の左側にあります, テキストの右端を揃えます(水平)注釈線的终点

left: テキストは基準線の右側にあります, テキストの左端を揃えます(水平)注釈線的终点

center: テキストは基準線の中心にあります, テキストの中心を揃えます(水平)注釈線的终点

:::

**例**
```ts
'right'



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="説明"}
テキストの垂直揃え, 通常, 設定不要です

次の値に設定することを推奨します: 'top', これによりテキスト全体をチャートの表示領域内に表示できます

top: テキストは基準線の下側にあります, テキストの上端を揃えます(水平)注釈線

middle: テキストは基準線の中心にあります, テキストの中心を揃えます(水平)注釈線

bottom: テキストは基準線の上側にあります, テキストの下端を揃えます(水平)注釈線

:::

**例**
```ts
'top'



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
背景を表示するかどうか

:::

**例**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
背景色

:::

**例**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
背景の枠線色

:::

**例**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
背景の枠線幅



背景の枠線幅

:::

**例**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="説明"}
背景の角丸

:::

**例**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="説明"}
背景のパディング

:::

**例**
```ts
4



```
### lineVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
線を表示するかどうか



線を表示するかどうか

:::

**例**
```ts
true



```
### lineColor

**Type:** `string | undefined`

:::note{title="説明"}
線の色

:::

**例**
```ts
'red'



```
### lineWidth

**Type:** `number | undefined`

:::note{title="説明"}
線の幅

:::

**例**
```ts
2



```
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="説明"}
線のスタイル

:::

**例**
```ts
'solid'



```
### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title="説明"}
主線を 2 つの区間に分割する機能を有効にするかどうか

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title="説明"}
注釈値より大きい部分に対応するメイン色

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title="説明"}
注釈値より小さい部分に対応するメイン色

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title="説明"}
注釈領域設定です。特定のデータ範囲を強調表示するために使用します

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title="説明"}
選択されたデータに依存します, データマークを行います.

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

### text

**Type:** `string | string[] | undefined`

:::note{title="説明"}
注釈テキスト

:::

**例**
```ts
'注釈テキスト'



```
### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title="説明"}
テキスト位置

:::

**例**
```ts
'top'



```
### textColor

**Type:** `string | undefined`

:::note{title="説明"}
テキスト色

:::

**例**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントサイズ

:::

**例**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントウェイト

:::

**例**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="説明"}
テキストの水平揃え, 通常, right に設定します, テキストは注釈領域の中央に表示されます, チャートの表示領域内に表示されるようにします

次の値に設定することを推奨します: 'center', これによりテキストを注釈領域の中央に配置できます

right: テキストは注釈領域の左側にあります, テキストの右端を揃えます注釈領域

left: テキストは注釈領域の右側にあります, テキストの左端を揃えます注釈領域

center: テキストは注釈領域の中心にあります, テキストの中心を揃えます注釈領域

:::

**例**
```ts
'center': テキストは注釈領域の中央にあります



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="説明"}
テキストの垂直揃え, 通常, top に設定します, テキストは注釈領域の下側に表示されます, チャートの表示領域内に表示されるようにします

次の値に設定することを推奨します: 'top', これによりテキスト全体をチャートの表示領域内に表示できます

top: テキストは注釈領域の下側にあります, テキストの上端を揃えます注釈領域

middle: テキストは注釈領域の中心にあります, テキストの中心を揃えます注釈領域

bottom: テキストは注釈領域の上側にあります, テキストの下端を揃えます注釈領域

:::

**例**
```ts
'top' テキストは注釈領域の下側にあります



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
背景を表示するかどうか

:::

**例**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
背景色

:::

**例**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
背景の枠線色



背景の枠線色

:::

**例**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
背景の枠線幅

:::

**例**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="説明"}
背景の角丸



背景の角丸

:::

**例**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="説明"}
背景のパディング

:::

**例**
```ts
4



```
### areaColor

**Type:** `string | undefined`

:::note{title="説明"}
注釈領域領域色

:::

**例**
```ts
'red'



```
### areaColorOpacity

**Type:** `number | undefined`

:::note{title="説明"}
注釈領域領域色の透明度

:::

**例**
```ts
0.5



```
### areaBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
注釈領域領域の枠線色

:::

**例**
```ts
'red'



```
### areaBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
注釈領域領域の枠線幅

:::

**例**
```ts
2



```
### areaBorderRadius

**Type:** `number | undefined`

:::note{title="説明"}
注釈領域領域の角丸

:::

**例**
```ts
4



```
### areaLineDash

**Type:** `number[] | undefined`

:::note{title="説明"}
注釈領域領域の枠線タイプ

:::

**例**
```ts
[2, 2]



```
### outerPadding

**Type:** `number | undefined`

:::note{title="説明"}
注釈領域領域のマージン

:::

**例**
```ts
0




```
## locale

**Type:** `Locale | undefined`

:::note{title="説明"}
言語設定

:::

