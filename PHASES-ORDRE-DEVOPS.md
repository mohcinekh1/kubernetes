# Ordre logique des phases DevOps

Ce fichier remplace l'ancien ordre qui etait trop proche d'un catalogue d'outils.

L'objectif est de suivre une progression plus naturelle :

```text
code -> git -> docker -> ci/cd -> kubernetes -> exposition -> scaling -> validation -> securite -> packaging -> gitops -> cloud
```

## Sequence recommandee

| Phase | Fichier | Role |
| --- | --- | --- |
| 00 | `00-prerequisites.md` | Installer et verifier les outils |
| 01 | `01-preparer-application.md` | Creer l'application frontend/backend/database |
| 02 | `02-git-github-versioning.md` | Versionner et pousser le projet proprement |
| 03 | `03-dockeriser.md` | Dockeriser frontend/backend/database |
| 04 | `04-gitlab-cicd.md` | Automatiser test/build/scan avec CI/CD |
| 05 | `05-setup-environnement-k8s.md` | Preparer Minikube et le namespace |
| 06 | `06-manifests-de-base.md` | Creer les Deployments et Services de base |
| 07 | `07-configmaps-secrets.md` | Separer configuration et secrets |
| 08 | `08-fiabiliser-deployments.md` | Ajouter probes, resources et rollout |
| 09 | `09-services-ingress.md` | Exposer l'application avec Service/Ingress |
| 10 | `10-scaling-hpa.md` | Tester replicas et autoscaling HPA |
| 11 | `11-tests-validation.md` | Valider resilience, API, logs et rollback |
| 12 | `12-trivy-snyk-securite.md` | Scanner images/dependances |
| 13 | `13-helm-packaging.md` | Packager les manifests avec Helm |
| 14 | `14-argocd-gitops.md` | Passer au GitOps avec Argo CD |
| 15 | `15-aws-setup-gratuit.md` | Preparer l'environnement cloud |
| 16 | `16-terraform-provisioning.md` | Provisionner l'infrastructure |
| 17 | `17-ansible-configuration.md` | Automatiser la configuration |
| 18 | `18-documentation.md` | Finaliser la documentation projet |

## Pourquoi GitLab CI/CD vient plus tot

La CI/CD doit arriver rapidement apres Git et Docker, car elle automatise :

- les tests
- le build des images
- les scans de securite
- la preparation du deploiement

On peut ensuite reutiliser ce pipeline pour Kubernetes, Helm, Argo CD et le cloud.

## Pourquoi tests-validation vient apres Kubernetes avance

Les tests de validation sont plus utiles quand on a deja :

- Deployments
- Services
- ConfigMap/Secret
- Probes
- Ingress
- HPA

On peut alors tester des scenarios reels :

- suppression d'un Pod
- indisponibilite temporaire
- logs
- rollback
- verification API
