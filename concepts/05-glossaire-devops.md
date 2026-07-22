# Glossaire — Termes utilisés dans ce projet

Un dictionnaire rapide, classé alphabétiquement, des termes que tu vas croiser dans ce projet.

**API (Application Programming Interface)** — Interface qui permet à des programmes de communiquer entre eux. Dans Kubernetes, tout passe par son API interne.

**Base64** — Encodage (pas chiffrement !) utilisé par les Secrets Kubernetes pour stocker des valeurs sous forme de texte. Réversible facilement, ne pas confondre avec une vraie sécurité.

**ClusterIP** — Type de Service accessible uniquement à l'intérieur du cluster Kubernetes.

**ConfigMap** — Objet Kubernetes stockant de la configuration non sensible (variables d'environnement, fichiers de config).

**Conteneur** — Unité isolée et légère qui empaquette une application avec ses dépendances, sans virtualiser tout un système d'exploitation (contrairement à une VM).

**Deployment** — Objet Kubernetes qui gère un ensemble de Pods identiques, garantit leur nombre, et gère les mises à jour.

**Dockerfile** — Fichier texte décrivant comment construire une image Docker, étape par étape.

**HPA (Horizontal Pod Autoscaler)** — Mécanisme Kubernetes qui ajuste automatiquement le nombre de Pods selon une métrique (souvent le CPU).

**Image (Docker)** — "Photo" figée d'un conteneur, contenant tout le nécessaire pour l'exécuter (code, dépendances, configuration système).

**ImagePullBackOff** — Erreur Kubernetes signifiant qu'il n'arrive pas à récupérer l'image demandée (mauvais tag, image absente du registre, etc.).

**Ingress** — Objet Kubernetes qui gère le routage HTTP/HTTPS entrant vers les Services internes.

**Ingress Controller** — Le composant réel (souvent basé sur Nginx) qui applique les règles définies par les objets Ingress. Sans lui, un Ingress ne fait rien.

**kubectl** — Outil en ligne de commande officiel pour interagir avec un cluster Kubernetes.

**Kind (Kubernetes in Docker)** — Outil pour créer un cluster Kubernetes local, en utilisant Docker comme "nœuds".

**Liveness Probe** — Vérification périodique que Kubernetes fait pour savoir si un conteneur est toujours en vie. En cas d'échec, le conteneur est redémarré.

**Manifest** — Fichier YAML décrivant une ressource Kubernetes (Deployment, Service, etc.).

**metrics-server** — Composant Kubernetes qui collecte les métriques CPU/mémoire des Pods, nécessaire pour que le HPA fonctionne.

**Minikube** — Outil pour créer un cluster Kubernetes local à but d'apprentissage/développement, en simulant une vraie VM Kubernetes.

**Multi-stage build** — Technique dans un Dockerfile pour séparer l'étape de compilation de l'image finale, réduisant sa taille.

**Namespace** — Espace cloisonné à l'intérieur d'un cluster Kubernetes, permettant d'isoler des ressources (par projet, environnement, équipe...).

**NodePort** — Type de Service qui ouvre un port fixe sur chaque nœud du cluster pour un accès externe basique.

**Nœud (Node)** — Une machine (physique ou virtuelle) qui fait partie du cluster Kubernetes et qui exécute des Pods.

**Pod** — La plus petite unité déployable dans Kubernetes, contenant généralement un seul conteneur.

**readinessProbe** — Vérification périodique pour savoir si un conteneur est prêt à recevoir du trafic. En cas d'échec, il est temporairement retiré du Service (sans être redémarré).

**Registry (registre d'images)** — Serveur où sont stockées et distribuées les images Docker (Docker Hub, GitHub Container Registry, AWS ECR...).

**Replica / Réplique** — Une copie d'un Pod. `replicas: 3` signifie "je veux 3 copies identiques de ce Pod en permanence".

**Rolling Update** — Stratégie de mise à jour progressive : les nouveaux Pods sont créés avant que les anciens soient supprimés, évitant une coupure totale de service.

**Rollback** — Action de revenir à une version précédente d'un déploiement.

**Scheduler** — Composant de Kubernetes qui décide sur quel nœud placer chaque nouveau Pod.

**Secret** — Objet Kubernetes stockant des données sensibles (mots de passe, clés API), encodées en Base64.

**Selector** — Mécanisme utilisé par un Service ou un Deployment pour cibler des Pods via leurs `labels`.

**Service** — Objet Kubernetes fournissant une adresse réseau stable pour accéder à un groupe de Pods.

**Service Mesh** — Couche d'infrastructure avancée (Istio, Linkerd) gérant la communication entre microservices (sécurité, observabilité, gestion du trafic). Concept avancé, pas couvert dans ce projet.

**StatefulSet** — Alternative au Deployment pour les applications avec état persistant (comme les bases de données), garantissant un ordre et une identité stable des Pods. Concept avancé, mentionné mais pas utilisé dans ce projet.

**Tag (Docker)** — Étiquette de version d'une image Docker (ex: `v1`, `latest`, `v2.3.0`).

**YAML** — Format de fichier texte structuré (indentation par espaces) utilisé pour écrire tous les manifests Kubernetes.
