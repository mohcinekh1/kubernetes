# Concept — GitOps & ArgoCD

## C'est quoi le GitOps, en une phrase ?

Le GitOps est une pratique où **Git devient la seule source de vérité pour l'état de ton infrastructure et de tes déploiements** — et un agent automatisé (comme ArgoCD) s'assure en permanence que le cluster correspond à ce que dit Git.

## Push vs Pull — la distinction clé

### Modèle "Push" (ce que tu as fait jusqu'à la Phase 8)
```
Toi (ou un pipeline CI/CD) → exécute activement → helm upgrade / kubectl apply → Cluster
```
Le déploiement est déclenché **depuis l'extérieur** du cluster. Ton pipeline CI/CD a besoin d'un accès direct (identifiants) au cluster pour y pousser des changements.

### Modèle "Pull" (GitOps, Phase 14)
```
Git (état désiré) ←—— ArgoCD (DANS le cluster) vérifie en permanence et se synchronise
```
Le cluster **va chercher lui-même** les changements dans Git. Aucun système externe n'a besoin d'un accès direct au cluster pour déployer — seul ArgoCD (qui tourne dedans) a ces droits.

## Pourquoi c'est considéré plus sécurisé et plus fiable

| Aspect | Avantage du GitOps |
|---|---|
| **Sécurité** | Pas besoin de donner les identifiants du cluster à ton pipeline CI/CD externe |
| **Traçabilité** | Chaque changement d'infra = un commit Git, avec auteur, date, message |
| **Rollback** | `git revert` suffit — pas besoin de connaître la commande Kubernetes exacte pour annuler |
| **Auto-correction (selfHeal)** | Si quelqu'un modifie manuellement le cluster (dérive), ArgoCD peut le corriger automatiquement pour revenir à l'état défini dans Git |

## Le concept de "drift" (dérive)

Le "drift" désigne une différence entre :
- **l'état réel** du cluster (ce qui tourne concrètement)
- **l'état désiré** décrit dans Git

C'est un problème fréquent dans les équipes qui n'utilisent PAS le GitOps : quelqu'un fait un `kubectl edit` en urgence pour corriger un bug en prod, oublie de reporter ce changement dans les fichiers YAML versionnés, et 3 mois plus tard personne ne sait pourquoi la prod ne correspond plus à ce qui est dans Git. ArgoCD détecte et peut corriger ce genre de dérive automatiquement.

## Où se place ArgoCD dans une architecture DevOps complète

```
Développeur → push code → GitHub
                              ↓
                    Pipeline CI (GitHub Actions)
                    build image + tests + scan sécurité (Trivy/Snyk)
                              ↓
                    Push image vers un registre
                              ↓
                    Met à jour le tag d'image dans values.yaml (Git)
                              ↓
                    ArgoCD détecte le changement dans Git
                              ↓
                    ArgoCD synchronise automatiquement le cluster Kubernetes
```

Remarque importante : dans ce modèle, **le pipeline CI/CD ne déploie jamais directement** — il se contente de modifier un fichier dans Git. C'est ArgoCD qui fait le déploiement réel. C'est cette séparation qu'on te demandera d'expliquer en entretien pour un poste plus avancé.
