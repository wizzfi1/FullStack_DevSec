# Stage 1: build environment with envsubst
FROM alpine:3.20 AS builder
RUN apk add --no-cache gettext

# Stage 2: final image with Alertmanager
FROM prom/alertmanager:v0.27.0

# Copy envsubst binary from builder
COPY --from=builder /usr/bin/envsubst /usr/local/bin/envsubst

# Copy template + entrypoint
COPY alertmanager.yml.tmpl /etc/alertmanager/alertmanager.yml.tmpl
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
