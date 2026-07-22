# Phase 11 — Setup AWS (Free Tier)

## 🎯 Objectif de cette phase

Créer un compte AWS et comprendre son offre gratuite (Free Tier), pour préparer le terrain avant de provisionner de l'infrastructure réelle avec Terraform (Phase 12). Cette phase est un pré-requis pratique, pas encore du "vrai" travail DevOps.

## 📖 Explication : pourquoi passer par AWS maintenant

Jusqu'ici tout tournait en local (Minikube). En entreprise, Kubernetes tourne sur un vrai cluster cloud (EKS sur AWS, AKS sur Azure, GKE sur GCP). On choisit **AWS** ici car c'est le cloud le plus demandé sur le marché et son Free Tier permet de pratiquer sans payer, **si tu fais attention à ce que tu déploies**.

## ⚠️ Point crucial sur le "gratuit"

Le Free Tier AWS n'est pas illimité : il combine des offres **"toujours gratuites"**, **"gratuites 12 mois"**, et des quotas mensuels précis. **Un cluster EKS managé n'est PAS gratuit** (~0,10$/heure juste pour le control plane, en plus des instances). Pour ce projet, on va donc rester sur des ressources qui rentrent dans le Free Tier réel :

| Service | Free Tier | Usage dans ce projet |
|---|---|---|
| **EC2** | 750h/mois d'instance `t2.micro` ou `t3.micro` pendant 12 mois | Une petite VM pour tester Terraform/Ansible |
| **S3** | 5 Go de stockage | Stocker un état Terraform (backend distant) |
| **IAM** | Toujours gratuit | Créer des utilisateurs/rôles avec permissions limitées |
| **VPC** | Toujours gratuit (la ressource réseau elle-même) | Réseau virtuel de test |

> 💡 On évite volontairement EKS (cluster Kubernetes managé) dans cette phase — trop coûteux pour un projet d'apprentissage. Kubernetes reste en local (Minikube) ; AWS sert ici à pratiquer Terraform/Ansible sur de vraies ressources cloud (VM EC2).

## 📝 Étapes détaillées

### 1. Crée un compte AWS
Rends-toi sur [aws.amazon.com](https://aws.amazon.com), crée un compte (carte bancaire demandée mais pas débitée si tu restes dans les limites gratuites).

### 2. Sécurise immédiatement ton compte (réflexe de sécurité obligatoire)
- Active la **MFA (authentification à deux facteurs)** sur le compte root
- **Ne travaille jamais avec le compte root au quotidien** — crée un utilisateur IAM dédié

### 3. Crée un utilisateur IAM pour Terraform

```bash
# Dans la console AWS : IAM → Users → Create user
# Nom : terraform-user
# Attache la policy : AdministratorAccess (pour apprendre — en vrai poste, on limite les permissions au strict nécessaire)
```

Génère des **Access Keys** pour cet utilisateur (tu en auras besoin pour Terraform).

> ⚠️ Ne commite JAMAIS ces clés sur Git. On les gérera comme variables d'environnement.

### 4. Installe l'AWS CLI et configure-le
```bash
# macOS
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install

# Configure avec tes clés
aws configure
# AWS Access Key ID: ...
# AWS Secret Access Key: ...
# Default region: eu-west-3 (Paris, par exemple)
```

### 5. Vérifie que ça fonctionne
```bash
aws sts get-caller-identity
```
Tu dois voir ton `UserId`, `Account`, et `Arn` s'afficher.

### 6. Configure une alerte de facturation (indispensable !)
Dans la console AWS : **Billing → Budgets → Create budget** → crée une alerte si le coût dépasse 1$. C'est ton filet de sécurité contre une ressource oubliée qui tourne.

## ⚠️ Erreurs fréquentes à éviter

- Oublier de supprimer une ressource après un test → facturation surprise. Prends l'habitude de vérifier `aws ec2 describe-instances` régulièrement pendant ce projet.
- Committer les Access Keys sur GitHub → utilise des variables d'environnement (`export AWS_ACCESS_KEY_ID=...`) ou un fichier `.env` ignoré par Git.
- Utiliser le compte root au quotidien.

## ✅ Checklist de validation avant de passer à la Phase 12

- [ ] Compte AWS créé, MFA activée sur le root
- [ ] Utilisateur IAM `terraform-user` créé avec des Access Keys
- [ ] `aws sts get-caller-identity` fonctionne
- [ ] Une alerte de budget est configurée
- [ ] Tu sais expliquer pourquoi on n'utilise pas EKS dans ce projet

## 📚 Concepts à lire si besoin

- `concepts/06-aws-free-tier.md`

## ➡️ Étape suivante

Passe à `phases/12-terraform-provisioning.md`
