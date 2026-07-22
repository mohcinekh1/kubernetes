# Phase 13 — Configuration avec Ansible

## 🎯 Objectif de cette phase

Utiliser Ansible pour configurer automatiquement la VM créée par Terraform (Phase 12) — installer Docker, créer un utilisateur, appliquer des règles de sécurité de base — sans te connecter manuellement en SSH pour tout taper à la main.

## 📖 Explication : pourquoi Ansible après Terraform

**Terraform crée l'infrastructure** (la VM elle-même existe). **Ansible configure ce qui tourne dessus** (installer des logiciels, copier des fichiers, démarrer des services). C'est une distinction qu'on te demandera très probablement en entretien :

> "Terraform provisionne, Ansible configure."

Contrairement à Terraform (qui maintient un état), Ansible est **sans état** — il se contente d'exécuter une liste d'actions ("playbook") sur des machines cibles, dans l'ordre, à chaque fois qu'on le lance.

## 🧩 Concepts clés

| Terme | Explication |
|---|---|
| **Inventory** | La liste des machines sur lesquelles Ansible va agir (ici, ta VM AWS) |
| **Playbook** | Un fichier YAML décrivant une séquence de tâches à exécuter |
| **Module** | Une action réutilisable (ex: `apt`, `copy`, `service`) — Ansible en fournit des centaines |
| **Idempotence** | Propriété clé : exécuter le même playbook plusieurs fois donne toujours le même résultat final, sans effet de bord |

## 📝 Étapes détaillées

### 1. Installe Ansible (sur ta machine, pas sur la VM cible)
```bash
# macOS
brew install ansible

# Linux
sudo apt install ansible

ansible --version
```

### 2. Crée l'inventory
```
ansible/
├── inventory.ini
└── playbook.yml
```

`inventory.ini` :
```ini
[devops_vm]
<IP-PUBLIQUE-DE-TA-VM> ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/ta-cle.pem
```

### 3. Teste la connexion Ansible avant tout playbook
```bash
ansible devops_vm -i ansible/inventory.ini -m ping
```
Tu dois voir `"ping": "pong"`. Si ça échoue, vérifie ta clé SSH et le security group AWS (Phase 12).

### 4. Écris ton premier playbook — installer Docker sur la VM

```yaml
---
- name: Configurer la VM DevOps
  hosts: devops_vm
  become: true              # équivalent de sudo

  tasks:
    - name: Mettre à jour le cache apt
      apt:
        update_cache: yes

    - name: Installer les dépendances
      apt:
        name:
          - ca-certificates
          - curl
          - gnupg
        state: present

    - name: Installer Docker
      apt:
        name: docker.io
        state: present

    - name: Démarrer et activer Docker
      service:
        name: docker
        state: started
        enabled: true

    - name: Ajouter l'utilisateur ubuntu au groupe docker
      user:
        name: ubuntu
        groups: docker
        append: yes
```

### 5. Exécute le playbook
```bash
ansible-playbook -i ansible/inventory.ini ansible/playbook.yml
```

### 6. Vérifie sur la VM
```bash
ssh -i ta-cle.pem ubuntu@<IP-de-la-VM>
docker --version
```

### 7. Teste l'idempotence — relance le même playbook
```bash
ansible-playbook -i ansible/inventory.ini ansible/playbook.yml
```
**Ce que tu dois observer :** les tâches déjà appliquées apparaissent en `ok` (pas de changement), pas en `changed`. C'est la preuve de l'idempotence — concept qu'on te demandera d'expliquer en entretien.

## ⚠️ Erreurs fréquentes à éviter

- Oublier `become: true` → erreurs de permissions sur les tâches nécessitant `sudo`
- Mauvais chemin vers la clé SSH dans l'inventory
- Écrire un playbook non idempotent (ex: utiliser `shell: apt install docker.io` au lieu du module `apt`) — perd l'intérêt principal d'Ansible

## ✅ Checklist de validation avant de passer à la Phase 14

- [ ] `ansible ... -m ping` retourne `pong`
- [ ] Le playbook s'exécute sans erreur et installe Docker sur la VM
- [ ] Relancer le playbook une seconde fois montre `changed=0` (idempotence vérifiée)
- [ ] Tu sais expliquer la différence Terraform/Ansible avec tes mots

## 📚 Concepts à lire si besoin

- `concepts/07-terraform-vs-ansible.md`

## ➡️ Étape suivante

Passe à `phases/14-argocd-gitops.md`
