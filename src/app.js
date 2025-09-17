const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const app = express();

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  integrations: [
    new Tracing.Integrations.Express({ app: require("express") }), // <- use express module, not instance
  ],
  tracesSampleRate: 1.0, // consider lowering in prod, e.g. 0.1
});

// Request handler (before routes)
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Example route
app.get("/", (req, res) => {
  res.send("You are safe in Wizfi's Pipeline!");
});

// Debug route to test Sentry
app.get("/debug-sentry", (req, res) => {
  throw new Error("Debug Sentry error! If Sentry is working, you’ll see this in your dashboard.");
});

// Error handler (after routes)
app.use(Sentry.Handlers.errorHandler());

module.exports = app;
