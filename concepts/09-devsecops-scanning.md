# Concept — DevSecOps & Scan de vulnérabilités

## C'est quoi le DevSecOps, en une phrase ?

Le DevSecOps intègre la sécurité **à chaque étape du pipeline** (dès le code, à chaque commit) plutôt que de la traiter comme une vérification finale juste avant la mise en production.

## L'image classique : "Shift Left"

```
Avant (sécurité tardive) :
Code → Build → Test → Déploiement → [Audit sécurité APRÈS coup] → Trop tard, déjà en prod

DevSecOps (Shift Left = déplacer la sécurité "vers la gauche", plus tôt) :
Code → [Scan sécurité] → Build → [Scan image] → Test → [Scan avant déploiement] → Déploiement
```

Plus un problème de sécurité est détecté tôt, moins il coûte cher à corriger.

## SAST vs DAST — souvent confondu

| | SAST | DAST |
|---|---|---|
| **Signifie** | Static Application Security Testing | Dynamic Application Security Testing |
| **Analyse** | Le code source, sans l'exécuter | L'application EN COURS D'EXÉCUTION |
| **Détecte** | Failles dans le code (injections SQL potentielles, mauvaises pratiques) | Failles exploitables réellement (endpoints vulnérables, mauvaise config serveur) |
| **Quand** | Très tôt (à chaque commit) | Plus tard (sur un environnement de test déployé) |

Trivy et Snyk, dans ce projet, se rapprochent plutôt d'une analyse de **dépendances et d'images** (parfois appelée SCA — Software Composition Analysis), une catégorie complémentaire au SAST/DAST classique.

## Pourquoi scanner À LA FOIS l'image et les dépendances

- **Trivy (image)** détecte les vulnérabilités dans le **système d'exploitation** de ton image (paquets Linux obsolètes, failles connues dans les libs système)
- **Snyk (dépendances)** détecte les vulnérabilités dans **ton code applicatif** (une version vulnérable de `lodash`, `express`, etc. dans ton `package.json`)

Un projet réel peut être vulnérable sur l'un sans l'être sur l'autre — d'où l'intérêt de combiner les deux.

## Le concept de "faire échouer le pipeline" (fail on severity)

Une bonne pratique DevSecOps n'est pas de bloquer sur TOUTE vulnérabilité (il y en a presque toujours des mineures), mais de définir un seuil raisonnable :
```yaml
severity: 'CRITICAL,HIGH'
exit-code: '1'
```
Ça signifie : le pipeline échoue uniquement si une vulnérabilité `CRITICAL` ou `HIGH` est trouvée — les `LOW`/`MEDIUM` sont journalisées mais ne bloquent pas le déploiement. C'est un compromis pragmatique très demandé dans les vraies équipes.

## Ce qu'on attend de toi en entretien sur ce sujet

- Savoir expliquer la différence entre scanner une image et scanner des dépendances
- Savoir justifier pourquoi on ne bloque pas sur toute vulnérabilité mineure
- Savoir citer un exemple concret de vulnérabilité trouvée et comment tu l'as corrigée (ex: "changer une image de base `node:14` vers `node:20-alpine` a réduit le nombre de CVE critiques")
