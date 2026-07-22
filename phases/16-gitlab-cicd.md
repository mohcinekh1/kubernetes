# Phase 16 — CI/CD avec GitLab

## 🎯 Objectif de cette phase

Ajouter GitLab au projet en créant un pipeline `.gitlab-ci.yml` capable de tester l'application, construire les images Docker, scanner les vulnérabilités, et préparer le déploiement Kubernetes/Helm.

L'objectif n'est pas seulement d'avoir un pipeline vert : tu dois comprendre ce que fait chaque job, dans quel ordre, et quelles informations ne doivent jamais être commitées.

## 📖 Explication : pourquoi cette phase compte

GitLab CI/CD est très utilisé en entreprise parce qu'il relie directement le dépôt Git, les merge requests, les variables secrètes, le registry Docker et les pipelines automatisés.

Dans ce projet, GitLab te permet de transformer ton travail Kubernetes en workflow professionnel :

```text
push code → tests → build image → scan sécurité → push registry → préparation déploiement
```

## 🧩 Prérequis

Avant de commencer cette phase, tu dois avoir :

- Un dépôt Git initialisé
- Une application avec au moins un `Dockerfile`
- Un `docker-compose.yml` ou une structure claire `app/frontend` et `app/backend`
- Des manifests Kubernetes ou un chart Helm
- Un compte GitLab

## 📝 Étapes détaillées

### 1. Initialise Git si ce n'est pas déjà fait

```bash
git init
git add .
git commit -m "Initial project structure"
```

Crée ensuite un projet vide sur GitLab, puis connecte ton dépôt local :

```bash
git remote add origin git@gitlab.com:TON_USER/TON_PROJET.git
git branch -M main
git push -u origin main
```

> 💡 Si tu préfères HTTPS, GitLab te donnera une URL du type `https://gitlab.com/TON_USER/TON_PROJET.git`.

### 2. Crée le fichier `.gitlab-ci.yml`

À la racine du projet, crée :

```text
.gitlab-ci.yml
```

Exemple de base :

```yaml
stages:
  - test
  - build
  - security
  - package

variables:
  DOCKER_IMAGE_BACKEND: "$CI_REGISTRY_IMAGE/backend:$CI_COMMIT_SHORT_SHA"

test-backend:
  stage: test
  image: node:20-alpine
  script:
    - cd app/backend
    - npm ci
    - npm test
  rules:
    - exists:
        - app/backend/package.json

build-backend-image:
  stage: build
  image: docker:27
  services:
    - docker:27-dind
  script:
    - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" "$CI_REGISTRY"
    - docker build -t "$DOCKER_IMAGE_BACKEND" ./app/backend
    - docker push "$DOCKER_IMAGE_BACKEND"
  rules:
    - exists:
        - app/backend/Dockerfile

scan-backend-image:
  stage: security
  image:
    name: aquasec/trivy:latest
    entrypoint: [""]
  script:
    - trivy image --exit-code 1 --severity HIGH,CRITICAL "$DOCKER_IMAGE_BACKEND"
  needs:
    - build-backend-image
  rules:
    - exists:
        - app/backend/Dockerfile

lint-helm:
  stage: package
  image:
    name: alpine/helm:latest
    entrypoint: [""]
  script:
    - helm lint helm/mon-app
    - helm template mon-app helm/mon-app
  rules:
    - exists:
        - helm/mon-app/Chart.yaml
```

Adapte les chemins `app/backend`, `helm/mon-app` et les commandes de test selon ton application réelle.

### 3. Comprends les variables GitLab automatiques

GitLab fournit déjà plusieurs variables utiles :

| Variable | Rôle |
|---|---|
| `CI_REGISTRY` | Adresse du registry GitLab |
| `CI_REGISTRY_IMAGE` | Chemin de l'image Docker liée au projet |
| `CI_REGISTRY_USER` | Utilisateur technique pour pousser l'image |
| `CI_REGISTRY_PASSWORD` | Mot de passe/token technique |
| `CI_COMMIT_SHORT_SHA` | Identifiant court du commit |

Grâce à ça, tu peux taguer chaque image avec le commit exact qui l'a produite.

### 4. Ajoute tes secrets dans GitLab

Dans GitLab :

```text
Project → Settings → CI/CD → Variables
```

Ajoute uniquement ce dont tu as besoin :

- `SNYK_TOKEN` si tu utilises Snyk
- `AWS_ACCESS_KEY_ID` et `AWS_SECRET_ACCESS_KEY` si tu testes Terraform
- `KUBE_CONFIG` seulement si tu fais un déploiement direct vers un cluster de test

> ⚠️ Pour un vrai workflow GitOps avec ArgoCD, évite de donner au pipeline un accès direct au cluster de production. Le pipeline doit plutôt mettre à jour Git, et ArgoCD synchronise le cluster.

### 5. Ajoute un scan Snyk si tu veux compléter la Phase 15

Exemple pour un backend Node.js :

```yaml
snyk-backend:
  stage: security
  image: node:20-alpine
  script:
    - cd app/backend
    - npm ci
    - npm install -g snyk
    - snyk test --severity-threshold=high
  variables:
    SNYK_TOKEN: "$SNYK_TOKEN"
  rules:
    - exists:
        - app/backend/package.json
```

### 6. Teste avec une Merge Request

Crée une branche :

```bash
git checkout -b test/gitlab-ci
git add .gitlab-ci.yml
git commit -m "Phase 16: ajout pipeline GitLab CI"
git push -u origin test/gitlab-ci
```

Ouvre une **Merge Request** sur GitLab et observe :

- Les jobs qui démarrent
- Les logs de chaque job
- Les erreurs de chemins ou de dépendances
- Le statut final du pipeline

### 7. Corrige progressivement

Ne cherche pas à écrire le pipeline parfait du premier coup. Corrige dans cet ordre :

1. Les chemins de dossiers (`app/backend`, `app/frontend`, `helm/mon-app`)
2. Les commandes de test
3. Le build Docker
4. Le push vers le registry
5. Les scans sécurité
6. Le packaging Helm

## ⚠️ Erreurs fréquentes à éviter

- Créer `.gitlab-ci.yaml` au lieu de `.gitlab-ci.yml`
- Mettre des secrets directement dans le fichier pipeline
- Oublier que les jobs s'exécutent dans des conteneurs propres, sans tes fichiers locaux non commités
- Utiliser `latest` comme seul tag d'image, sans tag basé sur le commit
- Faire un `kubectl apply` direct vers la production alors que tu as déjà ArgoCD pour faire du GitOps
- Copier un pipeline GitHub Actions dans GitLab sans l'adapter : la syntaxe est différente

## ✅ Checklist de validation — fin du projet GitLab

- [ ] Le projet existe sur GitLab
- [ ] `.gitlab-ci.yml` est présent à la racine du dépôt
- [ ] Un pipeline démarre automatiquement après un push
- [ ] Les tests applicatifs s'exécutent dans GitLab
- [ ] Une image Docker est construite et poussée dans le GitLab Container Registry
- [ ] Trivy ou Snyk bloque le pipeline en cas de vulnérabilité `HIGH`/`CRITICAL`
- [ ] Le chart Helm est validé avec `helm lint` ou `helm template`
- [ ] Tu sais expliquer la différence entre GitLab CI/CD et GitHub Actions

## 📚 Concepts à lire si besoin

- `concepts/10-gitlab-cicd.md`
- `concepts/08-gitops-argocd.md`
- `concepts/09-devsecops-scanning.md`

## 🎉 Fin du parcours complet

Avec cette phase, ton projet couvre maintenant Kubernetes, Helm, AWS, Terraform, Ansible, ArgoCD, DevSecOps et GitLab CI/CD. C'est une base très solide pour un portfolio DevOps junior/intermédiaire, à condition de documenter les choix techniques et de garder un historique Git propre.
