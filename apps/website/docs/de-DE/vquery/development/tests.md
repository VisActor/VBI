# Testablauf

VQuery Verwendung `rstest` Das Framework wird getestet.**Alle Befehle müssen im Stammverzeichnis ausgeführt werden.**

## Testmechanismus
VQuery der abgedeckten Tests:
- **Unit**: Werkzeugfunktionen und Compiler-Logik.
- **examples**: Vollständiger SQL-Generierungs- und Datenabfrageprozess.

## Häufig verwendete Befehle

### Alle Tests ausführen
```bash
pnpm --filter=@visactor/vquery run test
```

### Snapshots aktualisieren
Aktualisieren Sie den Snapshot, wenn sich die SQL-Generierungslogik wie erwartet ändert:
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Abdeckungsbericht
Testabdeckung generieren und anzeigen:
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
