# Processus de test

VSeed Adopter un processus de développement rigoureux basé sur les tests. **Toutes les commandes de test doivent être exécutées dans le répertoire racine du projet. **

## Classement des épreuves

### 1. Tests unitaires (Unit Tests)
- **Objectif** : tester les fonctions utilitaires indépendantes, la logique des nœuds Pipeline.
- **Emplacement** : `packages/vseed/tests/unit`
- **Exécuter** :
  ```bash
  pnpm --filter=@visactor/vseed run test:unit
  ```

### 2. Tests d'intégration (Integration Tests)
- **Objectif** : Tester le processus complet de génération de graphiques (VSeed Spec -> VChart Spec).
- **Mécanisme** : piloté par les données. Générez automatiquement des cas de test et comparez les instantanés en lisant les fichiers JSON sous `packages/vseed/tests/integrations`.
- **Exécuter** :
  ```bash
  pnpm --filter=@visactor/vseed run test:integration
  ```

## Flux de travail principal (Workflow)

### Étape 1 : Exécutez le test
Pendant le développement, exécutez fréquemment des tests pertinents pour vérifier la logique.
```bash
# 运行所有测试
pnpm --filter=@visactor/vseed run test
```

### Étape 2 : Traiter les modifications apportées aux instantanés
Si le code est modifié pour que la sortie Spec change (par exemple, Bug est corrigé ou un nouveau Feature est ajouté) :
1. Vérifiez la sortie de la console pour Diff pour confirmer que les modifications sont comme prévu.
2. Si cela fonctionne comme prévu, exécutez la commande update :
   ```bash
   pnpm --filter=@visactor/vseed run test:update
   ```

### Étape 3 : Vérification de la couverture
Avant de valider du code, il est recommandé de vérifier la couverture des tests.
```bash
pnpm --filter=@visactor/vseed run test:coverage
```

## Choses à noter
- **Généré automatiquement** : Le fichier `.test.ts` du test d'intégration est généré par le script `g`, **Ne le modifiez pas manuellement**.
- **Nouveau cas d'utilisation** : Pour ajouter un nouveau test d'intégration, ajoutez simplement un nouveau fichier de configuration JSON dans le répertoire de catégorie correspondant sous `packages/vseed/tests/integrations`, puis exécutez `pnpm run g`.
