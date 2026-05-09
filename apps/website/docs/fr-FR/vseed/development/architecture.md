# Conception architecturale

VSeed est un générateur de graphiques basé sur une configuration sémantique, conçu pour connecter l'intention de l'utilisateur au moteur de rendu sous-jacent (VChart/VTable).

> [Deep Wiki](https://deepwiki.com/VisActor/VSeed) 

## concepts de base

### 1. Architecture des pipelines (Pipeline Architecture)
VSeed Utilisez le mode pipeline pour construire le graphique étape par étape Spec. L'ensemble du processus est divisé en deux étapes principales :

- **AdvancedPipeline**: 
  - Entrée : Objet initial `VSeed`.
  - Responsabilités : Remodelage des données (Data Reshape), application de thèmes, déduction des configurations par défaut.
  - Sortie : `AdvancedVSeed` (modèle d'état intermédiaire).
  
- **SpecPipeline**:
  - Saisissez : `AdvancedVSeed`.
  - Responsabilité : convertir les modèles intermédiaires en options de configuration VChart/VTable concrètes.
  - Résultat : rendu final Spec.

### 2. Mode Builder
La classe `VSeedBuilder` est le coordinateur principal et est responsable de la gestion de Context, de l'enregistrement des plugins et de l'exécution du pipeline.

### 3. Extension de plug-in (Extensibility)
Les fonctionnalités de base de VSeed (telles que les types de graphiques pris en charge) sont entièrement mises en œuvre via le mécanisme d'enregistrement du plug-in.
- **Chart Type Registration** : Chaque type de graphique (par exemple `bar`, `line`) est un plugin enregistré.
- **Theme Registration** : prend en charge l'enregistrement de thèmes personnalisés.

 
