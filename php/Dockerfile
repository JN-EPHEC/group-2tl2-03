FROM node:20-alpine

# On n'installe pas d'extensions PHP ici ! 
# Les bibliothèques système nécessaires (si besoin) se mettent via 'apk'
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Installation des dépendances
COPY package*.json ./
RUN npm install

# Copie du code source
COPY . .

# On expose le port sur lequel ton serveur TS écoute (3000 par défaut)
EXPOSE 3000

# Lancement en mode dev (pour que ts-node-dev fonctionne)
CMD ["npm", "run", "dev"]