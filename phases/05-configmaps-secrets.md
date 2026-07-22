# Phase 5 — ConfigMaps & Secrets

## 🎯 Objectif de cette phase

Extraire toutes les variables d'environnement de tes Deployments (Phase 4) vers des `ConfigMap` (config normale) et des `Secret` (données sensibles), au lieu de les coder en dur dans les manifests.

## 📖 Explication : pourquoi cette phase compte

Coder en dur `DB_PASSWORD: monMotDePasse123` dans un fichier YAML versionné sur Git est une **mauvaise pratique de sécurité** — n'importe qui avec accès au repo voit le mot de passe. Kubernetes propose deux objets pour séparer proprement la config :
- **ConfigMap** : configuration non sensible (URL, noms de variables, feature flags)
- **Secret** : données sensibles (mots de passe, clés API, tokens) — encodées en Base64 (⚠️ pas chiffrées par défaut, juste encodées, voir note plus bas)

## 🧩 Anatomie d'un ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: backend-config
  namespace: mon-projet
data:
  APP_ENV: "production"
  API_PORT: "5000"
  DB_HOST: "database-service"   # Utilise le nom du Service, pas une IP !
```

## 🧩 Anatomie d'un Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: backend-secret
  namespace: mon-projet
type: Opaque
data:
  DB_PASSWORD: bW9uTW90RGVQYXNzZTEyMw==   # valeur encodée en Base64
```

Pour générer la valeur encodée :
```bash
echo -n "monMotDePasse123" | base64
```

> ⚠️ **Important à comprendre :** Base64 n'est **PAS** du chiffrement, juste un encodage réversible. N'importe qui peut décoder avec `echo "..." | base64 -d`. Un vrai Secret Kubernetes doit être protégé par des permissions RBAC strictes, et en production on utilise souvent des outils comme **HashiCorp Vault** ou le chiffrement au repos du cluster. Pour ce projet d'apprentissage, comprendre le mécanisme de base suffit.

## 📝 Étapes détaillées

### 1. Identifie toutes tes variables d'environnement
Reprends le tableau de la Phase 1. Sépare en deux colonnes : "normal" (ConfigMap) et "sensible" (Secret).

### 2. Crée `infra/k8s/configmap.yaml` et `infra/k8s/secret.yaml`

### 3. Applique-les
```bash
kubectl apply -f infra/k8s/configmap.yaml
kubectl apply -f infra/k8s/secret.yaml

# Vérifie
kubectl get configmaps -n mon-projet
kubectl get secrets -n mon-projet
```

### 4. Référence-les dans ton Deployment

Modifie `infra/k8s/backend-deployment.yaml` pour injecter les variables via `envFrom` au lieu de les écrire en dur :

```yaml
    spec:
      containers:
        - name: backend
          image: mon-backend:v1
          envFrom:
            - configMapRef:
                name: backend-config
            - secretRef:
                name: backend-secret
```

> 💡 Alternative : si tu veux ne récupérer QU'UNE seule variable précise (pas tout le ConfigMap/Secret), utilise `env` avec `valueFrom` — utile si tu dois renommer une variable.

### 5. Réapplique le Deployment et vérifie
```bash
kubectl apply -f infra/k8s/backend-deployment.yaml
kubectl rollout restart deployment/backend-deployment -n mon-projet

# Vérifie que les variables sont bien injectées dans le pod
kubectl exec -it <nom-du-pod> -n mon-projet -- env | grep DB_
```

## ⚠️ Erreurs fréquentes à éviter

- Committer un `secret.yaml` avec de vraies valeurs sensibles sur GitHub (public) → ajoute-le à ton `.gitignore` ou utilise un fichier `secret.example.yaml` comme modèle
- Oublier de faire `kubectl rollout restart` après avoir modifié un ConfigMap/Secret — les Pods existants ne se mettent PAS à jour automatiquement

## ✅ Checklist de validation avant de passer à la Phase 6

- [ ] Plus aucune variable sensible n'est en dur dans les fichiers Deployment
- [ ] ConfigMap et Secret sont créés et appliqués
- [ ] Le backend redémarré lit bien les variables (vérifié avec `kubectl exec ... env`)
- [ ] Le fichier `secret.yaml` réel n'est PAS poussé sur un repo Git public (ajouté au `.gitignore`)

## 📚 Concepts à lire si besoin

- `concepts/05-glossaire-devops.md` (chercher "Secret", "ConfigMap")
- Le guide DevOps principal, section DevSecOps, pour la gestion des secrets en général

## ➡️ Étape suivante

Passe à `phases/06-services-ingress.md`
