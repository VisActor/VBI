# DSL Design

:::info Bedeutung

VSeed Ist deklaratives DSL

- DSL Design ist die Kunst, Domänenprobleme auszudrücken, Vereinfacht komplexe Sachverhalte effektiv.
- DSL Lassen Sie vertraute Menschen so natürlich kodieren, als würden sie in ihrer Muttersprache schreiben.Sobald Sie mit VSeed vertraut sind,, Das Rendern eines Diagramms ist so einfach wie das Schreiben einer natürlichen Sprache.
- `VChart`、`VTable`Gleiches gilt für


:::

:::tip

`Deklaratives DSL` Folgen"Was" （What）。Beschreiben Sie, wie das gewünschte Ergebnis oder der Endzustand aussehen soll, unabhängig von den spezifischen Schritten, wie dieser Zustand im Computer erreicht wird.


`zwingend DSL` Folgen"Wie" （How）。Stellen Sie eine Reihe klarer, schrittweiser Anweisungen bereit, die dem Computer sagen, wie er den gewünschten Zustand Schritt für Schritt erreichen kann.
:::

## VSeed Kompromisse

1. Domänenfokus

auf Kosten einer gewissen Vielseitigkeit., Konzentrieren Sie sich auf die Lösung von Problemen in bestimmten Bereichen.Die Kernziele von VSeed reichen also nicht aus, um alle Anforderungen eines Diagrammtyps zu erfüllen, Konzentrieren Sie sich stattdessen auf die Transformation der Daten vor dem Diagrammtyp. Verbleibende Funktionen, wie Themen, Interaktionen, Animationen usw.

2. Abstraktionsebene

`VSeed` Bietet ein hohes Maß an Abstraktion, damit sich der Benutzer auf die Lösung des Problems konzentrieren kann, Anstatt sich auf die zugrunde liegenden Implementierungsdetails zu konzentrieren.zur Steigerung der Entwicklungseffizienz, z. B. Diagrammtyp umschalten, Ändern eines Parameters, ohne sich auf die Details des Wechsels konzentrieren zu müssen.

3. Einschränkung ist von Vorteil

`VSeed` Einschränkungen betonen, Erhalten Sie eine`VSeed DSL`, Ausgabe eins`VTable`oder`VChart`von`spec`, Dies gibt dem Benutzer mehr Flexibilität, um die Funktionalität eines einzelnen Diagramms zu steuern, `VSeed`Es muss eine Blackbox sein.

VSeed kann also einfach als`Spec Builder`, Nicht zerstören`VTable`oder`VChart`Ursprüngliche Funktionen, Alle`VChart`, `VTable`Benutzer können schnell auf vorhandene Plattformen zugreifen`VSeed`