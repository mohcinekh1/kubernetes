# Phase 3 — Setup de l'environnement Kubernetes

## 🎯 Objectif de cette phase

Bien comprendre ton cluster Minikube, créer un Namespace dédié à ton projet, et te familiariser avec les commandes `kubectl` de base avant d'écrire tes premiers manifests.

## 📖 Explication : pourquoi cette phase compte

Beaucoup de débutants passent directement à écrire des Deployments sans comprendre la structure d'un cluster. Résultat : ils ne savent pas débugger quand ça casse. Cette phase te donne les réflexes de base avec `kubectl`.

## 📝 Étapes détaillées

### 1. Explore ton cluster existant
```bash
# Voir les nœuds du cluster (en local, souvent un seul nœud)
kubectl get nodes

# Voir tous les namespaces existants
kubectl get namespaces

# Voir ce qui tourne déjà par défaut
kubectl get pods -A
```

### 2. Comprends le concept de Namespace

Un **Namespace** est une façon d'isoler des ressources dans un même cluster — un peu comme des dossiers séparés. Sans Namespace précisé, tout va dans `default`.

Crée un Namespace dédié à ton projet :
```bash
kubectl create namespace mon-projet
```

Vérifie :
```bash
kubectl get namespaces
```

> 💡 **Astuce pratique :** pour ne pas avoir à ajouter `-n mon-projet` à chaque commande, tu peux définir ce namespace par défaut pour ton contexte :
> ```bash
> kubectl config set-context --current --namespace=mon-projet
> ```

### 3. Familiarise-toi avec les commandes `kubectl` essentielles

Ce sont les commandes que tu vas utiliser en permanence pendant tout le reste du projet :

| Commande | Ce qu'elle fait |
|---|---|
| `kubectl get <resource>` | Liste les ressources (pods, services, deployments...) |
| `kubectl describe <resource> <nom>` | Donne le détail complet + les événements (essentiel pour débugger) |
| `kubectl logs <nom-du-pod>` | Affiche les logs d'un pod |
| `kubectl exec -it <nom-du-pod> -- /bin/sh` | Ouvre un terminal DANS le pod (comme `docker exec`) |
| `kubectl apply -f fichier.yaml` | Applique un manifest (crée ou met à jour une ressource) |
| `kubectl delete -f fichier.yaml` | Supprime les ressources définies dans un manifest |
| `kubectl get events --sort-by=.metadata.creationTimestamp` | Liste les événements récents du cluster (très utile pour comprendre pourquoi un pod ne démarre pas) |

### 4. Active le tableau de bord visuel (optionnel mais recommandé pour débuter)
```bash
minikube dashboard
```
Ça ouvre une interface web où tu vois visuellement tout ce qui se passe dans ton cluster — pratique pour "voir" les concepts avant de les manipuler en ligne de commande.

### 5. Si tu as installé k9s, teste-le
```bash
k9s
```
Utilise les flèches pour naviguer, `:pods`, `:svc`, `:deploy` pour changer de vue, `d` pour describe, `l` pour les logs.

## ⚠️ Erreurs fréquentes à éviter

- Oublier dans quel Namespace tu travailles → tu cherches un pod dans `default` alors qu'il est dans `mon-projet`
- Confondre `kubectl get` (vue rapide) et `kubectl describe` (détail + events, indispensable pour débugger)

## ✅ Checklist de validation avant de passer à la Phase 4

- [ ] Le Namespace `mon-projet` existe (`kubectl get namespaces` le montre)
- [ ] Tu as testé au moins 5 des commandes `kubectl` listées ci-dessus
- [ ] Tu sais expliquer avec tes mots ce qu'est un Namespace
- [ ] Le dashboard Minikube (ou k9s) s'ouvre correctement

## 📚 Concepts à lire si besoin

- `concepts/01-kubernetes-fondamentaux.md`
- `concepts/05-glossaire-devops.md`

## ➡️ Étape suivante

Passe à `phases/04-manifests-de-base.md`
