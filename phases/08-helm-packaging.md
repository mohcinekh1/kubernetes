# Phase 8 — Packaging avec Helm

## 🎯 Objectif de cette phase

Regrouper tous tes manifests YAML dispersés (Phases 4 à 7) en un seul **Chart Helm** réutilisable et paramétrable, au lieu de gérer 8-10 fichiers YAML séparés à la main.

## 📖 Explication : pourquoi cette phase compte

Jusqu'ici, tu as appliqué chaque fichier avec `kubectl apply -f ...` un par un. Ça devient vite ingérable. **Helm** est le gestionnaire de paquets de Kubernetes — il te permet de :
- Regrouper tous tes manifests en un seul "Chart"
- Les rendre **paramétrables** (ex: changer `replicas` ou le tag d'image sans toucher au YAML)
- Installer/désinstaller toute ton app en une commande
- Versionner tes déploiements (rollback facile)

## 🧩 Concept clé : les Templates Helm

Un Chart Helm utilise le moteur de templating de Go. En clair : tes fichiers YAML habituels, mais avec des valeurs remplacées par des variables `{{ .Values.xxx }}`, définies dans un fichier `values.yaml` central.

**Exemple concret — avant (Deployment classique) :**
```yaml
spec:
  replicas: 2
  template:
    spec:
      containers:
        - image: mon-backend:v1
```

**Après (avec Helm) :**
```yaml
spec:
  replicas: {{ .Values.backend.replicas }}
  template:
    spec:
      containers:
        - image: "{{ .Values.backend.image }}:{{ .Values.backend.tag }}"
```

Et dans `values.yaml` :
```yaml
backend:
  replicas: 2
  image: mon-backend
  tag: v1
```

**L'intérêt :** pour changer le nombre de répliques en production, tu modifies juste une ligne dans `values.yaml` — pas besoin de toucher aux manifests.

## 📝 Étapes détaillées

### 1. Installe Helm
```bash
# macOS
brew install helm

# Linux
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Vérifie
helm version
```

### 2. Crée la structure de ton Chart
```bash
helm create mon-projet-chart
```

Ça génère automatiquement :
```
mon-projet-chart/
├── Chart.yaml           ← métadonnées du chart (nom, version)
├── values.yaml           ← toutes les valeurs par défaut/paramétrables
├── templates/            ← tes manifests, templatisés
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── ...
└── charts/               ← dépendances éventuelles (vide pour l'instant)
```

### 3. Adapte les templates générés avec tes propres manifests

Reprends les fichiers que tu as écrits en Phases 4-7 (`backend-deployment.yaml`, `backend-service.yaml`, `configmap.yaml`, `secret.yaml`, `ingress.yaml`, `backend-hpa.yaml`...) et transforme-les en templates dans `templates/`, en remplaçant les valeurs codées en dur par des `{{ .Values.xxx }}`.

Fais-le service par service, ne cherche pas à tout convertir d'un coup.

### 4. Remplis `values.yaml` avec toutes tes valeurs paramétrables
```yaml
namespace: mon-projet

frontend:
  image: mon-frontend
  tag: v1
  replicas: 2
  port: 3000

backend:
  image: mon-backend
  tag: v1
  replicas: 2
  port: 5000
  minReplicas: 2
  maxReplicas: 6

database:
  image: postgres
  tag: "16"
```

### 5. Valide la syntaxe avant d'installer
```bash
helm lint ./mon-projet-chart

# Génère le YAML final sans l'appliquer (pour vérifier visuellement)
helm template ./mon-projet-chart
```

### 6. Installe ton app via Helm
```bash
helm install mon-projet ./mon-projet-chart

# Vérifie
helm list
kubectl get all -n mon-projet
```

### 7. Teste la mise à jour d'une valeur sans toucher au YAML directement
```bash
helm upgrade mon-projet ./mon-projet-chart --set backend.replicas=4
```

### 8. Teste le rollback (fonctionnalité clé de Helm)
```bash
helm history mon-projet
helm rollback mon-projet 1
```

## ⚠️ Erreurs fréquentes à éviter

- Oublier `helm lint` avant d'installer → erreurs de syntaxe YAML/template difficiles à débugger une fois appliquées
- Mal indenter les blocs `{{ }}` dans les templates (le moteur de templating Helm est sensible aux espaces)
- Ne pas nettoyer les anciennes ressources créées manuellement (Phases 4-7) avant d'installer via Helm → conflits de noms

## ✅ Checklist de validation avant de passer à la Phase 9

- [ ] `helm lint` ne retourne aucune erreur
- [ ] `helm install` déploie correctement toute ton app en une seule commande
- [ ] Tu as testé `helm upgrade` avec un `--set` pour changer une valeur
- [ ] Tu as testé `helm rollback` avec succès
- [ ] Tu sais expliquer avec tes mots ce qu'apporte Helm par rapport à `kubectl apply -f` direct

## 📚 Concepts à lire si besoin

- `concepts/04-helm-explique.md`

## ➡️ Étape suivante

Passe à `phases/09-tests-validation.md`
