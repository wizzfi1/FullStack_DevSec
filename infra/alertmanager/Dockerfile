FROM alpine:3.20

# Install required tools: gettext (for envsubst), curl, tar
RUN apk add --no-cache gettext curl tar

# Install Alertmanager
ENV ALERTMANAGER_VERSION=0.27.0
RUN curl -L "https://github.com/prometheus/alertmanager/releases/download/v${ALERTMANAGER_VERSION}/alertmanager-${ALERTMANAGER_VERSION}.linux-amd64.tar.gz" \
  | tar -xz && \
  mv alertmanager-${ALERTMANAGER_VERSION}.linux-amd64/alertmanager /bin/alertmanager && \
  mv alertmanager-${ALERTMANAGER_VERSION}.linux-amd64/amtool /bin/amtool && \
  rm -rf alertmanager-${ALERTMANAGER_VERSION}.linux-amd64

# Copy entrypoint + config template
COPY --chmod=755 entrypoint.sh /entrypoint.sh
COPY alertmanager.yml.tmpl /etc/alertmanager/alertmanager.yml.tmpl

ENTRYPOINT ["/entrypoint.sh"]
