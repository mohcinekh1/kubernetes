# Kubernetes Migration Lab

Projet pratique pour apprendre la migration d'une application conteneurisee vers Kubernetes.

L'objectif est de partir d'une application simple lancee avec Docker Compose, puis de la deployer dans Kubernetes avec Minikube en ajoutant progressivement les objets Kubernetes essentiels.

## Architecture

```text
navigateur
-> frontend-service
-> Pod frontend / Nginx
-> backend-service
-> Pod backend Node.js
-> database-service
-> Pod PostgreSQL
```

Services de l'application :

- `frontend` : interface web servie par Nginx
- `backend` : API Node.js / Express
- `database` : PostgreSQL

## Structure du projet

```text
app/
  backend/        API Node.js
  frontend/       interface web + configuration Nginx

infra/
  k8s/            manifests Kubernetes

docker-compose.yml
GUIDE-LANCEMENT.md
README.md
```

## Lancement avec Docker Compose

Creer un fichier `.env` local a partir de l'exemple :

```powershell
Copy-Item .env.example .env
```

Puis remplacer la valeur `REPLACE_WITH_LOCAL_DB_PASSWORD` par un mot de passe local.

```powershell
docker compose up --build -d
```

Verifier les conteneurs :

```powershell
docker compose ps
```

Tester le backend :

```powershell
curl.exe http://localhost:5001/health
curl.exe http://localhost:5001/api/tasks
```

Ouvrir le frontend Docker :

```text
http://localhost:3001
```

## Lancement Kubernetes avec Minikube

Demarrer Minikube :

```powershell
minikube start
minikube update-context
kubectl get nodes
```

Charger les images locales dans Minikube :

```powershell
minikube image load k8s-migration-project-backend:latest
minikube image load k8s-migration-project-frontend:latest
```

Appliquer les manifests Kubernetes :

Avant d'appliquer Kubernetes, creer le Secret local depuis l'exemple :

```powershell
Copy-Item infra/k8s/database-secret.example.yaml infra/k8s/database-secret.yaml
```

Puis remplacer `REPLACE_WITH_LOCAL_DB_PASSWORD` dans `infra/k8s/database-secret.yaml`.

Ensuite :

```powershell
kubectl apply -f infra/k8s/
```

Verifier les Pods :

```powershell
kubectl get pods -n k8s-lab
```

Ouvrir le frontend Kubernetes :

```powershell
minikube service frontend-service -n k8s-lab
```

## Objets Kubernetes utilises

- `Namespace` : isole le projet dans `k8s-lab`
- `Deployment` : cree et maintient les Pods
- `Service` : donne une adresse stable aux Pods
- `ConfigMap` : stocke la configuration non sensible
- `Secret` : stocke les valeurs sensibles
- `PersistentVolumeClaim` : garde les donnees PostgreSQL
- `livenessProbe` : verifie si le conteneur est vivant
- `readinessProbe` : verifie si le Pod est pret
- `resources` : definit CPU/memoire demandes et limites

## Commandes utiles

Voir toutes les ressources Kubernetes du projet :

```powershell
kubectl get all -n k8s-lab
```

Voir les logs backend :

```powershell
kubectl logs deployment/backend -n k8s-lab
```

Suivre un rollout :

```powershell
kubectl rollout status deployment/backend -n k8s-lab
```

Voir l'historique :

```powershell
kubectl rollout history deployment/backend -n k8s-lab
```

Arreter Docker Compose :

```powershell
docker compose down
```

Arreter Minikube :

```powershell
minikube stop
```
test test 