# Use official Prometheus image with pinned version
FROM prom/prometheus:v2.53.0

# Copy configuration files — they'll be owned by the image's default user (65534)
COPY prometheus.yml /etc/prometheus/prometheus.yml
COPY alert-rules.yml /etc/prometheus/alert-rules.yml

# EXPOSE and HEALTHCHECK — no need to change user
EXPOSE 9090

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:9090/-/healthy || exit 1