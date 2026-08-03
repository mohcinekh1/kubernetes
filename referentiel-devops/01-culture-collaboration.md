# Pilier 01 - Culture et Collaboration DevOps

## Plan du cours

```text
PARTIE 1 - Vision generale du pilier
PARTIE 2 - Principes et modeles culturels
PARTIE 3 - Roles et outils de collaboration
PARTIE 4 - Documents et artefacts d'equipe
PARTIE 5 - Workflow Git collaboratif
PARTIE 6 - Rituels, bonnes pratiques et anti-patterns
PARTIE 7 - Application au projet Kubernetes Migration Lab
PARTIE 8 - Preparation entretien et checklist
```

## PARTIE 1 - Vision generale du pilier

### 1. Objectif du pilier

Le pilier Culture et Collaboration est la base de DevOps.

DevOps ne commence pas par Docker, Kubernetes ou CI/CD. Il commence par une maniere de travailler :

```text
developpeurs + operations + securite + QA + metier
-> travaillent ensemble
-> partagent les responsabilites
-> automatisent ce qui est repetitif
-> apprennent des incidents
-> ameliorent le produit en continu
```

Objectif principal :

```text
reduire la distance entre ceux qui construisent l'application et ceux qui la livrent/exploitent
```

### 2. Lien avec le cycle de vie DevOps

Cycle DevOps :

```text
Plan -> Code -> Build -> Test -> Release -> Deploy -> Operate -> Monitor -> Feedback
```

Culture et Collaboration sont presentes dans tout le cycle :

| Etape | Role de la collaboration |
| --- | --- |
| Plan | Comprendre le besoin, prioriser, clarifier |
| Code | Travailler avec Git, branches, revues de code |
| Build | Partager les standards de build |
| Test | Definir ce qui doit etre teste |
| Release | Valider ce qui est pret a livrer |
| Deploy | Aligner dev/ops sur le deploiement |
| Operate | Gerer les incidents ensemble |
| Monitor | Lire les logs, metriques et alertes |
| Feedback | Ameliorer le backlog et les pratiques |

Phrase a retenir :

```text
Culture et Collaboration relient toutes les etapes du cycle DevOps.
```

### 3. Pourquoi c'est important

Sans culture DevOps, les outils ne suffisent pas.

Exemple sans DevOps :

```text
Developpeur : "Ca marche sur ma machine."
Ops : "En production, ca ne marche pas."
Securite : "On decouvre les failles trop tard."
QA : "Les tests arrivent a la fin."
Metier : "La livraison ne correspond pas au besoin."
```

Avec DevOps :

```text
besoin clair
code versionne
tests automatises
pipeline visible
deploiement reproductible
monitoring partage
feedback rapide
```

## PARTIE 2 - Principes et modeles culturels

### 4. Principes fondamentaux

#### 4.1 Responsabilite partagee

Avant :

```text
Dev construit
Ops exploite
Securite controle a la fin
```

DevOps :

```text
Toute l'equipe est responsable de la qualite, de la livraison et de la stabilite.
```

Cela ne veut pas dire que tout le monde fait le meme metier.

Cela veut dire :

```text
chacun garde son expertise, mais les objectifs sont communs.
```

#### 4.2 Communication transparente

Les decisions importantes doivent etre visibles :

- pourquoi on deploye
- ce qui change
- quels risques existent
- comment revenir en arriere
- qui valide
- comment surveiller apres deploiement

#### 4.3 Automatisation progressive

On automatise ce qui est repetitif ou risque.

Exemples :

- tests
- build Docker
- scan securite
- deploiement Kubernetes
- creation d'infrastructure
- configuration serveur

#### 4.4 Amelioration continue

Apres chaque incident ou blocage :

```text
on cherche la cause
on documente
on ameliore le processus
```

But :

```text
ne pas repeter la meme erreur.
```

#### 4.5 Feedback court

Plus le feedback arrive tot, moins le probleme coute cher.

Exemple :

```text
erreur detectee au commit -> facile
erreur detectee en production -> couteux
```

### 5. Modeles culturels utiles

#### 5.1 CALMS

CALMS est un modele souvent utilise pour expliquer DevOps.

```text
C - Culture
A - Automation
L - Lean
M - Measurement
S - Sharing
```

| Element | Explication |
| --- | --- |
| Culture | Collaboration, confiance, responsabilite partagee |
| Automation | Automatiser tests, builds, deploys |
| Lean | Reduire gaspillage et blocages |
| Measurement | Mesurer qualite, delai, stabilite |
| Sharing | Partager connaissances, incidents, standards |

#### 5.2 CAMS

Version plus courte :

```text
Culture
Automation
Measurement
Sharing
```

## PARTIE 3 - Roles et outils de collaboration

### 6. Roles dans une equipe DevOps

#### Developpeur

Responsabilites :

- ecrire le code
- ecrire ou maintenir les tests
- comprendre les logs applicatifs
- penser a la production
- participer aux revues de code

#### Ops / Platform Engineer

Responsabilites :

- infrastructure
- Kubernetes
- reseau
- disponibilite
- monitoring
- automatisation du deploiement

#### QA / Test Engineer

Responsabilites :

- strategie de test
- tests fonctionnels
- tests automatises
- validation avant release

#### Security / DevSecOps

Responsabilites :

- scan dependances
- scan images
- secrets management
- policies
- revue securite

#### Product Owner / Metier

Responsabilites :

- prioriser les besoins
- clarifier les criteres d'acceptation
- valider la valeur livree

### 7. Outils de collaboration

#### 7.1 Gestion de travail

Outils :

```text
Jira
GitLab Issues
GitHub Issues
Azure Boards
Linear
Trello
```

Utilisation :

- creer les taches
- prioriser
- suivre l'avancement
- lier issues et merge requests
- documenter les bugs

Exemple de types de tickets :

```text
Feature
Bug
Task
Spike
Incident
Security
Documentation
```

#### 7.2 Documentation

Outils :

```text
Confluence
Notion
GitLab Wiki
GitHub Wiki
Markdown dans le repo
```

Documents utiles :

- README
- architecture
- runbook
- incident report
- decision record
- guide de lancement
- guide de deploiement

#### 7.3 Communication

Outils :

```text
Slack
Microsoft Teams
Discord
Email
GitLab comments
GitHub comments
```

Bonnes pratiques :

- discuter dans les issues/MR pour garder l'historique
- eviter les decisions importantes uniquement en message prive
- resumer les decisions dans le ticket ou la documentation

#### 7.4 Version Control

Outils :

```text
Git
GitHub
GitLab
Bitbucket
```

Utilisation :

- branches
- commits
- merge requests
- code review
- tags
- releases

#### 7.5 Tableaux et visualisation

Outils :

```text
Miro
Draw.io
Lucidchart
Excalidraw
Mermaid
```

Utilisation :

- schema architecture
- flux CI/CD
- flux Kubernetes
- cartographie incident

## PARTIE 4 - Documents et artefacts d'equipe

### 8. Artefacts importants

#### 8.1 README

Le README explique :

- objectif du projet
- architecture
- pre-requis
- installation
- commandes de lancement
- tests
- structure du repo

#### 8.2 Definition of Ready

Une tache est prete si :

- le besoin est clair
- les criteres d'acceptation existent
- les dependances sont connues
- le risque est compris
- l'equipe sait comment tester

Exemple :

```text
Une issue backend est Ready si l'endpoint attendu, le format JSON et les tests attendus sont definis.
```

#### 8.3 Definition of Done

Une tache est terminee si :

- code pousse
- tests passent
- review faite
- pipeline vert
- documentation mise a jour si besoin
- deploiement valide
- monitoring/logs verifies si impact production

#### 8.4 Runbook

Un runbook explique quoi faire en cas de probleme.

Exemple :

```text
Si le backend ne repond pas :
1. kubectl get pods -n k8s-lab
2. kubectl logs deployment/backend -n k8s-lab
3. kubectl describe pod <pod> -n k8s-lab
4. verifier database-service
5. tester /health
```

#### 8.5 Postmortem

Document apres incident.

Structure :

```text
Titre
Date
Impact
Timeline
Cause racine
Ce qui a bien marche
Ce qui a mal marche
Actions correctives
Responsables
Deadline
```

Important :

```text
postmortem sans blame
```

On cherche a corriger le systeme, pas a accuser une personne.

#### 8.6 Architecture Decision Record

ADR = document court pour garder une decision technique.

Exemple :

```text
ADR-001 - Utiliser Kubernetes pour orchestrer les services

Contexte:
L'application contient frontend, backend et database.

Decision:
Utiliser Kubernetes avec Deployments et Services.

Consequences:
Il faut gerer manifests YAML, namespace, ingress et monitoring.
```

## PARTIE 5 - Workflow Git collaboratif

### 9. Workflow Git collaboratif

#### 9.1 Branches

Exemples :

```text
main
develop
feature/add-login
fix/backend-healthcheck
hotfix/production-api
chore/update-docs
```

Dans un projet simple :

```text
main + feature branches
```

suffisent.

#### 9.2 Commandes Git utiles

Verifier l'etat :

```bash
git status
```

Creer une branche :

```bash
git checkout -b feature/add-healthcheck
```

Ajouter les fichiers :

```bash
git add .
```

Commit :

```bash
git commit -m "Add backend healthcheck"
```

Envoyer la branche :

```bash
git push -u origin feature/add-healthcheck
```

Voir l'historique :

```bash
git log --oneline --graph --decorate
```

Mettre a jour la branche :

```bash
git pull
```

#### 9.3 Merge Request

Une Merge Request sert a :

- discuter du changement
- verifier le pipeline
- faire une revue de code
- garder l'historique
- valider avant merge

Checklist de MR :

```text
[ ] Le besoin est clair
[ ] Le code est teste
[ ] Le pipeline est vert
[ ] Les secrets ne sont pas commit
[ ] La documentation est mise a jour
[ ] Le rollback est possible
```

### 10. Templates utiles

#### 10.1 Merge Request template GitLab

Fichier :

```text
.gitlab/merge_request_templates/default.md
```

Exemple :

```markdown
## Objectif

Explique le changement.

## Type de changement

- [ ] Feature
- [ ] Fix
- [ ] Refactor
- [ ] Documentation
- [ ] Security

## Tests

- [ ] Tests locaux
- [ ] Pipeline CI
- [ ] Verification Kubernetes si necessaire

## Risques

Quels risques ce changement introduit-il ?

## Rollback

Comment revenir en arriere ?
```

#### 10.2 Issue template

Fichier :

```text
.gitlab/issue_templates/bug.md
```

Exemple :

```markdown
## Description

Que se passe-t-il ?

## Etapes pour reproduire

1.
2.
3.

## Resultat attendu

Ce qui devait arriver.

## Resultat actuel

Ce qui arrive actuellement.

## Logs / captures

Ajouter logs ou captures.

## Environnement

- OS:
- Branch:
- Version:
```

#### 10.3 CODEOWNERS

Fichier :

```text
CODEOWNERS
```

Exemple :

```text
app/backend/ @backend-team
app/frontend/ @frontend-team
infra/k8s/ @platform-team
.gitlab-ci.yml @devops-team
```

Role :

```text
indiquer qui doit revoir quels fichiers
```

## PARTIE 6 - Rituels, bonnes pratiques et anti-patterns

### 11. Rituels DevOps

#### Daily

Questions :

```text
Qu'est-ce que j'ai fait ?
Qu'est-ce que je vais faire ?
Qu'est-ce qui me bloque ?
```

#### Planning

But :

```text
choisir les taches, clarifier le besoin, estimer l'effort
```

#### Review

But :

```text
montrer ce qui a ete livre
```

#### Retrospective

But :

```text
ameliorer la maniere de travailler
```

Questions utiles :

```text
Qu'est-ce qui a bien marche ?
Qu'est-ce qui a bloque ?
Qu'est-ce qu'on ameliore au prochain cycle ?
```

#### Incident review

But :

```text
comprendre un incident et eviter qu'il revienne
```

### 12. Bonnes pratiques

#### Rendre le travail visible

Tout changement important doit etre visible dans :

- issue
- merge request
- commit
- documentation
- pipeline

#### Ne pas cacher les problemes

Un incident cache devient plus grave.

DevOps encourage :

```text
transparence + reaction rapide + correction durable
```

#### Petits changements

Preferer :

```text
petits commits frequents
```

plutot que :

```text
gros changement difficile a relire
```

#### Standards communs

L'equipe doit partager :

- format des branches
- format des commits
- Definition of Done
- strategie de tests
- regles de review
- strategie de rollback

### 13. Anti-patterns

#### "Ca marche sur ma machine"

Probleme :

```text
l'environnement local est different de production
```

Solution :

```text
Docker, CI, environnements reproductibles
```

#### Silos

Probleme :

```text
Dev, Ops, QA, Sec travaillent separement
```

Solution :

```text
objectifs communs, rituels, documentation partagee
```

#### Pas de feedback

Probleme :

```text
les erreurs sont decouvertes trop tard
```

Solution :

```text
CI/CD, tests, monitoring, alertes
```

#### Secrets dans Git

Probleme :

```text
mot de passe expose
```

Solution :

```text
.env ignore, Secret Kubernetes, variables GitLab CI/CD
```

## PARTIE 7 - Application au projet Kubernetes Migration Lab

### 14. Application a notre projet

Dans notre projet Kubernetes Migration Lab :

Culture et Collaboration apparaissent dans :

- README projet
- guide de lancement
- GitHub/GitLab
- GitLab CI/CD
- rapports de phases locaux
- correction des erreurs pipeline
- separation projet deployable et documents pedagogiques
- discussion sur l'ordre DevOps

Exemples concrets :

```text
Probleme: GitHub contenait trop de fichiers pedagogiques.
Action: nettoyage du repo pour garder seulement le projet deployable.
```

```text
Probleme: GitLab CI validate echouait avec kubectl sans cluster.
Action: remplacement par kubeconform.
```

```text
Probleme: frontend Kubernetes servait une ancienne image latest.
Action: utilisation d'un tag explicite nginx-proxy-v1.
```

Ces exemples montrent :

```text
feedback -> correction -> documentation -> amelioration
```

## PARTIE 8 - Preparation entretien et checklist

### 15. Questions d'entretien

#### Question 1

```text
C'est quoi DevOps ?
```

Reponse :

```text
DevOps est une culture et un ensemble de pratiques qui rapprochent developpement, operations, securite et QA pour livrer plus vite, plus souvent et plus fiable.
```

#### Question 2

```text
DevOps, c'est seulement des outils ?
```

Reponse :

```text
Non. Les outils aident, mais DevOps commence par la collaboration, la responsabilite partagee, l'automatisation, la mesure et l'amelioration continue.
```

#### Question 3

```text
Comment eviter les silos dans une equipe DevOps ?
```

Reponse :

```text
Avec des objectifs communs, des reviews, des pipelines visibles, une documentation partagee, des postmortems sans blame et une responsabilite partagee de la production.
```

#### Question 4

```text
Pourquoi les petites livraisons sont preferees ?
```

Reponse :

```text
Elles sont plus faciles a tester, relire, deployer et rollback. Le risque est plus faible.
```

#### Question 5

```text
Quel est le lien entre collaboration et CI/CD ?
```

Reponse :

```text
La CI/CD rend le travail visible. Chaque push declenche des tests, builds et validations. Toute l'equipe voit rapidement si un changement est sain ou non.
```

### 16. Checklist pour n'importe quel projet

Avant de commencer :

```text
[ ] Le besoin est clair
[ ] Le repo Git existe
[ ] Le README explique comment lancer
[ ] Les secrets sont ignores
[ ] Les branches sont organisees
[ ] Le pipeline est visible
[ ] Les reviews sont definies
[ ] Les logs et tests sont accessibles
[ ] La Definition of Done est claire
[ ] Le rollback est pense
```

### 17. Resume

Culture et Collaboration sont le socle DevOps.

Sans ce pilier :

```text
les outils deviennent juste des commandes isolees
```

Avec ce pilier :

```text
les outils servent un workflow clair, partage et ameliorable
```

Phrase finale :

```text
DevOps est d'abord une culture de collaboration, puis une pratique d'automatisation et de mesure.
```

## Annexe - Logs et traces a suivre dans ce pilier

Dans le pilier Culture et Collaboration, les logs ne sont pas seulement des logs techniques.

Ici, on suit surtout les **traces de collaboration**.

### 18. Ou trouver les traces

Sources importantes :

```text
Jira tickets
GitHub Issues
GitHub Pull Requests
GitLab Merge Requests
commentaires de review
historique des decisions
postmortems
runbooks
messages d'incident
```

### 19. Ce qu'il faut verifier

Dans un ticket Jira ou une Issue :

```text
le besoin est clair
le responsable est defini
le statut est a jour
les blocages sont visibles
les criteres d'acceptation existent
les liens vers PR/MR sont presents
```

Dans une Pull Request ou Merge Request :

```text
la description explique le changement
les tests sont mentionnes
les commentaires sont traites
la review est approuvee
la CI est visible
```

Dans un incident/postmortem :

```text
ce qui s'est passe
impact utilisateur
cause principale
actions correctives
responsable des actions
date de suivi
```

### 20. Comment comprendre ces traces

Une bonne trace de collaboration doit repondre a ces questions :

```text
Qui a fait quoi ?
Pourquoi ce changement existe ?
Quel probleme est resolu ?
Comment cela a ete teste ?
Quel est le statut actuel ?
Quelle est la prochaine action ?
```

Si ces questions n'ont pas de reponse, la collaboration n'est pas assez claire.

### 21. Exemple pratique

Mauvais commentaire :

```text
ca marche pas
```

Bon commentaire :

```text
Le test /api/tasks echoue via Ingress avec une erreur 404.
Depuis backend-service le test fonctionne.
Je pense que le probleme vient de la configuration Nginx du frontend.
Commande utilisee :
curl http://k8s-lab.local/api/tasks
```

### 22. Phrase a retenir

```text
Dans Culture et Collaboration, les logs servent a comprendre le travail de l'equipe, pas seulement l'etat des machines.
```
