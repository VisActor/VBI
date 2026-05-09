# Häufig verwendete Skripte

Um die Konsistenz von Monorepo zu erhalten,**Alle Skripte müssen im Projektstammverzeichnis ausgeführt werden**。

## Kernskript (g)

`g` (Generator) ist das kritischste Hilfsskript in der VSeed Entwicklung.

```bash
pnpm run g
```

**Funktionsbeschreibung**:
Die Bestellung ist `build:test`、`build:docs` 、`build:api` Kombination zur Sicherstellung der Synchronisation von Ressourcen in der Entwicklungsumgebung:
1. **Testfälle generieren**: Einblicke `tests/integrations` Generieren Sie unter JSON-Spezifikation die entsprechende `.test.ts` Dateien.
2. **Dokument erstellen**: Parsen von TypeScript-Typdefinitionen, Aktualisieren `apps/website` Die API-Dokumentation in.

**Einsatzszenarien**:
- Nach dem Ändern der Diagrammlogik oder Hinzufügen eines neuen Diagrammtyps.
- Nach dem Ändern der TypeScript-Typdefinition.
- Vor dem Absenden des Codes.

## Entwicklung und Build

### Entwicklungsumgebung starten
Starten Sie gleichzeitig die VSeed Schnüffel- und Dokumentationsseite.
```bash
pnpm run dev
```

### Projekt erstellen
Erstellen Sie die VSeed Kernbibliothek.
```bash
pnpm --filter=@visactor/vseed run build
```

## Testbezogen

### Alle Tests ausführen
```bash
pnpm --filter=@visactor/vseed run test
```

### Unit-Test ausführen
```bash
pnpm --filter=@visactor/vseed run test:unit
```

### Integrationstest durchführen
```bash
pnpm --filter=@visactor/vseed run test:integration
```

### Test-Snapshot aktualisieren
Wird ausgeführt, wenn sich Ihr Code ändert, wodurch sich der Snapshot ändert (und die Erwartungen erfüllt):
```bash
pnpm --filter=@visactor/vseed run test:update
```

## Codequalität

### Lint Überprüfen
```bash
pnpm run lint
```

### Typprüfung
```bash
pnpm run typecheck
```
