FROM internetsystemsconsortium/bind9:9.18

# On copie la config à sa place habituelle
ADD config/named.conf /etc/bind/named.conf

# On copie la ZONE dans le dossier cache (plus simple pour les droits)
ADD zones/ma-zone.zone /var/cache/bind/ma-zone.zone

# On s'assure que l'utilisateur bind est propriétaire de tout
RUN chown -R bind:bind /etc/bind/ /var/cache/bind/

CMD ["-g", "-c", "/etc/bind/named.conf", "-u", "bind"]