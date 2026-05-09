# RaceBar

:::note{title="説明"}
動的横棒グラフ (Race Bar Chart)

時間の経過に伴うデータのランキング変化を表示するのに適しています。

:::


## chartType

**Type:** `"raceBar"`

:::note{title="説明"}
動的横棒グラフは、時間の経過に伴うデータのランキング変化を表示するのに適しています。

:::


## dataset

**Type:** `Record[]`

:::note{title="説明"}
データソース

:::


## dimensions

**Type:** `RaceBarDimension[] | undefined`

:::note{title="説明"}
ディメンション

:::


### id

**Type:** `string`

:::note{title="説明"}
ディメンションに対応するフィールド id です。

:::

### alias

**Type:** `string | undefined`

:::note{title="説明"}
ディメンションのエイリアスです。

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title="説明"}
ディメンションの時間フォーマット設定です。

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title="説明"}
時間粒度です。日付の表示精度を決定します。

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | "player" | undefined`

:::note{title="説明"}
ディメンションをマッピングするチャネルです。

\- player: 複数のディメンションを再生チャネルにマッピングできます

\- yAxis: 複数のディメンションを y 軸にマッピングできます

\- color: 複数のディメンションを色チャネルにマッピングできます

\- detail: 複数のディメンションを詳細チャネルにマッピングできます

\- tooltip: 複数のディメンションをツールチップチャネルにマッピングできます

\- label: 複数のディメンションをラベルチャネルにマッピングできます

\- row: 複数のディメンションを行チャネルにマッピングできます

\- column: 複数のディメンションを列チャネルにマッピングできます

:::


## measures

**Type:** `RaceBarMeasure[] | undefined`

:::note{title="説明"}
メジャー

:::


### id

**Type:** `string`

:::note{title="説明"}
メジャー id です。重複できません。

:::

### alias

**Type:** `string | undefined`

:::note{title="説明"}
メジャーのエイリアスです。重複を許可します。未入力の場合、alias は id になります。

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="説明"}
数値の自動フォーマットです。デフォルトで有効で、最も高い優先度を持ちます。

autoFormat=true の場合、numFormat のすべての設定を上書きします。

有効にすると、チャートのデータラベルとツールチップは、メジャー値と言語環境に基づいて適切なフォーマット方法を自動的に選択します。

フォーマット規則: 10 進数値、compact notation を有効化、小数部は最小 0 桁・最大 2 桁、自動丸め。ブラウザーが提供する Intl.NumberFormat で実装します。

例:

\- locale が zh\-CN: 749740.264 → 74.45万

\- locale が en\-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="説明"}
カスタムメジャーの数値フォーマットです。label と tooltip に自動的に適用されます。

注意: カスタムフォーマットを使用するには、autoFormat=false を明示的に設定する必要があります。設定しない場合、autoFormat がこの設定を上書きします。

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="説明"}
数値フォーマットの種類です。数値（10 進数）、パーセント（%）、パーミル（‰）、科学的記数法をサポートします。

:::

#### ratio

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの倍率です。0 にはできません。

:::

**例**
```ts
\- 100000 を 10万 に変換します。ratio:10000, symbol:"万"
\- 100000 を 10K に変換します。ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの記号です。例: %、‰

:::

**例**
```ts
\- 100000 を 10万 に変換します。ratio:10000, symbol:"万"
\- 100000 を 10K に変換します。ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="説明"}
数値フォーマットの桁区切り記号です。

:::

#### suffix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの接尾辞です。

:::

#### prefix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの接頭辞です。

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの小数桁数です。ブラウザーが提供する Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用してフォーマットします。優先度は significantDigits より低くなります。

:::

**例**
```ts
\- 1234.5678 を 1235 に変換します。fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 を 1234.6 に変換します。fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 を 1234.57 に変換します。fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 を 1230.568 に変換します。fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 を 1234.5678 に変換します。fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 を 1234.56780 に変換します。fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの有効桁数です。ブラウザーが提供する Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用してフォーマットします。優先度は fractionDigits より高くなります。

:::

**例**
```ts
\- 1234.5678 を 1000 に変換します。significantDigits:1
\- 1234.5678 を 1200 に変換します。significantDigits:2
\- 1234.5678 を 1230 に変換します。significantDigits:3
\- 1234.5678 を 1234 に変換します。significantDigits:4
\- 1234.5678 を 1234.6 に変換します。significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 を 1234.57 に変換します。significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 を 1234.568 に変換します。significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 を 1234.5678 に変換します。significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="説明"}
数値フォーマットの丸め優先度です。significantDigits と fractionDigits が同時に設定された場合の丸め優先度を処理します。ブラウザーが提供する Intl.NumberFormat を使用してフォーマットし、規則は Intl.NumberFormat の roundingPriority と同じです。

:::

**例**
```ts
\- 1234.5678 を 1230 に変換します。significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 を 1234.5678 に変換します。significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="説明"}
数値フォーマットの丸めモードです。ブラウザーが提供する Intl.NumberFormat を使用してフォーマットし、規則は Intl.NumberFormat の roundingMode と同じです。

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="説明"}
数値フォーマットの種類です。数値（10 進数）、パーセント（%）、パーミル（‰）、科学的記数法をサポートします。

:::

#### ratio

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの倍率です。0 にはできません。

:::

**例**
```ts
\- 100000 を 10万 に変換します。ratio:10000, symbol:"万"
\- 100000 を 10K に変換します。ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの記号です。例: %、‰

:::

**例**
```ts
\- 100000 を 10万 に変換します。ratio:10000, symbol:"万"
\- 100000 を 10K に変換します。ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="説明"}
数値フォーマットの桁区切り記号です。

:::

#### suffix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの接尾辞です。

:::

#### prefix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの接頭辞です。

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの小数桁数です。ブラウザーが提供する Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用してフォーマットします。優先度は significantDigits より低くなります。

:::

**例**
```ts
\- 1234.5678 を 1235 に変換します。fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 を 1234.6 に変換します。fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 を 1234.57 に変換します。fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 を 1230.568 に変換します。fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 を 1234.5678 に変換します。fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 を 1234.56780 に変換します。fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの有効桁数です。ブラウザーが提供する Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用してフォーマットします。優先度は fractionDigits より高くなります。

:::

**例**
```ts
\- 1234.5678 を 1000 に変換します。significantDigits:1
\- 1234.5678 を 1200 に変換します。significantDigits:2
\- 1234.5678 を 1230 に変換します。significantDigits:3
\- 1234.5678 を 1234 に変換します。significantDigits:4
\- 1234.5678 を 1234.6 に変換します。significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 を 1234.57 に変換します。significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 を 1234.568 に変換します。significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 を 1234.5678 に変換します。significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="説明"}
数値フォーマットの丸め優先度です。significantDigits と fractionDigits が同時に設定された場合の丸め優先度を処理します。ブラウザーが提供する Intl.NumberFormat を使用してフォーマットし、規則は Intl.NumberFormat の roundingPriority と同じです。

:::

**例**
```ts
\- 1234.5678 を 1230 に変換します。significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 を 1234.5678 に変換します。significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="説明"}
数値フォーマットの丸めモードです。ブラウザーが提供する Intl.NumberFormat を使用してフォーマットし、規則は Intl.NumberFormat の roundingMode と同じです。

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title="説明"}
メジャーをマッピングするチャネルです。

\- xAxis: メジャーを x 軸にマッピングします

\- detail: メジャーを詳細にマッピングします

\- color: メジャーを色にマッピングします

\- label: メジャーをラベルにマッピングします

\- tooltip: メジャーをツールチップにマッピングします

:::

### parentId

**Type:** `string | undefined`

:::note{title="説明"}
フラットなメジャー設定形式でツリー状のメジャーグループを構築します。parentId は親メジャーグループの id を指し、メジャーツリーの構築に使用します。

:::

:::tip{title="Tip"}
メジャーツリーの設定には 2 つの形式があります。1 つ目は children を持つメジャーツリーを直接設定する方法、2 つ目は parentId を持つフラットなメジャーリストを設定する方法です。この 2 つの形式を同時に設定することはできません。

:::


## player

**Type:** `Player | undefined`

:::note{title="説明"}
プレーヤー設定です。時間ディメンションの指定に使用し、動的横棒グラフの中核となる設定です。



プレーヤー設定です。再生に使用するフィールド名を指定します。必ずディメンションである必要があります。

:::

:::warning{title="Warning"}
この機能は table、pivotTable、dualAxis、histogram、boxPlot などのチャートタイプをサポートしません。また、メジャー組み合わせや行列ピボットが有効な場合は使用できません。

:::


### maxCount

**Type:** `number | false | undefined`

:::note{title="説明"}
最大再生数です。この数を超えるデータは切り捨てられます。false に設定すると制限しません。

:::

### interval

**Type:** `number | undefined`

:::note{title="説明"}
再生間隔です。単位は ms です。

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title="説明"}
自動再生するかどうかです。

:::

### loop

**Type:** `boolean | undefined`

:::note{title="説明"}
ループ再生するかどうかです。

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title="説明"}
プレーヤーの位置です。

:::

### railColor

**Type:** `string | undefined`

:::note{title="説明"}
プレーヤー進行バーのトラック色です。

:::

### fontFamily

**Type:** `string | undefined`

:::note{title="説明"}
プレーヤーテキストのフォントです。

:::

### fontSize

**Type:** `number | undefined`

:::note{title="説明"}
プレーヤーテキストのフォントサイズです。

:::

### trackColor

**Type:** `string | undefined`

:::note{title="説明"}
プレーヤー進行バーの進捗色です。

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note{title="説明"}
プレーヤー進行バーのスライダー色です。

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
プレーヤー進行バーのスライダー枠線色です。

:::

### startButtonColor

**Type:** `string | undefined`

:::note{title="説明"}
プレーヤーの開始ボタン色です。

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note{title="説明"}
プレーヤーの一時停止ボタン色です。

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note{title="説明"}
プレーヤーの戻るボタン色です。

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note{title="説明"}
プレーヤーの進むボタン色です。

:::


## sort

**Type:** `Sort | undefined`

:::note{title="説明"}
ソート設定です。動的横棒グラフでは通常、数値に基づいた動的ソートが必要です。



カテゴリ軸ソート設定です。ディメンションまたはメジャーに基づくソートと、カスタムソート順をサポートします。

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
ソート順です。値は 'asc' または 'desc' から選択できます。

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
カスタムソート順です。この順序はカテゴリ軸へ直接適用されます。

:::


## page

**Type:** `Page | undefined`

:::note{title="説明"}
ページネーション設定

:::


### field

**Type:** `string`

:::note{title="説明"}
ページネーションフィールドです。ページネーションに使用するフィールド名を指定します。必ずディメンションである必要があります。

:::

### currentValue

**Type:** `string`

:::note{title="説明"}
現在のページネーション値です。現在のページネーションの基準値を指定します。

:::

**例**
```ts
'2023\-01\-01'




```
## backgroundColor

**Type:** `BackgroundColor`

:::note{title="説明"}
背景色です。

:::


## color

**Type:** `Color | undefined`

:::note{title="説明"}
色設定

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title="説明"}
離散色の配色です。チャート内の異なる要素の色を定義するために使用します。

:::

**例**
```ts
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



```
### linearColorScheme

**Type:** `string[] | undefined`

:::note{title="説明"}
線形グラデーションの配色です。チャート内の異なる要素の色を定義するために使用します。

:::

**例**
```ts
['#FFCDD2, #F8BBD0]



```
### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title="説明"}
色マッピングです。データ値を具体的な色にマッピングするために使用します。

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
正負色設定です。チャート内の正の値の色を定義するために使用します。

:::

### negativeColor

**Type:** `string | undefined`

:::note{title="説明"}
正負色設定です。チャート内の負の値の色を定義するために使用します。

:::


## label

**Type:** `Label | undefined`

:::note{title="説明"}
ラベル設定

:::


### enable

**Type:** `false | true`

:::note{title="説明"}
ラベル機能を有効にするかどうかです。

:::

### wrap

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルを折り返すかどうかです。

:::

### showValue

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルにメジャー値を表示するかどうかです。

複数メジャーのシーンでも、複数のメジャー値が矛盾する心配はありません。描画に関連するすべてのメジャーは `foldMeasures` によって処理され、1 つのメジャーに結合されます。このメジャーが 1 つのデータポイントを表すため、矛盾は発生しません。

注意: encoding の label の優先度が高いため、この設定は encoding の label には影響しません。

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルにメジャー値のパーセンテージを表示するかどうかです。

複数メジャーのシーンでも、複数のメジャー値が矛盾する心配はありません。描画に関連するすべてのメジャーは `foldMeasures` によって処理され、1 つのメジャーに結合されます。このメジャーが 1 つのデータポイントを表すため、矛盾は発生しません。

注意: encoding の label の優先度が高いため、この設定は encoding の label には影響しません。

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルにディメンションラベルを表示するかどうかです。

すべてのディメンションラベルを表示します。

注意: encoding の label の優先度が高いため、この設定は encoding の label には影響しません。

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルの数値を自動フォーマットするかどうかです。autoFormat が true の場合、numFormat 設定は無効になります。

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="説明"}
ラベル数値のフォーマット設定です。`measure` 内の `format` と結合されます。`measure` 内の `format` の優先度が高く、numFormat の優先度は autoFormat より低くなります。

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="説明"}
数値フォーマットの種類です。数値（10 進数）、パーセント（%）、パーミル（‰）、科学的記数法をサポートします。

:::

#### ratio

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの倍率です。0 にはできません。

:::

**例**
```ts
\- 100000 を 10万 に変換します。ratio:10000, symbol:"万"
\- 100000 を 10K に変換します。ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの記号です。例: %、‰

:::

**例**
```ts
\- 100000 を 10万 に変換します。ratio:10000, symbol:"万"
\- 100000 を 10K に変換します。ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="説明"}
数値フォーマットの桁区切り記号です。

:::

#### suffix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの接尾辞です。

:::

#### prefix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの接頭辞です。

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの小数桁数です。ブラウザーが提供する Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用してフォーマットします。優先度は significantDigits より低くなります。

:::

**例**
```ts
\- 1234.5678 を 1235 に変換します。fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 を 1234.6 に変換します。fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 を 1234.57 に変換します。fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 を 1230.568 に変換します。fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 を 1234.5678 に変換します。fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 を 1234.56780 に変換します。fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの有効桁数です。ブラウザーが提供する Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用してフォーマットします。優先度は fractionDigits より高くなります。

:::

**例**
```ts
\- 1234.5678 を 1000 に変換します。significantDigits:1
\- 1234.5678 を 1200 に変換します。significantDigits:2
\- 1234.5678 を 1230 に変換します。significantDigits:3
\- 1234.5678 を 1234 に変換します。significantDigits:4
\- 1234.5678 を 1234.6 に変換します。significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 を 1234.57 に変換します。significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 を 1234.568 に変換します。significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 を 1234.5678 に変換します。significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="説明"}
数値フォーマットの丸め優先度です。significantDigits と fractionDigits が同時に設定された場合の丸め優先度を処理します。ブラウザーが提供する Intl.NumberFormat を使用してフォーマットし、規則は Intl.NumberFormat の roundingPriority と同じです。

:::

**例**
```ts
\- 1234.5678 を 1230 に変換します。significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 を 1234.5678 に変換します。significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="説明"}
数値フォーマットの丸めモードです。ブラウザーが提供する Intl.NumberFormat を使用してフォーマットし、規則は Intl.NumberFormat の roundingMode と同じです。

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title="説明"}
ラベルのフォントサイズです。

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="説明"}
ラベルのフォントウェイトです。

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
ラベルの背景色です。

:::

### labelStroke

**Type:** `string | undefined`

:::note{title="説明"}
ラベルのストローク色です。

:::

### labelColor

**Type:** `string | undefined`

:::note{title="説明"}
ラベルのフォント色です。

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title="説明"}
図形要素の色に応じて、ラベルのフォント色を自動的に反転するかどうかです。

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title="説明"}
ラベルの位置です。

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルの重なり防止機能を有効にするかどうかです。

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="説明"}
ラベルフィルターです。デフォルトでは selectors 間の条件関係は Or です。

:::


#### field

**Type:** `string`

:::note{title="説明"}
ディメンションフィールドです。dimensions のいずれかの項目の id です。

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目内のディメンションフィールドの値を選択します。配列をサポートします。

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（AI 生成コード実行）



AI が生成した JavaScript コードで複雑なデータフィルタリングロジックを実装します。



主な機能:

\- 任意の複雑なデータフィルタリング条件をサポートします

\- 組み込みユーティリティ関数を使用してデータ操作を行います

\- ブラウザー環境で安全に実行します（Web Worker サンドボックス）



環境要件: ブラウザー環境のみをサポートします。Node.js 環境では fallback を使用します。



注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります。



チャートの動的フィルター設定です。



AI が生成した JavaScript コードで、チャートマーク（棒、点など）のフィルタリングを実装します。

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="説明"}
ユーザーのフィルタリング要件の説明（自然言語）です。

:::

**例**
```ts
"売上が 1000 より大きい棒を強調表示"

"各地域で利益率が最も高い棒を強調表示"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルタリングコードです。



\- 組み込みユーティリティ関数のみ使用できます（_ または R でアクセス）

\- 入力引数: data（配列）。各 item は行番号を表す __row_index フィールドを含みます

\- 行インデックスとフィールドを組み合わせた配列を返す必要があります: ``Array<{ __row_index: number, field: string }>``

\- __row_index は元データ項目の行番号を表し、field は強調表示するフィールドを表します

\- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

:::

**例**
```ts
売上が 1000 より大きいデータ項目の sales フィールドを強調表示します。
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目を強調表示します。
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

複数条件でフィルタリングしたデータ項目を強調表示します。
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
コード実行に失敗した場合、または環境が対応していない場合のフォールバック案です。

:::


##### field

**Type:** `string`

:::note{title="説明"}
ディメンションフィールドです。dimensions のいずれかの項目の id です。

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目内のディメンションフィールドの値を選択します。配列をサポートします。

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="説明"}
動的フィルターの実行結果（実行時フィールド）です。



`prepare() 段階で書き込まれ、実行時は読み取り専用です。`

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
凡例機能を有効にするかどうかです。

:::

**例**
```ts
enable: true



```
### border

**Type:** `boolean | undefined`

:::note{title="説明"}
凡例の枠線を有効にするかどうかです。

:::

:::warning{title="Warning"}
離散凡例にのみ有効です。

:::

**例**
```ts
border: true



```
### labelColor

**Type:** `string | undefined`

:::note{title="説明"}
凡例のフォント色です。

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title="説明"}
ページャーアイコンの色です。

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title="説明"}
ページャーアイコンの無効時の色です。

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title="説明"}
凡例のフォントサイズです。

:::

**例**
```ts
labelFontSize: 10



```
### labelFontColor

**Type:** `string | undefined`

:::note{title="説明"}
凡例のフォント色です。

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="説明"}
凡例のフォントウェイトです。

:::

**例**
```ts
labelFontWeight: 400



```
### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title="説明"}
凡例の形状です。

:::

:::warning{title="Warning"}
離散凡例にのみ有効です。

:::

**例**
```ts
shapeType: 'circle'



```
### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title="説明"}
凡例の位置です。

:::

**例**
```ts
position: 'rightTop'



```
### maxSize

**Type:** `number | undefined`

:::note{title="説明"}
凡例が多い場合の最大列数、または凡例の最大行数です。

position が水平方向（bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr）の場合、maxSize は表示する列数を制御します。

position が垂直方向（left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb）の場合、maxSize は表示する行数を制御します。

:::

:::warning{title="Warning"}
離散凡例にのみ有効です。

:::

**例**
```ts
maxSize: 2




```
## tooltip

**Type:** `Tooltip | undefined`

:::note{title="説明"}
ツールチップ設定

:::


### enable

**Type:** `false | true`

:::note{title="説明"}
ツールチップ機能を有効にするかどうかです。

:::


## brush

**Type:** `Brush | undefined`

:::note{title="説明"}
ブラシ選択設定



チャートのブラシ選択設定です。

:::


### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
brush によるブラシ選択を有効にするかどうかです。

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title="説明"}
brush の種類です。



ブラシ選択枠の形状と選択方向を定義します。

\- `rect`: 矩形選択です。X 軸と Y 軸の両方向で同時にブラシ選択できます

\- `polygon`: 多角形選択です。複数の点をクリックして任意の多角形を描画し、ブラシ選択します

\- `x`: X 軸方向のブラシ選択です。X 軸方向のみ選択し、Y 軸方向は制限しません

\- `y`: Y 軸方向のブラシ選択です。Y 軸方向のみ選択し、X 軸方向は制限しません

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title="説明"}
ブラシ選択モードです。単一選択か複数選択かを指定します。



ブラシ選択のモードを定義します。

\- `single`: 単一選択モードです。一度に 1 つのブラシ選択枠のみ使用できます

\- `multiple`: 複数選択モードです。複数のブラシ選択枠を同時に保持できます

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title="説明"}
ブラシ選択終了時に選択枠をクリアするかどうかです。

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="説明"}
ブラシ選択されたデータのスタイルです。



ブラシ選択されたデータポイントのスタイルを定義します。

:::


#### opacity

**Type:** `number | undefined`

:::note{title="説明"}
不透明度です。



ブラシ選択されたデータポイントの不透明度です。値の範囲は 0\-1 です。

:::

#### stroke

**Type:** `string | undefined`

:::note{title="説明"}
ストローク色です。

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="説明"}
ストローク幅です。

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="説明"}
ブラシ選択されていないデータのスタイルです。



ブラシ選択されていないデータポイントのスタイルを定義します。

:::


#### opacity

**Type:** `number | undefined`

:::note{title="説明"}
不透明度です。



ブラシ選択されていないデータポイントの不透明度です。値の範囲は 0\-1 です。

:::

#### stroke

**Type:** `string | undefined`

:::note{title="説明"}
ストローク色です。

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="説明"}
ストローク幅です。

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title="説明"}
x 軸設定です。数値軸としてメジャー値を表示します。

:::


### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
軸を表示するかどうかです。

:::

### min

**Type:** `number | undefined`

:::note{title="説明"}
軸の最小値です。nice と zero より優先度が高くなります。

:::

### max

**Type:** `number | boolean | undefined`

:::note{title="説明"}
軸の最大値です。nice と zero より優先度が高くなります。true の場合、データ範囲に基づいて最大値を自動計算します。

:::

### log

**Type:** `boolean | undefined`

:::note{title="説明"}
対数軸を使用するかどうかです。数値軸にのみ有効です。

:::

### logBase

**Type:** `number | undefined`

:::note{title="説明"}
対数軸の底です。数値軸にのみ有効です。

:::

### nice

**Type:** `boolean | undefined`

:::note{title="説明"}
軸の目盛り間隔を自動調整して目盛りラベルを読みやすくするかどうかです。min と max が設定されている場合、この設定は無効です。数値軸にのみ有効です。

:::

### inverse

**Type:** `boolean | undefined`

:::note{title="説明"}
軸を反転表示するかどうかです。数値軸にのみ有効です。

:::

### zero

**Type:** `boolean | undefined`

:::note{title="説明"}
座標軸上に 0 値を強制表示するかどうかです。min と max が設定されている場合、この設定は無効です。数値軸にのみ有効です。

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="説明"}
数値軸の目盛りラベルを自動フォーマットするかどうかです。数値軸にのみ有効です。autoFormat が true の場合、numFormat 設定は無効になります。

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="説明"}
数値軸の数値フォーマットです。数値軸にのみ有効で、優先度は autoFormat より低くなります。

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="説明"}
数値フォーマットの種類です。数値（10 進数）、パーセント（%）、パーミル（‰）、科学的記数法をサポートします。

:::

#### ratio

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの倍率です。0 にはできません。

:::

**例**
```ts
\- 100000 を 10万 に変換します。ratio:10000, symbol:"万"
\- 100000 を 10K に変換します。ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの記号です。例: %、‰

:::

**例**
```ts
\- 100000 を 10万 に変換します。ratio:10000, symbol:"万"
\- 100000 を 10K に変換します。ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="説明"}
数値フォーマットの桁区切り記号です。

:::

#### suffix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの接尾辞です。

:::

#### prefix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの接頭辞です。

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの小数桁数です。ブラウザーが提供する Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits を使用してフォーマットします。優先度は significantDigits より低くなります。

:::

**例**
```ts
\- 1234.5678 を 1235 に変換します。fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 を 1234.6 に変換します。fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 を 1234.57 に変換します。fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 を 1230.568 に変換します。fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 を 1234.5678 に変換します。fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 を 1234.56780 に変換します。fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの有効桁数です。ブラウザーが提供する Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits を使用してフォーマットします。優先度は fractionDigits より高くなります。

:::

**例**
```ts
\- 1234.5678 を 1000 に変換します。significantDigits:1
\- 1234.5678 を 1200 に変換します。significantDigits:2
\- 1234.5678 を 1230 に変換します。significantDigits:3
\- 1234.5678 を 1234 に変換します。significantDigits:4
\- 1234.5678 を 1234.6 に変換します。significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 を 1234.57 に変換します。significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 を 1234.568 に変換します。significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 を 1234.5678 に変換します。significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="説明"}
数値フォーマットの丸め優先度です。significantDigits と fractionDigits が同時に設定された場合の丸め優先度を処理します。ブラウザーが提供する Intl.NumberFormat を使用してフォーマットし、規則は Intl.NumberFormat の roundingPriority と同じです。

:::

**例**
```ts
\- 1234.5678 を 1230 に変換します。significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 を 1234.5678 に変換します。significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="説明"}
数値フォーマットの丸めモードです。ブラウザーが提供する Intl.NumberFormat を使用してフォーマットし、規則は Intl.NumberFormat の roundingMode と同じです。

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="説明"}
X 軸の目盛りラベルです。

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルを表示するかどうかです。

:::

#### labelColor

**Type:** `string | undefined`

:::note{title="説明"}
ラベルの色です。

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title="説明"}
ラベルのフォントサイズです。

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title="説明"}
ラベルのフォントウェイトです。

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title="説明"}
ラベルの回転角度です。

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="説明"}
X 軸線です。

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
軸線を表示するかどうかです。

:::

#### lineColor

**Type:** `string | undefined`

:::note{title="説明"}
軸線の色です。

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="説明"}
軸線の幅です。

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="説明"}
X 軸の目盛りです。

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
目盛りを表示するかどうかです。

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title="説明"}
目盛りを内向きにするかどうかです。

:::

#### tickColor

**Type:** `string | undefined`

:::note{title="説明"}
目盛りの色です。

:::

#### tickSize

**Type:** `number | undefined`

:::note{title="説明"}
目盛りのサイズです。

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="説明"}
X 軸タイトルです。

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
タイトルを表示するかどうかです。

:::

#### titleText

**Type:** `string | undefined`

:::note{title="説明"}
タイトルテキストです。デフォルトではフィールド設定に従います。

:::

#### titleColor

**Type:** `string | undefined`

:::note{title="説明"}
タイトルの色です。

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title="説明"}
タイトルのフォントサイズです。

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title="説明"}
タイトルのフォントウェイトです。

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="説明"}
X 軸グリッド線です。

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title="説明"}
グリッド線の色です。

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title="説明"}
グリッド線の幅です。

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title="説明"}
グリッド線の種類です。

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="説明"}
Y 軸のアニメーション設定です。

:::


#### duration

**Type:** `number | undefined`

:::note{title="説明"}
アニメーション時間です。

:::

#### easing

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションの easing 関数です。

:::


## yAxis

**Type:** `YBandAxis | undefined`

:::note{title="説明"}
y 軸設定です。カテゴリ軸としてディメンション値を表示し、棒は縦方向に並びます。

:::


### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
軸を表示するかどうかです。

:::

### inverse

**Type:** `boolean | undefined`

:::note{title="説明"}
軸を反転表示するかどうかです。数値軸にのみ有効です。

:::

### zero

**Type:** `boolean | undefined`

:::note{title="説明"}
座標軸上に 0 値を強制表示するかどうかです。min と max が設定されている場合、この設定は無効です。数値軸にのみ有効です。

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title="説明"}
軸ラベルの自動非表示です。2 つのラベルが重なる場合（間隔が autoHideGap より小さい場合）、重なりの原因となるラベルを自動的に非表示にします。カテゴリ軸にのみ有効です。

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title="説明"}
軸ラベルの自動非表示間隔です。2 つのテキストラベルの間隔が autoHideGap より小さい場合、重なりの原因となるラベルを自動的に非表示にします。カテゴリ軸にのみ有効です。

autoHide が有効な場合は autoHide を使用し、autoHideSeparation に設定します。

autoHide が無効な場合は sampling サンプリングを使用し、minGap に設定します。

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title="説明"}
軸ラベルの自動回転です。ラベル幅が軸長を超える場合、ラベルを自動的に回転します。カテゴリ軸にのみ有効です。

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title="説明"}
軸ラベルの自動回転角度範囲です。自動回転が有効な場合のラベル回転角度範囲です。カテゴリ軸にのみ有効です。

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title="説明"}
軸ラベルの自動長さ制限です。ラベル幅が軸長を超える場合、超過部分を省略記号で表示し、マウスホバー後にラベルを表示します。ラベル幅を自動的に制限します。カテゴリ軸にのみ有効です。

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title="説明"}
軸ラベルの自動長さ制限の最大長です。ラベルテキストの長さが最大長を超える場合、超過部分を省略記号で表示し、マウスホバー後にラベルを表示します。カテゴリ軸にのみ有効です。

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="説明"}
X 軸の目盛りラベルです。

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルを表示するかどうかです。

:::

#### labelColor

**Type:** `string | undefined`

:::note{title="説明"}
ラベルの色です。

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title="説明"}
ラベルのフォントサイズです。

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title="説明"}
ラベルのフォントウェイトです。

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title="説明"}
ラベルの回転角度です。

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="説明"}
X 軸線です。

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
軸線を表示するかどうかです。

:::

#### lineColor

**Type:** `string | undefined`

:::note{title="説明"}
軸線の色です。

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="説明"}
軸線の幅です。

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="説明"}
X 軸の目盛りです。

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
目盛りを表示するかどうかです。

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title="説明"}
目盛りを内向きにするかどうかです。

:::

#### tickColor

**Type:** `string | undefined`

:::note{title="説明"}
目盛りの色です。

:::

#### tickSize

**Type:** `number | undefined`

:::note{title="説明"}
目盛りのサイズです。

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="説明"}
X 軸タイトルです。

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
タイトルを表示するかどうかです。

:::

#### titleText

**Type:** `string | undefined`

:::note{title="説明"}
タイトルテキストです。デフォルトではフィールド設定に従います。

:::

#### titleColor

**Type:** `string | undefined`

:::note{title="説明"}
タイトルの色です。

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title="説明"}
タイトルのフォントサイズです。

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title="説明"}
タイトルのフォントウェイトです。

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="説明"}
X 軸グリッド線です。

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title="説明"}
グリッド線の色です。

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title="説明"}
グリッド線の幅です。

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title="説明"}
グリッド線の種類です。

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="説明"}
Y 軸のアニメーション設定です。

:::


#### duration

**Type:** `number | undefined`

:::note{title="説明"}
アニメーション時間です。

:::

#### easing

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションの easing 関数です。

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title="説明"}
水平ツールチップ設定



クロスヘアライン矩形領域設定です。チャート内にクロスヘアラインの矩形領域を表示するための設定タイプです。

:::


### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
クロスヘアライン矩形領域を表示するかどうかです。

:::

### rectColor

**Type:** `string | undefined`

:::note{title="説明"}
クロスヘアライン矩形領域の色です。

:::

### labelColor

**Type:** `string | undefined`

:::note{title="説明"}
クロスヘアライン矩形領域ラベルの色です。

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
クロスヘアライン矩形領域ラベルを表示するかどうかです。

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
クロスヘアライン矩形領域ラベルの背景色です。

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title="説明"}
積み上げ角丸です。

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title="説明"}
矩形の最大高さです。

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title="説明"}
凡例ソート設定



凡例ソート設定です。ディメンションまたはメジャーに基づくソートと、カスタムソート順をサポートします。ソート配列は左から右、または上から下の順序に従います。

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
ソート順です。値は 'asc' または 'desc' から選択できます。

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
カスタムソート順です。この順序は凡例へ直接適用されます。昇順は左から右または上から下、降順は右から左または下から上です。

:::


## theme

**Type:** `Theme | undefined`

:::note{title="説明"}
テーマ



light と dark の 2 種類のテーマが組み込まれています。新しいテーマは registerTheme でカスタマイズできます。

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title="説明"}
横棒グラフスタイル設定

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="説明"}
データセレクター



selector を設定した場合、数値 selector、局所データ selector、条件ディメンション selector、条件メジャー selector の 4 種類のデータマッチング機能を提供します。

selector を設定しない場合、スタイルはグローバルに有効になります。

:::

**例**
```ts
数値セレクター
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

局所データセレクター
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
ディメンションフィールドです。dimensions のいずれかの項目の id です。

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目内のディメンションフィールドの値を選択します。配列をサポートします。

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（AI 生成コード実行）



AI が生成した JavaScript コードで複雑なデータフィルタリングロジックを実装します。

Top N、統計分析、複雑な条件など、静的 selector では表現しにくいシーンに適しています。



主な機能:

\- 任意の複雑なデータフィルタリング条件をサポートします

\- 組み込みユーティリティ関数を使用してデータ操作を行います

\- ブラウザー環境で安全に実行します（Web Worker サンドボックス）



環境要件: ブラウザー環境のみをサポートします。Node.js 環境では fallback を使用します。



注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります。



チャートの動的フィルター設定です。



AI が生成した JavaScript コードで、チャートマーク（棒、点など）のフィルタリングを実装します。

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="説明"}
ユーザーのフィルタリング要件の説明（自然言語）です。

:::

**例**
```ts
"売上が 1000 より大きい棒を強調表示"

"各地域で利益率が最も高い棒を強調表示"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルタリングコードです。



\- 組み込みユーティリティ関数のみ使用できます（_ または R でアクセス）

\- 入力引数: data（配列）。各 item は行番号を表す __row_index フィールドを含みます

\- 行インデックスとフィールドを組み合わせた配列を返す必要があります: ``Array<{ __row_index: number, field: string }>``

\- __row_index は元データ項目の行番号を表し、field は強調表示するフィールドを表します

\- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

:::

**例**
```ts
売上が 1000 より大きいデータ項目の sales フィールドを強調表示します。
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目を強調表示します。
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

複数条件でフィルタリングしたデータ項目を強調表示します。
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
コード実行に失敗した場合、または環境が対応していない場合のフォールバック案です。

:::


##### field

**Type:** `string`

:::note{title="説明"}
ディメンションフィールドです。dimensions のいずれかの項目の id です。

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目内のディメンションフィールドの値を選択します。配列をサポートします。

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="説明"}
動的フィルターの実行結果（実行時フィールド）です。



`prepare() 段階で書き込まれ、実行時は読み取り専用です。`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### barVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
棒図形要素（矩形図形要素）を表示するかどうかです。

:::

### barColor

**Type:** `string | undefined`

:::note{title="説明"}
棒図形要素（矩形図形要素）の色です。

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title="説明"}
棒図形要素（矩形図形要素）の色の透明度です。

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
棒図形要素（矩形図形要素）の枠線色です。

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
棒図形要素（矩形図形要素）の枠線幅です。

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="説明"}
棒図形要素（矩形図形要素）の枠線スタイルです。

:::

**例**
```ts
solid

dashed

dotted



```
### barBorderOpacity

**Type:** `number | undefined`

:::note{title="説明"}
棒図形要素（矩形図形要素）の角丸です。



棒図形要素（矩形図形要素）のストローク透明度です。

:::

**例**
```ts
4

[0, 0, 10, 10]



```
### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title="説明"}
注釈ポイント設定

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="説明"}
注釈ポイントのセレクターです。データポイントの選択に使用します。

:::


#### field

**Type:** `string`

:::note{title="説明"}
ディメンションフィールドです。dimensions のいずれかの項目の id です。

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目内のディメンションフィールドの値を選択します。配列をサポートします。

:::

### measureId

**Type:** `string | undefined`

:::note{title="説明"}
注釈ポイントが属するメジャー id を指定します。複数 measure のシーンでは selector と組み合わせて、対象メジャーに対応する注釈ポイントを一意に特定できます。

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（AI 生成コード実行）



AI が生成した JavaScript コードで複雑なデータフィルタリングロジックを実装します。

Top N、統計分析、複雑な条件など、静的 selector では表現しにくいシーンに適しています。



主な機能:

\- 任意の複雑なデータフィルタリング条件をサポートします

\- 組み込みユーティリティ関数を使用してデータ操作を行います

\- ブラウザー環境で安全に実行します（Web Worker サンドボックス）



環境要件: ブラウザー環境のみをサポートします。Node.js 環境では fallback を使用します。



注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります。



チャートの動的フィルター設定です。



AI が生成した JavaScript コードで、チャートマーク（棒、点など）のフィルタリングを実装します。

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="説明"}
ユーザーのフィルタリング要件の説明（自然言語）です。

:::

**例**
```ts
"売上が 1000 より大きい棒を強調表示"

"各地域で利益率が最も高い棒を強調表示"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルタリングコードです。



\- 組み込みユーティリティ関数のみ使用できます（_ または R でアクセス）

\- 入力引数: data（配列）。各 item は行番号を表す __row_index フィールドを含みます

\- 行インデックスとフィールドを組み合わせた配列を返す必要があります: ``Array<{ __row_index: number, field: string }>``

\- __row_index は元データ項目の行番号を表し、field は強調表示するフィールドを表します

\- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

:::

**例**
```ts
売上が 1000 より大きいデータ項目の sales フィールドを強調表示します。
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目を強調表示します。
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

複数条件でフィルタリングしたデータ項目を強調表示します。
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
コード実行に失敗した場合、または環境が対応していない場合のフォールバック案です。

:::


##### field

**Type:** `string`

:::note{title="説明"}
ディメンションフィールドです。dimensions のいずれかの項目の id です。

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目内のディメンションフィールドの値を選択します。配列をサポートします。

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="説明"}
動的フィルターの実行結果（実行時フィールド）です。



`prepare() 段階で書き込まれ、実行時は読み取り専用です。`

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
注釈テキストです。

:::

**例**
```ts
'注釈テキスト'



```
### textColor

**Type:** `string | undefined`

:::note{title="説明"}
テキスト色です。

:::

**例**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントサイズです。

:::

**例**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントウェイトです。

:::

**例**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="説明"}
テキストの配置です。通常は right に設定します。テキストを注釈ポイントの左側に表示し、チャートの表示領域内に収まるようにします。

'right' に設定することを推奨します。これにより、テキストを注釈ポイントの左側に配置できます。

right: テキストは注釈ポイントの左側にあり、テキストの右端が注釈ポイントに揃います。

left: テキストは注釈ポイントの右側にあり、テキストの左端が注釈ポイントに揃います。

center: テキストは注釈ポイントの中央にあり、テキストの中心が注釈ポイントに揃います。

:::

**例**
```ts
'right' ではテキストが注釈ポイントの左側に配置されます。



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="説明"}
テキストの垂直配置です。通常は top に設定します。テキストを注釈ポイントの下側に表示し、チャートの表示領域内に収まるようにします。

'top' に設定することを推奨します。これにより、テキスト全体をチャートの表示領域内に表示できます。

top: テキストは注釈ポイントの下側にあり、テキストの上端が注釈ポイントに揃います。

middle: テキストは注釈ポイントの中央にあり、テキストの中心が注釈ポイントに揃います。

bottom: テキストは注釈ポイントの上側にあり、テキストの下端が注釈ポイントに揃います。

:::

**例**
```ts
'top' ではテキストが注釈ポイントの下側に配置されます。



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
背景を表示するかどうかです。

:::

**例**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
背景色です。

:::

**例**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
背景の枠線色です。

:::

**例**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
背景の枠線幅です。

:::

**例**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="説明"}
背景の角丸です。

:::

**例**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="説明"}
背景の内側余白です。

:::

**例**
```ts
4



```
### offsetY

**Type:** `number | undefined`

:::note{title="説明"}
注釈ポイント全体の Y 方向のピクセルオフセットです。注釈ポイントがチャート上側（数値が大きい場合）にある場合は正の値、チャート下側（数値が小さい場合）にある場合は負の値を推奨します。

負の値では全体が上方向へオフセットします。たとえば \-10 を設定すると、テキストやテキスト背景を含む注釈ポイントコンポーネント全体が 10 ピクセル上へ移動します。

正の値では全体が下方向へオフセットします。たとえば 10 を設定すると、テキストやテキスト背景を含む注釈ポイントコンポーネント全体が 10 ピクセル下へ移動します。

:::

**例**
```ts
offsetY: 5 の場合、注釈ポイント全体が 5 ピクセル下へ移動します。



```
### offsetX

**Type:** `number | undefined`

:::note{title="説明"}
注釈ポイント全体の X 方向のピクセルオフセットです。注釈ポイントがチャート左側（カテゴリ軸の始点）にある場合は正の値、チャート右側（カテゴリ軸の終点）にある場合は負の値を推奨します。

負の値では全体が左方向へオフセットします。たとえば \-10 を設定すると、テキストやテキスト背景を含む注釈ポイントコンポーネント全体が 10 ピクセル左へ移動します。

正の値では全体が右方向へオフセットします。たとえば 10 を設定すると、テキストやテキスト背景を含む注釈ポイントコンポーネント全体が 10 ピクセル右へ移動します。

:::

**例**
```ts
offsetX: 5 の場合、注釈ポイント全体が 5 ピクセル右へ移動します。




```
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title="説明"}
数値注釈線

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="説明"}
固定の x 値です。垂直線の注釈に使用します。カテゴリ軸が x 方向にある場合はディメンション値、数値軸が x 方向にある場合は具体的な数値を入力できます。

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（AI 生成コード実行）



AI が生成した JavaScript コードで注釈線の値を動的に計算します。

平均値、最大値、分位数、ビジネスラインなど、データに基づいて注釈線の位置を動的に決定する必要があるシーンに適しています。



ブラウザー環境のみをサポートします（Web Worker が必要です）。

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="説明"}
ユーザーのフィルタリング要件の説明（自然言語）です。

:::

**例**
```ts
"売上の最大値を注釈線の参照として取得"

"平均売上を計算して注釈線に使用"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルタリングコードです。



\- 組み込みユーティリティ関数のみ使用できます（_ または R でアクセス）

\- 入力引数: data（配列）

\- 単一の数値または文字列を返す必要があります: number | string

\- 適用シーン: 注釈線（水平線、垂直線）に必要な動的数値

\- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

:::

**例**
```ts
売上の最大値を注釈線の値として取得します。
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

平均値を計算して注釈線に使用します。
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

分位数を注釈線として取得します。
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

条件に基づいて対象値を計算します。
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
コード実行に失敗した場合、または環境が対応していない場合のフォールバック案です。

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="説明"}
動的フィルターの実行結果（実行時フィールド）です。



`prepare() 段階で書き込まれ、実行時は読み取り専用です。`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title="説明"}
注釈テキストです。

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
テキスト色です。

:::

**例**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントサイズです。

:::

**例**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントウェイトです。

:::

**例**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="説明"}
テキストの配置です。通常は設定不要です。

'right' に設定することを推奨します。これにより、テキストを注釈線の左側に配置できます。

right: テキストは参照線の左側にあり、テキストの右端が（垂直）注釈線に揃います。

left: テキストは参照線の右側にあり、テキストの左端が（垂直）注釈線に揃います。

center: テキストは参照線の中央にあり、テキストの中心が（垂直）注釈線に揃います。

:::

**例**
```ts
'right'



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="説明"}
テキストの垂直配置です。通常は設定不要です。

'top' に設定することを推奨します。これにより、テキスト全体をチャートの表示領域内に表示できます。

top: テキストは参照線の下側にあり、テキストの上端が（垂直）注釈線の終点に揃います。

middle: テキストは参照線の中央にあり、テキストの中心が（垂直）注釈線の終点に揃います。

bottom: テキストは参照線の上側にあり、テキストの下端が（垂直）注釈線の終点に揃います。

:::

**例**
```ts
'top'



```
### lineVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
線を表示するかどうかです。

:::

**例**
```ts
true



```
### lineColor

**Type:** `string | undefined`

:::note{title="説明"}
線の色です。

:::

**例**
```ts
'red'



```
### lineWidth

**Type:** `number | undefined`

:::note{title="説明"}
線の幅です。

:::

**例**
```ts
2



```
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="説明"}
線のスタイルです。

:::

**例**
```ts
'solid'



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
背景を表示するかどうかです。

:::

**例**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
背景色です。

:::

**例**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
背景の枠線色です。

:::

**例**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
背景の枠線幅です。

:::

**例**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="説明"}
背景の角丸です。

:::

**例**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="説明"}
背景の内側余白です。

:::

**例**
```ts
4




```
## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title="説明"}
ディメンション値注釈線

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="説明"}
固定の y 値です。水平線の注釈に使用します。カテゴリ軸が y 方向にある場合はディメンション値、数値軸が y 方向にある場合は具体的な数値を入力できます。

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（AI 生成コード実行）



AI が生成した JavaScript コードで注釈線の値を動的に計算します。

平均値、最大値、分位数、ビジネスラインなど、データに基づいて注釈線の位置を動的に決定する必要があるシーンに適しています。



ブラウザー環境のみをサポートします（Web Worker が必要です）。

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="説明"}
ユーザーのフィルタリング要件の説明（自然言語）です。

:::

**例**
```ts
"売上の最大値を注釈線の参照として取得"

"平均売上を計算して注釈線に使用"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルタリングコードです。



\- 組み込みユーティリティ関数のみ使用できます（_ または R でアクセス）

\- 入力引数: data（配列）

\- 単一の数値または文字列を返す必要があります: number | string

\- 適用シーン: 注釈線（水平線、垂直線）に必要な動的数値

\- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

:::

**例**
```ts
売上の最大値を注釈線の値として取得します。
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

平均値を計算して注釈線に使用します。
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

分位数を注釈線として取得します。
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

条件に基づいて対象値を計算します。
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
コード実行に失敗した場合、または環境が対応していない場合のフォールバック案です。

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="説明"}
動的フィルターの実行結果（実行時フィールド）です。



`prepare() 段階で書き込まれ、実行時は読み取り専用です。`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title="説明"}
注釈テキストです。

:::

**例**
```ts
'注釈テキスト'



```
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="説明"}
テキスト位置です。



注釈線のラベル位置（線に対するラベルの相対位置）です。

:::

**例**
```ts
'outsideEnd'



```
### textColor

**Type:** `string | undefined`

:::note{title="説明"}
テキスト色です。

:::

**例**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントサイズです。

:::

**例**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントウェイトです。

:::

**例**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="説明"}
テキストの配置です。通常は設定不要です。

'right' に設定することを推奨します。これにより、テキストを注釈線の左側に配置できます。

right: テキストは参照線の左側にあり、テキストの右端が（水平）注釈線の終点に揃います。

left: テキストは参照線の右側にあり、テキストの左端が（水平）注釈線の終点に揃います。

center: テキストは参照線の中央にあり、テキストの中心が（水平）注釈線の終点に揃います。

:::

**例**
```ts
'right'



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="説明"}
テキストの垂直配置です。通常は設定不要です。

'top' に設定することを推奨します。これにより、テキスト全体をチャートの表示領域内に表示できます。

top: テキストは参照線の下側にあり、テキストの上端が（水平）注釈線に揃います。

middle: テキストは参照線の中央にあり、テキストの中心が（水平）注釈線に揃います。

bottom: テキストは参照線の上側にあり、テキストの下端が（水平）注釈線に揃います。

:::

**例**
```ts
'top'



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
背景を表示するかどうかです。

:::

**例**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
背景色です。

:::

**例**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
背景の枠線色です。

:::

**例**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
背景の枠線幅です。



背景の枠線幅です。

:::

**例**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="説明"}
背景の角丸です。

:::

**例**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="説明"}
背景の内側余白です。

:::

**例**
```ts
4



```
### lineVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
線を表示するかどうかです。



線を表示するかどうかです。

:::

**例**
```ts
true



```
### lineColor

**Type:** `string | undefined`

:::note{title="説明"}
線の色です。

:::

**例**
```ts
'red'



```
### lineWidth

**Type:** `number | undefined`

:::note{title="説明"}
線の幅です。

:::

**例**
```ts
2



```
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="説明"}
線のスタイルです。

:::

**例**
```ts
'solid'



```
### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title="説明"}
主線を 2 つの区間に分割する機能を有効にするかどうかです。

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title="説明"}
注釈値より大きい部分に対応するメイン色です。

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title="説明"}
注釈値より小さい部分に対応するメイン色です。

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title="説明"}
注釈領域設定

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title="説明"}
選択したデータに依存してデータマークを行います。

:::


#### field

**Type:** `string`

:::note{title="説明"}
ディメンションフィールドです。dimensions のいずれかの項目の id です。

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目内のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目内のディメンションフィールドの値が value に含まれないデータ項目を選択します

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目内のディメンションフィールドの値を選択します。配列をサポートします。

:::

### text

**Type:** `string | string[] | undefined`

:::note{title="説明"}
注釈テキストです。

:::

**例**
```ts
'注釈テキスト'



```
### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title="説明"}
テキスト位置です。

:::

**例**
```ts
'top'



```
### textColor

**Type:** `string | undefined`

:::note{title="説明"}
テキスト色です。

:::

**例**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントサイズです。

:::

**例**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントウェイトです。

:::

**例**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="説明"}
テキストの配置です。通常は right に設定します。テキストを注釈領域の中央に表示し、チャートの表示領域内に収まるようにします。

'center' に設定することを推奨します。これにより、テキストを注釈領域の中央に配置できます。

right: テキストは注釈領域の左側にあり、テキストの右端が注釈領域に揃います。

left: テキストは注釈領域の右側にあり、テキストの左端が注釈領域に揃います。

center: テキストは注釈領域の中央にあり、テキストの中心が注釈領域に揃います。

:::

**例**
```ts
'center' ではテキストが注釈領域の中央に配置されます。



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="説明"}
テキストの垂直配置です。通常は top に設定します。テキストを注釈領域の下側に表示し、チャートの表示領域内に収まるようにします。

'top' に設定することを推奨します。これにより、テキスト全体をチャートの表示領域内に表示できます。

top: テキストは注釈領域の下側にあり、テキストの上端が注釈領域に揃います。

middle: テキストは注釈領域の中央にあり、テキストの中心が注釈領域に揃います。

bottom: テキストは注釈領域の上側にあり、テキストの下端が注釈領域に揃います。

:::

**例**
```ts
'top' ではテキストが注釈領域の下側に配置されます。



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
背景を表示するかどうかです。

:::

**例**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
背景色です。

:::

**例**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
背景の枠線色です。



背景の枠線色です。

:::

**例**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
背景の枠線幅です。

:::

**例**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="説明"}
背景の角丸です。



背景の角丸です。

:::

**例**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="説明"}
背景の内側余白です。

:::

**例**
```ts
4



```
### areaColor

**Type:** `string | undefined`

:::note{title="説明"}
注釈領域の色です。

:::

**例**
```ts
'red'



```
### areaColorOpacity

**Type:** `number | undefined`

:::note{title="説明"}
注釈領域の色の透明度です。

:::

**例**
```ts
0.5



```
### areaBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
注釈領域の枠線色です。

:::

**例**
```ts
'red'



```
### areaBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
注釈領域の枠線幅です。

:::

**例**
```ts
2



```
### areaBorderRadius

**Type:** `number | undefined`

:::note{title="説明"}
注釈領域の角丸です。

:::

**例**
```ts
4



```
### areaLineDash

**Type:** `number[] | undefined`

:::note{title="説明"}
注釈領域の枠線の線種です。

:::

**例**
```ts
[2, 2]



```
### outerPadding

**Type:** `number | undefined`

:::note{title="説明"}
注釈領域の余白です。

:::

**例**
```ts
0




```
## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title="説明"}
ディメンション連動設定



ピボットチャートのディメンション連動設定です。

:::


### enable

**Type:** `false | true`

:::note{title="説明"}
ピボットチャートのディメンション連動を有効にするかどうかです。

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title="説明"}
すべてのディメンションに対応するサブチャートの Tooltip ツールチップを表示するかどうかです。

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title="説明"}
crosshair に対応するラベルを表示するかどうかです。

:::


## locale

**Type:** `Locale | undefined`

:::note{title="説明"}
言語設定

:::

