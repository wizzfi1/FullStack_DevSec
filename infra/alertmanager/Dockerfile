# Stage 1: Build environment with envsubst
FROM alpine:3.20 AS builder
RUN apk add --no-cache gettext

# Stage 2: Final Alertmanager image
FROM prom/alertmanager:v0.27.0

# Copy envsubst binary from builder
COPY --from=builder /usr/bin/envsubst /usr/bin/envsubst

# Copy files with executable permission — done as root before user switch
COPY --chmod=755 alertmanager.yml.tmpl /etc/alertmanager/alertmanager.yml.tmpl
COPY --chmod=755 entrypoint.sh /entrypoint.sh

# Set entrypoint (no need for RUN chmod)
ENTRYPOINT ["/entrypoint.sh"]