# Rapport Phase 5 - Fiabiliser les Deployments Kubernetes

## Objectif de la phase

L'objectif de cette phase est de rendre les Deployments Kubernetes plus fiables.

En Phase 4, l'application a ete deployee dans Kubernetes.

En Phase 5, on a ameliore les Deployments pour que Kubernetes puisse :

- verifier si les Pods sont vivants
- verifier si les Pods sont prets a recevoir du trafic
- definir les ressources CPU et memoire
- suivre les mises a jour avec le rollout
- consulter l'historique des revisions

## Difference avec ConfigMap et Secret

ConfigMap et Secret servent a donner la configuration a l'application :

```text
ConfigMap -> configuration non sensible
Secret    -> configuration sensible
```

Exemple :

```text
DB_HOST, DB_PORT, DB_NAME -> ConfigMap
DB_USER, DB_PASSWORD      -> Secret
```

La Phase 5 concerne plutot la configuration Kubernetes du Pod :

```text
livenessProbe
readinessProbe
resources
replicas
rollout
```

Ces elements sont donc definis dans les fichiers Deployment.

## Fichiers modifies

Les fichiers modifies sont :

```text
infra/k8s/backend-deployment.yaml
infra/k8s/frontend-deployment.yaml
infra/k8s/database-deployment.yaml
```

## Concepts fondamentaux

### Liveness Probe

La liveness probe repond a la question :

```text
Le conteneur est-il encore vivant ?
```

Si la liveness probe echoue plusieurs fois, Kubernetes redemarre le conteneur.

### Readiness Probe

La readiness probe repond a la question :

```text
Le Pod est-il pret a recevoir du trafic ?
```

Si la readiness probe echoue, le Pod reste demarre, mais le Service ne lui envoie pas de requetes.

### Difference entre liveness et readiness

```text
livenessProbe  -> redemarre le conteneur si l'application est bloquee
readinessProbe -> retire le Pod du trafic si l'application n'est pas prete
```

### Resources

Les resources definissent la consommation CPU/memoire du conteneur.

```text
requests -> minimum demande
limits   -> maximum autorise
```

Exemple :

```yaml
resources:
  requests:
    cpu: "100m"
    memory: "128Mi"
  limits:
    cpu: "500m"
    memory: "256Mi"
```

`100m` veut dire 100 milliCPU, donc 0.1 CPU.

`128Mi` veut dire 128 MiB de memoire.

### Rollout

Un rollout est une mise a jour d'un Deployment.

Quand on modifie un Deployment, Kubernetes cree un nouveau ReplicaSet et remplace progressivement les anciens Pods par les nouveaux.

## Modifications realisees

### Backend

Le backend expose une route HTTP :

```text
/health
```

On l'utilise pour les probes :

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 5000
  initialDelaySeconds: 15
  periodSeconds: 10
readinessProbe:
  httpGet:
    path: /health
    port: 5000
  initialDelaySeconds: 5
  periodSeconds: 5
```

Resources backend :

```yaml
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 256Mi
```

### Frontend

Le frontend est servi par Nginx sur le port 80.

On verifie la route :

```text
/
```

Probes frontend :

```yaml
livenessProbe:
  httpGet:
    path: /
    port: 80
  initialDelaySeconds: 10
  periodSeconds: 10
readinessProbe:
  httpGet:
    path: /
    port: 80
  initialDelaySeconds: 5
  periodSeconds: 5
```

Resources frontend :

```yaml
resources:
  requests:
    cpu: "50m"
    memory: "64Mi"
  limits:
    cpu: "200m"
    memory: "128Mi"
```

### Database PostgreSQL

PostgreSQL n'a pas de route HTTP. On utilise donc une probe TCP sur le port 5432.

Probes database :

```yaml
livenessProbe:
  tcpSocket:
    port: 5432
  initialDelaySeconds: 30
  periodSeconds: 10
readinessProbe:
  tcpSocket:
    port: 5432
  initialDelaySeconds: 10
  periodSeconds: 5
```

Resources database :

```yaml
resources:
  requests:
    cpu: "100m"
    memory: "256Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"
```

## Commandes pratiques

Verifier l'etat avant modification :

```powershell
kubectl get deployments -n k8s-lab
kubectl get pods -n k8s-lab
```

Appliquer les changements :

```powershell
kubectl apply -f infra/k8s/
```

Verifier les Pods apres modification :

```powershell
kubectl get pods -n k8s-lab
```

Resultat obtenu :

```text
backend    1/1 Running
database   1/1 Running
frontend   1/1 Running
```

Verifier que les probes et resources sont appliquees :

```powershell
kubectl describe pod backend-948f475b4-vg72p -n k8s-lab | findstr "Liveness Readiness Limits Requests"
kubectl describe pod frontend-85c468c67b-trgsm -n k8s-lab | findstr "Liveness Readiness Limits Requests"
kubectl describe pod database-6c668b6fb5-ff5jn -n k8s-lab | findstr "Liveness Readiness Limits Requests"
```

Resultats valides :

```text
backend:
Liveness   http-get http://:5000/health
Readiness  http-get http://:5000/health

frontend:
Liveness   http-get http://:80/
Readiness  http-get http://:80/

database:
Liveness   tcp-socket :5432
Readiness  tcp-socket :5432
```

Verifier le rollout :

```powershell
kubectl rollout status deployment/backend -n k8s-lab
kubectl rollout status deployment/frontend -n k8s-lab
kubectl rollout status deployment/database -n k8s-lab
```

Voir l'historique :

```powershell
kubectl rollout history deployment/backend -n k8s-lab
kubectl rollout history deployment/frontend -n k8s-lab
kubectl rollout history deployment/database -n k8s-lab
```

Historique observe :

```text
backend   revisions 1, 2
frontend  revisions 1, 2, 3
database  revisions 1, 2
```

Le frontend a une revision de plus car il avait deja ete redemarre pour corriger la communication `/api` vers le backend.

## Note sur le redemarrage PostgreSQL

Le Pod database a affiche :

```text
RESTARTS 1
```

C'est probablement lie au redemarrage du Pod apres modification du Deployment et a l'initialisation de PostgreSQL avec le volume.

Comme le Pod est finalement :

```text
1/1 Running
```

la phase reste validee.

## Validation finale

Deployments :

```text
backend    1/1
database   1/1
frontend   1/1
```

Pods :

```text
backend    Running
database   Running
frontend   Running
```

La Phase 5 est validee.

## Phrase pour entretien technique

Apres avoir deploye l'application dans Kubernetes, j'ai ameliore les Deployments avec des liveness probes, readiness probes et limites CPU/memoire. Les probes permettent a Kubernetes de redemarrer un conteneur bloque ou de retirer temporairement un Pod du trafic s'il n'est pas pret. Les resources permettent de controler la consommation CPU et memoire. J'ai ensuite verifie le rollout et l'historique des revisions des Deployments.

