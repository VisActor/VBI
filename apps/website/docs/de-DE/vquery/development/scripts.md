# Häufig verwendete Skripte

Um die Konsistenz von Monorepo zu erhalten,**Alle Skripte müssen im Projektstammverzeichnis ausgeführt werden**。

## Kernskript (g)

```bash
pnpm run g
```
**Funktionsbeschreibung**: VQuery von `g` Das Skript ist verantwortlich für:
1. `build:test`: Kompilieren Sie Testressourcen.
2. `build:docs`: API-Dokumentation erstellen.

## Entwicklung und Build

### Build
```bash
pnpm --filter=@visactor/vquery run build
```

## Tests

### Tests ausführen
VQuery Test mit Rtest.
```bash
pnpm --filter=@visactor/vquery run test
```

### Snapshots aktualisieren
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Abdeckung
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
