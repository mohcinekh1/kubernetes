# Phase 1 — Préparer l'application pour Kubernetes

## 🎯 Objectif de cette phase

Analyser ton `docker-compose.yml` existant et le "traduire mentalement" en concepts Kubernetes, AVANT d'écrire le moindre fichier YAML Kubernetes. Cette phase est surtout de la réflexion et de la planification.

## 📖 Explication : pourquoi cette phase compte

Un piège classique : ouvrir directement un tutoriel et copier des manifests Kubernetes sans comprendre le lien avec ton app. Ici, tu vas faire l'exercice inverse — partir de ce que tu connais déjà (Docker Compose) et faire le pont vers Kubernetes.

## 🔄 Table de correspondance Docker Compose → Kubernetes

| Docker Compose | Équivalent Kubernetes | Explication |
|---|---|---|
| `services:` (un service) | **Deployment** + **Pod** | Un Deployment gère un ou plusieurs Pods (instances de ton conteneur) |
| `ports:` | **Service** (type ClusterIP/NodePort) | Expose ton Pod à l'intérieur ou l'extérieur du cluster |
| `environment:` | **ConfigMap** (données non sensibles) ou **Secret** (mots de passe/clés) | Kubernetes sépare config normale et données sensibles |
| `volumes:` | **PersistentVolume** + **PersistentVolumeClaim** | Stockage qui survit même si le Pod redémarre |
| `depends_on:` | Pas d'équivalent direct — géré différemment (readiness probes) | Kubernetes ne gère pas nativement "l'ordre de démarrage" comme Compose |
| `networks:` | Géré automatiquement — tous les Pods d'un même Namespace se voient par défaut | Kubernetes a son propre système de réseau interne (DNS interne) |
| `docker-compose.yml` (un seul fichier) | Plusieurs fichiers `.yaml` (un par ressource, ou regroupés) | Kubernetes préfère des manifests séparés et explicites |
| `scale: 3` | `replicas: 3` dans le Deployment | Le concept de scaling existe aussi, mais en plus puissant (HPA — voir Phase 7) |

## 📝 Étapes détaillées

### 1. Liste tous tes services actuels
Ouvre ton `docker-compose.yml` et note, pour chaque service :
- Son nom
- L'image utilisée (ou le chemin du Dockerfile)
- Les ports exposés
- Les variables d'environnement (et lesquelles sont sensibles : mots de passe, clés API...)
- Les volumes utilisés
- Les dépendances (`depends_on`)

**Exemple de tableau à remplir toi-même :**

| Service | Image/Build | Port | Env sensibles ? | Volume | Dépend de |
|---|---|---|---|---|---|
| frontend | build ./app/frontend | 3000 | non | non | backend |
| backend | build ./app/backend | 5000 | oui (DB_PASSWORD) | non | database |
| database | postgres:16 | 5432 | oui (POSTGRES_PASSWORD) | oui (data) | - |

### 2. Identifie ce qui doit être "stateless" vs "stateful"

C'est un concept important en Kubernetes :
- **Stateless** (sans état) : ton frontend, ton backend — ils peuvent être détruits et recréés sans perte de données. Ce sont de bons candidats pour un `Deployment` classique avec plusieurs répliques.
- **Stateful** (avec état) : ta base de données — elle a besoin que ses données persistent. Nécessite un `PersistentVolume` (et parfois un `StatefulSet` au lieu d'un `Deployment`, concept plus avancé qu'on gardera simple pour ce projet).

### 3. Décide de ta structure de dossiers Kubernetes

Crée dans ton projet :
```
mon-projet/
├── docker-compose.yml       (existant, garde-le comme référence)
├── app/
│   ├── frontend/
│   └── backend/
└── infra/
    └── k8s/                 ← dossier pour les manifests Kubernetes
        ├── frontend-deployment.yaml
        ├── frontend-service.yaml
        ├── backend-deployment.yaml
        ├── backend-service.yaml
        ├── database-deployment.yaml
        ├── database-service.yaml
        ├── configmap.yaml
        └── secret.yaml
```

## ✅ Checklist de validation avant de passer à la Phase 2

- [ ] Tu as rempli le tableau de correspondance pour CHAQUE service de ton app
- [ ] Tu as identifié quels services sont stateless et lequel(s) sont stateful
- [ ] Tu as identifié quelles variables d'environnement sont sensibles (→ Secret) vs non sensibles (→ ConfigMap)
- [ ] Le dossier `infra/k8s/` est créé dans ton projet

## 📚 Concepts à lire si besoin

- `concepts/01-kubernetes-fondamentaux.md` — Pods, Deployments, Services expliqués simplement
- `concepts/02-docker-vs-kubernetes.md`

## ➡️ Étape suivante

Passe à `phases/02-dockeriser.md`
