# Phase 6 — Services & Ingress

## 🎯 Objectif de cette phase

Exposer proprement ton application vers l'extérieur du cluster avec un **Ingress**, plutôt qu'avec des NodePort qui ne sont pas adaptés à une vraie architecture multi-services.

## 📖 Explication : pourquoi cette phase compte

Jusqu'ici, tes services communiquent en interne. Mais un utilisateur externe doit pouvoir accéder à ton frontend (et éventuellement ton API) depuis un navigateur. Un **Ingress** est un objet Kubernetes qui gère le routage HTTP/HTTPS entrant vers tes différents Services, avec des règles basées sur le chemin ou le nom de domaine — un peu comme un reverse proxy (Nginx) intégré à Kubernetes.

## 🧩 Concept clé : l'Ingress a besoin d'un Ingress Controller

Un Ingress **seul** ne fait rien — c'est juste une règle. Il faut un **Ingress Controller** (le "moteur" qui applique réellement ces règles, souvent basé sur Nginx) installé dans le cluster.

### Activer l'Ingress Controller sur Minikube
```bash
minikube addons enable ingress

# Vérifie qu'il tourne
kubectl get pods -n ingress-nginx
```

## 🧩 Anatomie d'un Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: mon-projet-ingress
  namespace: mon-projet
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - host: mon-projet.local        # Nom de domaine local pour tester
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 3000
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: backend-service
                port:
                  number: 5000
```

**Ce que ça fait :** toute requête vers `mon-projet.local/` va au frontend, toute requête vers `mon-projet.local/api` va au backend. C'est le principe du **routage par chemin (path-based routing)**.

## 📝 Étapes détaillées

### 1. Active l'Ingress Controller (voir ci-dessus)

### 2. Crée `infra/k8s/ingress.yaml` avec tes règles de routage

### 3. Applique
```bash
kubectl apply -f infra/k8s/ingress.yaml
kubectl get ingress -n mon-projet
```

### 4. Configure ton fichier `hosts` local pour tester avec un nom de domaine

Récupère l'IP de Minikube :
```bash
minikube ip
```

Ajoute dans `/etc/hosts` (Linux/Mac) ou `C:\Windows\System32\drivers\etc\hosts` (Windows) :
```
<IP-DE-MINIKUBE>  mon-projet.local
```

### 5. Teste dans le navigateur ou avec curl
```bash
curl http://mon-projet.local
curl http://mon-projet.local/api
```

> 💡 Sur certains environnements Minikube (driver Docker), tu dois utiliser `minikube tunnel` dans un terminal séparé pour que l'Ingress soit joignable depuis ta machine hôte.

## ⚠️ Erreurs fréquentes à éviter

- Oublier `minikube tunnel` (nécessaire selon le driver Minikube utilisé)
- Confondre le port du **Service** dans l'Ingress avec le port du conteneur — c'est le port du Service qu'on référence ici
- Ne pas activer l'addon `ingress` avant de créer la ressource Ingress

## ✅ Checklist de validation avant de passer à la Phase 7

- [ ] L'Ingress Controller est actif (`kubectl get pods -n ingress-nginx` montre `Running`)
- [ ] `kubectl get ingress` montre ton Ingress avec une adresse
- [ ] Tu accèdes à ton frontend via `http://mon-projet.local` dans le navigateur
- [ ] Tu accèdes à ton API via `http://mon-projet.local/api`
- [ ] Tu sais expliquer la différence entre Service et Ingress avec tes mots

## 📚 Concepts à lire si besoin

- `concepts/03-reseaux-kubernetes.md` — approfondit Service/Ingress/DNS interne

## ➡️ Étape suivante

Passe à `phases/07-scaling-hpa.md`
