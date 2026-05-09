# Sunburst

:::info{title="エンコーディングマッピング"}
サンバースト図は、次の視覚チャネルをサポートします:

`color`: 色チャネル。`複数のディメンション`または `1 つのメジャー`をサポートします

`label`: ラベルチャネル。`複数のディメンション`と `複数のメジャー`をサポートします

`tooltip`: ツールチップチャネル。`複数のディメンション`と `複数のメジャー`をサポートします

:::

:::note{title="説明"}
サンバースト図は階層データの表示に使用します。扇形の面積の大きさで数値の大きさを表します。

適用シーン:

\- 多階層データの構成比分布を表示する

\- 階層関係と構成比を強調する

:::

:::warning{title="Warning"}
データ要件:

\- 面積にマッピングするため、少なくとも 1 個の数値フィールド（メジャー）が必要です

\- 階層分割に使用するため、少なくとも 1 個のディメンションフィールドが必要です

:::


## chartType

**Type:** `"sunburst"`

:::note{title="説明"}
サンバースト図



階層データの構成比関係を表示するサンバースト図です。

:::

**例**
```ts
'sunburst'




```
## dataset

**Type:** `Record[]`

:::note{title="説明"}
データセット



TidyData 仕様に準拠し、すでに集計済みのデータセットです。チャートのデータソースと構造を定義するために使用します。

:::

**例**
```ts
[{category:'A', value:30}, {category:'B', value:70}]




```
## dimensions

**Type:** `HierarchyDimension[] | undefined`

:::note{title="説明"}
ディメンション



データの階層構造を定義するためのディメンション設定です。

:::

**例**
```ts
[{id: 'category', alias: 'カテゴリ'}]




```
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

**Type:** `"tooltip" | "label" | "hierarchy" | undefined`

:::note{title="説明"}
ディメンションをマッピングするチャネルです。

\- hierarchy: 複数のディメンションを階層チャネルにマッピングできます

\- label: 複数のディメンションをラベルチャネルにマッピングできます

\- tooltip: 複数のディメンションをツールチップチャネルにマッピングできます

:::

:::tip{title="Tip"}
最初のディメンションは color チャネルに直接マッピングされます。

:::


## measures

**Type:** `HierarchyMeasure[] | undefined`

:::note{title="説明"}
メジャー



扇形の大きさ（面積）を定義するためのメジャー設定です。

:::

**例**
```ts
[{id: 'value', alias: '数値'}]




```
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

**Type:** `"tooltip" | "label" | "size" | undefined`

:::note{title="説明"}
メジャーをマッピングするチャネルです。

\- size: メジャーをサイズチャネルにマッピングします。ツリーマップなどのチャートで面積または大きさの表示に使用します

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


## page

**Type:** `Page | undefined`

:::note{title="説明"}
ページネーション設定



ページネーションに使用するフィールド名を指定します。必ずディメンションである必要があります。

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
チャートの背景色



背景色には、'red'、'blue' などの色文字列を指定できます。また、'#ff0000'、'rgba(255,0,0,0.5)' などの hex、rgb、rgba も指定できます。

:::


## color

**Type:** `Color | undefined`

:::note{title="説明"}
色



チャートの配色を定義する色設定です。色リスト、色マッピング、色グラデーションなどを含みます。

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
ラベル



チャートのデータラベルを定義するラベル設定です。データラベルの位置、フォーマット、スタイルなどを含みます。

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
ラベルの重なり回避機能を有効にするかどうかです。

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="説明"}
ラベルのフィルターです。デフォルトでは selectors 間の条件関係は Or です。

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

\- in: データ項目のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目のディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目のディメンションフィールドの値が value に含まれないデータ項目を選択します

operator と同じです。

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目のディメンションフィールドの値を選択します。配列をサポートします。

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（AI 生成コードの実行）



AI が生成した JavaScript コードによって、複雑なデータフィルタリングロジックを実装します。



主な機能:

\- 任意の複雑なデータフィルター条件をサポートします

\- 組み込みユーティリティ関数を使用してデータ操作を行います

\- ブラウザー環境内で安全に実行します（Web Worker サンドボックス）



環境要件: ブラウザー環境のみをサポートします。Node.js 環境では fallback を使用します。



注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります。



チャートの動的フィルター設定です。



AI が生成した JavaScript コードによって、チャートマーク（棒、点など）のフィルターを実装します。

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="説明"}
ユーザーのフィルター要件の説明（自然言語）です。

:::

**例**
```ts
"売上高が 1000 を超える棒をハイライトする"

"各地域で利益率が最も高い棒をハイライトする"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルターコードです。



\- 組み込みユーティリティ関数のみ使用できます（_ または R からアクセス）

\- 入力パラメータ: data（配列）。各 item には行番号を表す __row_index フィールドが含まれます

\- 行インデックスとフィールドの組み合わせの配列を返す必要があります: ``Array<{ __row_index: number, field: string }>``

\- __row_index は元データ項目の行番号を表し、field はハイライトする必要があるフィールドを表します

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

複数条件でフィルターされたデータ項目をハイライトする
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

\- in: データ項目のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目のディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目のディメンションフィールドの値が value に含まれないデータ項目を選択します

operator と同じです。

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目のディメンションフィールドの値を選択します。配列をサポートします。

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


## tooltip

**Type:** `Tooltip | undefined`

:::note{title="説明"}
ツールチップ



チャートのツールチップを定義する設定です。ツールチップの位置、フォーマット、スタイルなどを含みます。

:::


### enable

**Type:** `false | true`

:::note{title="説明"}
ツールチップ機能を有効にするかどうかです。

:::


## theme

**Type:** `Theme | undefined`

:::note{title="説明"}
チャートのテーマ



light と dark の 2 種類の組み込みテーマがあります。ユーザーは Builder を通じてテーマをカスタマイズできます。



テーマ



light と dark の 2 種類の組み込みテーマがあります。新しいテーマは registerTheme によってカスタマイズできます。

:::

**例**
```ts
'dark'

'light'




```
### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `Locale | undefined`

:::note{title="説明"}
言語



チャートの言語設定です。'zh\-CN' と 'en\-US' の 2 つの言語をサポートします。

:::
