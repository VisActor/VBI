# Pie

:::info{title="推奨"}
\- 推奨フィールド設定: `1`個のメジャー、`1`個のディメンション

\- データ再形成に対応: 少なくとも`1`個のメジャー、`0`個のディメンション

:::

:::info{title="エンコーディングマッピング"}
円グラフは、次の視覚チャネルをサポートします:

`angle`  : 角度チャネル。`複数のメジャー`をサポートし、メジャー値に基づいて扇形の角度にマッピングします

`detail` : 詳細チャネル。`複数のディメンション`をサポートし、同じ色系列の下でより細かい粒度のデータを表示するときに使用します

`color`  : 色チャネル。`複数のディメンション`または `1 つのメジャー`をサポートします。ディメンション色は異なるデータ系列の区別に使用し、メジャー色はメジャー値を図形色へ線形マッピングするために使用します

`tooltip`: ツールチップチャネル。`複数のディメンション`と `複数のメジャー`をサポートし、マウスがデータポイントにホバーしたときに表示します

`label`  : ラベルチャネル。`複数のディメンション`と `複数のメジャー`をサポートし、データポイント上にデータラベルを表示します

:::

:::note{title="説明"}
円グラフは、単一ディメンションデータの構成比関係を表示するのに適しており、扇形の面積の大きさで各カテゴリの割合を表します。

適用シーン:

\- カテゴリデータの構成比分布を表示する

\- データの全体と部分の関係を強調する

\- カテゴリ数が少ない場合（6 個以下を推奨）の構成比分析

:::

:::warning{title="Warning"}
データ要件:

\- 少なくとも 1 個の数値フィールド（メジャー）が必要です

\- すべてのディメンションは、複数メジャーが存在する場合はメジャー名と結合されて 1 つのディメンションになり、凡例項目として表示されます

\- すべてのメジャーは自動的に 1 つのメジャーへ結合されます

デフォルトで有効な機能:

\- 凡例、データラベル、ツールチップ、構成比計算がデフォルトで有効です

:::


## chartType

**Type:** `"pie"`

:::note{title="説明"}
円グラフ



単一ディメンションデータの構成比関係を表示する円グラフです。

:::

**例**
```ts
'pie'




```
## dataset

**Type:** `Record[]`

:::note{title="説明"}
データセット



TidyData 仕様に準拠し、すでに集計済みのデータセットです。チャートのデータソースと構造を定義するために使用します。ユーザーが入力したデータセットに処理は不要です。VSeed は強力なデータ再形成機能を備えており、自動的にデータを再形成します。円グラフのデータは最終的に 1 個のディメンション、1 個のメジャーへ変換されます。

:::

**例**
```ts
[{category:'A', value:30}, {category:'B', value:70}]




```
## dimensions

**Type:** `PieDimension[] | undefined`

:::note{title="説明"}
ディメンション



円グラフのすべてのディメンションは、複数メジャーが存在する場合はメジャー名と結合されて 1 つのディメンションになり、角度にマッピングされ、凡例項目として表示されます。

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title="説明"}
ディメンションをマッピングするチャネルです。

\- color: 複数のディメンションを色チャネルにマッピングできます

\- detail: 複数のディメンションを詳細チャネルにマッピングできます

\- tooltip: 複数のディメンションをツールチップチャネルにマッピングできます

\- label: 複数のディメンションをラベルチャネルにマッピングできます

\- row: 複数のディメンションを行チャネルにマッピングできます

\- column: 複数のディメンションを列チャネルにマッピングできます

:::


## measures

**Type:** `PieMeasure[] | undefined`

:::note{title="説明"}
メジャー



円グラフのすべてのメジャーは自動的に 1 つのメジャーへ結合され、半径軸にマッピングされます。複数メジャーが存在する場合、メジャー名はその他のディメンションと結合され、凡例項目として表示されます。

:::

**例**
```ts
[{id: 'value', alias: '数値比率', format: 'percent'}]




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

**Type:** `"color" | "tooltip" | "label" | "angle" | undefined`

:::note{title="説明"}
メジャーをマッピングするチャネルです。

\- angle: メジャーを角度にマッピングします

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


## page

**Type:** `Page | undefined`

:::note{title="説明"}
ページネーション設定です。ページネーションに使用するフィールド名を指定します。必ずディメンションである必要があります。

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



背景色には 'red'、'blue' などの色文字列を指定できます。また、'#ff0000'、'rgba(255,0,0,0.5)' のような hex、rgb、rgba も指定できます。

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

**Type:** `PieLabel | undefined`

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

### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title="説明"}
ラベルのレイアウト方式です。円グラフとドーナツグラフで、`labelPosition` が `outside` の場合にのみ有効です。

\- arc: 弧に沿ってラベルをレイアウトします

\- labelLine: ラベルを両端揃えにし、ガイド線で扇形図形要素とラベルを接続します

\- edge: ラベルを両端揃えにし、ガイド線で扇形図形要素とラベルを接続し、チャート両端の端に近づけます

:::


## legend

**Type:** `Legend | undefined`

:::note{title="説明"}
凡例



チャートの凡例を定義する凡例設定です。凡例の位置、フォーマット、スタイルなどを含みます。

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
ツールチップ



チャートのツールチップを定義する設定です。ツールチップの位置、フォーマット、スタイルなどを含みます。

:::


### enable

**Type:** `false | true`

:::note{title="説明"}
ツールチップ機能を有効にするかどうかです。

:::


## brush

**Type:** `Brush | undefined`

:::note{title="説明"}
ブラシ選択



brush によるブラシ選択機能のオン/オフに使用する設定です。



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


## animation

**Type:** `PieLikeAnimation | undefined`

:::note{title="説明"}
アニメーション設定



チャートのアニメーション設定です。選択可能な効果はチャートタイプによって制限されます。

:::


### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
円グラフ/ドーナツグラフ/ローズグラフのアニメーションを有効にするかどうかです。

:::

### params

**Type:** `PieLikeAnimationParams | undefined`

:::note{title="説明"}
円グラフ/ドーナツグラフ/ローズグラフのアニメーションパラメータです。

:::


#### appear

**Type:** `PieLikeAppearAnimation | undefined`

:::note{title="説明"}
円グラフ/ドーナツグラフ/ローズグラフの入場アニメーション設定です。

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title="説明"}
円グラフ/ドーナツグラフ/ローズグラフの入場効果です。径方向アニメーションとスケールアニメーションをサポートします。

:::

##### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
現在のアニメーション段階を有効にするかどうかです。

:::

##### ease

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションのイージング関数です。

:::

##### duration

**Type:** `number | undefined`

:::note{title="説明"}
アニメーション時間です。単位はミリ秒です。

:::

##### color

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションの強調色またはアンビエント色です。

:::

#### update

**Type:** `PieLikeUpdateAnimation | undefined`

:::note{title="説明"}
円グラフ/ドーナツグラフ/ローズグラフの更新アニメーション設定です。

:::


##### effects

**Type:** `"radial"[] | undefined`

:::note{title="説明"}
円グラフ/ドーナツグラフ/ローズグラフの更新効果です。径方向アニメーションをサポートします。

:::

##### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
現在のアニメーション段階を有効にするかどうかです。

:::

##### ease

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションのイージング関数です。

:::

##### duration

**Type:** `number | undefined`

:::note{title="説明"}
アニメーション時間です。単位はミリ秒です。

:::

##### color

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションの強調色またはアンビエント色です。

:::

#### loop

**Type:** `PieLikeAnimationLoop | undefined`

:::note{title="説明"}
円グラフ/ドーナツグラフ/ローズグラフのループアニメーション設定です。

:::


##### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
ループアニメーションを有効にするかどうかです。

:::

##### interval

**Type:** `number | undefined`

:::note{title="説明"}
ループアニメーションの間隔です。単位はミリ秒です。

:::

##### loop

**Type:** `PieLikeLoopAnimation | undefined`

:::note{title="説明"}
円グラフ/ドーナツグラフ/ローズグラフのループアニメーション設定です。

:::


###### effects

**Type:** `PieLikeLoopEffect[] | undefined`

:::note{title="説明"}
円グラフ/ドーナツグラフ/ローズグラフのループ効果です。

:::

###### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
現在のアニメーション段階を有効にするかどうかです。

:::

###### ease

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションのイージング関数です。

:::

###### duration

**Type:** `number | undefined`

:::note{title="説明"}
アニメーション時間です。単位はミリ秒です。

:::

###### color

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションの強調色またはアンビエント色です。

:::

##### atmosphere

**Type:** `NoEffectAtmosphereConfig | undefined`

:::note{title="説明"}
円グラフ/ドーナツグラフ/ローズグラフのアンビエントアニメーション設定です。

:::


###### ease

**Type:** `string | undefined`

:::note{title="説明"}
アンビエントアニメーションのイージング関数です。

:::

###### color

**Type:** `string | undefined`

:::note{title="説明"}
アンビエントアニメーションの色です。

:::


## theme

**Type:** `Theme | undefined`

:::note{title="説明"}
チャートのテーマです。テーマは優先度の低い機能設定で、すべてのチャートタイプに共通する汎用設定と、単一チャートタイプに共通するチャート設定を含みます。



light と dark の 2 種類のテーマが組み込まれています。ユーザーは Builder でテーマをカスタマイズできます。



テーマ



light と dark の 2 種類のテーマが組み込まれています。新しいテーマは registerTheme でカスタマイズできます。

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



チャートの言語設定です。'zh\-CN' と 'en\-US' の 2 言語をサポートします。また、intl.setLocale('zh\-CN') メソッドを呼び出して言語を設定できます。

:::

