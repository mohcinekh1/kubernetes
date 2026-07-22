# Guide de lancement du projet

Ce fichier sert a relancer le projet apres avoir arrete le PC.

Le projet utilise deux environnements differents :

- Docker Compose : lance l'application en conteneurs Docker classiques.
- Minikube : lance le cluster Kubernetes local pour les phases Kubernetes.

## 1. Ouvrir PowerShell dans le projet

```powershell
cd C:\Users\user\Desktop\k8s-migration-project
```

## 2. Relancer l'application avec Docker Compose

Avant le premier lancement, verifie que le fichier `.env` existe a la racine.

S'il n'existe pas :

```powershell
Copy-Item .env.example .env
```

Puis remplace `REPLACE_WITH_LOCAL_DB_PASSWORD` par ton mot de passe local.

Cette commande relance les 3 services de l'application :

- frontend
- backend
- database PostgreSQL

```powershell
docker compose up -d
```

Si tu as modifie le code ou les Dockerfile, utilise plutot :

```powershell
docker compose up --build -d
```

## 3. Verifier les conteneurs Docker

```powershell
docker compose ps
```

Tu dois voir les services `frontend`, `backend` et `database` en etat running.

## 4. Tester l'application Docker

Tester le backend :

```powershell
curl http://localhost:5001/health
```

Tester les donnees :

```powershell
curl http://localhost:5001/api/tasks
```

Ouvrir le frontend dans le navigateur :

```text
http://localhost:3001
```

## 5. Relancer Kubernetes avec Minikube

Docker Compose ne relance pas Kubernetes. Apres un redemarrage du PC, il faut verifier Minikube :

```powershell
minikube status
```

Si Minikube est arrete, lance :

```powershell
minikube start
```

Puis mets a jour le contexte Kubernetes :

```powershell
minikube update-context
```

## 6. Verifier Kubernetes

```powershell
kubectl get nodes
```

Le resultat attendu :

```text
NAME       STATUS   ROLES           VERSION
minikube   Ready    control-plane   v1.35.1
```

Verifier les namespaces :

```powershell
kubectl get namespaces
```

Si le namespace `k8s-lab` existe, mets le contexte dessus :

```powershell
kubectl config set-context --current --namespace=k8s-lab
```

Puis verifier :

```powershell
kubectl config view --minify
```

## 7. Commandes utiles si probleme

Voir les logs Docker :

```powershell
docker compose logs
```

Voir les logs d'un service precis :

```powershell
docker compose logs backend
docker compose logs frontend
docker compose logs database
```

Arreter l'application Docker :

```powershell
docker compose down
```

Arreter Minikube :

```powershell
minikube stop
```

## Resume rapide

Commande normale apres redemarrage :

```powershell
cd C:\Users\user\Desktop\k8s-migration-project
docker compose up -d
minikube start
minikube update-context
kubectl get nodes
```
