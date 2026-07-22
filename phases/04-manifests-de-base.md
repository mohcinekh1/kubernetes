# Phase 4 — Manifests de base (Deployment & Service)

## 🎯 Objectif de cette phase

Écrire tes premiers manifests Kubernetes pour déployer réellement un service (commence par le plus simple, ex: le backend ou le frontend), et comprendre chaque ligne de ce que tu écris.

## 📖 Explication : pourquoi cette phase compte

C'est le cœur de Kubernetes. Un **Deployment** décrit "je veux N copies de ce conteneur, toujours en vie". Un **Service** décrit "comment on accède à ces copies". Comprendre ces deux objets en profondeur te débloque 80% de ce dont tu as besoin pour la suite.

## 🧩 Anatomie d'un Deployment (annotée)

```yaml
apiVersion: apps/v1        # Version de l'API Kubernetes utilisée pour ce type d'objet
kind: Deployment            # Le type de ressource qu'on crée
metadata:
  name: backend-deployment  # Nom de ce Deployment
  namespace: mon-projet     # Dans quel namespace il vit
  labels:
    app: backend             # Étiquette pour identifier/regrouper cette ressource
spec:
  replicas: 2                # Combien de copies (Pods) je veux en permanence
  selector:
    matchLabels:
      app: backend           # Ce Deployment gère tous les Pods qui ont ce label
  template:                  # Le "moule" utilisé pour créer chaque Pod
    metadata:
      labels:
        app: backend          # Chaque Pod créé aura ce label (doit matcher le selector ci-dessus)
    spec:
      containers:
        - name: backend
          image: mon-backend:v1        # L'image Docker à utiliser (celle chargée en Phase 2)
          imagePullPolicy: Never        # "Never" = utilise l'image locale, ne va pas chercher sur internet (important pour Minikube)
          ports:
            - containerPort: 5000      # Le port sur lequel ton appli écoute À L'INTÉRIEUR du conteneur
          resources:
            requests:                   # Ressources minimales garanties
              memory: "128Mi"
              cpu: "100m"
            limits:                     # Ressources maximales autorisées
              memory: "256Mi"
              cpu: "250m"
```

> 💡 **Pourquoi `resources.requests/limits` ?** Sans ça, un Pod pourrait consommer toute la RAM/CPU du cluster et affamer les autres. C'est une bonne pratique dès le début, même en local.

## 🧩 Anatomie d'un Service (annotée)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-service
  namespace: mon-projet
spec:
  type: ClusterIP             # Type de Service (voir tableau ci-dessous)
  selector:
    app: backend                # Envoie le trafic vers tous les Pods qui ont ce label
  ports:
    - port: 5000                # Le port exposé PAR LE SERVICE (à l'intérieur du cluster)
      targetPort: 5000           # Le port du conteneur vers lequel rediriger (doit correspondre au containerPort)
```

### Les types de Service — lequel choisir ?

| Type | Accessible depuis | Cas d'usage |
|---|---|---|
| **ClusterIP** (par défaut) | Uniquement à l'intérieur du cluster | Backend, base de données — pas besoin d'accès externe direct |
| **NodePort** | Depuis l'extérieur, via un port du nœud (30000-32767) | Test rapide en local |
| **LoadBalancer** | Depuis l'extérieur, via une IP publique | Production sur un vrai cloud (AWS/GCP/Azure) |

Pour ce projet, en local : `ClusterIP` pour le backend/database, et on gèrera l'accès externe au frontend via un **Ingress** (Phase 6).

## 📝 Étapes détaillées

### 1. Écris le Deployment + Service pour le backend
Crée `infra/k8s/backend-deployment.yaml` et `infra/k8s/backend-service.yaml` en t'inspirant des exemples ci-dessus, adaptés à ton app.

### 2. Applique et vérifie
```bash
kubectl apply -f infra/k8s/backend-deployment.yaml
kubectl apply -f infra/k8s/backend-service.yaml

# Vérifie que le pod démarre
kubectl get pods -n mon-projet

# Regarde les détails si un pod ne démarre pas
kubectl describe pod <nom-du-pod> -n mon-projet

# Regarde les logs de l'application
kubectl logs <nom-du-pod> -n mon-projet
```

### 3. Teste l'accès interne au service
```bash
# Ouvre un shell temporaire dans le cluster pour tester
kubectl run test-curl --image=curlimages/curl -it --rm -- sh
# Puis dans ce shell :
curl http://backend-service.mon-projet.svc.cluster.local:5000
```

> 💡 Ce test illustre un concept clé : **le DNS interne de Kubernetes**. `backend-service.mon-projet.svc.cluster.local` est l'adresse que N'IMPORTE QUEL pod du cluster peut utiliser pour joindre ton service, sans connaître son IP.

### 4. Répète pour le frontend et la database
Fais la même chose pour chaque service de ton app.

## ⚠️ Erreurs fréquentes à éviter

- **`selector` du Service ne correspond pas au `label` du Pod** → le Service ne route vers rien (`kubectl get endpoints` sera vide, super utile pour débugger ça)
- Oublier `imagePullPolicy: Never` en local → Kubernetes essaie de télécharger l'image depuis Docker Hub et échoue (`ImagePullBackOff`)
- `containerPort` ≠ le port réel sur lequel écoute ton appli dans le code

## ✅ Checklist de validation avant de passer à la Phase 5

- [ ] Chaque service a un Deployment qui tourne (`kubectl get pods` montre `Running`)
- [ ] Chaque service a un Service associé (`kubectl get svc`)
- [ ] Tu as réussi à faire un `curl` interne entre deux services
- [ ] Tu sais expliquer la différence entre `containerPort`, `port`, et `targetPort`

## 📚 Concepts à lire si besoin

- `concepts/01-kubernetes-fondamentaux.md`
- `concepts/03-reseaux-kubernetes.md`

## ➡️ Étape suivante

Passe à `phases/05-configmaps-secrets.md`
