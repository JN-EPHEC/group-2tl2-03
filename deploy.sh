#!/bin/bash

# Configuration des noms (vérifie s'ils correspondent à ton docker ps)
CONTAINER_APP="projet_dev3-php-1"
CONTAINER_WEB="projet_dev3-web-1"
NETWORK_DMZ="projet_dev3_dmz"

echo "🚀 Lancement du build et des conteneurs..."
docker compose up -d --build

echo "⏳ Attente de la stabilisation (5s)..."
sleep 5

echo "🔌 Tentative de connexion au réseau DMZ..."
# On déconnecte d'abord (pour éviter l'erreur "endpoint already exists")
docker network disconnect -f $NETWORK_DMZ $CONTAINER_APP 2>/dev/null
# On connecte le réseau
docker network connect $NETWORK_DMZ $CONTAINER_APP

if [ $? -eq 0 ]; then
    echo "✅ Connexion réseau réussie."
else
    echo "❌ Échec de la connexion réseau."
fi

echo "🔄 Redémarrage de Nginx pour rafraîchir le DNS..."
docker restart $CONTAINER_WEB

echo "🔍 Vérification de la vision interne..."
docker exec -it $CONTAINER_WEB getent hosts $CONTAINER_APP

echo "🏁 Déploiement terminé !"
