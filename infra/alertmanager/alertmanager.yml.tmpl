#!/bin/sh
set -e

# Check if SLACK_WEBHOOK_URL is set
if [ -z "$SLACK_WEBHOOK_URL" ]; then
  echo "❌ ERROR: SLACK_WEBHOOK_URL environment variable is not set!"
  echo "Please export it before running: export SLACK_WEBHOOK_URL='https://hooks.slack.com/services/...'"
  exit 1
fi

# Render the config with secrets
echo "🔧 Replacing webhook URL in alertmanager.yml..."
envsubst < /etc/alertmanager/alertmanager.yml.tmpl > /etc/alertmanager/alertmanager.yml

# Validate config
echo "🔍 Validating Alertmanager configuration..."
alertmanager --config.file=/etc/alertmanager/alertmanager.yml --test

# Start Alertmanager
echo "🚀 Starting Alertmanager..."
exec alertmanager --config.file=/etc/alertmanager/alertmanager.yml --storage.path=/alertmanager