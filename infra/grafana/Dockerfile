FROM grafana/grafana:11.3.4  # ← Update to latest patch version

COPY provisioning /etc/grafana/provisioning

# Grafana already runs as grafana user internally, enforce non-root
USER 472:472  # ← Use explicit UID for Grafana

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1