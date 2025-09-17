const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const client = require("prom-client");

const app = express();

// --- Prometheus Setup ---
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // Collect Node.js process metrics

// Custom counter
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

// Middleware to count requests
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

// Expose /metrics endpoint for Prometheus
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// --- Sentry Setup (v7) ---
Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  integrations: [new Tracing.Integrations.Express({ app })],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Example route
app.get("/", (req, res) => {
  res.send("You are safe in Wizfi's Pipeline!");
});

// Debug route
app.get("/debug-sentry", (req, res) => {
  res.status(500).send("Triggering Sentry debug error...");
  throw new Error("Debug Sentry error!");
});

app.use(Sentry.Handlers.errorHandler());

module.exports = app;
