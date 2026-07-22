# Concept — Kubernetes Fondamentaux

## C'est quoi Kubernetes, en une phrase ?

Kubernetes (souvent abrégé **K8s**) est un système qui **gère automatiquement des conteneurs à grande échelle** : il les démarre, les surveille, les redémarre s'ils tombent, les fait communiquer entre eux, et ajuste leur nombre selon la charge.

Imagine que tu es le manager d'une équipe de robots identiques (tes conteneurs). Kubernetes est le système qui :
- S'assure qu'il y a toujours le bon nombre de robots actifs
- Remplace immédiatement un robot qui tombe en panne
- Distribue le travail entre les robots
- Peut embaucher plus de robots si le travail augmente

## Les objets de base, expliqués simplement

### 🔹 Pod
La **plus petite unité déployable** dans Kubernetes. Un Pod contient généralement **un seul conteneur** (parfois plusieurs conteneurs très liés). Tu ne crées presque jamais un Pod directement — tu passes par un Deployment qui les gère pour toi.

> Analogie : le Pod, c'est l'instance individuelle de ton application qui tourne réellement.

### 🔹 Deployment
Décrit **combien de copies** (répliques) d'un Pod tu veux, et **comment les mettre à jour**. Le Deployment surveille en permanence : si un Pod meurt, il en recrée un automatiquement pour respecter le nombre voulu.

> Analogie : le Deployment, c'est la fiche de poste — "je veux toujours 3 personnes à ce poste, peu importe qui vient et part".

### 🔹 Service
Fournit une **adresse stable** pour joindre un groupe de Pods, même si ces Pods sont recréés en permanence (donc changent d'IP à chaque fois). Le Service fait le pont entre "je veux parler au backend" et "voici les 3 Pods backend actuellement actifs".

> Analogie : le Service, c'est le numéro de standard téléphonique d'une entreprise — peu importe quel employé répond, le numéro ne change jamais.

### 🔹 Namespace
Une façon de **cloisonner** des ressources dans un même cluster, comme des dossiers séparés. Utile pour séparer plusieurs projets ou environnements (dev/staging/prod) sur un même cluster.

### 🔹 ConfigMap / Secret
Stockent la **configuration** de ton application en dehors du code — ConfigMap pour les données normales, Secret pour les données sensibles (encodées, pas chiffrées par défaut).

### 🔹 Ingress
Gère l'accès **depuis l'extérieur** du cluster vers tes Services internes, avec des règles de routage (par domaine ou par chemin URL).

### 🔹 HPA (Horizontal Pod Autoscaler)
Ajuste automatiquement le **nombre de Pods** d'un Deployment en fonction d'une métrique (généralement le CPU).

## Le concept le plus important : la réconciliation automatique

Kubernetes fonctionne selon un principe appelé **"desired state" (état désiré)** :
1. Tu décris, dans des fichiers YAML, l'état que tu VEUX (ex: "3 répliques du backend, toujours")
2. Kubernetes compare en permanence cet état désiré à l'état réel du cluster
3. S'il y a une différence, Kubernetes agit automatiquement pour corriger (recréer un Pod mort, par exemple)

C'est fondamentalement différent de Docker Compose, qui exécute juste des commandes une fois — Kubernetes, lui, **surveille en continu**.

## Le cycle de vie d'un déploiement

```
Tu écris un manifest YAML
        ↓
kubectl apply -f fichier.yaml
        ↓
L'API Kubernetes enregistre "l'état désiré"
        ↓
Le Scheduler décide sur quel nœud placer les Pods
        ↓
Le Kubelet (agent sur chaque nœud) démarre les conteneurs
        ↓
Kubernetes surveille en continu et corrige les écarts
```
