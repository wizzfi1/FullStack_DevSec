const express = require("express");
const Sentry = require("@sentry/node");

const app = express();

// Initialize Sentry (error capture only)
Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  tracesSampleRate: 0, // disable performance tracing for now
});

// Request handler (before routes)
app.use(Sentry.Handlers.requestHandler());

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
