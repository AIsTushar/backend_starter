import { Server } from "http";
import app from "./app";
import config from "./config";

let server: Server;

// Main function to start the server
function main() {
  const host = "10.0.10.121";
  try {
    server = app.listen(config.port as number, () => {
      // console.log("Server is running on port", `http://${host}:${config.port}`);
      console.log(
        "Server is running on port",
        `http://localhost:${config.port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

// Start the server
main();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
