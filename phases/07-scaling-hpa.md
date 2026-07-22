# Phase 7 — Scaling automatique (HPA)

## 🎯 Objectif de cette phase

Configurer un **Horizontal Pod Autoscaler (HPA)** pour que Kubernetes ajuste automatiquement le nombre de répliques de ton backend en fonction de la charge (CPU), et observer ce comportement avec un test de charge.

## 📖 Explication : pourquoi cette phase compte

C'est l'un des super-pouvoirs de Kubernetes par rapport à Docker Compose : **le scaling automatique**. Plutôt que de fixer `replicas: 2` en dur, tu dis à Kubernetes "entre 2 et 6 répliques, ajuste tout seul selon l'utilisation CPU".

## 🧩 Prérequis technique : metrics-server

Le HPA a besoin de connaître l'utilisation CPU/mémoire réelle des Pods. Ça vient d'un composant appelé **metrics-server**, pas installé par défaut sur Minikube.

```bash
minikube addons enable metrics-server

# Vérifie (peut prendre 1-2 minutes avant de retourner des valeurs)
kubectl top pods -n mon-projet
```

## 🧩 Anatomie d'un HPA

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
  namespace: mon-projet
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend-deployment       # Le Deployment à surveiller/scaler
  minReplicas: 2
  maxReplicas: 6
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 50    # Si la moyenne CPU dépasse 50%, Kubernetes ajoute des répliques
```

**Ce que ça veut dire concrètement :** si la charge CPU moyenne de tes pods backend dépasse 50%, Kubernetes va automatiquement créer de nouveaux Pods (jusqu'à 6 max) pour répartir la charge. Quand la charge redescend, il en supprime (jusqu'à 2 min).

## 📝 Étapes détaillées

### 1. Active metrics-server (voir ci-dessus)

### 2. Assure-toi que ton Deployment backend a bien des `resources.requests` définis

**⚠️ Point critique :** le HPA calcule le pourcentage d'utilisation CPU **par rapport au `requests.cpu`** défini dans ton Deployment (Phase 4). Sans `requests` défini, le HPA ne peut pas fonctionner.

### 3. Crée `infra/k8s/backend-hpa.yaml` et applique
```bash
kubectl apply -f infra/k8s/backend-hpa.yaml
kubectl get hpa -n mon-projet
```

### 4. Génère de la charge pour observer le scaling en action

Dans un terminal, observe en temps réel :
```bash
kubectl get hpa -n mon-projet --watch
```

Dans un autre terminal, génère de la charge artificielle vers ton service (exemple avec un outil simple) :
```bash
kubectl run load-generator --image=busybox -it --rm -- /bin/sh -c \
  "while true; do wget -q -O- http://backend-service.mon-projet.svc.cluster.local:5000; done"
```

Observe dans le premier terminal : le nombre de `REPLICAS` devrait augmenter progressivement pendant que le `TARGETS` (% CPU) dépasse 50%.

### 5. Arrête la génération de charge (`Ctrl+C`) et observe le "scale down"

Kubernetes attend généralement quelques minutes de stabilisation avant de redescendre le nombre de répliques (comportement volontaire pour éviter les oscillations, appelé "flapping").

## ⚠️ Erreurs fréquentes à éviter

- Oublier `resources.requests.cpu` → le HPA affiche `<unknown>` au lieu d'un pourcentage
- `metrics-server` pas encore prêt → attendre 1-2 minutes après l'activation de l'addon
- Confondre HPA (scale horizontal = ajouter des Pods) avec le concept de VPA (scale vertical = augmenter les ressources d'un Pod existant, plus rare/avancé)

## ✅ Checklist de validation avant de passer à la Phase 8

- [ ] `metrics-server` est actif et `kubectl top pods` retourne des valeurs
- [ ] Le HPA est créé et visible (`kubectl get hpa`)
- [ ] Tu as observé au moins une fois le nombre de répliques augmenter sous charge
- [ ] Tu sais expliquer avec tes mots comment le HPA décide de scaler

## 📚 Concepts à lire si besoin

- `concepts/01-kubernetes-fondamentaux.md`
- `concepts/05-glossaire-devops.md` (chercher "HPA", "scaling")

## ➡️ Étape suivante

Passe à `phases/08-helm-packaging.md`
