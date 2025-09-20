FROM prom/alertmanager:v0.27.0

# Install gettext for envsubst (Debian-based base image)
USER root
RUN apt-get update && apt-get install -y gettext-base && rm -rf /var/lib/apt/lists/*

# Copy config template + entrypoint
COPY alertmanager.yml.tmpl /etc/alertmanager/alertmanager.yml.tmpl
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
