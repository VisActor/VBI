# Agent Entwicklungskontext (VSeed)

Dieses Dokument richtet sich an Agent-Code und Mitwirkende. Es fasst die Kernarchitektur, den Datenfluss und die Erweiterungsmethoden von VSeed Unterpaketen zusammen, um während der automatisierten Entwicklung schnell ein globales Verständnis zu schaffen.

> Dies ist der Kontextindex, der für die Verwendung durch den Agenten entwickelt wurde.Detailliertere technische Anweisungen finden Sie unter:`packages/vseed/AGENTS.md`。

## 1. Targeting und Positionierung

VSeed Ist ein **Spec Builder**，wird `VSeed DSL` Umwandeln in `VChart` / `VTable` Spec kann gerendert werden, um die Möglichkeit zu unterstützen, Diagramme intelligent zu generieren und zu bearbeiten.

- Eingang:`VSeed DSL`
- Ausgang:`VChart` / `VTable` Spec
- Kernprozess:`AdvancedPipeline` + `SpecPipeline`

## 2. Zweistufige Pipeline

1. **AdvancedPipeline**

- Eingang:`VSeed DSL`
- Ausgang:`AdvancedVSeed`（Serialisierbarer Zwischenzustand)
- Verantwortlich für: Datenumformung, Standardinferenz, Codierungsmodellierung, Themen und Stile, Profilierungskonfiguration

2. **SpecPipeline**

- Eingang:`AdvancedVSeed`
- Ausgabe: Endgültige Spezifikation (nicht serialisierbar, direkt gerendert)
- Verantwortlich: Abbildung von Zwischenzuständen auf bestimmte VChart/VTable-Konfigurationen

## 3. Builder Eingang

- Verwendung `Builder.from(vseed).build()` Spezifikation erstellen
- `prepare()` DynamicFilter ausführen (falls erforderlich)

Quellcodeeingabe:
- `packages/vseed/src/builder/builder/builder.ts`
- `packages/vseed/src/builder/builder/build.ts`
- `packages/vseed/src/builder/builder/prepare.ts`

## 4. Datenumformung (Core)

- `foldMeasures`：Mehrere Indikatoren werden zu einem einzigen Indikator zusammengefasst, generiert `foldInfo`
- `unfoldDimensions`：Zusammenführen von Dimensionen nach visuellem Kanal, Generieren von `unfoldInfo`
- `dataReshapeByEncoding`：Kombinierter Anruf (Fold + Unfold)

Quellcodeeingabe:
- `packages/vseed/src/dataReshape/foldMeasures.ts`
- `packages/vseed/src/dataReshape/unfoldDimensions.ts`
- `packages/vseed/src/dataReshape/dataReshapeByEncoding.ts`

## 5. Erweiterungen & Registrierung

- `registerAll()`：Registrieren Sie alle Diagramme und Themen
- `registerXxx()`：Pipeline für Registrierungsauftragsdiagramme
- `updateAdvanced()` / `updateSpec()`：Benutzerdefiniertes Rohr einfügen

Quellcodeeingabe:
- `packages/vseed/src/builder/register/all.ts`
- `packages/vseed/src/builder/register/chartType/*`
- `packages/vseed/src/builder/register/custom.ts`

## 6. Pipeline Gestaltungsprinzipien

- Pipe Atomisieren Sie so viel wie möglich, reduzieren Sie wenn/sonst
- Konditionsprozess über Adapter kombinieren
- Die Art des Diagramms wird durch die Rohrkombination bestimmt

Aktenzeichen:
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/pipeline/pipelineDesign.md`

## 7. Vollständigerer Kontext

- `packages/vseed/AGENTS.md`
- `apps/website/docs/zh-CN/vseed/development/architecture.md`
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/vseed.md`

