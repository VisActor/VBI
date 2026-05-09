# Donut

:::info{title="Empfohlen"}
\- Empfohlene Feldkonfiguration: `1`Metriken, `2`Dimension (en)

\- Unterstützung der Datenumformung: mind.`1`Metriken, `0`Dimension (en)

:::

:::info{title="Kodierungszuordnung"}
Das Ringdiagramm unterstützt folgende visuelle Kanäle:

`angle`: Winkelkanal, Support`mehrere Kennzahlen`, Dem Sektorwinkel nach metrischem Wert zuordnen

`detail`: Unterteilungskanal, Support`mehrere Dimensionen`, wird verwendet, um feinere Daten innerhalb derselben Farbserie anzuzeigen

`color`: Farbkanäle, Support`mehrere Dimensionen`oder `eine Kennzahl`, Dimensionsfarben unterscheiden verschiedene Datenreihen, Kennzahlenfarben bilden Kennzahlenwerte linear auf Grafikfarben ab

`tooltip`: Eingabeaufforderungskanal, Support`mehrere Dimensionen`Und `mehrere Kennzahlen`, wird beim Bewegen der Maus über einen Datenpunkt angezeigt

`label`: Label-Kanal, Support`mehrere Dimensionen`Und `mehrere Kennzahlen`, zeigt Datenbeschriftungen auf Datenpunkten an

:::

:::note{title="Beschreibung"}
Ringdiagramm, geeignet zur Anzeige der Proportionsbeziehung eindimensionaler Daten, mit einem leeren Bereich in der Mitte zur Anzeige von Zusammenfassungsinformationen

Szenario:

\- Es ist notwendig, die Gesamtdaten und den Anteil jedes Teils gleichzeitig anzuzeigen

\- Betonen Sie die Beziehung zwischen dem Ganzen und einem Teil der Daten

\- Der zentrale Bereich muss wichtige Metriken oder Titel anzeigen

:::

:::warning{title="Warning"}
Datenanforderungen:

\- Mindestens 1 metrisches Feld (metrisch)

\- Alle Dimensionen werden mit dem Metriknamen zusammengeführt (wenn mehrere Metriken vorhanden sind), Wird als Legendenelement angezeigt.

\- Alle Metriken werden automatisch zu einer Metrik zusammengeführt

Standardmäßig eingeschaltete Funktionen:

\- Standard offene Legende, Datenbeschriftung, Eingabeaufforderung, Proportionsberechnung, Mitteltext

:::


## chartType

**Type:** `"donut"`

:::note{title="Beschreibung"}
Ringdiagramm



Ringdiagramm, Kreisdiagrammvariante mit Leerbereich in der Mitte

:::

**Beispiel**
```ts
'donut'




```
## dataset

**Type:** `Record[]`

:::note{title="Beschreibung"}
Datensatz



TidyData-konformer und aggregierter Datensatz, der die Datenquelle und die Struktur des Diagramms definiert, Der vom Benutzer eingegebene Datensatz erfordert keine Verarbeitung, VSeedmit leistungsstarken Datenumformungsfunktionen, Wird seine eigenen Daten umgestalten, Ringdaten werden schließlich in eine Dimension konvertiert, 1Metriken.

:::

**Beispiel**
```ts
[{category:'A', value:30}, {category:'B', value:70}]




```
## dimensions

**Type:** `PieDimension[] | undefined`

:::note{title="Beschreibung"}
Dimension



Alle Dimensionen des kreisförmigen Diagramms werden zu einer Dimension mit dem Metriknamen zusammengeführt (wenn es mehrere Metriken gibt), Winkel auf Kreisdiagramm abgebildet, und als Legendenelement angezeigt.

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title="Beschreibung"}
Kanäle für Dimensionsmapping

\- color: Unterstützt die Zuordnung mehrerer Dimensionen zu Farbkanälen

\- detail: Unterstützt die Zuordnung mehrerer Dimensionen zu Detailkanälen

\- tooltip: Unterstützt die Zuordnung mehrerer Dimensionen zu Hinweiskanälen

\- label: Unterstützt die Zuordnung mehrerer Dimensionen zu Label-Kanälen

\- row: Unterstützt die Zuordnung mehrerer Dimensionen zu einem Zeilenkanal

\- column: Unterstützung für die Zuordnung mehrerer Dimensionen zu einem Spaltenkanal

:::


## measures

**Type:** `PieMeasure[] | undefined`

:::note{title="Beschreibung"}
Kennzahl



Alle Metriken im Ringdiagramm werden automatisch zu einer Metrik zusammengeführt, Radius zu Kreisdiagramm zugeordnet, Wenn es mehrere Metriken gibt, Der Metrikname wird mit dem Rest der Dimensionen zusammengeführt, und als Legendenelement angezeigt.

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

**Type:** `"color" | "tooltip" | "label" | "angle" | undefined`

:::note{title="Beschreibung"}
Indikator zugeordneter Kanal

\- angle: Winkel der Indikatorzuordnung

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
Diagramm-Hintergrundfarbe



Hintergrundfarbe kann eine Farbstring sein, Beispiel'red', 'blue', Es kann auch Sechskant sein, rgboder rgba'#ff0000', 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title="Beschreibung"}
Farbe



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

**Type:** `PieLabel | undefined`

:::note{title="Beschreibung"}
Tags



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

### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title="Beschreibung"}
Etiketten-Layout, Gültig nur für Kreisdiagramme, Torusdiagramme und`labelPosition`für`outside`Gültig ab

\- arc: Bogenbeschriftungslayout

\- labelLine: Beschriftungen an beiden Enden ausrichten; Sektor-Primitives und Beschriftungen über Führungslinien verbinden

\- edge: Beschriftungen an beiden Enden ausrichten; Sektor-Primitives und Beschriftungen über Führungslinien verbinden, und in der Nähe der Kanten des Diagramms.

:::


## legend

**Type:** `Legend | undefined`

:::note{title="Beschreibung"}
Legende



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
## tooltip

**Type:** `Tooltip | undefined`

:::note{title="Beschreibung"}
Eingabeaufforderung



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

**Type:** `PieLikeAnimation | undefined`

:::note{title="Beschreibung"}
Animationskonfiguration



Diagramm-Animationskonfiguration, die optionale Effekte nach Diagrammtyp einschränkt

:::


### enable

**Type:** `boolean | undefined`

:::note{title="Beschreibung"}
Ob Kreisdiagramm/Ringdiagramm/Rosendiagramm-Animation aktiviert ist

:::

### params

**Type:** `PieLikeAnimationParams | undefined`

:::note{title="Beschreibung"}
Kreisdiagramm/Ringdiagramm/Rosendiagramm Animationsparameter

:::


#### appear

**Type:** `PieLikeAppearAnimation | undefined`

:::note{title="Beschreibung"}
Tortendiagramm/Ringdiagramm/Rosendiagramm-Zulassungsanimationskonfiguration

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title="Beschreibung"}
Kreis-/Ring-/Rosenaufnahme mit Radial- und Zoom-Animation

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

**Type:** `PieLikeUpdateAnimation | undefined`

:::note{title="Beschreibung"}
Tortendiagramm/Ringdiagramm/Rosendiagramm-Animationskonfiguration aktualisieren

:::


##### effects

**Type:** `"radial"[] | undefined`

:::note{title="Beschreibung"}
Kreisdiagramm/Ringdiagramm/Rosendiagramm-Update-Effekt, unterstützt radiale Animation

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

**Type:** `PieLikeAnimationLoop | undefined`

:::note{title="Beschreibung"}
Tortendiagramm-/Schleifendiagramm-/Rosendiagramm-Schleifenanimationskonfiguration

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

**Type:** `PieLikeLoopAnimation | undefined`

:::note{title="Beschreibung"}
Tortendiagramm-/Schleifendiagramm-/Rosendiagramm-Schleifenanimationskonfiguration

:::


###### effects

**Type:** `PieLikeLoopEffect[] | undefined`

:::note{title="Beschreibung"}
Kreisdiagramm/Schleifendiagramm/Rosendiagramm-Schleifeneffekt

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

**Type:** `NoEffectAtmosphereConfig | undefined`

:::note{title="Beschreibung"}
Kreisdiagramm/Ringdiagramm/Rosendiagramm Atmosphärenanimationskonfiguration

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

