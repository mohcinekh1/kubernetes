# Pilier 05 - Containerisation

## Objectif du cours

La **containerisation** permet d'emballer une application avec tout ce dont elle a besoin pour fonctionner.

Avec Docker, on transforme une application en :

```text
image
```

Puis on lance cette image sous forme de :

```text
conteneur
```

Phrase simple :

```text
La containerisation permet de lancer une application de la meme maniere sur plusieurs environnements.
```

## Plan du cours

```text
PARTIE 1 - Comprendre la containerisation
PARTIE 2 - Docker, image et conteneur
PARTIE 3 - Dockerfile
PARTIE 4 - Docker Compose
PARTIE 5 - Volumes, networks et ports
PARTIE 6 - Variables d'environnement et secrets
PARTIE 7 - Registry et tags d'images
PARTIE 8 - Bonnes pratiques Docker
PARTIE 9 - Securite des conteneurs
PARTIE 10 - Logs et diagnostic Docker
PARTIE 11 - Containerisation dans CI/CD
PARTIE 12 - Lien avec Kubernetes
PARTIE 13 - Application a notre projet
PARTIE 14 - Questions d'entretien
PARTIE 15 - Resume final
PARTIE 16 - Annexe pratique generale
```



## PARTIE 1 - Comprendre la containerisation



### 1. Probleme avant les conteneurs

Avant Docker, on avait souvent ce probleme :

```text
ca marche sur ma machine
mais pas sur le serveur
```

Ca arrive parce que les environnements sont differents :

```text
version Node differente
version Java differente
dependances manquantes
variables d'environnement absentes
configuration systeme differente
ports deja utilises
```



### 2. Solution avec containerisation

Un conteneur contient :

```text
application
runtime
dependances
configuration de lancement
```

Donc on obtient un environnement plus reproductible.

Exemple :

```text
backend Node.js
-> image Docker
-> conteneur backend
```



### 3. Containerisation dans DevOps

La containerisation aide DevOps parce qu'elle simplifie :

```text
build
test
delivery
deployment
scaling
rollback
```

Lien avec le cycle DevOps :


| Etape   | Role de la containerisation       |
| ------- | --------------------------------- |
| Code    | Ajouter Dockerfile                |
| Build   | Construire une image              |
| Test    | Tester l'image                    |
| Release | Tagger l'image                    |
| Deploy  | Deployer le conteneur             |
| Operate | Surveiller les logs et ressources |
| Monitor | Observer les conteneurs           |




## PARTIE 2 - Docker, image et conteneur



### 4. C'est quoi Docker

Docker est une plateforme pour construire, lancer et gerer des conteneurs.

Docker permet de :

```text
creer des images
lancer des conteneurs
gerer des networks
gerer des volumes
publier des images dans un registry
```



### 5. Image Docker

Une image Docker est un modele.

Elle contient :

```text
systeme de base
runtime
dependances
code application
commande de lancement
```

Exemple :

```text
k8s-migration-project-backend:latest
```

Phrase simple :

```text
Image = modele de l'application.
```



### 6. Conteneur Docker

Un conteneur est une image en execution.

Exemple :

```text
k8s_lab_backend
```

Phrase simple :

```text
Conteneur = instance lancee d'une image.
```



### 7. Difference image/conteneur


| Element    | Role                            |
| ---------- | ------------------------------- |
| Image      | modele immuable                 |
| Conteneur  | execution de l'image            |
| Dockerfile | recette pour construire l'image |
| Registry   | stockage distant des images     |




### 8. Commandes de base

Voir les images :

```powershell
docker images
```

Voir les conteneurs actifs :

```powershell
docker ps
```

Voir tous les conteneurs :

```powershell
docker ps -a
```

Lancer un conteneur :

```powershell
docker run nginx
```

Arreter un conteneur :

```powershell
docker stop NOM_CONTENEUR
```

Supprimer un conteneur :

```powershell
docker rm NOM_CONTENEUR
```



## PARTIE 3 - Dockerfile



### 9. C'est quoi un Dockerfile

Un Dockerfile est un fichier qui explique comment construire une image.

Nom du fichier :

```text
Dockerfile
```

Il contient des instructions comme :

```text
FROM
WORKDIR
COPY
RUN
EXPOSE
CMD
```



### 10. Exemple Dockerfile Node.js

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

Explication :

```text
FROM node:22-alpine -> image de base
WORKDIR /app -> dossier de travail dans le conteneur
COPY package*.json ./ -> copier les fichiers dependances
RUN npm ci --omit=dev -> installer les dependances production
COPY . . -> copier le code
EXPOSE 5000 -> documenter le port utilise
CMD ["npm", "start"] -> commande de lancement
```



### 11. Exemple Dockerfile Nginx frontend

```dockerfile
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY app.js /usr/share/nginx/html/app.js

EXPOSE 80
```

Role :

```text
servir un frontend statique avec Nginx
```



### 12. Construire une image

Commande :

```powershell
docker build -t mon-app:latest .
```

Role :

```text
construire une image depuis le Dockerfile du dossier courant
```

Avec chemin :

```powershell
docker build -t backend:latest app/backend
```



### 13. Lancer une image

Commande :

```powershell
docker run -p 5000:5000 backend:latest
```

Role :

```text
lancer l'image backend et exposer le port 5000
```



## PARTIE 4 - Docker Compose



### 14. C'est quoi Docker Compose

Docker Compose permet de lancer plusieurs conteneurs ensemble.

Exemple :

```text
frontend
backend
database
```

Fichier :

```text
docker-compose.yml
```



### 15. Exemple general

```yaml
services:
  backend:
    build: ./app/backend
    ports:
      - "5001:5000"
    environment:
      PORT: 5000

  frontend:
    build: ./app/frontend
    ports:
      - "8080:80"

  database:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: app_db
      POSTGRES_USER: app_user
      POSTGRES_PASSWORD: app_password
```



### 16. Commandes Compose

Construire et lancer :

```powershell
docker compose up --build
```

Lancer en arriere-plan :

```powershell
docker compose up -d
```

Arreter :

```powershell
docker compose down
```

Voir les services :

```powershell
docker compose ps
```

Voir les logs :

```powershell
docker compose logs
```

Voir les logs d'un service :

```powershell
docker compose logs backend
```

Valider la configuration :

```powershell
docker compose config
```



## PARTIE 5 - Volumes, networks et ports



### 17. Ports

Mapping de port :

```text
5001:5000
```

Signification :

```text
port machine host : port conteneur
```

Exemple :

```yaml
ports:
  - "5001:5000"
```

Donc :

```text
localhost:5001 -> conteneur:5000
```



### 18. Networks

Docker Compose cree un network commun pour les services.

Cela permet :

```text
frontend parle a backend
backend parle a database
```

Dans Compose, les services se trouvent par leur nom :

```text
backend
database
```

Exemple :

```text
DATABASE_HOST=database
```



### 19. Volumes

Un volume permet de garder les donnees meme si le conteneur est supprime.

Exemple PostgreSQL :

```yaml
volumes:
  database-data:

services:
  database:
    volumes:
      - database-data:/var/lib/postgresql/data
```

Role :

```text
persister les donnees de la base
```



## PARTIE 6 - Variables d'environnement et secrets



### 20. Variables d'environnement

Les variables d'environnement configurent l'application.

Exemple :

```text
PORT=5000
DATABASE_HOST=database
DATABASE_PORT=5432
```

Dans Compose :

```yaml
environment:
  PORT: 5000
  DATABASE_HOST: database
```



### 21. Fichier .env

Docker Compose peut lire un fichier :

```text
.env
```

Exemple :

```text
POSTGRES_PASSWORD=change-me
```

Important :

```text
.env ne doit pas etre pousse dans Git s'il contient des secrets reels
```



### 22. .env.example

On peut versionner :

```text
.env.example
```

Role :

```text
montrer les variables necessaires sans exposer les secrets reels
```



## PARTIE 7 - Registry et tags d'images



### 23. C'est quoi un registry

Un registry stocke les images Docker.

Exemples :

```text
Docker Hub
GitLab Container Registry
GitHub Container Registry
AWS ECR
Azure Container Registry
Google Artifact Registry
```



### 24. Tag d'image

Un tag identifie une version d'image.

Exemples :

```text
backend:latest
backend:v1.0.0
backend:9b8716f
```

Bonne pratique :

```text
utiliser un tag precis en CI/CD
```

Exemple :

```text
$CI_COMMIT_SHORT_SHA
```



### 25. Push image

Commande :

```powershell
docker push registry.example.com/backend:tag
```

Role :

```text
envoyer l'image dans un registry
```



### 26. Pull image

Commande :

```powershell
docker pull nginx:1.27-alpine
```

Role :

```text
telecharger une image depuis un registry
```



## PARTIE 8 - Bonnes pratiques Docker



### 27. Utiliser une image de base legere

Exemple :

```text
node:22-alpine
nginx:1.27-alpine
postgres:16-alpine
```

Avantage :

```text
image plus petite
moins de surface d'attaque
build plus rapide
```



### 28. Optimiser le cache Docker

Bon ordre :

```dockerfile
COPY package*.json ./
RUN npm ci
COPY . .
```

Pourquoi :

```text
si le code change mais pas package.json, Docker reutilise le cache des dependances
```



### 29. Ajouter .dockerignore

Fichier :

```text
.dockerignore
```

Exemple :

```text
node_modules
.git
.env
*.log
```

Role :

```text
eviter de copier des fichiers inutiles ou sensibles dans l'image
```



### 30. Eviter les secrets dans l'image

Mauvais :

```dockerfile
ENV PASSWORD=secret
```

Bon :

```text
injecter les secrets au runtime via variables, Secret Kubernetes ou CI/CD variables
```



### 31. Un conteneur = un processus principal

Bonne pratique :

```text
un conteneur backend
un conteneur frontend
un conteneur database
```

Eviter :

```text
mettre frontend + backend + database dans un seul conteneur
```



## PARTIE 9 - Securite des conteneurs



### 32. Scanner les images

Outil :

```text
Trivy
```

Commande :

```powershell
trivy image backend:latest
```

Role :

```text
detecter les vulnerabilites dans l'image
```



### 33. Ne pas lancer en root si possible

Dans Dockerfile :

```dockerfile
USER node
```

Role :

```text
reduire les risques si l'application est compromise
```



### 34. Limiter les privileges

Dans Kubernetes, on peut utiliser :

```yaml
securityContext:
  allowPrivilegeEscalation: false
  runAsNonRoot: true
```

Role :

```text
durcir l'execution du conteneur
```



### 35. Garder les images a jour

Les images de base doivent etre mises a jour regulierement.

Exemple :

```text
node:22-alpine
nginx:1.27-alpine
postgres:16-alpine
```



## PARTIE 10 - Logs et diagnostic Docker



### 36. Voir les logs d'un conteneur

Commande :

```powershell
docker logs NOM_CONTENEUR
```

Suivre en temps reel :

```powershell
docker logs -f NOM_CONTENEUR
```



### 37. Logs avec Compose

Tous les services :

```powershell
docker compose logs
```

Un service :

```powershell
docker compose logs backend
```

Temps reel :

```powershell
docker compose logs -f backend
```



### 38. Inspecter un conteneur

Commande :

```powershell
docker inspect NOM_CONTENEUR
```

Role :

```text
voir la configuration complete du conteneur
```



### 39. Entrer dans un conteneur

Commande :

```powershell
docker exec -it NOM_CONTENEUR sh
```

Role :

```text
ouvrir un shell dans le conteneur pour diagnostiquer
```



### 40. Voir les ressources

Commande :

```powershell
docker stats
```

Role :

```text
voir CPU, memoire, reseau et I/O des conteneurs
```



### 41. Erreurs frequentes

Erreur :

```text
port is already allocated
```

Signification :

```text
le port host est deja utilise
```

Correction :

```text
changer le port host ou arreter le conteneur qui utilise ce port
```

Erreur :

```text
unable to prepare context: path not found
```

Signification :

```text
le chemin build dans docker-compose.yml est incorrect
```

Erreur :

```text
required variable POSTGRES_PASSWORD is missing
```

Signification :

```text
une variable attendue dans .env est absente
```



## PARTIE 11 - Containerisation dans CI/CD



### 42. Role dans CI

Dans la CI, on construit l'image :

```yaml
docker build -t "$BACKEND_IMAGE" app/backend
```

Puis on peut la pousser :

```yaml
docker push "$BACKEND_IMAGE"
```



### 43. Role dans CD

Dans le CD, on deploie l'image.

Exemple Kubernetes :

```powershell
kubectl set image deployment/backend backend=registry/backend:tag -n k8s-lab
```



### 44. Tag avec commit SHA

Exemple GitLab :

```yaml
BACKEND_IMAGE: "$CI_REGISTRY_IMAGE/backend:$CI_COMMIT_SHORT_SHA"
```

Role :

```text
lier chaque image a un commit precis
```



## PARTIE 12 - Lien avec Kubernetes



### 45. Kubernetes lance des conteneurs

Dans Kubernetes :

```text
Pod -> contient un ou plusieurs conteneurs
Deployment -> gere les Pods
Service -> expose les Pods
```

Donc Docker prepare l'image, Kubernetes orchestre les conteneurs.

Phrase simple :

```text
Docker construit et lance des conteneurs. Kubernetes orchestre les conteneurs a grande echelle.
```



### 46. Image dans un Deployment

Exemple :

```yaml
containers:
  - name: backend
    image: k8s-migration-project-backend:latest
```

Role :

```text
indiquer a Kubernetes quelle image lancer
```



### 47. imagePullPolicy

Exemple :

```yaml
imagePullPolicy: Never
```

Role dans Minikube local :

```text
dire a Kubernetes d'utiliser l'image locale deja chargee
```

En production, on utilise plutot :

```yaml
imagePullPolicy: IfNotPresent
```

ou :

```yaml
imagePullPolicy: Always
```



## PARTIE 13 - Application a notre projet



### 48. Services containerises

Notre projet contient trois services :

```text
frontend -> Nginx
backend  -> Node.js Express
database -> PostgreSQL
```



### 49. Images du projet

Images locales :

```text
k8s-migration-project-backend:latest
k8s-migration-project-frontend:nginx-proxy-v1
postgres:16-alpine
```



### 50. Docker Compose du projet

Compose permet de lancer :

```text
k8s_lab_frontend
k8s_lab_backend
k8s_lab_database
```

Commandes :

```powershell
docker compose up -d --build
docker compose ps
docker compose logs backend
```



### 51. Passage vers Kubernetes

Dans Kubernetes :

```text
conteneur Docker -> container dans Pod
docker-compose service -> Kubernetes Service + Deployment
volume database -> PVC
environment -> ConfigMap / Secret
```



### 52. Commandes utilisees dans notre projet

Build frontend :

```powershell
docker build --no-cache -t k8s-migration-project-frontend:nginx-proxy-v1 .\app\frontend
```

Charger image dans Minikube :

```powershell
minikube image load k8s-migration-project-frontend:nginx-proxy-v1
```

Relancer le deployment :

```powershell
kubectl rollout restart deployment/frontend -n k8s-lab
```

Verifier :

```powershell
kubectl exec deployment/frontend -n k8s-lab -- cat /etc/nginx/conf.d/default.conf
```



## PARTIE 14 - Questions d'entretien



### Question 1

**C'est quoi la containerisation ?**

Reponse :

```text
La containerisation consiste a emballer une application avec ses dependances dans un conteneur pour l'executer de maniere reproductible.
```



### Question 2

**Difference entre image et conteneur ?**

Reponse :

```text
Une image est un modele immuable. Un conteneur est une instance en execution de cette image.
```



### Question 3

**C'est quoi un Dockerfile ?**

Reponse :

```text
Un Dockerfile est une recette qui contient les instructions pour construire une image Docker.
```



### Question 4

**Pourquoi utiliser Docker Compose ?**

Reponse :

```text
Docker Compose permet de definir et lancer plusieurs services ensemble, comme frontend, backend et database.
```



### Question 5

**C'est quoi un volume Docker ?**

Reponse :

```text
Un volume permet de persister les donnees d'un conteneur meme si le conteneur est supprime.
```



### Question 6

**Pourquoi utiliser un registry ?**

Reponse :

```text
Un registry permet de stocker et partager les images Docker entre CI/CD, serveurs et clusters Kubernetes.
```



### Question 7

**Pourquoi scanner les images Docker ?**

Reponse :

```text
Pour detecter les vulnerabilites dans le systeme de base, les dependances et les packages de l'image.
```



### Question 8

**Lien entre Docker et Kubernetes ?**

Reponse :

```text
Docker permet de construire des images et lancer des conteneurs. Kubernetes orchestre ces conteneurs avec Pods, Deployments et Services.
```



## PARTIE 15 - Resume final



### A retenir

```text
Docker = outil de containerisation
Image = modele
Conteneur = image en execution
Dockerfile = recette de build
Docker Compose = orchestration locale multi-services
Volume = persistance
Network = communication entre conteneurs
Registry = stockage d'images
Tag = version d'image
```



### Phrase simple

```text
La containerisation rend l'application portable, reproductible et plus facile a deployer.
```



### Phrase d'entretien

```text
La containerisation est essentielle en DevOps parce qu'elle standardise l'environnement d'execution, facilite les tests, le deploiement, le scaling et l'integration avec les pipelines CI/CD et Kubernetes.
```



## PARTIE 16 - Annexe pratique generale



### 53. Checklist Dockerfile

```text
[ ] Image de base choisie
[ ] WORKDIR defini
[ ] Dependances installees
[ ] Code copie
[ ] Port documente avec EXPOSE
[ ] Commande CMD ou ENTRYPOINT definie
[ ] .dockerignore present
[ ] Pas de secrets dans l'image
[ ] Image testee localement
```



### 54. Checklist Docker Compose

```text
[ ] Tous les services sont declares
[ ] Les ports sont corrects
[ ] Les variables sont definies
[ ] Les volumes sont declares si besoin
[ ] Les services communiquent par nom
[ ] docker compose config passe
[ ] docker compose up -d fonctionne
```



### 55. Commandes generales a connaitre

```powershell
docker --version
docker info
docker images
docker ps
docker ps -a
docker build -t image:tag .
docker run -p host:container image:tag
docker logs container
docker exec -it container sh
docker stop container
docker rm container
docker rmi image
docker compose up -d --build
docker compose ps
docker compose logs
docker compose down
docker compose config
```



### 56. Methode pour containeriser n'importe quel projet

```text
1. Comprendre comment l'application se lance localement
2. Identifier le runtime necessaire
3. Creer un Dockerfile
4. Ajouter .dockerignore
5. Construire l'image
6. Lancer le conteneur
7. Tester l'application
8. Ajouter Docker Compose si plusieurs services
9. Ajouter variables et volumes
10. Ajouter build Docker dans CI
11. Scanner l'image
12. Deployer l'image avec CD/Kubernetes
```



### 57. Phrase a retenir

```text
Pour containeriser une application, on transforme sa procedure de lancement locale en Dockerfile reproductible.
```



## Sources officielles

- Docker Docs: [https://docs.docker.com/](https://docs.docker.com/)
- Dockerfile reference: [https://docs.docker.com/reference/dockerfile/](https://docs.docker.com/reference/dockerfile/)
- Docker Compose Docs: [https://docs.docker.com/compose/](https://docs.docker.com/compose/)
- Kubernetes Pods: [https://kubernetes.io/docs/concepts/workloads/pods/](https://kubernetes.io/docs/concepts/workloads/pods/)

