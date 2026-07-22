# Rapport Phase 3 — Setup de l'environnement Kubernetes

## Objectif de la phase

Préparer et explorer le cluster Kubernetes local avant de déployer l'application.

Dans cette phase, on vérifie :

- que Minikube fonctionne
- que `kubectl` pointe vers le bon cluster
- que le node Kubernetes est `Ready`
- que les namespaces existent
- qu'un namespace dédié au projet est créé

## Concepts fondamentaux

### Cluster Kubernetes

Un cluster Kubernetes est l'environnement complet qui fait tourner les applications sous forme de ressources Kubernetes.

Dans ce projet :

```text
Minikube = cluster Kubernetes local
```

Plus tard, nos services Docker Compose seront traduits en ressources Kubernetes :

```text
frontend container -> frontend Pod
backend container  -> backend Pod
database container -> database Pod
```

### Node

Un node est une machine du cluster.

Avec Minikube :

```text
1 cluster = 1 node
```

Le node `minikube` joue aussi le rôle de `control-plane`, c'est-à-dire le cerveau du cluster.

### Pod

Un Pod est la plus petite unité déployable dans Kubernetes.

Un Pod contient généralement un conteneur.

Dans notre projet, on aura au minimum :

```text
frontend Pod
backend Pod
database Pod
```

### Namespace

Un namespace est un espace logique dans Kubernetes.

Il permet de séparer les ressources.

Au lieu de tout mettre dans `default`, on a créé :

```text
k8s-lab
```

Ce namespace contiendra les ressources de notre application.

### kubeconfig

Le `kubeconfig` est le fichier utilisé par `kubectl` pour savoir :

- à quel cluster se connecter
- quel contexte utiliser
- quels certificats/identifiants employer

Quand Minikube change de port local, `kubectl` peut pointer vers une ancienne adresse. On corrige cela avec :

```powershell
minikube update-context
```

## Problème rencontré

### kubectl pointait vers une ancienne adresse Minikube

Erreur :

```text
Unable to connect to the server: dial tcp 127.0.0.1:63170: connectex: No connection could be made
```

Diagnostic :

```powershell
minikube status
```

Résultat important :

```text
kubeconfig: Misconfigured
got: 127.0.0.1:63170
want: 127.0.0.1:51164
```

Correction :

```powershell
minikube update-context
minikube start
```

Résultat :

```text
kubectl est maintenant configuré pour utiliser "minikube"
```

## Commandes pratiques

### Vérifier l'état de Minikube

```powershell
minikube status
```

Rôle :

Vérifier si Minikube, le kubelet, l'apiserver et le kubeconfig sont corrects.

### Corriger le contexte kubectl

```powershell
minikube update-context
```

Rôle :

Mettre à jour le contexte `kubectl` pour pointer vers la bonne adresse du cluster Minikube.

### Démarrer Minikube

```powershell
minikube start
```

Rôle :

Démarrer le cluster Kubernetes local.

### Vérifier le node

```powershell
kubectl get nodes
```

Résultat obtenu :

```text
NAME       STATUS   ROLES           AGE   VERSION
minikube   Ready    control-plane   24h   v1.35.1
```

### Lister les namespaces

```powershell
kubectl get namespaces
```

Résultat obtenu :

```text
default           Active
kube-node-lease   Active
kube-public       Active
kube-system       Active
```

### Créer le namespace du projet

```powershell
kubectl create namespace k8s-lab
```

Résultat obtenu :

```text
namespace/k8s-lab created
```

Vérification :

```text
k8s-lab Active
```

## Checklist Phase 3

```text
[x] Minikube vérifié
[x] Problème kubeconfig compris
[x] minikube update-context exécuté
[x] minikube start exécuté
[x] kubectl get nodes affiche minikube Ready
[x] kubectl get namespaces fonctionne
[x] namespace k8s-lab créé
```

## Questions d'entretien

### C'est quoi un cluster Kubernetes ?

Un cluster Kubernetes est l'environnement qui exécute et orchestre les applications conteneurisées sous forme de Pods, Services, Deployments et autres ressources.

### C'est quoi un node ?

Un node est une machine dans le cluster. Il exécute les Pods. Avec Minikube, on a généralement un seul node local.

### C'est quoi un namespace ?

Un namespace est un espace logique qui permet d'isoler des ressources Kubernetes dans un même cluster.

### Pourquoi créer un namespace pour l'application ?

Pour séparer les ressources du projet des ressources système et éviter de tout mélanger dans le namespace `default`.

### À quoi sert `minikube update-context` ?

Cette commande met à jour le contexte `kubectl` pour qu'il pointe vers la bonne adresse du cluster Minikube.

## Résumé oral court

Dans cette phase, j'ai vérifié mon cluster Minikube, corrigé le contexte `kubectl`, confirmé que le node était `Ready`, puis créé un namespace dédié `k8s-lab`. Ce namespace servira à isoler les ressources Kubernetes de mon application frontend, backend et database.

