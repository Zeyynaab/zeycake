# ZeyCake 

## Description du projet

ZeyCake est une application web de commande de pâtisseries faite maison. L’utilisateur peut se connecter / s’inscrire, parcourir les produits, gérer un panier, passer à la caisse et consulter ses commandes.  Ce projet met en oeuvre une application complète dans l’architecture MERN, avec déploiement en ligne.

## Description (frontend)
Le frontend est une interface réactive en React qui communique avec une API sécurisée pour l’authentification et la gestion des données. Il offre
- L'authentification (inscription / connexion) avec gestion de session via JWT. 
- La navigation client avec React Router (produits, panier, checkout, commandes). 
- La gestion du panier  
- Le passage à la caisse et création de commande, avec validation et feedback utilisateur.  
- L'affichage des commandes de l’utilisateur connecté.  
- Un Header affichant « Salut, {prénom} ! » selon l’utilisateur connecté.  
- Des interactions réactives, gestion des erreurs, notifications. 


## Description (backend)
Le backend est une API REST en Node.js/Express qui gère :
- L’authentification via JWT (connexion / inscription).    
- La gestion des clients et produits.  
- La consultation des commandes.  
- La sécurisation des routes (JWT, rôles) et une limitation de requêtes en développement pour éviter les abus (rate limiting).

  
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
 - Lancer l'interface :
   npm start


## Technologies utilisées

- React.js : pour l’interface utilisateur.  
- React Router : pour la navigation .  
- Axios : pour les requêtes HTTP avec intercepteur pour JWT.  
- JWT : pour l’authentification sécurisée.  
- CSS : personnalisé pour le style.  
- LocalStorage : pour le panier et les sessions
- Docker et MongoDB pour le backend 
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

## Comment se connecter en admin 
1. En local
- Nom d'utilisasteur : zeycake@patisserie.com
- MDP : Admin123!

2. En production
- Nom d'utilisateur: zeycake@patisserie.com
- MDP : 123456
