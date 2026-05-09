# Table

:::info{title="Empfohlen"}
\- Empfohlene Feldkonfiguration: `Alle`Metriken, `Alle`Dimension (en)

\- Unterstützung der Datenumformung: mind.`Alle`Metriken, `Alle`Dimension (en)

:::

:::info{title="Kodierungszuordnung"}
Es wird nur das Konfigurieren von Dimensions- und Metrikbäumen unterstützt, Standardcodierung in Spalte

:::

:::note{title="Beschreibung"}
Tabelle, geeignet für detaillierte Datenanzeigeszenarien, klare Zeilen und Spalten, einfache Anzeige bestimmter Werte

Szenario:

\- Detaillierte Datenaufschlüsselung erforderlich

\- Datenelemente müssen genau abgeglichen werden

\- Mehrdimensionale Dateneigenschaften darstellen

:::

:::warning{title="Warning"}
Datenanforderungen:

\- Mindestens ein Dimensionsfeld

\- Mindestens 1 metrisches Feld

\- Das Dimensionsfeld dient als Spaltenkopf für die Tabelle

Standardmäßig eingeschaltete Funktionen:

\- Sortierung, Filterung und Seitennummerierung sind standardmäßig aktiviert

:::


## chartType

**Type:** `"table"`

:::note{title="Beschreibung"}
Standardtabellenkomponente zur Darstellung detaillierter Daten

:::

**Beispiel**
```ts
'table'




```
## dataset

**Type:** `Record[]`

:::note{title="Beschreibung"}
TidyData-konformer und aggregierter Datensatz, der die Datenquelle und die Struktur des Diagramms definiert, Der vom Benutzer eingegebene Datensatz erfordert keine Verarbeitung, Ein Feld entspricht einer Spalte, Ein Datensatz entspricht einer Zeile

:::

**Beispiel**
```ts
[{id: 1, name: "A", value: 100}, {id: 2, name: "B", value: 200}]




```
## dimensions

**Type:** `DimensionTree | undefined`

:::note{title="Beschreibung"}
Jede Dimension der Tabelle entspricht einer Spalte

:::

**Beispiel**
```ts
[{id: "name", alias: "Benennung"}]




```
### id

**Type:** `string`

### alias

**Type:** `string | undefined`

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title="Beschreibung"}
Konfiguration des Dimensionszeitformats

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title="Beschreibung"}
Zeitgranularität, die die Genauigkeit der Datumsanzeige bestimmt

:::

### encoding

**Type:** `"row" | "column" | undefined`

:::note{title="Beschreibung"}
Kanäle für Dimensionsmapping

\- row: Unterstützt die Zuordnung mehrerer Dimensionen zu einem Zeilenkanal

\- column: Unterstützung für die Zuordnung mehrerer Dimensionen zu einem Spaltenkanal

:::

### children

**Type:** `(TableDimension | DimensionGroup)[] | undefined`


#### id

**Type:** `string`

#### alias

**Type:** `string | undefined`

#### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title="Beschreibung"}
Konfiguration des Dimensionszeitformats

:::


##### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title="Beschreibung"}
Zeitgranularität, die die Genauigkeit der Datumsanzeige bestimmt

:::

#### encoding

**Type:** `"row" | "column" | undefined`

:::note{title="Beschreibung"}
Kanäle für Dimensionsmapping

\- row: Unterstützt die Zuordnung mehrerer Dimensionen zu einem Zeilenkanal

\- column: Unterstützung für die Zuordnung mehrerer Dimensionen zu einem Spaltenkanal

:::


## measures

**Type:** `MeasureTree | undefined`

:::note{title="Beschreibung"}
Jede Metrik in der Tabelle entspricht einer Zeile, Und es unterstützt von Natur aus die Kombination von Indikatoren.

:::

**Beispiel**
```ts
[{id: "value", alias: "Wert"}]




```
### id

**Type:** `string`

:::note{title="Beschreibung"}
Kennzeichengruppen-ID, Kann nicht wiederholt werden

:::

### alias

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Metrikgruppen-Alias, Duplikate zulassen, Wenn nicht ausgefüllt, alias ist id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Automatische numerische Formatierung, standardmäßig aktiviert, höchste Priorität

Wenn autoFormat = true, werden alle Konfigurationen von numFormat überschrieben

Wenn diese Option aktiviert ist, wählen die Datenbeschriftungen und -aufforderungen des Diagramms automatisch die entsprechende Formatierungsmethode basierend auf dem Metrikwert und dem Gebietsschema aus

Formatierungsregeln: Dezimalwert, kompakte Notation aktiviert, mindestens 0 Dezimalstellen, maximal 2 Dezimalstellen, automatische Rundung, Verwendung des vom Browser bereitgestellten Intl.NumberFormat

Zum Beispiel:

\- localeist zh\-CN: 749740.264 → 74.4510.000

\- localefür en\-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="Beschreibung"}
Benutzerdefinierte Metrikwertformatierung, automatisch auf Label, Tooltip angewendet

Hinweis: Um benutzerdefinierte Formatierungen zu verwenden, müssen Sie autoFormat = false explizit festlegen, andernfalls überschreibt autoFormat diese Konfiguration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="Beschreibung"}
Typ des Zahlenformats, Numerisch (dezimal), Prozent (%), Tausend-Verhältnis (‰)、Wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Wert-Format-Verhältnis, Kann nicht 0 sein

:::

**Beispiel**
```ts
\- 100000 In 100.000 umwandeln, ratio:10000, symbol:"10.000"
\- 100000 In 10.000 konvertieren, ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Numerisches Format-Symbol, z.B. %,‰

:::

**Beispiel**
```ts
\- 100000 In 100.000 umwandeln, ratio:10000, symbol:"10.000"
\- 100000 In 10.000 konvertieren, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Wertformat Tausendertrennzeichen

:::

#### suffix

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Wertformatierungssuffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Präfix für numerische Formatierung

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Dezimalstellen im numerischen Format, Formatieren mit minimumFractionDigits und maximumFractionDigits im vom Browser bereitgestellten Intl.NumberFormat, Priorität ist niedriger als signifikante Ziffern

:::

**Beispiel**
```ts
\- 1234.5678 In 1235 umwandeln, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 In 1234,6 umwandeln, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 In 1234,57 umwandeln, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 In 1230.568 umwandeln, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 In 1234.5678 umwandeln, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 In 1234.56780 umwandeln, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Gültige Ziffern für numerische Formatierung, Formatieren mit minimumSignificantDigits und maximumSignificantDigits im vom Browser bereitgestellten Intl.NumberFormat, Priorität ist höher als BruchZiffern

:::

**Beispiel**
```ts
\- 1234.5678 In 1000 umwandeln, significantDigits:1
\- 1234.5678 In 1200 umwandeln, significantDigits:2
\- 1234.5678 In 1230 umwandeln, significantDigits:3
\- 1234.5678 In 1234 umwandeln, significantDigits:4
\- 1234.5678 In 1234,6 umwandeln, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 In 1234,57 umwandeln, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 In 1234.568 umwandeln, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 In 1234.5678 umwandeln, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="Beschreibung"}
Numerische Formatierung Rundungspriorität, Rundungspriorität bei Verarbeitung signifikantZiffern und BruchZiffern sind beide gesetzt, Formatieren mit dem vom Browser bereitgestellten Intl.NumberFormat, Regeln sind die gleichen wie Rundungspriorität in Intl.NumberFormat

:::

**Beispiel**
```ts
\- 1234.5678 In 1230 umwandeln, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 In 1234.5678 umwandeln, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="Beschreibung"}
Numerischer Formatierungsrundungsmodus, Formatieren mit dem vom Browser bereitgestellten Intl.NumberFormat, Regeln sind die gleichen wie Rundungsmodus in Intl.NumberFormat

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="Beschreibung"}
Typ des Zahlenformats, Numerisch (dezimal), Prozent (%), Tausend-Verhältnis (‰)、Wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Wert-Format-Verhältnis, Kann nicht 0 sein

:::

**Beispiel**
```ts
\- 100000 In 100.000 umwandeln, ratio:10000, symbol:"10.000"
\- 100000 In 10.000 konvertieren, ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Numerisches Format-Symbol, z.B. %,‰

:::

**Beispiel**
```ts
\- 100000 In 100.000 umwandeln, ratio:10000, symbol:"10.000"
\- 100000 In 10.000 konvertieren, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Wertformat Tausendertrennzeichen

:::

#### suffix

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Wertformatierungssuffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Präfix für numerische Formatierung

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Dezimalstellen im numerischen Format, Formatieren mit minimumFractionDigits und maximumFractionDigits im vom Browser bereitgestellten Intl.NumberFormat, Priorität ist niedriger als signifikante Ziffern

:::

**Beispiel**
```ts
\- 1234.5678 In 1235 umwandeln, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 In 1234,6 umwandeln, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 In 1234,57 umwandeln, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 In 1230.568 umwandeln, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 In 1234.5678 umwandeln, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 In 1234.56780 umwandeln, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Gültige Ziffern für numerische Formatierung, Formatieren mit minimumSignificantDigits und maximumSignificantDigits im vom Browser bereitgestellten Intl.NumberFormat, Priorität ist höher als BruchZiffern

:::

**Beispiel**
```ts
\- 1234.5678 In 1000 umwandeln, significantDigits:1
\- 1234.5678 In 1200 umwandeln, significantDigits:2
\- 1234.5678 In 1230 umwandeln, significantDigits:3
\- 1234.5678 In 1234 umwandeln, significantDigits:4
\- 1234.5678 In 1234,6 umwandeln, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 In 1234,57 umwandeln, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 In 1234.568 umwandeln, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 In 1234.5678 umwandeln, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="Beschreibung"}
Numerische Formatierung Rundungspriorität, Rundungspriorität bei Verarbeitung signifikantZiffern und BruchZiffern sind beide gesetzt, Formatieren mit dem vom Browser bereitgestellten Intl.NumberFormat, Regeln sind die gleichen wie Rundungspriorität in Intl.NumberFormat

:::

**Beispiel**
```ts
\- 1234.5678 In 1230 umwandeln, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 In 1234.5678 umwandeln, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="Beschreibung"}
Numerischer Formatierungsrundungsmodus, Formatieren mit dem vom Browser bereitgestellten Intl.NumberFormat, Regeln sind die gleichen wie Rundungsmodus in Intl.NumberFormat

:::

### encoding

**Type:** `"column" | undefined`

:::note{title="Beschreibung"}
Indikator zugeordneter Kanal

\- column: Metrische Spalten

:::

### parentId

**Type:** `string | undefined`

:::note{title="Beschreibung"}
In flachen metrischen Konfigurationen, Gebäudebaum-Indikatorengruppen, parentIdID, die auf die übergeordnete Metrikgruppe verweist, Wird zum Erstellen von Indikatorbäumen verwendet

:::

:::tip{title="Tip"}
Es gibt zwei Konfigurationsformen des Indikatorbaums, Methode 1 besteht darin, den Indikatorbaum direkt mit Kindern zu konfigurieren, Methode 2 besteht darin, eine flache Liste von Indikatoren für parentId zu konfigurieren, Beide Methoden können nicht gleichzeitig konfiguriert werden

:::

### children

**Type:** `(TableMeasure | MeasureGroup)[] | undefined`

:::note{title="Beschreibung"}
Kennzeichengruppe Unterkennzeichen oder Kennzeichengruppe

:::


## page

**Type:** `Page | undefined`

:::note{title="Beschreibung"}
Seitennummerierungskonfiguration, Feldname zur Angabe der Seitennummerierung, Muss eine Dimension sein

:::


### field

**Type:** `string`

:::note{title="Beschreibung"}
Seitennummerierungsfelder, Feldname zur Angabe der Seitennummerierung, Muss eine Dimension sein

:::

### currentValue

**Type:** `string`

:::note{title="Beschreibung"}
Aktueller Paginierungswert, Wird verwendet, um den Basiswert für die aktuelle Seitennummerierung anzugeben

:::

**Beispiel**
```ts
'2023\-01\-01'




```
## backgroundColor

**Type:** `BackgroundColor`

:::note{title="Beschreibung"}
Hintergrundfarbe kann eine Farbstring sein, Beispiel'red', 'blue', Es kann auch Sechskant sein, rgboder rgba'#ff0000', 'rgba(255,0,0,0.5)'

:::


## borderColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Rahmenfarbe der Tabelle

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftgröße des Tabellenkörpers

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Schriftfarbe des Tabellenkörpers

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Hintergrundfarbe des Tabellenkörpers

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftgröße der Listenkopfzeile

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Schriftfarbe der Listenkopfzeile

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Hintergrundfarbe der Listenkopfzeile

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Hintergrundfarbe beim Bewegen des Mauszeigers über eine Zelle in der Kopfzeile der Liste, Zum Hervorheben der Zelle, über der sich die Maus befindet

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Wenn die Maus über den Kopf der Liste fährt, Die Hintergrundfarbe der Zellen in der gesamten Zeile, Wird verwendet, um die Zeile hervorzuheben, in der sich die Maus befindet

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Ausgewählte Zellrandfarbe, Wird verwendet, um ausgewählte Zellen hervorzuheben

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Hintergrundfarbe der ausgewählten Zellen, Wird verwendet, um ausgewählte Zellen hervorzuheben

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title="Beschreibung"}
Legen Sie einen speziellen Stil für die Zellen im Hauptteil der Tabelle fest

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title="Beschreibung"}
Datenselektor



Wenn der Selektor konfiguriert ist, Geben Sie einen numerischen Selektor an, Lokaler Datenselektor, Bedingter Dimensionswähler, Der Auswahlschalter für die bedingte Anzeige verfügt über vier Arten von Datenabgleichsfunktionen

Wenn der Selektor nicht konfiguriert ist, dann wird der Stil global wirksam.



Hinweis: Selektor und dynamicFilter können nicht gleichzeitig verwendet werden, dynamicFilter hat höhere Priorität

:::

**Beispiel**
```ts
Wertauswahl
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Lokaler Datenselektor
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Bedingter Dimensionswähler
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

Auswahl der Zustandsanzeige
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

Feldspaltenfilter
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




```
#### field

**Type:** `string | string[]`

:::note{title="Beschreibung"}
Feldname, der ein einzelnes Feld oder ein Array mehrerer Felder sein kann

:::

**Beispiel**
```ts
einzelnes Feld
field: 'sales'

Mehrere Felder
field: ['sales', 'profit', 'revenue']



```
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="Beschreibung"}
Bediener

\- in: Wählen Sie den Wert des Dimensionsfeldes im Datenelement Datenelement im Wert

\- not in: Wählen Sie ein Datenelement, in dem der Wert des Dimensionsfeldes im Datenelement nicht im Wert

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="Beschreibung"}
Bediener

\- in: Wählen Sie den Wert des Dimensionsfeldes im Datenelement Datenelement im Wert

\- not in: Wählen Sie ein Datenelement, in dem der Wert des Dimensionsfeldes im Datenelement nicht im Wert

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="Beschreibung"}
Wählen Sie den Wert des Dimensionsfeldes im Datenelement, Unterstützung für Arrays

:::

### dynamicFilter

**Type:** `TableDynamicFilter | undefined`

:::note{title="Beschreibung"}
Dynamische Filter (codegesteuert)



Implementieren Sie komplexe Datenfilterungslogik mit KI-generiertem JavaScript-Code

Geeignet für Szenarien, in denen statische Selektoren schwer auszudrücken sind, wie Top N, statistische Analyse, komplexe Bedingungen usw.



Kernkompetenzen:

\- Unterstützung beliebig komplexer Datenfilter

\- Datenmanipulation mit integrierten Werkzeugfunktionen

\- Sichere Ausführung in einer Browser-Umgebung (Web-Worker-Sandbox)



Umgebungsanforderungen: Nur Browser-Umgebung wird unterstützt, Node.js-Umgebung wird Fallback verwenden



Hinweis: Selektor und dynamicFilter können nicht gleichzeitig verwendet werden, dynamicFilter hat höhere Priorität



Tabelle Dynamische Filterkonfiguration



Präzise Filterung auf Tabellenzellebene mit KI-generiertem JavaScript-Code

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Beschreibung der Screening-Bedürfnisse des Benutzers (natürliche Sprache)

:::

**Beispiel**
```ts
"Zellen mit einem Umsatz von mehr als 1000 hervorheben"

"Zellen mit Maximalwerten in jeder Zeile hervorheben"



```
#### code

**Type:** `string`

:::note{title="Beschreibung"}
AI Generierter JavaScript-Filtercode



\- Es können nur eingebaute Werkzeugfunktionen verwendet werden (Zugriff über_oder R)

\- Eingabeparameter: Daten (Array), jedes Element enthält ein_index-Feld, das die Zeilennummer darstellt

\- Zellselektor-Array muss zurückgegeben werden: ``Array<{ __row_index: number, field: string }>``

\- field für "*" zeigt an, dass die gesamte Zeile hervorgehoben ist

\- Nicht verwenden: eval, Function, Asynchrone Operationen, DOM API, Netzwerkanfrage

:::

**Beispiel**
```ts
Top N Screening
dynamicFilter = {
type: 'row\-with\-field',
description: 'Heben Sie die 3 umsatzstärksten Produkte hervor',
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

Multikriterielle Filterung
dynamicFilter = {
type: 'row\-with\-field',
description: 'Heben Sie Produkte mit einer Gewinnspanne von mehr als 20 % und einem Umsatz von mehr als 5000 hervor',
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

Relative Wertfilterung
dynamicFilter = {   *
type: 'row\-with\-field',
description: 'Produkte mit überdurchschnittlichen Umsätzen hervorheben',
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

Gruppenfilter
dynamicFilter = {
type: 'row\-with\-field',
description: 'Meistverkaufte Produkte in jeder Region',
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

Ganze Zeile hervorgehoben
dynamicFilter = {
description: 'Markieren Sie ganze Zeilen, in denen der Umsatz größer ist als der Gewinn',
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

:::note{title="Beschreibung"}
Degradationsszenarien, wenn die Codeausführung fehlschlägt oder von der Umgebung nicht unterstützt wird

:::


##### field

**Type:** `string`

:::note{title="Beschreibung"}
Dimensionsfeld, dimensions ID eines Artikels

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="Beschreibung"}
Bediener

\- in: Wählen Sie den Wert des Dimensionsfeldes im Datenelement Datenelement im Wert

\- not in: Wählen Sie ein Datenelement, in dem der Wert des Dimensionsfeldes im Datenelement nicht im Wert

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="Beschreibung"}
Bediener

\- in: Wählen Sie den Wert des Dimensionsfeldes im Datenelement Datenelement im Wert

\- not in: Wählen Sie ein Datenelement, in dem der Wert des Dimensionsfeldes im Datenelement nicht im Wert

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="Beschreibung"}
Wählen Sie den Wert des Dimensionsfeldes im Datenelement, Unterstützung für Arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="Beschreibung"}
Dynamisches Filterausführungsergebnis (Laufzeitfeld)



`prepare() Stage Write, Runtime Read-Only`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### backgroundColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Zellenhintergrundfarbe

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob die Farbskala für die Hintergrundfarbe aktiviert werden soll

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title="Beschreibung"}
Scale-Zuordnung der Zellhintergrundfarbe, mit höherer Priorität als backgroundColor

:::


#### minValue

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Minimalwert, standardmäßig der Minimalwert in der aktuellen Datenspalte, wenn nicht konfiguriert

:::

#### maxValue

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Maximalwert, Standardwert ist der Maximalwert in der aktuellen Datenspalte, wenn er nicht konfiguriert ist

:::

#### minColor

**Type:** `string`

:::note{title="Beschreibung"}
Entsprechende Mindestfarbe

:::

#### maxColor

**Type:** `string`

:::note{title="Beschreibung"}
Farbe entspricht dem Maximalwert

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob die Hintergrunddatenleiste (eine Balkenspalte, um die Größe der aktuellen Zelle anzuzeigen) aktiviert werden soll, ist die Standardeinstellung nicht aktiviert

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Hintergrunddatenbalkenfarbe, wenn die aktuelle Zelle gerade zu einer positiven Zahl ist

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Hintergrunddatenbalkenfarbe, wenn der numerische Wert negativ ist

:::

### barMin

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Minimaler Fortschrittsbalken



Berechnen Sie automatisch den Mindestwert einer Spalte, wenn sie nicht konfiguriert ist

:::

### barMax

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Max. Fortschrittsbalken



Berechnen Sie automatisch den Maximalwert einer Spalte, wenn sie nicht konfiguriert ist

:::

### textColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Zelltextfarbe

:::

### textFontSize

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftgröße der Zelle

:::

### borderColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Rahmenfarbe der Zelle

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Zellrandlinienbreite

:::


## totals

**Type:** `TotalType | undefined`

:::note{title="Beschreibung"}
Zeigt den Typ der Übersichtszeile an, der nur für metrische Spalten gilt

\- 'sum': Summe und Zeile anzeigen

\- 'avg': Mittlere Zeilen anzeigen

\- 'max': Max. Zeilen anzeigen

\- 'min': Minimale Zeile anzeigen

\- 'count': Zähllinien anzeigen



Zeilentyp der Tabellenzusammenfassung

\- 'sum': Summe

\- 'avg': Mittelwert

\- 'max': Max

\- 'min': Minimum

\- 'count': Anzahl

:::

**Beispiel**
```ts
'sum'




```
## theme

**Type:** `Theme | undefined`

:::note{title="Beschreibung"}
Thema des Diagramms, Themen sind Feature-Konfigurationen mit niedrigerer Priorität, Enthält gängige Konfigurationen, die allen Diagrammtypen gemeinsam sind, Diagrammkonfiguration gemeinsam mit einzelnen Klassendiagrammtypen, Eingebaute helle und dunkle Motive, Benutzer können Designs über den Builder anpassen



Theme



Eingebaute helle und dunkle Motive, Neue Themes können über registerTheme angepasst werden.

:::

**Beispiel**
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

:::note{title="Beschreibung"}
Diagrammsprachenkonfiguration, Support'zh\-CN'Und'en\-US'Zweisprachig, Sie können auch intl.setLocale ('zh\-CN') Sprache des Methodensatzes

:::

