# --- Étape 1 : Build de React ---
FROM node:18-alpine AS build-stage
WORKDIR /app
# On copie les fichiers de dépendances
COPY package*.json ./
RUN npm install
# On copie tout le reste du dossier web (src, tsconfig, etc.)
COPY . .
# On génère le dossier /app/dist
RUN npm run build

# --- Étape 2 : Serveur Nginx ---
FROM nginx:stable-alpine
# On nettoie le dossier par défaut de nginx
RUN rm -rf /var/www/html/*
# On copie le build de l'étape précédente vers le dossier root de nginx
COPY --from=build-stage /app/dist /var/www/html
# On copie ta configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443