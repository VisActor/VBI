# Table

:::info{title="推奨"}
\- 推奨フィールド設定: `任意`個のメジャー、`任意`個のディメンション

\- データ再形成に対応: 少なくとも`任意`個のメジャー、`任意`個のディメンション

:::

:::info{title="エンコーディングマッピング"}
ディメンションツリーとメジャーツリーの設定のみをサポートし、デフォルトでは column に encoding されます。

:::

:::note{title="説明"}
テーブルは、詳細データを表示するシーンに適しています。行と列が明確で、具体的な数値を確認しやすくなります。

適用シーン:

\- 詳細なデータ明細を表示する必要がある場合

\- データ項目を正確に比較する必要がある場合

\- 多次元データの属性を表示する場合

:::

:::warning{title="Warning"}
データ要件:

\- 少なくとも 1 個のディメンションフィールド

\- 少なくとも 1 個のメジャーフィールド

\- ディメンションフィールドはテーブルの列見出しになります

デフォルトで有効な機能:

\- ソート、フィルター、ページネーション機能がデフォルトで有効です

:::


## chartType

**Type:** `"table"`

:::note{title="説明"}
詳細データを表示するための標準テーブルコンポーネントです。

:::

**例**
```ts
'table'




```
## dataset

**Type:** `Record[]`

:::note{title="説明"}
TidyData 仕様に準拠し、すでに集計済みのデータセットです。チャートのデータソースと構造を定義するために使用します。ユーザーが入力したデータセットに処理は不要です。1 つのフィールドが 1 列に対応し、1 つのレコードが 1 行に対応します。

:::

**例**
```ts
[{id: 1, name: "A", value: 100}, {id: 2, name: "B", value: 200}]




```
## dimensions

**Type:** `DimensionTree | undefined`

:::note{title="説明"}
テーブルの各ディメンションは 1 列に対応します。

:::

**例**
```ts
[{id: "name", alias: "名称"}]




```
### id

**Type:** `string`

### alias

**Type:** `string | undefined`

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

**Type:** `"row" | "column" | undefined`

:::note{title="説明"}
ディメンションをマッピングするチャネルです。

\- row: 複数のディメンションを行チャネルにマッピングできます

\- column: 複数のディメンションを列チャネルにマッピングできます

:::

### children

**Type:** `(TableDimension | DimensionGroup)[] | undefined`


#### id

**Type:** `string`

#### alias

**Type:** `string | undefined`

#### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title="説明"}
ディメンションの時間フォーマット設定です。

:::


##### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title="説明"}
時間粒度です。日付の表示精度を決定します。

:::

#### encoding

**Type:** `"row" | "column" | undefined`

:::note{title="説明"}
ディメンションをマッピングするチャネルです。

\- row: 複数のディメンションを行チャネルにマッピングできます

\- column: 複数のディメンションを列チャネルにマッピングできます

:::


## measures

**Type:** `MeasureTree | undefined`

:::note{title="説明"}
テーブルの各メジャーは 1 行に対応し、メジャーの組み合わせを標準でサポートします。

:::

**例**
```ts
[{id: "value", alias: "数値"}]




```
### id

**Type:** `string`

:::note{title="説明"}
メジャーグループ id です。重複できません。

:::

### alias

**Type:** `string | undefined`

:::note{title="説明"}
メジャーグループのエイリアスです。重複を許可します。未入力の場合、alias は id になります。

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

**Type:** `"column" | undefined`

:::note{title="説明"}
メジャーをマッピングするチャネルです。

\- column: メジャー列

:::

### parentId

**Type:** `string | undefined`

:::note{title="説明"}
フラットなメジャー設定形式でツリー状のメジャーグループを構築します。parentId は親メジャーグループの id を指し、メジャーツリーの構築に使用します。

:::

:::tip{title="Tip"}
メジャーツリーの設定には 2 つの形式があります。1 つ目は children を持つメジャーツリーを直接設定する方法、2 つ目は parentId を持つフラットなメジャーリストを設定する方法です。この 2 つの形式を同時に設定することはできません。

:::

### children

**Type:** `(TableMeasure | MeasureGroup)[] | undefined`

:::note{title="説明"}
メジャーグループの子メジャー、または子メジャーグループです。

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
背景色には、'red'、'blue' などの色文字列を指定できます。また、'#ff0000'、'rgba(255,0,0,0.5)' などの hex、rgb、rgba も指定できます。

:::


## borderColor

**Type:** `string | undefined`

:::note{title="説明"}
テーブルの枠線色です。

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title="説明"}
テーブル本体のフォントサイズです。

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title="説明"}
テーブル本体のフォント色です。

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
テーブル本体の背景色です。

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title="説明"}
列ヘッダーのフォントサイズです。

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title="説明"}
列ヘッダーのフォント色です。

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
列ヘッダーの背景色です。

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
マウスが列ヘッダーのセル上にあるときの背景色です。マウスが置かれているセルを強調表示するために使用します。

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
マウスが列ヘッダー上にあるときの行全体のセル背景色です。マウスが置かれている行を強調表示するために使用します。

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
選択されたセルの枠線色です。選択されたセルを強調表示するために使用します。

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
選択されたセルの背景色です。選択されたセルを強調表示するために使用します。

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title="説明"}
テーブル本文部分のセルに特殊なスタイルを設定します。

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title="説明"}
データセレクター



selector を設定した場合、数値 selector、局所データ selector、条件付きディメンション selector、条件付きメジャー selector の 4 種類のデータマッチング機能を提供します。

selector を設定しない場合、スタイルはグローバルに有効になります。



注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります。

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

フィールド列フィルター
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




```
#### field

**Type:** `string | string[]`

:::note{title="説明"}
フィールド名です。単一フィールドまたは複数フィールドの配列を指定できます。

:::

**例**
```ts
単一フィールド
field: 'sales'

複数フィールド
field: ['sales', 'profit', 'revenue']



```
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

**Type:** `TableDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（コード駆動）



AI が生成した JavaScript コードによって、複雑なデータフィルタリングロジックを実装します。

Top N、統計分析、複雑条件など、静的な selector では表現しにくいシーンに適しています。



主な機能:

\- 任意の複雑なデータフィルター条件をサポートします

\- 組み込みユーティリティ関数を使用してデータ操作を行います

\- ブラウザー環境内で安全に実行します（Web Worker サンドボックス）



環境要件: ブラウザー環境のみをサポートします。Node.js 環境では fallback を使用します。



注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります。



テーブルの動的フィルター設定です。



AI が生成した JavaScript コードによって、テーブルのセルレベルの精密なフィルターを実装します。

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
"売上高が 1000 を超えるセルをハイライトする"

"各行で最大値があるセルをハイライトする"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルターコードです。



\- 組み込みユーティリティ関数のみ使用できます（_ または R からアクセス）

\- 入力パラメータ: data（配列）。各 item には行番号を表す _index フィールドが含まれます

\- セルセレクター配列を返す必要があります: ``Array<{ __row_index: number, field: string }>``

\- field が "*" の場合は、行全体のハイライトを表します

\- 使用禁止: eval, Function, 非同期操作, DOM API, ネットワークリクエスト

:::

**例**
```ts
Top N フィルター
dynamicFilter = {
type: 'row\-with\-field',
description: '売上高が最も高い上位 3 個の製品をハイライトする',
code: `
const sorted = _.sortBy(data, 'sales');
const reversed = [...sorted].reverse();
const result = _.take(reversed, 3);
return _.flatten(
`_.map(result, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

複数条件フィルター
dynamicFilter = {
type: 'row\-with\-field',
description: '利益率が 20% を超え、かつ売上高が 5000 を超える製品をハイライトする',
code: `
const matched = _.filter(data, item => {
const profitRate = (item.profit / item.sales) * 100;
return profitRate > 20 && item.sales > 5000;
});
return _.flatten(
`_.map(matched, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

相対値フィルター
dynamicFilter = {   *
type: 'row\-with\-field',
description: '売上高が平均値を上回る製品をハイライトする',
code: `
const avgSales = _.meanBy(data, 'sales');
const matched = _.filter(data, item => item.sales > avgSales);
return _.flatten(
`_.map(matched, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

グループ別フィルター
dynamicFilter = {
type: 'row\-with\-field',
description: '各地域で売上高が最も高い製品',
code: `
const grouped = _.groupBy(data, 'region');
const topByRegion = _.map(_.values(grouped), group => _.maxBy(group, 'sales'));
return _.flatten(
`_.map(topByRegion, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

行全体をハイライト
dynamicFilter = {
description: '売上高が利益を上回る行全体をハイライトする',
code: `
const matched = _.filter(data, item => item.sales > item.profit);
`return matched.map(item => ({`
__row_index: item._index,
field: '*'
}));
`,
enabled: true
}



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

### backgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
セルの背景色です。

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title="説明"}
背景色のカラースケール設定を有効にするかどうかです。

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title="説明"}
セル背景色の scale マッピングです。backgroundColor より優先度が高くなります。

:::


#### minValue

**Type:** `number | undefined`

:::note{title="説明"}
最小値です。未設定の場合は、現在のデータ列内の最小値がデフォルトになります。

:::

#### maxValue

**Type:** `number | undefined`

:::note{title="説明"}
最大値です。未設定の場合は、現在のデータ列内の最大値がデフォルトになります。

:::

#### minColor

**Type:** `string`

:::note{title="説明"}
最小値に対応する色です。

:::

#### maxColor

**Type:** `string`

:::note{title="説明"}
最大値に対応する色です。

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title="説明"}
背景データバー（現在のセルの大きさを表示する横棒）機能を有効にするかどうかです。デフォルトでは有効ではありません。

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title="説明"}
現在のセル値が正数のときの背景データバーの色です。

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title="説明"}
数値が負数のときの背景データバーの色です。

:::

### barMin

**Type:** `number | undefined`

:::note{title="説明"}
進捗バーの最小値



未設定の場合は、列の最小値を自動計算します。

:::

### barMax

**Type:** `number | undefined`

:::note{title="説明"}
進捗バーの最大値



未設定の場合は、列の最大値を自動計算します。

:::

### textColor

**Type:** `string | undefined`

:::note{title="説明"}
セルの文字色です。

:::

### textFontSize

**Type:** `number | undefined`

:::note{title="説明"}
セルの文字サイズです。

:::

### borderColor

**Type:** `string | undefined`

:::note{title="説明"}
セルの枠線色です。

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title="説明"}
セルの枠線幅です。

:::


## totals

**Type:** `TotalType | undefined`

:::note{title="説明"}
集計行の表示タイプです。メジャー列にのみ有効です。

\- 'sum': 合計行を表示します

\- 'avg': 平均値行を表示します

\- 'max': 最大値行を表示します

\- 'min': 最小値行を表示します

\- 'count': 件数行を表示します



テーブル集計行のタイプです。

\- 'sum': 合計

\- 'avg': 平均値

\- 'max': 最大値

\- 'min': 最小値

\- 'count': 件数

:::

**例**
```ts
'sum'




```
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


## locale

**Type:** `Locale | undefined`

:::note{title="説明"}
チャートの言語設定です。'zh\-CN' と 'en\-US' の 2 つの言語をサポートします。また、intl.setLocale('zh\-CN') メソッドを呼び出して言語を設定できます。

:::
