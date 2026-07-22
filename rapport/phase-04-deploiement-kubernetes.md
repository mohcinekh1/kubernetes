# Rapport Phase 4 - Deploiement Kubernetes

## Objectif de la phase

L'objectif de cette phase est de deployer l'application dans Kubernetes avec Minikube.

Avant cette phase, l'application tournait avec Docker Compose sous forme de 3 conteneurs :

- frontend
- backend
- database PostgreSQL

Dans Kubernetes, ces conteneurs sont lances dans des Pods, mais on ne cree pas les Pods directement. On cree des Deployments, et Kubernetes cree les Pods a partir de ces Deployments.

## Concepts fondamentaux

### Pod

Un Pod est la plus petite unite lancee par Kubernetes.

Dans notre projet :

```text
Pod frontend  -> contient le conteneur frontend
Pod backend   -> contient le conteneur backend
Pod database  -> contient le conteneur PostgreSQL
```

Pour une application simple, on peut retenir :

```text
1 Pod = 1 conteneur
```

### Deployment

Un Deployment demande a Kubernetes de lancer et maintenir des Pods.

Si un Pod tombe, le Deployment demande a Kubernetes de le recreer.

Points importants dans un Deployment :

- `replicas` : nombre de Pods voulus
- `selector` : comment le Deployment reconnait ses Pods
- `template.metadata.labels` : labels donnes aux Pods
- `containers.image` : image Docker a lancer
- `containerPort` : port ecoute dans le conteneur
- `env` ou `envFrom` : variables d'environnement

### Service

Un Pod peut changer d'adresse IP quand il redemarre. Pour eviter de communiquer avec une IP instable, on utilise un Service.

Le Service donne une adresse stable :

```text
frontend -> backend-service -> Pod backend
backend  -> database-service -> Pod database
```

Le Service trouve ses Pods grace aux labels :

```yaml
selector:
  app: backend
```

Il route vers les Pods qui ont :

```yaml
labels:
  app: backend
```

### Namespace

Le namespace `k8s-lab` sert a isoler les ressources du projet.

Toutes les ressources de l'application sont rangees dans :

```text
k8s-lab
```

### ConfigMap

Un ConfigMap stocke la configuration non sensible :

```text
PORT
DB_HOST
DB_PORT
DB_NAME
```

### Secret

Un Secret stocke les informations sensibles :

```text
POSTGRES_USER
POSTGRES_PASSWORD
DB_USER
DB_PASSWORD
```

### PVC

Un PVC, PersistentVolumeClaim, demande un stockage persistant pour PostgreSQL.

Sans PVC, les donnees peuvent disparaitre si le Pod database est recrée.

## Fichiers crees

Les manifests Kubernetes sont dans :

```text
infra/k8s/
```

Fichiers de la phase :

```text
namespace.yaml              -> Namespace k8s-lab
database-secret.yaml        -> Secret avec user/password PostgreSQL
database-pvc.yaml           -> stockage persistant PostgreSQL
database-deployment.yaml    -> Deployment du Pod PostgreSQL
database-service.yaml       -> Service interne PostgreSQL
backend-configmap.yaml      -> configuration backend
backend-deployment.yaml     -> Deployment du Pod backend
backend-service.yaml        -> Service interne backend
frontend-deployment.yaml    -> Deployment du Pod frontend
frontend-service.yaml       -> Service NodePort frontend
```

## Images Docker utilisees

Les images declarees dans les Deployments sont :

```text
database  -> postgres:16-alpine
backend   -> k8s-migration-project-backend:latest
frontend  -> k8s-migration-project-frontend:latest
```

Pour backend et frontend, les images sont locales. Elles doivent etre chargees dans Minikube :

```powershell
minikube image load k8s-migration-project-backend:latest
minikube image load k8s-migration-project-frontend:latest
```

Dans les Deployments backend/frontend, on utilise :

```yaml
imagePullPolicy: Never
```

Cela dit a Kubernetes d'utiliser l'image locale disponible dans Minikube.

## Commandes pratiques executees

Appliquer les manifests :

```powershell
kubectl apply -f infra/k8s/
```

Verifier toutes les ressources :

```powershell
kubectl get all -n k8s-lab
```

Verifier les Pods :

```powershell
kubectl get pods -n k8s-lab
```

Resultat final valide :

```text
backend    1/1 Running
database   1/1 Running
frontend   1/1 Running
```

Verifier les Services :

```powershell
kubectl get services -n k8s-lab
```

Services valides :

```text
backend-service    ClusterIP   5000/TCP
database-service   ClusterIP   5432/TCP
frontend-service   NodePort    80:30080/TCP
```

Voir les logs backend :

```powershell
kubectl logs deployment/backend -n k8s-lab
```

Resultat valide :

```text
Backend API listening on port 5000
```

Tester le backend avec port-forward :

```powershell
kubectl port-forward service/backend-service 5001:5000 -n k8s-lab
```

Dans un autre terminal :

```powershell
curl http://localhost:5001/health
curl http://localhost:5001/api/tasks
```

Resultat valide :

```text
status: ok
tasks retournees depuis PostgreSQL
```

Ouvrir le frontend Kubernetes :

```powershell
minikube service frontend-service -n k8s-lab
```

URL testee :

```text
http://127.0.0.1:62441
```

Le frontend s'ouvre correctement.

## Correction frontend vers backend

Au depart, le frontend appelait :

```text
http://localhost:5001
```

Ce fonctionnement dependait du port-forward.

Pour Kubernetes, on a corrige le frontend pour appeler une URL relative :

```text
/api
```

Dans `app/frontend/app.js` :

```js
const apiBaseUrl = window.API_BASE_URL || "";
```

Puis Nginx redirige `/api` vers le Service backend :

```text
/api -> backend-service:5000
```

Fichier ajoute :

```text
app/frontend/nginx.conf
```

Cette correction permet le flux propre :

```text
navigateur
-> frontend-service
-> Pod frontend / Nginx
-> backend-service
-> Pod backend
-> database-service
-> Pod PostgreSQL
```

## Points importants pour entretien technique

Un Deployment ne sert pas seulement a lancer un conteneur. Il declare l'etat desire :

```text
image, nombre de replicas, labels, ports, variables, volumes
```

Un Service est necessaire car les Pods sont ephemeres. Le Service garde une adresse stable.

Un ConfigMap contient la configuration non sensible.

Un Secret contient les donnees sensibles.

Un PVC garde les donnees persistantes d'une base de donnees.

Dans Kubernetes, on evite de faire communiquer les applications avec les IP des Pods. On utilise les noms des Services.

## Validation finale

La phase est validee car :

- les 3 Pods sont Running
- les Services existent
- le backend repond
- le backend lit les donnees PostgreSQL
- le frontend est accessible dans le navigateur
- le frontend communique avec le backend via Nginx et `backend-service`

