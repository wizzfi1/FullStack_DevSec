#!/bin/sh
set -e

# Check for required env var
if [ -z "$SLACK_WEBHOOK_URL" ]; then
  echo "ERROR: SLACK_WEBHOOK_URL environment variable is not set!"
  exit 1
fi

# Render the config with secrets
echo "Replacing webhook URL in alertmanager.yml..."
envsubst < /etc/alertmanager/alertmanager.yml.tmpl > /etc/alertmanager/alertmanager.yml

# Start Alertmanager
echo "Starting Alertmanager..."
exec /bin/alertmanager --config.file=/etc/alertmanager/alertmanager.yml --storage.path=/alertmanager
