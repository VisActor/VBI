---
title: Veröffentlichen
---


# Veröffentlichen

## Änderungssatz generieren

Um neue Änderungssätze zu generieren, führen Sie pnpm changeset im Stamm des Repositorys aus. Die im Verzeichnis.changeset generierte Markdown-Datei sollte an das Repository übermittelt werden.
```bash
pnpm changeset
```

Ausführen von Git Commit nach Generierung des Änderungssatzes
```bash
git add .
git commit -m "chore: commit message"
```

Der obige Vorgang kann mehrmals wiederholt werden, Jede Änderung wird bis zum endgültigen Release hinzugefügt.

## Version aktualisieren

Führen Sie den folgenden Befehl aus, um die Version zu aktualisieren, und aktualisieren Sie das ChangeLog.
```bash
pnpm changeset version
```

Abhängigkeiten aktualisieren und Datei sperren
```bash
pnpm install
```

Änderungen einreichen
```bash
git add .
git commit -m "chore: release message"
git push
```

PRNach der Zusammenführung mit dem Hauptzweig, löst automatisch den Änderungssatz-Workflow aus, Verpackungs- und Verlagsarbeiten.