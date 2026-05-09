# TidyData

:::info Bedeutung
TidyData Durch das Kernprinzip "Variable als Spalte, Beobachtung als Verhalten" wird die Komplexität der Datenbereinigung stark reduziert, so dass wir uns mehr auf geschäftliche Fragen als auf die Konvertierung von Datenformaten konzentrieren können.
:::

## Abschlussarbeit

Autor der Abschlussarbeit`Hadley Wickham`, Diplomarbeit diskutiert ein kleines Modul in der Datenverarbeitung, Datensortierung, Weil ordentliche Datensätze einfach zu manipulieren, zu modellieren und zu visualisieren sind und eine bestimmte Struktur haben.

Das Papier, Sehr empfehlenswert, Bitte beachten Sie: [Tidy Data](https://www.jstatsoft.org/article/view/v059i10)


## TidyData Apps in VSeed

VSeed DSL in`dataset`Konfiguration ist `TidyData` Formatierter Datensatz.

Die Kernfunktionen sind wie folgt:
1. Eine Spalte für jede Variable: Variablenwerte werden in separaten Spalten wie „Alter" und „Geschlecht" gespeichert.
2. Zeile pro Beobachtung: Alle Variablenwerte für jedes Beobachtungsobjekt bilden eine Zeile, z. B. das Alter und das Geschlecht einer Person.
3. Eine Tabelle für jede Art von Beobachtungseinheit: Verschiedene Arten von Beobachtungseinheiten (wie Personen, Zeit, Ort) sollten separat gespeichert werden.


Daher`SQL`Abfrageergebnisse, Kann direkt weitergeleitet werden`VSeed`von`dataset`Konfigurieren, Keine zusätzliche Datenverarbeitung erforderlich, zur schnellen Analyse und Visualisierung.