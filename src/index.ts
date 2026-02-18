import { Elysia, t } from "elysia";
import { env } from "@yolk-oss/elysia-env";
import router from "./router";
import cors from "@elysiajs/cors";
import { helmet } from "elysia-helmet";
import { elysiaXSS } from "elysia-xss";
import { rateLimit } from "elysia-rate-limit";
import { Terminal } from "./utils/Terminal";
import { Database } from "./utils/Database";

/**
 * Application port
 */
const port: number = parseInt(process.env.PORT!) ?? 3000;
/**
 * Application name
 */
const title: string = process.env.APP_NAME ?? "API";

/**
 * Application
 */
const app = new Elysia()
  .use(
    // Safe env checker
    env({
      APP_NAME: t.String({
        description: "Name of the app",
        error: "APP_NAME is required",
      }),
      PORT: t.Number({
        description: "Port app that use to running",
        error: "PORT is required",
      }),
      MONGO_URI: t.String({
        description: "Mongodb uri",
        error: "MONGO_URI is required",
      }),
    }),
  )
  // CORS settings
  .use(cors())
  .use(helmet())
  .use(elysiaXSS())
  .use(
    rateLimit({
      max: 50,
      duration: 1_000 * 5,
    }),
  )
  .use(router)
  .listen(port);

process.title = title;

Terminal.log("App started on port", port);
Database.Connect(process.env.MONGO_URI!);

export { app };
