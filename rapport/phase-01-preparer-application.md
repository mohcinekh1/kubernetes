# Rapport Phase 1 — Préparer l'application pour Kubernetes

## Objectif de la phase

Préparer une application simple à migrer vers Kubernetes.

On ne commence pas directement par Kubernetes. Avant d'écrire des manifests YAML, il faut comprendre :

- quels services composent l'application
- quels ports chaque service utilise
- quelles variables d'environnement sont nécessaires
- quels services sont stateless ou stateful
- comment Docker Compose sera traduit plus tard en objets Kubernetes

## Architecture choisie

Application laboratoire :

```text
frontend -> backend -> database
```

Le frontend appelle le backend. Le backend communique avec PostgreSQL.

## Services prévus

| Service | Dossier/Image | Port conteneur | Port machine | Type | Dépend de |
|---|---|---:|---:|---|---|
| frontend | `app/frontend` | 3000 | 3001 | stateless | backend |
| backend | `app/backend` | 5000 | 5001 | stateless | database |
| database | `postgres:16-alpine` | 5432 | 5433 | stateful | - |

## Données Docker prévues

| Élément | Valeur |
|---|---|
| Nom projet Compose | `k8s_lab` |
| Réseau Docker | `k8s_lab_network` |
| Conteneur frontend | `k8s_lab_frontend` |
| Conteneur backend | `k8s_lab_backend` |
| Conteneur database | `k8s_lab_database` |

## Variables d'environnement du backend

| Variable | Valeur | Type Kubernetes futur |
|---|---|---|
| `DB_HOST` | `database` | ConfigMap |
| `DB_PORT` | `5432` | ConfigMap |
| `DB_NAME` | `k8s_lab_db` | ConfigMap |
| `DB_USER` | `k8s_lab_user` | ConfigMap |
| `DB_PASSWORD` | valeur locale dans `.env` | Secret |

## Concepts fondamentaux

### Service applicatif

Un service applicatif est une partie indépendante de l'application.

Dans notre projet :

- le frontend affiche l'interface
- le backend expose une API
- la database stocke les données

Cette séparation est importante parce que Kubernetes déploie et gère chaque partie séparément.

### Stateless

Un service stateless ne garde pas de données importantes dans son conteneur.

Exemples :

- frontend
- backend

Si Kubernetes supprime puis recrée un backend, ce n'est pas grave, car les données sont dans la base de données.

### Stateful

Un service stateful garde des données importantes.

Exemple :

- database PostgreSQL

Si on supprime la base sans volume persistant, on perd les données. C'est pour ça qu'on utilisera plus tard un volume Kubernetes.

### Port conteneur vs port machine

Le port conteneur est le port utilisé à l'intérieur du conteneur.

Le port machine est le port exposé sur Windows pour accéder au service depuis le navigateur ou un outil local.

Exemple :

```text
localhost:5433 -> conteneur PostgreSQL:5432
```

PostgreSQL garde son port standard `5432` dans le conteneur, mais on expose `5433` sur la machine pour éviter les conflits avec d'autres projets.

## Correspondance Docker Compose vers Kubernetes

| Docker Compose | Kubernetes |
|---|---|
| `services:` | Deployment + Pod |
| `ports:` | Service / Ingress |
| `environment:` | ConfigMap + Secret |
| `volumes:` | PersistentVolume + PersistentVolumeClaim |
| `depends_on:` | Readiness probes / logique de retry |
| `networks:` | DNS interne Kubernetes |

## Checklist Phase 1

```text
[x] Structure app/frontend créée
[x] Structure app/backend créée
[x] Structure infra/k8s créée
[x] Services de l'application définis
[x] Ports choisis sans conflit avec Docker existant
[x] Variables d'environnement identifiées
[x] Stateless/stateful identifié
[x] Backend codé
[x] Frontend codé
[x] docker-compose.yml créé
[x] Application testée localement avec PostgreSQL dans Docker, backend Node.js et frontend statique
```

## Test local réalisé

PostgreSQL a été lancé dans Docker :

```powershell
docker run --name k8s_lab_database `
  -e POSTGRES_DB=k8s_lab_db `
  -e POSTGRES_USER=k8s_lab_user `
  -e POSTGRES_PASSWORD=<mot_de_passe_local> `
  -p 5433:5432 `
  -d postgres:16-alpine
```

Backend lancé localement :

```powershell
cd app/backend
npm install
npm start
```

Frontend lancé localement :

```powershell
cd app/frontend
python -m http.server 3001
```

URLs de test :

```text
Frontend : http://localhost:3001
Backend healthcheck : http://localhost:5001/health
Backend tasks : http://localhost:5001/api/tasks
```

Résultat validé :

```text
Frontend HTTP 200 OK
Backend /health -> status ok
Backend /api/tasks -> 3 tâches récupérées depuis PostgreSQL
```

## Questions d'entretien

### Pourquoi préparer l'application avant Kubernetes ?

Parce qu'il faut comprendre les services, les ports, les variables et les dépendances avant de les traduire en objets Kubernetes.

### Quelle est la différence entre stateless et stateful ?

Un service stateless peut être supprimé et recréé sans perte de données. Un service stateful contient des données importantes et nécessite un stockage persistant.

### Pourquoi éviter d'exposer PostgreSQL sur le port 5432 de la machine ?

Parce qu'un autre projet ou une installation locale peut déjà utiliser ce port. On garde `5432` dans le conteneur, mais on expose `5433` côté machine pour éviter les conflits.

## Résumé oral court

Dans cette phase, j'ai préparé l'architecture d'une application simple composée d'un frontend, d'un backend et d'une base PostgreSQL. J'ai identifié les ports, les variables d'environnement, les dépendances entre services et les éléments stateless/stateful avant de passer à Docker et Kubernetes.
