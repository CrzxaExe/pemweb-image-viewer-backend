import { Elysia, t } from "elysia";
import { env } from "@yolk-oss/elysia-env";
import router from "./router";
import cors from "@elysiajs/cors";
import { helmet } from "elysia-helmet";
import swagger from "@elysiajs/swagger";
import jwt from "@elysiajs/jwt";
import { jwtPlugin } from "./plugins/jwt";
import node from "@elysiajs/node";

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());
/**
 * Application
 */
const app = new Elysia({ adapter: node() })
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
      DRIVE_CLIENT: t.String({
        description: "Drive Client key",
        error: "DRIVE_CLIENT is required",
      }),
      DRIVE_SECRET: t.String({
        description: "Drive SECRET key",
        error: "DRIVE_SECRET is required",
      }),
      DRIVE_REFRESH_TOKEN: t.String({
        description: "Drive Refresh Token key",
        error: "DRIVE_REFRESH_TOKEN is required",
      }),
    }),
  )
  // CORS settings
  .use(
    swagger<"/docs">({
      autoDarkMode: true,
      scalarConfig: {
        defaultOpenAllTags: false,
        hideTestRequestButton: true,
        hiddenClients: {
          c: true,
          clojure: true,
          java: true,
          php: true,
          csharp: true,
          kotlin: true,
          powershell: true,
          swift: true,
          objc: true,
          ruby: true,
          shell: true,
          r: true,
          ocaml: true,
        },
      },
      documentation: {
        info: {
          title: "Zxifile Documentation",
          version: "1.0.0",
          description:
            "This is documentation about Zxifile endpoint for easier other developer to use this service",
          contact: {
            name: "CrzxaExe",
          },
        },
      },
    }),
  )
  .use(helmet())
  .use(
    cors({
      origin: ALLOWED_ORIGINS,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .use(router);

export { app };
