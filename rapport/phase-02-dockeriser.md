# Rapport Phase 2 — Dockeriser proprement chaque service

## Objectif de la phase

Transformer l'application en services conteneurisés.

Dans cette phase, on a préparé :

- une image Docker pour le backend
- une image Docker pour le frontend
- un service PostgreSQL avec l'image officielle `postgres:16-alpine`
- un fichier `docker-compose.yml` pour lancer les trois services ensemble

## Architecture conteneurisée

```text
localhost:3001 -> k8s_lab_frontend -> k8s_lab_backend -> k8s_lab_database
```

Services Docker Compose :

| Service | Conteneur | Image | Port machine | Port conteneur |
|---|---|---|---:|---:|
| frontend | `k8s_lab_frontend` | `k8s-migration-project-frontend` | 3001 | 80 |
| backend | `k8s_lab_backend` | `k8s-migration-project-backend` | 5001 | 5000 |
| database | `k8s_lab_database` | `postgres:16-alpine` | 5433 | 5432 |

## Concepts fondamentaux

### Image Docker

Une image Docker est un modèle immuable qui contient l'application, ses dépendances et la commande de démarrage.

Exemple :

```text
k8s-migration-project-backend:latest
```

### Conteneur Docker

Un conteneur est une image en cours d'exécution.

Exemple :

```text
k8s_lab_backend
```

Formule simple :

```text
Image = modèle
Conteneur = instance lancée de ce modèle
```

### Dockerfile

Un `Dockerfile` décrit comment construire une image.

Backend :

```text
app/backend/Dockerfile
```

Frontend :

```text
app/frontend/Dockerfile
```

### Docker Compose

Docker Compose permet de lancer plusieurs conteneurs avec un seul fichier.

Dans ce projet :

```text
docker-compose.yml
```

lance :

- PostgreSQL
- Backend Node.js
- Frontend Nginx

### Réseau Docker Compose

Tous les services sont placés sur le même réseau :

```text
k8s_lab_network
```

Grâce à ce réseau, le backend peut joindre PostgreSQL avec le nom :

```text
database:5432
```

Il n'a pas besoin d'utiliser `localhost`.

## Fichiers créés

```text
app/backend/Dockerfile
app/frontend/Dockerfile
docker-compose.yml
```

## Commandes pratiques

### Construire et lancer en mode attaché

```powershell
docker compose up --build
```

Rôle :

- construit les images backend et frontend
- crée le réseau Docker
- crée le volume PostgreSQL
- lance les trois conteneurs
- affiche les logs dans le terminal

### Lancer en arrière-plan

```powershell
docker compose up -d
```

Rôle :

Lance les conteneurs sans bloquer le terminal.

### Reconstruire après modification du code

```powershell
docker compose up --build -d
```

Rôle :

Reconstruit les images puis lance les conteneurs en arrière-plan.

### Voir les conteneurs Compose

```powershell
docker compose ps
```

Rôle :

Vérifie que les services sont en cours d'exécution.

### Voir les logs

```powershell
docker compose logs
```

Suivre les logs en direct :

```powershell
docker compose logs -f
```

### Arrêter l'application

```powershell
docker compose down
```

Rôle :

Arrête et supprime les conteneurs créés par Compose. Le volume PostgreSQL peut rester présent pour garder les données.

## Problème rencontré et résolution

### Problème 1 — Mauvais emplacement du fichier Compose

Erreur :

```text
path ".../app/app/frontend" not found
```

Cause :

`docker-compose.yml` était dans le dossier `app/`, mais les chemins `context: ./app/frontend` et `context: ./app/backend` supposent que le fichier est lancé depuis la racine du projet.

Correction :

Déplacer `docker-compose.yml` à la racine :

```text
k8s-migration-project/docker-compose.yml
```

### Problème 2 — Conflit de nom de conteneur

Erreur :

```text
Conflict. The container name "/k8s_lab_database" is already in use
```

Cause :

Un ancien conteneur PostgreSQL avait été lancé manuellement avec :

```powershell
docker run --name k8s_lab_database ...
```

Correction :

```powershell
docker stop k8s_lab_database
docker rm k8s_lab_database
docker compose up --build
```

## Résultat validé

Docker Compose a construit les images et créé les conteneurs :

```text
k8s_lab_frontend
k8s_lab_backend
k8s_lab_database
```

Logs importants :

```text
Backend API listening on port 5000
database system is ready to accept connections
```

Tests attendus :

```powershell
curl http://localhost:5001/health
curl http://localhost:5001/api/tasks
```

Frontend :

```text
http://localhost:3001
```

## Checklist Phase 2

```text
[x] app/backend/Dockerfile créé
[x] app/frontend/Dockerfile créé
[x] docker-compose.yml créé à la racine du projet
[x] Images backend et frontend construites
[x] Conteneurs frontend/backend/database créés
[x] PostgreSQL prêt à accepter les connexions
[x] Backend lancé sur le port conteneur 5000
[x] Application vérifiée par l'utilisateur
```

## Questions d'entretien

### C'est quoi une image Docker ?

Une image Docker est un paquet immuable qui contient l'application, ses dépendances et sa commande de démarrage.

### C'est quoi un conteneur ?

Un conteneur est une instance en cours d'exécution d'une image Docker.

### À quoi sert Docker Compose ?

Docker Compose permet de définir et lancer plusieurs conteneurs ensemble avec un fichier YAML.

### Pourquoi le backend utilise `database` au lieu de `localhost` ?

Dans Docker Compose, chaque service a un nom DNS interne. Le backend utilise donc `database:5432` pour joindre PostgreSQL sur le réseau Compose. `localhost` représenterait le conteneur backend lui-même, pas le conteneur database.

### Pourquoi utiliser `docker compose up --build -d` ?

`--build` reconstruit les images après une modification de code. `-d` lance les conteneurs en arrière-plan sans bloquer le terminal.

## Résumé oral court

Dans cette phase, j'ai dockerisé l'application en créant un Dockerfile pour le backend Node.js et un Dockerfile pour le frontend servi par Nginx. J'ai ensuite créé un `docker-compose.yml` pour lancer le frontend, le backend et PostgreSQL sur un même réseau Docker. Le backend communique avec la base via le nom de service `database`, ce qui prépare la logique réseau qu'on retrouvera ensuite dans Kubernetes.

