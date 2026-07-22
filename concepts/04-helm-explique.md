# Concept — Helm expliqué

## C'est quoi Helm, en une phrase ?

Helm est le **gestionnaire de paquets de Kubernetes** — comme `npm` pour Node.js ou `apt` pour Linux, mais pour installer des applications entières sur un cluster Kubernetes.

## Le problème que Helm résout

Sans Helm, pour déployer ton app tu dois :
```bash
kubectl apply -f deployment-frontend.yaml
kubectl apply -f service-frontend.yaml
kubectl apply -f deployment-backend.yaml
kubectl apply -f service-backend.yaml
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f ingress.yaml
kubectl apply -f hpa.yaml
```
Et si tu veux changer une seule valeur (ex: le nombre de répliques) selon l'environnement (dev vs prod), tu dois maintenir des fichiers YAML différents ou modifier manuellement à chaque fois — source d'erreurs.

**Avec Helm**, tout ça devient :
```bash
helm install mon-app ./mon-chart
```
Et pour changer une valeur selon l'environnement :
```bash
helm install mon-app ./mon-chart -f values-production.yaml
```

## Vocabulaire Helm

| Terme | Explication |
|---|---|
| **Chart** | Le "paquet" Helm complet — l'équivalent d'un package npm. Contient tous tes templates et une configuration par défaut |
| **Release** | Une instance installée d'un Chart dans ton cluster (tu peux installer le même Chart plusieurs fois sous des noms différents) |
| **values.yaml** | Le fichier central qui contient toutes les valeurs par défaut, paramétrables |
| **Template** | Un fichier YAML "avec des trous" (`{{ .Values.xxx }}`) qui sera rempli avec les valeurs au moment de l'installation |
| **Repository (repo)** | Un dépôt distant de Charts prêts à l'emploi (ex: Bitnami propose des Charts pour PostgreSQL, Redis, etc. déjà tout faits) |

## La syntaxe de templating, les bases

```yaml
# Insérer une valeur simple
image: "{{ .Values.backend.image }}"

# Valeur par défaut si non définie
replicas: {{ .Values.backend.replicas | default 2 }}

# Condition
{{- if .Values.ingress.enabled }}
# ce bloc n'apparaît que si ingress.enabled = true dans values.yaml
{{- end }}

# Boucle (utile si tu as une liste de variables d'env par exemple)
{{- range .Values.env }}
- name: {{ .name }}
  value: {{ .value }}
{{- end }}
```

## Commandes Helm essentielles

| Commande | Rôle |
|---|---|
| `helm create <nom>` | Génère la structure de base d'un nouveau Chart |
| `helm lint <chart>` | Vérifie la syntaxe sans installer |
| `helm template <chart>` | Génère le YAML final (aperçu) sans l'appliquer au cluster |
| `helm install <release> <chart>` | Installe le Chart dans le cluster |
| `helm upgrade <release> <chart>` | Met à jour une release existante |
| `helm rollback <release> <revision>` | Revient à une version précédente |
| `helm uninstall <release>` | Supprime tout ce que la release avait créé |
| `helm list` | Liste les releases installées |
| `helm history <release>` | Montre l'historique des versions déployées |

## Pourquoi c'est très demandé sur le marché

Presque toutes les entreprises qui utilisent Kubernetes en production utilisent Helm (ou un outil équivalent comme Kustomize) pour gérer leurs déploiements — savoir écrire et maintenir des Charts Helm est une compétence attendue dès les postes DevOps juniors.
