FROM alpine:latest

RUN apk add --no-cache gettext curl tar wget

ENV ALERTMANAGER_VERSION=0.27.0
RUN curl -L "https://github.com/prometheus/alertmanager/releases/download/v${ALERTMANAGER_VERSION}/alertmanager-${ALERTMANAGER_VERSION}.linux-amd64.tar.gz" \
  | tar -xz && \
  mv alertmanager-${ALERTMANAGER_VERSION}.linux-amd64/alertmanager /bin/alertmanager && \
  mv alertmanager-${ALERTMANAGER_VERSION}.linux-amd64/amtool /bin/amtool && \
  rm -rf alertmanager-${ALERTMANAGER_VERSION}.linux-amd64

COPY --chmod=755 entrypoint.sh /entrypoint.sh
COPY alertmanager.yml.tmpl /etc/alertmanager/alertmanager.yml.tmpl

# Create non-root user with high UID
RUN addgroup -g 1001 -S alert && adduser -S alert -u 1001 -G alert
USER alert

EXPOSE 9093

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:9093/-/healthy || exit 1

ENTRYPOINT ["/entrypoint.sh"]