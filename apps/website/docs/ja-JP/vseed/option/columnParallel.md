# ColumnParallel

:::info{title="推奨"}
\- 推奨フィールド設定: `1`個のメジャー、`2`個のディメンション

\- データ再形成に対応: 少なくとも`1`個のメジャー、`0`個のディメンション

:::

:::info{title="エンコーディングマッピング"}
並列縦棒グラフは次の視覚チャネルをサポートします:

`xAxis`  : x 軸チャネル。`複数のディメンション`をサポートし、ディメンション値を x 軸にマッピングします

`yAxis`  : y 軸チャネル。`複数のメジャー`をサポートし、メジャー値を y 軸にマッピングします

`detail` : 詳細チャネル。`複数のディメンション`をサポートし、同じ色系列の下でより細かい粒度のデータを表示するときに使用します

`color`  : 色チャネル。`複数のディメンション`または `1 つのメジャー`をサポートします。ディメンション色は異なるデータ系列の区別に使用し、メジャー色はメジャー値をグラフィック色へ線形マッピングするために使用します

`tooltip`: ツールチップチャネル。`複数のディメンション`と `複数のメジャー`をサポートし、マウスがデータポイントにホバーしたときに表示します

`label`  : ラベルチャネル。`複数のディメンション`と `複数のメジャー`をサポートし、データポイント上にデータラベルを表示します

:::

:::note{title="説明"}
並列縦棒グラフは、複数メジャーを並行して比較するシーンに適しています。複数の棒を横に並べ、異なるメジャー値を表示します。

適用シーン:

\- 同一ディメンション内で複数メジャーを並行比較する場合

\- 多次元データを横断的に比較する場合

\- メジャー間の関連性を分析する場合

:::

:::warning{title="Warning"}
データ要件:

\- 少なくとも 1 個のメジャーフィールド（メジャー）が必要です

\- 最初のディメンションは X 軸に配置されます。残りのディメンションは、メジャー名（複数メジャーが存在する場合）と結合され、凡例項目として表示されます。

\- すべてのメジャーは自動的に 1 つのメジャーに結合されます

デフォルトで有効な機能:

\- 凡例、座標軸、データラベル、ツールチップ、メジャーのソートがデフォルトで有効です

:::


## chartType

**Type:** `"columnParallel"`

:::note{title="説明"}
並列縦棒グラフは、複数メジャーを並行して比較するシーンに適しています。

:::

**例**
```ts
'columnParallel'




```
## dataset

**Type:** `Record[]`

:::note{title="説明"}
データセット。TidyData 仕様に準拠し、すでに集計済みのデータセットです。チャートのデータソースと構造を定義するために使用します。ユーザーが入力したデータセットに処理は不要です。VSeed は強力なデータ再形成機能を備えており、自動的にデータを再形成します。並列縦棒グラフのデータは最終的に 2 個のディメンション、1 個のメジャーへ変換されます。

:::

**例**
```ts
[{category:'A', value1:100, value2:200}, {category:'B', value1:150, value2:250}]




```
## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title="説明"}
ディメンション。最初のディメンションは X 軸にマッピングされます。残りのディメンションは、メジャー名（複数メジャーが存在する場合）と結合され、凡例項目として表示されます。

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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title="説明"}
ディメンションをマッピングするチャネルです。

\- xAxis: 複数のディメンションを x 軸にマッピングできます

\- color: 複数のディメンションを色チャネルにマッピングできます

\- detail: 複数のディメンションを詳細チャネルにマッピングできます

\- tooltip: 複数のディメンションをツールチップチャネルにマッピングできます

\- label: 複数のディメンションをラベルチャネルにマッピングできます

\- row: 複数のディメンションを行チャネルにマッピングできます

\- column: 複数のディメンションを列チャネルにマッピングできます

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title="説明"}
メジャー。並列縦棒グラフのすべてのメジャーは自動的に 1 つのメジャーへ結合され、Y 軸にマッピングされます。複数メジャーが存在する場合、メジャー名はその他のディメンションと結合され、凡例項目として表示されます。

:::

**例**
```ts
[{id: 'value1', alias: 'メジャー1'}, {id: 'value2', alias: 'メジャー2'}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title="説明"}
メジャーをマッピングするチャネルです。

\- yAxis: メジャーを y 軸にマッピングします

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
チャートの背景色です。背景色には色文字列を指定できます。例: 'red', 'blue'。hex、rgb、rgba（'#ff0000', 'rgba(255,0,0,0.5)'）も指定できます

:::


## color

**Type:** `Color | undefined`

:::note{title="説明"}
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

same as operator

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

same as operator

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


## legend

**Type:** `Legend | undefined`

:::note{title="説明"}
凡例設定です。凡例の位置、フォーマット、スタイルなど、チャートの凡例を定義するために使用します。

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
凡例のフォント色です。

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
凡例の位置です。

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
## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title="説明"}
プロット領域の内側余白



VChart の region[0].padding にマッピングされ、注釈やラベルなどプロット領域の外側へ広がる要素のための余白を確保します。

:::


### top

**Type:** `number | undefined`

### right

**Type:** `number | undefined`

### bottom

**Type:** `number | undefined`

### left

**Type:** `number | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title="説明"}
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



brush のブラシ選択能力を有効/無効にするためのブラシ選択設定です。



チャートのブラシ選択設定です。

:::


### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
brush ブラシ選択を有効にするかどうかです。

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title="説明"}
brush のタイプです。



ブラシ範囲の形状とブラシ選択方向を定義します。

\- `rect`: 矩形ブラシ選択です。X 軸と Y 軸の 2 方向で同時にブラシ選択できます

\- `polygon`: 多角形ブラシ選択です。複数の点をクリックして任意の多角形を描画し、ブラシ選択します

\- `x`: X 軸方向のブラシ選択です。X 軸方向のみでブラシ選択し、Y 軸方向は制限しません

\- `y`: Y 軸方向のブラシ選択です。Y 軸方向のみでブラシ選択し、X 軸方向は制限しません

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title="説明"}
ブラシ選択モードです。単一選択か複数選択かを指定します。



ブラシ選択のモードを定義します。

\- `single`: 単一選択モードです。一度に 1 つのブラシ範囲だけを持てます

\- `multiple`: 複数選択モードです。複数のブラシ範囲を同時に持てます

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title="説明"}
ブラシ選択終了時に選択範囲をクリアするかどうかです。

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
不透明度



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
不透明度



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

**Type:** `BarLikeAnimation | undefined`

:::note{title="説明"}
アニメーション設定



チャートアニメーション設定です。選択可能な効果はチャートタイプによって制約されます

:::


### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
横棒/縦棒グラフのアニメーションを有効にするかどうか

:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title="説明"}
横棒/縦棒グラフのアニメーションパラメーター

:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title="説明"}
横棒/縦棒グラフの入場アニメーション設定

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title="説明"}
横棒/縦棒グラフの入場効果です。成長アニメーションをサポートします

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

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title="説明"}
横棒/縦棒グラフの更新アニメーション設定

:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title="説明"}
横棒/縦棒グラフの更新効果です。成長と移入アニメーションをサポートします

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

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title="説明"}
横棒/縦棒グラフのループアニメーション設定

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

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title="説明"}
横棒/縦棒グラフのループアニメーション設定

:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title="説明"}
横棒/縦棒グラフのループ効果

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

**Type:** `PointAtmosphereConfig | undefined`

:::note{title="説明"}
横棒/縦棒グラフの雰囲気アニメーション設定

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

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title="説明"}
雰囲気アニメーション効果，リップル、表示/非表示、呼吸効果に対応します

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title="説明"}
x 軸。カテゴリ軸です。チャートの x 軸の位置、フォーマット、スタイルなどを定義する x 軸設定です。

:::


### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
軸を表示するかどうか

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

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title="説明"}
軸ラベルの自動非表示です。2 つのラベルが重なった場合（間隔が autoHideGap より小さい場合）、重なりの原因となるラベルを自動的に非表示にします。カテゴリ軸にのみ有効です。

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title="説明"}
軸ラベルの自動非表示間隔です。2 つのテキストラベルの間隔が autoHideGap より小さい場合、重なりの原因となるラベルを自動的に非表示にします。カテゴリ軸にのみ有効です。

autoHide が有効な場合は autoHide を使用し、autoHideSeparation に設定します

autoHide が無効な場合は sampling サンプリングを使用し、minGap に設定します

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
軸ラベルの自動長さ制限です。ラベル幅が軸長を超える場合、超過部分を省略記号で表示し、マウスホバー後にラベルを確認できます。ラベル幅を自動的に制限します。カテゴリ軸にのみ有効です。

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title="説明"}
軸ラベルの自動長さ制限の最大長です。ラベルテキスト長が最大長を超える場合、超過部分を省略記号で表示し、マウスホバー後にラベルを確認できます。カテゴリ軸にのみ有効です。

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
X 軸アニメーション設定

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
y 軸。数値軸です。チャートの y 軸の位置、フォーマット、スタイルなどを定義する y 軸設定です。

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
数値軸の目盛りラベルを自動フォーマットするかどうか, 数値軸でのみ有効です, autoFormat が true の場合、numFormat 設定は無効になります

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="説明"}
数値軸の数値フォーマット, 数値軸でのみ有効です, 優先度は autoFormat より低くなります

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


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title="説明"}
縦方向ツールチップ設定です。縦方向ツールチップの色やラベルスタイルなどを定義します。



クロスヘア矩形領域設定です。チャート内にクロスヘアの矩形領域を表示するための設定タイプです

:::


### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
クロスヘア矩形領域を表示するかどうか

:::

### rectColor

**Type:** `string | undefined`

:::note{title="説明"}
クロスヘア矩形領域の色

:::

### labelColor

**Type:** `string | undefined`

:::note{title="説明"}
クロスヘア矩形領域ラベルの色

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
クロスヘア矩形領域ラベルを表示するかどうか

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
クロスヘア矩形領域ラベルの背景色

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title="説明"}
縦棒グラフの積み上げ角丸

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title="説明"}
棒の最大幅です。ピクセル値または百分率文字列を指定できます

:::


## barGapInGroup

**Type:** `string | number | undefined`

:::note{title="説明"}
同一カテゴリ内での棒同士の距離です。ピクセル値または百分率文字列を指定できます

:::


## sort

**Type:** `Sort | undefined`

:::note{title="説明"}
X 軸のソート設定です。ディメンションまたはメジャーに基づくソート、およびカスタムソート順をサポートします



カテゴリ軸のソート設定です。ディメンションまたはメジャーに基づくソート、およびカスタムの並び順に対応します。

:::

**例**
```ts
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}

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


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title="説明"}
凡例のソート設定です。ディメンションまたはメジャーに基づくソート、およびカスタムソート順をサポートします



凡例のソート設定です。ディメンションまたはメジャーに基づくソート、およびカスタムソート順をサポートします。ソート配列は左から右、または上から下の順序に従います

:::

**例**
```ts
sortLegend: {
  orderBy: 'profit',
  order: 'asc',
}
sortLegend: {
  customOrder:['2019', '2020', '2021']
}

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
カスタムソート順です。この順序は凡例に直接適用されます。昇順は左から右または上から下、降順は右から左または下から上になります

:::


## theme

**Type:** `Theme | undefined`

:::note{title="説明"}
チャートのテーマです。テーマは優先度が低い機能設定で、すべてのチャートタイプで共通する汎用設定と、単一チャートタイプで共通するチャート設定を含みます。light と dark の 2 種類の組み込みテーマがあり、ユーザーは Builder を通じてテーマをカスタマイズできます。



テーマ



light と dark の 2 種類の組み込みテーマがあります。新しいテーマは registerTheme によってカスタマイズできます。

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


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title="説明"}
矩形マークスタイル。並列縦棒グラフのスタイル設定で、並列縦棒グラフの色、枠線、角丸などを定義します。

グローバルスタイルまたは条件付きスタイル設定に対応します

データフィルター

selector を設定した場合、数値 selector、局所データ selector、条件付きディメンション selector、条件付きメジャー selector の 4 種類のデータマッチング機能を提供します。

selector を設定しない場合、スタイルはグローバルに有効になります。

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="説明"}
データセレクター



selector を設定した場合、数値 selector、局所データ selector、条件付きディメンション selector、条件付きメジャー selector の 4 種類のデータマッチング機能を提供します。

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

条件付きディメンションセレクター
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

条件付きメジャーセレクター
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

\- in: データ項目のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目のディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子です。

\- in: データ項目のディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: データ項目のディメンションフィールドの値が value に含まれないデータ項目を選択します

same as operator

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

Top N、統計分析、複雑条件など、静的な selector では表現しにくいシーンに適しています。



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

same as operator

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

### barVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
棒マーク（矩形マーク）を表示するかどうか

:::

### barColor

**Type:** `string | undefined`

:::note{title="説明"}
棒マーク（矩形マーク）の色

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title="説明"}
棒マーク（矩形マーク）の色の不透明度

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
棒マーク（矩形マーク）の枠線色

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
棒マーク（矩形マーク）の枠線幅

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="説明"}
棒マーク（矩形マーク）の枠線スタイル

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
棒マーク（矩形マーク）の角丸



棒マーク（矩形マーク）のストローク不透明度

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
注釈ポイント



注釈ポイント設定です。選択したデータに基づいて、注釈ポイントの位置、フォーマット、スタイルなどを定義します。

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="説明"}
注釈ポイントのセレクターです。データポイントを選択するために使用します。

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

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目のディメンションフィールドの値を選択します。配列をサポートします。

:::

### measureId

**Type:** `string | undefined`

:::note{title="説明"}
注釈点が属するメジャー id を指定します。複数 measure のシーンでは selector と組み合わせて、対象メジャーに対応する注釈点を一意に特定できます。

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（AI 生成コードの実行）



AI が生成した JavaScript コードによって、複雑なデータフィルタリングロジックを実装します。

Top N、統計分析、複雑条件など、静的な selector では表現しにくいシーンに適しています。



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

same as operator

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
注釈ポイント全体の Y 方向のピクセルオフセット距離です。注釈ポイントがチャート上側（数値が大きい場合）にあるときは正の値、チャート下側（数値が小さい場合）にあるときは負の値を推奨します。

負の値では全体が上方向にオフセットされます。例えば \-10 を設定すると、注釈ポイントコンポーネント全体（テキストとテキスト背景を含む）が上方向に 10 ピクセルオフセットされます

正の値では全体が下方向にオフセットされます。例えば 10 を設定すると、注釈ポイントコンポーネント全体（テキストとテキスト背景を含む）が下方向に 10 ピクセルオフセットされます

:::

**例**
```ts
offsetY: 5, 注釈点全体を下方向に 5 ピクセルオフセットします



```
### offsetX

**Type:** `number | undefined`

:::note{title="説明"}
注釈ポイント全体の X 方向のピクセルオフセット距離です。注釈ポイントがチャート左側（カテゴリ軸の始点）にあるときは正の値、チャート右側（カテゴリ軸の終点）にあるときは負の値を推奨します。

負の値では全体が左方向にオフセットされます。例えば \-10 を設定すると、注釈ポイントコンポーネント全体（テキストとテキスト背景を含む）が左方向に 10 ピクセルオフセットされます

正の値では全体が右方向にオフセットされます。例えば 10 を設定すると、注釈ポイントコンポーネント全体（テキストとテキスト背景を含む）が右方向に 10 ピクセルオフセットされます

:::

**例**
```ts
offsetX: 5, 注釈点全体を右方向に 5 ピクセルオフセットします




```
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title="説明"}
ディメンション値の注釈線です。垂直方向に表示し、注釈線の位置やスタイルなどを設定できます

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="説明"}
固定の x 値, 垂直線の注釈に使用します, カテゴリ軸が x 方向の場合, ディメンション値を入力できます, 数値軸が x 方向の場合, 具体的な数値を入力できます

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（AI 生成コードの実行）



AI が生成した JavaScript コードで注釈線の値を動的に計算します

平均値、最大値、分位数、業務基準線など、データに基づいて注釈線の位置を動的に決定する必要がある場合に適しています



ブラウザー環境のみ対応します（Web Worker が必要です）

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="説明"}
ユーザーのフィルター要件の説明（自然言語）です。

:::

**例**
```ts
"売上高が最大の値を注釈線の参照値として取得する"

"平均売上高を計算して注釈線に使用する"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルターコードです。



\- 組み込みユーティリティ関数のみ使用できます（_ または R からアクセス）

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
注釈テキスト

:::

**例**
```ts
'注釈テキスト'



```
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="説明"}
テキスト位置。注釈線のラベル位置（線に対するラベルの相対位置）です。

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
数値注釈線（平均線、最大値線、最小値線など）です。水平方向に表示し、注釈線の位置やスタイルなどを設定できます。平均線など数値に対応する注釈線を描画する場合は、この設定を使用してください

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="説明"}
固定の y 値, 水平線の注釈に使用します, カテゴリ軸が y 方向の場合, ディメンション値を入力できます, 数値軸が y 方向の場合, 具体的な数値を入力できます

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（AI 生成コードの実行）



AI が生成した JavaScript コードで注釈線の値を動的に計算します

平均値、最大値、分位数、業務基準線など、データに基づいて注釈線の位置を動的に決定する必要がある場合に適しています



ブラウザー環境のみ対応します（Web Worker が必要です）

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="説明"}
ユーザーのフィルター要件の説明（自然言語）です。

:::

**例**
```ts
"売上高が最大の値を注釈線の参照値として取得する"

"平均売上高を計算して注釈線に使用する"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルターコードです。



\- 組み込みユーティリティ関数のみ使用できます（_ または R からアクセス）

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
注釈領域



注釈領域設定です。選択したデータに基づいて、注釈領域の位置、スタイルなどを定義します。

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title="説明"}
選択されたデータに依存します, データマークを行います.

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

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目のディメンションフィールドの値を選択します。配列をサポートします。

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
'center' テキストは注釈領域の中央にあります



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
## annotationDifferenceLine

**Type:** `AnnotationDifferenceLine | AnnotationDifferenceLine[] | undefined`

:::note{title="説明"}
差分注釈線設定です。2 つのデータアンカーを結び付け、絶対差分または百分率差分を表示します。

:::


### start

**Type:** `DifferenceAnchor`

:::note{title="説明"}
差分注釈線の開始アンカーです。



差分注釈アンカー設定です。開始点または終了点に結び付けるデータを選択するために使用します。

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title="説明"}
アンカーセレクターです。最終的に 1 つの論理アンカーを特定する必要があります。

:::

**例**
```ts
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




```
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

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目のディメンションフィールドの値を選択します。配列をサポートします。

:::

### end

**Type:** `DifferenceAnchor`

:::note{title="説明"}
差分注釈線の終了アンカーです。



差分注釈アンカー設定です。開始点または終了点に結び付けるデータを選択するために使用します。

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title="説明"}
アンカーセレクターです。最終的に 1 つの論理アンカーを特定する必要があります。

:::

**例**
```ts
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




```
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

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目のディメンションフィールドの値を選択します。配列をサポートします。

:::

### differenceType

**Type:** `"percent" | "absolute" | undefined`

:::note{title="説明"}
差分値の種類です。

\- absolute: 絶対差分を表示します。計算方法は end - start です

\- percent: 百分率差分を表示します。計算方法は (end - start) / start です

:::

### textFontSize

**Type:** `number | undefined`

:::note{title="説明"}
テキストのフォントサイズ。

:::

### textColor

**Type:** `string | undefined`

:::note{title="説明"}
テキストの色。

:::

### textBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
テキストの背景色。

:::

### lineColor

**Type:** `string | undefined`

:::note{title="説明"}
線の色。

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="説明"}
線のスタイル。

:::


## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title="説明"}
チャートでピボット機能またはメジャー結合が有効な場合、ディメンション連動機能を有効にするかどうか

特定のディメンション値に hover したとき、他のチャート内の同じディメンション値のデータを連動してハイライトします



ピボットチャートのディメンション連動設定

:::


### enable

**Type:** `false | true`

:::note{title="説明"}
ピボットチャートのディメンション連動を有効にするかどうか

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title="説明"}
すべてのディメンションに対応するサブチャートの Tooltip ツールチップを表示するかどうか

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title="説明"}
crosshair に対応するラベルを表示するかどうか

:::


## locale

**Type:** `Locale | undefined`

:::note{title="説明"}
言語



チャートの言語設定です。'zh\-CN' と 'en\-US' の 2 つの言語をサポートします。

:::

