# Phase 2 — Dockeriser proprement chaque service

## 🎯 Objectif de cette phase

S'assurer que chaque service de ton app a un `Dockerfile` propre, optimisé, et que les images sont accessibles (publiées sur un registre) — car Kubernetes ne peut PAS lire ton code source directement, il a besoin d'**images Docker déjà construites**.

## 📖 Explication : pourquoi cette phase compte

Différence importante avec Docker Compose local : quand tu fais `docker compose up`, Docker construit l'image sur ta machine directement. **Kubernetes, lui, ne construit rien** — il va chercher une image déjà construite dans un registre (Docker Hub, GitHub Container Registry, etc.), même en local avec Minikube.

## 📝 Étapes détaillées

### 1. Vérifie/écris un Dockerfile propre pour chaque service

Exemple pour un backend Node.js, avec **multi-stage build** (bonne pratique) :
```dockerfile
# Étape 1 : build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Étape 2 : image finale, plus légère
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 5000
CMD ["node", "dist/index.js"]
```

**Pourquoi le multi-stage build ?** L'image finale ne contient pas les outils de build (plus légère, plus sécurisée — moins de surface d'attaque).

### 2. Build chaque image localement pour tester
```bash
docker build -t mon-backend:v1 ./app/backend
docker build -t mon-frontend:v1 ./app/frontend
```

### 3. Charge les images dans Minikube (spécifique au développement local)

Comme Minikube tourne dans son propre environnement Docker isolé, il ne "voit" pas automatiquement les images que tu as construites sur ta machine. Deux options :

**Option A — charger l'image directement (le plus simple pour apprendre) :**
```bash
minikube image load mon-backend:v1
minikube image load mon-frontend:v1
```

**Option B — pointer ton terminal vers le Docker de Minikube avant de build :**
```bash
eval $(minikube docker-env)
docker build -t mon-backend:v1 ./app/backend
```

> 💡 En production réelle (cloud), tu n'utiliserais jamais ces méthodes locales — tu pousserais tes images sur un vrai registre (Docker Hub, AWS ECR, GitHub Container Registry). On garde ça pour un projet futur avec un vrai cluster cloud.

### 4. Vérifie que les images sont bien présentes dans Minikube
```bash
minikube image ls | grep mon-backend
```

## ⚠️ Erreurs fréquentes à éviter

- **`ImagePullBackOff` dans Kubernetes plus tard** → dans 90% des cas, c'est parce que l'image n'a pas été chargée dans Minikube, ou le tag ne correspond pas exactement à ce que tu utilises dans ton manifest YAML.
- Ne mets **jamais** de mot de passe ou clé API en dur dans un `Dockerfile` — ce sera géré via Secrets à la Phase 5.
- Utilise toujours un tag précis (`v1`, `v1.0.0`) plutôt que `latest` — Kubernetes peut mal gérer la mise à jour d'une image `latest`.

## ✅ Checklist de validation avant de passer à la Phase 3

- [ ] Chaque service a un `Dockerfile` fonctionnel et testé
- [ ] Les images sont buildées localement sans erreur
- [ ] Les images sont chargées dans Minikube (`minikube image ls` les affiche)
- [ ] Aucun secret n'est en dur dans le code ou les Dockerfiles

## 📚 Concepts à lire si besoin

- `concepts/02-docker-vs-kubernetes.md`
- `concepts/05-glossaire-devops.md` (chercher "registry", "image", "tag")

## ➡️ Étape suivante

Passe à `phases/03-setup-environnement-k8s.md`
