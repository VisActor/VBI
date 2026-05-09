# BarPercent

:::info{title="Empfohlen"}
\- Empfohlene Feldkonfiguration: `1`Metriken, `2`Dimension (en)

\- Unterstützung der Datenumformung: mind.`1`Metriken, `0`Dimension (en)

:::

:::info{title="Kodierungszuordnung"}
Prozentuale Balkendiagramme unterstützen die folgenden visuellen Kanäle:

`yAxis`: yWellenkanal, Support`mehrere Dimensionen`, Zuordnung zur y-Achse anhand des Dimensionswerts

`xAxis`: xWellenkanal, Support`mehrere Kennzahlen`, Zuordnung zur x-Achse anhand des Kennzahlenwerts

`detail`: Unterteilungskanal, Support`mehrere Dimensionen`, wird verwendet, um feinere Daten innerhalb derselben Farbserie anzuzeigen

`color`: Farbkanäle, Support`mehrere Dimensionen`oder `eine Kennzahl`, Dimensionsfarben unterscheiden verschiedene Datenreihen, Kennzahlenfarben bilden Kennzahlenwerte linear auf Grafikfarben ab

`tooltip`: Eingabeaufforderungskanal, Support`mehrere Dimensionen`Und `mehrere Kennzahlen`, wird beim Bewegen der Maus über einen Datenpunkt angezeigt

`label`: Label-Kanal, Support`mehrere Dimensionen`Und `mehrere Kennzahlen`, zeigt Datenbeschriftungen auf Datenpunkten an

:::

:::note{title="Beschreibung"}
Prozentuales Balkendiagramm, geeignet für Szenarien, in denen der Anteil jeder Kategorie horizontal angezeigt wird und die X-Achse den Anteil der Daten in prozentualer Form anzeigt

Szenario:

\- Vergleich des Anteils, wenn der Kategoriename lang ist

\- Horizontale Kompositionsanalyse mehrdimensionaler Daten

\- Szenarien, die gleichzeitig mit dem Ranking und der Proportion angezeigt werden

:::

:::warning{title="Warning"}
Datenanforderungen:

\- Mindestens 1 Dimensionsfeld und 1 Metrikfeld

\- Die Summe aller Kategorien beträgt 100%

\- Unterstützt Multi-Family Stacked Display Ratio

Standardmäßig eingeschaltete Funktionen:

\- Standardmäßig offene Legende, Achse, Prozentbeschriftung, Eingabeaufforderung, Proportionsberechnung

:::


## chartType

**Type:** `"barPercent"`

:::note{title="Beschreibung"}
Prozentuales Balkendiagramm, das den Datenanteil jeder Kategorie in einem horizontalen Prozentsatz anzeigt

:::

**Beispiel**
```ts
'barPercent'




```
## dataset

**Type:** `Record[]`

:::note{title="Beschreibung"}
Datenquelle, TidyData-konformer und aggregierter Datensatz, der die Datenquelle und die Struktur des Diagramms definiert, Der vom Benutzer eingegebene Datensatz erfordert keine Verarbeitung, VSeedmit leistungsstarken Datenumformungsfunktionen, Wird seine eigenen Daten umgestalten, Prozentuale Balkendaten werden schließlich in 2 Dimensionen konvertiert, 1Metriken.

:::

**Beispiel**
```ts
[{category:'A', value:30}, {category:'B', value:70}]




```
## dimensions

**Type:** `BarDimension[] | undefined`

:::note{title="Beschreibung"}
Dimension, Die erste Dimension geht zur Y-Achse, Die verbleibenden Dimensionen werden mit dem Metriknamen zusammengeführt (wenn mehrere Metriken vorhanden sind), Wird als Legendenelement angezeigt.

:::

**Beispiel**
```ts
[{id: 'category', alias: 'Kategorie'}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title="Beschreibung"}
Kanäle für Dimensionsmapping

\- yAxis: Unterstützung für die Abbildung mehrerer Dimensionen auf die y-Achse

\- color: Unterstützt die Zuordnung mehrerer Dimensionen zu Farbkanälen

\- detail: Unterstützt die Zuordnung mehrerer Dimensionen zu Detailkanälen

\- tooltip: Unterstützt die Zuordnung mehrerer Dimensionen zu Hinweiskanälen

\- label: Unterstützt die Zuordnung mehrerer Dimensionen zu Label-Kanälen

\- row: Unterstützt die Zuordnung mehrerer Dimensionen zu einem Zeilenkanal

\- column: Unterstützung für die Zuordnung mehrerer Dimensionen zu einem Spaltenkanal

:::


## measures

**Type:** `BarMeasure[] | undefined`

:::note{title="Beschreibung"}
Kennzahl, Metriken werden automatisch zu einer einzigen Metrik zusammengeführt, Auf X-Achse zuordnen, Wenn es mehrere Metriken gibt, Der Metrikname wird mit dem Rest der Dimensionen zusammengeführt, Wird als Legendenelement angezeigt.

:::

**Beispiel**
```ts
[{id: 'value', alias: 'Wertverhältnis', format: 'percent'}]




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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title="Beschreibung"}
Indikator zugeordneter Kanal

\- xAxis: x-Achse der metrischen Zuordnung

\- detail: Details der Metrik-Zuordnung

\- color: Zugewiesene Farbe des Indikators

\- label: Beschriftung für Metrik-Zuordnung

\- tooltip: Tipps für die metrische Zuordnung

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
Seitennummerierung



Seitennummerierungskonfiguration, verwendet, um die Seitennummerierungsfunktion des Diagramms zu konfigurieren

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
Diagramm-Hintergrundfarbe, Standardmäßig transparenter Hintergrund, Hintergrundfarbe kann eine Farbstring sein, Beispiel'red', 'blue', Es kann auch Sechskant sein, rgboder rgba'#ff0000', 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title="Beschreibung"}
Farbkonfiguration, Farbschema zur Definition von Diagrammen, Farbliste einfügen, Farbzuordnung, Farbverlauf etc.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title="Beschreibung"}
Diskretes Farbschema, Farbschemata werden verwendet, um die Farben verschiedener Elemente in einem Diagramm zu definieren

:::

**Beispiel**
```ts
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



```
### linearColorScheme

**Type:** `string[] | undefined`

:::note{title="Beschreibung"}
Farbschema mit linearem Verlauf, Das Farbschema mit linearem Farbverlauf wird verwendet, um die Farben verschiedener Elemente im Diagramm zu definieren

:::

**Beispiel**
```ts
['#FFCDD2, #F8BBD0]



```
### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title="Beschreibung"}
Farbzuordnung, Farbzuordnung wird verwendet, um Datenwerte bestimmten Farben zuzuordnen

:::

**Beispiel**
```ts
{
 'profit': 'red',
 'sales': 'blue',
}



```
### positiveColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Positive und negative Farbkonfiguration, Farbe, die verwendet wird, um positive Werte im Diagramm zu definieren

:::

### negativeColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Positive und negative Farbkonfiguration, Farbe, die verwendet wird, um negative Werte im Diagramm zu definieren

:::


## label

**Type:** `Label | undefined`

:::note{title="Beschreibung"}
Etikettenkonfiguration, Datenbeschriftungen zur Definition von Diagrammen, Geben Sie die Position des Datenetiketts an, Format, Stil, etc.

:::


### enable

**Type:** `false | true`

:::note{title="Beschreibung"}
Ob die Tab-Funktion eingeschaltet ist

:::

### wrap

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob das Etikett umwickelt ist

:::

### showValue

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Gibt an, ob das Label den Metrikwert anzeigt

Multi-Indikator-Szenarien, Machen Sie sich keine Sorgen über widersprüchliche Werte über mehrere Metriken hinweg, Weil alle plotbezogenen Metriken, vorbeigehen.`foldMeasures`Prozess, Zu einer Metrik zusammenführen, Stellt einen Datenpunkt dar, also ist es nicht widersprüchlich.

Hinweis: Codierung hat höhere Label-Priorität, Diese Konfiguration hat keinen Einfluss auf das Label der Codierung

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Gibt an, ob die Beschriftung den Prozentsatz des metrischen Wertes anzeigt

Multi-Indikator-Szenarien, Machen Sie sich keine Sorgen über widersprüchliche Werte über mehrere Metriken hinweg, Weil alle plotbezogenen Metriken, vorbeigehen.`foldMeasures`Prozess, Zu einer Metrik zusammenführen, Stellt einen Datenpunkt dar, also ist es nicht widersprüchlich.

Hinweis: Codierung hat höhere Label-Priorität, Diese Konfiguration hat keinen Einfluss auf das Label der Codierung

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Gibt an, ob das Etikett das Maßetikett anzeigt

Alle Abmessungsbeschriftungen anzeigen

Hinweis: Codierung hat höhere Label-Priorität, Diese Konfiguration hat keinen Einfluss auf das Label der Codierung

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Gibt an, ob der Etikettenwert automatisch formatiert wird, autoFormat Wenn wahr, numFormat Deaktivierte Konfiguration

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="Beschreibung"}
Konfiguration zur Formatierung von Beschriftungswerten, und `measure` in `format` Zusammenführen durchführen, `measure` in `format` Höhere Priorität. numFormat Priorität ist niedriger als autoFormat

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

### labelFontSize

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftgröße der Beschriftung

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="Beschreibung"}
Schriftstärke der Beschriftung

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Beschriftung Hintergrundfarbe

:::

### labelStroke

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Farbe des Etikettenstrichs

:::

### labelColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Schriftfarbe der Beschriftung

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob das Label die Schriftfarbe basierend auf der Primitivfarbe automatisch invertiert

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title="Beschreibung"}
Etikettenposition

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob die Tag-Anti-Overlap-Funktion aktiviert ist

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="Beschreibung"}
Etikettenfilterung, die bedingte Beziehung zwischen den Selektoren ist standardmäßig Oder

:::


#### field

**Type:** `string`

:::note{title="Beschreibung"}
Dimensionsfeld, dimensions ID eines Artikels

:::

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

**Type:** `ChartDynamicFilter | undefined`

:::note{title="Beschreibung"}
Dynamische Filter (KI-generierte Codeausführung)



Implementieren Sie komplexe Datenfilterungslogik mit KI-generiertem JavaScript-Code



Kernkompetenzen:

\- Unterstützung beliebig komplexer Datenfilter

\- Datenmanipulation mit integrierten Werkzeugfunktionen

\- Sichere Ausführung in einer Browser-Umgebung (Web-Worker-Sandbox)



Umgebungsanforderungen: Nur Browser-Umgebung wird unterstützt, Node.js-Umgebung wird Fallback verwenden



Hinweis: Selektor und dynamicFilter können nicht gleichzeitig verwendet werden, dynamicFilter hat höhere Priorität



Diagramm Dynamische Filterkonfiguration



Filtern von Diagrammmarkierungen (Spalten, Punkte usw.) mit KI-generiertem JavaScript-Code

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
"Spalten mit einem Umsatz von mehr als 1000 hervorheben"

"Markieren Sie die profitabelsten Spalten in jeder Region"



```
#### code

**Type:** `string`

:::note{title="Beschreibung"}
AI Generierter JavaScript-Filtercode



\- Es können nur eingebaute Werkzeugfunktionen verwendet werden (Zugriff über_oder R)

\- Eingabeparameter: Daten (Array), jedes Element enthält __ row_Indexfeld, das die Zeilennummer darstellt

\- Array von Zeilenindizes und Feldern muss zurückgegeben werden: ``Array<{ __row_index: number, field: string }>``

\- __row_index Stellt die Zeilennummer des ursprünglichen Datenelements dar, und Feld gibt das Feld an, das hervorgehoben werden muss

\- Nicht verwenden: eval, Function, Asynchrone Operationen, DOM API, Netzwerkanfrage

:::

**Beispiel**
```ts
Markieren Sie das Verkaufsfeld für Datenartikel mit einem Umsatz von mehr als 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Markieren Sie die Datenelemente mit der höchsten Marge in jeder Region
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

Markieren Sie gefilterte Datenelemente mit mehreren Bedingungen
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


## legend

**Type:** `Legend | undefined`

:::note{title="Beschreibung"}
Legendenkonfiguration, Legende zur Definition eines Diagramms, Geben Sie den Ort der Legende an, Format, Stil, etc.

:::


### enable

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob die Legendenfunktion eingeschaltet ist

:::

**Beispiel**
```ts
enable: true



```
### border

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Gibt an, ob der Legendenrahmen eingeschaltet ist

:::

:::warning{title="Warning"}
Nur diskrete Legenden sind gültig

:::

**Beispiel**
```ts
border: true



```
### labelColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Legende Schriftfarbe

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Farbe des Paginator-Symbols

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Paginator-Symbol graue Farbe

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Legende Schriftgröße

:::

**Beispiel**
```ts
labelFontSize: 10



```
### labelFontColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Legende Schriftfarbe

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="Beschreibung"}
Schriftstärke Legende

:::

**Beispiel**
```ts
labelFontWeight: 400



```
### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title="Beschreibung"}
Legendenform

:::

:::warning{title="Warning"}
Nur diskrete Legenden sind gültig

:::

**Beispiel**
```ts
shapeType: 'circle'



```
### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title="Beschreibung"}
Legendenposition

:::

**Beispiel**
```ts
position: 'rightTop'



```
### maxSize

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Wenn es eine große Anzahl von Legenden gibt, Maximale Anzahl von Spalten oder Legende maximale Anzahl von Zeilen

Wenn die Position horizontal ist (unten, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSizeSteuert die Anzahl der angezeigten Spalten

Wenn die Position vertikal ist (links, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSizeSteuern Sie die Anzahl der angezeigten Zeilen

:::

:::warning{title="Warning"}
Nur diskrete Legenden sind gültig

:::

**Beispiel**
```ts
maxSize: 2




```
## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title="Beschreibung"}
Innenabstand des Grundstücksbereichs



Region, die VChart zugeordnet ist[0].padding，Wird verwendet, um Platz für Erweiterungselemente außerhalb des Zeichenbereichs zu reservieren, wie z. B. Beschriftungen, Beschriftungen usw.

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

:::note{title="Beschreibung"}
Prompt-Konfiguration, Tipps zum Definieren von Diagrammen, Geben Sie die Position des Tooltips an, Format, Stil, etc.

:::


### enable

**Type:** `false | true`

:::note{title="Beschreibung"}
Gibt an, ob die Funktion für die Eingabeaufforderung aktiviert ist

:::


## brush

**Type:** `Brush | undefined`

:::note{title="Beschreibung"}
Auswahl der Box



Box-Konfiguration zum Aktivieren/Deaktivieren der Pinselbox-Fähigkeit



Auswahlkonfiguration des Diagrammfelds

:::


### enable

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Pinselkasten aktivieren oder nicht

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title="Beschreibung"}
brushArt der



Definieren Sie die Form und Richtung der Flipbox

\- `rect`: Die rechteckige Boxauswahl ermöglicht die gleichzeitige Boxauswahl sowohl in der X-Achsen- als auch in der Y-Achsen-Richtung

\- `polygon`: Polygonfeldauswahl, indem Sie auf mehrere Punkte klicken, um ein beliebiges Polygon für die Feldauswahl zu zeichnen

\- `x`: XAuswahl des Achsenrichtungsfelds, nur in der Auswahl des X-Achsenrichtungsfelds, die Y-Achsenrichtung ist nicht begrenzt

\- `y`: YAchsrichtung Boxauswahl, nur Boxauswahl in Y-Achsenrichtung, X-Achsenrichtung ist nicht begrenzt

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title="Beschreibung"}
Box-Auswahlmodus, Einzel- oder Mehrfachauswahl



Spülmodus definieren

\- `single`: Radiomodus, jeweils nur ein Kontrollkästchen

\- `multiple`: Mehrfachauswahlmodus, mehrere Kontrollkästchen können gleichzeitig vorhanden sein

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Aktivieren Sie, ob das Kontrollkästchen am Ende des Kästchens deaktiviert werden soll

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="Beschreibung"}
Boxed Data Styles



Definieren Sie Stile für gelöschte ausgewählte Datenpunkte

:::


#### opacity

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Deckkraft



Undurchlässigkeit des durch das Feld ausgewählten Datenpunkts, Wertebereich 0\-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Strichfarbe

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Hubbreite

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="Beschreibung"}
Ungeprüfte Datenstile



Definieren Sie Stile für Datenpunkte, die nicht gespült werden

:::


#### opacity

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Deckkraft



Opazität ungeprüfter Datenpunkte, Wertebereich 0\-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Strichfarbe

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Hubbreite

:::


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title="Beschreibung"}
Animationskonfiguration



Diagramm-Animationskonfiguration, die optionale Effekte nach Diagrammtyp einschränkt

:::


### enable

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob Balken-/Säulendiagramm-Animationen aktiviert werden

:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title="Beschreibung"}
Parameter für die Animation von Balken-/Säulendiagrammen

:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title="Beschreibung"}
Leisten-/Spaltenzulassungs-Animationskonfiguration

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title="Beschreibung"}
Balken-/Säulendiagramm-Zulassungseffekt mit Wachstumsanimation

:::

##### enable

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob die aktuelle Animationsphase aktiviert ist

:::

##### ease

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Animierte Easing-Funktion

:::

##### duration

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Animationsdauer in Millisekunden

:::

##### color

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Animierte Highlight- oder Atmosphärenfarbe

:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title="Beschreibung"}
Balken-/Säulendiagramm-Animationskonfiguration aktualisieren

:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title="Beschreibung"}
Balken-/Säulendiagramm-Aktualisierungseffekt mit Unterstützung für Wachstums- und Einzugsanimationen

:::

##### enable

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob die aktuelle Animationsphase aktiviert ist

:::

##### ease

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Animierte Easing-Funktion

:::

##### duration

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Animationsdauer in Millisekunden

:::

##### color

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Animierte Highlight- oder Atmosphärenfarbe

:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title="Beschreibung"}
Balken-/Säulendiagramm-Schleifen-Animationskonfiguration

:::


##### enable

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob die Schleifenanimation aktiviert werden soll

:::

##### interval

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schleifenanimationsintervall in Millisekunden

:::

##### loop

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title="Beschreibung"}
Balken-/Säulendiagramm-Schleifen-Animationskonfiguration

:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title="Beschreibung"}
Balken-/Spaltenzyklus-Effekt

:::

###### enable

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob die aktuelle Animationsphase aktiviert ist

:::

###### ease

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Animierte Easing-Funktion

:::

###### duration

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Animationsdauer in Millisekunden

:::

###### color

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Animierte Highlight- oder Atmosphärenfarbe

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title="Beschreibung"}
Balken-/Säulendiagramm Atmosphären-Animationskonfiguration

:::


###### ease

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Atmosphere Animation Easing-Funktion

:::

###### color

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Vibe-Animationsfarbe

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title="Beschreibung"}
Vibe-Animationseffekt zur Unterstützung von Wellen, Unsichtbarkeit und Atmung

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title="Beschreibung"}
xAchse, Wertachse, xAchsenkonfiguration, Die zur Definition des Diagramms verwendete x-Achse, Position der x-Achse einschließen, Format, Stil, etc.

:::


### visible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob die Achse sichtbar ist

:::

### min

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Min. Achse, Priorität ist höher als schön und null

:::

### max

**Type:** `number | boolean | undefined`

:::note{title="Beschreibung"}
Maximalwert der Achse, Priorität ist höher als schön und null, Wenn wahr, dann wird der Maximalwert automatisch basierend auf dem Datenbereich berechnet

:::

### log

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob eine logarithmische Achse verwendet werden soll, Gültig nur für numerische Achsen

:::

### logBase

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Unterseite der Stammachse, Gültig nur für numerische Achsen

:::

### nice

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob das Skalenintervall des Schafts automatisch angepasst werden soll, um das Skalenetikett besser lesbar zu machen, Wenn min und max konfiguriert sind, Dieses Konfigurationselement ist ungültig, Gültig nur für numerische Achsen

:::

### inverse

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob die Achse umgekehrt ist, Gültig nur für numerische Achsen

:::

### zero

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob ein 0-Wert auf der Achse erzwungen werden soll, Wenn min und max konfiguriert sind, Dieses Konfigurationselement ist ungültig, Gültig nur für numerische Achsen

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob Beschriftungen für numerische Achsen automatisch formatiert werden sollen, Gültig nur für numerische Achsen, autoFormat Wenn wahr, numFormat Deaktivierte Konfiguration

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="Beschreibung"}
Numerische Formatierung von Werteachsen, Gültig nur für numerische Achsen, Priorität ist niedriger als autoFormat

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

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="Beschreibung"}
XAchsenskalenbeschriftung

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Überprüfen Sie, ob die Markierungen sichtbar sind

:::

#### labelColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Etikettenfarbe

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftgröße der Beschriftung

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftstärke der Beschriftung

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Etikettendrehwinkel

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="Beschreibung"}
XAchsenlinie

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ist die Achse sichtbar

:::

#### lineColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Achsenlinienfarbe

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Achsenlinienbreite

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="Beschreibung"}
XAchsenteilstriche

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob die Skala sichtbar ist

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob die Waage nach innen gerichtet ist

:::

#### tickColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Skalenfarbe

:::

#### tickSize

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Abmessungen skalieren

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="Beschreibung"}
XAchstitel

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ist der Titel sichtbar

:::

#### titleText

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Überschriftstext, folgt standardmäßig der Feldkonfiguration

:::

#### titleColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Überschriftenfarbe

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftgröße der Überschrift

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftstärke der Überschrift

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="Beschreibung"}
XAchsenrasterlinien

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Rasterfarbe:

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Gitternetzlinienbreite

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title="Beschreibung"}
Gitterlinientyp

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="Beschreibung"}
YAchsen-Animationskonfiguration

:::


#### duration

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Dauer der Animation

:::

#### easing

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Animierte Lockerungsfunktion

:::


## yAxis

**Type:** `YBandAxis | undefined`

:::note{title="Beschreibung"}
yAchse, Kategorie-Achse, yAchsenkonfiguration, zur Definition der y-Achse des Diagramms, einschließlich Position, Format, Stil usw. der y-Achse

:::


### visible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob die Achse sichtbar ist

:::

### inverse

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob die Achse umgekehrt ist, Gültig nur für numerische Achsen

:::

### zero

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob ein 0-Wert auf der Achse erzwungen werden soll, Wenn min und max konfiguriert sind, Dieses Konfigurationselement ist ungültig, Gültig nur für numerische Achsen

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Achsenbeschriftung, AutoHide, 2wenn sich Etiketten überlappen (Intervall ist kleiner als autoHideGap), Blendet die Etiketten, die die Überlappung verursachen, automatisch aus. Gilt nur für Katalogachsen.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Achsenbeschriftung, Intervall automatisch ausblenden, Wenn das Intervall zwischen 2 Textbeschriftungen kleiner als autoHideGap ist, Blendet die Etiketten, die die Überlappung verursachen, automatisch aus. Gilt nur für Katalogachsen.

autoHideEin, AutoHide verwenden, Auf autoHideSeparation setzen

autoHideBei Abschluss, Bemusterung mit Bemusterung, Auf minGap setzen

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Achsenbeschriftung, Automatisch drehen, Wenn die Etikettenbreite die Achslänge überschreitet, Beschriftungen automatisch drehen. Gilt nur für Kategorieachsen.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title="Beschreibung"}
Achsenbeschriftung, Winkelbereich für automatische Drehung; bei aktivierter Autorotation der Drehwinkelbereich der Beschriftungen. Gilt nur für Kategorieachsen.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Achsenbeschriftung, Automatische Begrenzung der Länge, Wenn die Etikettenbreite die Achslänge überschreitet, Äußere Ellipsen zeigt, Beschriftung sichtbar nach Mauszeiger, Beschränken Sie die Tab-Breite automatisch. Gilt nur für Katalogachsen.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Achsenbeschriftung, Maximale Länge einer Länge automatisch begrenzen, Wenn der Beschriftungstext die maximale Länge überschreitet, Äußere Ellipsen zeigt, Beschriftung sichtbar nach dem Mauszeiger. Gilt nur für Katalogachsen.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="Beschreibung"}
XAchsenskalenbeschriftung

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Überprüfen Sie, ob die Markierungen sichtbar sind

:::

#### labelColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Etikettenfarbe

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftgröße der Beschriftung

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftstärke der Beschriftung

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Etikettendrehwinkel

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="Beschreibung"}
XAchsenlinie

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ist die Achse sichtbar

:::

#### lineColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Achsenlinienfarbe

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Achsenlinienbreite

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="Beschreibung"}
XAchsenteilstriche

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob die Skala sichtbar ist

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob die Waage nach innen gerichtet ist

:::

#### tickColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Skalenfarbe

:::

#### tickSize

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Abmessungen skalieren

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="Beschreibung"}
XAchstitel

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ist der Titel sichtbar

:::

#### titleText

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Überschriftstext, folgt standardmäßig der Feldkonfiguration

:::

#### titleColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Überschriftenfarbe

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftgröße der Überschrift

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftstärke der Überschrift

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="Beschreibung"}
XAchsenrasterlinien

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Rasterfarbe:

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Gitternetzlinienbreite

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title="Beschreibung"}
Gitterlinientyp

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="Beschreibung"}
YAchsen-Animationskonfiguration

:::


#### duration

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Dauer der Animation

:::

#### easing

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Animierte Lockerungsfunktion

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title="Beschreibung"}
Horizontale Tooltip-Konfiguration, Horizontale Eingabeaufforderung zum Definieren eines Diagramms, Enthält die Farbe des horizontalen Eingabefelds, den Etikettenstil usw.



Die rechteckige Bereichskonfiguration des Fadenkreuzes, bei der es sich um einen Konfigurationstyp handelt, der verwendet wird, um den rechteckigen Bereich des Fadenkreuzes im Diagramm anzuzeigen

:::


### visible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob der rechteckige Bereich des Fadenkreuzes angezeigt werden soll

:::

### rectColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Rechteckige Flächenfarbe des Fadenkreuzes

:::

### labelColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Fadenkreuz rechteckiger Bereich Beschriftungsfarbe

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Gibt an, ob rechteckige Flächenbeschriftungen mit Fadenkreuz angezeigt werden sollen

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Fadenkreuz rechteckiger Bereich Beschriftung Hintergrundfarbe

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title="Beschreibung"}
Stange gestapelt abgerundet

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title="Beschreibung"}
Die maximale Höhe des Rechtecks, die entweder ein Pixelwert oder eine prozentuale Zeichenfolge sein kann

:::


## sort

**Type:** `Sort | undefined`

:::note{title="Beschreibung"}
YAchsen-Sortierkonfiguration, Unterstützt die Sortierung nach Dimension oder Metrik, und benutzerdefinierte Sortierreihenfolge



Sortierkonfiguration der Kategorieachse, Unterstützt die Sortierung nach Dimension oder Metrik, und benutzerdefinierte Sortierreihenfolge

:::

**Beispiel**
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
oder
\- customOrder:['2019', '2020', '2021']




```
### order

**Type:** `"asc" | "desc" | undefined`

:::note{title="Beschreibung"}
Sortierreihenfolge, Optionaler Wert ist 'asc' oder 'desc'

:::

**Beispiel**
```ts
order:'asc'



```
### orderBy

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Abhängige Felder sortieren, Kann Dimensions-ID oder Metrik-ID sein

:::

**Beispiel**
```ts
\- orderBy:'date'
\- orderBy:'profit'



```
### customOrder

**Type:** `string[] | undefined`

:::note{title="Beschreibung"}
Benutzerdefinierte Sortierreihen, Diese Reihenfolge wird direkt auf die Kategorieachse angewendet

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title="Beschreibung"}
Legenden-Sortierkonfiguration, Unterstützt die Sortierung nach Dimension oder Metrik, und benutzerdefinierte Sortierreihenfolge



Legenden-Sortierkonfiguration, Unterstützt die Sortierung nach Dimension oder Metrik, und benutzerdefinierte Sortierreihenfolge; Arrays von links nach rechts oder von oben nach unten sortieren

:::

**Beispiel**
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
oder
\- customOrder:['2019', '2020', '2021']




```
### order

**Type:** `"asc" | "desc" | undefined`

:::note{title="Beschreibung"}
Sortierreihenfolge, Optionaler Wert ist 'asc' oder 'desc'

:::

**Beispiel**
```ts
order:'asc'



```
### orderBy

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Abhängige Felder sortieren, Kann Dimensions-ID oder Metrik-ID sein

:::

**Beispiel**
```ts
\- orderBy:'date'
\- orderBy:'profit'



```
### customOrder

**Type:** `string[] | undefined`

:::note{title="Beschreibung"}
Benutzerdefinierte Sortierreihen, Die Reihenfolge wird direkt auf die Legende angewendet, Von links nach rechts oder von oben nach unten aufsteigend, Von rechts nach links oder von unten nach oben absteigend

:::


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


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title="Beschreibung"}
Rechteckiger primitiver Stil



Balkendiagramm-Stilkonfiguration, Balkendiagrammstile zum Definieren von Diagrammen, Farbe für Balkendiagramm einfügen, Rahmen, Abgerundete Ecken usw.

Unterstützt globale Stil- oder bedingte Stilkonfiguration

Datenfilter

Wenn der Selektor konfiguriert ist, Geben Sie einen numerischen Selektor an, Lokaler Datenselektor, Bedingter Dimensionswähler, Der Auswahlschalter für die bedingte Anzeige verfügt über vier Arten von Datenabgleichsfunktionen

Wenn der Selektor nicht konfiguriert ist, dann wird der Stil global wirksam.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="Beschreibung"}
Datenselektor



Wenn der Selektor konfiguriert ist, Geben Sie einen numerischen Selektor an, Lokaler Datenselektor, Bedingter Dimensionswähler, Der Auswahlschalter für die bedingte Anzeige verfügt über vier Arten von Datenabgleichsfunktionen

Wenn der Selektor nicht konfiguriert ist, dann wird der Stil global wirksam.

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




```
#### field

**Type:** `string`

:::note{title="Beschreibung"}
Dimensionsfeld, dimensions ID eines Artikels

:::

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

**Type:** `ChartDynamicFilter | undefined`

:::note{title="Beschreibung"}
Dynamische Filter (KI-generierte Codeausführung)



Implementieren Sie komplexe Datenfilterungslogik mit KI-generiertem JavaScript-Code

Geeignet für Szenarien, in denen statische Selektoren schwer auszudrücken sind, wie Top N, statistische Analyse, komplexe Bedingungen usw.



Kernkompetenzen:

\- Unterstützung beliebig komplexer Datenfilter

\- Datenmanipulation mit integrierten Werkzeugfunktionen

\- Sichere Ausführung in einer Browser-Umgebung (Web-Worker-Sandbox)



Umgebungsanforderungen: Nur Browser-Umgebung wird unterstützt, Node.js-Umgebung wird Fallback verwenden



Hinweis: Selektor und dynamicFilter können nicht gleichzeitig verwendet werden, dynamicFilter hat höhere Priorität



Diagramm Dynamische Filterkonfiguration



Filtern von Diagrammmarkierungen (Spalten, Punkte usw.) mit KI-generiertem JavaScript-Code

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
"Spalten mit einem Umsatz von mehr als 1000 hervorheben"

"Markieren Sie die profitabelsten Spalten in jeder Region"



```
#### code

**Type:** `string`

:::note{title="Beschreibung"}
AI Generierter JavaScript-Filtercode



\- Es können nur eingebaute Werkzeugfunktionen verwendet werden (Zugriff über_oder R)

\- Eingabeparameter: Daten (Array), jedes Element enthält __ row_Indexfeld, das die Zeilennummer darstellt

\- Array von Zeilenindizes und Feldern muss zurückgegeben werden: ``Array<{ __row_index: number, field: string }>``

\- __row_index Stellt die Zeilennummer des ursprünglichen Datenelements dar, und Feld gibt das Feld an, das hervorgehoben werden muss

\- Nicht verwenden: eval, Function, Asynchrone Operationen, DOM API, Netzwerkanfrage

:::

**Beispiel**
```ts
Markieren Sie das Verkaufsfeld für Datenartikel mit einem Umsatz von mehr als 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Markieren Sie die Datenelemente mit der höchsten Marge in jeder Region
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

Markieren Sie gefilterte Datenelemente mit mehreren Bedingungen
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

### barVisible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ist der Balken primitiv (rechteckig primitiv) sichtbar?

:::

### barColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Spalte primitive (rechteckige primitive) Farbe

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Spalte primitiv (rechteckig primitiv) Farbtransparenz

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Balken-Meta (Rechteck-Meta) Rahmenfarbe

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Säulenprimitive (rechteckige Primitive) Rahmenbreite

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Beschreibung"}
Säulen primitiver (rechteckiger primitiver) Rahmenstil

:::

**Beispiel**
```ts
solid

dashed

dotted



```
### barBorderOpacity

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Säulenprimitiv (rechteckig primitiv) Radius



Strichtransparenz des Balken-Primitives (Rechteck-Primitives)

:::

**Beispiel**
```ts
4

[0, 0, 10, 10]



```
### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title="Beschreibung"}
Callout Points



Pinpoint-Konfiguration, Basierend auf ausgewählten Daten, Callout-Punkte für das Diagramm definieren, Geben Sie die Position des Callout-Punktes an, Format, Stil, etc.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="Beschreibung"}
Selektor für Callout-Punkte, Wird verwendet, um Datenpunkte auszuwählen.

:::


#### field

**Type:** `string`

:::note{title="Beschreibung"}
Dimensionsfeld, dimensions ID eines Artikels

:::

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

### measureId

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Gibt die Metrik-ID an, zu der das Callout gehört.Im Multi-Measure-Szenario können Sie mit dem Selektor kombinieren, um den Callout-Punkt, der dem Zielindikator entspricht, eindeutig zu lokalisieren.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="Beschreibung"}
Dynamische Filter (KI-generierte Codeausführung)



Implementieren Sie komplexe Datenfilterungslogik mit KI-generiertem JavaScript-Code

Geeignet für Szenarien, in denen statische Selektoren schwer auszudrücken sind, wie Top N, statistische Analyse, komplexe Bedingungen usw.



Kernkompetenzen:

\- Unterstützung beliebig komplexer Datenfilter

\- Datenmanipulation mit integrierten Werkzeugfunktionen

\- Sichere Ausführung in einer Browser-Umgebung (Web-Worker-Sandbox)



Umgebungsanforderungen: Nur Browser-Umgebung wird unterstützt, Node.js-Umgebung wird Fallback verwenden



Hinweis: Selektor und dynamicFilter können nicht gleichzeitig verwendet werden, dynamicFilter hat höhere Priorität



Diagramm Dynamische Filterkonfiguration



Filtern von Diagrammmarkierungen (Spalten, Punkte usw.) mit KI-generiertem JavaScript-Code

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
"Spalten mit einem Umsatz von mehr als 1000 hervorheben"

"Markieren Sie die profitabelsten Spalten in jeder Region"



```
#### code

**Type:** `string`

:::note{title="Beschreibung"}
AI Generierter JavaScript-Filtercode



\- Es können nur eingebaute Werkzeugfunktionen verwendet werden (Zugriff über_oder R)

\- Eingabeparameter: Daten (Array), jedes Element enthält __ row_Indexfeld, das die Zeilennummer darstellt

\- Array von Zeilenindizes und Feldern muss zurückgegeben werden: ``Array<{ __row_index: number, field: string }>``

\- __row_index Stellt die Zeilennummer des ursprünglichen Datenelements dar, und Feld gibt das Feld an, das hervorgehoben werden muss

\- Nicht verwenden: eval, Function, Asynchrone Operationen, DOM API, Netzwerkanfrage

:::

**Beispiel**
```ts
Markieren Sie das Verkaufsfeld für Datenartikel mit einem Umsatz von mehr als 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Markieren Sie die Datenelemente mit der höchsten Marge in jeder Region
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

Markieren Sie gefilterte Datenelemente mit mehreren Bedingungen
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

### text

**Type:** `string | string[] | undefined`

:::note{title="Beschreibung"}
Callout-Text

:::

**Beispiel**
```ts
'Callout-Text'



```
### textColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Textfarbe

:::

**Beispiel**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftgröße des Textes

:::

**Beispiel**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftstärke des Textes

:::

**Beispiel**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="Beschreibung"}
Textausrichtung, Generell, Nach rechts setzen, Text links neben dem Callout, Stellen Sie sicher, dass Sie im sichtbaren Bereich des Diagramms angezeigt werden

Empfohlene Einstellung ist'right', Dadurch wird sichergestellt, dass sich der Text links vom Callout befindet

right: Text links neben dem Callout, Callout am rechten Textrand ausrichten

left: Text rechts vom Markierungspunkt, Callout am linken Textrand ausrichten

center: Text in der Mitte des Callouts, Zentriert ausgerichtete Callout-Punkte für Text

:::

**Beispiel**
```ts
'right' Text links neben dem Callout



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Beschreibung"}
Vertikale Textausrichtung, Generell, Nach oben setzen, Text erscheint am unteren Rand des Callouts, Stellen Sie sicher, dass Sie im sichtbaren Bereich des Diagramms angezeigt werden

Empfohlene Einstellung ist'top', Dadurch wird sichergestellt, dass der Text vollständig im sichtbaren Bereich des Diagramms angezeigt wird

top: Text am unteren Rand des Callouts, Text Top Edge Align Callout

middle: Text in der Mitte des Callouts, Zentriert ausgerichtete Callout-Punkte für Text

bottom: Text oben im Callout, Text Callout zur Ausrichtung des unteren Randes

:::

**Beispiel**
```ts
'top' Text am unteren Rand des Callouts



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Hintergrund sichtbar

:::

**Beispiel**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Hintergrundfarbe

:::

**Beispiel**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Hintergrund Rahmenfarbe

:::

**Beispiel**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Hintergrund Rahmenbreite

:::

**Beispiel**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Rahmenradius im Hintergrund

:::

**Beispiel**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Hintergrundabstand

:::

**Beispiel**
```ts
4



```
### offsetY

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Der versetzte Pixelabstand des Anmerkungspunktes als Ganzes in Y-Richtung, Wenn der Callout-Punkt über dem Diagramm liegt (wenn der Wert groß ist), Empfohlen, auf einen positiven Wert gesetzt zu werden, Wenn der Callout-Punkt unter dem Diagramm liegt (niedrigerer Wert), Es wird empfohlen, ihn auf einen negativen Wert zu setzen.

Negative Werte werden insgesamt nach oben verschoben, z. B. eingestellt auf\-10, dann enthält die gesamte Callout-Komponente den Text, den Texthintergrund,, 10px zusammen nach oben versetzen

Positive Werte werden insgesamt nach unten versetzt, z.B. auf 10 setzen, dann enthält die gesamte Callout-Komponente den Text, den Texthintergrund,, Versatz 10px nach unten zusammen

:::

**Beispiel**
```ts
offsetY: 5, Das Callout ist insgesamt um 5 Pixel versetzt



```
### offsetX

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Der versetzte Pixelabstand des Annotationspunktes als Ganzes in X-Richtung, Wenn sich der Callout-Punkt auf der linken Seite des Diagramms befindet (der Startpunkt der Kategorieachse), Empfohlen, auf einen positiven Wert gesetzt zu werden, Wenn sich der Callout-Punkt auf der rechten Seite des Diagramms befindet (Ende der Kategorieachse), Es wird empfohlen, ihn auf einen negativen Wert zu setzen.

Negative Werte werden als Ganzes nach links versetzt, z. B. eingestellt auf\-10, dann enthält die gesamte Callout-Komponente den Text, den Texthintergrund,, gemeinsam um 10 Pixel nach links verschoben

Positive Werte verschieben das Ganze nach rechts; z. B. bei 10 wird die gesamte Callout-Komponente mit Text und Texthintergrund gemeinsam um 10 px nach rechts verschoben

:::

**Beispiel**
```ts
offsetX: 5, Das Callout ist insgesamt um 5 Pixel nach rechts versetzt




```
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title="Beschreibung"}
Callout Vertikale Linie



Numerische Annotationslinie (einschließlich mittlerer Linie, maximaler Linie, minimaler Linie usw.), die vertikal angezeigt wird, kann die Position der Annotationslinie festlegen, Stil usw., wenn Sie eine Callout-Linie zeichnen möchten, die einem Wert wie einer mittleren Linie entspricht, verwenden Sie diese Konfiguration

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="Beschreibung"}
Fester x-Wert; wird zur Beschriftung vertikaler Linien verwendet. Bei einer Kategorieachse in x-Richtung kann der Dimensionswert eingegeben werden, bei einer Wertachse in x-Richtung ein konkreter Wert

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="Beschreibung"}
Dynamische Filter (KI-generierte Codeausführung)



Dynamische Berechnung von Callout-Zeilenwerten über KI-generierten JavaScript-Code

Anwendbar auf die Notwendigkeit, die Position der Annotationslinie gemäß den Daten, wie Durchschnitt, Maximum, Quantil, Geschäftsbereich usw., dynamisch zu bestimmen.



Nur Browser-Umgebung (Web-Worker erforderlich)

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Beschreibung der Screening-Bedürfnisse des Benutzers (natürliche Sprache)

:::

**Beispiel**
```ts
"Holen Sie sich den höchsten Umsatzwert als Callout-Zeilenreferenz"

"Berechnen Sie den durchschnittlichen Umsatz für Callout-Zeilen"



```
#### code

**Type:** `string`

:::note{title="Beschreibung"}
AI Generierter JavaScript-Filtercode



\- Es können nur eingebaute Werkzeugfunktionen verwendet werden (Zugriff über_oder R)

\- Eingabeparameter: Daten (Array)

\- Muss einen einzelnen Wert oder String zurückgeben: number | string

\- Anwendbare Szenarien: Erforderliche dynamische Werte für Callout-Linien (horizontale Linien, vertikale Linien)

\- Nicht verwenden: eval, Function, Asynchrone Operationen, DOM API, Netzwerkanfrage

:::

**Beispiel**
```ts
Holen Sie sich den maximalen Umsatz als Callout-Wert
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Berechnung von Durchschnittswerten für Callout-Zeilen
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Quantil als Callout-Zeile abrufen
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Zielwert auf der Grundlage von Bedingungen berechnen
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

:::note{title="Beschreibung"}
Degradationsszenarien, wenn die Codeausführung fehlschlägt oder von der Umgebung nicht unterstützt wird

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="Beschreibung"}
Dynamisches Filterausführungsergebnis (Laufzeitfeld)



`prepare() Stage Write, Runtime Read-Only`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title="Beschreibung"}
Callout-Text

:::

**Beispiel**
```ts
'Callout-Text'



```
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="Beschreibung"}
Text Position, Beschriftungsposition der Callout-Zeile (relative Position der Beschriftung zur Zeile).

:::

**Beispiel**
```ts
'outsideEnd'



```
### textColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Textfarbe

:::

**Beispiel**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftgröße des Textes

:::

**Beispiel**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftstärke des Textes

:::

**Beispiel**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="Beschreibung"}
Textausrichtung, Generell, Keine Einrichtung erforderlich

Empfohlene Einstellung ist'right', Dadurch wird sichergestellt, dass sich der Text links von der Callout-Zeile befindet

right: Text links von der Referenzlinie, rechten Textrand des vertikalen Callouts ausrichten

left: Text rechts neben den Leitfäden, Textausrichtung linker Rand (vertikal) Callout

center: Text in der Mitte der Leitfäden, Mittig ausgerichtete (vertikale) Callout-Zeile für Text

:::

**Beispiel**
```ts
'right'



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Beschreibung"}
Vertikale Textausrichtung, Generell, Keine Einrichtung erforderlich

Empfohlene Einstellung ist'top', Dadurch wird sichergestellt, dass der Text vollständig im sichtbaren Bereich des Diagramms angezeigt wird

top: Text am unteren Rand der Leitfäden, Text Oberkante Ausrichtung (vertikal) Callout Ende

middle: Text in der Mitte der Leitfäden, Die Textmitte ist (vertikal) am Ende der Callout-Zeile ausgerichtet

bottom: Text oben in den Leitfäden, Text Bottom Edge Align (Vertical) Callout End

:::

**Beispiel**
```ts
'top'



```
### lineVisible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Linie sichtbar

:::

**Beispiel**
```ts
true



```
### lineColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Linienfarbe

:::

**Beispiel**
```ts
'red'



```
### lineWidth

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Linienbreite

:::

**Beispiel**
```ts
2



```
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Beschreibung"}
Linienstil

:::

**Beispiel**
```ts
'solid'



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Hintergrund sichtbar

:::

**Beispiel**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Hintergrundfarbe

:::

**Beispiel**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Hintergrund Rahmenfarbe

:::

**Beispiel**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Hintergrund Rahmenbreite

:::

**Beispiel**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Rahmenradius im Hintergrund

:::

**Beispiel**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Hintergrundabstand

:::

**Beispiel**
```ts
4




```
## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title="Beschreibung"}
Callout Horizontale Linie



Bemaßungswert Annotationslinie, horizontale Anzeige, in der Lage, die Position der Annotationslinie einzustellen, Stile usw.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="Beschreibung"}
Fester y-Wert, Wird verwendet, um horizontale Linien zu markieren, Kategorieachse in y-Richtung, dann können Sie den Dimensionswert eingeben, Wertachse in y-Richtung, dann können Sie einen bestimmten Wert eingeben

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="Beschreibung"}
Dynamische Filter (KI-generierte Codeausführung)



Dynamische Berechnung von Callout-Zeilenwerten über KI-generierten JavaScript-Code

Anwendbar auf die Notwendigkeit, die Position der Annotationslinie gemäß den Daten, wie Durchschnitt, Maximum, Quantil, Geschäftsbereich usw., dynamisch zu bestimmen.



Nur Browser-Umgebung (Web-Worker erforderlich)

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Beschreibung der Screening-Bedürfnisse des Benutzers (natürliche Sprache)

:::

**Beispiel**
```ts
"Holen Sie sich den höchsten Umsatzwert als Callout-Zeilenreferenz"

"Berechnen Sie den durchschnittlichen Umsatz für Callout-Zeilen"



```
#### code

**Type:** `string`

:::note{title="Beschreibung"}
AI Generierter JavaScript-Filtercode



\- Es können nur eingebaute Werkzeugfunktionen verwendet werden (Zugriff über_oder R)

\- Eingabeparameter: Daten (Array)

\- Muss einen einzelnen Wert oder String zurückgeben: number | string

\- Anwendbare Szenarien: Erforderliche dynamische Werte für Callout-Linien (horizontale Linien, vertikale Linien)

\- Nicht verwenden: eval, Function, Asynchrone Operationen, DOM API, Netzwerkanfrage

:::

**Beispiel**
```ts
Holen Sie sich den maximalen Umsatz als Callout-Wert
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Berechnung von Durchschnittswerten für Callout-Zeilen
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Quantil als Callout-Zeile abrufen
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Zielwert auf der Grundlage von Bedingungen berechnen
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

:::note{title="Beschreibung"}
Degradationsszenarien, wenn die Codeausführung fehlschlägt oder von der Umgebung nicht unterstützt wird

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="Beschreibung"}
Dynamisches Filterausführungsergebnis (Laufzeitfeld)



`prepare() Stage Write, Runtime Read-Only`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title="Beschreibung"}
Callout-Text

:::

**Beispiel**
```ts
'Callout-Text'



```
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="Beschreibung"}
Text Position



Beschriftungsposition der Callout-Zeile (relative Position der Beschriftung zur Zeile).

:::

**Beispiel**
```ts
'outsideEnd'



```
### textColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Textfarbe

:::

**Beispiel**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftgröße des Textes

:::

**Beispiel**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftstärke des Textes

:::

**Beispiel**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="Beschreibung"}
Textausrichtung, Generell, Keine Einrichtung erforderlich

Empfohlene Einstellung ist'right', Dadurch wird sichergestellt, dass sich der Text links von der Callout-Zeile befindet

right: Text links von der Referenzlinie, rechten Textrand des horizontalen Callouts am Ende der Callout-Linie ausrichten

left: Text rechts neben den Leitfäden, Der linke Rand des Textes ist (horizontal) am Ende der Callout-Zeile ausgerichtet

center: Text in der Mitte der Leitfäden, Die Textmitte ist (horizontal) am Ende der Callout-Zeile ausgerichtet

:::

**Beispiel**
```ts
'right'



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Beschreibung"}
Vertikale Textausrichtung, Generell, Keine Einrichtung erforderlich

Empfohlene Einstellung ist'top', Dadurch wird sichergestellt, dass der Text vollständig im sichtbaren Bereich des Diagramms angezeigt wird

top: Text am unteren Rand der Leitfäden, Text Top Edge Align (Horizontal) Callout

middle: Text in der Mitte der Leitfäden, In der Mitte ausgerichtete (horizontale) Callout-Zeile für Text

bottom: Text oben in den Leitfäden, Text Callout zur Ausrichtung der unteren Kante (horizontal)

:::

**Beispiel**
```ts
'top'



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Hintergrund sichtbar

:::

**Beispiel**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Hintergrundfarbe

:::

**Beispiel**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Hintergrund Rahmenfarbe

:::

**Beispiel**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Hintergrund Rahmenbreite



Hintergrund Rahmenbreite

:::

**Beispiel**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Rahmenradius im Hintergrund

:::

**Beispiel**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Hintergrundabstand

:::

**Beispiel**
```ts
4



```
### lineVisible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Linie sichtbar



Linie sichtbar

:::

**Beispiel**
```ts
true



```
### lineColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Linienfarbe

:::

**Beispiel**
```ts
'red'



```
### lineWidth

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Linienbreite

:::

**Beispiel**
```ts
2



```
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Beschreibung"}
Linienstil

:::

**Beispiel**
```ts
'solid'



```
### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title="Beschreibung"}
Gibt an, ob die Funktion zur Trennung der Hauptleitung in zwei Segmente aktiviert werden soll

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Der Teil, der größer als der Annotationswert ist, die entsprechende Hauptfarbe

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Der Teil, der kleiner als der Anmerkungswert ist, die entsprechende Hauptfarbe

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title="Beschreibung"}
Callout-Bereich



Callout-Bereichskonfiguration, Basierend auf ausgewählten Daten, Callout-Bereich für Diagramm definieren, Geben Sie die Position des angehefteten Bereichs an, Stil, etc.

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title="Beschreibung"}
Abhängig von ausgewählten Daten, Markieren Sie die Daten.

:::


#### field

**Type:** `string`

:::note{title="Beschreibung"}
Dimensionsfeld, dimensions ID eines Artikels

:::

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

### text

**Type:** `string | string[] | undefined`

:::note{title="Beschreibung"}
Callout-Text

:::

**Beispiel**
```ts
'Callout-Text'



```
### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title="Beschreibung"}
Text Position

:::

**Beispiel**
```ts
'top'



```
### textColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Textfarbe

:::

**Beispiel**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftgröße des Textes

:::

**Beispiel**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Schriftstärke des Textes

:::

**Beispiel**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="Beschreibung"}
Textausrichtung, Generell, Nach rechts setzen, Text erscheint in der Mitte des Callout-Bereichs, Stellen Sie sicher, dass Sie im sichtbaren Bereich des Diagramms angezeigt werden

Empfohlene Einstellung ist'center', Dadurch wird sichergestellt, dass sich der Text in der Mitte des Callout-Bereichs befindet

right: Text links vom Callout-Bereich, Callout-Bereich am rechten Rand des Textes ausrichten

left: Text rechts neben dem Callout-Bereich, Callout-Bereich am linken Rand des Textes ausrichten

center: Text in der Mitte des Callout-Bereichs, Zentriert ausgerichteter Callout-Bereich des Textes

:::

**Beispiel**
```ts
'center' Text in der Mitte des Callout-Bereichs



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Beschreibung"}
Vertikale Textausrichtung, Generell, Nach oben setzen, Text erscheint am unteren Rand des Callout-Bereichs, Stellen Sie sicher, dass Sie im sichtbaren Bereich des Diagramms angezeigt werden

Empfohlene Einstellung ist'top', Dadurch wird sichergestellt, dass der Text vollständig im sichtbaren Bereich des Diagramms angezeigt wird

top: Text am unteren Rand des Callout-Bereichs, Text Oberkante Callout-Bereich ausrichten

middle: Text in der Mitte des Callout-Bereichs, Zentriert ausgerichteter Callout-Bereich des Textes

bottom: Text oben im Callout-Bereich, Text unterer Rand Callout-Bereich ausrichten

:::

**Beispiel**
```ts
'top' Text am unteren Rand des Callout-Bereichs



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Hintergrund sichtbar

:::

**Beispiel**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Hintergrundfarbe

:::

**Beispiel**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Hintergrund Rahmenfarbe



Hintergrund Rahmenfarbe

:::

**Beispiel**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Hintergrund Rahmenbreite

:::

**Beispiel**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Rahmenradius im Hintergrund



Rahmenradius im Hintergrund

:::

**Beispiel**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Hintergrundabstand

:::

**Beispiel**
```ts
4



```
### areaColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Farbe des Callout-Bereichsbereichs

:::

**Beispiel**
```ts
'red'



```
### areaColorOpacity

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Callout-Bereich Bereich Farbe Deckkraft

:::

**Beispiel**
```ts
0.5



```
### areaBorderColor

**Type:** `string | undefined`

:::note{title="Beschreibung"}
Randfarbe des Callout-Bereichs

:::

**Beispiel**
```ts
'red'



```
### areaBorderWidth

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Randbreite des Callout-Bereichs

:::

**Beispiel**
```ts
2



```
### areaBorderRadius

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Randradius des Callout-Bereichsbereichs

:::

**Beispiel**
```ts
4



```
### areaLineDash

**Type:** `number[] | undefined`

:::note{title="Beschreibung"}
Callout-Bereich Bereich Rahmenlinienstil

:::

**Beispiel**
```ts
[2, 2]



```
### outerPadding

**Type:** `number | undefined`

:::note{title="Beschreibung"}
Callout-Bereich Bereichsränder

:::

**Beispiel**
```ts
0




```
## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title="Beschreibung"}
Ob die Dimensionsverknüpfung aktiviert wird, wenn das Diagramm Pivot-Funktionen oder Kennzahlenkombinationen aktiviert hat

Die Verknüpfung hebt Daten mit demselben Dimensionswert in anderen Diagrammen hervor, wenn der Mauszeiger auf einen Dimensionswert bewegt wird



PivotChart Dimensionsverknüpfungskonfiguration

:::


### enable

**Type:** `false | true`

:::note{title="Beschreibung"}
Ob die Dimensionsverknüpfung des perspektivischen Diagramms aktiviert werden soll

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Gibt an, ob Tooltip-Informationen für alle Dimensionen angezeigt werden sollen, die dem Unterdiagramm entsprechen

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Gibt an, ob Tags angezeigt werden sollen, die einem Fadenkreuz entsprechen

:::


## locale

**Type:** `Locale | undefined`

:::note{title="Beschreibung"}
Sprachen



Diagrammsprachenkonfiguration, Support'zh\-CN'Und'en\-US'Zweisprachig, Sie können auch intl.setLocale ('zh\-CN') Sprache des Methodensatzes

:::

