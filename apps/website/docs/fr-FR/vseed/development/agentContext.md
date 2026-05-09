# Agent Contexte de développement (VSeed)

Ce document est destiné aux agent-code et aux contributeurs. Il résume l'architecture de base, le flux de données et les méthodes d'extension des sous-packages VSeed, afin d'établir rapidement une compréhension globale lors du développement automatisé.

> Il s'agit d'un "index contextuel" conçu pour être utilisé avec Agent. Pour une description technique plus détaillée, veuillez vous référer à : `packages/vseed/AGENTS.md`.

## 1. Objectifs et positionnement

VSeed est un **Spec Builder**, qui convertit `VSeed DSL` en `VChart` / `VTable` rendu Spec, prenant en charge la possibilité de générer et de modifier intelligemment des graphiques.

- Entrée : `VSeed DSL`
- Sortie : `VChart` / `VTable` Spec
- Processus de base : `AdvancedPipeline` + `SpecPipeline`

## 2. Pipeline en deux étapes

1. **AdvancedPipeline**

- Entrée : `VSeed DSL`
- Sortie : `AdvancedVSeed` (état intermédiaire sérialisable)
- Responsable de : le remodelage des données, l'inférence par défaut, la modélisation du codage, les thèmes et styles, la configuration de l'analyse

2. **SpecPipeline**

- Entrée : `AdvancedVSeed`
- Sortie : final Spec (non sérialisable, rendu directement)
- Responsable de : mapper les états intermédiaires sur des configurations spécifiques VChart / VTable

## 3. Builder Entrée

- Utilisez `Builder.from(vseed).build()` pour générer Spec
- `prepare()` Exécuter dynamicFilter (si nécessaire)

Saisie du code source :
- `packages/vseed/src/builder/builder/builder.ts`
- `packages/vseed/src/builder/builder/build.ts`
- `packages/vseed/src/builder/builder/prepare.ts`

## 4. Remodelage des données (noyau)

- `foldMeasures` : plusieurs mesures sont regroupés en un seul mesure pour générer `foldInfo`
- `unfoldDimensions` : Fusionner les dimensions par canal visuel pour générer `unfoldInfo`
- `dataReshapeByEncoding` : Appel combiné (fold + unfold)

Saisie du code source :
- `packages/vseed/src/dataReshape/foldMeasures.ts`
- `packages/vseed/src/dataReshape/unfoldDimensions.ts`
- `packages/vseed/src/dataReshape/dataReshapeByEncoding.ts`

## 5. Prolongation et enregistrement

- `registerAll()` : Enregistrez tous les graphiques et sujets
- `registerXxx()` : Formulaire d'inscription type graphique pipeline
- `updateAdvanced()` / `updateSpec()` : Insérer un Pipe personnalisé

Saisie du code source :
- `packages/vseed/src/builder/register/all.ts`
- `packages/vseed/src/builder/register/chartType/*`
- `packages/vseed/src/builder/register/custom.ts`

## 6. Pipeline Principes de conception

- Pipe Essayez d'être aussi atomique que possible et réduisez if/else
- Combinez les processus conditionnels via Adapter
- Le type de graphique est déterminé par la combinaison Pipe

se référer à :
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/pipeline/pipelineDesign.md`

## 7. Contexte plus complet

- `packages/vseed/AGENTS.md`
- `apps/website/docs/zh-CN/vseed/development/architecture.md`
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/vseed.md`

