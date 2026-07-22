# Rapport Phase 0 — Prérequis & Installation

## Objectif de la phase

Préparer la machine avec les outils nécessaires pour travailler sur un projet Kubernetes local :

- Docker
- kubectl
- Minikube
- Git
- éventuellement k9s

Cette phase sert à vérifier que l'environnement est prêt avant d'écrire des manifests Kubernetes ou de migrer une application.

## Concepts fondamentaux

### Docker

Docker permet de construire et lancer des conteneurs.

Un conteneur est une unité légère qui contient une application et ses dépendances. Il permet d'exécuter une application de manière reproductible, peu importe la machine.

Dans ce projet, Docker sert à :

- construire les images des services
- tester les conteneurs localement
- fournir le moteur utilisé par Minikube

### Kubernetes

Kubernetes est un orchestrateur de conteneurs.

Il ne sert pas seulement à lancer un conteneur. Il gère automatiquement :

- le nombre de copies d'une application
- le redémarrage des conteneurs en erreur
- la communication entre services
- les mises à jour progressives
- le scaling
- la configuration

Idée simple :

```text
Docker lance des conteneurs.
Kubernetes organise et surveille des conteneurs.
```

### kubectl

`kubectl` est l'outil en ligne de commande pour communiquer avec Kubernetes.

Il permet de demander au cluster de créer, modifier, inspecter ou supprimer des ressources.

Exemples de ressources Kubernetes :

- Pod
- Deployment
- Service
- ConfigMap
- Secret
- Ingress

Image mentale :

```text
Utilisateur -> kubectl -> Cluster Kubernetes
```

### Minikube

Minikube permet de créer un petit cluster Kubernetes local sur une machine personnelle.

En entreprise, Kubernetes tourne souvent sur plusieurs serveurs ou dans le cloud. Pour apprendre, Minikube permet de pratiquer sans payer un cluster cloud.

Image mentale :

```text
Toi
 ↓
kubectl
 ↓
Minikube
 ↓
Cluster Kubernetes local
 ↓
Conteneurs Docker
```

### Git

Git permet de versionner le projet.

Dans ce parcours, Git sert à :

- garder l'historique des phases
- revenir en arrière si nécessaire
- préparer le projet pour GitHub ou GitLab
- travailler proprement comme dans un contexte professionnel

## Commandes pratiques

### Vérifier Docker

```powershell
docker --version
```

Rôle :

Vérifie que la commande Docker est installée.

Résultat attendu :

```text
Docker version ...
```

Commande de validation plus complète :

```powershell
docker info
```

Rôle :

Vérifie que Docker Desktop fonctionne vraiment, pas seulement que la commande existe.

Résultat attendu :

```text
Client:
...
Server:
...
```

Validation actuelle :

```text
[x] docker info affiche bien une partie Client
[x] docker info affiche bien une partie Server
[x] Docker Desktop fonctionne avec le contexte desktop-linux
```

### Vérifier kubectl

```powershell
kubectl version --client
```

Rôle :

Vérifie que `kubectl` est installé sur la machine.

Résultat obtenu :

```text
Client Version: v1.36.1
Kustomize Version: v5.8.1
```

Validation actuelle :

```text
[x] kubectl est installé
```

### Vérifier Minikube

```powershell
minikube version
```

Rôle :

Vérifie que Minikube est installé.

Résultat attendu :

```text
minikube version: v...
```

Validation actuelle :

```text
[x] minikube version validé : v1.38.1
```

### Démarrer le cluster Kubernetes local

```powershell
minikube start
```

Rôle :

Crée et démarre un cluster Kubernetes local.

Résultat attendu :

```text
Done! kubectl is now configured to use "minikube"
```

Validation actuelle :

```text
[x] cluster Minikube démarré
```

### Vérifier le cluster

```powershell
kubectl get nodes
```

Rôle :

Vérifie que Kubernetes voit bien un noeud disponible.

Résultat attendu :

```text
NAME       STATUS   ROLES           AGE   VERSION
minikube   Ready    control-plane   ...   ...
```

Validation actuelle :

```text
[x] kubectl get nodes affiche un noeud minikube Ready
```

### Vérifier Git

```powershell
git --version
```

Rôle :

Vérifie que Git est installé.

Résultat attendu :

```text
git version ...
```

Validation actuelle :

```text
[x] git --version validé : git version 2.49.0.windows.1
```

## Checklist Phase 0

```text
[x] Docker fonctionne
[x] kubectl est installé
[x] Minikube est installé
[x] Cluster Kubernetes local démarré
[x] kubectl get nodes affiche un noeud Ready
[x] Git est installé
[x] Projet Git initialisé
```

Commande utilisée :

```powershell
git init
```

Résultat obtenu :

```text
Initialized empty Git repository in C:/Users/user/Desktop/k8s-migration-project/.git/
```

## Erreurs fréquentes

### Docker installé mais daemon non démarré

Symptôme :

```text
Cannot connect to the Docker daemon
```

Solution :

Ouvrir Docker Desktop, attendre qu'il soit démarré, puis relancer :

```powershell
docker info
```

### kubectl installé mais aucun cluster disponible

Symptôme :

```text
The connection to the server localhost:8080 was refused
```

Explication :

`kubectl` existe, mais aucun cluster Kubernetes n'est démarré ou configuré.

Solution :

Démarrer Minikube :

```powershell
minikube start
```

### Minikube non reconnu

Symptôme :

```text
minikube : The term 'minikube' is not recognized
```

Explication :

Minikube n'est pas installé ou son chemin n'est pas encore disponible dans le terminal.

Solution :

Installer Minikube, puis fermer et rouvrir PowerShell.

## Questions d'entretien

### C'est quoi Docker ?

Docker est un outil qui permet de construire et exécuter des conteneurs. Un conteneur embarque l'application et ses dépendances pour qu'elle tourne de manière reproductible.

### C'est quoi Kubernetes ?

Kubernetes est un orchestrateur de conteneurs. Il gère le déploiement, la disponibilité, le redémarrage, la communication et le scaling des applications conteneurisées.

### Quelle est la différence entre Docker et Kubernetes ?

Docker lance des conteneurs. Kubernetes organise plusieurs conteneurs, les surveille, les redémarre, les connecte entre eux et maintient l'état désiré de l'application.

### À quoi sert kubectl ?

`kubectl` est la commande utilisée pour communiquer avec un cluster Kubernetes. Elle permet de créer, lire, modifier et supprimer des ressources Kubernetes.

### À quoi sert Minikube ?

Minikube permet de créer un cluster Kubernetes local pour apprendre et tester Kubernetes sans utiliser un cloud payant.

## Résumé oral court

Dans cette phase, j'ai préparé l'environnement nécessaire pour travailler avec Kubernetes localement. Docker sert à exécuter les conteneurs, Minikube crée un cluster Kubernetes local, et kubectl permet de communiquer avec ce cluster. Cette étape est importante parce qu'avant d'écrire des manifests Kubernetes, il faut vérifier que les outils de base fonctionnent correctement.
