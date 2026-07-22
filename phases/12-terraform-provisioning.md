# Phase 12 — Provisionner l'infra avec Terraform

## 🎯 Objectif de cette phase

Utiliser Terraform pour créer automatiquement une VM EC2 (et son réseau minimal) sur AWS, versionnée dans Git — au lieu de cliquer dans la console AWS.

## 📖 Explication : pourquoi cette phase compte

C'est le concept d'**Infrastructure as Code (IaC)** : ton infrastructure devient du code, versionné, relisable, reproductible. Si ta VM est supprimée par erreur, tu la recrées avec `terraform apply` — pas besoin de se souvenir de 15 clics dans une console.

## 🧩 Concepts clés à comprendre avant de coder

| Terme | Explication |
|---|---|
| **Provider** | Le plugin Terraform qui sait parler à un service précis (ici, AWS) |
| **Resource** | Un élément d'infrastructure que tu déclares (une VM, un VPC, une règle de firewall...) |
| **State (`terraform.tfstate`)** | Le fichier où Terraform mémorise ce qu'il a réellement créé — **fichier critique**, ne jamais le supprimer ni le committer avec des infos sensibles |
| **Plan** | Prévisualisation de ce que Terraform va faire, AVANT de le faire réellement |
| **Apply** | Exécute réellement les changements |
| **Destroy** | Supprime tout ce que Terraform a créé |

## 📝 Étapes détaillées

### 1. Installe Terraform
```bash
brew install terraform        # macOS
# ou télécharge depuis terraform.io pour Linux

terraform version
```

### 2. Crée la structure de ton projet Terraform
```
terraform/
├── main.tf          ← ressources principales
├── variables.tf      ← variables paramétrables
├── outputs.tf         ← valeurs affichées après apply (ex: IP publique)
└── terraform.tfvars   ← valeurs réelles des variables (ignoré par Git si sensible)
```

### 3. Écris `main.tf` — le strict minimum pour une VM EC2 Free Tier

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

resource "aws_security_group" "web_sg" {
  name        = "devops-project-sg"
  description = "Autorise SSH et HTTP"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]   # ⚠️ à restreindre à ton IP en vrai projet
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "devops_vm" {
  ami                    = var.ami_id
  instance_type          = "t2.micro"          # Éligible Free Tier
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  tags = {
    Name = "devops-learning-vm"
  }
}
```

### 4. Écris `variables.tf`
```hcl
variable "region" {
  default = "eu-west-3"
}

variable "ami_id" {
  description = "AMI Amazon Linux 2 ou Ubuntu, dépend de la région"
  type        = string
}
```

> 💡 Trouve l'AMI correcte pour ta région avec :
> ```bash
> aws ec2 describe-images --owners amazon --filters "Name=name,Values=ubuntu/images/hvm-ssd/ubuntu-jammy-22.04*" --query 'Images[*].[ImageId,Name]' --output table
> ```

### 5. Écris `outputs.tf`
```hcl
output "instance_public_ip" {
  value = aws_instance.devops_vm.public_ip
}
```

### 6. Le cycle de vie Terraform
```bash
terraform init      # Télécharge le provider AWS
terraform plan       # Prévisualise ce qui va être créé — LIS TOUJOURS ce résultat avant d'apply
terraform apply       # Crée réellement les ressources (tape "yes" pour confirmer)
```

### 7. Vérifie que ta VM tourne
```bash
terraform output instance_public_ip
ssh -i ta-cle.pem ubuntu@<IP-affichée>
```

### 8. ⚠️ Détruis la VM une fois tes tests terminés (pour éviter tout coût)
```bash
terraform destroy
```

## ⚠️ Erreurs fréquentes à éviter

- Committer `terraform.tfstate` sur un repo public → il peut contenir des infos sensibles (IP, IDs de ressources)
- Oublier `terraform destroy` après les tests → facturation même minime
- Ouvrir le SSH (`0.0.0.0/0`) en production réelle — acceptable seulement pour apprendre, jamais en vrai projet d'entreprise

## ✅ Checklist de validation avant de passer à la Phase 13

- [ ] `terraform plan` s'exécute sans erreur
- [ ] `terraform apply` crée réellement une VM visible dans la console AWS
- [ ] Tu peux te connecter en SSH à la VM créée
- [ ] Tu sais expliquer la différence entre `plan` et `apply`
- [ ] Tu as fait `terraform destroy` pour ne pas laisser tourner la ressource inutilement

## 📚 Concepts à lire si besoin

- `concepts/07-terraform-vs-ansible.md`

## ➡️ Étape suivante

Passe à `phases/13-ansible-configuration.md`
