# Guide pratique - Culture et Collaboration avec Jira et GitHub

## Objectif du guide

Ce guide explique comment appliquer le pilier DevOps **Culture et Collaboration** avec deux outils tres utilises :

```text
Jira   -> organiser le travail, suivre les taches, rendre le projet visible
GitHub -> collaborer sur le code, faire des branches, Pull Requests, reviews
```

Le but n'est pas seulement d'utiliser des outils. Le but est de mieux travailler entre :

```text
Developpeurs
Ops / DevOps
QA / testeurs
Securite
Product Owner / metier
```

Phrase importante :

```text
Jira organise le travail.
GitHub organise le code.
DevOps relie les deux.
```

## Plan du guide

```text
PARTIE 1 - Comprendre Jira et GitHub dans DevOps
PARTIE 2 - Organisation du travail avec Jira
PARTIE 3 - Collaboration sur le code avec GitHub
PARTIE 4 - Workflow complet Jira + GitHub
PARTIE 5 - Commandes Git a connaitre
PARTIE 6 - Templates professionnels
PARTIE 7 - Bonnes pratiques d'equipe
PARTIE 8 - Exercice pratique complet
PARTIE 9 - Questions d'entretien
PARTIE 10 - Resume final
```

## PARTIE 1 - Comprendre Jira et GitHub dans DevOps

### 1. Role de Jira

Jira sert a suivre le travail d'une equipe.

Dans Jira, on cree des elements de travail :

```text
Epic
Story
Task
Bug
Sub-task
```

Dans un projet DevOps, Jira permet de repondre a ces questions :

```text
Qu'est-ce qu'il faut faire ?
Qui travaille dessus ?
Quel est l'etat de la tache ?
Est-ce bloque ?
Est-ce pret a etre livre ?
```

Exemple :

```text
Ticket Jira : K8S-12
Titre       : Ajouter un endpoint /health au backend
Statut      : In Progress
Assignee    : Developpeur backend
Priorite    : High
```

### 2. Role de GitHub

GitHub sert a gerer le code source avec Git.

GitHub permet de :

```text
stocker le code
creer des branches
proposer des changements avec Pull Request
faire une review de code
lancer CI/CD avec GitHub Actions
suivre les issues
documenter le projet avec README
```

Exemple :

```text
Branche GitHub : feature/K8S-12-health-endpoint
Pull Request   : Add backend health endpoint
Commit         : K8S-12 add health endpoint
```

### 3. Difference simple entre Jira et GitHub

| Outil | Role principal | Utilise par |
| --- | --- | --- |
| Jira | Organisation du travail | PO, dev, ops, QA |
| GitHub | Collaboration sur le code | Dev, DevOps, reviewers |
| GitHub Actions | Automatisation CI/CD | Dev, DevOps |
| GitHub Issues | Suivi simple des taches | Petite equipe |
| Jira Board | Suivi avance du projet | Equipe Agile/DevOps |

### 4. Pourquoi les lier ensemble

Si Jira et GitHub sont utilises separement, on perd la visibilite.

Mauvais exemple :

```text
Ticket Jira : en cours
Code GitHub : deja merge
Test CI     : failed
Equipe      : personne ne sait exactement quoi faire
```

Bon exemple :

```text
Ticket Jira : K8S-12
Branche     : feature/K8S-12-health-endpoint
PR GitHub   : liee au ticket
CI          : passed
Review      : approved
Statut Jira : Ready for Deploy
```

## PARTIE 2 - Organisation du travail avec Jira

### 5. Structure d'un projet Jira

Un projet Jira doit avoir une structure simple.

Pour notre type de projet DevOps :

```text
Project name : Kubernetes Migration Lab
Project key  : K8S
Type         : Kanban ou Scrum
```

### 6. Scrum ou Kanban ?

#### Scrum

Scrum est utile si l'equipe travaille par sprint.

Exemple :

```text
Sprint 1 : preparer application + Docker
Sprint 2 : Kubernetes manifests
Sprint 3 : GitLab CI/CD + monitoring
```

Scrum est pratique quand :

```text
le travail est planifie par periode
il y a une equipe stable
il y a des objectifs de sprint
```

#### Kanban

Kanban est utile si le travail avance en flux continu.

Exemple :

```text
Backlog -> To Do -> In Progress -> Review -> Done
```

Kanban est pratique quand :

```text
les taches arrivent progressivement
on veut limiter le travail en cours
on veut voir les blocages rapidement
```

Pour apprendre DevOps, je recommande :

```text
Kanban au debut
Scrum quand le projet devient plus organise
```

### 7. Types de tickets Jira

#### Epic

Un Epic est un grand bloc fonctionnel ou technique.

Exemples :

```text
K8S-1 Migrer l'application vers Kubernetes
K8S-2 Mettre en place CI/CD
K8S-3 Ajouter monitoring et logging
```

#### Story

Une Story represente un besoin utilisateur ou equipe.

Exemple :

```text
En tant que developpeur,
je veux lancer l'application avec Docker Compose,
afin de tester localement avant Kubernetes.
```

#### Task

Une Task est une action technique claire.

Exemples :

```text
Creer Dockerfile backend
Creer namespace Kubernetes
Ajouter ConfigMap backend
```

#### Bug

Un Bug represente un probleme.

Exemple :

```text
Le frontend retourne 404 quand on appelle /api/tasks via Ingress.
```

#### Sub-task

Une Sub-task decoupe une tache plus grande.

Exemple :

```text
Task  : Creer manifests Kubernetes
Sub 1 : Creer backend-deployment.yaml
Sub 2 : Creer backend-service.yaml
Sub 3 : Tester avec kubectl get pods
```

### 8. Workflow Jira recommande

Workflow simple :

```text
Backlog
-> To Do
-> In Progress
-> Code Review
-> Testing
-> Done
```

Role de chaque statut :

| Statut | Signification |
| --- | --- |
| Backlog | Idee ou tache pas encore priorisee |
| To Do | Tache prete a commencer |
| In Progress | Quelqu'un travaille dessus |
| Code Review | Code termine, en attente de review |
| Testing | Validation fonctionnelle ou technique |
| Done | Tache terminee et verifiee |

### 9. Definition of Ready

Une tache est Ready quand elle est assez claire pour commencer.

Checklist :

```text
[ ] Le besoin est clair
[ ] Le resultat attendu est defini
[ ] Les fichiers concernes sont connus
[ ] Les criteres d'acceptation sont ecrits
[ ] Les risques principaux sont connus
```

### 10. Definition of Done

Une tache est Done quand elle est vraiment terminee.

Checklist :

```text
[ ] Le code est termine
[ ] Les tests passent
[ ] La Pull Request est approuvee
[ ] La documentation est mise a jour
[ ] Le deploiement est verifie si necessaire
[ ] Le ticket Jira est ferme
```

## PARTIE 3 - Collaboration sur le code avec GitHub

### 11. Structure d'un repository GitHub

Un repository professionnel contient souvent :

```text
README.md
.gitignore
app/
infra/
docs/
.github/
  pull_request_template.md
  ISSUE_TEMPLATE/
```

Dans notre projet :

```text
app/        -> code application
infra/k8s/  -> manifests Kubernetes
README.md   -> guide projet
```

### 12. Branches GitHub

La branche principale doit etre stable :

```text
main
```

Pour travailler, on cree des branches :

```text
feature/K8S-12-health-endpoint
fix/K8S-20-frontend-api-404
docs/K8S-30-update-readme
chore/K8S-40-cleanup-config
```

Convention simple :

```text
type/TICKET-description
```

Types courants :

| Type | Role |
| --- | --- |
| feature | Nouvelle fonctionnalite |
| fix | Correction bug |
| docs | Documentation |
| chore | Tache technique |
| refactor | Amelioration du code sans changer le comportement |
| test | Ajout ou correction de tests |

### 13. Commit messages

Un commit doit expliquer clairement le changement.

Mauvais exemples :

```text
update
fix
test
final
```

Bons exemples :

```text
K8S-12 add backend health endpoint
K8S-20 fix nginx api proxy
K8S-30 document kubernetes startup commands
```

Format conseille :

```text
TICKET action courte
```

### 14. Pull Request

Une Pull Request est une demande de fusion du code.

Elle sert a :

```text
expliquer le changement
verifier le code
lancer les tests CI
demander une review
garder un historique propre
```

Une PR doit contenir :

```text
objectif
ticket lie
changements faits
tests realises
risques
captures ou logs si utile
```

### 15. Code Review

La review sert a ameliorer la qualite.

Le reviewer verifie :

```text
le code est clair
la solution respecte le besoin
les tests sont suffisants
la securite est correcte
la documentation est a jour
```

La review n'est pas faite pour critiquer la personne.

Phrase a retenir :

```text
On review le code, pas la personne.
```

## PARTIE 4 - Workflow complet Jira + GitHub

### 16. Cycle complet d'une tache

Workflow ideal :

```text
1. Creer un ticket Jira
2. Clarifier le besoin
3. Mettre le ticket en To Do
4. Creer une branche GitHub depuis main
5. Coder le changement
6. Faire des commits lies au ticket
7. Pousser la branche
8. Creer une Pull Request
9. Lancer CI
10. Faire review
11. Merger dans main
12. Deployer
13. Tester
14. Fermer le ticket Jira
```

### 17. Exemple concret

Ticket Jira :

```text
K8S-20
Titre : Corriger l'appel API du frontend via Ingress
Type  : Bug
```

Branche GitHub :

```text
fix/K8S-20-frontend-api-ingress
```

Commit :

```text
K8S-20 fix nginx proxy for frontend api calls
```

Pull Request :

```text
Title: K8S-20 Fix frontend API calls through Ingress
```

Tests :

```powershell
kubectl run frontend-api-test -n k8s-lab --image=busybox --restart=Never --rm -it -- wget -q -O- http://frontend-service/api/tasks
curl.exe http://k8s-lab.local/api/tasks
```

Resultat attendu :

```text
La commande retourne la liste JSON des tasks.
```

### 18. Mapping entre Jira et GitHub

| Jira | GitHub |
| --- | --- |
| Epic | Milestone ou Project |
| Story/Task/Bug | Issue ou ticket lie |
| Statut In Progress | Branche en cours |
| Code Review | Pull Request ouverte |
| Testing | CI + test manuel |
| Done | PR mergee + ticket ferme |

## PARTIE 5 - Commandes Git a connaitre

### 19. Preparation

Verifier ou on est :

```powershell
pwd
```

Role :

```text
Affiche le dossier courant.
```

Voir l'etat Git :

```powershell
git status
```

Role :

```text
Montre les fichiers modifies, ajoutes ou non suivis.
```

### 20. Creer une branche

Commande :

```powershell
git checkout -b feature/K8S-12-health-endpoint
```

Role :

```text
Cree une nouvelle branche et bascule dessus.
```

### 21. Ajouter les changements

Commande :

```powershell
git add app/backend/server.js
```

Role :

```text
Prepare un fichier pour le prochain commit.
```

Pour ajouter plusieurs fichiers :

```powershell
git add app infra README.md
```

### 22. Creer un commit

Commande :

```powershell
git commit -m "K8S-12 add backend health endpoint"
```

Role :

```text
Enregistre une version du changement dans Git.
```

### 23. Envoyer la branche vers GitHub

Commande :

```powershell
git push -u origin feature/K8S-12-health-endpoint
```

Role :

```text
Envoie la branche locale vers GitHub.
```

### 24. Recuperer les changements

Commande :

```powershell
git pull
```

Role :

```text
Recupere les derniers changements depuis le repository distant.
```

### 25. Voir l'historique

Commande :

```powershell
git log --oneline --graph --decorate --all
```

Role :

```text
Affiche l'historique Git sous forme compacte.
```

## PARTIE 6 - Templates professionnels

### 26. Template ticket Jira

```markdown
## Objectif

Expliquer le besoin en une ou deux phrases.

## Contexte

Pourquoi cette tache est necessaire ?

## Travail attendu

- [ ] Action 1
- [ ] Action 2
- [ ] Action 3

## Criteres d'acceptation

- [ ] Le comportement attendu fonctionne
- [ ] Les tests passent
- [ ] La documentation est mise a jour si necessaire

## Risques

Indiquer les risques techniques ou fonctionnels.

## Liens

Pull Request :
Documentation :
```

### 27. Template Pull Request GitHub

````markdown
## Ticket lie

Jira: K8S-XX

## Objectif

Decrire le but de cette PR.

## Changements

- Changement 1
- Changement 2
- Changement 3

## Tests realises

```text
commande 1
commande 2
```

## Resultat attendu

Decrire ce qui doit marcher apres merge.

## Risques

Indiquer les impacts possibles.

## Checklist

- [ ] Code relu
- [ ] Tests passes
- [ ] Documentation mise a jour
- [ ] Pas de secret dans le code
````

### 28. Template commentaire de review

Commentaire utile :

```text
Peux-tu expliquer pourquoi cette valeur est fixe ici ?
```

Commentaire precis :

```text
Cette fonction peut echouer si DATABASE_HOST est vide. On peut ajouter une valeur par defaut ou une validation au demarrage.
```

Commentaire a eviter :

```text
C'est mauvais.
```

## PARTIE 7 - Bonnes pratiques d'equipe

### 29. Regles simples

```text
1. Une tache Jira = une branche si possible
2. Une branche = un objectif clair
3. Une PR = une taille raisonnable
4. Un commit = un changement logique
5. Aucun secret dans Git
6. La documentation change avec le code
7. Les tests sont visibles dans la PR
```

### 30. Communication efficace

Dans Jira :

```text
commenter quand on est bloque
mettre a jour le statut
ajouter les liens vers PR
expliquer les decisions importantes
```

Dans GitHub :

```text
ouvrir une PR claire
demander une review
repondre aux commentaires
attendre la CI avant merge
```

### 31. Gestion des blocages

Si tu es bloque :

```text
1. Ajouter un commentaire dans Jira
2. Expliquer le probleme
3. Ajouter les logs ou captures
4. Mentionner la personne concernee
5. Proposer une piste de resolution
```

Exemple :

```text
Je suis bloque sur K8S-20.
Le frontend retourne 404 sur /api/tasks via Ingress.
Le backend-service fonctionne depuis un pod busybox.
Je pense que le probleme vient de la configuration Nginx du frontend.
```

### 32. Reunions utiles

Daily :

```text
Qu'est-ce que j'ai fait ?
Qu'est-ce que je vais faire ?
Est-ce que je suis bloque ?
```

Review :

```text
Montrer ce qui marche.
Verifier que le besoin est satisfait.
Recuperer du feedback.
```

Retrospective :

```text
Qu'est-ce qui a bien marche ?
Qu'est-ce qui a bloque ?
Qu'est-ce qu'on ameliore au prochain cycle ?
```

## PARTIE 8 - Exercice pratique complet

### 33. Scenario

Objectif :

```text
Ajouter une page documentation dans le frontend et suivre le travail avec Jira + GitHub.
```

### 34. Etape Jira

Creer un ticket :

```text
Type  : Task
Key   : K8S-31
Titre : Ajouter une section documentation dans le frontend
```

Description :

```text
Le frontend doit afficher une section Documentation qui explique les services de l'application :
- frontend
- backend
- database
```

Criteres d'acceptation :

```text
[ ] La section Documentation est visible
[ ] Le texte explique les 3 services
[ ] La page fonctionne dans Docker Compose
[ ] La page fonctionne dans Kubernetes
```

### 35. Etape GitHub

Creer une branche :

```powershell
git checkout main
git pull
git checkout -b feature/K8S-31-frontend-documentation-section
```

Modifier les fichiers frontend.

Verifier :

```powershell
docker compose up -d --build
```

Ajouter et commit :

```powershell
git status
git add app/frontend
git commit -m "K8S-31 add frontend documentation section"
```

Pousser :

```powershell
git push -u origin feature/K8S-31-frontend-documentation-section
```

Creer une Pull Request sur GitHub.

### 36. Etape review

Dans la PR, verifier :

```text
le code est clair
la section est visible
la CI passe
la documentation est correcte
```

### 37. Etape Done

Quand la PR est mergee :

```text
1. Verifier main
2. Deployer si necessaire
3. Tester l'application
4. Fermer le ticket Jira
```

## PARTIE 9 - Questions d'entretien

### Question 1

**Pourquoi utiliser Jira dans DevOps ?**

Reponse :

```text
Jira permet de rendre le travail visible, de suivre les priorites, les statuts, les blocages et les responsabilites.
```

### Question 2

**Pourquoi utiliser GitHub dans DevOps ?**

Reponse :

```text
GitHub permet de collaborer sur le code avec Git, branches, Pull Requests, reviews et automatisation CI/CD.
```

### Question 3

**Quelle est la difference entre Jira et GitHub Issues ?**

Reponse :

```text
GitHub Issues suffit pour un suivi simple proche du code.
Jira est plus avance pour les equipes, workflows, epics, sprints, reporting et priorisation.
```

### Question 4

**Pourquoi lier un ticket Jira avec une Pull Request ?**

Reponse :

```text
Pour garder la tracabilite entre le besoin, le code, les tests, la review et la livraison.
```

### Question 5

**C'est quoi une bonne Pull Request ?**

Reponse :

```text
Une bonne PR est petite, claire, liee a un ticket, testee, documentee et facile a reviewer.
```

## PARTIE 10 - Resume final

### A retenir

```text
Jira = planifier, suivre, prioriser, communiquer
GitHub = coder, versionner, reviewer, automatiser
Culture DevOps = connecter les personnes, les outils et les responsabilites
```

### Workflow ideal

```text
Jira ticket
-> Git branch
-> Code
-> Commit
-> Push
-> Pull Request
-> CI
-> Review
-> Merge
-> Deploy
-> Test
-> Jira Done
```

### Phrase d'entretien

```text
Dans une equipe DevOps, Jira donne la visibilite sur le travail et GitHub donne la tracabilite sur le code. Ensemble, ils permettent de collaborer, tester, reviewer et livrer plus proprement.
```

## Sources officielles

- GitHub Docs - Issues and Pull Requests: https://docs.github.com/
- Atlassian Support - Jira Software Cloud, Scrum/Kanban/workflows: https://support.atlassian.com/jira-software-cloud/
