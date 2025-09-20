#!/bin/sh
set -e

# Check if SLACK_WEBHOOK_URL is set
if [ -z "$SLACK_WEBHOOK_URL" ]; then
  echo "ERROR: SLACK_WEBHOOK_URL environment variable is not set!"
  echo "Set it in Render dashboard or export it locally before running."
  exit 1
fi

# Render the config with secrets
echo "Replacing webhook URL in alertmanager.yml..."
/usr/bin/envsubst < /etc/alertmanager/alertmanager.yml.tmpl > /etc/alertmanager/alertmanager.yml

# Start Alertmanager (will fail fast if config is invalid)
echo "Starting Alertmanager..."
exec /bin/alertmanager --config.file=/etc/alertmanager/alertmanager.yml --storage.path=/alertmanager
