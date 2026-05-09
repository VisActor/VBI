# Datenumformung - Prinzipien

:::info Datenumformung
VSeed Schlagen Sie einen generischen Ansatz zur dimensionalen Neugestaltung vor, der darauf abzielt, die Schwelle für die Datenvisualisierung weiter zu senken
:::

Datenumformung bezieht sich auf den Prozess der Transformation von Daten von einem strukturierten Formular in ein anderes, wobei der Kern darin besteht, die Art und Weise, wie Daten organisiert sind (z. B. Zeilen, Spalten, Indizes, Hierarchien), zu ändern, um unterschiedlichen Analyse- oder Verarbeitungsanforderungen gerecht zu werden und gleichzeitig die Integrität der Daten zu wahren.


## Dimensionsumformung
Python und R-Sprache verfügen bereits über Tools, die eine dimensionale Neugestaltung unterstützen
1. Python Pandas Bereitgestellt `pivot` Und `melt` zur Datenumformung
2. R tidyverse Bereitgestellt `pivot_longer` Und `pivot_wider` zur Datenumformung


## Auf- und Abwärtsdimension

Die Idee der zunehmenden und abnehmenden Dimensionen ist spirituell konsistent mit der Kategorientheorie (Objekte und Morphismen und Isomorphismen), folgt jedoch nicht streng der Kategorientheorie bei der Umsetzung.
Besonderer Schwerpunkt:
1. Bei der Dimensionierung werden nicht vorhandene Informationen "metrischer Name" und "metrischer Wert" "von Grund auf neu" erstellt
2. Wenn die Dimensionalität reduziert wird, werden die in den Daten enthaltenen Informationen "metrischer Name" und "metrischer Wert" "entfernt"

Die aufsteigende Dimension kann die Daten vollständig transformieren, aber der Spaltenname der Dimension erscheint als Null, so dass es unterstützt wird, zusätzliche Informationen auszufüllen.
Die Dimensionsreduktion verliert den Informationsgehalt, so dass zusätzliche Konvertierungsinformationen gespeichert werden müssen, um eine echte isomorphe Konvertierung zu erreichen, andernfalls gehen die Informationen verloren.

![commonDataReshape](/images/commonDataReshape.png)

## Aufwärtsdimension und Abwärtsdimension gruppieren

Es gibt ähnliche Szenarien, in denen Informationen zunehmen oder Informationen auf die gleiche Weise verloren gehen wie gewöhnliche aufsteigende und abnehmende Dimensionalität. Darüber hinaus werden durch die Einführung der Gruppierung mehr leere Daten generiert
Bedeutung der Maßnahme:
1. Indikatorengruppierung: Schnelle Verarbeitung detaillierter Daten durch einfaches Upgrade der Dimension durch Gruppierung
2. Mehrere Abfragesätze: Mehrere Sätze detaillierter Daten können leicht durch mehrere SQL-Zeichenfolgen erhalten werden, und sie können durch Gruppieren der Dimensionsreduktion zu einem Daten zusammengeführt werden.

![groupedDataReshape](/images/groupedDataReshape.png)

## Regelmäßige Ableitung

### Aufstieg

![rule](/images/ruleDataReshape.png)

![commonDataReshape2](/images/commonDataReshape2.png)

:::tip
1. Mehrere Indikatoren werden dimensional erhöht, die Anzahl der Indikatoren wird zu einem, und nachdem ein Indikator dimensional erhöht wurde, ist der Indikator immer noch 1.
2. Mehrdimensionaler Aufstieg, eine weitere Dimension, 0 Dimensionen addieren auch 1
3. 0 1 Metrik in jeder Dimension, die wiederholt aktualisiert werden kann, um eine beliebige Dimension zu erhalten, und 1 Metrik (so dass eine Metrik auch ein Balkendiagramm zeichnen kann)

:::

### Dimensionsreduzierung

![rule](/images/ruleDataReshape2.png)

![groupedDataReshape2](/images/groupedDataReshape2.png)

:::tip
1. Die Reduzierung der Multi-Index-Dimensionalität, Dimensionswerte und Indikatoren werden ein kartesisches Produkt sein und zu einem neuen Indikator werden
2. Multidimensionale Dimensionsreduktion, mehrdimensionale Werte werden kartesisches Produkt, zu einer neuen Dimension

:::


## Beispiel

#### 0Dimension (en) 1 Metrik (en)
![0d1m](/images/0d1m.png)
#### 0Dimension (en) 3 Metriken
![0d3m](/images/0d3m.png)
#### 1Dimension (en) 1 Metrik (en)
![1d1m](/images/1d1m.png)
#### 1Dimension 2 Metriken
![1d2m](/images/1d2m.png)
#### 2Dimension (en) 1 Metrik (en)
![2d1m](/images/2d1m.png)
#### 2Dimension 2 Metriken
![2d2m](/images/2d2m.png)
