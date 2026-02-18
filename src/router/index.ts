import Elysia from "elysia";
import imageController from "./image";
import authController from "./auth";

/**
 * Application route controller
 */
const router = new Elysia()
  .get("/", () => "test")

  // AuthController
  .use(authController)

  // ImageController
  .use(imageController);

export default router;
