# Pilier 04 - Continuous Delivery et Continuous Deployment CD

## Objectif du cours

Le **CD** vient apres la CI.

La CI repond a la question :

```text
Est-ce que le code est valide ?
```

Le CD repond a la question :

```text
Comment livrer ou deployer ce code proprement ?
```

Il existe deux notions importantes :

```text
Continuous Delivery
Continuous Deployment
```

Phrase simple :

```text
La CI verifie. Le CD livre ou deploie.
```

## Plan du cours

```text
PARTIE 1 - Comprendre le CD
PARTIE 2 - Continuous Delivery vs Continuous Deployment
PARTIE 3 - Role du CD dans DevOps
PARTIE 4 - Environnements de deploiement
PARTIE 5 - Pipeline CD
PARTIE 6 - Deploiement Docker
PARTIE 7 - Deploiement Kubernetes
PARTIE 8 - Strategies de deploiement
PARTIE 9 - Rollback
PARTIE 10 - GitLab CD
PARTIE 11 - GitHub Actions CD
PARTIE 12 - Secrets et variables de deploiement
PARTIE 13 - Bonnes pratiques
PARTIE 14 - Application a notre projet
PARTIE 15 - Questions d'entretien
PARTIE 16 - Resume final
PARTIE 17 - Annexe pratique generale
```

## PARTIE 1 - Comprendre le CD

### 1. Definition

Le CD est l'automatisation de la livraison ou du deploiement d'une application.

Il permet de passer de :

```text
code valide
```

a :

```text
application disponible dans un environnement
```

Exemples d'environnements :

```text
dev
test
staging
production
```

### 2. Probleme sans CD

Sans CD :

```text
deploiement manuel
risque d'erreur humaine
difference entre environnements
procedure non documentee
rollback difficile
livraison lente
```

### 3. Avec CD

Avec CD :

```text
deploiement automatise
procedure reproductible
historique clair
rollback possible
moins d'erreurs
livraison plus rapide
```

### 4. Exemple simple

Workflow :

```text
push code
-> CI lance tests
-> CI build image Docker
-> image poussee dans registry
-> CD deploie sur Kubernetes
-> verification du rollout
```

## PARTIE 2 - Continuous Delivery vs Continuous Deployment

### 5. Continuous Delivery

Continuous Delivery veut dire :

```text
le code est toujours pret a etre deploye, mais le deploiement final peut etre manuel
```

Exemple :

```text
CI passed
image Docker creee
manifest prepare
bouton manuel pour deployer en production
```

Phrase simple :

```text
Delivery = pret a deployer avec validation humaine.
```

### 6. Continuous Deployment

Continuous Deployment veut dire :

```text
chaque changement valide est deploye automatiquement
```

Exemple :

```text
merge dans main
-> tests passed
-> build image
-> deploy automatique en production
```

Phrase simple :

```text
Deployment = deployer automatiquement apres validation.
```

### 7. Difference

| Notion | Validation finale | Deploiement production |
| --- | --- | --- |
| Continuous Delivery | Manuelle | Apres approbation |
| Continuous Deployment | Automatique | Automatique |

### 8. Quelle approche choisir

Pour apprendre :

```text
commencer par Continuous Delivery
```

Pour production sensible :

```text
Delivery avec approbation manuelle
```

Pour produit mature avec tests solides :

```text
Deployment automatique possible
```

## PARTIE 3 - Role du CD dans DevOps

### 9. Lien avec le cycle DevOps

| Etape DevOps | Role du CD |
| --- | --- |
| Release | Preparer une version livrable |
| Deploy | Deployer automatiquement |
| Operate | Verifier que l'application tourne |
| Monitor | Observer apres deploiement |
| Feedback | Corriger et redeployer |

### 10. Question principale du CD

```text
Comment livrer une version fiable, reproductible et reversible ?
```

### 11. CD et qualite

Un bon CD doit permettre :

```text
deployer la bonne version
deployer dans le bon environnement
verifier le resultat
annuler si probleme
garder l'historique
```

## PARTIE 4 - Environnements de deploiement

### 12. Dev

Environnement de developpement.

Role :

```text
tester rapidement les changements
```

### 13. Test

Environnement pour QA ou tests automatises.

Role :

```text
verifier les fonctionnalites
```

### 14. Staging

Staging ressemble a production.

Role :

```text
faire une derniere validation avant production
```

### 15. Production

Production est l'environnement utilise par les vrais utilisateurs.

Role :

```text
servir l'application reelle
```

### 16. Regle importante

```text
On ne teste pas pour la premiere fois en production.
```

## PARTIE 5 - Pipeline CD

### 17. Pipeline CI/CD complet

```text
test
-> build
-> security
-> validate
-> package
-> deploy-dev
-> deploy-staging
-> deploy-prod
```

### 18. Stages CD courants

```text
package
publish
deploy
smoke-test
rollback
```

### 19. Job deploy

Un job deploy execute les commandes pour mettre a jour un environnement.

Exemple :

```yaml
deploy-dev:
  stage: deploy
  script:
    - echo "Deploy to dev"
```

### 20. Smoke test

Un smoke test est un test rapide apres deploiement.

Exemple :

```text
verifier /health
verifier page frontend
verifier API principale
```

Commande :

```powershell
curl http://k8s-lab.local/api/tasks
```

## PARTIE 6 - Deploiement Docker

### 21. Deployer avec Docker Compose

Commande :

```powershell
docker compose up -d --build
```

Role :

```text
construire et lancer les services en arriere-plan
```

### 22. Redemarrer un service

Commande :

```powershell
docker compose restart backend
```

Role :

```text
redemarrer seulement le service backend
```

### 23. Verifier

Commandes :

```powershell
docker compose ps
docker compose logs backend
curl http://localhost:5001/health
```

Role :

```text
verifier les conteneurs, logs et endpoint health
```

## PARTIE 7 - Deploiement Kubernetes

### 24. Deployer les manifests

Commande :

```powershell
kubectl apply -f infra/k8s/
```

Role :

```text
appliquer les fichiers Kubernetes dans le cluster
```

### 25. Verifier les pods

Commande :

```powershell
kubectl get pods -n k8s-lab
```

Role :

```text
voir si les pods sont Running et Ready
```

### 26. Verifier le rollout

Commande :

```powershell
kubectl rollout status deployment/frontend -n k8s-lab
```

Role :

```text
attendre que le nouveau deploiement soit termine correctement
```

### 27. Redemarrer un deployment

Commande :

```powershell
kubectl rollout restart deployment/frontend -n k8s-lab
```

Role :

```text
forcer Kubernetes a recreer les pods du frontend
```

### 28. Modifier une image

Commande :

```powershell
kubectl set image deployment/frontend frontend=k8s-migration-project-frontend:nginx-proxy-v1 -n k8s-lab
```

Role :

```text
changer l'image utilisee par le container frontend
```

## PARTIE 8 - Strategies de deploiement

### 29. Rolling Update

Rolling Update remplace les pods progressivement.

Exemple :

```text
ancien pod supprime petit a petit
nouveau pod cree petit a petit
service reste disponible
```

C'est la strategie par defaut des Deployments Kubernetes.

### 30. Recreate

Recreate supprime tous les anciens pods puis cree les nouveaux.

Avantage :

```text
simple
```

Inconvenient :

```text
interruption possible
```

### 31. Blue Green

Blue Green utilise deux environnements :

```text
blue  -> version actuelle
green -> nouvelle version
```

Quand green est valide :

```text
le trafic bascule vers green
```

### 32. Canary

Canary deploie la nouvelle version pour une petite partie du trafic.

Exemple :

```text
90% version stable
10% nouvelle version
```

Si tout va bien :

```text
on augmente progressivement le trafic
```

## PARTIE 9 - Rollback

### 33. C'est quoi rollback

Rollback veut dire revenir a une version precedente.

Utilise quand :

```text
bug apres deploiement
erreur configuration
performance mauvaise
incident production
```

### 34. Rollback Kubernetes

Commande :

```powershell
kubectl rollout undo deployment/frontend -n k8s-lab
```

Role :

```text
revenir a la revision precedente du deployment frontend
```

### 35. Voir historique

Commande :

```powershell
kubectl rollout history deployment/frontend -n k8s-lab
```

Role :

```text
voir les revisions disponibles pour rollback
```

### 36. Rollback vers revision precise

Commande :

```powershell
kubectl rollout undo deployment/frontend --to-revision=2 -n k8s-lab
```

Role :

```text
revenir a une revision precise
```

## PARTIE 10 - GitLab CD

### 37. Job deploy manuel

Exemple Continuous Delivery :

```yaml
deploy-staging:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl apply -f infra/k8s/
    - kubectl rollout status deployment/frontend -n k8s-lab
  when: manual
```

Role :

```text
preparer le deploiement mais demander une validation humaine
```

### 38. Job deploy automatique

Exemple Continuous Deployment :

```yaml
deploy-dev:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl apply -f infra/k8s/
    - kubectl rollout status deployment/frontend -n k8s-lab
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
```

Role :

```text
deployer automatiquement quand main change
```

### 39. Environment GitLab

Exemple :

```yaml
environment:
  name: staging
  url: http://staging.example.com
```

Role :

```text
lier le job a un environnement visible dans GitLab
```

## PARTIE 11 - GitHub Actions CD

### 40. Job deploy manuel

Dans GitHub Actions, un deploy manuel peut etre lance avec :

```yaml
on:
  workflow_dispatch:
```

Exemple :

```yaml
name: Deploy

on:
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Deploy application"
```

### 41. Deploy apres push main

```yaml
name: Deploy Dev

on:
  push:
    branches: [main]

jobs:
  deploy-dev:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Deploy to dev"
```

### 42. Environments GitHub

GitHub permet de definir des environments :

```text
dev
staging
production
```

On peut ajouter :

```text
approvals
secrets par environnement
protection rules
```

## PARTIE 12 - Secrets et variables de deploiement

### 43. Pourquoi utiliser des variables

On ne met jamais les secrets dans le repository.

Mauvais :

```yaml
KUBE_TOKEN: "secret-token"
```

Bon :

```text
GitLab CI/CD Variables
GitHub Actions Secrets
```

### 44. Exemples de secrets CD

```text
KUBE_CONFIG
DOCKER_USERNAME
DOCKER_PASSWORD
CLOUD_ACCESS_KEY
CLOUD_SECRET_KEY
DATABASE_URL
```

### 45. Kubeconfig

Pour deployer sur Kubernetes depuis CI/CD, le runner doit avoir acces au cluster.

Souvent on utilise :

```text
KUBE_CONFIG en variable secrete
```

Le job reconstruit le fichier kubeconfig pendant le pipeline.

## PARTIE 13 - Bonnes pratiques

### 46. Ne pas deployer si la CI echoue

Regle :

```text
test failed -> pas de deploy
security failed -> pas de deploy
validate failed -> pas de deploy
```

### 47. Deployer une image taggee

Eviter :

```text
latest uniquement
```

Preferer :

```text
commit SHA
version tag
release tag
```

Exemple :

```text
backend:9b8716f
frontend:v1.0.0
```

### 48. Toujours verifier apres deploy

Commandes :

```powershell
kubectl get pods -n k8s-lab
kubectl rollout status deployment/frontend -n k8s-lab
curl http://k8s-lab.local/api/tasks
```

### 49. Prevoir rollback

Avant de deployer, savoir comment revenir en arriere.

Commandes :

```powershell
kubectl rollout history deployment/frontend -n k8s-lab
kubectl rollout undo deployment/frontend -n k8s-lab
```

## PARTIE 14 - Application a notre projet

### 50. Situation actuelle

Notre projet contient deja :

```text
application frontend/backend/database
Dockerfiles
docker-compose.yml
manifests Kubernetes
Ingress
GitLab CI
```

### 51. Ce qu'on peut ajouter pour CD

Prochaine evolution possible :

```text
job deploy-dev manuel
job deploy-staging manuel
job smoke-test apres deploy
rollback documente
images taggees avec commit SHA
```

### 52. Exemple pour notre projet

```yaml
deploy-local-k8s:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl apply -f infra/k8s/
    - kubectl rollout status deployment/backend -n k8s-lab
    - kubectl rollout status deployment/frontend -n k8s-lab
  when: manual
```

Attention :

```text
Ce job fonctionne seulement si le runner a acces au cluster Kubernetes.
```

Dans GitLab SaaS, il faut configurer l'acces cluster avant de deployer.

## PARTIE 15 - Questions d'entretien

### Question 1

**C'est quoi le CD ?**

Reponse :

```text
Le CD automatise la livraison ou le deploiement d'une application apres validation par la CI.
```

### Question 2

**Difference entre Continuous Delivery et Continuous Deployment ?**

Reponse :

```text
Continuous Delivery prepare automatiquement une version deployable avec validation manuelle.
Continuous Deployment deploie automatiquement chaque changement valide.
```

### Question 3

**C'est quoi un rollback ?**

Reponse :

```text
Un rollback est un retour a une version precedente apres un probleme de deploiement.
```

### Question 4

**Pourquoi eviter latest en production ?**

Reponse :

```text
Parce que latest ne donne pas une version precise. Il vaut mieux utiliser un tag de version ou commit SHA pour garantir la tracabilite.
```

### Question 5

**C'est quoi un smoke test ?**

Reponse :

```text
Un smoke test est un test rapide apres deploiement pour verifier que les fonctions principales marchent.
```

### Question 6

**Pourquoi utiliser des approvals avant production ?**

Reponse :

```text
Pour ajouter une validation humaine avant un environnement critique.
```

## PARTIE 16 - Resume final

### A retenir

```text
CI = verifier le code
CD = livrer ou deployer le code
Continuous Delivery = pret a deployer avec validation humaine
Continuous Deployment = deployer automatiquement
Rollback = revenir en arriere
Smoke test = verification rapide apres deploy
Environment = dev, staging, production
```

### Phrase simple

```text
Le CD permet de transformer un code valide en application livree ou deployee de maniere fiable, automatique et reversible.
```

### Phrase d'entretien

```text
Le Continuous Delivery ou Deployment est essentiel en DevOps car il automatise la livraison, reduit les erreurs humaines, rend les deploiements reproductibles et permet de revenir rapidement en arriere en cas de probleme.
```

## PARTIE 17 - Annexe pratique generale

### 53. Base generale d'un pipeline CI/CD GitLab

```yaml
stages:
  - test
  - build
  - security
  - validate
  - deploy

test:
  stage: test
  image: alpine:3.20
  script:
    - echo "Run tests"

build:
  stage: build
  image: alpine:3.20
  script:
    - echo "Build application"

security:
  stage: security
  image: alpine:3.20
  script:
    - echo "Run security scan"

validate:
  stage: validate
  image: alpine:3.20
  script:
    - echo "Validate configuration"

deploy-dev:
  stage: deploy
  image: alpine:3.20
  script:
    - echo "Deploy to dev"
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'

deploy-prod:
  stage: deploy
  image: alpine:3.20
  script:
    - echo "Deploy to production"
  when: manual
```

### 54. Base generale d'un pipeline GitHub Actions CD

```yaml
name: CI-CD

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Run tests"

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - run: echo "Build application"

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment: production
    steps:
      - uses: actions/checkout@v4
      - run: echo "Deploy application"
```

### 55. Checklist CD pour n'importe quel projet

```text
[ ] La CI passe avant le deploy
[ ] L'image ou package est versionne
[ ] Les secrets ne sont pas dans Git
[ ] Le job deploy cible le bon environnement
[ ] Le deploiement est verifie apres execution
[ ] Un rollback est possible
[ ] La production a une validation manuelle si necessaire
[ ] Les logs du deploy sont visibles
```

### 56. Logs et traces a suivre dans le CD

Dans le pilier Continuous Delivery / Deployment, les logs permettent de verifier si le deploiement s'est bien passe.

Question principale :

```text
Est-ce que la bonne version est bien deployee et fonctionne correctement ?
```

### 57. Logs du job deploy

Dans GitLab :

```text
Build -> Pipelines
ouvrir le pipeline
ouvrir deploy-local-minikube
lire le job log
```

Dans GitHub Actions :

```text
Actions
ouvrir workflow Deploy
ouvrir job deploy
lire les steps
```

Ce qu'il faut chercher :

```text
kubectl apply success
rollout success
context Kubernetes correct
namespace correct
image correcte
exit code 0
```

### 58. Logs Kubernetes apres deploy

Verifier les pods :

```powershell
kubectl get pods -n k8s-lab
```

Comprendre :

```text
Running -> le pod tourne
Ready 1/1 -> le container est pret
CrashLoopBackOff -> l'application demarre puis crash
ImagePullBackOff -> Kubernetes ne trouve pas ou ne peut pas tirer l'image
Pending -> le pod n'arrive pas a etre planifie
```

Voir les logs backend :

```powershell
kubectl logs deployment/backend -n k8s-lab
```

Voir les logs frontend :

```powershell
kubectl logs deployment/frontend -n k8s-lab
```

Voir les logs database :

```powershell
kubectl logs deployment/database -n k8s-lab
```

### 59. Logs de rollout

Verifier le rollout :

```powershell
kubectl rollout status deployment/frontend -n k8s-lab
```

Voir l'historique :

```powershell
kubectl rollout history deployment/frontend -n k8s-lab
```

Comprendre :

```text
successfully rolled out -> deploiement termine
old replicas pending termination -> Kubernetes attend la fin des anciens pods
progress deadline exceeded -> le nouveau deploiement n'arrive pas a devenir Ready
```

### 60. Events Kubernetes

Commande :

```powershell
kubectl get events -n k8s-lab --sort-by=.lastTimestamp
```

Role :

```text
voir les evenements recents du namespace
```

Erreurs importantes :

```text
FailedScheduling
FailedMount
Unhealthy
BackOff
ImagePullBackOff
FailedCreate
```

### 61. Logs Ingress

Verifier Ingress :

```powershell
kubectl get ingress -n k8s-lab
```

Tester l'acces :

```powershell
curl.exe -I http://k8s-lab.local
curl.exe http://k8s-lab.local/api/tasks
```

Comprendre :

```text
HTTP 200 -> OK
HTTP 404 -> route ou proxy incorrect
HTTP 502/503 -> service backend indisponible
Could not connect -> tunnel, hosts ou ingress-controller probleme
```

### 62. Logs du GitLab Runner local

Si le deploy local echoue, regarder le terminal ou service GitLab Runner.

Commandes utiles :

```powershell
cd C:\GitLab-Runner
.\gitlab-runner.exe status
.\gitlab-runner.exe run
```

Erreurs connues :

```text
pwsh not found -> config.toml doit utiliser shell = "powershell"
current-context is not set -> KUBECONFIG incorrect
access denied kubeconfig -> probleme de droits utilisateur
runner stuck -> tag du job different du tag runner
```

### 63. Methode de diagnostic CD

Quand un deploy echoue :

```text
1. Lire le job deploy dans GitLab/GitHub
2. Identifier la commande qui echoue
3. Verifier le contexte Kubernetes
4. Verifier les pods
5. Lire les logs de l'application
6. Lire les events Kubernetes
7. Tester l'URL ou l'API
8. Corriger
9. Relancer deploy
10. Faire rollback si necessaire
```

### 64. Phrase a retenir

```text
Dans le CD, les logs permettent de confirmer que le deploiement est termine, que les pods sont Ready et que l'application repond apres livraison.
```

## Sources officielles

- GitLab Environments and Deployments: https://docs.gitlab.com/ci/environments/
- GitHub Actions Deployment: https://docs.github.com/actions/deployment
- Kubernetes Deployments: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
- Docker Compose: https://docs.docker.com/compose/
