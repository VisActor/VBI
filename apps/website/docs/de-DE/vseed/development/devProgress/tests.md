# Testablauf

VSeed Nehmen Sie einen rigorosen testgesteuerten Entwicklungsprozess an.**Alle Testkommandos müssen im Projektstamm ausgeführt werden.**

## Testklassifizierung

### 1. Unit-Tests
- **Ziele**: Testen Sie unabhängige Tool-Funktionen, Pipeline-Knoten-Logik.
- **Standort**: `packages/vseed/tests/unit`
- **Ausführen**:
  ```bash
  pnpm --filter=@visactor/vseed run test:unit
  ```

### 2. Integrationstests
- **Ziele**: Testen Sie den gesamten Diagrammgenerierungsprozess (VSeed Spec - > VChart Spec).
- **Mechanismen**: Datengesteuert. Durch Lesen `packages/vseed/tests/integrations` Die JSON-Datei unter generiert automatisch Testfälle und vergleicht Snapshots.
- **Ausführen**:
  ```bash
  pnpm --filter=@visactor/vseed run test:integration
  ```

## Kern-Workflow

### Schritt 1: Führen Sie den Test durch
Während der Entwicklung werden häufig relevante Tests durchgeführt, um die Logik zu validieren.
```bash
# 运行所有测试
pnpm --filter=@visactor/vseed run test
```

### Schritt 2: Snapshot-Änderung verarbeiten
Wenn eine Codeänderung dazu führt, dass sich die Ausgabespezifikation ändert (z. B. wird ein Fehler behoben oder ein Feature hinzugefügt):
1. Überprüfen Sie die Diff-Ausgabe der Konsole, um festzustellen, ob die Änderung den Erwartungen entspricht.
2. Führen Sie, falls erwartet, den Update-Befehl aus:
   ```bash
   pnpm --filter=@visactor/vseed run test:update
   ```

### Schritt 3: Deckungsprüfung
Es wird empfohlen, die Testabdeckung zu überprüfen, bevor Sie den Code einreichen.
```bash
pnpm --filter=@visactor/vseed run test:coverage
```

## Wissenswertes
- **Automatisch generieren**: Integration getestet `.test.ts` Datei besteht aus `g` Skriptgeneriert,**bitte nicht manuell ändern**。
- **Anwendungsfall hinzufügen**: Um einen Integrationstest hinzuzufügen, `packages/vseed/tests/integrations` Fügen Sie eine neue JSON-Konfigurationsdatei in der entsprechenden Kategorie unten hinzu und führen Sie `pnpm run g`。
