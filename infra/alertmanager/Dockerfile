FROM prom/alertmanager:v0.27.0

# Install gettext for envsubst
RUN apk add --no-cache gettext

# Copy config template + entrypoint
COPY alertmanager.yml.tmpl /etc/alertmanager/alertmanager.yml.tmpl
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
