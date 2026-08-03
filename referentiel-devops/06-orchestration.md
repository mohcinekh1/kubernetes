# Pilier 06 - Orchestration avec Kubernetes

## Objectif du cours

L'orchestration consiste a gerer automatiquement des applications containerisees.

Dans ce cours, on se concentre sur Kubernetes.

Kubernetes sert a :

```text
lancer des conteneurs
garder les applications disponibles
exposer les services
gerer la configuration
gerer les secrets
persister les donnees
faire scaling
faire rollout et rollback
```

Phrase simple :

```text
Docker cree les images. Kubernetes lance et gere les conteneurs a partir de ces images.
```

## Plan du cours

```text
PARTIE 1 - Comprendre Kubernetes simplement
PARTIE 2 - Les objets Kubernetes essentiels
PARTIE 3 - Ordre logique des fichiers Kubernetes
PARTIE 4 - Comment coder un Deployment
PARTIE 5 - Comment coder un Service
PARTIE 6 - Comment coder ConfigMap et Secret
PARTIE 7 - Comment coder PVC et stockage
PARTIE 8 - Comment coder Ingress
PARTIE 9 - Comment coder HPA
PARTIE 10 - Methode generale pour n'importe quel projet
PARTIE 11 - Verification, logs et diagnostic
PARTIE 12 - Application a notre projet
PARTIE 13 - Questions d'entretien
PARTIE 14 - Resume final
```



## PARTIE 1 - Comprendre Kubernetes simplement



### 1. Le probleme

Avec Docker Compose, on peut lancer une application localement :

```text
frontend
backend
database
```

Mais en production ou dans un environnement plus serieux, il faut gerer :

```text
plusieurs pods
redemarrage automatique
reseau stable
configuration separee
secrets
stockage persistant
scaling
deploiement progressif
rollback
```

Kubernetes sert a faire tout cela.

### 2. La logique Kubernetes

Dans Kubernetes, on ne lance pas seulement un conteneur.

On declare des objets YAML :

```text
Deployment
Service
ConfigMap
Secret
PVC
Ingress
HPA
```

Puis Kubernetes applique l'etat demande.

Phrase importante :

```text
Kubernetes fonctionne de maniere declarative : on declare l'etat voulu, Kubernetes essaie de l'obtenir.
```



### 3. Image, Pod, Deployment

Schema :

```text
Dockerfile
-> image Docker
-> Pod Kubernetes
-> Deployment gere le Pod
```

Important :

```text
On ne deploie pas directement un conteneur Docker Compose.
On reutilise son image Docker dans un Deployment Kubernetes.
```



## PARTIE 2 - Les objets Kubernetes essentiels



### 4. Namespace

Role :

```text
isoler les ressources d'un projet
```

Exemple :

```text
k8s-lab
dev
staging
production
```



### 5. Deployment

Role :

```text
decrire comment lancer et maintenir les Pods
```

Le Deployment gere :

```text
nombre de replicas
template du Pod
image Docker
variables
probes
resources
rollout
rollback
```

Chaine :

```text
Deployment -> ReplicaSet -> Pod -> Container
```



### 6. Service

Role :

```text
donner une adresse stable pour acceder aux Pods
```

Pourquoi :

```text
un Pod peut changer d'adresse IP
un Service garde un nom stable
```

Exemple :

```text
backend-service
database-service
frontend-service
```



### 7. ConfigMap

Role :

```text
stocker la configuration non sensible
```

Exemples :

```text
PORT
DATABASE_HOST
DATABASE_PORT
NODE_ENV
```



### 8. Secret

Role :

```text
stocker les donnees sensibles
```

Exemples :

```text
POSTGRES_USER
POSTGRES_PASSWORD
API_TOKEN
```



### 9. PVC

PVC veut dire PersistentVolumeClaim.

Role :

```text
demander du stockage persistant
```

Utilise surtout pour :

```text
database
uploads
fichiers persistants
```



### 10. Ingress

Role :

```text
exposer l'application avec un host HTTP
```

Exemple :

```text
http://k8s-lab.local
```



### 11. HPA

HPA veut dire HorizontalPodAutoscaler.

Role :

```text
augmenter ou reduire automatiquement le nombre de Pods
```

Exemple :

```text
backend minimum 1 pod, maximum 5 pods, target CPU 50%
```



## PARTIE 3 - Ordre logique des fichiers Kubernetes

Pour n'importe quel projet, l'ordre logique est :

```text
1. namespace.yaml
2. configmap.yaml
3. secret.yaml
4. pvc.yaml si besoin
5. deployment.yaml
6. service.yaml
7. ingress.yaml si acces externe
8. hpa.yaml si autoscaling
```

Pourquoi cet ordre ?

```text
Namespace avant les ressources
ConfigMap/Secret avant les Pods qui les utilisent
PVC avant la database qui l'utilise
Deployment avant Service
Service avant Ingress
Deployment avant HPA
```

Commande generale :

```powershell
kubectl apply -f infra/k8s/
```



## PARTIE 4 - Comment coder un Deployment



### 12. Role du fichier Deployment

Le Deployment est le fichier principal pour une application.

Il contient :

```text
nom du composant
namespace
nombre de replicas
labels
template du Pod
image Docker
ports
variables
probes
resources
volumes si besoin
```



### 13. Modele general Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: my-namespace
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-app
          image: my-image:tag
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080
          envFrom:
            - configMapRef:
                name: my-app-configmap
            - secretRef:
                name: my-app-secret
          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 15
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 256Mi
```



### 14. Explication ligne par ligne

```yaml
apiVersion: apps/v1
```

Version de l'API Kubernetes pour les Deployments.

```yaml
kind: Deployment
```

Type d'objet Kubernetes.

```yaml
metadata:
  name: my-app
  namespace: my-namespace
```

Nom du Deployment et namespace ou il sera cree.

```yaml
replicas: 1
```

Nombre de Pods souhaites.

```yaml
selector:
  matchLabels:
    app: my-app
```

Le Deployment gere les Pods qui ont ce label.

```yaml
template:
```

Modele du Pod.

Important :

```text
Le Deployment ne declare pas un Pod direct.
Il declare un template de Pod.
```

```yaml
labels:
  app: my-app
```

Labels donnes aux Pods.

Ils doivent correspondre au selector.

```yaml
image: my-image:tag
```

Image Docker a lancer.

```yaml
containerPort: 8080
```

Port expose par le conteneur a l'interieur du Pod.

```yaml
envFrom:
```

Charge des variables depuis ConfigMap et Secret.

```yaml
livenessProbe:
```

Verifie si le conteneur est vivant.

```yaml
readinessProbe:
```

Verifie si le conteneur est pret a recevoir du trafic.

```yaml
resources:
```

Definit CPU et memoire.

### 15. Ce qu'il faut adapter dans chaque projet

```text
metadata.name
metadata.namespace
replicas
labels app
container name
image
containerPort
ConfigMap/Secret names
probe path
CPU/memory
volumes si besoin
```



## PARTIE 5 - Comment coder un Service



### 16. Role du fichier Service

Le Service donne une adresse stable aux Pods.

Sans Service :

```text
les Pods changent d'IP
la communication devient instable
```

Avec Service :

```text
backend-service reste stable
```



### 17. Modele general ClusterIP

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
  namespace: my-namespace
spec:
  type: ClusterIP
  selector:
    app: my-app
  ports:
    - port: 8080
      targetPort: 8080
```

Explication :

```text
type ClusterIP -> accessible seulement dans le cluster
selector app -> doit correspondre au label du Pod
port -> port du Service
targetPort -> port du conteneur
```



### 18. Modele general NodePort

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-frontend-service
  namespace: my-namespace
spec:
  type: NodePort
  selector:
    app: my-frontend
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30080
```

Utilisation :

```text
utile en local avec Minikube
moins utilise comme solution principale en production
```



### 19. Point critique Service

Le plus important :

```text
Service selector doit correspondre aux labels des Pods.
```

Exemple correct :

Deployment :

```yaml
labels:
  app: backend
```

Service :

```yaml
selector:
  app: backend
```

Si les deux ne correspondent pas :

```text
le Service existe mais ne route vers aucun Pod
```



## PARTIE 6 - Comment coder ConfigMap et Secret



### 20. ConfigMap general

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-app-configmap
  namespace: my-namespace
data:
  PORT: "8080"
  DATABASE_HOST: "database-service"
  DATABASE_PORT: "5432"
  NODE_ENV: "production"
```

Role :

```text
configuration non sensible
```



### 21. Secret general

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-app-secret
  namespace: my-namespace
type: Opaque
stringData:
  DATABASE_USER: "app_user"
  DATABASE_PASSWORD: "change-me"
```

Role :

```text
configuration sensible
```

Attention :

```text
Dans un vrai projet, ne pas pousser les vrais secrets dans Git.
Utiliser un fichier .example ou un gestionnaire de secrets.
```



### 22. Utilisation dans Deployment

```yaml
envFrom:
  - configMapRef:
      name: my-app-configmap
  - secretRef:
      name: my-app-secret
```

Role :

```text
injecter les variables dans le conteneur
```



## PARTIE 7 - Comment coder PVC et stockage



### 23. PVC general

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: database-pvc
  namespace: my-namespace
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

Role :

```text
demander un espace disque persistant
```



### 24. Utilisation dans Deployment database

```yaml
volumeMounts:
  - name: database-storage
    mountPath: /var/lib/postgresql/data
```

Puis :

```yaml
volumes:
  - name: database-storage
    persistentVolumeClaim:
      claimName: database-pvc
```

Role :

```text
monter le stockage persistant dans le conteneur database
```



## PARTIE 8 - Comment coder Ingress



### 25. Ingress general

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app-ingress
  namespace: my-namespace
spec:
  ingressClassName: nginx
  rules:
    - host: app.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80
```

Role :

```text
exposer l'application avec un nom de domaine
```



### 26. Conditions pour Ingress

Il faut :

```text
Ingress Controller installe
Service cible existant
host configure
DNS ou fichier hosts configure
```

Dans Minikube :

```powershell
minikube addons enable ingress
minikube tunnel
```

Dans Windows hosts :

```text
127.0.0.1 app.local
```



## PARTIE 9 - Comment coder HPA



### 27. HPA general

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend
  namespace: my-namespace
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend
  minReplicas: 1
  maxReplicas: 5
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 50
```

Role :

```text
scaler automatiquement le Deployment backend selon CPU
```

Condition :

```text
metrics-server doit etre actif
```

Verifier :

```powershell
kubectl get hpa -n my-namespace
kubectl top pods -n my-namespace
```



## PARTIE 10 - Methode generale pour n'importe quel projet



### 28. Questions avant de coder

Avant d'ecrire les YAML, il faut repondre :

```text
Combien de services ?
Chaque service utilise quelle image Docker ?
Chaque service expose quel port ?
Quels services doivent communiquer ensemble ?
Quelles variables sont non sensibles ?
Quels secrets sont necessaires ?
Y a-t-il une database ?
Faut-il persister les donnees ?
Faut-il exposer l'application dehors ?
Faut-il autoscaler ?
```



### 29. Methode de creation

```text
1. Creer le namespace
2. Creer ConfigMap pour la configuration
3. Creer Secret pour les donnees sensibles
4. Creer PVC pour la database si besoin
5. Creer Deployment par service
6. Creer Service par Deployment
7. Creer Ingress pour exposition externe
8. Creer HPA pour les services scalables
9. Appliquer les fichiers
10. Verifier pods, services, ingress, logs
```



### 30. Convention de fichiers

Structure conseillee :

```text
infra/k8s/
  namespace.yaml
  app-configmap.yaml
  app-secret.example.yaml
  database-pvc.yaml
  database-deployment.yaml
  database-service.yaml
  backend-deployment.yaml
  backend-service.yaml
  frontend-deployment.yaml
  frontend-service.yaml
  ingress.yaml
  backend-hpa.yaml
```



### 31. Convention de labels

Simple :

```yaml
labels:
  app: backend
```

Plus complet :

```yaml
labels:
  app.kubernetes.io/name: backend
  app.kubernetes.io/part-of: my-app
  app.kubernetes.io/component: api
```

Pour apprendre, `app: backend` suffit.

## PARTIE 11 - Verification, logs et diagnostic



### 32. Commandes de verification

```powershell
kubectl get nodes
kubectl get namespaces
kubectl get all -n my-namespace
kubectl get pods -n my-namespace
kubectl get services -n my-namespace
kubectl get ingress -n my-namespace
kubectl get hpa -n my-namespace
```



### 33. Logs

```powershell
kubectl logs deployment/backend -n my-namespace
kubectl logs deployment/frontend -n my-namespace
kubectl logs deployment/database -n my-namespace
```



### 34. Describe

```powershell
kubectl describe pod NOM_POD -n my-namespace
```

Role :

```text
voir les details du Pod, image, probes, variables, volumes et events
```



### 35. Events

```powershell
kubectl get events -n my-namespace --sort-by=.lastTimestamp
```

Erreurs importantes :

```text
ImagePullBackOff -> probleme image/tag/registry
CrashLoopBackOff -> application crash
Pending -> probleme scheduling ou ressources
FailedMount -> probleme volume/PVC
Unhealthy -> probe echoue
```



### 36. Diagnostic rapide

Si le Pod ne demarre pas :

```text
kubectl describe pod
kubectl logs
verifier image
verifier variables
verifier Secret/ConfigMap
```

Si le Service ne repond pas :

```text
verifier selector du Service
verifier labels du Pod
verifier port et targetPort
```

Si Ingress ne repond pas :

```text
verifier ingress controller
verifier service cible
verifier minikube tunnel
verifier hosts
```



## PARTIE 12 - Application a notre projet



### 37. Nos services

```text
frontend -> Nginx
backend -> Node.js Express
database -> PostgreSQL
```



### 38. Nos fichiers Kubernetes

```text
namespace.yaml
backend-configmap.yaml
database-secret.yaml
database-pvc.yaml
database-deployment.yaml
database-service.yaml
backend-deployment.yaml
backend-service.yaml
frontend-deployment.yaml
frontend-service.yaml
ingress.yaml
backend-hpa.yaml
```



### 39. Architecture

```text
Ingress k8s-lab.local
-> frontend-service
-> frontend Pod
-> /api proxy vers backend-service
-> backend Pod
-> database-service
-> database Pod
```



### 40. Tests valides

Backend interne :

```powershell
kubectl run api-test -n k8s-lab --image=busybox --restart=Never --rm -it -- wget -q -O- http://backend-service:5000/api/tasks
```

Frontend vers backend :

```powershell
kubectl run frontend-api-test -n k8s-lab --image=busybox --restart=Never --rm -it -- wget -q -O- http://frontend-service/api/tasks
```

Ingress :

```powershell
curl.exe http://k8s-lab.local/api/tasks
```



## PARTIE 13 - Questions d'entretien



### Question 1

**C'est quoi l'orchestration ?**

Reponse :

```text
L'orchestration est la gestion automatique des conteneurs : deploiement, reseau, scaling, disponibilite, rollout et rollback.
```



### Question 2

**C'est quoi un Deployment ?**

Reponse :

```text
Un Deployment gere les Pods, les replicas et les mises a jour progressives.
```



### Question 3

**C'est quoi un Service ?**

Reponse :

```text
Un Service donne une adresse stable pour acceder aux Pods.
```



### Question 4

**Pourquoi les labels sont importants ?**

Reponse :

```text
Les labels permettent aux Services et Deployments de retrouver les bons Pods.
```



### Question 5

**C'est quoi Ingress ?**

Reponse :

```text
Ingress expose une application HTTP avec un host ou des paths et route vers les Services.
```



### Question 6

**C'est quoi HPA ?**

Reponse :

```text
HPA augmente ou reduit automatiquement le nombre de Pods selon les metriques comme CPU.
```



## PARTIE 14 - Resume final



### A retenir

```text
Deployment -> lance et maintient les Pods
Service -> donne une adresse stable
ConfigMap -> configuration non sensible
Secret -> configuration sensible
PVC -> stockage persistant
Ingress -> entree HTTP externe
HPA -> autoscaling
```



### Phrase simple

```text
Kubernetes orchestre une application en combinant plusieurs objets YAML qui travaillent ensemble.
```



### Phrase d'entretien

```text
Pour deployer une application sur Kubernetes, je cree generalement un Deployment pour lancer les Pods, un Service pour les exposer dans le cluster, une ConfigMap et un Secret pour la configuration, un PVC si les donnees doivent persister, un Ingress pour l'acces externe et un HPA pour le scaling.
```



## Sources officielles

- Kubernetes Documentation: [https://kubernetes.io/docs/](https://kubernetes.io/docs/)
- Kubernetes Deployments: [https://kubernetes.io/docs/concepts/workloads/controllers/deployment/](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- Kubernetes Services: [https://kubernetes.io/docs/concepts/services-networking/service/](https://kubernetes.io/docs/concepts/services-networking/service/)
- Kubernetes Ingress: [https://kubernetes.io/docs/concepts/services-networking/ingress/](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- Kubernetes HPA: [https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

