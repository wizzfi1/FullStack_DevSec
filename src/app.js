const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const app = express();

// Initialize Sentry (v7 API)
Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  integrations: [
    new Tracing.Integrations.Express({ app }), // works fine with v7
  ],
  tracesSampleRate: 1.0, // lower this in prod (e.g. 0.1)
});

// Request handler (before routes)
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Example route
app.get("/", (req, res) => {
  res.send("You are safe in Wizfi's Pipeline!");
});

// Debug route to test Sentry (ESLint safe)
app.get("/debug-sentry", (req, res) => {
  res.status(500).send("Triggering Sentry debug error...");
  throw new Error("Debug Sentry error!");
});

// Error handler (after routes)
app.use(Sentry.Handlers.errorHandler());

module.exports = app;
