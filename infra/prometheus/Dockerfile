FROM prom/prometheus:v2.53.3  # ← Update to latest patch version

COPY prometheus.yml /etc/prometheus/prometheus.yml
COPY alert-rules.yml /etc/prometheus/alert-rules.yml

# Create non-root user with high UID
RUN addgroup -g 1002 -S prom && adduser -S prom -u 1002 -G prom
USER prom

EXPOSE 9090

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:9090/-/healthy || exit 1