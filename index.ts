import { app } from "./api";
import { Database } from "./api/utils/Database";
import { Terminal } from "./api/utils/Terminal";

/**
 * Application port
 */
const port: number = parseInt(process.env.PORT!) ?? 3000;
/**
 * Application name
 */
const title: string = process.env.APP_NAME ?? "API";

app.listen(3000);

process.title = title;

Terminal.log("App started on port", port);
await Database.Connect(process.env.MONGO_URI!); // Elysia has been checked, it will always be there

process.on("unhandledRejection", (reason) => {
  Terminal.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (error) => {
  Terminal.error("Uncaught Exception:", error);
});
