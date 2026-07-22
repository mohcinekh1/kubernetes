# Concept — Terraform vs Ansible

C'est LA question classique en entretien DevOps : "Quelle est la différence entre Terraform et Ansible, et pourquoi utiliser les deux ?"

## La distinction fondamentale

| | Terraform | Ansible |
|---|---|---|
| **Rôle** | Provisionner (créer l'infrastructure) | Configurer (installer/paramétrer ce qui existe) |
| **Approche** | Déclarative avec état (state) | Séquentielle, sans état persistant |
| **Répond à la question** | "Quelles ressources doivent exister ?" | "Que doit-on faire sur ces ressources ?" |
| **Exemple d'action** | Créer une VM, un VPC, une base de données managée | Installer Docker, copier un fichier de config, démarrer un service |

## Pourquoi "avec état" vs "sans état" compte

**Terraform** garde un fichier d'état (`terraform.tfstate`) qui mémorise exactement ce qu'il a créé. Quand tu relances `terraform apply`, il compare l'état désiré (ton code) à l'état réel (le fichier state + la réalité du cloud) et ne fait QUE les changements nécessaires.

**Ansible** n'a pas cette mémoire — à chaque exécution, il vérifie l'état actuel de la machine cible en temps réel (via ses modules) et applique les tâches. C'est pour ça qu'un bon playbook Ansible doit être **idempotent** (le relancer plusieurs fois ne doit rien casser).

## Analogie simple

- **Terraform** = l'architecte et le chantier — il construit la maison (murs, fondations, toit)
- **Ansible** = le déménageur et le décorateur — une fois la maison construite, il installe les meubles, branche l'électroménager, configure le wifi

## Est-ce qu'on peut se passer de l'un des deux ?

Techniquement, Terraform peut exécuter des scripts de configuration basiques (`user_data` sur AWS EC2, par exemple), et Ansible peut créer certaines ressources cloud via ses modules. **Mais en pratique professionnelle, on les utilise ensemble**, chacun pour son rôle — c'est ce qu'on attend que tu saches en entretien.

## Workflow typique en entreprise

```
1. Terraform crée la VM (infrastructure)
        ↓
2. Ansible se connecte à cette VM et installe/configure les logiciels
        ↓
3. (Parfois) Terraform peut même appeler Ansible automatiquement via un provisioner,
   mais c'est considéré comme une mauvaise pratique moderne —
   on préfère les garder séparés et orchestrés par un pipeline CI/CD
```
