# Phase 14 — GitOps avec ArgoCD

## 🎯 Objectif de cette phase

Installer ArgoCD sur ton cluster Kubernetes (Minikube) et configurer un déploiement automatique de ton application dès qu'un commit arrive sur ta branche `main` — sans jamais taper `kubectl apply` ou `helm upgrade` manuellement.

## 📖 Explication : pourquoi le GitOps est important pour un entretien

Jusqu'ici (Phase 8), tu déployais avec `helm install` / `helm upgrade` **manuellement**, depuis ta machine. Le **GitOps** change ce modèle :

> **Git devient la seule source de vérité.** L'état désiré de ton cluster est décrit dans un dépôt Git. Un agent (ArgoCD) tourne DANS le cluster et **tire** (pull) en permanence les changements depuis Git, au lieu que toi tu **pousses** (push) des commandes vers le cluster.

C'est un changement de philosophie : **pull-based** plutôt que **push-based**. Avantages :
- Traçabilité totale (tout changement d'infra = un commit Git)
- Rollback trivial (`git revert`)
- Pas besoin de donner un accès direct au cluster à ton pipeline CI/CD (plus sécurisé)

## 🧩 Concepts clés

| Terme | Explication |
|---|---|
| **Application (ArgoCD)** | Objet ArgoCD qui lie un dépôt Git (+ chemin) à une destination dans le cluster |
| **Sync** | L'action de faire correspondre l'état réel du cluster à l'état décrit dans Git |
| **Sync Policy (manual/automated)** | Est-ce qu'ArgoCD applique les changements automatiquement, ou attend ta validation ? |
| **Drift** | Différence détectée entre l'état réel du cluster et ce qui est décrit dans Git (ex: quelqu'un a modifié une ressource à la main) |

## 📝 Étapes détaillées

### 1. Installe ArgoCD sur ton cluster Minikube
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Vérifie que tout démarre (peut prendre 2-3 minutes)
kubectl get pods -n argocd --watch
```

### 2. Accède à l'interface ArgoCD
```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```
Ouvre `https://localhost:8080` dans ton navigateur.

Récupère le mot de passe admin initial :
```bash
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d
```
Login : `admin` / le mot de passe récupéré.

### 3. Pousse ton Chart Helm (Phase 8) sur un dépôt Git dédié

Si ce n'est pas déjà fait, assure-toi que `mon-projet-chart/` (avec ses `values.yaml` et `templates/`) est bien commité et poussé sur GitHub.

### 4. Crée une Application ArgoCD

Via l'interface, ou en YAML (`infra/k8s/argocd-application.yaml`) :

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: mon-projet
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/<ton-username>/<ton-repo>.git
    targetRevision: main
    path: mon-projet-chart
  destination:
    server: https://kubernetes.default.svc
    namespace: mon-projet
  syncPolicy:
    automated:
      prune: true       # supprime les ressources retirées de Git
      selfHeal: true      # corrige automatiquement tout "drift"
```

Applique :
```bash
kubectl apply -f infra/k8s/argocd-application.yaml
```

### 5. Teste le principe GitOps en conditions réelles

**Test A — modification via Git :**
1. Change `backend.replicas` dans `values.yaml` sur ton dépôt Git, commit et push
2. Observe dans l'interface ArgoCD (ou `kubectl get pods -n mon-projet`) : le changement s'applique automatiquement en quelques secondes/minutes, **sans que tu aies rien tapé dans le cluster**

**Test B — le "selfHeal" en action :**
1. Modifie manuellement une ressource avec `kubectl edit deployment backend-deployment -n mon-projet` (change le nombre de replicas à la main)
2. Observe : ArgoCD détecte ce "drift" et **restaure automatiquement** la valeur définie dans Git

C'est ce deuxième test qui impressionne le plus en entretien — il illustre concrètement pourquoi le GitOps est plus fiable qu'un déploiement manuel.

## ⚠️ Erreurs fréquentes à éviter

- Oublier que le dépôt Git doit être **public** ou qu'ArgoCD doit avoir des identifiants configurés pour un repo privé
- Confondre `syncPolicy.automated` (déploiement auto) avec une synchronisation manuelle — en entreprise, l'auto-sync est parfois désactivé volontairement pour la prod (validation humaine avant déploiement)

## ✅ Checklist de validation avant de passer à la Phase 15

- [ ] ArgoCD est installé et accessible via l'interface web
- [ ] Une Application ArgoCD est créée et synchronisée avec succès (statut `Synced` + `Healthy`)
- [ ] Test A réussi : un changement dans `values.yaml` sur Git se propage automatiquement au cluster
- [ ] Test B réussi : une modification manuelle du cluster est automatiquement corrigée par ArgoCD
- [ ] Tu sais expliquer la différence entre déploiement "push" (Phase 8, `helm upgrade` manuel) et "pull" (GitOps, ArgoCD)

## 📚 Concepts à lire si besoin

- `concepts/08-gitops-argocd.md`

## ➡️ Étape suivante

Passe à `phases/15-trivy-snyk-securite.md`
