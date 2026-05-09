# Entwicklungsablauf

## Projekt starten

```bash title=Projekt starten
pnpm install && pnpm dev
``` 

## Anforderungen verstehen und Code schreiben

Es ist ein komplizierter Prozess, Aber im Allgemeinen, Nur drei Dinge:
1. Explizite Eingabe, `vseed`
2. Explizite Ausgabe, `vseed` Umwandeln in `advancedVSeed`, oder `advancedVSeed` Umwandeln in `spec`
3. Code schreiben, Stellen Sie sicher, dass der neue Input den erwarteten Output hat

:::tip
`playground(apps/website/docs/zh-CN/playground/index.mdx)`, Kann debuggt und entwickelt werden.

:::

## Neuer Testfall

Ggf., dann können Sie erwägen, einen neuen Testfall zu erstellen

:::tip
Wenn die Deckung reduziert wird, dann muss ein neuer Testfall erstellt werden

:::

um`packages/vseed/tests/*`Unter dem Inhaltsverzeichnis, Eine neue erstellen`testName.json`, und schreiben Sie an vseed DSL.

Ausführung

```bash title=Testfall erstellen
pnpm build:canvasTest
```

## Unit-Tests durchführen und Abdeckung aktualisieren

```bash title=Unit-Tests durchführen und Abdeckung aktualisieren
pnpm test:coverage
```

Achte auf 3 Dinge
1. Alle Tests bestanden
2. Snapshot-Änderungen entsprechen den Erwartungen
3. Die Deckung ist nicht gesunken

> Deckungsänderungen, wird automatisch auf README.md aktualisiert

## Dokumentation des Konfigurationselements aktualisieren

Wenn die Typescript-Definition des Diagrammtyps geändert wird, Bitte aktualisieren Sie die Dokumentation des Konfigurationselements.

:::tip
`packages/vseed/src/types/chartType` Alle Typdefinitionen unter, Konfigurationspositionsdokument entsprechend jedem Diagramm, Wenn es eine Änderung gibt, Achten Sie darauf, zu aktualisieren

:::

```bash title=Dokumentation des Konfigurationselements aktualisieren
pnpm build:docs
```

## Veröffentlichen & Absenden

```bash title=Beschreiben Sie die Änderung
pnpm changeset
```

Ausführung `pnpm changeset` Wählen Sie nach dem Befehl die folgende Aktion gemäß den Anweisungen aus
1. Wählen Sie das Paket aus, das Sie ändern möchten, Generell, Nur vSaatgut
2. Folgen Sie der semantischen Version, Art der Änderung auswählen, Überwältigend, 2 aufeinanderfolgende Einträge, Überspringen `major` und `minor` Nach, Auswählen `patch` Tu es einfach.
2. Geben Sie eine Beschreibung der Änderung ein, Zum Beispiel: `fix: chart render error caused by only one measure` 

:::tip Vorschlag
Ein Feature oder Bugfix, Entspricht einem`changeset`, Entspricht einem`commit`

Eins `Pull Request`, Entspricht einem`issue`

Eins `Pull Request`, Entspricht mehreren Funktionen oder mehreren Fehlerbehebungen, Entspricht mehreren`changeset`, Entspricht mehreren`commit`

:::

## Senden

```bash title=Alle Inhalte einreichen
git add .
git commit -m "fix: chart render error caused by only one measure"
git push
```
