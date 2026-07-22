# Phase 9 — Tests & Validation

## 🎯 Objectif de cette phase

Vérifier que ta migration est réellement solide, en testant volontairement des scénarios de panne — car un déploiement qui "marche" la première fois n'est pas forcément résilient.

## 📖 Explication : pourquoi cette phase compte

En entretien ou en vrai job DevOps, on ne te demande pas juste "est-ce que ça tourne", mais "que se passe-t-il si un pod crash", "comment tu débuggerais ça". Cette phase te fait pratiquer ces réflexes.

## 📝 Scénarios de test à réaliser

### Test 1 — Résilience : suppression manuelle d'un Pod
```bash
kubectl get pods -n mon-projet
kubectl delete pod <nom-d-un-pod-backend> -n mon-projet

# Observe : Kubernetes doit en recréer un automatiquement
kubectl get pods -n mon-projet --watch
```
**Ce que tu dois observer :** le Deployment recrée immédiatement un nouveau Pod pour respecter le nombre de `replicas` défini. C'est le principe de "self-healing" de Kubernetes.

### Test 2 — Rolling update (mise à jour sans coupure)
```bash
# Modifie ton code, rebuild une nouvelle image
docker build -t mon-backend:v2 ./app/backend
minikube image load mon-backend:v2

# Mets à jour via Helm
helm upgrade mon-projet ./mon-projet-chart --set backend.tag=v2

# Observe le déploiement progressif
kubectl rollout status deployment/backend-deployment -n mon-projet
kubectl get pods -n mon-projet --watch
```
**Ce que tu dois observer :** Kubernetes ne coupe pas tout d'un coup — il crée les nouveaux Pods progressivement et supprime les anciens seulement une fois les nouveaux prêts (stratégie `RollingUpdate`, par défaut).

### Test 3 — Debug d'un pod cassé (volontairement)

Modifie temporairement ton `values.yaml` pour pointer vers une image qui n'existe pas :
```bash
helm upgrade mon-projet ./mon-projet-chart --set backend.tag=version-inexistante
kubectl get pods -n mon-projet
```
Tu devrais voir un statut `ImagePullBackOff` ou `ErrImagePull`. Entraîne-toi à diagnostiquer :
```bash
kubectl describe pod <nom-du-pod> -n mon-projet
kubectl get events -n mon-projet --sort-by=.metadata.creationTimestamp
```
Puis reviens à la version fonctionnelle :
```bash
helm rollback mon-projet
```

### Test 4 — Vérification des healthchecks (Liveness & Readiness Probes)

Si tu ne l'as pas encore fait dans tes Deployments, ajoute des probes — un concept important non couvert dans les phases précédentes :

```yaml
        livenessProbe:          # "Est-ce que ce Pod est toujours vivant ?" — si échec répété, Kubernetes redémarre le Pod
          httpGet:
            path: /health
            port: 5000
          initialDelaySeconds: 10
          periodSeconds: 15
        readinessProbe:         # "Ce Pod est-il prêt à recevoir du trafic ?" — si échec, retiré temporairement du Service
          httpGet:
            path: /health
            port: 5000
          initialDelaySeconds: 5
          periodSeconds: 10
```

Ajoute une route `/health` simple dans ton backend si elle n'existe pas déjà, applique, et observe le comportement.

### Test 5 — Test de la persistance des données (si tu as une base de données avec volume)
```bash
kubectl delete pod <nom-du-pod-database> -n mon-projet
```
Vérifie ensuite que tes données sont toujours là (si tu as bien configuré un `PersistentVolumeClaim`). Si les données ont disparu, c'est le signe que ton volume n'est pas correctement persistant.

## ✅ Checklist de validation avant de passer à la Phase 10

- [ ] Test 1 réussi : un pod supprimé est automatiquement recréé
- [ ] Test 2 réussi : une mise à jour d'image se fait sans interruption totale de service
- [ ] Test 3 réussi : tu sais diagnostiquer un `ImagePullBackOff` avec `describe` et `events`
- [ ] Test 4 réussi : les probes sont configurées et fonctionnelles
- [ ] Test 5 réussi (si applicable) : les données de la base survivent à un redémarrage de pod

## 📚 Concepts à lire si besoin

- `concepts/01-kubernetes-fondamentaux.md` (self-healing, rolling updates)
- `concepts/05-glossaire-devops.md`

## ➡️ Étape suivante

Passe à `phases/10-documentation.md`
