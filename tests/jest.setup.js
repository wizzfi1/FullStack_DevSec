// Fake DSN so Sentry.init() doesn't crash in test runs
process.env.SENTRY_DSN = "http://fake-dsn.local";
