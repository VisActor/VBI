# Architekturentwurf

VSeed ist ein semantisch konfigurierter Diagrammgenerator, der entwickelt wurde, um die Absicht des Benutzers mit der zugrunde liegenden Rendering-Engine (VChart/VTable) zu verbinden.

> [Deep Wiki](https://deepwiki.com/VisActor/VSeed) 

## Kernkonzepte

### 1. Pipeline-Architektur
VSeed Schritt-für-Schritt-Konstruktion der Diagrammspezifikation unter Verwendung des Pipeline-Modells.Der gesamte Prozess gliedert sich in zwei Hauptphasen:

- **AdvancedPipeline**: 
  - Eingang: Initial `VSeed` Objekt.
  - Verantwortlichkeiten: Datenumformung, Anwenden von Designs, Ableiten von Standardkonfigurationen.
  - Ausgang: `AdvancedVSeed` (Zwischenvorlagen).
  
- **SpecPipeline**:
  - Eingang: `AdvancedVSeed`。
  - Verantwortlichkeiten: Konvertieren Sie die Zwischenvorlage in ein bestimmtes VChart/VTable-Konfigurationselement.
  - Ausgabe: Endgültige renderbare Spezifikation

### 2. Builder Modus
`VSeedBuilder` Die Klasse ist der Kernkoordinator, der für die Verwaltung des Kontexts, die Registrierung des Plugins und die Ausführung der Pipeline verantwortlich ist.

### 3. Plug-in-Erweiterbarkeit
VSeed Kernfunktionen, wie unterstützte Diagrammtypen, werden vollständig über den Plugin-Registrierungsmechanismus implementiert.
- **Chart Type Registration**: Jeder Diagrammtyp (z. B. `bar`, `line`）ist ein registriertes Plugin.
- **Theme Registration**: Unterstützung für die Registrierung benutzerdefinierter Designs.

 