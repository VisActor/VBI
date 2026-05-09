# Dokument

:::info
Schreiben `Typescript` Typ soll indirekt das Konfigurationspositionsdokument schreiben, 
:::

VSeedDokumente aller Diagrammtypen, sind in [`packages/vseed/src/types/chartType`](https://github.com/VisActor/VSeed/tree/main/packages/vseed/src/types/chartType) Unter dem Inhaltsverzeichnis

## Dokumente automatisch erstellen

```bash title="source: scripts/build-docs.js"
pnpm run build:docs
```


:::warning
Ändern Sie den Inhalt des Dokuments nicht direkt, Sie können jederzeit überschrieben werden

`build:docs` In Sekundenschnelle fertigstellen, Es gibt also kein inkrementelles Update., Alle alten Dokumente werden bei jeder Erstellung des Dokuments gelöscht, und ein neues Dokument generieren.

:::