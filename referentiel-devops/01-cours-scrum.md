# Cours Scrum - Guide complet pour renforcer les connaissances

## Objectif du cours

Scrum est un cadre de travail Agile qui aide une equipe a livrer un produit par petites iterations.

Le but de Scrum est de :

```text
organiser le travail
livrer progressivement
recevoir du feedback rapidement
ameliorer l'equipe en continu
```

Scrum est tres utilise dans les projets DevOps, car il aide a organiser les phases :

```text
Plan -> Code -> Build -> Test -> Deploy -> Feedback
```

## Plan du cours

```text
PARTIE 1 - Comprendre Agile et Scrum
PARTIE 2 - Les roles Scrum
PARTIE 3 - Les evenements Scrum
PARTIE 4 - Les artefacts Scrum
PARTIE 5 - Le cycle de travail Scrum
PARTIE 6 - Scrum avec Jira
PARTIE 7 - Scrum applique a un projet DevOps
PARTIE 8 - Bonnes pratiques et erreurs a eviter
PARTIE 9 - Questions d'entretien
PARTIE 10 - Resume final
```

## PARTIE 1 - Comprendre Agile et Scrum

### 1. C'est quoi Agile ?

Agile est une maniere de travailler qui favorise :

```text
la collaboration
les petites livraisons
l'adaptation au changement
le feedback rapide
l'amelioration continue
```

Avant Agile, beaucoup de projets etaient geres avec une approche lineaire :

```text
analyse -> conception -> developpement -> test -> livraison
```

Probleme :

```text
si le besoin change a la fin, le projet devient difficile a corriger
```

Avec Agile :

```text
on livre petit a petit
on teste souvent
on corrige rapidement
on adapte le produit avec le feedback
```

### 2. C'est quoi Scrum ?

Scrum est un framework Agile.

Il donne une organisation claire a l'equipe :

```text
des roles
des evenements
des artefacts
des iterations courtes
```

Une iteration Scrum s'appelle un **Sprint**.

Exemple :

```text
Sprint 1 : preparer application + Docker
Sprint 2 : deploiement Kubernetes
Sprint 3 : CI/CD + tests
Sprint 4 : monitoring + securite
```

### 3. Scrum en une phrase

```text
Scrum permet a une equipe de livrer regulierement une partie fonctionnelle du produit, puis de s'ameliorer avec le feedback.
```

### 4. Scrum n'est pas seulement des reunions

Scrum ne veut pas dire :

```text
faire beaucoup de meetings
remplir Jira pour faire joli
suivre un processus sans comprendre
```

Scrum veut dire :

```text
clarifier le travail
prioriser
livrer
inspecter
ameliorer
```

## PARTIE 2 - Les roles Scrum

### 5. Product Owner

Le Product Owner represente le besoin metier ou utilisateur.

Son role :

```text
definir la vision du produit
prioriser le backlog
expliquer les besoins
valider si le resultat correspond a l'attendu
```

Il gere le **Product Backlog**.

Exemple dans notre projet :

```text
Le Product Owner veut une application deployable avec Docker, Kubernetes et CI/CD.
```

Responsabilites :

```text
ecrire les User Stories
definir les criteres d'acceptation
choisir les priorites
accepter ou refuser une livraison
```

### 6. Scrum Master

Le Scrum Master aide l'equipe a appliquer Scrum correctement.

Son role :

```text
faciliter les ceremonies
supprimer les blocages
aider l'equipe a s'ameliorer
proteger l'equipe des interruptions inutiles
```

Le Scrum Master n'est pas le chef de l'equipe.

Phrase importante :

```text
Le Scrum Master sert l'equipe, il ne commande pas l'equipe.
```

### 7. Developers

Dans Scrum, "Developers" ne veut pas dire seulement developpeurs code.

Cela peut inclure :

```text
developpeurs backend
developpeurs frontend
DevOps engineers
QA/testeurs
security engineers
data engineers
```

Leur role :

```text
construire l'increment produit
estimer le travail
realiser les taches du sprint
tester
documenter
livrer
```

### 8. Scrum Team

La Scrum Team contient :

```text
Product Owner
Scrum Master
Developers
```

Elle doit etre :

```text
autonome
collaborative
responsable du resultat
orientee valeur
```

## PARTIE 3 - Les evenements Scrum

### 9. Sprint

Le Sprint est une periode courte pendant laquelle l'equipe realise un objectif.

Durée courante :

```text
1 semaine
2 semaines
3 semaines
4 semaines maximum
```

Exemple :

```text
Sprint 2 - Objectif : deployer l'application sur Kubernetes local avec Minikube.
```

Le Sprint contient :

```text
Sprint Planning
Daily Scrum
Sprint Review
Sprint Retrospective
```

### 10. Sprint Planning

Le Sprint Planning sert a choisir le travail du sprint.

Questions principales :

```text
Quel est l'objectif du sprint ?
Quelles taches allons-nous prendre ?
Comment allons-nous les realiser ?
```

Resultat :

```text
Sprint Goal
Sprint Backlog
plan de travail
```

Exemple :

```text
Sprint Goal : Dockeriser l'application et verifier les 3 conteneurs.

Tickets :
- Creer Dockerfile backend
- Creer Dockerfile frontend
- Creer docker-compose.yml
- Tester frontend/backend/database
```

### 11. Daily Scrum

Le Daily Scrum est une courte reunion quotidienne.

Durée :

```text
15 minutes maximum
```

Questions utiles :

```text
Qu'est-ce que j'ai fait ?
Qu'est-ce que je vais faire ?
Est-ce que je suis bloque ?
```

Exemple :

```text
Hier : j'ai cree le deployment backend.
Aujourd'hui : je vais ajouter le service backend.
Blocage : le frontend ne communique pas encore avec backend-service.
```

### 12. Sprint Review

La Sprint Review sert a montrer ce qui a ete livre.

Objectif :

```text
demonstration
feedback
validation
adaptation du backlog
```

Exemple :

```text
On montre l'application accessible via http://k8s-lab.local
On montre que /api/tasks retourne les donnees.
On explique les manifests Kubernetes crees.
```

### 13. Sprint Retrospective

La retrospective sert a ameliorer la maniere de travailler.

Questions :

```text
Qu'est-ce qui a bien marche ?
Qu'est-ce qui a bloque ?
Qu'est-ce qu'on ameliore au prochain sprint ?
```

Exemple :

```text
Bien marche : les pods sont deployes correctement.
Blocage : confusion entre Docker port et Kubernetes Service.
Amelioration : ajouter un guide de lancement clair.
```

### 14. Backlog Refinement

Le Backlog Refinement sert a preparer les prochaines taches.

Actions :

```text
clarifier les tickets
decouper les grandes taches
ajouter criteres d'acceptation
estimer
prioriser
```

Ce n'est pas officiellement un evenement obligatoire dans Scrum, mais il est tres utile.

## PARTIE 4 - Les artefacts Scrum

### 15. Product Backlog

Le Product Backlog est la liste de tout ce qu'on veut faire dans le produit.

Il contient :

```text
features
bugs
ameliorations
taches techniques
documentation
securite
monitoring
```

Exemple :

```text
- Creer backend Express
- Ajouter PostgreSQL
- Dockeriser frontend
- Creer namespace Kubernetes
- Ajouter Ingress
- Ajouter HPA
- Ajouter GitLab CI
```

### 16. Sprint Backlog

Le Sprint Backlog est la liste des taches selectionnees pour le sprint courant.

Exemple :

```text
Sprint Backlog - Sprint Kubernetes

- namespace.yaml
- backend-deployment.yaml
- backend-service.yaml
- frontend-deployment.yaml
- frontend-service.yaml
- database-deployment.yaml
```

### 17. Increment

L'Increment est le resultat livre a la fin du sprint.

Exemple :

```text
Application accessible dans Kubernetes avec frontend, backend et database.
```

Un increment doit etre utilisable ou verifiable.

### 18. Definition of Done

La Definition of Done indique quand une tache est vraiment terminee.

Checklist exemple :

```text
[ ] Code termine
[ ] Tests passes
[ ] Pull Request approuvee
[ ] Documentation mise a jour
[ ] Deploiement verifie
[ ] Ticket ferme
```

## PARTIE 5 - Le cycle de travail Scrum

### 19. Cycle simple

```text
Product Backlog
-> Sprint Planning
-> Sprint Backlog
-> Travail quotidien
-> Sprint Review
-> Retrospective
-> Nouveau Sprint
```

### 20. Exemple concret

Besoin :

```text
Migrer une application Docker Compose vers Kubernetes.
```

Product Backlog :

```text
1. Preparer application
2. Dockeriser application
3. Creer manifests Kubernetes
4. Ajouter ConfigMap et Secret
5. Ajouter probes et resources
6. Ajouter Ingress
7. Ajouter scaling HPA
8. Ajouter CI/CD
```

Sprint 1 :

```text
Objectif : preparer et dockeriser l'application.
```

Sprint 2 :

```text
Objectif : deployer l'application sur Kubernetes.
```

Sprint 3 :

```text
Objectif : automatiser tests et build avec CI/CD.
```

## PARTIE 6 - Scrum avec Jira

### 21. Comment configurer Jira pour Scrum

Dans Jira, creer un projet Scrum.

Structure recommandee :

```text
Project name : Kubernetes Migration Lab
Project key  : K8S
Board type   : Scrum
```

### 22. Colonnes recommandees

```text
Backlog
To Do
In Progress
Code Review
Testing
Done
```

### 23. Exemple d'Epics

```text
K8S-1 Preparer l'application
K8S-2 Dockerisation
K8S-3 Kubernetes Deployment
K8S-4 CI/CD
K8S-5 Monitoring et securite
```

### 24. Exemple de User Story

```text
En tant que developpeur,
je veux lancer l'application avec Docker Compose,
afin de verifier le fonctionnement local avant Kubernetes.
```

Criteres d'acceptation :

```text
[ ] docker compose up -d fonctionne
[ ] frontend accessible
[ ] backend /health retourne status ok
[ ] backend communique avec database
```

### 25. Exemple de tache technique

```text
Titre : Creer backend-deployment.yaml
Type  : Task
Epic  : Kubernetes Deployment
```

Description :

```text
Creer le Deployment Kubernetes du backend avec :
- image backend
- containerPort 5000
- envFrom ConfigMap
- envFrom Secret
- livenessProbe
- readinessProbe
- resources requests/limits
```

### 26. Sprint dans Jira

Dans Jira :

```text
1. Ajouter les tickets au backlog
2. Creer un sprint
3. Glisser les tickets dans le sprint
4. Definir l'objectif du sprint
5. Start Sprint
6. Suivre l'avancement sur le board
7. Complete Sprint
```

## PARTIE 7 - Scrum applique a un projet DevOps

### 27. Pourquoi Scrum aide DevOps

Scrum aide DevOps parce qu'il donne un rythme clair.

DevOps apporte :

```text
automatisation
CI/CD
containerisation
orchestration
monitoring
feedback technique
```

Scrum apporte :

```text
priorisation
organisation
sprint goal
communication
feedback produit
amelioration equipe
```

Ensemble :

```text
Scrum organise le travail.
DevOps automatise la livraison.
```

### 28. Exemple de sprint DevOps

Sprint Goal :

```text
Rendre l'application accessible via Kubernetes avec Ingress.
```

Tickets :

```text
K8S-20 Activer ingress addon dans Minikube
K8S-21 Creer ingress.yaml
K8S-22 Configurer hosts Windows
K8S-23 Tester http://k8s-lab.local
K8S-24 Corriger proxy /api dans Nginx frontend
```

Definition of Done :

```text
[ ] ingress-nginx-controller est Running
[ ] ingress.yaml est applique
[ ] k8s-lab.local ouvre le frontend
[ ] /api/tasks retourne JSON
[ ] README ou rapport mis a jour
```

### 29. Lien avec GitHub

Pour chaque ticket :

```text
creer une branche
faire commits
ouvrir Pull Request
lier la PR au ticket Jira
faire review
merge apres validation
```

Exemple :

```text
Ticket Jira : K8S-24 Corriger proxy API frontend
Branche     : fix/K8S-24-nginx-api-proxy
Commit      : K8S-24 fix nginx api proxy
PR          : K8S-24 Fix frontend API proxy
```

## PARTIE 8 - Bonnes pratiques et erreurs a eviter

### 30. Bonnes pratiques

```text
garder les sprints courts
definir un objectif clair
ne pas prendre trop de tickets
decouper les grandes taches
avoir des criteres d'acceptation
faire review regulierement
mettre a jour Jira
ne pas attendre la fin pour tester
```

### 31. Erreurs courantes

```text
tickets trop grands
pas de Definition of Done
Daily trop long
Sprint Planning flou
Product Owner absent
pas de feedback
Jira pas mis a jour
PR trop grosses
tests seulement a la fin
```

### 32. Comment reconnaitre un bon sprint

Un bon sprint a :

```text
un objectif clair
des tickets comprehensibles
un avancement visible
des blocages traites rapidement
une livraison verifiable
une retrospective utile
```

## PARTIE 9 - Questions d'entretien

### Question 1

**C'est quoi Scrum ?**

Reponse :

```text
Scrum est un framework Agile qui organise le travail d'une equipe en iterations courtes appelees sprints, avec des roles, evenements et artefacts.
```

### Question 2

**Quels sont les roles Scrum ?**

Reponse :

```text
Product Owner, Scrum Master et Developers.
```

### Question 3

**C'est quoi un Sprint ?**

Reponse :

```text
Un Sprint est une periode courte pendant laquelle l'equipe travaille sur un objectif precis et livre un increment verifiable.
```

### Question 4

**Difference entre Product Backlog et Sprint Backlog ?**

Reponse :

```text
Le Product Backlog contient tout le travail possible du produit.
Le Sprint Backlog contient seulement les taches selectionnees pour le sprint courant.
```

### Question 5

**C'est quoi Definition of Done ?**

Reponse :

```text
C'est une checklist commune qui definit quand une tache est vraiment terminee.
```

### Question 6

**Comment Scrum aide DevOps ?**

Reponse :

```text
Scrum organise le travail et le feedback. DevOps automatise la construction, les tests, le deploiement et l'exploitation.
```

### Question 7

**C'est quoi une retrospective ?**

Reponse :

```text
C'est une reunion a la fin du sprint pour identifier ce qui a bien marche, ce qui a bloque et ce que l'equipe doit ameliorer.
```

## PARTIE 10 - Resume final

### A retenir

```text
Agile = philosophie de travail flexible
Scrum = framework Agile avec sprints
Sprint = iteration courte
Product Owner = priorise le besoin
Scrum Master = facilite Scrum
Developers = construisent l'increment
Product Backlog = liste globale du travail
Sprint Backlog = travail du sprint
Increment = resultat livre
Definition of Done = condition pour dire termine
```

### Phrase simple

```text
Scrum aide l'equipe a organiser le travail par sprints, livrer progressivement, recevoir du feedback et s'ameliorer continuellement.
```

### Scrum + DevOps

```text
Scrum donne le rythme.
DevOps donne l'automatisation.
Les deux ensemble permettent de livrer plus vite, plus proprement et avec plus de feedback.
```

## Sources officielles

- Scrum Guide: https://scrumguides.org/
- Atlassian Agile Scrum: https://www.atlassian.com/agile/scrum
- Jira Software Cloud Documentation: https://support.atlassian.com/jira-software-cloud/
