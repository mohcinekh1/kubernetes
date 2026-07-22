# Concept — Réseaux dans Kubernetes

Les réseaux sont souvent la partie la plus confuse pour les débutants en Kubernetes. Voici les bases indispensables.

## La règle fondamentale de Kubernetes

**Chaque Pod a sa propre adresse IP**, et **tous les Pods peuvent se parler directement**, sans NAT, quel que soit le nœud sur lequel ils tournent. C'est une garantie du modèle réseau Kubernetes.

Problème : cette IP de Pod **change à chaque fois qu'un Pod est recréé** (crash, mise à jour...). Tu ne peux donc jamais coder en dur l'IP d'un Pod dans ton application.

## La solution : le Service

Le **Service** résout ce problème en donnant une adresse **stable** (qui ne change jamais) devant un groupe de Pods. Techniquement, un Service :
1. A une IP virtuelle stable (ClusterIP) et/ou un nom DNS stable
2. Redirige automatiquement le trafic vers les Pods actuellement en vie qui matchent son `selector`

## Le DNS interne de Kubernetes

Kubernetes fournit un système de résolution de noms automatique. Depuis n'importe quel Pod du cluster, tu peux joindre un Service via :

```
<nom-du-service>.<namespace>.svc.cluster.local
```

Exemple : `backend-service.mon-projet.svc.cluster.local`

Si tu es dans le **même namespace**, tu peux même juste utiliser `backend-service` directement (Kubernetes résout automatiquement).

## Les 3 types de Service, en détail

### ClusterIP (par défaut)
- Accessible **uniquement depuis l'intérieur du cluster**
- Cas d'usage typique : backend, base de données — aucune raison d'être exposé directement à internet

### NodePort
- Ouvre un port fixe (entre 30000-32767) sur **chaque nœud** du cluster
- Accessible depuis l'extérieur via `<IP-du-nœud>:<NodePort>`
- Rarement utilisé en production réelle (peu pratique, pas de load balancing propre), surtout utile pour tester rapidement en local

### LoadBalancer
- Demande au fournisseur cloud (AWS, GCP, Azure) de créer un vrai load balancer externe avec une IP publique
- Ne fonctionne pas "nativement" en local (Minikube simule ça différemment) — c'est le type utilisé en vraie production cloud

## Pourquoi utiliser un Ingress plutôt que juste des Services ?

Si tu as 5 microservices, tu ne veux pas 5 LoadBalancers différents (coûteux et compliqué à gérer). L'**Ingress** centralise le routage HTTP :
- Un seul point d'entrée
- Routage par chemin (`/api` → backend, `/` → frontend) ou par nom de domaine
- Gestion centralisée du HTTPS/TLS

## Schéma mental à retenir

```
Internet
   ↓
Ingress (un seul point d'entrée, routage HTTP/HTTPS)
   ↓
Service (adresse stable, load balancing interne)
   ↓
Pods (les instances réelles, IP changeante)
```
