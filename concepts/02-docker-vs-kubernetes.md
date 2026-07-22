# Concept — Docker vs Docker Compose vs Kubernetes

Une confusion très fréquente chez les débutants : "si j'ai déjà Docker Compose, pourquoi j'ai besoin de Kubernetes ?"

## Ce que chaque outil fait réellement

| Outil | Rôle | Niveau |
|---|---|---|
| **Docker** | Construire et faire tourner UN conteneur | Outil de base |
| **Docker Compose** | Orchestrer PLUSIEURS conteneurs sur UNE SEULE machine | Orchestration simple, locale |
| **Kubernetes** | Orchestrer des conteneurs sur PLUSIEURS machines (cluster), avec auto-guérison, scaling, etc. | Orchestration à grande échelle |

## Analogie simple

- **Docker** = une boîte qui contient un objet précis, toujours pareil peu importe où tu l'ouvres
- **Docker Compose** = un plan qui dit "pose ces 3 boîtes sur cette table, dans cet ordre" — mais si la table casse, tout s'arrête
- **Kubernetes** = un système d'entrepôts multiples qui surveille en permanence tes boîtes, en répare automatiquement si une est endommagée, et peut en ajouter d'autres si besoin de plus de stock — répartis sur PLUSIEURS entrepôts (serveurs)

## Pourquoi Docker Compose ne suffit pas en production réelle

| Besoin en production | Docker Compose | Kubernetes |
|---|---|---|
| Redémarrer un conteneur qui a crashé | Non automatique | ✅ Automatique |
| Répartir la charge sur plusieurs machines physiques | ❌ Impossible (une seule machine) | ✅ Natif |
| Scaler automatiquement selon la charge | ❌ Manuel (`docker compose up --scale`) | ✅ Automatique (HPA) |
| Mise à jour sans coupure de service | ❌ Difficile | ✅ Rolling updates natifs |
| Gérer plusieurs environnements (dev/staging/prod) proprement | Limité | ✅ Namespaces |
| Auto-guérison si un serveur physique tombe | ❌ Impossible | ✅ Le cluster redistribue sur d'autres nœuds |

## Alors, Docker Compose sert à quoi ?

Docker Compose reste **excellent pour le développement local** — rapide à lancer, simple à comprendre, pas besoin d'un cluster complet pour juste coder. Beaucoup d'équipes utilisent Docker Compose en local et Kubernetes en production. Ce n'est pas "l'un remplace l'autre" — c'est "l'un pour développer, l'autre pour opérer à grande échelle".

## Le lien direct avec ce projet

Dans ce projet, tu pars justement d'un `docker-compose.yml` (développement local) et tu apprends à le "traduire" en manifests Kubernetes (production/scaling) — c'est exactement le chemin que suit une vraie équipe DevOps en entreprise.
