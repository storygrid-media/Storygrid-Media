import app from "./app.js";

const rawPort = process.env["PORT"] || "5000";

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

app.listen(port, () => {
  const env = process.env.VERCEL_ENV || process.env.NODE_ENV || "development";
  console.log(`Server listening on port ${port}`);
  console.log(`Environment: ${env}`);
});

// Keep process alive for debugging if needed
setInterval(() => {}, 1000000);
