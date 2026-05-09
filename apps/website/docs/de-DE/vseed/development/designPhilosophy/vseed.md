# VSeed

:::info Zusammenfassung eines Satzes
Auf den Kopf gestellt, was die Anforderungen an geschäftliche Agilität angeht, Formular für den Datenzugriff mit Abwärtsbeschränkung, Datenorchestrierung vereinheitlichen, Reduzieren Sie Komplexität auf Einfachheit.
:::

## VSeedWas? 

`VSeed` ist ein Visualisierungstool zur Datenanalyse, Fokus zwischen verschiedenen Diagrammtypen, Bietet hochkonsistente Datenkonvertierungsfunktionen, Einige sofort einsatzbereite Funktionen für unterwegs, Wird verwendet, um die Anforderungen der leichten Datenanalyse zu erfüllen.

## VSeed Was sind die Vorteile

> Zunächst einmal funktioniert es wirklich gut., Zweitens ist es wirklich flexibel., Und schließlich gibt es eine Menge Fußabdrücke in VSeed., Müssen verstehen, wie VSeed Daten umgestaltet, perfekt auftragen.

1. Die intuitivste Art, Diagramme zu wechseln [Demo](/vseed/guide/intro/chartTypeSwitch)
2. Das am einfachsten zu verwendende perspektivische Diagramm [Demo](/vseed/guide/intro/pivotAndCombine)
3. Leistungsstarke Datenumformungsfunktionen, Keine Datenverarbeitung erforderlich, Beliebig viele Dimensionen, Metriken, Jeder Diagrammtyp kann geplottet werden [Demo](/vseed/guide/intro/dataReshape)
4. `VSeed`Ist vollständig serialisierbar, Daher wird eine plattformübergreifende Übertragung unterstützt`VSeed DSL` [Demo](/vseed/guide/intro/crossPlatformRender)
5. Out of the box: Numerische Formate, Internationalisierung, Farbtöne, gängige Stile und mehr [Demo](/vseed/guide/intro/internationalization)
6. Hervorragende Datenverarbeitungsleistung, Unterstützt am`Node`Datenverarbeitung beenden, um`Web`Ende zur Visualisierung [Demo](/vseed/guide/intro/separateBuild)

## VSeed Was sind die Nachteile von

1. `VSeed` Nicht dafür verantwortlich, jedes Detail eines einzelnen Diagramms zu polieren, Solche Bedürfnisse werden erfüllt durch`VChart`、`VTable`Bereitstellen, `VSeed`Nur flexible Modifikationen`spec`Fähigkeit, Benutzer können auf ihre Bedürfnisse zugeschnitten werden, Flexibilität, um jedes Detail des Diagramms zu ändern.
2. Nur Übereinstimmungen`tidyData`Kanonische Datensätze, kann`VSeed`Visualisierung. Nicht standardisierte Datensätze, Nicht von`VSeed`Akzeptieren.
3. Basierend auf`VisActor`Ökologisches Bauen, Benutzer müssen wissen,`VChart` Und `VTable`Grundbegriffe

## VSeed Was sind die Grundsätze？

1. `VSeed` Serialisierung muss unterstützt werden
2. `VSeed` Keine Notwendigkeit, zu viel Styling-Power bereitzustellen, Der Fokus sollte auf dem Umgang mit der Beziehung zwischen dem Graphen und den Daten liegen.
3. `VSeed` Gemeinsame Funktionen, die üblicherweise im Bereich der Verpackungsanalyse verwendet werden, sollten gekapselt werden, z. B. numerische Formatierung, Internationalisierung, Themen, gängige Stile, gemeinsame Merkmale, Sofort einsatzbereit.
4. Flexiblere Anpassungsbedürfnisse, Sollte vom Benutzer neu angepasst werden, VSeed bietet also nur einen Spec Builder extern an, Spezifikation für den Bau von VChart, VTable. 
   - Benutzer haben die Flexibilität, VChart-Instanz und VTable-Instanz zu steuern.
   - Benutzer können auf ihre Bedürfnisse zugeschnitten werden, Ändern Sie flexibel die Spezifikation von VChart und VTable.


## Warum Design VSeed?？

1. `VChart`kann niemals nahtlos auf`VTable`, und umgekehrt, Angesichts eines solchen Bedarfs, Eine abstrakte Verkapselung der oberen Ebene ist unvermeidlich.
2. Verwendung`VChart`、`VTable`Benutzer, Daten müssen eigenständig verarbeitet werden, Diese Arbeit wird versehentlich hunderte oder tausende Male wiederholt, `VSeed` Möchten die Datenverarbeitungskomplexität gängiger Szenarien reduzieren, Reduzieren Sie Doppelarbeit.
3. kann teilweise reduziert werden`VChart`Und`VTable`Schwellenwerte für die Verwendung, Zum Beispiel kann die Verwendung von`VTable`Rendering`PivotChart`.
4. `VSeed` kann sich schließlich zu`HeadlessBI`ein Submodul von, Wird verwendet, um allgemeine Datenanalysetools zu erstellen.