import Elysia from "elysia";
import imageController from "./image";
import authController from "./auth";
import driveController from "./drive";
import userController from "./user";
import logger from "../middleware/logging";

/**
 * Application route controller
 */
const router = new Elysia()
  .onBeforeHandle(logger)
  .get("/", () => ({ message: "test" }))

  // AuthController
  .use(authController)

  // ImageController
  .use(imageController)

  // Upload Controller
  .use(driveController)

  // Collection Controller
  .use(userController);

export default router;
