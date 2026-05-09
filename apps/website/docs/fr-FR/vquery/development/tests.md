# Processus de test

VQuery Testé à l'aide du framework `rstest`. **Toutes les commandes doivent être exécutées dans le répertoire racine. **

## Mécanisme de test
Les tests pour les VQuery couvrent :
- **Unit** : fonctions de l'outil et logique du compilateur.
- **examples** : Terminer le processus de génération et de requête de données SQL.

## Commandes courantes

### Exécutez tous les tests
```bash
pnpm --filter=@visactor/vquery run test
```

### Mettre à jour l'instantané
Si les changements logiques générés par SQL sont comme prévu, l'instantané doit être mis à jour :
```bash
pnpm --filter=@visactor/vquery run test:update
```

### rapport de couverture
Générez et affichez la couverture des tests :
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
