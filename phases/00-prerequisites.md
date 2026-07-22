# Phase 0 — Prérequis & Installation

## 🎯 Objectif de cette phase

Préparer ta machine avec tous les outils nécessaires, et t'assurer que tu as bien une application de départ à migrer (idéalement ton projet du Niveau 2, ou une stack Docker Compose simple si tu n'en as pas encore).

## 📖 Explication : pourquoi cette phase compte

Beaucoup de débutants sautent cette étape et se retrouvent bloqués à la Phase 3 à cause d'un outil mal installé. Un cluster Kubernetes local (Minikube ou Kind) consomme des ressources — il vaut mieux vérifier que tout fonctionne AVANT d'écrire le moindre manifest YAML.

## 🛠️ Outils à installer

| Outil | Rôle | Pourquoi tu en as besoin |
|---|---|---|
| **Docker Desktop** (ou Docker Engine) | Construire et faire tourner des conteneurs | Kubernetes orchestre des conteneurs — il faut d'abord savoir en construire |
| **kubectl** | CLI officielle pour piloter un cluster Kubernetes | C'est ton "télécommande" pour parler au cluster |
| **Minikube** OU **Kind** (Kubernetes in Docker) | Créer un cluster Kubernetes local à des fins d'apprentissage | Pas besoin de payer un cloud pour apprendre K8s |
| **Git** | Versionner ton code | Déjà censé être installé si tu as fait les projets précédents |
| **k9s** (optionnel mais très utile) | Interface terminal visuelle pour naviguer dans un cluster K8s | Rend le debug beaucoup plus facile qu'avec `kubectl` seul |

> 💡 **Minikube vs Kind, lequel choisir ?**
> - **Minikube** : simule une vraie VM Kubernetes, plus proche d'un cluster réel, bon pour bien comprendre les concepts.
> - **Kind** : crée le cluster directement dans des conteneurs Docker, plus léger et plus rapide.
> Pour un premier projet d'apprentissage, **Minikube est recommandé** car sa documentation et son tableau de bord (`minikube dashboard`) aident à visualiser ce qui se passe.

## 📝 Étapes détaillées

### 1. Installer Docker (si pas déjà fait)
Vérifie que Docker fonctionne :
```bash
docker --version
docker run hello-world
```

### 2. Installer kubectl
```bash
# Sur macOS
brew install kubectl

# Sur Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Vérifier l'installation
kubectl version --client
```

### 3. Installer Minikube
```bash
# macOS
brew install minikube

# Linux
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Démarrer ton premier cluster
minikube start

# Vérifier que ça fonctionne
kubectl get nodes
```

Tu devrais voir un nœud (`node`) avec le statut `Ready`. **C'est ton tout premier cluster Kubernetes qui tourne !**

### 4. (Optionnel) Installer k9s
```bash
brew install k9s        # macOS
# ou snap install k9s   # Linux
```

### 5. Préparer ton application de départ

Si tu as déjà ton Projet 4 (stack Docker Compose), utilise-le. Sinon, crée une stack minimale de test avec :
- Un service **frontend** (ex: page statique Nginx ou app React simple)
- Un service **backend** (ex: API Node.js/Express ou Python/Flask)
- Une **base de données** (ex: PostgreSQL ou MongoDB)

Vérifie qu'elle tourne bien en local avec :
```bash
docker compose up
```

## ✅ Checklist de validation avant de passer à la Phase 1

- [ ] `docker --version` fonctionne
- [ ] `kubectl version --client` fonctionne
- [ ] `minikube start` a réussi et `kubectl get nodes` affiche un nœud `Ready`
- [ ] Ton application de départ (Docker Compose) tourne correctement en local
- [ ] Tu as un dépôt Git initialisé pour ce projet

## 📚 Concepts à lire si besoin

- `concepts/02-docker-vs-kubernetes.md` — pour bien comprendre pourquoi on a besoin des deux
- `concepts/05-glossaire-devops.md` — si un terme n'est pas clair

## ➡️ Étape suivante

Une fois la checklist validée, passe à `phases/01-preparer-application.md`
