#!/bin/bash
# 1. On lance tout
docker compose up -d

# 2. On utilise les noms exacts que Docker a créés
# On récupère l'ID ou le nom dynamiquement pour éviter les erreurs
PHP_CONTAINER=$(docker ps -qf "name=php")

echo "🔗 Liaison du réseau projet_vps_dmz au conteneur $PHP_CONTAINER..."
docker network connect projet_vps_dmz $PHP_CONTAINER

echo "🔄 Refresh Nginx..."
docker restart projet_vps-web-1

echo "✅ Prêt !"
