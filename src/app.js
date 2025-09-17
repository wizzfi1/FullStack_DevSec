const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const app = express();

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  integrations: [
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

// Request handler (before routes)
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Example route
app.get("/", (req, res) => {
  res.send("You are safe in Wizfi's Pipeline!");
});

// Error handler (after routes)
app.use(Sentry.Handlers.errorHandler());

module.exports = app;
