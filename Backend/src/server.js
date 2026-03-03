const dotenv = require("dotenv");
const app = require("./app");
const { connectDatabase, disconnectDatabase } = require("./config/db");

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

let server;

const startServer = async () => {
  try {
    await connectDatabase();

    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);

  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      });
    }

    await disconnectDatabase();

    console.log("Shutdown complete");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error.message);
    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  shutdown("UNHANDLED_REJECTION");
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  shutdown("UNCAUGHT_EXCEPTION");
});

startServer();
