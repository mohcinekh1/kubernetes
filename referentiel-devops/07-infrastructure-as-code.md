# Pilier 07 - Infrastructure as Code IaC

## Objectif du cours

**Infrastructure as Code**, ou **IaC**, signifie gerer l'infrastructure avec du code.

Au lieu de creer manuellement des serveurs, reseaux, bases de donnees ou clusters dans une interface graphique, on les declare dans des fichiers.

Phrase simple :

```text
IaC = decrire l'infrastructure dans des fichiers versionnes.
```

Exemples d'infrastructure :

```text
VM
reseau
subnet
firewall
load balancer
database
cluster Kubernetes
bucket storage
registry
```

## Plan du cours

```text
PARTIE 1 - Comprendre Infrastructure as Code
PARTIE 2 - Pourquoi IaC est important en DevOps
PARTIE 3 - Outils IaC
PARTIE 4 - Terraform simplement
PARTIE 5 - Structure generale d'un projet Terraform
PARTIE 6 - Comment coder les fichiers Terraform
PARTIE 7 - Variables, outputs et state
PARTIE 8 - Workflow Terraform
PARTIE 9 - IaC dans CI/CD
PARTIE 10 - Logs et diagnostic IaC
PARTIE 11 - Bonnes pratiques
PARTIE 12 - Application a notre projet
PARTIE 13 - Questions d'entretien
PARTIE 14 - Resume final
```

## PARTIE 1 - Comprendre Infrastructure as Code

### 1. Probleme sans IaC

Sans IaC, on cree l'infrastructure manuellement.

Exemple :

```text
ouvrir AWS Console
creer une VM
creer un security group
creer une database
configurer reseau
noter les informations quelque part
```

Problemes :

```text
difficile a reproduire
risque d'erreur humaine
pas d'historique clair
pas de review
difficile de savoir qui a change quoi
environnements differents
```

### 2. Solution avec IaC

Avec IaC, on declare l'infrastructure dans des fichiers.

Exemple :

```text
main.tf
variables.tf
outputs.tf
```

Puis on applique :

```powershell
terraform apply
```

Avantages :

```text
reproductible
versionne dans Git
reviewable avec Pull Request
automatisable avec CI/CD
plus facile a detruire/recreer
historique clair
```

### 3. Declaratif vs imperatif

IaC est souvent declaratif.

Declaratif :

```text
je decris l'etat final voulu
```

Exemple :

```text
je veux une VM de type t3.micro
```

Imperatif :

```text
je donne les commandes etapes par etapes
```

Kubernetes et Terraform sont surtout declaratifs.

## PARTIE 2 - Pourquoi IaC est important en DevOps

### 4. Role dans le cycle DevOps

| Etape DevOps | Role IaC |
| --- | --- |
| Plan | definir l'architecture |
| Code | ecrire les fichiers infra |
| Build | verifier le code IaC |
| Test | valider syntaxe et plan |
| Release | versionner l'infrastructure |
| Deploy | creer ou modifier l'infra |
| Operate | maintenir l'etat |
| Monitor | detecter drift et incidents |

### 5. Lien avec Git

Avec IaC, l'infrastructure passe par Git :

```text
branche
commit
Pull Request
review
CI validation
merge
apply
```

Donc l'infra devient traçable.

### 6. Drift

Le drift signifie :

```text
l'infrastructure reelle n'est plus identique au code
```

Exemple :

```text
Quelqu'un modifie une regle firewall manuellement dans AWS
Mais le fichier Terraform n'a pas change
```

Solution :

```text
terraform plan
```

permet de detecter les differences.

## PARTIE 3 - Outils IaC

### 7. Terraform

Terraform est l'outil IaC le plus connu.

Il permet de gerer :

```text
AWS
Azure
GCP
Kubernetes
GitLab
GitHub
Docker
```

### 8. OpenTofu

OpenTofu est une alternative open source compatible avec Terraform.

### 9. Pulumi

Pulumi permet d'ecrire l'infrastructure avec des langages comme :

```text
TypeScript
Python
Go
C#
```

### 10. CloudFormation

CloudFormation est l'outil IaC natif AWS.

### 11. Bicep

Bicep est l'outil IaC pour Azure.

### 12. Kubernetes YAML

Les manifests Kubernetes sont aussi une forme d'IaC.

Exemple :

```text
Deployment
Service
Ingress
ConfigMap
```

Phrase importante :

```text
IaC ne veut pas dire seulement Terraform. Kubernetes YAML est aussi du code d'infrastructure applicative.
```

## PARTIE 4 - Terraform simplement

### 13. C'est quoi Terraform

Terraform lit des fichiers `.tf`, compare avec l'etat actuel, puis propose les changements.

Workflow :

```text
write -> init -> fmt -> validate -> plan -> apply
```

### 14. Provider

Un provider permet a Terraform de parler a une plateforme.

Exemples :

```text
aws
azurerm
google
kubernetes
docker
gitlab
github
```

### 15. Resource

Une resource est un objet cree par Terraform.

Exemples :

```text
aws_instance
aws_security_group
aws_s3_bucket
kubernetes_namespace
docker_container
```

### 16. Data source

Une data source lit une information existante.

Exemple :

```text
lire une image AMI existante
lire un VPC existant
lire un cluster existant
```

### 17. State

Le state garde la memoire de ce que Terraform gere.

Fichier local :

```text
terraform.tfstate
```

Important :

```text
Le state peut contenir des informations sensibles.
Il ne faut pas le pousser dans Git.
```

## PARTIE 5 - Structure generale d'un projet Terraform

Structure simple :

```text
infra/terraform/
  main.tf
  variables.tf
  outputs.tf
  providers.tf
  terraform.tfvars.example
```

Structure plus organisee :

```text
infra/terraform/
  environments/
    dev/
      main.tf
      variables.tf
      outputs.tf
    prod/
      main.tf
      variables.tf
      outputs.tf
  modules/
    network/
    vm/
    database/
```

Pour apprendre, commencer simple :

```text
main.tf
variables.tf
outputs.tf
providers.tf
```

## PARTIE 6 - Comment coder les fichiers Terraform

### 18. providers.tf

Role :

```text
declarer Terraform et le provider utilise
```

Exemple general :

```hcl
terraform {
  required_version = ">= 1.6.0"

  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}
```

### 19. variables.tf

Role :

```text
declarer les valeurs configurables
```

Exemple :

```hcl
variable "app_name" {
  description = "Application name"
  type        = string
  default     = "my-app"
}

variable "environment" {
  description = "Target environment"
  type        = string
  default     = "dev"
}

variable "container_port" {
  description = "Application container port"
  type        = number
  default     = 8080
}
```

### 20. main.tf

Role :

```text
declarer les ressources a creer
```

Exemple Docker simple :

```hcl
resource "docker_image" "nginx" {
  name = "nginx:1.27-alpine"
}

resource "docker_container" "web" {
  name  = var.app_name
  image = docker_image.nginx.image_id

  ports {
    internal = 80
    external = var.container_port
  }
}
```

### 21. outputs.tf

Role :

```text
afficher des informations utiles apres apply
```

Exemple :

```hcl
output "app_url" {
  value = "http://localhost:${var.container_port}"
}
```

### 22. terraform.tfvars.example

Role :

```text
montrer un exemple de valeurs sans exposer les vrais secrets
```

Exemple :

```hcl
app_name       = "my-app"
environment    = "dev"
container_port = 8080
```

## PARTIE 7 - Variables, outputs et state

### 23. Variables

Les variables rendent le code reutilisable.

Sans variable :

```hcl
name = "dev-backend"
```

Avec variable :

```hcl
name = "${var.environment}-backend"
```

### 24. Outputs

Les outputs affichent les informations utiles.

Exemples :

```text
URL de l'application
IP publique
nom du cluster
nom du bucket
```

### 25. State

Le state est tres important.

Il permet a Terraform de savoir :

```text
ce qui existe deja
ce qui doit etre cree
ce qui doit etre modifie
ce qui doit etre supprime
```

Bonnes pratiques :

```text
ne pas pousser terraform.tfstate dans Git
utiliser un backend distant en equipe
proteger le state
```

## PARTIE 8 - Workflow Terraform

### 26. Initialiser

Commande :

```powershell
terraform init
```

Role :

```text
telecharger les providers et preparer le dossier Terraform
```

### 27. Formater

Commande :

```powershell
terraform fmt
```

Role :

```text
formatter les fichiers .tf
```

### 28. Valider

Commande :

```powershell
terraform validate
```

Role :

```text
verifier la syntaxe et la structure Terraform
```

### 29. Planifier

Commande :

```powershell
terraform plan
```

Role :

```text
montrer ce que Terraform va creer, modifier ou supprimer
```

### 30. Appliquer

Commande :

```powershell
terraform apply
```

Role :

```text
executer les changements proposes
```

### 31. Detruire

Commande :

```powershell
terraform destroy
```

Role :

```text
supprimer les ressources gerees par Terraform
```

Attention :

```text
commande dangereuse, a utiliser avec prudence
```

## PARTIE 9 - IaC dans CI/CD

### 32. CI pour IaC

Dans la CI, on verifie :

```text
terraform fmt -check
terraform validate
terraform plan
security scan IaC
```

Exemple GitLab :

```yaml
validate-terraform:
  stage: validate
  image: hashicorp/terraform:1.9
  script:
    - cd infra/terraform
    - terraform init
    - terraform fmt -check
    - terraform validate
```

### 33. CD pour IaC

Dans le CD, on peut appliquer :

```text
terraform apply
```

Souvent :

```text
plan automatique
apply manuel
```

Exemple :

```yaml
apply-terraform:
  stage: deploy
  image: hashicorp/terraform:1.9
  script:
    - cd infra/terraform
    - terraform init
    - terraform apply -auto-approve
  when: manual
```

### 34. Pourquoi apply manuel

Parce que Terraform peut creer, modifier ou supprimer de vraies ressources.

Donc en production :

```text
terraform plan -> automatique
terraform apply -> manuel avec validation
```

## PARTIE 10 - Logs et diagnostic IaC

### 35. Logs Terraform

Lire les sorties :

```text
terraform init
terraform validate
terraform plan
terraform apply
```

Ce qu'il faut comprendre :

```text
+ create
~ update
- destroy
```

Exemple :

```text
Plan: 2 to add, 1 to change, 0 to destroy.
```

Signification :

```text
Terraform va creer 2 ressources, modifier 1 ressource, supprimer 0 ressource
```

### 36. Erreurs frequentes

Erreur :

```text
provider not installed
```

Correction :

```powershell
terraform init
```

Erreur :

```text
Unsupported argument
```

Signification :

```text
un champ n'existe pas pour cette resource
```

Erreur :

```text
Invalid value for variable
```

Signification :

```text
la valeur donnee ne respecte pas le type ou la validation
```

Erreur :

```text
Error acquiring the state lock
```

Signification :

```text
un autre terraform apply utilise deja le state
```

### 37. Diagnostic IaC

Methode :

```text
1. Lire le message d'erreur exact
2. Identifier le fichier et la ligne
3. Verifier le provider
4. Verifier la resource
5. Verifier les variables
6. Relancer terraform fmt
7. Relancer terraform validate
8. Relancer terraform plan
```

## PARTIE 11 - Bonnes pratiques

### 38. Versionner le code IaC

A versionner :

```text
main.tf
variables.tf
outputs.tf
providers.tf
terraform.tfvars.example
modules
```

A ne pas versionner :

```text
terraform.tfstate
.terraform/
terraform.tfvars avec secrets
crash logs
```

### 39. Utiliser .gitignore

Exemple :

```text
.terraform/
*.tfstate
*.tfstate.*
terraform.tfvars
crash.log
```

### 40. Faire review

Une Pull Request IaC doit montrer :

```text
ressources ajoutees
ressources modifiees
ressources supprimees
impact cout
impact securite
plan Terraform
```

### 41. Eviter les secrets

Ne pas mettre :

```hcl
password = "secret"
```

Utiliser :

```text
variables CI/CD
secret manager
vault
variables sensibles
```

### 42. Faire petit

Eviter une PR qui cree tout :

```text
network + cluster + database + monitoring + securite
```

Preferer :

```text
une PR par bloc logique
```

## PARTIE 12 - Application a notre projet

### 43. Notre situation actuelle

Dans notre projet, on a deja de l'IaC applicative avec :

```text
infra/k8s/*.yaml
```

Ces fichiers declarent :

```text
namespace
deployments
services
configmap
secret
pvc
ingress
hpa
```

### 44. Ce qu'on pourra ajouter plus tard

Une phase Terraform pourrait creer :

```text
VM Ubuntu
reseau cloud
cluster Kubernetes managé
registry
security groups
database cloud
```

Exemple de structure future :

```text
infra/terraform/
  providers.tf
  main.tf
  variables.tf
  outputs.tf
  terraform.tfvars.example
```

### 45. Lien avec Kubernetes

Terraform peut creer l'infrastructure.

Kubernetes YAML peut deployer l'application.

Schema :

```text
Terraform -> cree cluster, reseau, registry
Kubernetes YAML -> deploie frontend, backend, database
```

## PARTIE 13 - Questions d'entretien

### Question 1

**C'est quoi Infrastructure as Code ?**

Reponse :

```text
IaC consiste a gerer l'infrastructure avec des fichiers versionnes au lieu de la configurer manuellement.
```

### Question 2

**Pourquoi utiliser Terraform ?**

Reponse :

```text
Terraform permet de declarer, versionner, planifier et appliquer l'infrastructure de maniere reproductible sur plusieurs plateformes.
```

### Question 3

**C'est quoi terraform plan ?**

Reponse :

```text
terraform plan montre les changements que Terraform va faire avant de les appliquer.
```

### Question 4

**C'est quoi le state Terraform ?**

Reponse :

```text
Le state est la memoire de Terraform. Il garde la correspondance entre le code et les ressources reelles.
```

### Question 5

**Pourquoi ne pas pousser terraform.tfstate dans Git ?**

Reponse :

```text
Parce que le state peut contenir des informations sensibles et doit etre protege.
```

### Question 6

**Difference entre Terraform et Kubernetes YAML ?**

Reponse :

```text
Terraform gere souvent l'infrastructure cloud. Kubernetes YAML gere les objets applicatifs dans le cluster.
```

## PARTIE 14 - Resume final

### A retenir

```text
IaC = infrastructure en fichiers
Terraform = outil IaC declaratif
Provider = connexion a une plateforme
Resource = objet gere
Variable = valeur configurable
Output = valeur affichee
State = memoire de Terraform
Plan = simulation des changements
Apply = application des changements
```

### Phrase simple

```text
IaC permet de creer et modifier l'infrastructure de maniere reproductible, versionnee et automatisable.
```

### Phrase d'entretien

```text
Infrastructure as Code est essentielle en DevOps parce qu'elle rend l'infrastructure reproductible, tracable, reviewable et automatisable dans les pipelines CI/CD.
```

## Sources officielles

- Terraform Docs: https://developer.hashicorp.com/terraform/docs
- Terraform Language: https://developer.hashicorp.com/terraform/language
- OpenTofu Docs: https://opentofu.org/docs/
- Kubernetes Documentation: https://kubernetes.io/docs/
