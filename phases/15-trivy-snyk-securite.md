# Phase 15 — Sécurité avec Trivy & Snyk (DevSecOps)

## 🎯 Objectif de cette phase

Intégrer un scan de vulnérabilités automatique dans ton pipeline CI/CD pour analyser tes images Docker (Trivy) et tes dépendances applicatives (Snyk), et faire échouer volontairement le pipeline si une vulnérabilité critique est trouvée.

## 📖 Explication : pourquoi cette phase compte

Le **DevSecOps** intègre la sécurité **dans** le pipeline, pas comme une vérification a posteriori. C'est un critère de plus en plus recherché même pour des postes DevOps juniors — savoir dire "j'ai intégré un scan de vulnérabilités dans mon pipeline" est un vrai argument en entretien.

## 🧩 Différence entre Trivy et Snyk

| Outil | Ce qu'il scanne | Cas d'usage principal |
|---|---|---|
| **Trivy** | Images Docker (vulnérabilités du système, des paquets OS, des libs) | Scanner ton image finale avant de la pousser |
| **Snyk** | Dépendances applicatives (`package.json`, `requirements.txt`...) + images aussi | Scanner ton code source et ses dépendances tiers |

Les deux sont complémentaires : Trivy regarde "qu'est-ce qu'il y a DANS mon image", Snyk regarde plutôt "mes dépendances de code ont-elles des failles connues".

## 📝 Étapes détaillées

### 1. Installe Trivy en local pour tester d'abord
```bash
# macOS
brew install trivy

# Linux
sudo apt install trivy
```

### 2. Scanne une de tes images (Phase 2)
```bash
trivy image mon-backend:v1
```

Tu vas voir un rapport classé par sévérité : `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`. Lis-le — c'est normal de trouver des vulnérabilités, même sur des images officielles.

### 3. Réduis les vulnérabilités en changeant ton image de base

Une des causes les plus fréquentes : utiliser une image de base trop lourde (`node:20` au lieu de `node:20-alpine`). Modifie ton Dockerfile pour utiliser une image de base plus légère et rescanne.

### 4. Crée un compte Snyk (gratuit pour projets open source/personnels)

Rends-toi sur [snyk.io](https://snyk.io), crée un compte gratuit, récupère ton token API (`Account Settings → API Token`).

### 5. Installe la CLI Snyk et teste en local
```bash
npm install -g snyk
snyk auth
snyk test          # scanne les dépendances du dossier courant
```

### 6. Intègre les deux scans dans ton pipeline CI (GitHub Actions)

Ajoute à ton fichier `.github/workflows/ci.yml` (créé au Niveau 1 de ton parcours) :

```yaml
  security-scan:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4

      - name: Scan image avec Trivy
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'mon-backend:v1'
          format: 'table'
          severity: 'CRITICAL,HIGH'
          exit-code: '1'          # fait échouer le job si vulnérabilité trouvée

      - name: Scan des dépendances avec Snyk
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
```

> 💡 Ajoute ton token Snyk comme secret GitHub : `Settings → Secrets and variables → Actions → New repository secret` (nom : `SNYK_TOKEN`)

### 7. Teste volontairement un échec de pipeline

Si ton pipeline passe du premier coup, c'est suspect — vérifie que le `exit-code: '1'` fonctionne bien en scannant intentionnellement une vieille image connue pour avoir des failles (ex: `node:14` ancien) pour t'assurer que le pipeline échoue correctement.

## ⚠️ Erreurs fréquentes à éviter

- Bloquer TOUT le pipeline sur la moindre vulnérabilité `LOW` → trop strict, personne ne pourra jamais déployer. Filtre sur `CRITICAL`/`HIGH` en priorité.
- Oublier d'ajouter `SNYK_TOKEN` dans les secrets GitHub → le job échoue pour une mauvaise raison (auth), pas pour une vraie vulnérabilité
- Scanner uniquement en CI sans jamais scanner en local avant de commit → tu découvres les problèmes trop tard

## ✅ Checklist de validation avant de passer à la Phase 16

- [ ] Trivy scanne tes images et le rapport est lisible/compris
- [ ] Snyk scanne tes dépendances applicatives
- [ ] Le pipeline CI échoue correctement si une vulnérabilité `CRITICAL`/`HIGH` est trouvée
- [ ] Tu sais expliquer la différence entre ce que scanne Trivy et ce que scanne Snyk
- [ ] Tu sais citer au moins 2 vulnérabilités trouvées sur tes images et comment tu les as corrigées (bonne question d'entretien)

## 📚 Concepts à lire si besoin

- `concepts/09-devsecops-scanning.md`

## ➡️ Étape suivante

Passe à `phases/16-gitlab-cicd.md` pour intégrer GitLab CI/CD et terminer le parcours complet.
