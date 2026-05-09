# Bar

:::info{title="推奨"}
\- 推奨フィールド設定: `1`個メジャー、 `2`個ディメンション

\- データ再形成に対応: 少なくとも`1`個メジャー、 `0`個ディメンション

:::

:::info{title="エンコーディングマッピング"}
横棒グラフは、次の視覚チャネルをサポートします:

`yAxis`  : y 軸チャネル。`複数のディメンション`をサポートし、ディメンション値に基づいて y 軸へマッピングします

`xAxis`  : x 軸チャネル。`複数のメジャー`をサポートし、メジャー値に基づいて x 軸へマッピングします

`detail` : 詳細チャネル。`複数のディメンション`をサポートし、同じ色系列の下でより細かい粒度のデータを表示するときに使用します

`color`  : 色チャネル。`複数のディメンション`または `1 つのメジャー`をサポートします。ディメンション色は異なるデータ系列の区別に使用し、メジャー色はメジャー値をグラフィック色へ線形マッピングするために使用します

`tooltip`: ツールチップチャネル。`複数のディメンション`と `複数のメジャー`をサポートし、マウスがデータポイントにホバーしたときに表示します

`label`  : ラベルチャネル。`複数のディメンション`と `複数のメジャー`をサポートし、データポイント上にデータラベルを表示します

:::

:::note{title="説明"}
横棒グラフは、横方向のデータ比較シーンに適しています。Y 軸はカテゴリ軸（カテゴリデータ）、X 軸は数値軸（連続データ）で、バーは横方向に配置されます。

適用シーン:

\- データ項名称長い時

\- 必要表示データランキング比較

\- 表示正负双向データ

:::

:::warning{title="Warning"}
データ要件:

\- 少なくとも 1 個メジャー（メジャー）

\- 最初のディメンションは Y 軸に設定されます、 その他のディメンションはメジャー名（複数メジャーが存在する場合）と結合されます、 凡例項目として表示されます.

\- すべてのメジャーは自動的に 1 つのメジャーに結合されます

デフォルトで有効な機能:

\- デフォルトで有効な凡例、座標軸、データラベル、ツールチップ

:::


## chartType

**Type:** `"bar"`

:::note{title="説明"}
横棒グラフは、横方向のデータ比較シーンに適しています。Y 軸はカテゴリ軸（カテゴリデータ）、X 軸は数値軸（連続データ）で、バーは横方向に配置されます。

:::

**例**
```ts
'bar'




```
## dataset

**Type:** `Record[]`

:::note{title="説明"}
データソースです。TidyData 仕様に準拠し、すでに集計済みのデータセットです。チャートのデータソースと構造を定義するために使用します。ユーザーが入力したデータセットに処理は不要です。VSeed は強力なデータ再形成機能を備えており、自動的にデータを再形成します。横棒グラフのデータは最終的に 2 個のディメンション、1 個のメジャーへ変換されます。

:::

**例**
```ts
[{date:'2020\-01\-01'、 value:100}、 {date:'2020\-01\-02'、 value:200}]




```
## dimensions

**Type:** `BarDimension[] | undefined`

:::note{title="説明"}
ディメンションです。最初のディメンションは Y 軸にマッピングされます。その他のディメンションはメジャー名（複数メジャーが存在する場合）と結合され、凡例項目として表示されます。

:::

**例**
```ts
[{id: "date", alias: "日付"}, {id: "value", alias: "数値"}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title="説明"}
ディメンションをマッピングするチャネルです。

\- yAxis: 複数のディメンションを y 軸にマッピングできます

\- color: 複数のディメンションを色チャネルにマッピングできます

\- detail: 複数のディメンションを詳細チャネルにマッピングできます

\- tooltip: 複数のディメンションをツールチップチャネルにマッピングできます

\- label: 複数のディメンションをラベルチャネルにマッピングできます

\- row: 複数のディメンションを行チャネルにマッピングできます

\- column: 複数のディメンションを列チャネルにマッピングできます

:::


## measures

**Type:** `BarMeasure[] | undefined`

:::note{title="説明"}
メジャー



メジャーです。横棒グラフのメジャーは自動的に 1 つのメジャーに結合され、X 軸にマッピングされます。複数メジャーが存在する場合、メジャー名はその他のディメンションと結合され、凡例項目として表示されます。

:::

**例**
```ts
[{id: "value"、 alias: "数値"}]




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
メジャーのカスタム数値フォーマットです。label、tooltip に自動的に適用されます。

注意: カスタムフォーマットを使用するには、autoFormat=false を明示的に設定する必要があります。設定しない場合、autoFormat がこの設定を上書きします。

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="説明"}
数値フォーマットの種類です。数値（10 進）、百分比（%）、千分比（‰）、科学表記をサポートします。

:::

#### ratio

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの比率です。0 にはできません。

:::

**例**
```ts
\- 100000 に変換します 10万、 ratio:10000、 symbol:"万"
\- 100000 に変換します 10K、 ratio:1000、 symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの記号です。例: %、‰

:::

**例**
```ts
\- 100000 に変換します 10万、 ratio:10000、 symbol:"万"
\- 100000 に変換します 10K、 ratio:1000、 symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="説明"}
数値フォーマットの桁区切り記号です。

:::

#### suffix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットのサフィックスです。

:::

#### prefix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットのプレフィックスです。

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの小数桁です。ブラウザーが提供する Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits でフォーマットします。優先度は significantDigits より低くなります。

:::

**例**
```ts
\- 1234.5678 に変換します 1235、 fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.6、 fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.57、 fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1230.568、 fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.5678、 fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.56780、 fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの有効桁です。ブラウザーが提供する Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits でフォーマットします。優先度は fractionDigits より高くなります。

:::

**例**
```ts
\- 1234.5678 に変換します 1000、 significantDigits:1
\- 1234.5678 に変換します 1200、 significantDigits:2
\- 1234.5678 に変換します 1230、 significantDigits:3
\- 1234.5678 に変換します 1234、 significantDigits:4
\- 1234.5678 に変換します 1234.6、 significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.57、 significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.568、 significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.5678、 significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="説明"}
数値フォーマットの丸め優先度です。significantDigits と fractionDigits が同時に設定された場合の丸め優先度を扱います。ブラウザーが提供する Intl.NumberFormat でフォーマットし、規則は Intl.NumberFormat の roundingPriority と同じです。

:::

**例**
```ts
\- 1234.5678 に変換します 1230、 significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 に変換します 1234.5678、 significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="説明"}
数値フォーマットの丸めモードです。ブラウザーが提供する Intl.NumberFormat でフォーマットし、規則は Intl.NumberFormat の roundingMode と同じです。

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="説明"}
数値フォーマットの種類です。数値（10 進）、百分比（%）、千分比（‰）、科学表記をサポートします。

:::

#### ratio

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの比率です。0 にはできません。

:::

**例**
```ts
\- 100000 に変換します 10万、 ratio:10000、 symbol:"万"
\- 100000 に変換します 10K、 ratio:1000、 symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの記号です。例: %、‰

:::

**例**
```ts
\- 100000 に変換します 10万、 ratio:10000、 symbol:"万"
\- 100000 に変換します 10K、 ratio:1000、 symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="説明"}
数値フォーマットの桁区切り記号です。

:::

#### suffix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットのサフィックスです。

:::

#### prefix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットのプレフィックスです。

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの小数桁です。ブラウザーが提供する Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits でフォーマットします。優先度は significantDigits より低くなります。

:::

**例**
```ts
\- 1234.5678 に変換します 1235、 fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.6、 fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.57、 fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1230.568、 fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.5678、 fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.56780、 fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの有効桁です。ブラウザーが提供する Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits でフォーマットします。優先度は fractionDigits より高くなります。

:::

**例**
```ts
\- 1234.5678 に変換します 1000、 significantDigits:1
\- 1234.5678 に変換します 1200、 significantDigits:2
\- 1234.5678 に変換します 1230、 significantDigits:3
\- 1234.5678 に変換します 1234、 significantDigits:4
\- 1234.5678 に変換します 1234.6、 significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.57、 significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.568、 significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.5678、 significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="説明"}
数値フォーマットの丸め優先度です。significantDigits と fractionDigits が同時に設定された場合の丸め優先度を扱います。ブラウザーが提供する Intl.NumberFormat でフォーマットし、規則は Intl.NumberFormat の roundingPriority と同じです。

:::

**例**
```ts
\- 1234.5678 に変換します 1230、 significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 に変換します 1234.5678、 significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="説明"}
数値フォーマットの丸めモードです。ブラウザーが提供する Intl.NumberFormat でフォーマットし、規則は Intl.NumberFormat の roundingMode と同じです。

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title="説明"}
メジャーをマッピングするチャネルです。

\- xAxis: メジャーをマッピングする x 軸

\- detail: メジャーをマッピングする詳細

\- color: メジャーをマッピングする色

\- label: メジャーをマッピングするラベル

\- tooltip: メジャーをマッピングするツールチップ

:::

### parentId

**Type:** `string | undefined`

:::note{title="説明"}
フラットなメジャー設定形式でツリー状のメジャーグループを構築します。parentId は親メジャーグループの id を指し、メジャーツリーの構築に使用します

:::

:::tip{title="Tip"}
メジャーツリーの設定には 2 つの形式があります。1 つ目は children を持つメジャーツリーを直接設定する方法、2 つ目は parentId を持つフラットなメジャーリストを設定する方法です。この 2 つの方法は同時に設定できません

:::


## page

**Type:** `Page | undefined`

:::note{title="説明"}
ページネーション



ページネーション設定です。チャートのページネーション機能を設定するために使用します。

:::


### field

**Type:** `string`

:::note{title="説明"}
ページネーションフィールドです。ページネーションのフィールド名を指定するために使用し、ディメンションである必要があります。

:::

### currentValue

**Type:** `string`

:::note{title="説明"}
現在のページネーション値です。現在のページネーションの基準値を指定するために使用します。

:::

**例**
```ts
'2023\-01\-01'




```
## backgroundColor

**Type:** `BackgroundColor`

:::note{title="説明"}
チャートの背景色です。デフォルトは透明背景です。背景色には 'red'、'blue' などの色文字列を指定できます。また、hex、rgb、rgba（'#ff0000'、'rgba(255,0,0,0.5)'）も指定できます。

:::


## color

**Type:** `Color | undefined`

:::note{title="説明"}
色



色設定です。チャートのカラースキームを定義するために使用し、色リスト、色マッピング、色グラデーションなどを含みます。

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title="説明"}
離散色のカラースキームです。チャート内の異なる要素の色を定義するために使用します。

:::

**例**
```ts
['#FFCDD2、#F8BBD0、#E1BEE7、#D1C4E9、#C5CAE9、#BBDEFB、#B3E5FC、#B2EBF2、#B2DFDB、#C8E6C9、#DCEDC8、#F0F4C3、#FFF9C4、#FFECB3、#FFE0B2']



```
### linearColorScheme

**Type:** `string[] | undefined`

:::note{title="説明"}
線形グラデーション色のカラースキームです。チャート内の異なる要素の色を定義するために使用します。

:::

**例**
```ts
['#FFCDD2、 #F8BBD0]



```
### colorMapping

**Type:** `Record<string、 string> | undefined`

:::note{title="説明"}
色マッピングです。データ値を具体的な色へマッピングするために使用します。

:::

**例**
```ts
{
 'profit': 'red'、
 'sales': 'blue'、
}



```
### positiveColor

**Type:** `string | undefined`

:::note{title="説明"}
正負色設定です。チャート内の正値の色を定義するために使用します。

:::

### negativeColor

**Type:** `string | undefined`

:::note{title="説明"}
正負色設定です。チャート内の負値の色を定義するために使用します。

:::


## label

**Type:** `Label | undefined`

:::note{title="説明"}
ラベル設定です。チャートのデータラベルを定義するために使用し、データラベルの位置、フォーマット、スタイルなどを含みます。

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

複数メジャーのシーンでも、複数メジャーの値が矛盾する心配はありません。描画に関係するすべてのメジャーは `foldMeasures` で処理され、1 つのメジャーに結合されて 1 つのデータポイントを表すためです。

注意: encoding の label の優先度が高いため、この設定は encoding の label には影響しません。

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルにメジャー値の百分比を表示するかどうか

複数メジャーのシーンでも、複数メジャーの値が矛盾する心配はありません。描画に関係するすべてのメジャーは `foldMeasures` で処理され、1 つのメジャーに結合されて 1 つのデータポイントを表すためです。

注意: encoding の label の優先度が高いため、この設定は encoding の label には影響しません。

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルにディメンションラベルを表示するかどうか

すべてのディメンションラベルを表示します。

注意: encoding の label の優先度が高いため、この設定は encoding の label には影響しません。

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベル数値を自動フォーマットするかどうか。autoFormat が true の場合、numFormat 設定は無効になります。

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="説明"}
ラベル数値のフォーマット設定です。`measure` 内の `format` とマージされ、`measure` 内の `format` の優先度が高くなります。numFormat の優先度は autoFormat より低くなります。

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="説明"}
数値フォーマットの種類です。数値（10 進）、百分比（%）、千分比（‰）、科学表記をサポートします。

:::

#### ratio

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの比率です。0 にはできません。

:::

**例**
```ts
\- 100000 に変換します 10万、 ratio:10000、 symbol:"万"
\- 100000 に変換します 10K、 ratio:1000、 symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの記号です。例: %、‰

:::

**例**
```ts
\- 100000 に変換します 10万、 ratio:10000、 symbol:"万"
\- 100000 に変換します 10K、 ratio:1000、 symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="説明"}
数値フォーマットの桁区切り記号です。

:::

#### suffix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットのサフィックスです。

:::

#### prefix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットのプレフィックスです。

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの小数桁です。ブラウザーが提供する Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits でフォーマットします。優先度は significantDigits より低くなります。

:::

**例**
```ts
\- 1234.5678 に変換します 1235、 fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.6、 fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.57、 fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1230.568、 fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.5678、 fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.56780、 fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの有効桁です。ブラウザーが提供する Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits でフォーマットします。優先度は fractionDigits より高くなります。

:::

**例**
```ts
\- 1234.5678 に変換します 1000、 significantDigits:1
\- 1234.5678 に変換します 1200、 significantDigits:2
\- 1234.5678 に変換します 1230、 significantDigits:3
\- 1234.5678 に変換します 1234、 significantDigits:4
\- 1234.5678 に変換します 1234.6、 significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.57、 significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.568、 significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.5678、 significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="説明"}
数値フォーマットの丸め優先度です。significantDigits と fractionDigits が同時に設定された場合の丸め優先度を扱います。ブラウザーが提供する Intl.NumberFormat でフォーマットし、規則は Intl.NumberFormat の roundingPriority と同じです。

:::

**例**
```ts
\- 1234.5678 に変換します 1230、 significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 に変換します 1234.5678、 significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="説明"}
数値フォーマットの丸めモードです。ブラウザーが提供する Intl.NumberFormat でフォーマットし、規則は Intl.NumberFormat の roundingMode と同じです。

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
ラベルのフォント色を図形要素の色に応じて自動反転するかどうか

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title="説明"}
ラベル位置

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title="説明"}
ラベルの重なり防止機能を有効にするかどうか

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
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

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



AI が生成した JavaScript コードで複雑なデータフィルターロジックを実現します。



主な機能:

\- 任意の複雑なデータフィルター条件をサポートします

\- 組み込みツール関数を使用してデータ操作を行います

\- ブラウザー環境で安全に実行します（Web Worker サンドボックス）



環境要件: ブラウザー環境のみをサポートします。Node.js 環境では fallback を使用します。



注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります。



チャート動的フィルター設定



AI が生成した JavaScript コードでチャートマーク（バー、点など）のフィルタリングを実現します。

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="説明"}
ユーザーのフィルター要件の説明（自然言語）

:::

**例**
```ts
"売上が 1000 を超えるバーをハイライト"

"各地域で利益率が最も高いバーをハイライト"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルターコード



\- 組み込みツール関数のみ使用できます（_ または R でアクセス）

\- 入力パラメータ: data（配列）。各 item には行番号を表す __row_index フィールドが含まれます

\- 行インデックスとフィールドを組み合わせた配列を返す必要があります: ``Array<{ __row_index: number, field: string }>``

\- __row_index は元データ項目の行番号を表し、field はハイライトが必要なフィールドを表します

\- 使用禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**
```ts
売上が 1000 を超えるデータ項目の sales フィールドをハイライト
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目をハイライト
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

複数条件でフィルターしたデータ項目をハイライト
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
ディメンションフィールドです。dimensions のいずれかの項目の id です。

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

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
動的フィルター実行結果（実行時フィールド）



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
凡例設定です。チャートの凡例を定義するために使用し、凡例の位置、フォーマット、スタイルなどを含みます。

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
離散凡例にのみ有効です。

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
ページネーター icon の色

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title="説明"}
ページネーター icon の無効色

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
凡例の形状

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
凡例位置

:::

**例**
```ts
position: 'rightTop'



```
### maxSize

**Type:** `number | undefined`

:::note{title="説明"}
凡例が大量に存在する場合の最大列数または凡例最大行数です。

position が水平方向（bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr）の場合、maxSize は表示列数を制御します。

position が垂直方向（left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb）の場合、maxSize は表示行数を制御します。

:::

:::warning{title="Warning"}
離散凡例にのみ有効です。

:::

**例**
```ts
maxSize: 2




```
## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title="説明"}
描画領域の内側余白



VChart の region[0].padding にマッピングされ、注釈やラベルなど描画領域外へ拡張される要素のためのスペースを確保します。

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
ツールチップ設定です。チャートのツールチップを定義するために使用し、ツールチップの位置、フォーマット、スタイルなどを含みます。

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



ブラシ選択設定です。brush の矩形選択能力を有効化または無効化するために使用します。



チャートのブラシ選択設定

:::


### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
brush による矩形選択を有効にするかどうか

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title="説明"}
brush の種類



ブラシ選択枠の形状と選択方向を定義します。

\- `rect`: 矩形選択です。X 軸と Y 軸の 2 方向で同時に選択できます

\- `polygon`: 多角形選択です。複数の点をクリックして任意の多角形を描画し選択します

\- `x`: X 軸方向の選択です。X 軸方向のみ選択し、Y 軸方向は制限しません

\- `y`: Y 軸方向の選択です。Y 軸方向のみ選択し、X 軸方向は制限しません

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title="説明"}
矩形選択モードです。単一選択か複数選択かを指定します。



ブラシ選択のモードを定義します。

\- `single`: 単一選択モードです。一度に 1 つの選択枠のみ存在できます

\- `multiple`: 複数選択モードです。複数の選択枠が同時に存在できます

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title="説明"}
選択終了時に選択枠をクリアするかどうか

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="説明"}
選択されたデータのスタイル



選択されたデータポイントのスタイルを定義します。

:::


#### opacity

**Type:** `number | undefined`

:::note{title="説明"}
不透明度



選択されたデータポイントの不透明度です。値の範囲は 0\-1 です

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
選択されていないデータのスタイル



選択されていないデータポイントのスタイルを定義します。

:::


#### opacity

**Type:** `number | undefined`

:::note{title="説明"}
不透明度



未選択されたデータポイントの不透明度です。値の範囲は 0\-1 です

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

**Type:** `BarLikeAnimation | undefined`

:::note{title="説明"}
アニメーション設定



チャートのアニメーション設定です。チャートタイプに応じて選択可能な効果が制約されます。

:::


### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
有効にするかどうか横棒/棒グラフアニメーション

:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title="説明"}
横棒/棒グラフアニメーションパラメータ

:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title="説明"}
横棒/棒グラフ入場アニメーション設定

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title="説明"}
横棒/棒グラフ入場効果、サポート成長アニメーション

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
アニメーション時間です。単位はミリ秒です。

:::

##### color

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションのハイライト色または雰囲気色

:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title="説明"}
横棒/棒グラフ更新アニメーション設定

:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title="説明"}
横棒/棒グラフ更新効果、サポート成長和移入アニメーション

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
アニメーション時間です。単位はミリ秒です。

:::

##### color

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションのハイライト色または雰囲気色

:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title="説明"}
横棒/棒グラフループアニメーション設定

:::


##### enable

**Type:** `boolean | undefined`

:::note{title="説明"}
有効にするかどうかループアニメーション

:::

##### interval

**Type:** `number | undefined`

:::note{title="説明"}
ループアニメーション間隔です。単位はミリ秒です

:::

##### loop

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title="説明"}
横棒/棒グラフループアニメーション設定

:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title="説明"}
横棒/棒グラフループ効果

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
アニメーション時間です。単位はミリ秒です。

:::

###### color

**Type:** `string | undefined`

:::note{title="説明"}
アニメーションのハイライト色または雰囲気色

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title="説明"}
横棒/棒グラフ雰囲気アニメーション設定

:::


###### ease

**Type:** `string | undefined`

:::note{title="説明"}
雰囲気アニメーションイージング関数

:::

###### color

**Type:** `string | undefined`

:::note{title="説明"}
雰囲気アニメーション色

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title="説明"}
雰囲気アニメーション効果です。リップル、表示/非表示、呼吸効果をサポートします

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title="説明"}
x 軸、数値軸の設定です。チャートの x 軸を定義するために使用し、x 軸の位置、フォーマット、スタイルなどを含みます。

:::


### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
軸を表示するかどうか

:::

### min

**Type:** `number | undefined`

:::note{title="説明"}
軸の最小値です。優先度は nice と zero より高くなります

:::

### max

**Type:** `number | boolean | undefined`

:::note{title="説明"}
軸の最大値、 優先度より高く nice と zero、 true の場合、 その場合自動基づきデータ範囲計算最大値

:::

### log

**Type:** `boolean | undefined`

:::note{title="説明"}
かどうか使用对数軸、 数値軸にのみ有効です

:::

### logBase

**Type:** `number | undefined`

:::note{title="説明"}
対数軸の底、 数値軸にのみ有効です

:::

### nice

**Type:** `boolean | undefined`

:::note{title="説明"}
軸の目盛り間隔を自動調整して目盛りラベルを読みやすくするかどうか。min と max が設定されている場合、この設定項目は無効になります。数値軸にのみ有効です

:::

### inverse

**Type:** `boolean | undefined`

:::note{title="説明"}
軸を反転表示するかどうか。数値軸にのみ有効です。

:::

### zero

**Type:** `boolean | undefined`

:::note{title="説明"}
座標軸上に 0 値を強制表示するかどうか。min と max が設定されている場合、この設定項目は無効になります。数値軸にのみ有効です。

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="説明"}
数値軸の目盛りラベルを自動フォーマットするかどうか。数値軸にのみ有効です。autoFormat が true の場合、numFormat 設定は無効になります

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="説明"}
数値軸の数値フォーマットです。数値軸にのみ有効で、優先度は autoFormat より低くなります

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="説明"}
数値フォーマットの種類です。数値（10 進）、百分比（%）、千分比（‰）、科学表記をサポートします。

:::

#### ratio

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの比率です。0 にはできません。

:::

**例**
```ts
\- 100000 に変換します 10万、 ratio:10000、 symbol:"万"
\- 100000 に変換します 10K、 ratio:1000、 symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットの記号です。例: %、‰

:::

**例**
```ts
\- 100000 に変換します 10万、 ratio:10000、 symbol:"万"
\- 100000 に変換します 10K、 ratio:1000、 symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="説明"}
数値フォーマットの桁区切り記号です。

:::

#### suffix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットのサフィックスです。

:::

#### prefix

**Type:** `string | undefined`

:::note{title="説明"}
数値フォーマットのプレフィックスです。

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの小数桁です。ブラウザーが提供する Intl.NumberFormat の minimumFractionDigits と maximumFractionDigits でフォーマットします。優先度は significantDigits より低くなります。

:::

**例**
```ts
\- 1234.5678 に変換します 1235、 fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.6、 fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.57、 fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1230.568、 fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.5678、 fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.56780、 fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="説明"}
数値フォーマットの有効桁です。ブラウザーが提供する Intl.NumberFormat の minimumSignificantDigits と maximumSignificantDigits でフォーマットします。優先度は fractionDigits より高くなります。

:::

**例**
```ts
\- 1234.5678 に変換します 1000、 significantDigits:1
\- 1234.5678 に変換します 1200、 significantDigits:2
\- 1234.5678 に変換します 1230、 significantDigits:3
\- 1234.5678 に変換します 1234、 significantDigits:4
\- 1234.5678 に変換します 1234.6、 significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.57、 significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.568、 significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 に変換します 1234.5678、 significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="説明"}
数値フォーマットの丸め優先度です。significantDigits と fractionDigits が同時に設定された場合の丸め優先度を扱います。ブラウザーが提供する Intl.NumberFormat でフォーマットし、規則は Intl.NumberFormat の roundingPriority と同じです。

:::

**例**
```ts
\- 1234.5678 に変換します 1230、 significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 に変換します 1234.5678、 significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="説明"}
数値フォーマットの丸めモードです。ブラウザーが提供する Intl.NumberFormat でフォーマットし、規則は Intl.NumberFormat の roundingMode と同じです。

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
ラベル回転角度

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
X 軸目盛り

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
タイトルテキストです。デフォルトではフィールド設定に従います。

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
Y 軸动画配置

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

**Type:** `YBandAxis | undefined`

:::note{title="説明"}
y 軸、カテゴリ軸の設定です。チャートの y 軸を定義するために使用し、y 軸の位置、フォーマット、スタイルなどを含みます。

:::


### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
軸を表示するかどうか

:::

### inverse

**Type:** `boolean | undefined`

:::note{title="説明"}
軸を反転表示するかどうか。数値軸にのみ有効です。

:::

### zero

**Type:** `boolean | undefined`

:::note{title="説明"}
座標軸上に 0 値を強制表示するかどうか。min と max が設定されている場合、この設定項目は無効になります。数値軸にのみ有効です。

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title="説明"}
軸ラベルの自動非表示です。2 つのラベルが重なる場合（間隔が autoHideGap より小さい場合）、重なりを引き起こすラベルを自動的に非表示にします。カテゴリ軸にのみ有効です。

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title="説明"}
軸ラベルの自動非表示間隔です。2 つのテキストラベルの間隔が autoHideGap より小さい場合、重なりを引き起こすラベルを自動的に非表示にします。カテゴリ軸にのみ有効です。

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
軸ラベルの自動長さ制限の最大長です。ラベルテキスト長が最大長を超える場合、超過部分を省略記号で表示し、マウスホバー後にラベルを表示します。カテゴリ軸にのみ有効です。

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
ラベル回転角度

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
X 軸目盛り

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
タイトルテキストです。デフォルトではフィールド設定に従います。

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
Y 軸动画配置

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
水平ツールチップ枠設定です。チャートの水平ツールチップ枠を定義するために使用し、水平ツールチップ枠の色、ラベルスタイルなどを含みます。



クロスヘア線矩形地域設定、是一种使用しますにチャート中表示クロスヘア線矩形地域の設定タイプ

:::


### visible

**Type:** `boolean | undefined`

:::note{title="説明"}
かどうか表示クロスヘア線矩形地域

:::

### rectColor

**Type:** `string | undefined`

:::note{title="説明"}
クロスヘア線矩形地域色

:::

### labelColor

**Type:** `string | undefined`

:::note{title="説明"}
クロスヘア線矩形地域ラベル色

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title="説明"}
かどうか表示クロスヘア線矩形地域ラベル

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
クロスヘア線矩形地域ラベル背景色

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title="説明"}
横棒グラフ スタック角丸

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title="説明"}
矩形の最大高さです。ピクセル値または百分比文字列を指定できます

:::


## sort

**Type:** `Sort | undefined`

:::note{title="説明"}
Y 軸ソート設定です。ディメンションまたはメジャーに基づくソート、およびカスタムソート順をサポートします



カテゴリ軸ソート設定です。ディメンションまたはメジャーに基づくソート、およびカスタムソート順をサポートします

:::

**例**
```ts
sort: {
  orderBy: 'profit'、
  order: 'asc'、
}
sort: {
  customOrder:['2019'、 '2020'、 '2021']
}

\- order:'asc'
\- orderBy:'date'
または
\- customOrder:['2019'、 '2020'、 '2021']




```
### order

**Type:** `"asc" | "desc" | undefined`

:::note{title="説明"}
ソート順です。指定可能な値は 'asc' または 'desc' です。

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
カスタムソート順です。この順序はカテゴリ軸に直接適用されます

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title="説明"}
凡例ソート設定です。ディメンションまたはメジャーに基づくソート、およびカスタムソート順をサポートします。



凡例ソート設定です。ディメンションまたはメジャーに基づくソート、およびカスタムソート順をサポートします。ソート配列は左から右、または上から下の順序に従います。

:::

**例**
```ts
sortLegend: {
  orderBy: 'profit'、
  order: 'asc'、
}
sortLegend: {
  customOrder:['2019'、 '2020'、 '2021']
}

\- order:'asc'
\- orderBy:'date'
または
\- customOrder:['2019'、 '2020'、 '2021']




```
### order

**Type:** `"asc" | "desc" | undefined`

:::note{title="説明"}
ソート順です。指定可能な値は 'asc' または 'desc' です。

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
カスタムソート順です。この順序は凡例に直接適用されます。昇順は左から右または上から下、降順は右から左または下から上です

:::


## theme

**Type:** `Theme | undefined`

:::note{title="説明"}
チャートのテーマ、 テーマ是優先度較低い機能設定、 包含すべてのチャートタイプ共通の汎用設定、 と単一チャートタイプ共通のチャート設定、 light と dark の 2 種類の組み込みテーマがあります。ユーザーは Builder でテーマをカスタムできます



テーマ



light、dark の 2 種類の組み込みテーマがあります。新しいテーマは registerTheme でカスタムできます。

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
矩形マークスタイル、 横棒グラフのスタイル設定です。チャートの横棒グラフスタイルを定義するために使用し、横棒グラフの色、枠線、角丸などを含みます。

全体スタイルまたは条件付きスタイル設定をサポートします

データフィルター

selector を設定した場合、数値 selector、局所データ selector、条件ディメンション selector、条件メジャー selector の 4 種類のデータマッチング機能を提供します

selector を設定しない場合、スタイルは全体に適用されます。

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="説明"}
データセレクター



selector を設定した場合、数値 selector、局所データ selector、条件ディメンション selector、条件メジャー selector の 4 種類のデータマッチング機能を提供します

selector を設定しない場合、スタイルは全体に適用されます。

:::

**例**
```ts
数値セレクター
selector = "tool"
selector = ["tool"、 "book"]
selector = 100
selector = [100、 200]

局部データセレクター
selector = { profit: 100 }
selector = [{ profit: 100 }、 { profit: 200 }]

条件ディメンションセレクター
selector = {
field: 'category'、
operator: 'in'、
value: 'tool'
}
selector = {
field: 'category'、
operator: 'not in'、
value: 'book'
}

条件メジャーセレクター
selector = {
field: 'profit'、
operator: '>='、
value: 100
}
selector = {
field: 'profit'、
operator: 'between'
value: [100、 300]
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
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

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



AI が生成した JavaScript コードで複雑なデータフィルターロジックを実現します。

Top N、統計分析、複雑な条件など、静的 selector では表現しにくいシーンに適しています



主な機能:

\- 任意の複雑なデータフィルター条件をサポートします

\- 組み込みツール関数を使用してデータ操作を行います

\- ブラウザー環境で安全に実行します（Web Worker サンドボックス）



環境要件: ブラウザー環境のみをサポートします。Node.js 環境では fallback を使用します。



注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります。



チャート動的フィルター設定



AI が生成した JavaScript コードでチャートマーク（バー、点など）のフィルタリングを実現します。

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="説明"}
ユーザーのフィルター要件の説明（自然言語）

:::

**例**
```ts
"売上が 1000 を超えるバーをハイライト"

"各地域で利益率が最も高いバーをハイライト"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルターコード



\- 組み込みツール関数のみ使用できます（_ または R でアクセス）

\- 入力パラメータ: data（配列）。各 item には行番号を表す __row_index フィールドが含まれます

\- 行インデックスとフィールドを組み合わせた配列を返す必要があります: ``Array<{ __row_index: number, field: string }>``

\- __row_index は元データ項目の行番号を表し、field はハイライトが必要なフィールドを表します

\- 使用禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**
```ts
売上が 1000 を超えるデータ項目の sales フィールドをハイライト
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目をハイライト
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

複数条件でフィルターしたデータ項目をハイライト
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
ディメンションフィールドです。dimensions のいずれかの項目の id です。

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

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
動的フィルター実行結果（実行時フィールド）



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
柱マーク(矩形マーク)かどうか表示

:::

### barColor

**Type:** `string | undefined`

:::note{title="説明"}
柱マーク(矩形マーク)色

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title="説明"}
柱マーク(矩形マーク)色透明度

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
柱マーク(矩形マーク)枠線色

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
柱マーク(矩形マーク)枠線幅

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="説明"}
柱マーク(矩形マーク)枠線スタイル

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
柱マーク(矩形マーク)角丸



柱マーク(矩形マーク)ストローク透明度

:::

**例**
```ts
4

[0、 0、 10、 10]



```
### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title="説明"}
注釈点設定です。選択したデータに基づいてチャートの注釈点を定義し、注釈点の位置、フォーマット、スタイルなどを含みます。

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="説明"}
注釈点のセレクターです。データポイントを選択するために使用します。

:::


#### field

**Type:** `string`

:::note{title="説明"}
ディメンションフィールドです。dimensions のいずれかの項目の id です。

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

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
注釈点が属するメジャー id を指定します。複数 measure のシーンでは selector と組み合わせることで、対象メジャーに対応する注釈点を一意に特定できます。

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（AI 生成コード実行）



AI が生成した JavaScript コードで複雑なデータフィルターロジックを実現します。

Top N、統計分析、複雑な条件など、静的 selector では表現しにくいシーンに適しています



主な機能:

\- 任意の複雑なデータフィルター条件をサポートします

\- 組み込みツール関数を使用してデータ操作を行います

\- ブラウザー環境で安全に実行します（Web Worker サンドボックス）



環境要件: ブラウザー環境のみをサポートします。Node.js 環境では fallback を使用します。



注意: selector と dynamicFilter は同時に使用できません。dynamicFilter の優先度が高くなります。



チャート動的フィルター設定



AI が生成した JavaScript コードでチャートマーク（バー、点など）のフィルタリングを実現します。

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="説明"}
ユーザーのフィルター要件の説明（自然言語）

:::

**例**
```ts
"売上が 1000 を超えるバーをハイライト"

"各地域で利益率が最も高いバーをハイライト"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルターコード



\- 組み込みツール関数のみ使用できます（_ または R でアクセス）

\- 入力パラメータ: data（配列）。各 item には行番号を表す __row_index フィールドが含まれます

\- 行インデックスとフィールドを組み合わせた配列を返す必要があります: ``Array<{ __row_index: number, field: string }>``

\- __row_index は元データ項目の行番号を表し、field はハイライトが必要なフィールドを表します

\- 使用禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**
```ts
売上が 1000 を超えるデータ項目の sales フィールドをハイライト
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

各地域で利益率が最も高いデータ項目をハイライト
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

複数条件でフィルターしたデータ項目をハイライト
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
ディメンションフィールドです。dimensions のいずれかの項目の id です。

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

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
動的フィルター実行結果（実行時フィールド）



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
テキスト揃えです。通常は right に設定し、テキストを注釈点の左側に表示して、チャートの表示領域内に収まるようにします。

'right' に設定することを推奨します。これにより、テキストが注釈点の左側に配置されます。

right: テキストは注釈点の左側にあり、テキストの右端を注釈点に揃えます

left: テキストは注釈点の右側にあり、テキストの左端を注釈点に揃えます

center: テキストは注釈点の中央にあり、テキストの中央を注釈点に揃えます

:::

**例**
```ts
'right' テキストは注釈点の左側



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="説明"}
テキストの垂直揃えです。通常は top に設定し、テキストを注釈点の下部に表示して、チャートの表示領域内に収まるようにします。

'top' に設定することを推奨します。これにより、テキストがチャートの表示領域内で完全に表示されます。

top: テキストは注釈点の下部にあり、テキストの上端を注釈点に揃えます

middle: テキストは注釈点の中央にあり、テキストの中央を注釈点に揃えます

bottom: テキストは注釈点の上部にあり、テキストの下端を注釈点に揃えます

:::

**例**
```ts
'top' テキストは注釈点の下部



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
背景枠線色

:::

**例**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
背景枠線幅

:::

**例**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="説明"}
背景枠線の角丸

:::

**例**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="説明"}
背景の内側余白

:::

**例**
```ts
4



```
### offsetY

**Type:** `number | undefined`

:::note{title="説明"}
注釈点全体の Y 方向のオフセットピクセル距離です。注釈点がチャート上方（数値が大きい場合）にあるときは正値、チャート下方（数値が小さい場合）にあるときは負値に設定することを推奨します。

負値の場合は全体が上へオフセットします。例: \-10 に設定すると、テキストとテキスト背景を含む注釈点コンポーネント全体が 10 ピクセル上へ移動します

正値の場合は全体が下へオフセットします。例: 10 に設定すると、テキストとテキスト背景を含む注釈点コンポーネント全体が 10 ピクセル下へ移動します

:::

**例**
```ts
offsetY: 5、 注釈点整体向下偏移5ピクセル



```
### offsetX

**Type:** `number | undefined`

:::note{title="説明"}
注釈点全体の X 方向のオフセットピクセル距離です。注釈点がチャート左側（カテゴリ軸の始点）にあるときは正値、チャート右側（カテゴリ軸の終点）にあるときは負値に設定することを推奨します。

負値の場合は全体が左へオフセットします。例: \-10 に設定すると、テキストとテキスト背景を含む注釈点コンポーネント全体が 10 ピクセル左へ移動します

正値の場合は全体が右へオフセットします。例: 10 に設定すると、テキストとテキスト背景を含む注釈点コンポーネント全体が 10 ピクセル右へ移動します

:::

**例**
```ts
offsetX: 5、 注釈点整体向右偏移5ピクセル




```
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title="説明"}
数値注釈線（平均線、最大値線、最小値線などを含む）です。垂直方向に表示し、注釈線の位置やスタイルなどを設定できます。平均線など数値に対応する注釈線を描画する場合はこの設定を使用してください。

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="説明"}
垂直線を注釈するための固定 x 値です。カテゴリ軸が x 方向の場合はディメンション値を、数値軸が x 方向の場合は具体的な数値を入力できます。

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（AI 生成コード実行）



AI が生成した JavaScript コードで注釈線の値を動的に計算します

平均値、最大値、分位数、業務線など、データに基づいて注釈線位置を動的に決定する必要がある場合に適しています



ブラウザー環境のみサポートします（Web Worker が必要です）

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="説明"}
ユーザーのフィルター要件の説明（自然言語）

:::

**例**
```ts
"売上の最高値を注釈線の参照として取得"

"計算平均売上使用します注釈線"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルターコード



\- 組み込みツール関数のみ使用できます（_ または R でアクセス）

\- 入力パラメータ: data（配列）

\- 単一の数値または文字列を返す必要があります: number | string

\- 適用シーン：注釈線（水平線、垂直線）必要の動的数値

\- 使用禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**
```ts
取得売上最大値として注釈線値
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

計算平均値使用します注釈線
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

分位数を注釈線として取得
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

基づき条件計算目標値
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
動的フィルター実行結果（実行時フィールド）



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
テキスト位置、 注釈線のラベル位置です（線に対するラベルの相対位置）。

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
テキスト揃えです。通常は設定不要です。

'right' に設定することを推奨します。これにより、テキストが注釈線の左側に配置されます。

right: テキストは参照線の左側にあり、テキストの右端を（垂直）注釈線に揃えます

left: テキストは参照線の右側にあり、テキストの左端を（垂直）注釈線に揃えます

center: テキストは参照線の中央にあり、テキストの中央を（垂直）注釈線に揃えます

:::

**例**
```ts
'right'



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="説明"}
テキストの垂直揃えです。通常は設定不要です。

'top' に設定することを推奨します。これにより、テキストがチャートの表示領域内で完全に表示されます。

top: テキストは参照線の下部にあり、テキストの上端を（垂直）注釈線の終点に揃えます

middle: テキストは参照線の中央にあり、テキストの中央を（垂直）注釈線の終点に揃えます

bottom: テキストは参照線の上部にあり、テキストの下端を（垂直）注釈線の終点に揃えます

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
線色

:::

**例**
```ts
'red'



```
### lineWidth

**Type:** `number | undefined`

:::note{title="説明"}
線幅

:::

**例**
```ts
2



```
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="説明"}
線スタイル

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
背景枠線色

:::

**例**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
背景枠線幅

:::

**例**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="説明"}
背景枠線の角丸

:::

**例**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="説明"}
背景の内側余白

:::

**例**
```ts
4




```
## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title="説明"}
ディメンション値の注釈線です。水平方向に表示し、注釈線の位置やスタイルなどを設定できます。

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="説明"}
水平線を注釈するための固定 y 値です。カテゴリ軸が y 方向の場合はディメンション値を、数値軸が y 方向の場合は具体的な数値を入力できます。

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="説明"}
動的フィルター（AI 生成コード実行）



AI が生成した JavaScript コードで注釈線の値を動的に計算します

平均値、最大値、分位数、業務線など、データに基づいて注釈線位置を動的に決定する必要がある場合に適しています



ブラウザー環境のみサポートします（Web Worker が必要です）

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="説明"}
ユーザーのフィルター要件の説明（自然言語）

:::

**例**
```ts
"売上の最高値を注釈線の参照として取得"

"計算平均売上使用します注釈線"



```
#### code

**Type:** `string`

:::note{title="説明"}
AI が生成した JavaScript フィルターコード



\- 組み込みツール関数のみ使用できます（_ または R でアクセス）

\- 入力パラメータ: data（配列）

\- 単一の数値または文字列を返す必要があります: number | string

\- 適用シーン：注釈線（水平線、垂直線）必要の動的数値

\- 使用禁止: eval、Function、非同期操作、DOM API、ネットワークリクエスト

:::

**例**
```ts
取得売上最大値として注釈線値
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

計算平均値使用します注釈線
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

分位数を注釈線として取得
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

基づき条件計算目標値
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
動的フィルター実行結果（実行時フィールド）



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



注釈線のラベル位置です（線に対するラベルの相対位置）。

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
テキスト揃えです。通常は設定不要です。

'right' に設定することを推奨します。これにより、テキストが注釈線の左側に配置されます。

right: テキストは参照線の左側にあり、テキストの右端を（水平）注釈線の終点に揃えます

left: テキストは参照線の右側にあり、テキストの左端を（水平）注釈線の終点に揃えます

center: テキストは参照線の中央にあり、テキストの中央を（水平）注釈線の終点に揃えます

:::

**例**
```ts
'right'



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="説明"}
テキストの垂直揃えです。通常は設定不要です。

'top' に設定することを推奨します。これにより、テキストがチャートの表示領域内で完全に表示されます。

top: テキストは参照線の下部にあり、テキストの上端を（水平）注釈線に揃えます

middle: テキストは参照線の中央にあり、テキストの中央を（水平）注釈線に揃えます

bottom: テキストは参照線の上部にあり、テキストの下端を（水平）注釈線に揃えます

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
背景枠線色

:::

**例**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
背景枠線幅



背景枠線幅

:::

**例**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="説明"}
背景枠線の角丸

:::

**例**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="説明"}
背景の内側余白

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
線色

:::

**例**
```ts
'red'



```
### lineWidth

**Type:** `number | undefined`

:::note{title="説明"}
線幅

:::

**例**
```ts
2



```
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="説明"}
線スタイル

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
注釈値より大きい部分に対応する主色

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title="説明"}
注釈値より小さい部分に対応する主色

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title="説明"}
注釈領域設定です。選択したデータに基づいてチャートの注釈領域を定義し、注釈領域の位置、スタイルなどを含みます。

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title="説明"}
選択したデータに基づいてデータマークを行います。

:::


#### field

**Type:** `string`

:::note{title="説明"}
ディメンションフィールドです。dimensions のいずれかの項目の id です。

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

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
テキスト揃えです。通常は right に設定し、テキストを注釈領域の中央に表示して、チャートの表示領域内に収まるようにします。

'center' に設定することを推奨します。これにより、テキストが注釈領域の中央に配置されます。

right: テキストは注釈領域の左側にあり、テキストの右端を注釈領域に揃えます

left: テキストは注釈領域の右側にあり、テキストの左端を注釈領域に揃えます

center: テキストは注釈領域の中央にあり、テキストの中央を注釈領域に揃えます

:::

**例**
```ts
'center' テキストは注釈領域の中央



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="説明"}
テキストの垂直揃えです。通常は top に設定し、テキストを注釈領域の下部に表示して、チャートの表示領域内に収まるようにします。

'top' に設定することを推奨します。これにより、テキストがチャートの表示領域内で完全に表示されます。

top: テキストは注釈領域の下部にあり、テキストの上端を注釈領域に揃えます

middle: テキストは注釈領域の中央にあり、テキストの中央を注釈領域に揃えます

bottom: テキストは注釈領域の上部にあり、テキストの下端を注釈領域に揃えます

:::

**例**
```ts
'top' テキストは注釈領域の下部



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
背景枠線色



背景枠線色

:::

**例**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
背景枠線幅

:::

**例**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="説明"}
背景枠線の角丸



背景枠線の角丸

:::

**例**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="説明"}
背景の内側余白

:::

**例**
```ts
4



```
### areaColor

**Type:** `string | undefined`

:::note{title="説明"}
注釈領域地域色

:::

**例**
```ts
'red'



```
### areaColorOpacity

**Type:** `number | undefined`

:::note{title="説明"}
注釈領域地域色透明度

:::

**例**
```ts
0.5



```
### areaBorderColor

**Type:** `string | undefined`

:::note{title="説明"}
注釈領域地域枠線色

:::

**例**
```ts
'red'



```
### areaBorderWidth

**Type:** `number | undefined`

:::note{title="説明"}
注釈領域地域枠線幅

:::

**例**
```ts
2



```
### areaBorderRadius

**Type:** `number | undefined`

:::note{title="説明"}
注釈領域地域枠線角丸

:::

**例**
```ts
4



```
### areaLineDash

**Type:** `number[] | undefined`

:::note{title="説明"}
注釈領域の枠線タイプ

:::

**例**
```ts
[2、 2]



```
### outerPadding

**Type:** `number | undefined`

:::note{title="説明"}
注釈領域の余白

:::

**例**
```ts
0




```
## annotationDifferenceLine

**Type:** `AnnotationDifferenceLine | AnnotationDifferenceLine[] | undefined`

:::note{title="説明"}
差分注釈線設定です。2 つのデータアンカーを紐づけ、絶対差分値または百分比差分値を表示します。

:::


### start

**Type:** `DifferenceAnchor`

:::note{title="説明"}
差分注釈線の開始アンカーです。



差分注釈アンカー設定です。開始点または終了点に紐づくデータを選択するために使用します。

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title="説明"}
アンカーセレクターです。最終的に 1 つの論理アンカーへ特定する必要があります。

:::

**例**
```ts
{ year: '1930'、 type: 'Autocracies' }

[{ field: 'year'、 operator: 'in'、 value: ['1930'] }、 { field: 'type'、 operator: 'in'、 value: ['Autocracies'] }]




```
##### field

**Type:** `string`

:::note{title="説明"}
ディメンションフィールドです。dimensions のいずれかの項目の id です。

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目内のディメンションフィールドの値を選択します。配列をサポートします。

:::

### end

**Type:** `DifferenceAnchor`

:::note{title="説明"}
差分注釈線の終了アンカーです。



差分注釈アンカー設定です。開始点または終了点に紐づくデータを選択するために使用します。

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title="説明"}
アンカーセレクターです。最終的に 1 つの論理アンカーへ特定する必要があります。

:::

**例**
```ts
{ year: '1930'、 type: 'Autocracies' }

[{ field: 'year'、 operator: 'in'、 value: ['1930'] }、 { field: 'type'、 operator: 'in'、 value: ['Autocracies'] }]




```
##### field

**Type:** `string`

:::note{title="説明"}
ディメンションフィールドです。dimensions のいずれかの項目の id です。

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="説明"}
演算子

\- in: ディメンションフィールドの値が value に含まれるデータ項目を選択します

\- not in: ディメンションフィールドの値が value に含まれないデータ項目を選択します

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="説明"}
データ項目内のディメンションフィールドの値を選択します。配列をサポートします。

:::

### differenceType

**Type:** `"percent" | "absolute" | undefined`

:::note{title="説明"}
差分値タイプです。

\- absolute: 表示絶対差分値、計算方式として end \- start

\- percent: 表示百分比差分値、計算方式として (end \- start) / start

:::

### textFontSize

**Type:** `number | undefined`

:::note{title="説明"}
テキストフォントサイズ。

:::

### textColor

**Type:** `string | undefined`

:::note{title="説明"}
テキスト色。

:::

### textBackgroundColor

**Type:** `string | undefined`

:::note{title="説明"}
テキスト背景色。

:::

### lineColor

**Type:** `string | undefined`

:::note{title="説明"}
線条色。

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="説明"}
線条スタイル。

:::


## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title="説明"}
チャートでピボット機能またはメジャー組み合わせが有効な場合に、ディメンション連動機能を有効にするかどうか

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
すべてのディメンションに対応する子チャートの Tooltip ツールチップを表示するかどうか

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title="説明"}
crosshair に対応するラベルを表示するかどうか

:::


## locale

**Type:** `Locale | undefined`

:::note{title="説明"}
チャート言語設定です。'zh\-CN' と 'en\-US' の 2 言語をサポートします。また、intl.setLocale('zh\-CN') メソッドで言語を設定できます

:::

