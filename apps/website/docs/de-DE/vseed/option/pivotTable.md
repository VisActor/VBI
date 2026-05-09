# PivotTable

:::info{title="Empfohlen"}
\- Empfohlene Feldkonfiguration: `1`Metriken, `1`Dimension (en)

\- Unterstützung der Datenumformung: mind.`1`Metriken, `0`Dimension (en)

:::

:::info{title="Kodierungszuordnung"}
Die PivotTable unterstützt folgende visuelle Kanäle:

`row`: Reihenabmessung, Support`mehrere Dimensionen`, Gruppe in Zeile nach Dimensionswert

`column`: Spaltenabmessung, Support`mehrere Dimensionen`, Gruppieren Sie Spalten nach Dimensionswert

`detail`: Unterteilungskanal, Support`mehrere Kennzahlen`, Metrikwerte in Zellen anzeigen

:::

:::note{title="Beschreibung"}
Pivot-Tabelle, geeignet für multidimensionale Kreuzanalysen; Zeilen- und Spaltendimensionen sowie Kennzahlenberechnungen können flexibel konfiguriert werden

Szenario:

\- Komplexe mehrdimensionale statistische Datenanalyse

\- Datenbohr- und Aggregationsanzeige

\- Erstellung von Geschäftsberichten und Datenexploration

:::

:::warning{title="Warning"}
Datenanforderungen:

\- Mindestens 1 Zeilenabmessung oder 1 Spaltenabmessung oder 1 Metrik

\- Daten müssen aggregiert werden

\- Daten können gruppiert werden

Standardmäßig eingeschaltete Funktionen:

\- Zeilen- und Spaltensortierung, Datenfilterung, Aggregationsberechnung, Zwischensumme/Summe standardmäßig aktiviert

:::


## chartType

**Type:** `"pivotTable"`

:::note{title="Beschreibung"}
PivotTable für mehrdimensionale Daten-Kreuzanalyseszenarien

:::

**Beispiel**
```ts
'pivotTable'




```
## dataset

**Type:** `Record[]`

:::note{title="Beschreibung"}
TidyData-konformer und aggregierter Datensatz, der die Datenquelle und die Struktur des Diagramms definiert, Der vom Benutzer eingegebene Datensatz erfordert keine Verarbeitung, VSeedmit leistungsstarken Datenumformungsfunktionen, Wird seine eigenen Daten umgestalten, Die Daten der Pivot-Tabelle werden schließlich in die entsprechende Baumstruktur konvertiert; Benutzer müssen die Daten nicht manuell verarbeiten.

:::

**Beispiel**
```ts
[{region:'Ostchina', product:'A', sales:1000}, {region:'Ostchina', product:'B', sales:1500}]




```
## dimensions

**Type:** `TableDimension[] | undefined`

:::note{title="Beschreibung"}
Die Zeilen- und Spaltenabmessungen der Pivot-Tabelle werden automatisch zu einer Baumstruktur verarbeitet, und auf Zeilen- und Spaltenachsen abgebildet,

:::

**Beispiel**
```ts
[{id: 'region', alias: 'Region', isRow: true}, {id: 'product', alias: 'Produkte', isColumn: true}]




```
### id

**Type:** `string`

:::note{title="Beschreibung"}
Feld-ID entspricht Dimension

:::

### alias

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Dimensions-Alias

:::

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


## measures

**Type:** `TableMeasure[] | undefined`

:::note{title="Beschreibung"}
PivotTable unterstützt mehrere Dimensionsmetriken

:::

**Beispiel**
```ts
[{id: 'sales', alias: 'Umsatz', aggregation: 'sum'}]




```
### id

**Type:** `string`

:::note{title="Beschreibung"}
Indikator-ID, Kann nicht wiederholt werden

:::

### alias

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Metrischer Slug, Duplikate zulassen, Wenn nicht ausgefüllt, alias ist id

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
Zeilenüberschrift, Schriftgröße der Listenüberschrift

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Zeilenüberschrift, Schriftfarbe der Listenüberschrift

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Zeilenüberschrift, Listenüberschrift Hintergrundfarbe

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Hintergrundfarbe beim Bewegen des Mauszeigers über Zellen in Zeile, Listenkopf, Zellen, die verwendet werden, um hervorzuheben, wo die Zeilen und Spalten der Maus gekreuzt werden

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Wenn die Maus über eine Zelle in einer Reihe fährt, Listenkopf, Alle Zellen, die verwendet werden, um Zeilen und Spalten zu markieren, in denen sich die Maus befindet

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


## indicatorsAsCol

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Gibt an, ob der Indikator als Spalte angezeigt wird. Wenn wahr, wird der Indikator in Spaltenrichtung erweitert, und wenn falsch, wird er in Zeilenrichtung erweitert.

:::

**Beispiel**
```ts
true




```
## totals

**Type:** `PivotTableTotals | undefined`

:::note{title="Beschreibung"}
Gesamt- und Zwischensummenkonfiguration für PivotTable



Gesamtsumme Zwischensumme Konfiguration für PivotTable

:::

**Beispiel**
```ts
{ row: { showGrandTotals: true, showSubTotals: true, subTotalsDimensions: ['category'] } }




```
### row

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title="Beschreibung"}
Zeilensumme Zwischensumme Konfiguration



Gesamte Zwischensummenkonfiguration für Zeile oder Spalte

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Gibt an, ob Summen angezeigt werden sollen (Gesamtzahl der Zeilen/Spalten)

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Zwischensumme anzeigen?

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title="Beschreibung"}
Dimensionen der Zwischensumme, nach welchen Dimensionen die Zwischensumme gruppiert ist

:::

**Beispiel**
```ts
['category', 'region']



```
### column

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title="Beschreibung"}
Gesamte Zwischensummenkonfiguration für Spalten



Gesamte Zwischensummenkonfiguration für Zeile oder Spalte

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Gibt an, ob Summen angezeigt werden sollen (Gesamtzahl der Zeilen/Spalten)

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Zwischensumme anzeigen?

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title="Beschreibung"}
Dimensionen der Zwischensumme, nach welchen Dimensionen die Zwischensumme gruppiert ist

:::

**Beispiel**
```ts
['category', 'region']




```
## theme

**Type:** `Theme | undefined`

:::note{title="Beschreibung"}
Thema des Diagramms, Themen sind Feature-Konfigurationen mit niedrigerer Priorität, Enthält gängige Konfigurationen, die allen Diagrammtypen gemeinsam sind, Diagrammkonfiguration gemeinsam mit einzelnen Klassendiagrammtypen



Eingebaute helle und dunkle Motive, Benutzer können Designs über den Builder anpassen



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
Sprachen



Diagrammsprachenkonfiguration, Support'zh\-CN'Und'en\-US'Zweisprachig, Sie können auch intl.setLocale ('zh\-CN') Sprache des Methodensatzes

:::

