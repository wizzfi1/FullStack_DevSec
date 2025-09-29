# Use official Grafana image with pinned version
FROM grafana/grafana:11.1.4

# Copy provisioning config files
COPY provisioning /etc/grafana/provisioning

# Enforce non-root execution (Grafana runs as UID 472 by default)
USER 472

# Expose Grafana port
EXPOSE 3000

# Health check: verify API is responsive
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1