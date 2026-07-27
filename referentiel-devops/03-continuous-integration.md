# Pilier 03 - Continuous Integration CI

## Objectif du cours

La **Continuous Integration**, ou **CI**, veut dire **Integration Continue**.

Son objectif est simple :

```text
verifier automatiquement chaque changement de code avant de l'integrer dans la branche principale
```

Dans un projet DevOps, la CI aide a detecter rapidement :

```text
erreurs de code
tests qui echouent
problemes de build
problemes Docker
problemes de configuration
problemes de securite
manifests Kubernetes invalides
```

Phrase importante :

```text
La CI verifie que le code est encore correct apres chaque changement.
```

## Plan du cours

```text
PARTIE 1 - Comprendre la CI
PARTIE 2 - Role de la CI dans DevOps
PARTIE 3 - Pipeline CI
PARTIE 4 - Jobs, stages et runners
PARTIE 5 - CI avec GitLab
PARTIE 6 - CI avec GitHub Actions
PARTIE 7 - Tests automatises
PARTIE 8 - Build Docker dans la CI
PARTIE 9 - Validation Kubernetes dans la CI
PARTIE 10 - Securite dans la CI
PARTIE 11 - Bonnes pratiques
PARTIE 12 - Application a notre projet
PARTIE 13 - Questions d'entretien
PARTIE 14 - Resume final
```

## PARTIE 1 - Comprendre la CI

### 1. Definition

La CI est une pratique DevOps ou chaque changement de code est teste automatiquement.

Exemple :

```text
Developpeur modifie le code
-> commit
-> push
-> pipeline CI demarre
-> tests automatiques
-> resultat visible
```

Si le pipeline passe :

```text
le changement est considere valide techniquement
```

Si le pipeline echoue :

```text
il faut corriger avant de merger ou deployer
```

### 2. Probleme sans CI

Sans CI :

```text
les erreurs sont decouvertes tard
les tests sont faits manuellement
le code peut casser main
les builds ne sont pas reproductibles
l'equipe perd du temps a chercher les bugs
```

### 3. Avec CI

Avec CI :

```text
les tests sont automatiques
chaque push est verifie
les erreurs sont visibles rapidement
la qualite augmente
les Pull Requests sont plus fiables
```

### 4. Exemple simple

Tu modifies le backend :

```text
app/backend/server.js
```

Tu fais :

```powershell
git add app/backend/server.js
git commit -m "fix: update backend health endpoint"
git push
```

La CI lance automatiquement :

```text
npm ci
npm test
docker build
scan securite
validation manifests
```

## PARTIE 2 - Role de la CI dans DevOps

### 5. Lien avec le cycle DevOps

| Etape DevOps | Role de la CI |
| --- | --- |
| Code | Verifier chaque changement |
| Build | Construire l'application automatiquement |
| Test | Lancer les tests |
| Release | Preparer une version fiable |
| Deploy | Bloquer le deploiement si la CI echoue |
| Feedback | Donner un retour rapide aux developpeurs |

### 6. Question principale de la CI

La CI repond a cette question :

```text
Est-ce que mon changement casse quelque chose ?
```

### 7. CI et collaboration

La CI aide l'equipe parce que tout le monde voit le meme resultat :

```text
pipeline passed
pipeline failed
job test failed
job build failed
job security failed
```

Donc il y a moins de debat et plus de preuves.

Phrase importante :

```text
La CI transforme les verifications manuelles en verifications automatiques.
```

## PARTIE 3 - Pipeline CI

### 8. C'est quoi un pipeline

Un pipeline est une suite d'etapes automatiques.

Exemple :

```text
test -> build -> security -> validate
```

Chaque etape contient un ou plusieurs jobs.

### 9. Exemple de pipeline

```text
Stage test
  - test-backend
  - test-frontend

Stage build
  - build-backend-image
  - build-frontend-image

Stage security
  - scan-backend-image
  - scan-frontend-image

Stage validate
  - validate-kubernetes-manifests
```

### 10. Pipeline passed

Si tout reussit :

```text
pipeline passed
```

Cela signifie :

```text
le code compile ou s'execute
les tests passent
les images se construisent
les validations passent
```

### 11. Pipeline failed

Si un job echoue :

```text
pipeline failed
```

Cela signifie :

```text
il faut lire les logs du job echoue
corriger le probleme
commit
push
relancer le pipeline
```

## PARTIE 4 - Jobs, stages et runners

### 12. Stage

Un stage est une grande phase du pipeline.

Exemple :

```yaml
stages:
  - test
  - build
  - security
  - validate
```

Role :

```text
organiser l'ordre des jobs
```

### 13. Job

Un job est une tache automatique.

Exemple :

```yaml
test-backend:
  stage: test
  image: node:22-alpine
  script:
    - cd app/backend
    - npm ci
    - npm test
```

Role :

```text
lancer une verification precise
```

### 14. Runner

Un runner est la machine qui execute le pipeline.

Exemple :

```text
GitLab SaaS Runner
GitHub-hosted runner
self-hosted runner
```

Role :

```text
executer les jobs CI
```

### 15. Image Docker du job

Dans beaucoup de pipelines, chaque job s'execute dans une image Docker.

Exemple :

```yaml
image: node:22-alpine
```

Role :

```text
donner un environnement propre et reproductible au job
```

## PARTIE 5 - CI avec GitLab

### 16. Fichier GitLab CI

GitLab utilise le fichier :

```text
.gitlab-ci.yml
```

Ce fichier decrit :

```text
les stages
les jobs
les images Docker
les commandes a executer
les conditions de lancement
```

### 17. Exemple minimal

```yaml
stages:
  - test

test-backend:
  stage: test
  image: node:22-alpine
  script:
    - cd app/backend
    - npm ci
    - npm test
```

### 18. Role des commandes

```text
cd app/backend -> entrer dans le dossier backend
npm ci         -> installer les dependances proprement
npm test       -> lancer les tests
```

### 19. rules

Dans GitLab, `rules` permet de choisir quand lancer un job.

Exemple :

```yaml
rules:
  - changes:
      - app/backend/**/*
      - .gitlab-ci.yml
```

Role :

```text
lancer le job seulement si le backend ou le pipeline change
```

### 20. artifacts

Les artifacts sont des fichiers produits par un job et conserves par GitLab.

Exemple :

```yaml
artifacts:
  paths:
    - coverage/
```

Role :

```text
garder les resultats de tests, rapports ou builds
```

## PARTIE 6 - CI avec GitHub Actions

### 21. Fichier GitHub Actions

GitHub Actions utilise des fichiers dans :

```text
.github/workflows/
```

Exemple :

```text
.github/workflows/ci.yml
```

### 22. Exemple minimal GitHub Actions

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
        working-directory: app/backend
      - run: npm test
        working-directory: app/backend
```

### 23. Difference GitLab CI et GitHub Actions

| GitLab CI | GitHub Actions |
| --- | --- |
| `.gitlab-ci.yml` | `.github/workflows/*.yml` |
| stages/jobs | jobs/steps |
| GitLab Runner | GitHub Runner |
| Merge Request | Pull Request |

## PARTIE 7 - Tests automatises

### 24. Pourquoi tester dans la CI

Les tests automatiques evitent de merger du code casse.

Types de tests :

```text
unit tests
integration tests
API tests
frontend tests
lint
format
security tests
```

### 25. Test backend

Exemple Node.js :

```yaml
test-backend:
  stage: test
  image: node:22-alpine
  script:
    - cd app/backend
    - npm ci
    - npm test
```

Role :

```text
installer dependances backend et lancer les tests
```

### 26. Test frontend simple

Pour un frontend statique, on peut verifier que les fichiers existent.

Exemple :

```yaml
test-frontend:
  stage: test
  image: alpine:3.20
  script:
    - test -f app/frontend/index.html
    - test -f app/frontend/app.js
    - test -f app/frontend/nginx.conf
```

Role :

```text
verifier que les fichiers essentiels du frontend existent
```

### 27. Lint

Le lint verifie la qualite du code.

Exemples d'outils :

```text
ESLint
Prettier
ShellCheck
Hadolint
yamllint
```

Role :

```text
detecter erreurs de style, syntaxe ou mauvaises pratiques
```

## PARTIE 8 - Build Docker dans la CI

### 28. Pourquoi builder Docker dans la CI

Si l'application doit tourner en conteneur, la CI doit verifier que l'image Docker se construit.

Question :

```text
Est-ce que mon Dockerfile fonctionne encore ?
```

### 29. Exemple build backend

```yaml
build-backend:
  stage: build
  image: docker:27
  services:
    - docker:27-dind
  script:
    - docker build -t backend:test app/backend
```

Role :

```text
construire l'image Docker du backend
```

### 30. Docker in Docker

`docker:dind` signifie Docker in Docker.

Role :

```text
permettre a un job CI de lancer des commandes docker build
```

### 31. Tag d'image

Dans une CI, on evite souvent `latest` seul.

On utilise :

```text
commit SHA
version tag
branch name
```

Exemple :

```yaml
BACKEND_IMAGE: "$CI_REGISTRY_IMAGE/backend:$CI_COMMIT_SHORT_SHA"
```

Role :

```text
creer une image liee a un commit precis
```

## PARTIE 9 - Validation Kubernetes dans la CI

### 32. Pourquoi valider Kubernetes

Les fichiers Kubernetes sont du YAML.

Une petite erreur d'indentation peut casser le deploiement.

La CI peut verifier :

```text
syntaxe YAML
schema Kubernetes
champs obligatoires
kind valide
apiVersion valide
```

### 33. Probleme avec kubectl dry-run

Commande :

```text
kubectl apply --dry-run=client -f infra/k8s/
```

Probleme possible :

```text
kubectl peut essayer de contacter un cluster pour telecharger le schema OpenAPI
```

Dans GitLab Runner, il n'y a pas toujours de cluster.

Donc erreur possible :

```text
failed to download openapi
localhost:8080 connection refused
```

### 34. Solution kubeconform

`kubeconform` valide les manifests Kubernetes sans avoir besoin d'un cluster.

Exemple :

```yaml
validate-kubernetes:
  stage: validate
  image: alpine:3.20
  script:
    - apk add --no-cache curl tar
    - curl -sSL https://github.com/yannh/kubeconform/releases/download/v0.6.7/kubeconform-linux-amd64.tar.gz -o kubeconform.tar.gz
    - tar -xzf kubeconform.tar.gz kubeconform
    - chmod +x kubeconform
    - ./kubeconform -summary -ignore-missing-schemas infra/k8s/*.yaml
```

Role :

```text
telecharger kubeconform puis valider les fichiers Kubernetes
```

Point important :

```text
Dans Linux, pour executer un fichier dans le dossier courant, on utilise ./kubeconform
```

## PARTIE 10 - Securite dans la CI

### 35. Pourquoi ajouter la securite

La securite doit etre testee tot.

DevSecOps veut dire :

```text
integrer la securite dans le cycle DevOps
```

Dans la CI, on peut scanner :

```text
dependances
images Docker
secrets
code source
manifests Kubernetes
```

### 36. Trivy

Trivy est un outil de scan securite.

Il peut scanner :

```text
images Docker
fichiers
dependances
IaC
```

Exemple :

```yaml
scan-backend-image:
  stage: security
  image: aquasec/trivy:latest
  script:
    - trivy image backend:test
```

Role :

```text
chercher les vulnerabilites dans l'image backend
```

### 37. Secrets dans la CI

Ne jamais ecrire un secret directement dans le fichier CI.

Mauvais :

```yaml
PASSWORD: "monmotdepasse"
```

Bon :

```text
utiliser CI/CD Variables
```

Exemples :

```text
CI_REGISTRY_PASSWORD
DOCKER_PASSWORD
KUBE_CONFIG
```

## PARTIE 11 - Bonnes pratiques

### 38. Pipeline rapide

Une CI doit donner un feedback vite.

Bonnes pratiques :

```text
jobs paralleles
cache dependances
tests rapides au debut
build seulement si necessaire
rules changes
```

### 39. Pipeline lisible

Un pipeline doit etre comprehensible.

Bonnes pratiques :

```text
noms de jobs clairs
stages bien separes
logs lisibles
variables explicites
commentaires utiles
```

### 40. Ne pas tout mettre dans un seul job

Mauvais :

```text
un seul job fait test + build + scan + validate
```

Bon :

```text
test-backend
test-frontend
build-backend
build-frontend
scan-images
validate-k8s
```

### 41. Bloquer le merge si CI failed

Dans un projet professionnel :

```text
on ne merge pas si la CI echoue
```

Regle :

```text
CI passed -> merge possible
CI failed -> correction obligatoire
```

### 42. Garder la CI dans Git

Le fichier CI doit etre versionne :

```text
.gitlab-ci.yml
.github/workflows/ci.yml
```

Pourquoi :

```text
historique des changements
review des modifications pipeline
reproductibilite
collaboration
```

## PARTIE 12 - Application a notre projet

### 43. Ce qu'on a fait dans notre projet

Dans notre projet Kubernetes Migration Lab, on a cree :

```text
.gitlab-ci.yml
```

Ce pipeline verifie :

```text
backend
frontend
Docker images
security scan
Kubernetes manifests
```

### 44. Stages utilises

```yaml
stages:
  - test
  - build
  - security
  - validate
```

Role :

```text
test    -> verifier le code
build   -> construire les images Docker
security -> scanner les images
validate -> verifier les manifests Kubernetes
```

### 45. Erreurs rencontrees et lecons

Erreur 1 :

```text
kubectl dry-run cherchait un cluster
```

Lecon :

```text
dans CI, eviter une validation qui depend d'un cluster si le runner n'a pas de kubeconfig
```

Erreur 2 :

```text
image kubeconform sans shell
```

Lecon :

```text
certains conteneurs sont minimalistes et ne contiennent pas sh
```

Erreur 3 :

```text
kubeconform: not found
```

Lecon :

```text
sur Linux, executer un binaire local avec ./nom-du-fichier
```

### 46. Commandes utiles pour GitLab CI

Voir les pipelines :

```text
GitLab -> Build -> Pipelines
```

Voir les jobs :

```text
GitLab -> Build -> Jobs
```

Lire une erreur :

```text
ouvrir le job failed
lire les logs
identifier la commande qui echoue
corriger
commit
push
```

## PARTIE 13 - Questions d'entretien

### Question 1

**C'est quoi la CI ?**

Reponse :

```text
La CI est une pratique DevOps qui lance automatiquement des tests et validations a chaque changement de code.
```

### Question 2

**Pourquoi utiliser la CI ?**

Reponse :

```text
Pour detecter rapidement les erreurs, eviter de casser main et donner un feedback rapide aux developpeurs.
```

### Question 3

**C'est quoi un pipeline ?**

Reponse :

```text
Un pipeline est une suite d'etapes automatiques composees de jobs, comme test, build, security et validate.
```

### Question 4

**C'est quoi un runner ?**

Reponse :

```text
Un runner est la machine qui execute les jobs du pipeline CI.
```

### Question 5

**Difference entre stage et job ?**

Reponse :

```text
Un stage est une phase globale du pipeline. Un job est une tache precise executee dans un stage.
```

### Question 6

**Pourquoi builder Docker dans la CI ?**

Reponse :

```text
Pour verifier que l'application peut etre containerisee et que le Dockerfile fonctionne toujours.
```

### Question 7

**Pourquoi valider Kubernetes dans la CI ?**

Reponse :

```text
Pour detecter les erreurs de syntaxe ou de schema dans les manifests avant le deploiement.
```

### Question 8

**Que faire si un pipeline echoue ?**

Reponse :

```text
Lire les logs du job failed, identifier la commande qui echoue, corriger le code ou la configuration, puis refaire commit et push.
```

## PARTIE 14 - Resume final

### A retenir

```text
CI = Integration Continue
Pipeline = suite d'etapes automatiques
Stage = grande phase
Job = tache precise
Runner = machine qui execute
Test = verification automatique
Build = construction application/image
Security scan = controle securite
Validation = controle configuration
```

### Phrase simple

```text
La CI permet de verifier automatiquement chaque changement de code avant de l'integrer dans main.
```

### Phrase d'entretien

```text
La Continuous Integration est essentielle en DevOps parce qu'elle donne un feedback rapide aux developpeurs, detecte les erreurs tot, automatise les tests et builds, et protege la branche principale contre les changements non valides.
```

## Sources officielles

- GitLab CI/CD Docs: https://docs.gitlab.com/ci/
- GitHub Actions Docs: https://docs.github.com/actions
- Docker Build Docs: https://docs.docker.com/build/
- Kubeconform: https://github.com/yannh/kubeconform
- Trivy: https://trivy.dev/

## Annexe - Checklist pratique par stage CI

Cette partie sert de modele general quand tu dois ecrire un fichier de pipeline.

Pipeline classique :

```text
test -> build -> security -> validate
```

### Stage 1 - test

Objectif :

```text
Verifier que le code fonctionne avant de construire ou deployer.
```

Ce qu'il faut verifier :

```text
dependances installees correctement
tests unitaires
tests API
lint si disponible
format si disponible
fichiers frontend essentiels
```

Commandes courantes :

```text
npm ci
npm test
npm run lint
npm run build
test -f fichier
```

Exemple GitLab CI backend :

```yaml
test-backend:
  stage: test
  image: node:22-alpine
  script:
    - cd app/backend
    - npm ci
    - npm test
```

Exemple GitLab CI frontend simple :

```yaml
test-frontend:
  stage: test
  image: alpine:3.20
  script:
    - test -f app/frontend/index.html
    - test -f app/frontend/app.js
    - test -f app/frontend/nginx.conf
```

Exemple GitHub Actions backend :

```yaml
test-backend:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 22
    - run: npm ci
      working-directory: app/backend
    - run: npm test
      working-directory: app/backend
```

### Stage 2 - build

Objectif :

```text
Verifier que l'application peut etre construite correctement.
```

Ce qu'il faut verifier :

```text
build application
build image Docker backend
build image Docker frontend
tag image clair
Dockerfile valide
contexte Docker correct
```

Commandes courantes :

```text
docker build
docker compose build
npm run build
docker images
```

Exemple GitLab CI build Docker :

```yaml
build-backend:
  stage: build
  image: docker:27
  services:
    - docker:27-dind
  variables:
    DOCKER_TLS_CERTDIR: "/certs"
    BACKEND_IMAGE: "$CI_REGISTRY_IMAGE/backend:$CI_COMMIT_SHORT_SHA"
  script:
    - docker build -t "$BACKEND_IMAGE" app/backend
```

Exemple GitLab CI build + push image :

```yaml
build-and-push-backend:
  stage: build
  image: docker:27
  services:
    - docker:27-dind
  variables:
    DOCKER_TLS_CERTDIR: "/certs"
    BACKEND_IMAGE: "$CI_REGISTRY_IMAGE/backend:$CI_COMMIT_SHORT_SHA"
  script:
    - echo "$CI_REGISTRY_PASSWORD" | docker login "$CI_REGISTRY" -u "$CI_REGISTRY_USER" --password-stdin
    - docker build -t "$BACKEND_IMAGE" app/backend
    - docker push "$BACKEND_IMAGE"
```

Exemple GitHub Actions build Docker :

```yaml
build-backend:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: docker build -t backend:test app/backend
```

### Stage 3 - security

Objectif :

```text
Detecter les problemes de securite avant livraison.
```

Ce qu'il faut verifier :

```text
vulnerabilites dependances
vulnerabilites images Docker
secrets dans le code
mauvaises pratiques Dockerfile
configuration Kubernetes dangereuse
```

Outils courants :

```text
Trivy
Gitleaks
Hadolint
npm audit
GitHub Dependabot
GitLab Security Scanning
```

Exemple GitLab CI scan image avec Trivy :

```yaml
scan-backend-image:
  stage: security
  image:
    name: aquasec/trivy:latest
    entrypoint: [""]
  script:
    - trivy image --severity HIGH,CRITICAL --exit-code 1 backend:test
```

Exemple scan fichiers avec Trivy :

```yaml
scan-files:
  stage: security
  image:
    name: aquasec/trivy:latest
    entrypoint: [""]
  script:
    - trivy fs --severity HIGH,CRITICAL --exit-code 1 .
```

Exemple detection secrets avec Gitleaks :

```yaml
scan-secrets:
  stage: security
  image:
    name: zricethezav/gitleaks:latest
    entrypoint: [""]
  script:
    - gitleaks detect --source . --verbose
```

Exemple GitHub Actions avec Trivy :

```yaml
security-scan:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: aquasecurity/trivy-action@master
      with:
        scan-type: fs
        scan-ref: .
        severity: HIGH,CRITICAL
        exit-code: "1"
```

### Stage 4 - validate

Objectif :

```text
Verifier que les fichiers de configuration sont valides avant de deployer.
```

Ce qu'il faut verifier :

```text
syntaxe YAML
schema Kubernetes
docker-compose valide
presence des fichiers obligatoires
variables obligatoires
manifests Kubernetes valides
```

Commandes courantes :

```text
docker compose config
kubeconform
kubectl apply --dry-run=client
yamllint
test -f fichier
```

Exemple validation Docker Compose :

```yaml
validate-compose:
  stage: validate
  image: docker:27
  services:
    - docker:27-dind
  variables:
    DOCKER_TLS_CERTDIR: "/certs"
  script:
    - docker compose config
```

Exemple validation Kubernetes avec kubeconform :

```yaml
validate-kubernetes:
  stage: validate
  image: alpine:3.20
  script:
    - apk add --no-cache curl tar
    - curl -sSL https://github.com/yannh/kubeconform/releases/download/v0.6.7/kubeconform-linux-amd64.tar.gz -o kubeconform.tar.gz
    - tar -xzf kubeconform.tar.gz kubeconform
    - chmod +x kubeconform
    - ./kubeconform -summary -ignore-missing-schemas infra/k8s/*.yaml
```

Exemple validation Kubernetes avec kubectl, seulement si un cluster est disponible :

```yaml
validate-kubernetes-with-cluster:
  stage: validate
  image: bitnami/kubectl:latest
  script:
    - kubectl apply --dry-run=client --validate=false -f infra/k8s/
```

Attention :

```text
kubectl peut avoir besoin d'un kubeconfig ou d'un cluster.
Pour une CI sans cluster, kubeconform est souvent plus simple.
```

### Exemple complet GitLab CI general

```yaml
stages:
  - test
  - build
  - security
  - validate

test-backend:
  stage: test
  image: node:22-alpine
  script:
    - cd app/backend
    - npm ci
    - npm test

test-frontend:
  stage: test
  image: alpine:3.20
  script:
    - test -f app/frontend/index.html
    - test -f app/frontend/app.js
    - test -f app/frontend/nginx.conf

build-backend:
  stage: build
  image: docker:27
  services:
    - docker:27-dind
  variables:
    DOCKER_TLS_CERTDIR: "/certs"
    BACKEND_IMAGE: "$CI_REGISTRY_IMAGE/backend:$CI_COMMIT_SHORT_SHA"
  script:
    - docker build -t "$BACKEND_IMAGE" app/backend

security-scan:
  stage: security
  image:
    name: aquasec/trivy:latest
    entrypoint: [""]
  script:
    - trivy fs --severity HIGH,CRITICAL --exit-code 1 .

validate-kubernetes:
  stage: validate
  image: alpine:3.20
  script:
    - apk add --no-cache curl tar
    - curl -sSL https://github.com/yannh/kubeconform/releases/download/v0.6.7/kubeconform-linux-amd64.tar.gz -o kubeconform.tar.gz
    - tar -xzf kubeconform.tar.gz kubeconform
    - chmod +x kubeconform
    - ./kubeconform -summary -ignore-missing-schemas infra/k8s/*.yaml
```

### Exemple complet GitHub Actions general

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
        working-directory: app/backend
      - run: npm test
        working-directory: app/backend

  build-backend:
    runs-on: ubuntu-latest
    needs: test-backend
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t backend:test app/backend

  security-scan:
    runs-on: ubuntu-latest
    needs: build-backend
    steps:
      - uses: actions/checkout@v4
      - uses: aquasecurity/trivy-action@master
        with:
          scan-type: fs
          scan-ref: .
          severity: HIGH,CRITICAL
          exit-code: "1"

  validate-kubernetes:
    runs-on: ubuntu-latest
    needs: security-scan
    steps:
      - uses: actions/checkout@v4
      - run: |
          curl -sSL https://github.com/yannh/kubeconform/releases/download/v0.6.7/kubeconform-linux-amd64.tar.gz -o kubeconform.tar.gz
          tar -xzf kubeconform.tar.gz kubeconform
          chmod +x kubeconform
          ./kubeconform -summary -ignore-missing-schemas infra/k8s/*.yaml
```

### Resume pratique par stage

| Stage | Question principale | Exemples de commandes |
| --- | --- | --- |
| test | Est-ce que le code fonctionne ? | `npm test`, `npm run lint` |
| build | Est-ce que l'application se construit ? | `docker build`, `npm run build` |
| security | Est-ce que le projet contient des risques ? | `trivy`, `gitleaks`, `npm audit` |
| validate | Est-ce que les configs sont valides ? | `kubeconform`, `docker compose config` |

Phrase a retenir :

```text
test verifie le code, build verifie la construction, security verifie les risques, validate verifie les configurations.
```
