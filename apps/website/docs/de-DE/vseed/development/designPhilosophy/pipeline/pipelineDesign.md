# pipeline Design

:::info Why Pipeline?
1. Auswahl der Senioren im Team
2. PipelineVorteile, machen kann`VSeed`Unabhängige Steuerung des Ausführungsprozesses für jeden Diagrammtyp, Durch gutes Design, Lassen Sie jede Diagrammtyp-Implementierung entkoppelt sein, während sie lokal wiederverwendbar ist, Jeder Diagrammtyp hat die perfekte Kontrolle über jedes Detail, Dies ist von Pipeline., Auch`VSeed`Am dringendsten benötigt.
3. Im Vergleich zu, PipelineDie Unzulänglichkeiten des Musters können bei der Gestaltung vermieden werden, Solange im Design`Pipe`Stunde, Einzeln verringern`Pipe`Skala, Verringern`Pipe`Abhängigkeiten zwischen, die Unzulänglichkeiten dieses Modells lassen sich weitgehend vermeiden
4. Vier Generationen Pipeline-Design und -Optimierung, Dies ist die fünfte Veröffentlichung für VSeed., Die Grube, auf die getreten werden sollte, ist bereits getreten.

:::

## Was ist Pipeline?？

Pipeline Eine leistungsstarke Abstraktions- und Engineering-Praxis, die entwickelt wurde, um eine komplexe Aufgabe in eine Reihe von miteinander verbundenen, sequentiell ausgeführten kleineren Schritten zu zerlegen. Ihre Designphilosophie und Umsetzung sind stark von der Kernidee der funktionalen Programmierung (FP) beeinflusst.

### Pipeline Vorteile:
- Modularität: Die Atomisierung wird durch die Kombination von Atomen zu Modulen erreicht
- Automatisierung: Identifizieren Sie einfach die Eingänge und erhalten Sie die Ausgänge automatisch, ohne sich auf interne Implementierungen konzentrieren zu müssen.
- Reine Funktion: Geben Sie die Eingabe an, und Sie müssen die erwartete Ausgabe erhalten, die die Eigenschaft der reinen Funktion ist.
- Parallelität: Unterstützt natürlich Parallelität.
- Wiederverwendbarkeit: Jedes Modul ist wiederverwendbar.
- Prüfbarkeit: theoretisch, Jedes Modul ist unabhängig und kann einzeln getestet werden, um die Qualität zu gewährleisten.
- Rückverfolgbarkeit: Die Ein- und Ausgänge jeder Stufe sind klar, was es einfach macht, Probleme zu finden und den Prozessstatus zu überwachen.
- Cachefähigkeit: theoretisch, Einzelpersonen können einzeln zwischengespeichert werden`Pipe`Ausgabe von, Dies vermeidet Doppelzählungen und verbessert die Effizienz.

### Pipeline Nachteile von:
- Sequentielle Abhängigkeit: Wenn eine sequentielle Abhängigkeit zwischen den Pipes besteht, erhöht die Kosten für das Verständnis, Weil Sie die vorherige Phase verstehen müssen, bevor Sie die spätere Phase verstehen können.Ein tieferes Verständnis des Gesamtprozesses ist erforderlich, um Probleme schnell zu finden.
- Debugging-Kosten: Da Pipelines sequentiell ausgeführt werden, fällt die gesamte Pipeline aus, sobald eine Phase ausfällt. Dies erschwert das Debuggen, da Sie die fehlgeschlagene Phase lokalisieren und beheben müssen.
- Leistungsprobleme: Da die Pipeline sequentiell ausgeführt wird, muss die Ausgabe jeder Phase auf den Abschluss der vorherigen Phase warten, was zu Leistungsproblemen führen kann. Insbesondere wenn die Ausführungszeit einer bestimmten Phase lang ist, wirkt sich dies auf die Ausführungseffizienz der gesamten Pipeline aus.
- Funktionale Programmierung: Neue Konzepte verstehen, Es gibt bestimmte Lernkosten. Deshalb, Gestaltungsprinzipien und Umsetzungsdetails müssen im Beitragsleitfaden festgehalten werden, Praktisch für andere Entwickler zu verstehen und zu verwenden, Den Nachteil ausgleichen.

## VSeedWie sollte die Pipeline geschrieben werden?

### Pipe Portfolio-Modus

Rohr mit mehreren Funktionen, Kombinierbar zu einem größeren Funktionsrohr, Es kann auch zu einer komplexeren Pipeline kombiniert werden.

In VSeed, Eine komplette Pipeline, entspricht einer Implementierung eines Diagrammtyps; durch Beschreibung der kombinierten Beziehung des Rohres, können Sie verschiedene Arten von Diagrammen erstellen. Während der Pipeline-Mischphase, Es ist nicht notwendig, sich auf die spezifische Implementierung der einzelnen Rohre zu konzentrieren.


#### Portfoliounterschiede

Hier ist ein Beispiel:

Linien- und Flächendiagramme haben viele Funktionen zur Wiederverwendung, z.B. Beschriftungen, Legenden, Achsen, etc., Aber Liniendiagramme haben keine primitiven Gesichtsstile, Also Pipeline durch die Kombinationsfunktion Pipe, Beheben Sie die oben genannten Unterschiede, Während des gesamten Prozesses gibt es keine if -Aussagen.

```ts
const lineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const areaChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,

  // 仅面积图有面图元样式
  areaStyle,
]
```


### Pipe Adapter-Modus

Neben dem Portfoliomodus, Pipewerden oft unter bestimmten Bedingungen gebaut, Rohrkombinationen für unterschiedliche Bedingungen, VSeedRohradapter werden häufig in

#### Kombinationsbedingungen

Hier ist ein Beispiel: 

Liniendiagramm mit Perspektive, Von VChart ohne Perspektive gerendert, Ausgabe VChart-Spezifikation, Gerendert von VTable mit Perspektive, Ausgang VTable Spec. 

Perspektivische Liniendiagramme haben die grundlegende Funktion, Liniendiagramme grundsätzlich wiederzuverwenden., z.B. Beschriftungen, Legenden, Achsen, etc., Sie müssen also den Adaptermodus, Verrohrung des Liniendiagramms, Rohr, das in ein perspektivisches Liniendiagramm passt.

```ts
const pivotLineChartPipeline = [
  initPivotChart,
  pivotIndicators([
    label,
    xAxis,
    yAxis,
    lineStyle,
    pointStyle,
  ]),
  pivotChartLegend,
] 

const commonLineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const lineChartPipeline = [
  pivotAdapter(commonLineChartPipeline, pivotLineChartPipeline)
]
```

Zusammenfassend lässt sich sagen,, Jeder Adapter ist ein ob sonst, Bedingungen, die in einem Rohr verborgen werden können, Abstract zu einem Adapter, Wenn also else dem obersten Stockwerk vorangestellt ist,, für eine klarere Pipeline von Abhängigkeiten, Reduzieren Sie die Wartungskosten.

### Pipeline Minimale Grundeinheit: Function Pipe

VSeedErwarten Sie alle Diagrammtypen, Alle fungieren als die grundlegendste Einheit und bieten ausreichende Wiederverwendungs- und Erweiterungsmöglichkeiten; Aufbau einer Diagramm-Pipeline von unten nach oben; jede Funktion Pipe, sollte ein eigenständiges, testbares, wiederverwendbares Modul sein;

Die kritischste davon ist, Verschiedene Rohre (d. h. weniger, wenn überhaupt) sollten mit funktionalen Unterschieden abstrahiert werden, Anstatt ein großes, volles Rohr zu schreiben.

#### Flachfunktionsrohr

Hier ist ein Beispiel: 

Balkendiagramme, Histogramme, Liniendiagramme, Flächendiagramme, Streudiagramme haben alle X- und Y-Achsen, Sie sind ähnlich, aber leicht unterschiedlich, Wenn Sie ein großes und volles Achsenrohr schreiben,, Es könnte so aussehen.

```ts
const lineChartPipeline = [
  axes
]
const barChartPipeline = [
  axes
]
const areaChartPipeline = [
  axes
]
const scatterChartPipeline = [
  axes
]
const axes = (spec, context) => {
  if (isLine || isArea || isColumn){
    // 折线图、面积图、柱状图有一个离散的轴, 一个连续的轴
    return xy(spec, context) 
  }
  if (isScatter){
    // 散点图有2个连续的轴
    return yy(spec, context) 
  }
  if (isBar){
    // 条形图有一个离散的轴, 一个连续的轴, 但与折线图、面积图、柱状图的轴方向不同
    return yx(spec, context) 
  }
}

const xy = (spec, context) => {
  linearAxis(spec, context, {orient: 'left'})
  bandAxis(spec, context, {orient: 'bottom'})
}

const yx = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  bandAxis(spec, context, {orient: 'left'})
}

const yy = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  linearAxis(spec, context, {orient: 'left'})
}
```

Die obige Logik, innerhalb eines funktionsfähigen Rohres nach Diagrammtyp, Wählen Sie eine andere Teilfunktionsleitung, Die Frage, die sich stellt, ist
1. xy、yx、yyund wie man Funktionen wiederverwendet, die sich innerhalb? Eine Vielzahl ähnlicher und unterschiedlicher Teilfunktionen, Muss sich in einem anderen Teilfunktionsrohr befinden, wird wiederholt aufgerufen. Abhängigkeiten neigen dazu, kompliziert zu werden, was zu erhöhten Wartungskosten führt.
2. Funktion zum Ändern von Liniendiagramm, Flächendiagramm, Balkendiagramme sind leicht zu übersehen, Weil es eine Verzweigung in der Logik gibt., Berücksichtigen Sie also Unterschiede bei der Implementierung neuer Funktionen.

Wenn sich der Umfang der gesamten SPEC-Pipeline auf einige hundert Rohre ausdehnt, Diese Art der Schreiblogik kann zu sehr hohen Wartungskosten führen, Daher, Wir brauchen einen einfacheren Weg, je nach Diagrammtyp, Wählen Sie ein anderes Teilfunktionsrohr.

Fahren Sie mit dem obigen Beispiel fort, Abstrakte Unterschiede in verschiedene Rohre, Unterschiede in feinkörnigeren Merkmalen gekapselt, Kombinieren Sie schließlich direkt in der Pipeline, können die oben genannten Probleme vermieden werden.

```ts
const lineChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const barChartPipeline = [
  yBandAxis,
  xLinearAxis,
]
const areaChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const scatterChartPipeline = [
  xLinearAxis,
  yLinearAxis,
]

const xBandAxis = (spec, context) => {
}
const yBandAxis = (spec, context) => {
}
const xLinearAxis = (spec, context) => {
}
const yLinearAxis = (spec, context) => {
}
```

Im obigen Beispiel, Achsenrohr nicht implementiert, Stattdessen kombiniert es direkt die 4 Rohre xBandAxis, yBandAxis, xLinearAxis und yLinearAxis, Auf diese Weise wird vermieden, dass in den Achsen Rohre nach dem Diagrammtyp, Probleme bei der Auswahl verschiedener Teilfunktionen der Rohrleitung, wodurch die Notwendigkeit verschiedener Arten von Diagrammen vermieden wird, Unterschiedliche Urteile fällen, Dies reduziert den Einsatz von if else.

Die Gabelung des Diagrammtypunterschieds, Es sollte sich oben auf der Pipeline befinden., Es sei denn, Sie sind dazu gezwungen, PipelineEs besteht keine Notwendigkeit nach dem Diagrammtyp in der, Wählen Sie ein anderes Teilfunktionsrohr.

Solch eine Kombination, Im Einklang mit der Designphilosophie von VSeed, die eine Kombination aus flacheren Funktionsrohren verwenden, Anstatt zu beurteilen, ob sonst Bedingung, um eine große und vollständige Funktion Rohr zu tun.


