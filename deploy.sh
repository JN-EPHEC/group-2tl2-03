#!/bin/bash

# --- CONFIGURATION ---
# Docker Compose utilise par défaut le nom du dossier (projet_dev3) + nom du service + index
CONTAINER_APP="projet_dev3-server-1"
CONTAINER_WEB="projet_dev3-web-1"
NETWORK_DMZ="projet_dev3_dmz"

echo "🚀 Lancement du build et des conteneurs (Quiz Project)..."
# On lance le build sans chercher de db.env puisque tu es sur Supabase
docker compose up -d --build

echo "⏳ Attente de la stabilisation (5s)..."
sleep 5

echo "🔌 Configuration du réseau DMZ pour le Backend..."
# On déconnecte d'abord par sécurité pour éviter les conflits d'endpoint
docker network disconnect -f $NETWORK_DMZ $CONTAINER_APP 2>/dev/null

# On connecte manuellement au réseau DMZ (requis pour ton infrastructure EPHEC/BIND)
docker network connect $NETWORK_DMZ $CONTAINER_APP

if [ $? -eq 0 ]; then
    echo "✅ Connexion réseau réussie pour le serveur."
else
    echo "❌ Échec de la connexion réseau."
fi

echo "🔄 Redémarrage de Nginx..."
docker restart $CONTAINER_WEB

echo "🔍 Vérification de la communication Interne..."
# On vérifie que le Web (Nginx) peut "voir" le Server (Node)
docker exec $CONTAINER_WEB getent hosts $CONTAINER_APP

echo "🏁 Déploiement terminé ! Ton API est sur https://l2-5.ephec-ti.be/api/auth"