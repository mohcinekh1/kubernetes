# Concept — AWS Free Tier

## Les 3 types d'offres gratuites AWS

Beaucoup pensent "AWS gratuit" = tout gratuit indéfiniment. En réalité il y a 3 catégories différentes :

| Type | Explication | Exemple |
|---|---|---|
| **Always Free** | Gratuit en permanence, dans une limite précise | 1 million de requêtes Lambda/mois |
| **12 months free** | Gratuit seulement la première année après création du compte | 750h/mois d'EC2 `t2.micro` |
| **Trials** | Gratuit pendant une courte période, différente selon le service | Certains services ML |

## Pourquoi ce projet évite EKS

**EKS (Elastic Kubernetes Service)** est le service Kubernetes managé d'AWS — c'est ce qu'utilisent les vraies entreprises en production. Mais :
- Le control plane EKS coûte environ **0,10$/heure**, soit ~73$/mois, **même sans aucune charge de travail dessus**
- Ce n'est PAS inclus dans le Free Tier

C'est pourquoi ce projet garde Kubernetes en local (Minikube) et utilise AWS seulement pour pratiquer Terraform/Ansible sur une VM EC2 simple (qui, elle, rentre dans le Free Tier).

## Les pièges à coûts les plus fréquents pour un débutant

- **Elastic IP non attachée** — une IP publique réservée mais inutilisée est facturée
- **Volumes EBS orphelins** — si tu supprimes une VM mais pas son disque associé
- **NAT Gateway** — jamais gratuite, facturée à l'heure + au trafic
- **Instances autres que `t2.micro`/`t3.micro`** — sortent immédiatement du Free Tier

## Réflexe à prendre

Après chaque session de pratique avec des ressources AWS :
```bash
aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name]'
```
Vérifie qu'aucune instance ne tourne encore inutilement, et utilise systématiquement `terraform destroy` en fin de session.
