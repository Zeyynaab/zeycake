# ZeyCake 

## Description du projet

ZeyCake est une application web de commande de pâtisseries faite maison. L’utilisateur peut se connecter / s’inscrire, parcourir les produits, gérer un panier, passer à la caisse et consulter ses commandes. Le frontend est une interface réactive en React qui communique avec une API sécurisée (JWT) pour l’authentification et la gestion des données. Ce projet met en œuvre une application complète dans l’architecture MERN, avec déploiement en ligne.

## Description (frontend)

- Authentification (inscription / connexion) avec gestion de session via JWT. 
- Navigation client avec React Router (produits, panier, checkout, commandes). 
- Gestion du panier  
- Passage à la caisse et création de commande, avec validation et feedback utilisateur.  
- Affichage des commandes de l’utilisateur connecté.  
- Header dynamique affichant « Salut, {prénom} ! » selon l’utilisateur connecté.  
- Interactions réactives, gestion des erreurs, notifications. 


## Description (backend)
Le backend est une API REST en Node.js/Express qui gère :
- L’authentification via JWT (connexion / inscription).    
- La gestion des clients et produits.  
- La consultation des commandes.  
- La sécurisation des routes (JWT, rôles) et une limitation de requêtes en développement pour éviter les abus (rate limiting).

### Endpoints principaux
- `POST /api/auth/login` : authentification, renvoie un token JWT et les données utilisateur.  
- `POST /api/auth/register` : création de compte client.  
- `GET /api/produits` et `GET /api/produits/:id` : liste et détail des produits.  
- `POST /api/commandes` : passer une commande (client connecté).  
- `GET /api/commandes/mes-commandes` : récupérer les commandes du client connecté.  
- `GET /api/commandes` : (admin) consulter toutes les commandes.  
  
##  Instruction d'installation locale

## Outils nécessaires
Node.js
npm
MongoDB 
MongoDB Compass pour l'inspection visuelle 
Docker (pour lancer le backend en conteneur)

## Étapes
1. Cloner le dépôt :
   ```bash
   git clone <https://github.com/Zeyynaab/zeycake.git>

2. Configurer et lancer le backend :
   cd backend
   npm install
  - Lancer le serveur :
   npm run dev
   - Version (Docker):
   cd backend
   docker compose up --build
   
3. Configurer et lancer le frontend :
   cd frontend 
   npm install 
 - Lancer l'interface


## Technologies utilisées

- React.js : pour l’interface utilisateur.  
- React Router : pour la navigation .  
- Axios : pour les requêtes HTTP avec intercepteur pour JWT.  
- JWT : pour l’authentification sécurisée.  
- CSS : personnalisé pour le style.  
- LocalStorage : pour le panier et les sessions
- Docker pour le backend 
- Node.js / Express
- Déploiement : : Netlify pour le frontend et Railway pour le backend.  
- Git / GitHub : pour le versionnement 

 ## Déploiement en ligne :

 - Dépôt GitHub : https://github.com/Zeyynaab/zeycake
 
 - Frontend en ligne : https://heartfelt-cendol-7cd5c1.netlify.app

 - Interface admin : https://heartfelt-cendol-7cd5c1.netlify.app/admin

 - Backend en ligne : https://zeycake-production.up.railway.app>

## Checklist de démonstration

- S’inscrire / se connecter.
- Ajouter un produit au panier.
- Passer une commande.
- Consulter ses commandes.
- Voir la salutation personnalisée.
- Se déconnecter et se reconnecter.