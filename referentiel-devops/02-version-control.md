# Pilier 02 - Version Control

## Objectif du cours

Le **Version Control** permet de suivre l'historique du code et de travailler a plusieurs sans perdre les modifications.

Dans DevOps, c'est un pilier fondamental parce que tout commence par le code :

```text
application
configuration
Dockerfile
manifests Kubernetes
pipeline CI/CD
documentation
```

Phrase importante :

```text
Tout ce qui est important pour construire, tester et deployer le projet doit etre versionne.
```

## Plan du cours

```text
PARTIE 1 - Comprendre le Version Control
PARTIE 2 - Git, GitHub et GitLab
PARTIE 3 - Les concepts fondamentaux Git
PARTIE 4 - Les commandes Git essentielles
PARTIE 5 - Branches, commits et workflow collaboratif
PARTIE 6 - Pull Request et Merge Request
PARTIE 7 - Conflits Git et resolution
PARTIE 8 - Tags, releases et versions
PARTIE 9 - Bonnes pratiques DevOps
PARTIE 10 - Application a notre projet
PARTIE 11 - Questions d'entretien
PARTIE 12 - Resume final
```

## PARTIE 1 - Comprendre le Version Control

### 1. Definition

Le Version Control est un systeme qui garde l'historique des modifications d'un projet.

Il permet de savoir :

```text
qui a modifie quoi
quand la modification a ete faite
pourquoi elle a ete faite
quels fichiers ont change
comment revenir en arriere si besoin
```

### 2. Pourquoi c'est important

Sans Version Control :

```text
on ecrase le travail des autres
on ne sait pas qui a change quoi
on perd les anciennes versions
on ne peut pas revenir facilement en arriere
on travaille avec des fichiers comme projet-final-v2-vrai-final.zip
```

Avec Version Control :

```text
historique clair
collaboration propre
branches separees
reviews de code
retour en arriere possible
integration avec CI/CD
```

### 3. Lien avec le cycle DevOps

| Etape DevOps | Role du Version Control |
| --- | --- |
| Plan | Lier tickets et branches |
| Code | Versionner le code |
| Build | Declencher CI apres push |
| Test | Tester chaque changement |
| Release | Creer tags et versions |
| Deploy | Deployer une version connue |
| Operate | Identifier le commit en production |
| Monitor | Relier bug a une version |
| Feedback | Corriger puis refaire une branche |

Phrase a retenir :

```text
Le Version Control donne la tracabilite du projet.
```

## PARTIE 2 - Git, GitHub et GitLab

### 4. C'est quoi Git ?

Git est l'outil qui gere les versions localement et a distance.

Avec Git, on peut :

```text
initialiser un projet
suivre les fichiers
creer des commits
creer des branches
fusionner des changements
revenir a une ancienne version
```

### 5. C'est quoi GitHub ?

GitHub est une plateforme qui heberge des repositories Git.

GitHub ajoute :

```text
Pull Requests
code review
issues
projects
GitHub Actions
wiki
releases
```

### 6. C'est quoi GitLab ?

GitLab est aussi une plateforme Git.

GitLab ajoute :

```text
Merge Requests
GitLab CI/CD
container registry
issues
boards
packages
security scans
```

### 7. Difference simple

| Outil | Role |
| --- | --- |
| Git | Outil de version control |
| GitHub | Plateforme Git + collaboration |
| GitLab | Plateforme Git + CI/CD integre |

Phrase simple :

```text
Git est le moteur. GitHub et GitLab sont des plateformes autour de Git.
```

## PARTIE 3 - Les concepts fondamentaux Git

### 8. Repository

Un repository est un projet suivi par Git.

Exemple :

```text
k8s-migration-project
```

Il contient :

```text
code
historique
branches
commits
configuration Git
```

### 9. Working directory

Le working directory est ton dossier de travail.

Exemple :

```text
C:\Users\user\Desktop\k8s-migration-project
```

C'est ici que tu modifies les fichiers.

### 10. Staging area

La staging area est la zone de preparation avant commit.

Commande :

```powershell
git add README.md
```

Role :

```text
preparer README.md pour le prochain commit
```

### 11. Commit

Un commit est un point d'historique.

Il contient :

```text
les fichiers modifies
un message
un auteur
une date
un identifiant unique
```

Exemple :

```text
4c0c8fe test
```

### 12. Branch

Une branche est une ligne de travail separee.

Exemple :

```text
main
docs/test-pull-request
fix/K8S-24-nginx-api-proxy
```

Role :

```text
travailler sans casser main
```

### 13. Remote

Un remote est un repository distant.

Exemple dans notre projet :

```text
origin -> GitHub
gitlab -> GitLab
```

Commande :

```powershell
git remote -v
```

### 14. Merge

Merge veut dire fusionner une branche dans une autre.

Exemple :

```text
docs/test-pull-request -> main
```

Apres merge :

```text
main contient les changements de la branche
```

## PARTIE 4 - Les commandes Git essentielles

### 15. Verifier l'etat du projet

Commande :

```powershell
git status
```

Role :

```text
affiche la branche actuelle et les fichiers modifies
```

### 16. Voir les branches

Commande :

```powershell
git branch
```

Role :

```text
affiche les branches locales
```

Voir toutes les branches :

```powershell
git branch -a
```

### 17. Creer une branche

Commande :

```powershell
git checkout -b docs/update-readme
```

Role :

```text
cree une branche et bascule dessus
```

### 18. Changer de branche

Commande :

```powershell
git checkout main
```

Role :

```text
bascule vers la branche main
```

### 19. Ajouter un fichier au staging

Commande :

```powershell
git add README.md
```

Role :

```text
prepare README.md pour le commit
```

### 20. Creer un commit

Commande :

```powershell
git commit -m "docs: update README"
```

Role :

```text
enregistre les changements dans l'historique Git
```

### 21. Envoyer vers GitHub ou GitLab

Vers GitHub :

```powershell
git push origin main
```

Vers GitLab :

```powershell
git push gitlab main
```

Role :

```text
envoie les commits vers le repository distant
```

### 22. Recuperer les changements

Commande :

```powershell
git pull origin main
```

Role :

```text
recupere les changements de GitHub main vers ton local
```

### 23. Voir l'historique

Commande :

```powershell
git log --oneline --graph --decorate --all
```

Role :

```text
affiche l'historique des commits sous forme compacte
```

Pour sortir :

```text
q
```

### 24. Voir les differences

Commande :

```powershell
git diff
```

Role :

```text
affiche les modifications non ajoutees au staging
```

Voir les fichiers changes entre deux branches :

```powershell
git diff --name-status origin/main...docs/test-pull-request
```

## PARTIE 5 - Branches, commits et workflow collaboratif

### 25. Pourquoi utiliser des branches

On utilise des branches pour isoler le travail.

Sans branche :

```text
tout le monde modifie main directement
risque de casser le projet
pas de review claire
```

Avec branche :

```text
main reste stable
chaque changement est separe
on peut reviewer avant merge
```

### 26. Convention de nommage

Exemples :

```text
feature/K8S-12-health-endpoint
fix/K8S-24-nginx-api-proxy
docs/K8S-30-update-readme
chore/K8S-40-cleanup
```

Structure :

```text
type/ticket-description
```

### 27. Types de branches

| Type | Role |
| --- | --- |
| feature | Nouvelle fonctionnalite |
| fix | Correction bug |
| docs | Documentation |
| chore | Tache technique |
| test | Ajout de tests |
| refactor | Amelioration interne du code |

### 28. Bons commits

Mauvais messages :

```text
test
update
final
fix
```

Bons messages :

```text
docs: add startup guide
fix: update frontend nginx proxy
ci: add GitLab pipeline
k8s: add backend deployment probes
```

### 29. Workflow simple

```text
git checkout main
git pull origin main
git checkout -b docs/update-readme
modifier fichier
git add README.md
git commit -m "docs: update README"
git push -u origin docs/update-readme
ouvrir Pull Request
review
merge
```

## PARTIE 6 - Pull Request et Merge Request

### 30. Pull Request

Une Pull Request est une demande de fusion dans GitHub.

Elle permet de :

```text
montrer les changements
demander une review
lancer les tests
discuter du code
fusionner dans main
```

### 31. Merge Request

Une Merge Request est la meme idee dans GitLab.

GitHub :

```text
Pull Request
```

GitLab :

```text
Merge Request
```

### 32. Ce qu'il faut verifier avant merge

```text
Files changed
Commits
Checks
Conversation
Review approval
```

Si la PR contient des fichiers que tu ne veux pas :

```text
ne pas merge
corriger la branche
ou fermer la PR
```

### 33. Merge pull request

Quand tu cliques sur :

```text
Merge pull request
Confirm merge
```

Alors :

```text
la branche est fusionnee dans main
main contient les changements
la PR passe en Merged
```

### 34. Close pull request

Si tu cliques :

```text
Close pull request
```

Alors :

```text
la PR est fermee sans fusion
main ne change pas
```

### 35. Revert pull request

Si une PR est deja mergee, on ne peut pas la supprimer de l'historique.

On utilise :

```text
Revert
```

Role :

```text
creer une nouvelle PR qui annule les changements de l'ancienne PR
```

## PARTIE 7 - Conflits Git et resolution

### 36. C'est quoi un conflit Git

Un conflit arrive quand deux branches modifient la meme partie d'un fichier.

Exemple :

```text
main modifie README.md ligne 10
ta branche modifie aussi README.md ligne 10
Git ne sait pas quelle version choisir
```

### 37. Exemple de conflit

Git affiche :

```text
<<<<<<< HEAD
Version de main
=======
Version de ta branche
>>>>>>> docs/update-readme
```

Tu dois choisir le bon contenu, puis supprimer les marqueurs.

### 38. Etapes pour resoudre

```powershell
git status
```

Ouvrir le fichier en conflit.

Corriger le contenu.

Puis :

```powershell
git add README.md
git commit -m "fix: resolve README conflict"
```

### 39. Bonne pratique

Avant de commencer une branche :

```powershell
git checkout main
git pull origin main
git checkout -b ma-branche
```

Cela reduit les conflits.

## PARTIE 8 - Tags, releases et versions

### 40. C'est quoi un tag

Un tag marque une version importante du projet.

Exemple :

```text
v1.0.0
v1.1.0
v2.0.0
```

### 41. Creer un tag

Commande :

```powershell
git tag v1.0.0
git push origin v1.0.0
```

Role :

```text
marquer et envoyer une version precise du projet
```

### 42. Semantic Versioning

Format :

```text
MAJOR.MINOR.PATCH
```

Exemple :

```text
1.2.3
```

Signification :

| Partie | Role |
| --- | --- |
| MAJOR | changement incompatible |
| MINOR | nouvelle fonctionnalite compatible |
| PATCH | correction bug |

## PARTIE 9 - Bonnes pratiques DevOps

### 43. Tout versionner sauf les secrets

A versionner :

```text
code application
Dockerfile
docker-compose.yml
manifests Kubernetes
README
pipeline CI/CD
scripts utiles
```

A ne pas versionner :

```text
.env avec vrais secrets
mots de passe
tokens
cles privees SSH
fichiers temporaires
node_modules
```

### 44. Utiliser .gitignore

Le fichier `.gitignore` indique a Git quoi ignorer.

Exemple :

```text
.env
node_modules/
*.log
```

### 45. Proteger main

Dans un projet professionnel, `main` doit etre protegee.

Regles possibles :

```text
interdire push direct sur main
obliger Pull Request
obliger CI successful
obliger review
```

### 46. Petites Pull Requests

Une bonne PR doit etre :

```text
petite
claire
testable
liee a un ticket
facile a reviewer
```

### 47. Tracabilite

Relier :

```text
ticket Jira
branche Git
commit
Pull Request
pipeline CI/CD
deploiement
```

## PARTIE 10 - Application a notre projet

### 48. Remotes du projet

Dans notre projet, on a deux remotes :

```text
origin -> GitHub
gitlab -> GitLab
```

Commande :

```powershell
git remote -v
```

### 49. Exemple de branche propre

```powershell
git checkout main
git pull origin main
git checkout -b docs/K8S-50-update-readme
```

### 50. Exemple de commit

```powershell
git add README.md
git commit -m "docs: update project README"
```

### 51. Exemple de push

Vers GitHub :

```powershell
git push -u origin docs/K8S-50-update-readme
```

Vers GitLab :

```powershell
git push -u gitlab docs/K8S-50-update-readme
```

### 52. Attention dans notre projet

On a deja vu un cas important :

```text
main local suivait gitlab/main
la PR GitHub comparait avec origin/main
```

Resultat :

```text
GitHub affichait 4 fichiers au lieu de seulement README.md
```

Lecon :

```text
Avant une PR GitHub, creer la branche depuis origin/main.
Avant une MR GitLab, creer la branche depuis gitlab/main.
```

Commande pour GitHub :

```powershell
git fetch origin
git checkout -B ma-branche origin/main
```

## PARTIE 11 - Questions d'entretien

### Question 1

**C'est quoi Git ?**

Reponse :

```text
Git est un systeme de controle de version qui permet de suivre l'historique du code, travailler avec des branches et collaborer a plusieurs.
```

### Question 2

**Difference entre Git et GitHub ?**

Reponse :

```text
Git est l'outil de version control. GitHub est une plateforme qui heberge des repositories Git et ajoute Pull Requests, reviews, issues et CI/CD.
```

### Question 3

**C'est quoi un commit ?**

Reponse :

```text
Un commit est un point d'historique qui enregistre des modifications avec un message, un auteur et un identifiant unique.
```

### Question 4

**Pourquoi utiliser des branches ?**

Reponse :

```text
Pour isoler le travail, eviter de casser main, permettre les reviews et tester avant fusion.
```

### Question 5

**C'est quoi une Pull Request ?**

Reponse :

```text
Une Pull Request est une demande de fusion d'une branche vers une autre, avec discussion, review et tests.
```

### Question 6

**Comment annuler une PR deja mergee ?**

Reponse :

```text
On utilise Revert. GitHub cree une nouvelle PR qui annule les changements de la PR mergee.
```

### Question 7

**Pourquoi ne pas mettre les secrets dans Git ?**

Reponse :

```text
Parce que Git garde l'historique. Meme si on supprime un secret plus tard, il peut rester visible dans les anciens commits.
```

## PARTIE 12 - Resume final

### A retenir

```text
Version Control = historique + collaboration + tracabilite
Git = outil principal
GitHub/GitLab = plateformes collaboratives
Branch = espace de travail separe
Commit = point d'historique
Pull Request / Merge Request = demande de fusion
Merge = integration dans main
Revert = annulation propre
Tag = marqueur de version
```

### Phrase d'entretien

```text
Le Version Control est essentiel en DevOps parce qu'il permet de tracer chaque changement du code, collaborer avec branches et Pull Requests, declencher les pipelines CI/CD et revenir en arriere proprement en cas de probleme.
```

## Sources officielles

- Git documentation: https://git-scm.com/doc
- GitHub Docs: https://docs.github.com/
- GitLab Docs: https://docs.gitlab.com/
