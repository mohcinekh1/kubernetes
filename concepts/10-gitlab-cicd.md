# Concept — GitLab CI/CD

## C'est quoi GitLab, en une phrase ?

GitLab est une plateforme DevOps qui combine dépôt Git, issues, merge requests, registre d'images Docker, variables secrètes et pipelines CI/CD dans un même outil.

L'idée importante : GitLab ne sert pas seulement à stocker du code. Il peut aussi tester, construire, scanner et préparer le déploiement de ton application à chaque changement.

## GitLab vs GitHub — ce qu'il faut comprendre

| Élément | GitHub | GitLab |
|---|---|---|
| Dépôt Git | Oui | Oui |
| Pull/Merge Request | Pull Request | Merge Request |
| CI/CD | GitHub Actions | GitLab CI/CD |
| Fichier pipeline | `.github/workflows/*.yml` | `.gitlab-ci.yml` |
| Registre Docker intégré | GitHub Container Registry | GitLab Container Registry |
| Variables secrètes | Repository secrets | CI/CD Variables |

Les deux outils ont le même objectif général : versionner ton code et automatiser les vérifications. La grande différence pratique, pour ce projet, est le format du pipeline.

## Le fichier `.gitlab-ci.yml`

GitLab lit automatiquement un fichier nommé `.gitlab-ci.yml` à la racine du dépôt. Ce fichier décrit :

- Les **stages** : grandes étapes du pipeline (`test`, `build`, `scan`, `deploy`)
- Les **jobs** : tâches concrètes exécutées dans chaque stage
- Les **images Docker** utilisées pour exécuter les jobs
- Les **variables** nécessaires au pipeline
- Les conditions de déclenchement

Exemple mental :

```yaml
stages:
  - test
  - build

test-backend:
  stage: test
  image: node:20-alpine
  script:
    - npm ci
    - npm test
```

Ici, GitLab démarre un conteneur `node:20-alpine`, récupère ton code, puis exécute les commandes du `script`.

## C'est quoi un Runner ?

Un **GitLab Runner** est la machine qui exécute réellement les jobs du pipeline.

Quand tu pousses un commit :

```text
Commit Git → GitLab détecte le changement → un Runner prend le job → les commandes s'exécutent
```

Il existe deux grands types :

- **Shared Runner** : fourni par GitLab ou par ton organisation, pratique pour commencer
- **Self-hosted Runner** : installé sur ta propre machine ou serveur, utile quand tu veux contrôler l'environnement

Pour apprendre, commence avec les shared runners si ton compte/projet GitLab les autorise.

## Variables et secrets

Dans un pipeline, tu ne dois jamais écrire directement des secrets dans `.gitlab-ci.yml`.

Mauvais réflexe :

```yaml
AWS_SECRET_ACCESS_KEY: "ma-cle-secrete"
```

Bon réflexe :

```yaml
script:
  - aws sts get-caller-identity
```

Puis tu ajoutes `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `SNYK_TOKEN`, etc. dans :

```text
GitLab → Project → Settings → CI/CD → Variables
```

Ces variables sont injectées au moment du pipeline, sans être commitées dans Git.

## Où GitLab se place dans ce projet

```text
Développeur → push code → GitLab
                         ↓
                  Pipeline GitLab CI/CD
                  tests + build image + scan sécurité
                         ↓
                  GitLab Container Registry
                         ↓
                  Helm / ArgoCD / Kubernetes
```

Dans un workflow moderne, GitLab peut :

- Lancer les tests de l'application
- Construire les images Docker
- Les pousser dans le GitLab Container Registry
- Lancer Trivy/Snyk
- Mettre à jour un chart Helm
- Déclencher ou préparer un déploiement GitOps avec ArgoCD

## Ce qu'on attend de toi en entretien

Tu dois pouvoir expliquer :

- La différence entre `stage` et `job`
- Pourquoi on utilise un Runner
- Pourquoi les secrets vont dans les variables GitLab, pas dans le dépôt
- Comment une image Docker est construite puis poussée dans un registry
- Pourquoi, en GitOps, le pipeline ne devrait pas forcément faire un `kubectl apply` direct en production

