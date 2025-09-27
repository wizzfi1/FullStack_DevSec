# Use official Prometheus image with pinned version 
FROM prom/prometheus:v2.53.0

# Copy configuration files
COPY prometheus.yml /etc/prometheus/prometheus.yml
COPY alert-rules.yml /etc/prometheus/alert-rules.yml

# Create non-root user with high UID (Prometheus runs as 65534 by default, but we enforce it)
RUN addgroup -g 65534 -S prom && adduser -S prom -u 65534 -G prom
USER prom

# Expose Prometheus port
EXPOSE 9090

# Health check: verify Prometheus is ready
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:9090/-/healthy || exit 1